<script setup>
  import SideMenu from '@/components/SideMenu.vue';
  import {computed} from 'vue';
  import { useRoute} from 'vue-router';


  const route = useRoute();
  const fullRoute = computed(()=> route.fullPath);
</script>

<template>
  <v-main>
    <v-container fluid class="py-1" dense>
      <v-row align-content="start">
        <!-- SideMenu for Filtering the Researches -->
        <v-col md="3" class="d-none d-md-block">
          <SideMenu class="border-green-lighten-1"/>
        </v-col>
        <!-- Main Content of the pages changes from router to another-->
        <v-col cols="12" md="9" class="">
          <section 
            id="app_content" 
            transition="scroll-x-transition"
            class="rounded-lg overflow-hidden border-green-lighten-1 " 
          >
            <router-view :key="fullRoute"/>
          </section>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>