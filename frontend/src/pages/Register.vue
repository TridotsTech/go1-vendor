  <!-- <template>
    <div class="max-h-screen flex items-center justify-center overflow-auto">
      <Card class="w-full max-w-2xl mt-12 mb-4 border-blue-600">
        <button 
      @click="goToLogin"
      class="absolute right-40 p-2 text-lg font-semibold text-gray-600 hover:text-gray-800 focus:outline-none"
    >
      ×
    </button>
        <div class="flex justify-center p-3 mt-0">
          <Avatar :shape="'square'" image="/assets/go1_vendor/image/logo.svg" label="EY" size="2xl" />
        </div>
        <h1 class="text-center text-3xl font-semibold text-gray-900 mb-4">Become a vendor!</h1>
        <form class="flex flex-col w-full">
          <div class="signup grid grid-cols-1 md:grid-cols-2 gap-5 p-6 overflow-auto w-full">
            <div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="First Name *"
                v-model="first_name"
                class="p-2"
                @input="clearError('first_name')"
              />
              <div class="ml-2.5">
              <ErrorMessage v-if="errorMessages.first_name" :message="errorMessages.first_name" /></div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Email *"
                v-model="email"
                class="p-2"
                @input="clearError('email')"
              />
              <div class="ml-2.5">
              <ErrorMessage v-if="errorMessages.email" :message="errorMessages.email" /></div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Address Line1"
                v-model="address_line1"
                class="p-2"
                @input="clearError('address_line1')"
              />  
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="City *"
                v-model="city"
                class="p-2"
                @input="clearError('city')"
              />
              <div class="ml-2.5">
              <ErrorMessage v-if="errorMessages.city" :message="errorMessages.city" /></div>
              <FormControl
                type="select"
                size="md"
                variant="subtle"
                label="Country *"
                :options="customOption"
                v-model="country"
                class="p-2"
                @input="clearError('country')"
              />
              <div class="ml-2.5">
              <ErrorMessage v-if="errorMessages.country" :message="errorMessages.country" /></div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Website"
                v-model="website"
                class="p-2"
              />
            </div>
  
            <div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Last Name *"
                v-model="last_name"
                class="p-2"
                @input="clearError('last_name')"
              />
              <div class="ml-2.5">
              <ErrorMessage v-if="errorMessages.last_name" :message="errorMessages.last_name" /></div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Phone *"
                v-model="phone1"
                class="p-2"
                @input="clearError('phone1')"
              />
              <div class="ml-2.5">
              <ErrorMessage v-if="errorMessages.phone1" :message="errorMessages.phone1" /></div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Address Line2"
                v-model="address_line2"
                class="p-2"
                @input="clearError('address_line2')"
              />
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="State *"
                v-model="state"
                class="p-2"
                @input="clearError('state')"
              />
              <div class="ml-2.5">
              <ErrorMessage v-if="errorMessages.state" :message="errorMessages.state" /></div>
  
  
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Postal Code *"
                v-model="zip_code"
                class="p-2"
                @input="clearError('zip_code')"
              />
              <div class="ml-2.5">
              <ErrorMessage v-if="errorMessages.zip_code" :message="errorMessages.zip_code" /></div>
  
            </div>
          </div>
          <div class="flex justify-center">
          <Button
            variant="solid"
            theme="blue"
            size="md"
            label="Save"
            @click="createIssue"
          />
        </div>
        </form>
      </Card>
    </div>
  </template>
 <script lang="ts" setup>
  import { ref, onMounted, watch } from 'vue';
  import { Avatar, Button, ErrorMessage, FormControl, createResource } from 'frappe-ui';
  import { useRouter } from 'vue-router';
  
  const customOption = ref<string[]>([]);
  const first_name = ref('');
  const last_name = ref('');
  const phone1 = ref('');
  const country = ref('');
  const email = ref('');
  const website = ref('');
  const address_line1 = ref('');
  const address_line2 = ref('');
  const city = ref('');
  const state = ref('');
  const zip_code = ref('');
  const errorMessages = ref<{ [key: string]: string }>({}); 
  
  const registerdata = ref({
    first_name: '',
    last_name: '',
    phone: '',
    country: '',
    email: '',
    website: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: ''
  });
  
  const router = useRouter();
  
  const optionsCountry = async (limit = 1000) => {
    try {
      const response = await fetch(
        `/api/resource/Country?fields=["country_name"]&limit=${limit}`
      );
      if (!response.ok) throw new Error('Network response was not ok');
  
      const prioritydata = await response.json();
      customOption.value = prioritydata.data.map((user: any) => user.country_name) || [];
    } catch (error) {
      console.error('Error fetching Country:', error);
    }
  };
  
  const createIssue = async (event: Event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    errorMessages.value = {};
  
    // Validate the fields
    if (!first_name.value) errorMessages.value.first_name = 'First Name is required.';
    if (!last_name.value) errorMessages.value.last_name = 'Last Name is required.';
    if (!address_line1.value) errorMessages.value.address_line1 = 'Address Line1 is required.';
    if (!address_line2.value) errorMessages.value.address_line2 = 'Address Line2 is required.';
    if (!city.value) errorMessages.value.city = 'City is required.';
    if (!state.value) errorMessages.value.state = 'State is required.';
    if (!country.value) errorMessages.value.country = 'Country is required.';
    if (!zip_code.value) errorMessages.value.zip_code = 'Postal Code is required.';
    if (!email.value) errorMessages.value.email = 'Email is required.';
    if (!phone1.value) errorMessages.value.phone1 = 'Phone is required.';
  
    // If any mandatory fields are missing, stop the registration process
    if (Object.keys(errorMessages.value).length > 0) {
      return;
    }
  
    // Update the registerdata ref with the form values
    registerdata.value = {
      first_name: first_name.value,
      last_name: last_name.value,
      phone: phone1.value,
      country: country.value,
      email: email.value,
      website: website.value,
      address_line1: address_line1.value,
      address_line2: address_line2.value,
      city: city.value,
      state: state.value,
      zip_code: zip_code.value
    };
    // Send the data to the backend
    const RegisterDetails = createResource({
      url: 'go1_vendor.apidata.get_register',
      params: {
        'registerdata': JSON.stringify(registerdata.value)
      },
      method: 'GET',
    });
  
    await RegisterDetails.fetch();
  
    console.log('Data submitted:', registerdata.value);
  
    // Redirect to the login page after submission
    router.push('/account/login');
  };
  
  // Watch registerdata to ensure it updates correctly
  watch(registerdata, (new_registerdata) => {
    // You can handle any changes to registerdata here if needed
    console.log('Register data changed:', new_registerdata);
  }, { deep: true });
  
  // Method to clear error message when input changes
  const clearError = (field: string) => {
    if (errorMessages.value[field]) {
      delete errorMessages.value[field];
    }
  };
  const goToLogin = () => {
    router.push('/account/login');
  };
  onMounted(async () => {
    await optionsCountry();
  });
  </script> -->
  <template>
    <div class="max-h-screen flex items-center justify-center overflow-auto">
      <Card class="w-full max-w-2xl mt-12 mb-4 border-blue-600 relative">
        <!-- Cancel Button within the Card -->
        <button 
          @click="goToLogin"
          class="absolute top-4 right-4 p-2 text-lg font-semibold text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          ×
        </button>
        
        <div class="flex justify-center p-3 mt-0">
          <Avatar :shape="'square'" image="/assets/go1_vendor/image/logo.svg" label="EY" size="2xl" />
        </div>
        <h1 class="text-center text-3xl font-semibold text-gray-900 mb-4">Become a vendor!</h1>
        <form class="flex flex-col w-full">
          <div class="signup grid grid-cols-1 md:grid-cols-2 gap-5 p-6 overflow-auto w-full">
            <!-- Form controls (same as your original form code) -->
            <div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="First Name *"
                v-model="first_name"
                class="p-2"
                @input="clearError('first_name')"
              />
              <div class="ml-2.5">
                <ErrorMessage v-if="errorMessages.first_name" :message="errorMessages.first_name" /></div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Email *"
                v-model="email"
                class="p-2"
                @input="clearError('email')"
              />
              <div class="ml-2.5">
                <ErrorMessage v-if="errorMessages.email" :message="errorMessages.email" /></div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Address Line1"
                v-model="address_line1"
                class="p-2"
                @input="clearError('address_line1')"
              />  
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="City *"
                v-model="city"
                class="p-2"
                @input="clearError('city')"
              />
              <div class="ml-2.5">
                <ErrorMessage v-if="errorMessages.city" :message="errorMessages.city" /></div>
              <FormControl
                type="select"
                size="md"
                variant="subtle"
                label="Country *"
                :options="customOption"
                v-model="country"
                class="p-2"
                @input="clearError('country')"
              />
              <div class="ml-2.5">
                <ErrorMessage v-if="errorMessages.country" :message="errorMessages.country" /></div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Website"
                v-model="website"
                class="p-2"
              />
            </div>
  
            <div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Last Name *"
                v-model="last_name"
                class="p-2"
                @input="clearError('last_name')"
              />
              <div class="ml-2.5">
                <ErrorMessage v-if="errorMessages.last_name" :message="errorMessages.last_name" /></div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Phone *"
                v-model="phone1"
                class="p-2"
                @input="clearError('phone1')"
              />
              <div class="ml-2.5">
                <ErrorMessage v-if="errorMessages.phone1" :message="errorMessages.phone1" /></div>
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Address Line2"
                v-model="address_line2"
                class="p-2"
                @input="clearError('address_line2')"
              />
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="State *"
                v-model="state"
                class="p-2"
                @input="clearError('state')"
              />
              <div class="ml-2.5">
                <ErrorMessage v-if="errorMessages.state" :message="errorMessages.state" /></div>
  
              <FormControl
                type="text"
                size="md"
                variant="subtle"
                label="Postal Code *"
                v-model="zip_code"
                class="p-2"
                @input="clearError('zip_code')"
              />
              <div class="ml-2.5">
                <ErrorMessage v-if="errorMessages.zip_code" :message="errorMessages.zip_code" /></div>
            </div>
          </div>
          <div class="flex justify-center">
            <Button
              variant="solid"
              theme="blue"
              size="md"
              label="Save"
              @click="createIssue"
            />
          </div>
        </form>
      </Card>
    </div>
  </template>
  <script lang="ts" setup>
  import { ref, onMounted, watch } from 'vue';
  import { Avatar, Button, ErrorMessage, FormControl, createResource } from 'frappe-ui';
  import { useRouter } from 'vue-router';
  
  const customOption = ref<string[]>([]);
  const first_name = ref('');
  const last_name = ref('');
  const phone1 = ref('');
  const country = ref('');
  const email = ref('');
  const website = ref('');
  const address_line1 = ref('');
  const address_line2 = ref('');
  const city = ref('');
  const state = ref('');
  const zip_code = ref('');
  const errorMessages = ref<{ [key: string]: string }>({}); 
  
  const registerdata = ref({
    first_name: '',
    last_name: '',
    phone: '',
    country: '',
    email: '',
    website: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    zip_code: ''
  });
  
  const router = useRouter();
  
  const optionsCountry = async (limit = 1000) => {
    try {
      const response = await fetch(
        `/api/resource/Country?fields=["country_name"]&limit=${limit}`
      );
      if (!response.ok) throw new Error('Network response was not ok');
  
      const prioritydata = await response.json();
      customOption.value = prioritydata.data.map((user: any) => user.country_name) || [];
    } catch (error) {
      console.error('Error fetching Country:', error);
    }
  };
  
  const createIssue = async (event: Event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    errorMessages.value = {};
  
    // Validate the fields
    if (!first_name.value) errorMessages.value.first_name = 'First Name is required.';
    if (!last_name.value) errorMessages.value.last_name = 'Last Name is required.';
    if (!address_line1.value) errorMessages.value.address_line1 = 'Address Line1 is required.';
    if (!address_line2.value) errorMessages.value.address_line2 = 'Address Line2 is required.';
    if (!city.value) errorMessages.value.city = 'City is required.';
    if (!state.value) errorMessages.value.state = 'State is required.';
    if (!country.value) errorMessages.value.country = 'Country is required.';
    if (!zip_code.value) errorMessages.value.zip_code = 'Postal Code is required.';
    if (!email.value) errorMessages.value.email = 'Email is required.';
    if (!phone1.value) errorMessages.value.phone1 = 'Phone is required.';
  
    if (Object.keys(errorMessages.value).length > 0) {
      return;
    }
  
    registerdata.value = {
      first_name: first_name.value,
      last_name: last_name.value,
      phone: phone1.value,
      country: country.value,
      email: email.value,
      website: website.value,
      address_line1: address_line1.value,
      address_line2: address_line2.value,
      city: city.value,
      state: state.value,
      zip_code: zip_code.value
    };
    const RegisterDetails = createResource({
      url: 'go1_vendor.apidata.get_register',
      params: {
        'registerdata': JSON.stringify(registerdata.value)
      },
      method: 'GET',
    });
  
    await RegisterDetails.fetch();
  
    console.log('Data submitted:', registerdata.value);
  
    router.push('/account/login');
  };
  
  watch(registerdata, (new_registerdata) => {
    console.log('Register data changed:', new_registerdata);
  }, { deep: true });
  
  const clearError = (field: string) => {
    if (errorMessages.value[field]) {
      delete errorMessages.value[field];
    }
  };
  const goToLogin = () => {
    router.push('/account/login');
  };
  onMounted(async () => {
    await optionsCountry();
  });
  </script> 
  