<template>


    <div class="flex h-screen w-screen">
        <div class="h-full border-r bg-gray-50">
          <AppSidebar />
        </div>
        <div class="flex-1 flex flex-col h-full overflow-auto">
          <div class=" mb-2 border-b p-1">
          <div v-if="paramsvalue && Object.keys(paramsvalue).length > 0" class="flex flex-1 items-center h-12">
      <router-link to="/supplier-quotation">
        <span class="ml-3">Supplier Quotations / {{ paramsvalue.id }}</span>
      </router-link>
    </div>
    </div>
          <!-- <AppHeader /> -->
          <slot />
          <!-- Passing dynamic 'id' to the handleButtonClick function -->
          <div class="main-content justify-items-center grid grid-cols-1 py-10 overflow-auto">
      <div class="grid grid-cols-1 content-start gap-3 m-2 w-8/12 bg-white border rounded-md pb-5">
        <!-- heading -->
        <div class="px-3 py-3 border-b">
          <div class="flex justify-between items-center">
            <span class="text-xl text-cyan-600 font-semibold">{{ name }}</span>
            <Badge :variant="'subtle'" :theme="getTheme(inputValue)" size="md" label="Badge">
              {{ inputValue }}
            </Badge>
          </div>
        </div>

        <!-- details -->
        <div class="grid grid-cols-1 p-3">
          <div class="mb-5 text-lg font-medium">
            <h1> Details: </h1>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 justify-items-stretch text-gray-800">

          <div class="flex flex-col gap-1">
            <span class="text-gray-600 text-sm">Date Value</span>
            <span class="text-sm font-semibold py-2">{{ dateValue }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-gray-600 text-sm">Status</span>
            <span class="text-sm font-semibold py-2">{{ inputValue }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-gray-600 text-sm">Total Value</span>
            <span class="text-sm font-semibold py-2">{{ total }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-gray-600 text-sm">Supplier</span>
            <span class="text-sm font-semibold py-2">{{ supplier }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-gray-600 text-sm">Due Date Value</span>
            <span class="text-sm font-semibold py-2">{{ duedateValue }}</span>
          </div>
         <div class="flex flex-col gap-1">
            <span class="text-gray-600 text-sm">Supplier Address</span>
            <span class="text-sm font-semibold py-2">{{ supplieraddress }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-gray-600 text-sm">Address</span>
            <span class="text-sm font-semibold py-2" v-html="address"></span>
          </div>
          </div>
        </div>

        <!-- items -->
        <div class="grid grid-cols-1">
          <div class="w-full">
            <table class="w-full text-xs text-left whitespace-nowrap">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr class="bg-gray-100">
                  <th class="p-3 w-1/2 text-md font-normal">Item code</th>
                  <th class="p-3 text-md text-center font-normal">Quantity</th>
                  <th class="p-3 text-md text-center font-normal">UOM</th>
                  <th class="p-3 text-md font-normal text-center">Rate</th>
                  <th class="p-3 text-md font-normal text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in itemValue" :key="index" class="border-b border-gray-200">
                  <td class="px-3 py-2 w-1/2 text-md font-medium">{{ row.item_code }}</td>
                  <td class="px-3 py-2 text-center text-md font-medium">{{ row.qty }}</td>
                  <td class="px-3 py-2 text-md text-center font-medium">{{ row.uom }}</td>
                  <td class="px-3 py-2 text-right text-md font-medium">{{ row.rate }}</td>
                  <td class="px-3 py-2 text-right text-md font-medium">{{ row.amount }}</td>
                </tr>
              </tbody>
            </table>       
          </div>
        </div>

        <div class="grid grid-cols-1 p-3">
          <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div></div>
            <div class="flex flex-col w-full gap-3">
             
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm font-medium">Total</span>
                <span class="text-sm font-medium">{{ total }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1">
          <div v-if="supplierValue[0]" class="w-full mt-3">
            <table class="w-full text-xs text-left whitespace-nowrap">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr class="bg-gray-100">
                  <th class="p-3 w-1/2 text-md font-normal">Type</th>
                  <th class="p-3 text-md text-center font-normal">Account Head</th>
                  <th class="p-3 text-md text-center font-normal">Tax Rate</th>
                  <th class="p-3 text-md text-center font-normal">Amount</th>
                  <th class="p-3 text-md font-normal text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in supplierValue" :key="index" class="border-b border-gray-200">
                  <td class="px-3 py-2 w-1/2 text-md font-medium">{{ row.charge_type }}</td>
                  <td class="px-3 py-2 text-center text-md font-medium">{{ row.account_head }}</td>
                  <td class="px-3 py-2 text-md  text-center font-medium">{{ row.rate }}</td>
                  <td class="px-3 py-2 text-center text-md font-medium">{{ row.tax_amount }}</td>
                  <td class="px-3 py-2 text-right text-md font-medium">{{ row.total }}</td>
                </tr>
              </tbody>
            </table>       
          </div>
        </div>

        <div class="grid grid-cols-1 p-3">
          <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div></div>
            <div class="flex flex-col w-full gap-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm font-medium">Tax Amount</span>
                <span class="text-sm font-medium">{{ total_taxes }}</span>
              </div>
              <hr>
              <div class="flex justify-between items-center mt-3">
                <span class="text-gray-600 text-sm font-medium">Grand Total</span>
                <span class="text-sm font-medium">{{ grand_total }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm font-medium">Rounded Total</span>
                <span class="text-sm font-medium">{{ rounded_total }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm font-medium">In Words</span>
                <span class="text-sm font-medium w-3/5 text-right">{{ in_words }}</span>
              </div>
              
            </div>
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
import { ref, computed, onMounted,reactive,watch } from 'vue'
import { createResource,Badge } from 'frappe-ui'
import { useRouter, useRoute } from 'vue-router'
    
const route = useRoute()
   
const name = ref('')
const dateValue = ref('')
const inputValue = ref('')
const itemValue = ref([])
const supplierValue = ref([])
const supplier = ref('')
const duedateValue = ref('')
const supplieraddress = ref('')
const address = ref('')
const total = ref('')
const grand_total=ref('')
const rounded_total=ref('')
const in_words =ref('')
const total_taxes = ref('')
const field_filters=reactive({})
let paramsvalue = ref({}) 


const updateparams = () => {
paramsvalue.value = route.params
paramsvalue =paramsvalue.value

}
// Create a resource for fetching data
const quote = createResource({
  url: 'go1_vendor.apidata.get_supplierquotation',
  params: {
    'field_filters':JSON.stringify(field_filters)
  }, 
  method: 'GET',
})

const fetchQuoteDetails = async () => {
  try {
    const id = useRoute().params.id
    const data = await quote.fetch()
    const QuotationDetails = data.find((items) => items.name === id)
 

    if (QuotationDetails) {
      name.value = QuotationDetails.name
      inputValue.value = QuotationDetails.status
      dateValue.value = QuotationDetails.transaction_date
      supplier.value = QuotationDetails.supplier
      duedateValue.value = QuotationDetails.valid_till
      supplieraddress.value = QuotationDetails.supplier_address
      address.value = QuotationDetails.address_display
      total.value = QuotationDetails.total
      grand_total.value = QuotationDetails.grand_total;
      in_words.value =QuotationDetails.in_words;
      rounded_total.value=QuotationDetails.rounded_total;
      total_taxes.value = QuotationDetails.total_taxes_and_charges
      itemValue.value = QuotationDetails.items || []
      supplierValue.value = QuotationDetails.taxes || []
      console.log("hit",QuotationDetails)
    }
  } catch (error) {
    console.error('Error fetching order details:', error)
  }
}
onMounted(() => {
  fetchQuoteDetails()
  updateparams();

})

// onMounted(fetchQuoteDetails)

// Computed properties
const getTheme = (inputValue) => {
  if (inputValue === 'Cancelled') return 'green';
  if (inputValue === 'Completed') return 'blue';
  if (inputValue === 'Draft') return 'red';
  if (inputValue === 'Closed') return 'orange';
  return 'gray';
}
watch(
  () => route.fullPath, 
  () => {
    updateparams();
   
  }
);
    
</script>
    