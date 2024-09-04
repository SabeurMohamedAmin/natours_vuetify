<script setup>
import { inject, ref, computed, onBeforeMount} from 'vue';
import axios from '@/utils/jwt';
import {loadStripe} from '@stripe/stripe-js';

    const props = defineProps({
        tour:{
            type: Object,
            required: true
        },
    });
    const userLogin = inject('userLogin');
    const imgDomainUrl = "http://127.0.0.1:3000/img";
    const checkoutLink = computed(() => `api/v1/bookings/checkoutSession/${props.tour?.id}`);

    //initialize stripe and public key
    const stripe = ref(null);
    onBeforeMount( async ()=>{
        stripe.value = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    });
    //api/v1/bookings/checkout-session/:tourId
    const bookTour = async (tourId)=>{
        //1) Get the checkout session from the server
        const response = await axios.get(checkoutLink.value);
        //2) Create checkout form + charge credit card
      await stripe.value.redirectToCheckout({
        sessionId: response.data.session.id
      });
}    
</script>

<template>
  <section class="section-cta ">
    <v-card class="cta rounded-lg ">
      <div class="cta__img cta__img--logo">
        <img 
          :src="imgDomainUrl+'/logo-white.png'" 
          :alt="props.tour?.imageCover" 
        />
      </div>
      <img 
        :src="imgDomainUrl+'/tours/'+ props.tour?.images[0]" 
        class="cta__img cta__img--1" 
        :alt="props.tour?.images[0]" 
      />
      <img 
        :src="imgDomainUrl+'/tours/'+ props.tour?.images[1]" 
        :alt="props.tour?.images[1]"
        class="cta__img cta__img--2" 
      />

      <div class="cta__content">
        <h2 
          class="
            heading-secondary cra__header 
            text-left text-h4 text-sm-h3 text-md-h2 "
        >
          What are you waiting for?
        </h2>
        <p class="cta__text text-center">
          10 days. 1 adventure. Infinite memories.
          Make it yours today!
        </p>
        <v-btn 
            v-if="userLogin"    
            class=" btn--green bg-green-lighten-3 cta__btn rounded-lg text-none"
            variant="flat"
            size="x-large"
            @click="bookTour"
        >
          Book tour now!
        </v-btn>
      </div>
    </v-card>
  </section>
</template>