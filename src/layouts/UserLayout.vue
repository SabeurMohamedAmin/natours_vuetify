<script setup>
  import SideMenu from '@/components/SideMenu.vue';
</script>

<template>
  <v-main>
    <v-container fluid class="py-1" dense>
      <v-row align-content="start">
        <!-- SideMenu for Filtering the Researches -->
        <v-col md="3" class="d-none d-md-block">
          <SideMenu/>
        </v-col>
        <!-- Main Content of the pages changes from router to another-->
        <v-col cols="12" md="9" class="">
          <section id="app_content" class="rounded-lg overflow-hidden border-green-lighten-1 ">
            <router-view />
          </section>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>