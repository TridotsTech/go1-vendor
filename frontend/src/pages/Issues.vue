<template>
   <div class="flex h-screen w-screen">
        <div class="h-full border-r bg-gray-50">
          <AppSidebar />
        </div>
        <div class="flex-1 flex flex-col h-full overflow-auto">
          <div class=" mb-2 border-b p-4">
            <span>New Issue</span>
    </div>
        <!-- <AppHeader /> -->
          
          <!-- <slot /> -->
    <div class="main-content justify-items-center grid grid-cols-1 py-10  overflow-auto ">
      <div class="grid grid-cols-1 content-start gap-3 m-2 w-4/6  bg-white border rounded-md ">
        <div class="px-3 py-3 border-b">
          <div class="flex justify-between items-center">
            <span class="text-xl text-cyan-600 font-semibold"> New Issue</span>
           
          </div>
        </div>
        <div class="grid grid-cols-1 p-3 ">
          <div class="mb-5 text-lg font-medium">
            <h1>Details:</h1>
          </div>
          <div class="grid grid-cols-3 gap-6 overflow-auto">
          <!-- <div class="p-5 border rounded-md w-11/12 "> -->
          
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              placeholder="Subject"
              label="Subject"
              v-model="subject"
              class=""
            />
            <FormControl
              type="select"
              size="md"
              :options="statusOptions"
              variant="subtle"
              placeholder="Status"
              label="Status"
              v-model="status"
              class="text-gray-1000 text-base"
            />
            <FormControl v-if="!logged_users.data"
              type="select"
              size="md"
              variant="subtle"
              :options="customOption"
              label="Supplier"
              v-model="supplier"
              placeholder="Supplier"
              class=""
            />
            <Textarea
              type="textarea"
              variant="subtle"
              size="md"
              placeholder="Description"
              label="Description"
              v-model="description"
               class=""
            />
            <FormControl
              type="select"
              size="md"
              variant="subtle"
              :options="optionIssue"
              placeholder="Issue type"
              label="Issue Type* "
              v-model="issuetype"
              class="mb-3"
            />
            <FormControl
              type="select"
              size="md"
              variant="subtle"
              :options="priorityOption"
              placeholder="Priority"
              label="Priority * "
              v-model="priority"
              class="mb-3"
            />
            </div>
            <div class="justify-end flex gap-4">
              <Button
                variant="subtle"
                theme="gray"
                size="md"
                label="Discard"
                @click="cancelEditing"
              />
              <Button
                variant="solid"
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
<script setup>
import AppSidebar from '@/components/Layouts/AppSidebar.vue';
// import AppHeader from '@/components/Layouts/AppHeader.vue';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Button, FormControl, Textarea, ErrorMessage,createResource } from 'frappe-ui';

const router = useRouter();

const subject = ref('');
const status = ref('');
const description = ref('');
const priority = ref('');
const supplier = ref('');
const customOption = ref([]);
const priorityOption = ref([]);
const issuetype = ref([]);
const optionIssue = ref([]);


const users = createResource({
    url: 'go1_vendor.apidata.get_test',
    cache: ['true']
});
users.fetch();
const logged_users = users;


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

const cancelEditing = () => {
  subject.value = '';
  status.value = '';
  description.value = '';
  supplier.value = '';
  priority.value = '';
  issuetype.value = '';
};

const createIssue = async () => {
  const validations = [
    { value: subject.value, message: "Subject is required." },
    { value: priority.value, message: "priority is required." },
  ];

  for (const { value, message } of validations) {
    if (!value) {
      alert(message);
      return;
    }
  }
  const issueData = {
    subject: subject.value,
    status: status.value,
    priority: priority.value,
    description: description.value,
    custom_supplier: supplier.value,
  };

  try {
    const response = await fetch('/api/resource/Issue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Accept': 'application/json', },
      body: JSON.stringify(issueData),
    });

    if (!response.ok) throw new Error('Error creating issue');
    router.push({ name: 'IssuesList' });
  } catch (error) {
    console.error('Error creating issue:', error);
  }
};

const optionsSupplier = async () => {
  try {
    const response = await fetch('/api/resource/Supplier?fields=["name"]');
    if (!response.ok) throw new Error('Network response was not ok');

    const supplierdata = await response.json();
    customOption.value = supplierdata.data.map((user) => user.name) || [];
  } catch (error) {
    console.error('Error fetching supplier:', error);
  }
};

const optionsIssueType = async () => {
  try {
    const response = await fetch('/api/resource/Issue Type?fields=["name"]');
    if (!response.ok) throw new Error('Network response was not ok');

    const issuetypedata = await response.json();
    optionIssue.value = issuetypedata.data.map((user) => user.name) || [];
  } catch (error) {
    console.error('Error fetching IssueType:', error);
  }
};

const optionsPriority = async () => {
  try {
    const response = await fetch('/api/resource/Issue Priority?fields=["name"]');
    if (!response.ok) throw new Error('Network response was not ok');

    const prioritydata = await response.json();
    priorityOption.value = prioritydata.data.map((user) => user.name) || [];
  } catch (error) {
    console.error('Error fetching priority:', error);
  }
};

watch(subject, (newSubject) => {
  breadcrumbsList.value[1].label = newSubject;
});

onMounted(async () => {
  await optionsSupplier();
  await optionsPriority();
  await optionsIssueType();
});
</script>


