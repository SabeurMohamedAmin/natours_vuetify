<script setup>
  // header for guest users i use
  import { ref, inject, computed, onMounted} from 'vue';
  import GuestMenu from './GuestMenu.vue';
  import { useRouter } from 'vue-router';

  const search_input = ref(null);
  const userPhoto = inject('userPhoto');
  const userLogin = inject('userLogin');
  const router = useRouter();
  const user_photo_handler = computed(() => {
    return (userPhoto.value)
    ?`http://127.0.0.1:3000/img/users/${userPhoto.value}`
    : '';
  })

  const searchInTours2 = ()=>{
    if(search_input.value){
    }
  }
  
  // Search input and list of reults in the form
  const searchBoxState = ref(false);
  const inputSearchValue = ref('');

</script>

<template>
  <v-row class="mx-4 d-flex align-center justify-center backdrop bg-unset">
    <GuestMenu />
    <v-spacer/>
    <v-col cols="8" md="6" min-width="240" class="flex-grow-1">
      <v-form ref="search_form" @submit.prevent>
        <v-text-field
          ref="search_input"
          density="compact"
          label="Search"
          rounded="lg"
          placeholder="Search"
          variant="solo-filled"
          append-inner-icon="mdi-magnify"
          @click:append-inner="searchInTours2"
          @focus="searchBoxState = true"
          v-model="inputSearchValue"
          style="z-index: 5;"
          flat 
          hide-details
          single-line
        />
        <!-- SEARCH BOX LIST TELEPORT TO GuestLayout -->
        <Teleport to="body" >
          <SearchList
            v-show="searchBoxState" 
            :searchTour="inputSearchValue"
            @close="searchBoxState = false"
            :html_element="search_input"
          />
        </Teleport>
      </v-form>
    </v-col>
    <v-col cols="2" sm="1" v-if="userLogin" >
      <v-avatar 
        @click= "router.push({name: 'profilePage'})"
        class="elevation-2 cursor-pointer"
        alt="avatar / Settings"
        title="Settings"
        variant="plain"
        rounded="lg"
        size="40"
        tag="i"
      >
        <v-img
          alt="Avatar"
          lazy-src="https://picsum.photos/id/11/100/60"
          :src="user_photo_handler"
        />
      </v-avatar>
    </v-col>
  </v-row>
</template>

<style scoped>
  .v-avatar{
    transition: transform 0.2s;
  }
  .v-avatar:hover{
    transform: scale(1.1);
  }
  .backdrop{
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.272);
    backdrop-filter: blur(14px) saturate(180%) contrast(60%) brightness(70%);
  }
</style>