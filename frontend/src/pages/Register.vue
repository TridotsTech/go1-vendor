<!-- 
<template>
  <h3 class="sign p-2">Sign up</h3>
  <div class=" tab border w-max p-2">
  <Tabs v-slot="{ tab }" v-model="state.index" :tabs="state.tabs_without_icon">
      <div class="p-5">
        {{ tab.content }}
  <div class="signup grid grid-cols-1 md:grid-cols-2 gap-5 p-6  overflow-auto w-max mt-10">
      <div class="w-96">
        <FormControl
          type="text"
          size="md"
          variant="subtle"
          label="First Name"
          v-model="first_name"
          class="mb-5"
        />
        <FormControl
          type="text"
          size="md"
          variant="subtle"
          label="Mobile Number"
          v-model="phone"
          class="mb-5"
        />
        <FormControl
          type="email"
          size="md"
          variant="subtle"
          label="Email"
          v-model="email"
          class="mb-5"
        />
        <FormControl
          type="text"
          size="md"
          variant="subtle"
          label="Last Name"
          v-model="last_name"
          class="mb-5"
        />
        <FormControl
          type="text"
          size="md"
          variant="subtle"
          label="Alternate Mobile Number"
          v-model="alternate_mobile_number"
          class="mb-5"
        />
        <FormControl
          type="text"
          size="md"
          variant="subtle"
          label="Address"
          v-model="address"
          class="mb-5"
        />
      </div>
      <div>
        <FormControl
          type="text"
          size="md"
          variant="subtle"
          label="Country *"
          v-model="country"
          class="mb-5"
        />
        <FormControl
          type="text"
          size="md"
          variant="subtle"
          label="Zipcode *"
          v-model="zipcode"
          class="mb-5"
        />
        <FormControl
          type="text"
          size="md"
          variant="subtle"
          label="Longitude"
          v-model="longitude"
          class="mb-5"
        />
        <FormControl
          type="text"
          size="md"
          variant="subtle"
          label="Phone"
          v-model="latitude"
          class="mb-5"
        />
        <FormControl
          type="text"
          size="md"
          variant="subtle"
          label="State"
          v-model="states"
          class="mb-5"
        />
        <FormControl
          type="text"
          size="md"
          variant="subtle"
          label="City"
          v-model="city"
          class="mb-5"
        />
        <Button
          variant="solid"
          theme="gray"
          size="md"
          label="Save"
          @click="createIssue"
        />
      </div>
  </div>
  </div>
</Tabs>
</div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { Button, FormControl, Tabs } from 'frappe-ui';
import { ref, reactive } from 'vue';

const router = useRouter();

const state = reactive({
  index: 0,
  tabs_without_icon: [
    { label: 'Personal Details', content: ' ' },
    { label: 'Business Details', content: 'formdata.lastname' },
  ],
});

const first_name = ref('');
const last_name = ref('');
const phone = ref('');
const alternate_mobile_number = ref('');
const email = ref('');
const address = ref('');
const country = ref('');
const zipcode = ref('');
const longitude = ref('');
const latitude = ref('');
const states = ref('');
const city = ref('');


const createIssue = async () => {
 
  const RegisterData = {
    first_name: first_name.value,
    last_name: last_name.value,
    phone: phone.value,
    alternate_mobile_number: alternate_mobile_number.value,
    email: email.value,
    states: state.value,
    zipcode: zipcode.value,
    country: country.value,
    longitude: longitude.value,
    latitude: latitude.value,
    address: address.value,
    city: city.value
  };
  try {
    const response = await fetch('/api/resource/Supplier Registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(RegisterData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      // throw new Error(`Error creating registration: ${errorText}`);
    }

    router.push({ name: 'Login' });
  } catch (error) {
    console.error('Error creating registration:', error);
  }
};
</script>
<style>
.signup {
  margin-left: 10px;
}
.sign {
  margin-left: 200px;
}
.tab {
  margin-left: 200px;
}
</style> -->

<template>
  <h3 class="sign p-2">Sign up</h3>
  <div class="tab border w-max p-2">
    <Tabs v-slot="{ tab }" v-model="state.index" :tabs="state.tabs_without_icon">
      <div class="p-5">
        {{ tab.content }}
        <div class="signup grid grid-cols-1 md:grid-cols-2 gap-5 p-6 overflow-auto w-max mt-10">
          <div class="w-96">
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              label="First Name"
              v-model="first_name"
              class="mb-5"
            />
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              label="Mobile Number"
              v-model="phone"
              class="mb-5"
            />
            <FormControl
              type="email"
              size="md"
              variant="subtle"
              label="Email"
              v-model="email"
              class="mb-5"
            />
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              label="Last Name"
              v-model="last_name"
              class="mb-5"
            />
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              label="Alternate Mobile Number"
              v-model="alternate_mobile_number"
              class="mb-5"
            />
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              label="Address"
              v-model="address"
              class="mb-5"
            />
          </div>
          <div>
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              label="Country *"
              v-model="country"
              class="mb-5"
            />
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              label="Zipcode *"
              v-model="zipcode"
              class="mb-5"
            />
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              label="Longitude"
              v-model="longitude"
              class="mb-5"
            />
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              label="Latitude"
              v-model="latitude"
              class="mb-5"
            />
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              label="State"
              v-model="states"
              class="mb-5"
            />
            <FormControl
              type="text"
              size="md"
              variant="subtle"
              label="City"
              v-model="city"
              class="mb-5"
            />
            <Button
              variant="solid"
              theme="gray"
              size="md"
              label="Save"
              @click="createIssue"
            />
          </div>
        </div>
      </div>
    </Tabs>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { Button, FormControl, Tabs } from 'frappe-ui';
import { ref, reactive } from 'vue';

const router = useRouter();

const state = reactive({
  index: 0,
  tabs_without_icon: [
    { label: 'Personal Details', content: ' ' },
    { label: 'Business Details', content: 'formdata.lastname' },
  ],
});

const first_name = ref('');
const last_name = ref('');
const phone = ref('');
const alternate_mobile_number = ref('');
const email = ref('');
const address = ref('');
const country = ref('');
const zipcode = ref('');
const longitude = ref('');
const latitude = ref('');
const states = ref('');
const city = ref('');

const validateForm = () => {
  return first_name.value && last_name.value && phone.value && email.value && country.value && zipcode.value;
};

const createIssue = async () => {
  // if (!validateForm()) {
  //   alert('Please fill out all required fields.');
  //   return;
  // }

  const RegisterData = {
    first_name: first_name.value,
    last_name: last_name.value,
    phone: phone.value,
    alternate_mobile_number: alternate_mobile_number.value,
    email: email.value,
    states: states.value,
    zipcode: zipcode.value,
    country: country.value,
    longitude: longitude.value,
    latitude: latitude.value,
    address: address.value,
    city: city.value
  };
console.log('register',RegisterData)
  try {
    const response = await fetch('/api/resource/SupplierRegistration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(RegisterData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      // alert(`Error creating registration: ${errorText}`);
      return;
    }

    alert('Registration successful!');
    router.push({ name: 'Login' });
  } catch (error) {
    console.error('Error creating registration:', error);
    alert('An unexpected error occurred. Please try again later.');
  }
};
</script>

<style>
.signup {
  margin-left: 10px;
}
.sign {
  margin-left: 200px;
}
.tab {
  margin-left: 200px;
}
</style>
