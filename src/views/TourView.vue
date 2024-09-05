<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import axios from '@/utils/jwt';
import { useRoute } from 'vue-router'
import BookYourTour from '@/components/BookYourTour.vue';
import ReviewSlider from '@/components/ReviewSlider.vue';
import MapBox from '@/components/MapBox.vue';
  const router = useRoute();
  const tour = ref(null);
  const imgDomainUrl = "https://natours-express.onrender.com/img";

  onBeforeMount( async () => {
    try {
      const slug = router.params.slug;
      const url = `/api/v1/tours/${slug}`;
      const response = await axios.get(url);
      if (!response || response.status !== 200) {
        throw new Error(`Oop's Failed to get tours from the server error: \n ${response.data.error}`);
      }
      //assign the response data to the tour ref
      tour.value = await response.data.tour || null;
    }
    catch (error) {
      if(error.response.data.error.statusCode === 401){
        router.push({name: 'loginPage'});
        return;
      }
      throw new Error(`Oop's Failed to get tours from the server error: \n ${error}`);
    }
  });

  const localTime = computed(()=>{
    const startDate = tour.value?.startDates || new Date();
    const localFormatDate = new Date(startDate[0]).toLocaleString('fr-US', {
      month: 'long',
      year: 'numeric',
    });

    return localFormatDate;
  })

  const title = computed(() => {
    if (tour.value) {
      const splitTitle = tour.value.name.split(' ');
      splitTitle.map((word, index) => {
        if (index === 1) {
          return word+ " <br/> ";
        }
        return word;
      });
      const breakedTitle = splitTitle.join(' ');
      return breakedTitle;
    }
    return 'The Forest <br/> Speed Hiker';
  });

  const removeMinus = (string)=> string.replace(/-/g, ' ');
</script>

