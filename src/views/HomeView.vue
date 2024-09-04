<script setup>
  import { ref, onBeforeMount, computed } from 'vue';
  import TourCard from '@/components/TourCard.vue';
  import axios from '@/utils/jwt';

  const tours = ref(null);
  
  onBeforeMount(async() => {
    const response = await axios.get( '/api/v1/tours');

    if(!response.data && response.data.data.status !== "success") {
      throw new Error(`Oop's Failed to get tours from the server error: \n ${response.Error}`);
    }
    tours.value = response.data;
  });

const toursReady = computed(() =>{
   return (tours.value && tours.value.data.Tours) ? true : false;
  });

 
</script>

<template>
  <v-row v-if="toursReady" >
    <v-col cols="12" sm="6" md="4" xl="3" xxl="2" v-for ="tour in tours.data.Tours" :key="tour._id" min-width="285">
      <TourCard :tour="tour"/>
    </v-col>
  </v-row>

</template>