<template>

  <div :class="['sidebar', { 'collapsed': isCollapsed }]">
    <Popover v-model="isPopoverActive">
      <template #target="{ togglePopover }">
        <Button 
          @click="togglePopover" 
          :class="['flex h-12 items-center rounded-md py-2 duration-300 ease-in-out w-52 px-2 hover:bg-gray-200', { 'active': isPopoverActive }]">
          <template v-if="isCollapsed">
            <Avatar :shape="'square'" image="/assets/go1_vendor/image/logo.svg" label="EY" size="xl" />
          </template>
          <template v-else>
            <div style="">
              <div class="flex-shrink-0 text-sm duration-300 ease-in-out mr-2 ml-0 w-auto opacity-100 " style="float:left;">
              <Avatar :shape="'square'" image="/assets/go1_vendor/image/logo.svg" label="EY" size="2xl" class="mr-2" />
              </div>
              <div class="flex flex-1 flex-col text-left duration-300 ease-in-out ml-2 w-auto opacity-100" style="float:left;margin-top:-2px">
                <p class="font-medium mt-2" style="margin-left:-15px">Go1 Vendor</p>
                <p style="margin-left:-15px;">{{  logged_users.data }}</p>

              </div>
              <div style="float:left;margin-left:30px;margin-top:5px" class="duration-300 ease-in-out ml-2 w-auto opacity-100">
                <FeatherIcon class="w-4" name="chevron-down" />
              </div>
            </div>
          </template>
        </Button>
      </template>
      <template #body-main>
        <div class="p-1.5">
          <Button 
            @click="sessionCheck" 
            style="text-align:left; background:white"
            class="navigation-button">
            <template v-if="isCollapsed">
              <FeatherIcon class="w-4" name="log-out" />
            </template>
            <template v-else>
              <span style="float:left"><FeatherIcon class="w-4" name="log-out" /></span>
              <span style="float:left">Logout</span>
            </template>
          </Button>
        </div>
      </template>
    </Popover>
    <div v-if="dynamicsApp.data && dynamicsApp.data.length">
      <div v-for="(row, index) in dynamicsApp.data" :key="index">
  <Button 
    @click="handleButtonClick(row.title, row.route)" 
    :variant="'ghost'"
    theme="gray"
    :class="['navigation-button flex items-center rounded px-2 py-1 text-gray-800 transition hover:bg-gray-100 mt-0.5 ', { 'active': isActiveButton(row.route) }]">
    <template v-if="isCollapsed">
            <FeatherIcon class="w-4 text-black" stroke="black" stroke-width="1" :name="row.icon" />
    </template>
    <template v-else>
            <div class="flex w-full items-center space-x-2 ">
              <div style="float:left">
                <FeatherIcon class="w-4 text-black " stroke="black" stroke-width="1" :name="row.icon"/>
              </div>
              <div class="flex-shrink-0 text-sm duration-300 ease-in-out ml-2 w-auto opacity-100" style="float:left;">
                {{ row.title }}
              </div>
            </div>
          </template>
  </Button>
</div>
</div>

   

    <!-- Toggle Sidebar Button -->
    <Button @click="$emit('toggle')" class="toggle-button-2">
      <template v-if="isCollapsed">
        <FeatherIcon class="w-4" name="log-in" />
      </template>
      <template v-else>
        <span style="float:left"><FeatherIcon class="w-4" /></span>
        <span style="float:left">Collapse</span>
      </template>
    </Button>
  </div>
</template>

<script>
import {  ref } from 'vue'; 
import { Popover, Button, FeatherIcon, Avatar, createResource } from 'frappe-ui';
import { useRoute, useRouter } from 'vue-router'; 
import { session } from '@/data/session';
console.log("EEEEEEEE",session)
export default {
  components: {
    Popover,
    Button,
    FeatherIcon,
    Avatar,
  },
  props: {
    isCollapsed: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      isPopoverActive: false,
      session, 
      activeButton: null ,
      rows: [] 
    };
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const rows = ref([]); 
    let Vendor_logo=ref([])
    let logo=ref('')
    // let Vendorlogo=ref([])
    const username =ref(['loading']);
    

    const users = createResource({
      url: 'go1_vendor.sales.get_username',
      cache:['true']
    });
    const session_users=users;
    const logged_users=session_users;
    const dynamicsApp = createResource({
    url: 'go1_vendor.sales.get_navbar_routes',
    cache: ['route','title'],
    auto: true 
  }); 

 const Vendorlogo = async () => {
        const response = await fetch('/api/method/go1_vendor.sales.get_navbar_logo');
        const data = await response.json();
        console.log('API Response:', data.message.app_logo);
        logo.value =data.message.app_logo
        console.log("hi",logo)
  }
  
  Vendorlogo();
 
  
  
  console.log("logo",Vendor_logo)
  
  
  console.log("usersdaata0----",users.fetch())
  console.log('dddddd',users.data);

    const isActiveButton = (routePath) => {
      return route.path === routePath;
    };

    return {
      isActiveButton, 
      rows,
      logged_users,
      dynamicsApp,
      Vendor_logo,
      Vendorlogo,
      logo
    };
  },
  methods: {
    handleButtonClick(buttonName, routePath) {
      this.setActiveButton(buttonName); 
      if (routePath) {
        // console.log("PAth",routePath)  
        this.$router.push(routePath); 
      }
    },
   
    sessionCheck() {
      session.logout.submit(); 
    },
   
    setActiveButton(button) {
      this.activeButton = button;
    },
  }
};
</script>



<style scoped>
.sidebar {
  width: 220px;
  background-color: rgb(248 248 248);
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  transition: width 0.3s ease;
}

.collapsed {
  width: 60px;
}

.navigation-button {
  display: block;
  width: 100%;
  text-align: left;
  padding-left: .5rem;
  padding-right: .5rem;
}

.navigation-button .active{
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 
  margin-top: 0.125rem; 
  transition: all 0.2s ease-in-out;
  color: #2d3748;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1); 
}

.toggle-button-1 {
  position: absolute;
  bottom: 50px;
  left: 0;
  width: 100%;
  text-align: left;
}

.toggle-button-2 {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 100%;
  text-align: left;
}

button.active {
  background-color: white;
  /* box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 
  margin-top: 0.125rem; 
  transition: all 0.2s ease-in-out;
  color: #2d3748;
  border-radius: 0.25rem; 
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  display:block; */
  align-items: center; 
  border-radius: 0.25rem; 
  padding-left: 0.5rem; 
  padding-right: 0.5rem; 
  padding-top: 0.25rem; 
  padding-bottom: 0.25rem; 
  color: #4a5568; 
  transition: all 0.2s ease;
  background-color: #ffffff; 
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); 
  margin-top: 0.125rem; 
}
</style> 




