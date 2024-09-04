<script setup>
  import { computed, ref } from 'vue';
  const icons = [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
  ];

  const pageLinks = [
    { title: 'Home', icon: 'mdi-home' },
    { title: 'About', icon: 'mdi-account' },
    { title: 'Contact', icon: 'mdi-email' },
    { title: 'Settings', icon: 'mdi-cog' },
  ];

  const currentYear = computed( ()=> new Date().getFullYear());

  const value = ref(1);
  const color = computed(()=>{
    switch(value.value){
      case 0: return 'blue-grey';
      case 1: return 'teal';
      case 2: return 'brown';
      case 3: return 'indigo';
      default: return 'blue-grey';
    }
  });
</script>

<template>
  <v-footer class="text-left d-flex flex-column z-10" >
    <section class="w-sm-75">
      <!-- logo & social -->
      <section class=" d-flex flex-column align-center flex-sm-row justify-space-between">
        <div>
          <v-btn 
            to="/" 
            variant="plain"  
            title= "navigate to home page"
            stacked
            text="logo"
            />
          
        </div>
        <!-- the social media menu-->
        <div class="d-flex align-end " >
          <v-btn
            rounded="lg"
            v-for="icon in icons"
            :key="icon"
            :icon="icon"
            class="mx-4 "
            variant="text"
          />
        </div>
      </section>
      <!-- the bottom navigation menu-->
      <div class="pt-1 pt-sm-0">
        <v-layout height="65">
          <v-bottom-navigation elevation="0">
            <v-tabs
              center-active
              align-tabs="title"
              next-icon="mdi-arrow-right"
              prev-icon="mdi-arrow-left"
              show-arrows
              scroll-target="#scroll-target"
              scroll-threshold="100"
            >
              <v-tab
                v-ripple="false"
                variant="text"
                class="mx-2 rounded-lg"
                v-for="link in pageLinks" 
                :key="link.title"
                :text="link.title"
              />
            </v-tabs>
          </v-bottom-navigation>
        </v-layout>
      </div>
      <!-- the copy right & descriptions section-->
      <div class="text-center my-2" style="user-select:none">
        <p class="mb-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur 
          nobis pariatur quisquam molestiae ab. Sint quia magnam corrupti libero
          provident commodi
          porro sed ratione, cupiditate ullam maiores ea, ipsa ut.
        </p>
        {{ currentYear }} — <strong>Vuetify</strong>
      </div>
    </section>
  </v-footer>
</template>

<style scoped>
.z-10 {
  z-index: 10;
}
</style>