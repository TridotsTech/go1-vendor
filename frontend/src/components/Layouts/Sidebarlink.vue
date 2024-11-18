<template>
    
    <div v-if="dynamicsApp_data.data && dynamicsApp_data.data.length" class="grid grid-cols-1 gap-0.5">
        
        <div v-for="(row, index) in dynamicsApp_data.data" :key="index">
            <Button @click="handleButtonClick(row.route) " :variant="'ghost'" theme="gray" class="w-full justify-start text-gray-800 bg-white">
                <!-- Collapsed View Icon -->
                <template v-if="isCollapsed">
                    <FeatherIcon class="w-4 text-black" stroke="black" :stroke-width="1" :name="row.icon" />

                    
                </template>
                <!-- Expanded View -->
                <template v-else>
                    <div class="flex items-center ml-[-90px]">
                        <div style="float:left">
                            <FeatherIcon class="w-4 text-black" stroke="black" :stroke-width="1" :name="row.icon" />
                        </div>
                        <div class="flex-shrink-0 text-sm duration-300 ease-in-out ml-2 w-auto opacity-100" style="float:left;">
                            {{ row.title }}
                        </div>
                    </div>
                </template>
            </Button>
        </div>
    </div>
</template>
 
<script setup>
import { Button, createResource,FeatherIcon } from 'frappe-ui';

import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    isCollapsed: {
        type: Boolean,
        default: false
    }
});

// Create the resource but control when it fetches the data
const dynamicsApp_data = createResource({
    url: 'go1_vendor.api.get_navbar_routes',
    cache: ['route', 'title'],

});

// Fetch data and handle success and error with .then() and .catch()
dynamicsApp_data.fetch()
    .then((dynamicsApp) => {
        
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Failed to load navigation data. Please try again later.");
    });

const router = useRouter();
const handleButtonClick = (route) => {
    router.push(route);
};
</script>











