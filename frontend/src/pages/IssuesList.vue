issues.vue
 
<template>
  <div>
    <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
      <div class="head-content">
        <header class="border-b bg-white px-5 py-6 sm:px-5">
          <div class="float-left -mt-3 font-medium">Issue</div>
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
    <LeftSidebar   class="z-[8]" :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
    <div :class=" ['layout', { collapsed: isSidebarCollapsed }]" class>
      <div class="main-content ">
 
        <div class="fiter mb-5" style="display: flex; gap: 10px;">
          <TextInput type="search" size="sm" variant="subtle" placeholder="Name" v-model="filterName" />        
          <FormControl type="select"
            :options="[
              {},
              { label: 'Open',value: 'Open',}, { label: 'On Hold',value: 'On Hold',}, { label: 'Replied',value: 'Replied',},
              { label: 'Resolved',value: 'Resolved',},   { label: 'Closed',value: 'Closed',},            
                             
            ]"
            size="sm" variant="subtle" placeholder="Status" v-model="filterStatus" class="w-52" />        
        </div>
        <ListView
          class="h-[450px]"
          :columns="columns"
          :rows="paginatedRows"
          :options="{
            getRowRoute: (row) => ({
              name: 'Issues Detail',
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
            <div v-if="column.key === 'status'">
              <Badge
                v-bind="getStatusTheme(item)"
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
              <span class="font-small text-gray-700 text-base" style="max-width: 170px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;">{{ item }}</span>
            </div>
          </template>
        </ListView>
        <Pagination :rows="filteredRows" @update:paginatedRows="updatePaginatedRows" />
      </div>
    </div>
  </div>
</template>
 
  <script>
import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue'
import ListView from '@/components/ListView/ListView.vue'
import { ref, onMounted,computed } from 'vue'
import { createResource, TextInput,FormControl,Badge } from 'frappe-ui'
import { useRouter } from 'vue-router'
import Pagination from '@/components/Pagination.vue'
 
export default {
  components: {
    LeftSidebar,
    ListView,
    Pagination,
    TextInput,
    FormControl,
    Badge
  },
  setup() {
    const isSidebarCollapsed = ref(false)
    const rows = ref([])
    const paginatedRows = ref([])
    const columns = ref([
      { label: 'Name', key: 'name', width: '250px' },
      { label: 'Status', key: 'status', width: '200px' },
      { label: 'Subject', key: 'subject', width: '200px' },      
      { label: 'Raised By(email)', key: 'owner', width: '200px' },
      { label: 'Priority', key: 'priority', width: '200px' },
    ])
 
    const issues = createResource({
      url: 'go1_vendor.sales.get_issues',
      method: 'get',
    })
   
    const fetchissues = async () => {
      try {
        const data = await issues.fetch()
        rows.value = data.map((row) => ({
          ...row,
        }))
      
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
 
    const toggleSidebar = () => {
      isSidebarCollapsed.value = !isSidebarCollapsed.value
    }
 
    const router = useRouter()
 
    const openCreate = () => {
      router.push({ name: 'Issues' })
    }
 
    const OpenClick = (row) => {
   
      if (row && row.name) {
        router.push({ name: 'Issues Detail', params: { id: row.name } })
      } else {
        console.error('Row data is invalid:', row)
      }
    }
    const updatePaginatedRows = (newPaginatedRows) => {
      paginatedRows.value = newPaginatedRows
    }
 
    const filterName = ref('')
    const filterStatus = ref('')  
 
    const filteredRows = computed(() => {
      return rows.value.filter(row => {
        const nameMatch = row.name.toLowerCase().includes(filterName.value.toLowerCase())
        const statusMatch = row.status.toLowerCase().includes(filterStatus.value.toLowerCase()) || !filterStatus.value;
        return nameMatch && statusMatch;
      });
    });
 
   
    const getStatusTheme = (status) => {  
     
      switch (status) {
        case 'Open':
          return { theme: "red" };  
        case 'Replied':
          return { theme: "blue" };
        case 'Closed':
          return { theme: "green" };  
        case 'On Hold':
          return { theme: "pink" };
        case 'Resolved':
          return { theme: "purple" };      
        default:
          return { theme: "gray" };
      }
    }
 
    onMounted(() => {
      fetchissues()
    })
 
    return {
      isSidebarCollapsed,
      rows,
      columns,
      toggleSidebar,
      OpenClick,
      updatePaginatedRows,
      paginatedRows,
      openCreate,
      filterName,
      filterStatus,    
      filteredRows,
      getStatusTheme,
   
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
 
 