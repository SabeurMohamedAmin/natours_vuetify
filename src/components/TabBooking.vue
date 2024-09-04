<script setup>
import { ref, onBeforeMount, computed } from 'vue'
import axios from '@/utils/jwt';

const bookings = ref([]);
onBeforeMount(async ()=>{
  const response = await axios.get('api/v1/bookings');
  bookings.value = response.data.bookings;
})

const files = [
  {
    color: 'blue',
    icon: 'mdi-clipboard-text',
    subtitle: 'Jan 20, 2014',
    title: 'Vacation itinerary',
  },
  {
    color: 'amber',
    icon: 'mdi-gesture-tap-button',
    subtitle: 'Jan 10, 2014',
    title: 'Kitchen remodel',
  },
];

const folders = [
  {
    subtitle: 'Jan 9, 2014',
    title: 'Photos',
  },
  {
    subtitle: 'Jan 17, 2014',
    title: 'Recipes',
  },
  {
    subtitle: 'Jan 28, 2014',
    title: 'Work',
  },
];

const activeSearch = ref(false);
const valueSearch = ref('');
const result = ref([]);
const search = ()=>{
  if(bookings.value.length && valueSearch.value){
    result.value = bookings.value.filter(booking=>{
      return booking.tour.name.toLowerCase().includes(valueSearch.value.toLowerCase());
    });
  }else{
    result.value = [];
  }
};

const searchResult = computed(()=>(result.value.length) ? result.value : bookings.value);
</script>


<template>
  <v-card
    class="mx-auto"
    min-width="300"
    max-width="1000"
  >
    <v-toolbar class="align-center py-2">
      <v-toolbar-title>
        My Booking List
      </v-toolbar-title>
      <v-spacer/>
      <v-text-field
        clearable
        @click:clear="search"
        hide-details
        @input="search"
        v-model="valueSearch"
        label="Search"
        variant="solo-filled"
        class="mx-4 my-2 border-none"
      />
    </v-toolbar>

    <v-list lines="two">
      <!-- list title and subtitle-->
      <v-list-subheader inset v-if="bookings.length">
        ({{ bookings?.length }}) tours booked by
        <strong class="font-italic">
          @{{ bookings[0]?.user?.name }}
        </strong>
      </v-list-subheader>
      <v-list-subheader inset v-else>
        (0) tours booked
      </v-list-subheader>
        <v-list-item
          v-for="item in searchResult"
          :key="item._id"
          transition="scroll-x-transition"
        >
        <v-card-title class="px-0 pt-0"> {{ item.tour.name }} </v-card-title>
        <v-card-subtitle class="px-0 my-2"> {{ new Date(item?.tour?.startDates[0])?.toLocaleString('fr-FR', {day:'numeric', month: 'long', year: 'numeric'}) +' ; ' + item.tour.startLocation.address }} </v-card-subtitle>
          <template v-slot:prepend>
            <v-avatar rounded="lg" color="grey-lighten-1" size="70" :image="'http://localhost:3000/img/tours/'+item.tour.imageCover">
            </v-avatar>
          </template>

          <template v-slot:append>
            <v-btn
              color="grey-lighten-1"
              icon="mdi-arrow-top-right"
              rounded="lg"
              variant="tonal"
              :to="{name: 'tourPage', params: {slug: item.tour.slug}}"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
  </v-card>
</template>

<style scoped>
  .min-h-100vh {
    min-height: 100vh;
  }
</style>