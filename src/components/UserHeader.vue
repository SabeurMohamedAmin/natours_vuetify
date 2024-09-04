<script setup>
  import { ref } from 'vue';
  import GuestMenu from './GuestMenu.vue';
  const search_input = ref(null);

  const searchInTours = (event)=>{
    console.log('searchInTours');
  }
  const searchInTours2 = (event)=>{
    console.log('searchInTours');
  }
</script>

<template>
  <v-row class="mx-4 d-flex align-center justify-space-between">
    <GuestMenu/>
    <v-col  sm="7" md="6" class="flex-grow-1">
      <v-text-field
        ref="search_input"
        density="dense"
        label="Search"
        placeholder="Search"
        @input="searchInTours"
        clearable
        append-inner-icon="mdi-magnify"
        rounded="lg"
        variant="solo-filled"
        flat
        hide-details
        single-line
      />
    </v-col>
  </v-row>
</template>