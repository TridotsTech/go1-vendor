<template>
  <div class="relative flex h-full flex-col justify-between transition-all bg-gray-50 duration-300  ease-in-out"
       :class="isSidebarCollapsed ? 'w-12' : 'w-[220px]'">
    <div class="head">
      <UserDropdown class="p-2" :isCollapsed="isSidebarCollapsed" />
    </div>

    <div class="flex-1 overflow-y-auto">
      <!-- Content here -->  
       <Sidebarlink :isCollapsed="isSidebarCollapsed"/>       
    </div>

    <div class="m-2 flex flex-col gap-1">
      <Button class="w-full justify-start" @click="toggleSidebar" :variant="'ghost'" size="sm">
        <template v-if="isSidebarCollapsed">
          <CollapseSidebar
            class="h-4.5 w-4.5 text-gray-700 duration-300 ease-in-out"
            :class="{ 'rotate-180': isSidebarCollapsed }"
          />
        </template>
        <template v-else>
          <div class="flex items-center">
            <div class="flex items-center">
              <CollapseSidebar
                class="h-4.5 w-4.5 text-gray-700 duration-300 ease-in-out"
                :class="{ 'rotate-180': isSidebarCollapsed }"
              />
              <span class="ml-2">Collapse</span>
            </div>
          </div>
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { useStorage } from '@vueuse/core';
import UserDropdown from '@/components/UserDropdown.vue';
import CollapseSidebar from '@/components/Icons/CollapseSidebar.vue';
import Sidebarlink from '@/components/Layouts/Sidebarlink.vue';

const isSidebarCollapsed = useStorage('isSidebarCollapsed', false);

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};
</script>
