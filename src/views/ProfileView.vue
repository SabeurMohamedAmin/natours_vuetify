<script setup>
  import { ref, onBeforeMount, inject } from 'vue';
  import {useRouter} from 'vue-router';
  import TabProfile from '@/components/TabProfile.vue';
  import TabReview from '@/components/TabReview.vue';
  import TabSecurity from '@/components/TabSecurity.vue';
  import TabBooking from '@/components/TabBooking.vue';

const router = useRouter();
const userLogin = inject('userLogin');

onBeforeMount(() => {
  if (!userLogin.value) {
    router.push({ name: 'homePage'});
    return;
  }
});
/*********
 *********
 *********/
// User : Profile/ Security/ My Bookings/ My reviews
// Admin : Profile/ Security/ My Bookings/ My reviews/
// Manage Users/ Manage Bookings/ Manage Reviews
  const tab = ref('Profile');
  const tabs =[
    {
      icon: 'mdi-account-outline',
      text: 'Profile',
      component: TabProfile,
    },
    {
      icon: 'mdi-security',
      text: 'Security',
      component: TabSecurity,
    },
    {
      icon: 'mdi-folder-multiple-outline',
      text: 'My Bookings',
      component: TabBooking,
    },
    {
      icon: 'mdi-star-outline',
      text: 'My Reviews',
      component: TabReview,
    },
  ];
</script>

<template>
  <v-sheet elevation="3" rounded="lg" class="min-h-100vh">
    <v-tabs
      v-model="tab"
      :items="tabs"
      align-tabs="start"
      height="60"
      slider-color="green-lighten-1"
      prev-icon="mdi-chevron-left"
      next-icon="mdi-chevron-right"
      show-arrows
    >
      <template v-slot:tab="{ item }">
        <v-tab
          :prepend-icon="item.icon"
          :text="item.text"
          :value="item.text"
          class="text-none"
        />
      </template>
      <template v-slot:item="{ item }">
        <v-tabs-window-item :value="item.text" class="pa-4">
          <component :is="item.component"/>
        </v-tabs-window-item>
      </template>
    </v-tabs>
  </v-sheet>
</template>

<style scoped>
  .min-h-100vh {
    min-height: 100vh;
  }

.v-tab-item--selected, .v-tab--selected, .font-green-lighten-1 {
    font-weight: 300 !important;
    background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#7dd56f),
      to(#28b487)
    ) !important;
    background-image: linear-gradient(to right, #7dd56f, #28b487) !important;
    -webkit-background-clip: text;
    background-clip: text;
    color: #28b48830;
  }
</style>