<template >
  <!-- HEADER Tour Details and hero section-->
  <section class="section-header">
    <div class="heading-box" style="z-index:200">
      <h1 class="heading-primary text-grey-lighten-2 " >
        <span class="font-weight-light " v-html="title"/>
      </h1>
    </div>
    <div class="header__hero">
      <div class="header__hero-overlay"></div>
      <img class="header__hero-img"
        :src="'https://natours-express.onrender.com/img/tours/'+ tour?.imageCover"
        :alt="tour?.name" 
        :title="tour?.name"
      />
    </div>
  </section>
  <!-- Details about tour guides and Price ...-->
  <section class="section-description flex-column flex-md-row">
    <div class="overview-box">
      <!-- Tour Details-->
      <div class="overview-box__group pt-10">
        <h2 class="heading-secondary ma-bt-lg text-h4 text-lg-h3 gradient-green">
          Quick facts
        </h2>
        <div class="overview-box__detail text-h4">
          <v-icon class="mx-1 " icon="mdi-calendar-range" size="x-small" color="green-lighten-1"/>
          <span class="overview-box__label">
            Next Date
          </span>
          <span class="overview-box__text text-h6 font-weight-light">
            {{localTime}}
          </span>
        </div>
        <div class="overview-box__detail text-h4">
          <v-icon 
            icon="mdi-elevation-rise" size="x-small" color="green-lighten-1"
            class="mx-1" 
          />
          <span class="overview-box__label">
            Difficulty
          </span>
          <span class="overview-box__text  text-h6 font-weight-light">
            {{tour?.difficulty}}
          </span>
        </div>
        <div class="overview-box__detail text-h4">
          <v-icon 
            icon="mdi-map-marker" size="x-small" color="green-lighten-1"
            class="mx-1" 
          />
          <span class="overview-box__label">
            Address
          </span>
          <span class="overview-box__text  text-h6 font-weight-light">
            {{tour?.startLocation?.description}}
          </span>
        </div>
        <div class="overview-box__detail text-h4">
          <v-icon 
            icon="mdi-calendar-clock" size="x-small" color="green-lighten-1"
            class="mx-1" 
          />
          <span class="overview-box__label">
            Duration
          </span>
          <span class="overview-box__text  text-h6 font-weight-light">
            {{tour?.duration}} days
          </span>
        </div>

        <v-divider  thickness="2" class="mb-5 " color="green-lighten-2"/>  
        
        <div class="overview-box__detail text-h4">
          <v-icon class="mx-1" icon="mdi-account" size="x-small" color="green-lighten-1"/>
          <span class="overview-box__label">Participants</span>
          <span class="overview-box__text  text-h6 font-weight-light">{{tour?.maxGroupSize}} people</span>
        </div>
        <div class="overview-box__detail text-h4 font-weight-thin">
          <v-icon 
            icon="mdi-star" size="x-small" color="green-lighten-1"
            class="mx-1" 
          />
            <span class="overview-box__label ">
              Rating
            </span>
              <span class="overview-box__text  text-h6 font-weight-light">
                {{tour?.ratingsAverage}} / {{tour?.ratingsQuantity}}
              </span>
        </div>
          <!-- Guide informations -->
          <div class="overview-box__group">
              <h2 class="heading-secondary ma-bt-lg text-h4">
                Your tour guides
              </h2>
              <div 
                class="overview-box__detail" 
                v-for="guide in tour?.guides" 
                :key="guide._id"
              >
                <img 
                  class="overview-box__img"
                  :src="imgDomainUrl+'/users/'+guide.photo"
                  :alt="guide.name"
                >
                <span 
                  class="overview-box__label text-overline text-md-h6"                  
                >
                <p class="text-uppercase">
                  {{removeMinus(guide.role)}}
                </p>
                </span>
                <span 
                  class="overview-box__text text-body-2 text-md-h6 font-weight-light"
                >
                  {{guide.name}}
                </span>
              </div>
          </div>
        </div>
    </div>
    <div class="description-box">
        <h2 class="heading-secondary gradient-green ma-bt-lg pt-10 text-h4 text-lg-h3">
          About {{tour?.name}}
        </h2>
        <p class="description__text">
          {{tour?.summary}}
        </p>
        <p class="description__text">
        </p>
        <p class="description__text">
          {{tour?.description}}
        </p>
    </div>
  </section>
  <!-- Pictures of the tour-->
  <section class="section-pictures">
    <div class="picture-box" v-for="(tourImage, i) in tour?.images" :key="i">
      <img 
        :class="'picture-box__img picture-box__img--'+(i+1)" 
        :src="imgDomainUrl+'/tours/'+tourImage"
        :alt="tourImage"
      >
    </div>
  </section>

  <!-- MAP SECTION-->
  <section id="layout" class="d-flex" v-if="tour?.locations">
    <MapBox :locations="tour.locations"/>
  </section>
   <!-- Users Reviews -->
  <section class="section-reviews">
    <ReviewSlider :reviews="tour?.reviews"/>
  </section>  

  <!-- CTA SECTION Book Youre Ticket Card -->
  <BookYourTour v-if="tour" :tour="tour"/>
  <div class="footer">
    <div class="footer__logo">
      <img :src="imgDomainUrl+'/logo-green.png'" alt="Natours logo" />
    </div>
    <ul class="footer__nav">
      <li><a href="#">About us</a></li>
      <li><a href="#">Download apps</a></li>
      <li><a href="#">Become a guide</a></li>
      <li><a href="#">Careers</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
    <p class="footer__copyright">
      &copy; by Jonas Schmedtmann. All rights reserved.
    </p>
  </div>
</template>

<style scoped>
  .line-height-7 {
    line-height: 3rem;
  }

  #layout {
    margin-top: -9vw; 
    height: 80vh;
    box-sizing: border-box;
  }

  @media only screen and (min-width: 400px) {
    .line-height-7 {
      line-height: 5rem;
    }
  }
</style>