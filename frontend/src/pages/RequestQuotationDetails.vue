<template>


<div class="flex h-screen w-screen">
    <div class="h-full border-r bg-gray-50">
      <AppSidebar />
    </div>
    <div class="flex-1 flex flex-col h-full overflow-auto">
      <AppHeader />
      <slot />
      <!-- Passing dynamic 'id' to the handleButtonClick function -->
    <div class="main-content justify-items-center grid grid-cols-1 py-10 h-[550px] overflow-auto">
      <div class="grid grid-cols-1 content-start gap-3 m-2 w-8/12 bg-white border rounded-md pb-5">
        <div class="px-3 py-3 border-b">
          <div class="flex justify-between items-center">
            <span class="text-xl text-cyan-600 font-semibold">{{ name }}</span>
            <Badge :variant="'subtle'" :theme="getTheme(inputValue)" size="md" label="Badge">
              {{ inputValue }}
            </Badge>
          </div>
        </div>

        <div class="grid grid-cols-1 p-3">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 justify-items-stretch text-gray-800">
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Name</span>
              <span class="text-sm font-semibold">{{ name }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Date</span>
              <span class="text-sm font-semibold">{{ datevalue }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Company</span>
              <span class="text-sm font-semibold">{{ company }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Billing Details</span>
              <span class="text-sm font-semibold" v-html="billing_details"></span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Billing Address</span>
              <span class="text-sm font-semibold">{{ billing_address }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Status</span>
              <span class="text-sm font-semibold">{{ inputValue }}</span>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 p-3" v-if="supplierValue[0]">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 justify-items-stretch text-gray-800">
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Supplier</span>
              <span class="text-sm font-semibold">{{ supplierValue[0].supplier }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Contact</span>
              <span class="text-sm font-semibold">{{ supplierValue[0].contact }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Quote Status</span>
              <span class="text-sm font-semibold">{{ supplierValue[0].quote_status }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Supplier Name</span>
              <span class="text-sm font-semibold">{{ supplierValue[0].supplier_name }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Email ID</span>
              <span class="text-sm font-semibold">{{ supplierValue[0].email_id }}</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1">
          <div class="w-full">
            <table class="w-full text-xs text-left whitespace-nowrap">
              <colgroup>
                <col>
                <col>
                <col>
                <col>
                <col>
              </colgroup>
              <thead>
                <tr class="bg-gray-100">
                  <th class="p-3 w-1/2 text-md font-normal">Item code</th>
                  <th class="p-3 text-md font-normal text-right">Required Date</th>
                  <th class="p-3 text-md font-normal">Quantity</th>
                  <th class="p-3 text-md font-normal">UOM</th>
                  <th class="p-3 text-md font-normal text-center">Warehouse</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in itemValue" :key="index" class="border-b border-gray-200">
                  <td class="px-3 py-2 w-1/2 text-md font-medium">{{ row.item_code }}</td>
                  <td class="px-3 py-2 text-center text-md font-medium">{{ row.schedule_date }}</td>
                  <td class="px-3 py-2 text-md font-medium">{{ row.qty }}</td>
                  <td class="px-3 py-2 text-md font-medium">{{ row.uom }}</td>
                  <td class="px-3 py-2 text-right text-md font-medium">{{ row.warehouse }}</td>
                </tr>
              </tbody>
            </table>
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
import { ref, onMounted, reactive } from 'vue'
import { createResource,Badge } from 'frappe-ui'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()

const name = ref('')
const datevalue = ref('')
const company = ref('')
const billing_details = ref('')
const billing_address = ref('')
const inputValue = ref('')
const itemValue = ref([])
const supplierValue = ref([])
const field_filters=reactive({})

const quote = createResource({
  url: 'go1_vendor.apidata.get_quotation',
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
    console.log("dataquote",QuotationDetails)
    if (QuotationDetails) {
      itemValue.value = QuotationDetails.items || []
      supplierValue.value = QuotationDetails.suppliers || []
      name.value = QuotationDetails.name
      inputValue.value = QuotationDetails.status
      datevalue.value = QuotationDetails.transaction_date
      company.value = QuotationDetails.company
      billing_details.value = QuotationDetails.billing_address_display
      billing_address.value = QuotationDetails.billing_address
    }
  } catch (error) {
    console.error('Error fetching order details:', error)
  }
}

console.log("data",quote)

onMounted(() => {
  fetchQuoteDetails()
})

const getTheme = (inputValue) => {
  if (inputValue === 'Cancelled') return 'green'
  if (inputValue === 'Completed') return 'blue'
  if (inputValue === 'Draft') return 'red'
  if (inputValue === 'Closed') return 'orange'
  return 'gray'
}

</script>
