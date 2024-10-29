<template> 
    <div class="flex h-screen w-screen ">
        <div class="h-full border-r bg-gray-50">
          <AppSidebar />
        </div>
        <div class="flex-1 flex flex-col h-full overflow-auto">
          <AppHeader />
          <slot />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-10 overflow-auto ">
            <div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Address Title"
                v-model="address_title"
                class="mb-5"
              />
              <div>
              <FormControl
                type="select"
                size="md"
                :options="address_typeOptions"
                variant="subtle"
                label="Address Type * "
                v-model="address_type"
                class="mb-5"
              />
            </div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Address Line 1 * "
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
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="City * "
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
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Country * "
                v-model="country"
                class="mb-5"
              />
              <FormControl
                size="md"
                variant="subtle"
                label="Postal Code * "
                v-model="pincode"
                class="mb-5"
              />
            </div>

            <div>
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
                label="Phone * "
                v-model="phone"
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
          </div>
          <div class="flex justify-end gap-4 mt-4">
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
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import AppSidebar from '@/components/Layouts/AppSidebar.vue';
import AppHeader from '@/components/Layouts/AppHeader.vue';
import { useRouter } from 'vue-router';
import { Button, FormControl, Checkbox, createResource } from 'frappe-ui';

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
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchorder();
});
</script>

