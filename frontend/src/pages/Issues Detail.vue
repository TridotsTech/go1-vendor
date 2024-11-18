<template>
    <div class="flex h-screen w-screen">
        <div class="h-full border-r bg-gray-50">
          <AppSidebar />
        </div>
        <div class="flex-1 flex flex-col h-full overflow-auto">
          <div class=" mb-2 border-b p-1">
          <div class="flex flex-1 items-center h-12">
      <router-link to="/Issues">
        <span class="ml-3">Issues </span>/ <span v-if="paramsvalue"> {{ paramsvalue.id }}</span>
      </router-link>
    </div>
    </div>
          <!-- <AppHeader /> -->
          <!-- <slot /> -->
    <div class="main-content justify-items-center grid grid-cols-1 py-10 h-[550px]">
      <div class="grid grid-cols-1 content-start gap-3 m-2 w-8/12 bg-white border rounded-md pb-5">
        <div class="px-3 py-3 border-b">
          <div class="flex justify-between items-center">
            <span class="text-xl text-cyan-600 font-semibold">{{ name }}</span>
            <div class="float-right mb-1">
              <Button
                v-if="!isEditing"
                variant="solid"
                theme="gray"
                size="md"
                label="Edit"
                :disabled="false"
                @click="startEditing"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 p-3">
          <div class="mb-5 text-lg font-medium">
            <h1>Details:</h1>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 justify-items-stretch text-gray-800">
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Subject</span>
              <FormControl v-if="isEditing" v-model="subject1" class="text-sm font-semibold rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ subject1 }}</span><br>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Status</span>
              <FormControl v-if="isEditing" type="select" v-model="statuss" :options="statusOptions" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ statuss }}</span><br>
            </div>
            <div v-if="!logged_users.data" class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Supplier</span>
              <FormControl type="select" v-if="isEditing" v-model="Supplier" :options="customOption" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ Supplier }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Priority</span>
              <FormControl v-if="isEditing" type="select" v-model="priorityy" :options="priorityOption" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ priorityy }}</span><br>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Issue Type</span>
              <FormControl v-if="isEditing" v-model="issuetype" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ issuetype }}</span><br>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Description</span>
              <Textarea v-if="isEditing" v-model="desc" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ desc }}</span><br>
            </div>
            <!-- <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Issue Type</span>
              <FormControl v-if="isEditing" v-model="issue" class="text-sm font-semibold rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ issue }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">First Responded On</span>
              <FormControl v-if="isEditing" v-model="firstresponded" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ firstresponded }}</span><br>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Resolution Details</span>
              <FormControl v-if="isEditing" v-model="resolution" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ resolution }}</span><br>
            </div> -->
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Opening Date</span>
              <FormControl v-if="isEditing" v-model="openingdate" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ openingdate }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Opening Time</span>
              <FormControl v-if="isEditing" v-model="openingtime" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ openingtime }}</span><br>
            </div>
            <!-- <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Lead</span>
              <FormControl v-if="isEditing" v-model="lead" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ lead }}</span><br>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Project</span>
              <FormControl v-if="isEditing" v-model="project" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ project }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Contact</span>
              <FormControl v-if="isEditing" v-model="contact" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ contact }}</span>
            </div> -->
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Company</span>
              <FormControl v-if="isEditing" type="select" v-model="company" :options="companyoption" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ company }}</span>
            </div>
            <!-- <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Email Account</span>
              <FormControl v-if="isEditing" v-model="email" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ email }}</span>
            </div> -->
            <!-- <div class="border-b pb-7 pt-5"></div> -->
            <div>
              </div>
              </div>
              <div v-if="isEditing" class="justify-end mt-3 flex gap-4">
                <Button
                  variant="subtle"
                  theme="gray"
                  size="md"
                  label="Discard"
                  :disabled="false"
                  @click="cancelEditing"
                />
                <Button
                  variant="solid"
                  theme="gray"
                  size="md"
                  label="Submit"
                  :disabled="false"
                  @click="submitChanges"
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
import { ref, onMounted, reactive, watch } from 'vue'
import { createResource, Button, FormControl,Textarea } from 'frappe-ui'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const name = ref('')
const subject1 = ref('')
const statuss = ref('')
const priorityy = ref('')
const address4 = ref('')
const issuetype = ref('')
const desc = ref('')
const issue = ref('')
const firstresponded = ref('')
const resolution = ref('')
const openingdate = ref('')
const openingtime = ref('')
const lead = ref('')
const project = ref('')
const contact = ref('')
const company = ref('')
const email = ref('')
const Supplier=ref('')
const isEditing = ref(false)
const field_filters=reactive({})
const customOption = ref([]);
const priorityOption =ref([])
const companyoption =ref([])
let paramsvalue = ref({}) 


