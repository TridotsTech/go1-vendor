 
<template>
    <div>
      <div :class="['head-layout', { collapsed: isSidebarCollapsed }]">
        <div class="head-content">
          <header class="border-b bg-white px-5 py-6.5 pb-[2.625rem] sm:px-5 mb-12">
            <Breadcrumbs :items="breadcrumbsList" class="float-left" />
          </header>
        </div>
      </div>
      <div :class="['layout', { collapsed: isSidebarCollapsed }]">
        <LeftSidebar :isCollapsed="isSidebarCollapsed" @toggle="toggleSidebar" />
        <div class="main-content">
          <div class="bg-white shadow-md rounded-lg p-6 space-y-6 pb-[2.625rem]">
            <div
              class="float-left mb-1 text-9xl font-bold text-gray-800 -mt-2"
              style="font-size: 1.85rem"
            >
              <p>Issue</p>
              <p class="text-9xl font-bold text-gray-600" style="font-size: 1rem">
                {{ subject }}
              </p>
            </div>
            <!-- <div class="float-right mb-1">
              <Button
                v-if="!isEditing"
                :variant="'solid'"
                theme="gray"
                size="md"
                label="Create"
                :disabled="false"
                @click="startEditing"
                class=""
              />
            </div> -->
            <div class="border-b pb-7 pt-10"></div>
            <div class="p-2">
              <FormControl
                :type="'text'"
                size="md"
                variant="subtle"
                placeholder="subject"
             
                label="Subject"
                v-model="subject"
                class="mb-5"
              />
              <FormControl
                :type="'select'"
                size="md"
                :options="statusOptions"
                variant="subtle"
                placeholder="status"
               
                label="Status"
                v-model="status"
                class="mb-5 text-gray-1000 text-base"
              />
              <FormControl
                :type="'select'"
                size="md"
                variant="subtle"
                :options="customOption"
             
                label="Customer"
                v-model="customer"
                class="mb-5"
              />
              <FormControl
                :type="'textarea'"
                size="md"
                variant="subtle"
                placeholder="Placeholder"
               
                label="Description"
                v-model="description"
                class="mb-5"
              />
              <FormControl
                type="select"
                size="md"
                variant="subtle"
                :options="priorityOption"
                placeholder="Placeholder"
               
                label="Priority"
                v-model="priority"
                class="mb-5"
              />
              <div class="float-right flex gap-4 ">
                <Button
                  :variant="'subtle'"
                  theme="gray"
                  size="md"
                  label="Discard"
                  @click="cancelEditing"
                />
                <Button
                  :variant="'solid'"
                  theme="gray"
                  size="md"
                  label="Submit"
                  @click="createIssue"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
 
  <script>
  import LeftSidebar from '@/components/Custom Layout/LeftSidebar.vue';
  import { ref, watch, onMounted } from 'vue';
  import { Breadcrumbs, Button, FormControl,createListResource } from 'frappe-ui';
  import { useRouter } from 'vue-router';
 
  export default {
    components: {
      LeftSidebar,
      Breadcrumbs,
      Button,
      FormControl,
    },
    setup() {
      const router = useRouter();
 
      const isSidebarCollapsed = ref(false);
    //   const isEditing = ref(false);
      const name = ref('');
      const status = ref('');
      const description = ref('');
      const priority = ref('');
      const customer = ref('');
      const subject = ref('');
      const customOption = ref([]);
      const priorityOption = ref([]);

 
      const breadcrumbsList = ref([
        { label: 'Issues', route: { name: 'Issues' } },
        { label: 'Create Issue', route: {} },
      ]);
 
      const statusOptions = [
        { label: 'Open', value: 'Open' },
        { label: 'Closed', value: 'Closed' },
        { label: 'Replied', value: 'Replied' },
        { label: 'On Hold', value: 'On Hold' },
        { label: 'Resolved', value: 'Resolved' },
      ];
 
    //   const startEditing = () => {
    //     isEditing.value = true;
    //   };
 
   
 
      const cancelEditing = () => {
        // isEditing.value = false;
        // Clear the form if canceled
        subject.value = '';
        status.value = '';
        description.value = '';
        customer.value = '';
        priority.value = '';
      };
 
      const createIssue = async () => {
        const issueData = {
          subject: subject.value,
          status: status.value,
          priority: priority.value,
          description: description.value,
          customer: customer.value,
        };
 
        try {
          const response = await fetch('/api/resource/Issue', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(issueData),
          });
 
          if (!response.ok) throw new Error('Error creating issue');
        //   isEditing.value = true;
          // Optionally redirect after creating issue
          router.push({ name: 'IssuesList'});
        } catch (error) {
          console.error('Error creating issue:', error);
        }
      };
 
      const optionsCustomer = async () => {
        try {
          const response = await fetch('/api/resource/Supplier?fields=["name"]');
          if (!response.ok) throw new Error('Network response was not ok');
 
          const customerdata = await response.json();
          customOption.value = customerdata.data.map((users) => users.name) || [];
        } catch (error) {
          console.error('Error fetching customers:', error);
        }
      };
 
      const optionsPriority = async () => {
        try {
          const response = await fetch(
            '/api/resource/Issue Priority?fields=["name"]'
          );
          if (!response.ok) throw new Error('Network response was not ok');
 
          const prioritydata = await response.json();
          priorityOption.value =
            prioritydata.data.map((users) => users.name) || [];
        } catch (error) {
          console.error('Error fetching priorities:', error);
        }
      };
 
      const toggleSidebar = () => {
        isSidebarCollapsed.value = !isSidebarCollapsed.value;
      };
 
      watch(name, (newName) => {
        breadcrumbsList.value[1].label = newName;
      });
 
      onMounted(async () => {
        await optionsCustomer();
        await optionsPriority();
      });
 
      return {
        isSidebarCollapsed,
        priorityOption,
        // isEditing,
        name,
        status,
        subject,
        description,
        priority,
        customer,
        customOption,
        toggleSidebar,
        breadcrumbsList,
        statusOptions,
        optionsCustomer,
        optionsPriority,
        // startEditing,
        cancelEditing,
        createIssue,
      };
    },
  };
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
    height: 120vh;
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
  .status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border-width: var(--border-width, 2px); /* Use dynamic border width */
  }
  @media (max-width: 250px) {
    .main-content {
      margin-left: 60px;
    }
  }
  </style>
 
 