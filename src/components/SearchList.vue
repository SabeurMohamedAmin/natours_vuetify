<script setup>
import { ref, onBeforeMount, computed, onMounted } from 'vue';
import axios from '@/utils/jwt';

const emit = defineEmits(['close']); 
const props = defineProps({
    searchTour:{
        type:String,
    },
    html_element:{
        type: Object,
    }
});
const tours = ref([]);
onBeforeMount(async ()=>{
    const response = await axios.get( '/api/v1/tours');
    tours.value = response.data.data.Tours;
});

const filteredTours = computed(() => {
  if (!tours.value.length || !props.searchTour) {
    return tours.value; // Return all tours if no tours or no search term
  }
  const normalizedSearchTerm = props.searchTour.toLowerCase().trim();
  return tours.value.filter(tour =>
    tour.name.toLowerCase().includes(normalizedSearchTerm)
  );
});

const showToursList = computed(()=>{
    if(filteredTours.value.length){
        return filteredTours.value;
    }else{
        return tours.value;
    }
})
    const search_card = ref(null);
    onMounted(()=>{
        window.addEventListener('click', (e)=>{
            if(search_card.value && !search_card.value.$el.contains(e.target) && props.html_element && !props.html_element.contains(e.target)){
                emit('close');
            };
        })
    });
</script>

<template>
    <v-card
        ref="search_card"
        class="mx-auto position-fixed search-list bg-backdrop"
        rounded="lg"
    >
    <v-toolbar class="bg-backdrop">
      <v-toolbar-title>Founded tours ({{ showToursList.length }})</v-toolbar-title>
      <v-spacer/>
        <v-btn
            icon="mdi-close mdi-24px"
            size="small"
            color="red"
            rounded="lg"
            class="mr-4"
            @click="$emit('close')"
        />
    </v-toolbar>
    <v-list lines="two" class="bg-backdrop">      
      <v-virtual-scroll
      :items="showToursList"
      height="320"
      item-height="48"
    >
        <template v-slot:default="{item}">
            <v-list-item
            :key="item.id"
            :subtitle="item.summary" 
            :title="item.name"
            >
            <template v-slot:prepend>
                <v-avatar rounded='lg' :image="'http://127.0.0.1:3000/img/tours/'+item.imageCover">
                </v-avatar>
            </template>
    
            <template v-slot:append>
                <v-btn
                    size="small"
                    color="grey-lighten-1"
                    icon="mdi-arrow-top-right"
                    variant="text"
                    rounded="lg"
                    class="z-500"
                    replace
                    @click="$emit('close')"
                    :to="{name: 'tourPage', params: {slug: item.slug}}"
                />
            </template>
            </v-list-item>
        </template>
    </v-virtual-scroll>
    </v-list>
  </v-card>
</template>

<style scoped>
    .bg-backdrop{
        opacity: .95;
    }
    .bg-backdrop:hover, .bg-backdrop:focus, .bg-backdrop:active{
        opacity: 1;
    }
    .z-500{
        z-index: 999;
    }
    .search-list {
        z-index: 100;
        min-width: 270px;

    }
    @media screen and (max-width: 600px) {
        .search-list {
            top: 70px;
            width: 90%;
            left: 5%;
            border: 2px solid red;
        } 
    }
    @media screen and (min-width: 600px) and (max-width: 960px) {
        .search-list {
            top: 70px;
            width: 62%;
            right: 12%;
        }    
    }

    @media screen and (min-width: 960px) {
        .search-list {
            top: 70px;
            width: 46%;
            right: 10%;
        }
    }
</style>