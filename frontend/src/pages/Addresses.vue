 <template>

  <div>
    <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
      <div class="head-content">
        <header class="border-b bg-white px-5 py-6.5 sm:px-5">
          <div class="float-left -mt-3">Addresses</div>
          <div class="float-right -mt-3">
            <Button
              :variant="'solid'"
              theme="gray"
              size="sm"
              label="Button"
              :loading="false"
              :loadingText="null"
              :disabled="false"
              :link="null"
              @click="openCreate"
            >
              + Create
            </Button>
          </div>
        </header>
      </div>
    </div>
    <div :class="['layout', { collapsed: isSidebarCollapsed }]">
      <LeftSidebar
        class="z-[8]"
        :isCollapsed="isSidebarCollapsed"
        @toggle="toggleSidebar"
      />
      <div class="main-content">
        <div class="fiter mb-2 flex gap-3">
          <TextInput type="search" size="sm" variant="subtle" placeholder="Name" v-model="filterName" />        
          <FormControl type="select"
          :options="[
              {},
              { label: 'Billing',value: 'Billing',}, { label: 'Shipping',value: 'Shipping',}, { label: 'Office',value: 'Office',},
              { label: 'Postal',value: 'Postal',},   { label: 'Plant',value: 'Plant',},   { label: 'Personal',value: 'Personal',},
              { label: 'Shop',value: 'Shop',},   { label: 'Subsidiary',value: 'Subsidiary',},{ label: 'Warehouse',value: 'Warehouse',},
              { label: 'Other',value: 'Other',}, { label: 'Permanent',value: 'Permanent',}, { label: 'Current',value: 'Current',},    
                 
            ]"
            size="sm" variant="subtle" placeholder="address" v-model="filterAddress" />
          <TextInput type="search" size="sm" variant="subtle" placeholder="city" v-model="filterCity" />
          <TextInput type="search" size="sm" variant="subtle" placeholder="post code" v-model="filterPost" />
         
          <Button :variant="'subtle'" theme="gray" size="sm" @click="resetFilters"> Reset</Button>
          <div class=" refers">
            <RefreshButton @refresh="reload" :isLoading="isLoading" />
          </div>
        </div>

        <div>
        <ListView
          class="h-[455px]"
          :columns="columns"
          :rows="address.data"
          :options="{
            getRowRoute: (row) => ({
              name: 'Addresses Detail',
              params: { id: row.name },
            }),
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
        <template #cell="{ item, column }">
            <div v-if="column.key === 'address_type'">
              <Badge
                v-bind="getaddress_typeTheme(item)"
                size="sm"
                :label="item"
              />
            </div>
            <div v-else-if="column.key === 'name'">
                  <span class="text-black text-base" style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">
                    {{ item }}
                  </span>
                </div>
            <div v-else>
              <span class="font-small text-gray-700 text-base" style="max-width: 120px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">{{ item }}</span>
            </div>
          </template>
        </ListView>
      </div>
        <Pagination :rows="filteredRows" @update:paginatedRows="updatePaginatedRows"/>
      </div>
    </div>
  </div>
</template>
 
  <script>
import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue'
import ListView from '@/components/ListView/ListView.vue'
import RefreshButton from '@/components/RefreshButton.vue'
import { ref, onMounted, computed } from 'vue'
import { createResource, TextInput, FormControl, Badge,Button } from 'frappe-ui'
import { useRouter } from 'vue-router'
import Pagination from '@/components/Pagination.vue'
 
export default {
  components: {
    LeftSidebar,
    ListView,
    Pagination,
    TextInput,
    FormControl,
    Badge,
    RefreshButton,Button
  },
  setup() {
    const isSidebarCollapsed = ref(false)
    const rows = ref([])
    const paginatedRows = ref([])
    const isLoading = ref(false)
    let address=ref([])
    // let data=ref([])
    const columns = ref([
      { label: 'Name', key: 'name', width: '250px' },
      { label: 'Address', key: 'address_type', width: '200px' },
      { label: 'City', key: 'city', width: '200px' },
      { label: 'State', key: 'state', width: '200px' },
      { label: 'Postal Code', key: 'pincode', width: '200px' },
    ])
 
     address = createResource({
      url: 'go1_vendor.api.get_address',
      method: 'get',
      auto:true
    })
  
    const fetchaddress = async () => {
      try {
        isLoading.value = true
        const data = await address.fetch()
       
        
      
      } catch (error) {
        console.error('Error fetching data:', error)
      }
      finally {
        isLoading.value = false
      }
    }
   
     const reload = () => {
      fetchaddress()
    }
 
    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }
 
    const router = useRouter()
 
    const openCreate = () => {
      router.push({ name: 'New Addresses' })
    }
 
    const OpenClick = (row) => {
  
      if (row && row.name) {
        router.push({ name: 'Addresses Detail', params: { id: row.name } })
      } else {
        console.error('Row data is invalid:', row)
      }
    }
    const updatePaginatedRows = (newPaginatedRows) => {
      paginatedRows.value = newPaginatedRows
    }
 
    const resetFilters = () => {
      filterName.value = ''
      filterAddress.value = ''
      filterCity.value = ''
      filterPost.value = ''
    }
 
    const filterName = ref('')
    const filterAddress = ref('')
    const filterCity = ref('')
    const filterPost = ref('')
 
    // const filteredRows = computed(() => {
    //   return rows.value.filter(row => {
    //     const nameMatch = row.name.toLowerCase().includes(filterName.value.toLowerCase())
    //     const addressMatch = row.address_type.toLowerCase().includes(filterAddress.value.toLowerCase()) || !filterAddress.value;
    //     const cityMatch = row.city.toString().includes(filterCity.value.toString()) || !filterCity.value;
    //     const postMatch = row.pincode.toString().includes(filterPost.value.toString()) || !filterPost.value;
       
 
    //     return nameMatch && addressMatch && cityMatch && postMatch;
    //   });
    // });
    const filteredRows = computed(() => {
      return rows.value.filter(row => {
        const nameMatch = row.name.toLowerCase().includes(filterName.value.toLowerCase());
        const addressMatch = row.address_type.toLowerCase().includes(filterAddress.value.toLowerCase()) || !filterAddress.value;
        const cityMatch = (row.city && row.city.toString().includes(filterCity.value.toString())) || !filterCity.value;
        const postMatch = (row.pincode && row.pincode.toString().includes(filterPost.value.toString())) || !filterPost.value;

        return nameMatch && addressMatch && cityMatch && postMatch;
      });
    });

 
 
    const getaddress_typeTheme = (address_type) => {
     
      switch (address_type) {
        case 'Shipping':
          return { theme: 'red' }
        case 'Billing':
          return { theme: 'blue' }
        case 'Plant':
          return { theme: 'green' }
        case 'Warehouse':
          return { theme: 'orange' }
        default:
          return { theme: 'gray' }
      }
    }
 
    onMounted(() => {
      fetchaddress()
    })
 
    return {
      isSidebarCollapsed,
      rows,
      // text:'Customer',
      columns,
      toggleSidebar,
      OpenClick,
      updatePaginatedRows,
      paginatedRows,
      openCreate,
      filterName,
      filterAddress,
      filterCity,
      filteredRows,
      filterPost,
      resetFilters,
      getaddress_typeTheme,
      reload,
      isLoading,
      address
    
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
  height: 91vh;
  transition: margin-left 0.3s ease;
}
 
.main-content {
  flex-grow: 1;
  padding: 1.25rem;
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
 
