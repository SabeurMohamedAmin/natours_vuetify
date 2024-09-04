<script setup>
  import { computed, ref, onBeforeMount } from 'vue';
  import {useDisplay} from 'vuetify';
  import axios from '@/utils/jwt';
  import ProfileUpdate from './ProfileUpdate.vue';

  const { smAndDown } = useDisplay();
  const editProfile = ref(false);
  const user = ref({
    role: '',
    name: '',
    email: '',
    photo: '',
    active: true,
  });

  onBeforeMount(async () => {
    const response = await axios.get('/api/v1/users/me');
    user.value = response.data.User
  });
  const userPhoto = computed(()=>{
    return `http://127.0.0.1:3000/img/users/${user.value.photo}`;
  })
  const photoSize = computed(()=>{
    return smAndDown.value? 50 : 80;
  })
  const userStatus = computed(()=>{
    return user.value.active ? 'Active' : 'Inactive';
  })  
</script>

<template>
  <v-sheet rounded="lg">
      <v-expand-transition>
        <ProfileUpdate 
          v-if="editProfile"
          @cancel-update="editProfile= false"
          :user="user" 
        />

        <v-row class="mt-5" v-else >
          <!--profile photo-->
          <v-col offset="1" cols="2">
            <v-avatar :size="photoSize" size-sm="100" rounded="lg">
              <v-img 
                :title="user.name || 'user photo'"
                :src="userPhoto" 
                alt="John" 
              />
            </v-avatar>
          </v-col>
          <!--User role <admin|guide|lead-guide|user>-->
          <v-col cols="8">
            <h1 class="heading-secondary text-h3 text-uppercase mb-2">
              Profile
            </h1>
            <h2 class="text-h4 font-weigh-light font-italic opacity-60">
              {{ user.role }}
            </h2>
          </v-col>
          <!--User details-->
          <v-col offset="1" cols="4" class="text-left my-2 text-h7">
            <p>Name :</p>
          </v-col>
          <v-col cols="7" class="text-left my-2 text-h7 opacity-60">
            <p>{{user.name}}</p>
          </v-col>
          <v-col offset="1" cols="4" class="text-left my-2 text-h7">
            <p>Email :</p>
          </v-col>
          <v-col cols="7" class="text-left my-2 text-h7 opacity-60">
            <p>{{user.email}}</p>
          </v-col>
          <v-col offset="1" cols="4" class="text-left my-2 text-h7">
            <p>Phone :</p>
          </v-col>
          <v-col cols="7" class="text-left my-2 text-h7 opacity-60">
            <p>John Doe</p>
          </v-col>
          <v-col offset="1" cols="4" class="text-left my-2 text-h7">
            <p>Provider :</p>
          </v-col>
          <v-col cols="7" class="text-left my-2 text-h7 opacity-60">
            <p>John Doe</p>
          </v-col>
          <v-col offset="1" cols="4" class="text-left my-2 text-h7">
            <p>Status :</p>
          </v-col>
          <v-col cols="7" class="text-left my-2 text-h7 opacity-60">
            <p>{{ userStatus }}</p>
          </v-col>
  
          <v-col offset="1" cols="6" class="text-left my-2 text-h7">
            <v-btn
              @click="editProfile = true"
              class="text-green-lighten"
              prepend-icon="mdi-pencil"
              variant="outlined"
              text="Edit Profile"
              rounded="lg"
              size="large"
            />
          </v-col >
        </v-row>
      </v-expand-transition>
    </v-sheet>
</template>

<style scoped>
  .min-h-100vh {
    min-height: 100vh;
  }

  /* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 5s ease;
}

.v-enter-from,
.v-leave-to {
  transition: opacity 5s ease;

  opacity: 0;
}
</style>