const updateparams = () => {
paramsvalue.value = route.params
paramsvalue =paramsvalue.value

}
const optionsSupplier = async (limit = 1000) => {
  try {
    const supplierresponse = await fetch(`/api/resource/Supplier?fields=["supplier_name"]&limit=${limit}`);
    const response = await fetch('/api/resource/Issue Priority?fields=["name"]');
    const countryresponse = await fetch('/api/resource/Company?fields=["company_name"]');
    if (!response.ok) throw new Error('Network response was not ok');
    
    const prioritydata = await response.json();
    const supplierdata = await supplierresponse.json();
    const companydata = await countryresponse.json();
    
    // console.log("prioritydata",prioritydata)
    customOption.value = supplierdata.data.map((user) => user.supplier_name) || [];
    priorityOption.value = prioritydata.data.map((user) => user.name) || [];
    companyoption.value = companydata.data.map((user) => user.company_name) || [];
  } catch (error) {
    console.error('Error fetching Country:', error);
  }
};


const users = createResource({
    url: 'go1_vendor.apidata.get_test',
    cache: ['true']
});
users.fetch();
const logged_users = users;


const quote = createResource({
  url: 'go1_vendor.apidata.get_issues',
  params: {
    'field_filters':JSON.stringify(field_filters)
  },
  method: 'GET',
})

const fetchQuoteDetails = async () => {
  try {
    const id = route.params.id
    const data = await quote.fetch()
    const QuotationDetails = data.find((items) => items.name === id)
    if (QuotationDetails) {
      name.value = QuotationDetails.name
      Supplier.value=QuotationDetails.custom_supplier
      subject1.value = QuotationDetails.subject
      statuss.value = QuotationDetails.status
      priorityy.value = QuotationDetails.priority
      address4.value = QuotationDetails.address_line2
      issuetype.value = QuotationDetails.issue_type
      desc.value = QuotationDetails.description
      issue.value = QuotationDetails.issue_type
      firstresponded.value = QuotationDetails.first_responded_on
      resolution.value = QuotationDetails.resolution_details
      openingdate.value = QuotationDetails.opening_date
      openingtime.value = QuotationDetails.opening_time
      lead.value = QuotationDetails.lead
      project.value = QuotationDetails.project
      company.value = QuotationDetails.company
      email.value = QuotationDetails.email_account
     console.log("hit",QuotationDetails)
    }
  } catch (error) {
    console.error('Error fetching order details:', error)
  }
}

const statusOptions = [
  { label: 'Open', value: 'Open' },
  { label: 'Closed', value: 'Closed' },
  { label: 'Replied', value: 'Replied' },
  { label: 'On Hold', value: 'On Hold' },
  { label: 'Resolved', value: 'Resolved' },
];

const startEditing = () => {
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
  fetchQuoteDetails() 
}


const submitChanges = async () => {
  const issueId = route.params.id
  if (!issueId) return

  const issueData = {
    subject: subject1.value,
    status: statuss.value,
    priority: priorityy.value,
    description: desc.value,
    custom_supplier:Supplier.value,
    issue_type: issuetype.value,
    first_responded_on: firstresponded.value,
    resolution_details: resolution.value,
    opening_date: openingdate.value,
    opening_time: openingtime.value,
    lead: lead.value,
    project: project.value,
    company:company.value,
    email_account:email.value
  }
  
  try {
    const response = await fetch(`/api/resource/Issue/${issueId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(issueData),
    })

    if (!response.ok) throw new Error('Error updating Issue')
    name.value = issueData.subject;  
    subject1.value = issueData.subject;
    statuss.value = issueData.status;
    priorityy.value = issueData.priority;
    Supplier.value=issueData.custom_supplier;
    address4.value = issueData.address_line2; 
    desc.value = issueData.description;
    issue.value = issueData.issue_type;
    firstresponded.value = issueData.first_responded_on;
    resolution.value = issueData.resolution_details;
    openingdate.value = issueData.opening_date;
    openingtime.value = issueData.opening_time;
    lead.value = issueData.lead;
    project.value = issueData.project;
    company.value = issueData.company;
    email.value = issueData.email_account;

    isEditing.value = false
    router.push({ name: 'IssuesList' })
  } catch (error) {
    console.error('Error updating issue:', error)
  }
}

onMounted(async() => {
  await optionsSupplier();
  fetchQuoteDetails()
  updateparams();
})
watch(
  () => route.fullPath, 
  () => {
    updateparams();
   
  }
);
</script>

