<template>
  <div class="flex h-screen w-screen">
    <div class="h-full border-r bg-gray-50">
      <AppSidebar />
    </div>
    <div class="flex-1 flex flex-col h-full overflow-auto">
      <div class=" mb-2 border-b p-1">
      <!-- <div v-if="paramsvalue && Object.keys(paramsvalue).length > 0" class="flex flex-1 items-center h-12">
      <router-link to="/addresses">
        <span class="ml-3">Addresses / {{ paramsvalue.id }}</span>
      </router-link>
    </div> -->
    <div class="flex flex-1 items-center h-12">
      <router-link to="/addresses">
        <span class="ml-3">Addresses </span>/ <span v-if="paramsvalue && Object.keys(paramsvalue).length"> {{ paramsvalue.id }}</span>
      </router-link>
    </div>
    </div>
      <!-- <AppHeader /> -->
      <!-- <slot /> -->
      <div
        class="main-content justify-items-center grid grid-cols-1 py-10 h-[550px]"
      >
        <div
          class="grid grid-cols-1 content-start gap-3 m-2 w-8/12 bg-white border rounded-md pb-5"
        >
          <div class="px-3 py-3 border-b">
            <div class="flex justify-between items-center">
              <span class="text-xl text-cyan-600 font-semibold">{{
                address1
              }}</span>
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
            <div
              class="grid grid-cols-2 md:grid-cols-3 gap-3 justify-items-stretch text-gray-800"
            >
              <div class="flex flex-col gap-1">
                <span class="text-gray-600 text-sm">Address Title</span>
                <FormControl
                  v-if="isEditing"
                  v-model="address1"
                  class="text-sm font-semibold rounded-md p-1"
                />
                <span v-else class="text-sm font-semibold py-2">{{
                  address1
                }}</span
                ><br />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-gray-600 text-sm">Address Type</span>
                <FormControl
                  v-if="isEditing"
                  type="select"
                  v-model="address2"
                  :options="address_typeOptions"
                  class="text-sm font-semibold rounded-md p-1"
                />
                <span v-else class="text-sm font-semibold py-2">{{
                  address2
                }}</span
                ><br />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-gray-600 text-sm">Address Line 1</span>
                <FormControl
                  v-if="isEditing"
                  v-model="address3"
                  class="text-sm font-semibold rounded-md p-1"
                />
                <span v-else class="text-sm font-semibold py-2">{{
                  address3
                }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-gray-600 text-sm">Address Line 2</span>
                <FormControl
                  v-if="isEditing"
                  v-model="address4"
                  class="text-sm font-semibold rounded-md p-1"
                />
                <span v-else class="text-sm font-semibold py-2">{{
                  address4
                }}</span
                ><br />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-gray-600 text-sm">City</span>
                <FormControl
                  v-if="isEditing"
                  v-model="address5"
                  class="text-sm font-semibold rounded-md p-1"
                />
                <span v-else class="text-sm font-semibold py-2">{{
                  address5
                }}</span
                ><br />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-gray-600 text-sm">State</span>
                <FormControl
                  v-if="isEditing"
                  v-model="address6"
                  class="text-sm font-semibold rounded-md p-1"
                />
                <span v-else class="text-sm font-semibold py-2">{{
                  address6
                }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-gray-600 text-sm">Country</span>
                <FormControl
                  type="autocomplete"
                  v-if="isEditing"
                  v-model="address7"
                  :options="countryoption"
                  class="text-sm font-semibold rounded-md p-1"
                />
                <span v-else class="text-sm font-semibold py-2">{{
                  address7
                }}</span
                ><br />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-gray-600 text-sm">Postal Code</span>
                <FormControl
                  v-if="isEditing"
                  v-model="address8"
                  class="text-sm font-semibold rounded-md p-1"
                />
                <span v-else class="text-sm font-semibold py-2">{{
                  address8
                }}</span
                ><br />
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-gray-600 text-sm">Email</span>
                <FormControl
                  v-if="isEditing"
                  v-model="address9"
                  class="text-sm font-semibold rounded-md p-1"
                />
                <span v-else class="text-sm font-semibold py-2">{{
                  address9
                }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-gray-600 text-sm">Phone</span>
                <FormControl
                  v-if="isEditing"
                  v-model="address10"
                  class="text-sm font-semibold rounded-md p-1"
                />
                <span v-else class="text-sm font-semibold py-2">{{
                  address10
                }}</span
                ><br />
              </div>
              <!-- <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Fax</span>
              <FormControl v-if="isEditing" v-model="address11" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ address11 }}</span><br>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Tax Category</span>
              <FormControl v-if="isEditing" v-model="address12" class="text-sm font-semibold  rounded-md p-1" />
              <span v-else class="text-sm font-semibold py-2">{{ address12 }}</span>
            </div> -->
              <!-- <div class="border-b pb-7 pt-12"></div> -->
              <div></div>
            </div>
            <div v-if="isEditing" class="justify-end flex gap-4">
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
import AppSidebar from '@/components/Layouts/AppSidebar.vue'
// import AppHeader from '@/components/Layouts/AppHeader.vue'
import { ref, onMounted, reactive,watch } from 'vue'
import { createResource, Button, FormControl } from 'frappe-ui'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// const isSidebarCollapsed = ref(false)
const address1 = ref('')
const address2 = ref('')
const address3 = ref('')
const address4 = ref('')
const address5 = ref('')
const address6 = ref('')
const address7 = ref('')
const address8 = ref('')
const address9 = ref('')
const address10 = ref('')
const address11 = ref('')
const address12 = ref('')
const isEditing = ref(false)
const field_filters = reactive({})
const countryoption =ref([])
let paramsvalue = ref({}) 


const updateparams = () => {
paramsvalue.value = route.params
paramsvalue =paramsvalue.value

}
const quote = createResource({
  url: 'go1_vendor.apidata.get_address',
  params: {
    field_filters: JSON.stringify(field_filters),
  },
  method: 'GET',
})

const fetchQuoteDetails = async () => {
  try {
    const id = route.params.id
    const data = await quote.fetch()
    const QuotationDetails = data.find((items) => items.name === id)
    if (QuotationDetails) {
      address1.value = QuotationDetails.address_title
      address2.value = QuotationDetails.address_type
      address3.value = QuotationDetails.address_line1
      address4.value = QuotationDetails.address_line2
      address5.value = QuotationDetails.city
      address6.value = QuotationDetails.state
      address7.value = QuotationDetails.country
      address8.value = QuotationDetails.pincode
      address9.value = QuotationDetails.email_id
      address10.value = QuotationDetails.phone
      address11.value = QuotationDetails.fax
      address12.value = QuotationDetails.tax_category
    }
  } catch (error) {
    console.error('Error fetching order details:', error)
  }
}

const startEditing = () => {
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
  fetchQuoteDetails() // Fetch details again to reset changes
}

const submitChanges = async () => {
  const issueId = route.params.id
  if (!issueId) return
// for save
  const issueData = {
    address_title: address1.value,
    address_type: address2.value,
    address_line1: address3.value,
    address_line2: address4.value,
    city: address5.value,
    state: address6.value,
    country: address7.value,
    pincode: address8.value,
    email_id: address9.value,
    phone: address10.value,
    fax: address11.value,
    tax_category: address12.value,
  }

  try {
    const response = await fetch(`/api/resource/Address/${issueId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(issueData),
    })
// for update
    if (!response.ok) throw new Error('Error updating address')
    address1.value = issueData.address_title
    address2.value = issueData.address_type
    address3.value = issueData.address_line1
    address4.value = issueData.address_line2
    address5.value = issueData.city
    address6.value = issueData.state
    address7.value = issueData.pincode
    address8.value = issueData.country
    address9.value = issueData.email_id
    address10.value = issueData.phone
    address11.value = issueData.fax
    address12.value = issueData.tax_category

    isEditing.value = false
    router.push({ name: 'Addresses' })
  } catch (error) {
    console.error('Error updating address:', error)
  }
}

const address_typeOptions = [
  { label: 'Billing', value: 'Billing' },
  { label: 'Shipping', value: 'Shipping' },
  { label: 'Office', value: 'Office' },
  { label: 'Personal', value: 'Personal' },
  { label: 'Postal', value: 'Postal' },
  { label: 'Shop', value: 'Shop' },
  { label: 'Subsidiary', value: 'Subsidiary' },
  { label: 'Warehouse', value: 'Warehouse' },
  { label: 'Current', value: 'Current' },
  { label: 'Permanent', value: 'Permanent' },
  { label: 'Other', value: 'Other' },
];

const createCountry = async (limit = 1000) => {
  try {
    const response = await fetch(`/api/resource/Country?fields=["country_name"]&limit=${limit}`);
    if (!response.ok) throw new Error('Network response was not ok');

    const prioritydata = await response.json();
    countryoption.value = prioritydata.data.map((user) => user.country_name) || [];
    
  } catch (error) {
    console.error('Error fetching priorities:', error);
  }
  };

onMounted(async() => {
  await createCountry();
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
