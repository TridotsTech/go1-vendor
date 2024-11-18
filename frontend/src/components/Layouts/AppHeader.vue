<template>
  <div class="flex h-12 border-b pr-5 px-5 items-center">
      <div v-if="paramsvalue && Object.keys(paramsvalue).length > 0" class="flex flex-1 items-center h-12">
     
      <!-- <h1><span class="text-gray-600" @click="view">{{ newroute }}</span> / {{ paramsvalue.id}} </h1> -->
    </div> 
    <div v-else class="flex flex-1 items-center h-12">
      <!-- <h1>{{ matchroute }}</h1> -->
    </div>
    <slot name="createbutton" class="items-center"/>
    <div class="flex items-center justify-center">
    </div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const matchroute = ref("")
const newroute=ref("")
let paramsvalue = ref({}) 

const route_array = route.fullPath.split("/");

const updateparams = () => {
paramsvalue.value = route.params
paramsvalue =paramsvalue.value
const length = route_array.length;

if(length >=2){
   newroute.value = route_array[length - 2]
 
console.log('routename',newroute)
  } 
}


const updateroute = () => {
  const length = route_array.length;
  matchroute.value = route_array[length - 1];
  
}


onMounted(() => {
  updateparams();
  updateroute();
});


watch(
  () => route.fullPath, 
  () => {
    updateparams();
    updateroute();
   
  }
);
</script>  
 <!-- <template>
  <div class="flex h-12 border-b pr-5 px-5 items-center justify-between">
      <div class="flex items-center">
          <Breadcrumbs :items="breadcrumbs" v-if="breadcrumbs.length > 0" />
      </div>
      <div class="AddOn flex gap-2 justify-end">
          <slot name="addon" />
          <slot name="createbutton" class="items-center"/>

      </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Breadcrumbs } from 'frappe-ui';
import { useRoute } from 'vue-router';

const route = useRoute();

const breadcrumbs = computed(() => {
  const pathSegments = route.fullPath.split('/').filter(segment => segment.trim() !== '');
  return pathSegments.map((segment, index) => {       
      const decodedSegment = decodeURIComponent(segment);        
      const path = '/' + pathSegments.slice(0, index + 1).join('/');     
      return {
          label: decodedSegment, 
          route: path
      };
  });
});
</script> -->
