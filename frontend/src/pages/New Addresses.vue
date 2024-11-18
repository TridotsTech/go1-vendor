<template> 
    <div class="flex h-screen w-screen ">
        <div class="h-full border-r bg-gray-50">
          <AppSidebar />
        </div>
        <div class="flex-1 flex flex-col h-full overflow-auto">
          <div class=" mb-2 border-b p-4">
            <span>New Address</span>
    </div>
          <!-- <AppHeader /> -->
          <slot />
          <div class="main-content justify-items-center grid grid-cols-1 py-10 h-[550px]">
      <div class="grid grid-cols-1 content-start gap-3 m-2 w-8/12 bg-white border rounded-md pb-5">
        <div class="px-3 py-3 border-b">
          <div class="flex justify-between items-center">
            <span class="text-xl text-cyan-600 font-semibold"> New Address</span>
           
          </div>
        </div>
        <div class="grid grid-cols-1 p-3">
          <div class="mb-5 text-lg font-medium">
            <h1>Details:</h1>
          </div>
          <div class="grid grid-cols-3 md:grid-cols-3 gap-3 justify-items-stretch text-gray-800">
            
            
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Address Title"
                v-model="address_title"
                class="mb-5"
              /> 
              <!-- <ErrorMessage :message="'*'" class="mt-2 mx-5" /> -->
              <FormControl
                type="select"
                size="md"
                :options="address_typeOptions"
                variant="subtle"
                label="Address Type"
                v-model="address_type"
                class="mb-5"
              />
              <!-- <ErrorMessage :message="'*'" class="mt-2 mx-5" /> -->
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Address Line 1"
                v-model="address_line1"
                class="mb-5"
              />
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Address Line 2"
                v-model="address_line2"
                class="mb-5"
              />
              <!-- <ErrorMessage :message="'*'" class="mt-2 mx-5" /> -->
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="City"
                v-model="city"
                class="mb-5"
              />
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="State"
                v-model="state"
                class="mb-5"
              />
              <!-- <ErrorMessage :message="'*'" class="mt-2 mx-5" /> -->
              <FormControl
                type="select"
                size="md"
                variant="subtle"
                label="Country * "
                v-model="country"
                :options="customOption"
                class="mb-5"
              />
              <FormControl
                size="md"
                variant="subtle"
                label="Postal Code"
                v-model="pincode"
                class="mb-5"
              />
              <FormControl
                type="email"
                size="md"
                variant="subtle"
                label="Email"
                v-model="email_id"
                class="mb-5"
              />
              <FormControl
                size="md"
                variant="subtle"
                label="Phone"
                v-model="phone"
                class="mb-5"
              />
              <FormControl v-if="logged_users.data"
                :type="text"
                size="md"
                variant="subtle"
                label="Link Doctype"
                v-model="text"
                :disabled="true"
                class="mb-5"
              />

              <FormControl v-if="logged_users.data"
                :type="text"  
                size="md"
                variant="subtle"
                label="Link Name"
                :disabled="true"
                v-model="logged_users.data"
                class="mb-5"
              />
            
              <div class="p-2">
                <Checkbox
                  size="sm"
                  v-model="isPreferredBilling"
                  label="Preferred Billing Address"
                />
              </div>
              <div class="p-2">
                <Checkbox
                  size="sm"
                  v-model="isPreferredShipping"
                  label="Preferred Shipping Address"
                />
              </div>
            
          </div> 
          <div class="flex justify-end gap-4 mt-1  ">
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
import { ref, watch, onMounted } from 'vue';
import AppSidebar from '@/components/Layouts/AppSidebar.vue';
// import AppHeader from '@/components/Layouts/AppHeader.vue';
import { useRouter } from 'vue-router';
import { Button, FormControl, Checkbox, createResource, ErrorMessage } from 'frappe-ui';

const router = useRouter();

const address_title = ref('');
const address_type = ref('');
const address_line1 = ref('');
const address_line2 = ref('');
const city = ref('');
const state = ref('');
const pincode = ref('');
const country = ref('');
const email_id = ref('');
const phone = ref('');
const isPreferredBilling = ref(false);
const isPreferredShipping = ref(false);
const customOption = ref([]);
const linkName = ref('');
const text = ref('Supplier');
const rows = ref('');


const users = createResource({
    url: 'go1_vendor.apidata.get_test',
    cache: ['true']
});
users.fetch();
const logged_users = users;



const optionsCountry = async (limit = 1000) => {
  try {
    const response = await fetch(`/api/resource/Country?fields=["country_name"]&limit=${limit}`);
    if (!response.ok) throw new Error('Network response was not ok');

    const countrydata = await response.json();
    customOption.value = countrydata.data.map((user) => user.country_name) || [];
  } catch (error) {
    console.error('Error fetching Country:', error);
  }
};
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

const cancelEditing = () => {
  address_title.value = '';
  address_type.value = '';
  address_line1.value = '';
  address_line2.value = '';
  city.value = '';
  state.value = '';
  pincode.value = '';
  country.value = '';
  email_id.value = '';
  phone.value = '';
  isPreferredBilling.value = false;
  isPreferredShipping.value = false;
};

const createIssue = async () => {
  const validations = [
    { value: address_title.value, message: "Address Title is required." },
    { value: address_type.value, message: "Address Type is required." },
    { value: address_line1.value, message: "Address line1 is required." },
    { value: city.value, message: "City is required." },
    { value: country.value, message: "Country is required." },
  ];

  for (const { value, message } of validations) {
    if (!value) {
      alert(message);
      return;
    }
  }

  const addressData = {
    address_title: address_title.value,
    address_type: address_type.value,
    city: city.value,
    address_line1: address_line1.value,
    address_line2: address_line2.value,
    state: state.value,
    pincode: pincode.value,
    country: country.value,
    email_id: email_id.value,
    phone: phone.value,
    is_primary_address: isPreferredBilling.value,
    is_shipping_address: isPreferredShipping.value
  };
  if (linkName.value) {
    addressData.links = [
      {
        link_doctype: text,
        link_name: linkName.value,
      },
    ];
  }
  try {
    const response = await fetch('/api/resource/Address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(addressData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error creating address: ${errorText}`);
    }

    router.push({ name: 'Addresses' });
  } catch (error) {
    console.error('Error creating address:', error);
  }
};


const address_list = createResource({
  url: 'go1_vendor.api.get_supplier',
  cache: ['data'],
  auto: true,
});

const fetchorder = async () => {
  try {
    const data = await address_list.fetch();
    rows.value = data
    console.log('Fetched data:', rows.value)
    linkName.value = rows.value[0];
    // console.log('Link Name:', linkName.value)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(async () => {
  await optionsCountry();
  fetchorder();
});
</script>

