<template>
  <div class="flex h-screen w-screen">
    <div class="h-full border-r bg-gray-50">
      <AppSidebar />
    </div>
    <div class="h-full w-full flex flex-col overflow-auto">
      <div class="flex-1 flex flex-col h-full">
        <AppHeader />
        <slot />

        <!-- Filter and Reset button section -->
        <div class="flex mt-4 mb-4 px-5 justify-between">
          <!-- Filters on the left side -->
          <div class="flex">
            <div
              class="p-1 w-36"
              v-for="fieldData in filter_data"
              :key="fieldData.fieldname"
            >
              <component
                :is="getComponentType(fieldData)"
                v-bind="getComponentProps(fieldData)"
                v-model="field_filters[fieldData.fieldname]"  
              />
            </div>
          </div>

          <!-- Reset button on the right side -->
          <div class="ml-6 mt-1">
            <Button variant="subtle" theme="gray" size="sm" @click="resetFilters">
              Reset
            </Button>
          </div>
        </div>

        <!-- ListView section -->
        <div class=" flex-1 flex flex-col px-5 overflow-auto" v-if="supplier_detail.data">
          <ListView 
            class=" flex-1 overflow-auto "
            :columns="columns_data"
            :rows="supplier_detail.data"
            :options="{
              getRowRoute: (row) => ({ name: 'Purchase Detail', params: { id: row.name } }),
              selectable: true,
              showTooltip: true,
              resizeColumn: true,
              emptyState: {
                title: 'No records found',
                description: 'Create a new record to get started',
                button: {
                  label: 'New Record',
                  variant: 'solid',
                  onClick: () => console.log('New Record'),
                },
              },
            }"
            row-key="name"
            @row-click="OpenClick"
          >
            <template #cell="{ item, row, column }">
              <div v-if="column.key === 'status'">
                <Badge v-bind="getStatusTheme(item)" size="sm" :label="item" />
              </div>
              <div v-else-if="column.key === 'naming_series'">
                <span class="text-black text-base" style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">
                  {{ item }}
                </span>
              </div>
              <div v-else>
                <span class="font-small text-gray-700 text-base" style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">
                  {{ item }}
                </span>
              </div>
            </template>
          </ListView>

          <!-- List Footer for pagination -->
          <div class="w-full mt-2">
            <div class="flex justify-between items-center">
              <!-- Pagination controls on the left -->
              <ListFooter
                :modelValue="pageLengthCount"
                :options="{ rowCount: supplier_detail.data.length, totalCount: supplier_detail.data.length}"
                @update:modelValue="pageLengthCount = $event"
                @loadMore="supplier_detail.fetch()"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
  import AppSidebar from '@/components/Layouts/AppSidebar.vue';
  import AppHeader from '@/components/Layouts/AppHeader.vue';
  import { useRouter } from 'vue-router';
  import { Button, createResource,ListView,ListFooter, Select, DatePicker, FormControl, Badge,FeatherIcon } from 'frappe-ui';
  import { ref, onMounted, watch, reactive } from 'vue';
  
  const router = useRouter();
  const columns_data = ref([]);
  const filter_data=ref([])
  const field_filters = reactive({});
  const pageLengthCount = ref(20);
  
  const supplier_detail = createResource({
   url: 'go1_vendor.apidata.get_purchaseorder',
   params: {
    "field_filters": JSON.stringify(field_filters),
  },
   method: 'GET',

  });
  
  const order = createResource({
   url: 'go1_vendor.api.get_purchase',
   method: 'GET',
  });
  
  
  
  const fetchOrder = async () => {
  
   const data = await order.fetch();
   const fields = data.fields;
  
   columns_data.value = [];
   filter_data.value = [];
   filter_data.value.push({ fieldname: 'name', fieldtype: 'Data', options: null, label: 'ID' });
   columns_data.value.push({label: 'Name',key: 'name', width: 2,},{label:'Status',key:'status', width:1});

   fields.forEach(field => {
     if (field.in_list_view) {
       columns_data.value.push({
         label: field.label,
         key: field.fieldname,
         width: field.width,
       });
     }
     if (field.in_standard_filter) {
       filter_data.value.push(field);  
     }
   });
  
  };
  
  const OpenClick = (row) => {
    if (row && row.name) {
      router.push({ name: 'Request Quotation Details', params: { id: row.name } });
    } else {
      console.error('Row data is invalid:', row);
    }
  };
  
  watch(pageLengthCount, (newPageLength) => {
    supplier_detail.limit = newPageLength;
    supplier_detail.fetch();
  });

  watch(field_filters, (newFilters) => {
    supplier_detail.params={"field_filters": JSON.stringify(field_filters)};
    supplier_detail.fetch();
    for (let key in newFilters) {
      if (newFilters[key] === null || newFilters[key] === '') {
        delete newFilters[key];
      }
    }

}, { deep: true });
  
  const getStatusTheme = (status) => {
    switch (status) {
      case 'Draft':
        return { theme: "red" };
      case 'Overdue':
        return { theme: "blue" };
      case 'Cancelled':
        return { theme: "green" };
      case 'Return':
        return { theme: "orange" };
      default:
        return { theme: "gray" };
    }
  };
  
  const resetFilters = () => {
    Object.keys(field_filters).forEach(key => {
      delete field_filters[key];
    });
    supplier_detail.fetch();
  };
  
  const getComponentType = (fieldData) => {
    const components = {
      Select,
      Color: FormControl,
      Date: DatePicker,
      Link: FormControl,
      TextEditor: FormControl,
      Data: FormControl,
      ReadOnly: 'ReadOnlyComponent',
    };
    return components[fieldData.fieldtype] || FormControl;
  };
  
  const getComponentProps = (fieldData) => {
    const props = {
      Select: {
        options: getOptions(fieldData.options),
        placeholder: fieldData.label,
      },
      Link: {
        size: "sm",
        variant: "subtle",
        placeholder: fieldData.label,
      },
      Date: {
        size: "sm",
        placeholder: fieldData.label,
      },
      Data: {
        size: "sm",
        variant: "subtle",
        placeholder: fieldData.label,
      },
      TextEditor: {
        placeholder: fieldData.label,
        variant: "subtle",
      },
    };
    return props[fieldData.fieldtype] || {};
  };
  
  const getOptions = (options) => {
    if (!options) return [];
    return options.split("\n").map(option => ({
      label: option,
      value: option,
    }));
  };
  
  
  onMounted(() => {
  fetchOrder();
  supplier_detail.fetch();
  });
  
</script>
  