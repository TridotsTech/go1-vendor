<!-- <template>
  <div class="max-h-screen flex items-center justify-center">
    <Card class="w-full max-w-md mt-20 border-none shadow-none">
      <div class="flex justify-center p-5 mt-0">
        <Avatar :shape="'square'" image="/assets/go1_vendor/image/logo.svg" label="EY" size="2xl" />      
      </div>    
      <h1 class="text-center text-3xl font-semibold text-gray-900 mb-4">Login to Go1 Vendor!</h1>
      <form class="flex flex-col space-y-2 w-full" @submit.prevent="submit">
        <Input required name="email" type="text" placeholder="johndoe@email.com" label="User ID" />
        <Input required name="password" type="password" placeholder="••••••" label="Password" />
        <Button :loading="session.login.loading" variant="solid" style="margin-top: 24px;">Login</Button>
      </form>
      <div class="flex justify-center items-center mt-4">
        <span class="text-sm text-gray-600">Don't have an account?</span>
        <Button
          variant="ghost"
          theme="gray"
          size="sm"
          label="Signup"
          :loading="false"
          :disabled="false"
          @click.stop="openCreate"
          class="ml-2"
        >
          Signup
        </Button>
      </div>
    </Card>
  </div>
</template>
<script lang="ts" setup>
import { session } from '../data/session'
import { Avatar,Badge, Button } from 'frappe-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const openCreate = async () => {
  try {
    console.log("Navigating to Signup page");
    await router.push({ name: 'Register' });
  } catch (error) {
    console.error("Navigation error:", error);
  }
}
function submit(e) {
  let formData = new FormData(e.target)
  session.login.submit({
    email: formData.get('email'),
    password: formData.get('password'),
  })
}
</script>  -->
<template>
  <div class="max-h-screen flex items-center justify-center">
    <Card class="w-full max-w-md mt-20 border-none shadow-none">
      <div class="flex justify-center p-5 mt-0">
        <Avatar :shape="'square'" image="/assets/go1_vendor/image/logo.svg" label="EY" size="2xl" />
      </div>
      <h1 class="text-center text-3xl font-semibold text-gray-900 mb-4">Login to Go1 Vendor!</h1>
      <form class="flex flex-col space-y-2 w-full" @submit.prevent="submit">
        <Input v-model="email" required name="email" type="text" placeholder="johndoe@email.com" label="User ID" />
        <!-- <Input v-model="password" required name="password" type="text" placeholder="••••••" label="Password" /> -->
        <div class="relative">
          <Input v-model="password" required name="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••"
            label="Password"/>
          <FeatherIcon :name="showPassword ? 'eye' : 'eye-off'" @click="togglePasswordVisibility"
            class="absolute h-4 right-3 top-2/3 transform -translate-y-1/3 cursor-pointer text-gray-600" />
        </div>
        <Button :loading="session.login.loading" variant="solid" style="margin-top: 24px;">Login</Button>
        <ErrorMessage :message="errorMessage" v-if="errorMessage" />
      </form>
      <div class="flex justify-center items-center mt-4">
        <span class="text-sm text-gray-600">Don't have an account?</span>
        <Button variant="ghost" theme="gray" size="sm" label="Signup" :loading="false" :disabled="false"
          @click.stop="openCreate" class="ml-2">
          Signup
        </Button>
      </div>
    </Card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { session } from '../data/session';
import { Avatar, Button, Input, createResource, ErrorMessage, FeatherIcon } from 'frappe-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const showPassword = ref(false);
const password = ref('');
const errorMessage = ref<string>('');  // Error message for display


const openCreate = async () => {
  try {
    console.log("Navigating to Signup page");
    await router.push({ name: 'Register' });
  } catch (error) {
    console.error("Navigation error:", error);
  }
};

const submit = async () => {
  session.login.Loading = true;
  errorMessage.value = '';  // Reset any previous error messages

  try {
    console.log("Login attempt with email:", email.value);

    const loginResource = createResource({
      url: 'go1_vendor.apidata.check_supplier',
      method: 'GET',
      params: { email: email.value },
    });

    const response = await loginResource.fetch();
    console.log('data', response)

    if (response) {
      console.log('success', email, password)
      await session.login.submit({ email: email.value, password: password.value });
    } else {
      console.log("fail");

      await openCreate();  // Navigate to Signup if email does not exist
    }
  } catch (error) {
    console.error('Error during login:', error);
    // alert('An error occurred. Please try again.');
    errorMessage.value = 'Email not found. Please sign up.';
    // await openCreate(); 

  }
};
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}
</script>
<!-- <template> 
  <div class="max-h-screen flex items-center justify-center">
    <Card class="w-full max-w-md mt-20 border-none shadow-none">
      <div class="flex justify-center p-5 mt-0">
        <Avatar :shape="'square'" image="/assets/go1_vendor/image/logo.svg" label="EY" size="2xl" />
      </div>
      <h1 class="text-center text-3xl font-semibold text-gray-900 mb-4">Login to Go1 Vendor!</h1>
      <form class="flex flex-col space-y-2 w-full" @submit.prevent="submit">
        <Input v-model="email" required name="email" type="text" placeholder="johndoe@email.com" label="User ID" />
        <Input v-model="password" required name="password" type="password" placeholder="••••••" label="Password" />
        <Button :loading="session.login.loading" variant="solid" style="margin-top: 24px;">Login</Button>
        <ErrorMessage :message="errorMessage" v-if="errorMessage" />
      </form>
      <div class="flex justify-center items-center mt-4">
        <span class="text-sm text-gray-600">Don't have an account?</span>
        <Button
          variant="ghost"
          theme="gray"
          size="sm"
          label="Signup"
          :loading="false"
          :disabled="false"
          @click.stop="openCreate"
          class="ml-2"
        >
          Signup
        </Button>
      </div>
    </Card>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { session } from '../data/session';
import { Avatar, Button, Input, createResource, ErrorMessage } from 'frappe-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref<string>('');  // Error message for display

const openCreate = async () => {
  try {
    console.log("Navigating to Signup page");
    await router.push({ name: 'Register' });
  } catch (error) {
    console.error("Navigation error:", error);
  }
};

const submit = async () => {
  session.login.loading = true;  // Start loading
  errorMessage.value = '';  // Reset any previous error messages

  try {
    console.log("Login attempt with email:", email.value);

    // Create the resource for checking email
    const loginResource = createResource({
      url: 'go1_vendor.apidata.check_supplier',  // API endpoint
      method: 'GET',
      params: { email: email.value },  // Send email as parameter
    });

    // Fetch the resource (API call)
    const response = await loginResource.fetch();
    console.log('API response:', response);

    // Validate the response (assuming 'exists' is part of the API response)
    if (response && response.exists) {
      console.log('Login successful with email:', email.value);
      // Proceed with login if email exists
      await session.login.submit({ email: email.value, password: password.value });
    } else {
      console.log("Email not found. Redirecting to signup page.");
      errorMessage.value = 'Email not found. Please sign up.';
      await openCreate();  // Navigate to Signup if email does not exist
    }
  } catch (error) {
    console.error('Error during login:', error);
    errorMessage.value = 'An error occurred. Please try again later.';  // General error message
  } finally {
    session.login.loading = false;  // Stop loading, regardless of success or failure
  }
};
</script> -->
