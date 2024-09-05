<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import axios from '@/utils/jwt';

const router = useRouter();
const cancelTime = computed(() => {
    return` ${
    new Date(Date.now()).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric', })} - ${new Date().getHours()}:${ new Date().getMinutes()}`
});
const messages = ref([
  {
    from: 'You',
    message: `Chosed a disponible Tour then redirected to Payment Page.`,
    color: 'success',
    icon: 'mdi-check',
  },
  {
    from: 'you',
    time: cancelTime.value,
    message: 'you canceled the payment process.',
    color: 'warning',
    icon: 'mdi-close',
  },
  {
    from: 'You',
    message: 'you dont have the access to the tour.',
    color: 'warning',
    icon: 'mdi-cancel',
  },
])

const tour = ref('');
const tourId = ref('');
const slug = ref('');
const price = ref('');
const user = ref('');

tourId.value = useRoute().query?.tour;
price.value = useRoute().query?.price;
slug.value = useRoute().query?.slug;
user.value = useRoute().query?.user;

onMounted(async ()=>{
    if(!slug.value || !price.value || !user.value || !tourId.value) {
        router.push({ name: 'homePage'});
    }
    try {
        const response =  await axios.get(`api/v1/tours/${slug.value}`);
        tour.value = response.data.tour;
    } catch (error) {
        console.log(error);
    }

})


const timeoutId = setTimeout(() => {
    router.push({ name: 'homePage'})
}, 5); // 10000 milliseconds (5 seconds)

onUnmounted(() => {
    if(timeoutId){  clearTimeout(timeoutId);}
})
</script>

<template>
    <h1 class="mx-5 my-8">You have cancel the payment </h1>
    <h2 class="mx-5 mb-8 font-100 text-subtitle-1">
        you be redirected to home page in 10 seconds
    </h2>
    <v-card class="mx-auto" max-width="400">
      <v-img
        color="surface-variant"
        height="200"
        :src="'https://natours-express.onrender.com/img/tours/'+tour?.imageCover"
        cover
      >
    </v-img>
    <v-card-title
      class="headline font-weight-bold"
      v-text="tour.name"
    />
    <v-card-subtitle class="text-body-1" v-text="tour.price +' €'" />
    <v-card-text class="text-body-1" v-text="tour.summary" />
      <v-card-text>
        <div class="font-weight-bold ms-1 mb-2">Purchase Step's:</div>
    
        <v-timeline align="start" density="compact">
          <v-timeline-item
            v-for="message in messages"
            :key="message.time"
            :dot-color="message.color"
            size="x-small"
            :icon="message.icon"
          >
            <div class="mb-4">
              <div class="font-weight-normal" >
                <strong >{{ message.from }}</strong> @{{ message.time }}
              </div>
    
              <div :class="'text-'+message.color">{{ message.message }}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
      <v-card-actions>
        <v-btn color="warning" size="large" variant="outlined" class="ma-5" :to="{name:'homePage'}">Go to home page </v-btn>
    </v-card-actions>
    </v-card>
</template>