<template>
    <div class="flex h-screen w-screen">
        <div class="h-full border-r bg-gray-50">
          <AppSidebar />
        </div>
        <div class="flex-1 flex flex-col h-full overflow-auto">
          <AppHeader />
          <slot />
          <!-- Passing dynamic 'id' to the handleButtonClick function -->
    <div class="main-content justify-items-center grid grid-cols-1 py-5">
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

        <div class="grid grid-cols-1 p-3">
          <div class="mb-5 text-lg font-medium">
            <h1> Details: </h1>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3 justify-items-stretch text-gray-800">
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Name</span>
              <span class="text-sm font-semibold">{{ name }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Date Value</span>
              <span class="text-sm font-semibold">{{ dateValue }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Required Date</span>
              <span class="text-sm font-semibold">{{ requiredate }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Total Value</span>
              <span class="text-sm font-semibold">{{ total }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Supplier</span>
              <span class="text-sm font-semibold">{{ supplier }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-gray-600 text-sm">Address</span>
              <span class="text-sm font-semibold" v-html="addressLine1 + '<br>' + addressLine2"></span>
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
                  <th class="p-3 text-md font-normal">Quantity</th>
                  <th class="p-3 text-md font-normal">UOM</th>
                  <th class="p-3 text-md font-normal">Rate</th>
                  <th class="p-3 text-md font-normal text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in itemValue" :key="index" class="border-b border-gray-200">
                  <td class="px-3 py-2 w-1/2 text-md font-medium">
                    <p>{{ row.item_code }}</p>
                  </td>
                  <td class="px-3 py-2 text-center text-md font-medium">
                    <p>{{ row.qty }}</p>
                  </td>
                  <td class="px-3 py-2 text-md font-medium">
                    <span>{{ row.uom }}</span>
                  </td>
                  <td class="px-3 py-2 text-center text-md font-medium">
                    <p>{{ row.rate }}</p>
                  </td>
                  <td class="px-3 py-2 text-right text-md font-medium">
                    <p>{{ row.amount }}</p>
                  </td>
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
              <div class="flex justify-between items-center">
                <span class="text-gray-600 text-sm font-medium">Total</span>
                <span class="text-sm font-medium">{{ total }}</span>
              </div>
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
                  <th class="p-3 w-1/2 text-md font-normal">Type</th>
                  <th class="p-3 text-md font-normal">Account Head</th>
                  <th class="p-3 text-md font-normal">Tax Rate</th>
                  <th class="p-3 text-md font-normal">Amount</th>
                  <th class="p-3 text-md font-normal text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in supplierValue" :key="index" class="border-b border-gray-200">
                  <td class="px-3 py-2 w-1/2 text-md font-medium">
                    <p>{{ row.charge_type }}</p>
                  </td>
                  <td class="px-3 py-2 text-center text-md font-medium">
                    <p>{{ row.account_head }}</p>
                  </td>
                  <td class="px-3 py-2 text-md font-medium">
                    <span>{{ row.rate }}</span>
                  </td>
                  <td class="px-3 py-2 text-center text-md font-medium">
                    <p>{{ row.tax_amount }}</p>
                  </td>
                  <td class="px-3 py-2 text-right text-md font-medium">
                    <p>{{ row.total }}</p>
                  </td>
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
    import { ref, computed, onMounted,reactive } from 'vue'
    import { createResource,Badge } from 'frappe-ui'
    import { useRouter, useRoute } from 'vue-router'
    
    
    const router = useRouter();
const route = useRoute();

const isSidebarCollapsed = ref(false);
const name = ref('');
const dateValue = ref('');
const requiredate = ref('');
const inputValue = ref('');
const itemValue = ref([]);
const supplierValue = ref([]);
const supplier = ref('');
const addressLine1 = ref('');
const addressLine2 = ref('');
const total = ref('');
const total_taxes = ref('');
const field_filters=reactive({})

const quote = createResource({
  url: 'go1_vendor.apidata.get_purchaseorder',
  params: {
    'field_filters':JSON.stringify(field_filters)
  }, 
  method: 'GET',
});

const fetchQuoteDetails = async () => {
  try {
    const id = route.params.id;
    const data = await quote.fetch();
    const QuotationDetails = data.find((items) => items.name === id);
    
    if (QuotationDetails) {
      name.value = QuotationDetails.name;
      inputValue.value = QuotationDetails.status;
      dateValue.value = QuotationDetails.transaction_date;
      requiredate.value = QuotationDetails.transaction_date;
      itemValue.value = QuotationDetails.items || [];
      supplierValue.value = QuotationDetails.taxes || [];
      total.value = QuotationDetails.total;
      total_taxes.value = QuotationDetails.total_taxes_and_charges;
      supplier.value = QuotationDetails.supplier;
      addressLine1.value = QuotationDetails.supplier_address;
      addressLine2.value = QuotationDetails.address_display;
    }
  } catch (error) {
    console.error('Error fetching order details:', error);
  }
};

onMounted(() => {
  fetchQuoteDetails();
});

const getTheme = (inputValue) => {
  const themes = {
    'Paid': 'green',
    'Completed': 'blue',
    'Draft': 'red',
    'Closed': 'orange',
  };
  return themes[inputValue] || 'gray';
};
    </script>
    