<template>

  <div>
<!-- {{salesdata.originalData}} -->
      <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
        <div class="head-content">
          <header class="border-b bg-white px-5 py-3.5 font-medium sm:px-5">
            Purchase Invoice
          </header>
          <!-- {{ field_filters  }} -->
          <div class="flex justify-between w-1/2 mt-4 ml-4">
            <div class="p-1 w-36 " v-for="fieldData in filter_data" :key="fieldData.fieldname">
          
              <component
                :is="getComponentType(fieldData)"
                v-bind="getComponentProps(fieldData)"
                  v-model="field_filters[fieldData.fieldname]"
              />
            </div>
            <div class="mt-1 ml-6">
          <Button :variant="'subtle'" theme="gray" size="sm" @click="restsetFunction"> Reset</Button>
         </div>
          </div>
        </div>
        
      </div>
      <div :class="['layout', { collapsed: isSidebarCollapsed }]">
        <LeftSidebar  class="z-[8]" :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
        <div class="main-content" v-if="columns_data && supplier_detail.data" >
          <ListView
            class="h-[485px]"
            :columns="columns_data"
             :rows="supplier_detail.data"
            :options="{
              getRowRoute: (row) => ({ name: 'Purchase Invoice Detail', params: { id: row.name } }),
              selectable: true,
              showTooltip: true, 
              resizeColumn: true,
              emptyState: {
                title: 'No records found',
              },
            }"
            row-key="name"
            @row-click="OpenClick"
          >
          <template #cell="{ item,row, column }">
            <div v-if="column.key === 'status'">
              <Badge
                v-bind="getStatusTheme(item)"
                size="sm"
                :label="item"
              />
            </div>
            <div v-else-if="column.key === 'naming_series'">
              <span class="text-black text-base" style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">
                {{ item }}
              </span>
            </div>
            <div v-else>
              <span class="font-small text-gray-700 text-base" style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">{{ item }}</span>
            </div>
          </template>
 
        </ListView>
        <ListFooter
        :modelValue="pageLengthCount"
        :options="{ rowCount: supplier_detail.data.length, totalCount: totalRows }"
        @update:modelValue="pageLengthCount = $event"
        @loadMore="supplier_detail.fetch()"
      />
          <!-- <pagination :rows="rows" @update:paginatedRows="updatePaginatedRows" />  -->
        </div>
      </div>
    </div>
  
  </template>
  
  <script>
  import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue'
  import ListView from '@/components/ListView/ListView.vue'

  // import Pagination from '@/components/Pagination.vue'
  import { ref, onMounted,watch,reactive} from 'vue'
  import ListFooter from 'frappe-ui/src/components/ListView/ListFooter.vue'
  import { createResource, createListResource,FormControl,Select,DatePicker,Badge } from 'frappe-ui'
  import { useRouter } from 'vue-router';
  
  export default {
    components: {
      LeftSidebar,
      ListView,
      FormControl,
      Badge,
      ListFooter,
      // Pagination
    },
    setup() {
      let order = ref("")
      let salesdata = ref("")
      
      const isSidebarCollapsed = ref(false)
      const rows = ref([])
      let columns_data = ref([])
      let filter_data = ref([])
      let supplier_detail = ref([])
      const pageLengthCount = ref(20); // Default to 20 rows
      let field_filters = reactive({});
      // const paginatedRows = ref([]) 
      


      // supplier_detail = createListResource({
      //   doctype: 'Purchase Invoice',
      //   fields:["*"],
      //   filters:field_filters,
      //   limit: pageLengthCount.value,
      //   auto: true
      //   })
      // console.log('salesdata',JSON.stringify(field_filters))  
      // supplier_detail.fetch()

      order = createResource({
        url: 'go1_vendor.sales.get_invoice',
        method: 'GET',
      })
      supplier_detail = createResource({
        url:'go1_vendor.api.get_purchaseinvoice',
        method:'GET',
      params:{
        filter_data: JSON.stringify(field_filters)
      },
        
          auto:true,
        
      })
      supplier_detail.fetch()
    

      order.fetch().then((res) =>{
        const field = res.fields
  
        columns_data.value = []
        filter_data.value = []

        filter_data.value.push({fieldname:'name',fieldtype:'Data',options:null,label:'ID'})
        
        // console.log("meta data",field)
        for(let fielddata of field){

          // console.log("PPPPPPPPPPPP",fielddata.fieldname,"---",fielddata.fieldtype,fielddata.in_standard_filter)
          if(fielddata.in_list_view==1){
            columns_data.value.push({
                  label:fielddata.label,
                  key:fielddata.fieldname,
                  width:fielddata.width
            })
            // console.log('coldata',columns_data)
          }
          // if(fielddata.fieldname == 'name'){
          //   filter_data.value.push(fielddata)
          // }
          if(fielddata.in_standard_filter == 1){
            // console.log("PPPPPP",fielddata)
            filter_data.value.push(fielddata)

          }
        }
      } )
      
      
  
      const fetchorder = async () => {
        try {
          const data = await order.fetch()
          if (data){
            rows.value = data.map(row => ({
            ...row,
            total: String(row.total),
            item_name: row.items.length > 0 ? row.items[0].item_name : 'No items',
          }))
          }
        
        } catch (error) {
          // console.error('Error fetching data:', error)
        }
      }
  
      const toggleSidebar = () => {
        isSidebarCollapsed.value = !isSidebarCollapsed.value
      }
  
      const router = useRouter()
  
      const OpenClick = (row) => {
   
        if (row && row.name) {
          router.push({ name: 'Purchase Invoice Detail', params: { id: row.name } })
        } else {
          console.error('Row data is invalid:', row)
        }
      }
      watch(pageLengthCount, (newPageLength) => {
          console.log("aaaa",newPageLength)
          supplier_detail.limit = newPageLength;
          supplier_detail.fetch(); // Re-fetch the data with the updated page length
        });
  
      // const updatePaginatedRows = (newPaginatedRows) => {
      //   paginatedRows.value = newPaginatedRows
      // }
function getOptions(options){
// const optionsArray = options.split("/n")
let formatOptions = []
if (options){
  const optionsArray = options.split("\n")
 
  for (let options of optionsArray){
  formatOptions.push({
    label: options,
    value:options
  })
}
}
return formatOptions
}
function restsetFunction(){
           
            Object.keys(field_filters).forEach((key) => {
              delete field_filters[key];  
            });
           
            supplier_detail.fetch()
          }
function getComponentType(fieldData){

  const components = {
      Select:Select,
      Color: FormControl,
      Date: DatePicker,
      Link: FormControl,
      TextEditor : FormControl,
      Data: FormControl,
      ReadOnly: 'ReadOnlyComponent'
  }
  return components[fieldData.fieldtype] || FormControl
}
function getComponentProps(fieldData){
  const property = {
    Select:{
        options:getOptions(fieldData.options),
        placeholder :fieldData.label,
    },
    Link:{
      size:"sm",
      variant:"subtle",
      placeholder: fieldData.label,
    },
    Date:{
      size:"sm",
      placeholder:fieldData.label,
    },
    Data:{
      size:"sm",
      variant:"subtle",
      placeholder: fieldData.label,
    },
    TextEditor:{
        placeholder:fieldData.label,
        variant :"subtle"
    }

  }
  // console.log("property[fieldData.fieldtype]",fieldData.fieldtype,fieldData.fieldname)
  return property[fieldData.fieldtype]
}
      onMounted(() => {
        fetchorder()
      })
watch(field_filters, (newFilters) => {


 supplier_detail.fetch()
 
 // Remove any empty filters
 for (const key in newFilters) {
   if (newFilters[key] === null || newFilters[key] === '') {
  
     delete newFilters[key]; // Remove empty filter keys
    }
  }
  

}, { deep: true }); 
// Use deep watch to monitor nested properties




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
    }
// Fetch initial data

  
      return {
        isSidebarCollapsed,
        columns_data,
        salesdata,
        filter_data,
        field_filters,
        // paginatedRows, 
        toggleSidebar,
        OpenClick,
        getComponentType,
        getComponentProps,
        // updatePaginatedRows,
        order,
        // watch
        supplier_detail,
        restsetFunction,
        pageLengthCount,
        getStatusTheme
      }
    },
  }
  </script>
  
  <style scoped>
  .head-layout {
    display: flex;
    width: 100%;
    transition: margin-left 0.3s ease;
  }
  .layout {
    display: flex;
    width: 100%;
    height: 80vh;
    transition: margin-left 0.3s ease;
  }
  
  .main-content {
    flex-grow: 1;
    padding: 1rem;
    transition: margin-left 0.3s ease;
    margin-left: 220px; /* Default width of sidebar */
  }
  .head-content {
    flex-grow: 1;
    padding: 0px;
    transition: margin-left 0.3s ease;
    margin-left: 220px; /* Default width of sidebar */
  }
  .collapsed .main-content {
    margin-left: 60px; /* Adjust when sidebar is collapsed */
  }
  .collapsed .head-content {
    margin-left: 60px; /* Adjust when sidebar is collapsed */
  }
  .list-row {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #e5e7eb; /* Gray bottom border */
  }
  
  .row:hover {
    background-color: #f9fafb; /* Light gray background on hover */
  }
  </style>
  