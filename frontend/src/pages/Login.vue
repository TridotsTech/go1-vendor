<template>
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
      <Badge
      :variant="'ghost'"
      :ref_for="true"
      theme="gray"
      size="sm"
      label="Badge"
    >
      Don't have an account?
    </Badge>
    <!-- <Button
      :variant="'ghost'"
      theme="gray"
      size="sm"
      label="Button"
      :loading="false"
      :disabled="false"
      @click="openCreate"
    >
      Signup
    </Button> -->
    <Button
  :variant="'ghost'"
  theme="gray"
  size="sm"
  label="Button"
  :loading="false"
  :disabled="false"
  @click.stop="openCreate" 
>
  Signup
</Button>

    </Card>
  </div>
</template>
<script lang="ts" setup>
import { session } from '../data/session'
import { Avatar,Badge, Button } from 'frappe-ui';
import { useRouter } from 'vue-router';

const router = useRouter();

// const openCreate = () => {
//   console.log("Navigating to Signup page");
//   router.push({ name: 'Register' });
// }
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
</script>
