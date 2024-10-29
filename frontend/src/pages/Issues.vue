<template>
   <div class="flex h-screen w-screen">
        <div class="h-full border-r bg-gray-50">
          <AppSidebar />
        </div>
        <div class="flex-1 flex flex-col h-full overflow-auto">
          <AppHeader />
          
          <slot />
          <div class="grid grid-cols-1 gap-6 p-10 w-full overflow-auto">
          <div class="p-2">
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              placeholder="subject"
              label="Subject * "
              v-model="subject"
              class="mb-5"
            />
            <FormControl
              type="select"
              size="md"
              :options="statusOptions"
              variant="subtle"
              placeholder="status"
              label="Status"
              v-model="status"
              class="mb-5 text-gray-1000 text-base"
            />
            <FormControl
              type="select"
              size="md"
              variant="subtle"
              :options="customOption"
              label="Supplier"
              v-model="supplier"
              class="mb-5"
            />
            <Textarea
              type="textarea"
              variant="subtle"
              size="xxl"
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
              label="Priority * "
              v-model="priority"
              class="mb-5"
            />
            <div class="float-right flex gap-4">
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
</template>
<script setup>
import AppSidebar from '@/components/Layouts/AppSidebar.vue';
import AppHeader from '@/components/Layouts/AppHeader.vue';
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Button, FormControl, Textarea } from 'frappe-ui';

const router = useRouter();

const subject = ref('');
const status = ref('');
const description = ref('');
const priority = ref('');
const supplier = ref('');
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

const cancelEditing = () => {
  subject.value = '';
  status.value = '';
  description.value = '';
  supplier.value = '';
  priority.value = '';
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
    supplier: supplier.value,
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

const optionsPriority = async () => {
  try {
    const response = await fetch('/api/resource/Issue Priority?fields=["name"]');
    if (!response.ok) throw new Error('Network response was not ok');

    const prioritydata = await response.json();
    priorityOption.value = prioritydata.data.map((user) => user.name) || [];
  } catch (error) {
    console.error('Error fetching priorities:', error);
  }
};

watch(subject, (newSubject) => {
  breadcrumbsList.value[1].label = newSubject;
});

onMounted(async () => {
  await optionsSupplier();
  await optionsPriority();
});
</script>


