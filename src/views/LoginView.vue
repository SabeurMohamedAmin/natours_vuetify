<script setup>
// AFTER add a script to prevent the user from 
// accessing the login page if they are already logged in
import { ref, onBeforeMount, computed, inject, onBeforeUnmount } from 'vue';
import {useRouter} from 'vue-router';
import axios from '@/utils/jwt';
import emailValidator from '@/utils/emailValidator'; 

const router = useRouter();
const serverRes = ref({error: ''});
const loginForm = ref(null);
const email = ref('');
const password = ref('');
/*honeyboot*/
const username = ref(''); 

//check if the user is already logged in
onBeforeMount(async()=>{
   try{ 
    const url = '/api/v1/auth/login';
    const response = await axios.get(url);
    if(response.data.userLogin){
      router.back();
    }
  }catch(err){
    console.log("err");
  }
  return;
});



// Email and password validation rules
const emailRules= [
 (value)=> (!!value) || 'Please enter your email',
  (value)=> emailValidator(value) || 'Please enter a valid email'
]

const passwordRules = [
  (value)=> (!!value) || 'Please enter your password',
  (value)=> value.trim().length > 4 || 'Password must be at least 4 characters'
]

// Login send login request to the server
const login = async () => {
  serverRes.value.error = '';
  const formValid = await loginForm.value.validate();
  if (!formValid.valid) return;
  try {
    const url = '/api/v1/auth/login';
    const response = await axios.post(url,
      {
        email: email.value,
        password: password.value
      }
    );

    if (response.data) {
      afterLogin(response.data.token);
    }
  } catch (err) {
    console.log('zerror', err)
    serverRes.value.error = err.response.data.message;
  }
};

const loading = inject('loading');

const afterLogin = (token) => {
  console
  if (token) {
    userLogin.value = true;
    showAlert.value = true;
    loading.value = true;
    const timeoutId = setTimeout(() => {
      showAlert.value = false;
      loading.value = false;
      router.push({ name: 'homePage' });
      return;
    }, 2000);
    setTimeout(() => {
      router.go(0);
    }, 1000);
  }
};

const userLogin = inject('userLogin');
const showAlert = ref(false);
const loginAlert = computed(()=> {
  return {
    icon: 'mdi-check',
    title: 'Login successful',
    text: 'You are now logged in',
    type: 'success',
    variant: 'tonal',
  }
});
</script>

<template>
    <v-alert
      v-if="showAlert"
      :icon="loginAlert.icon"
      :title="loginAlert.title"
      :text="loginAlert.text"
      :type="loginAlert.type"
      border="start"
      close-label="Close Alert"
      variant="text"
      style= "z-index: 901;"
      class="position-absolute w-75 p-absolute-center py-4 border-green-lighten-1"
    />
  <v-row class='py-4 pb-md-8 pb-lg-10'>
    <v-spacer/>
    <v-col cols="11" sm=7 md="7" lg="6">
      <v-sheet class="pa-3 rounded-lg">
        <h2  class="heading-secondary my-2 py-1">
          Log into your account
        </h2>
        <v-form ref="loginForm" @submit.prevent="login" class="py-0" >
          <v-text-field
            class="mb-2"
            variant="outlined"
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
          />
          <v-text-field
            class="mb-2 d-none"
            variant="outlined"
            v-model="username"
            label="Username"
          />
          <v-text-field
            class="mb-2 "
            variant="outlined"
            v-model="password"
            label="Password"
            type="password" 
            :rules="passwordRules"
            :error-messages="serverRes.error"
            required
          />

          <v-btn 
            class=" border-green-lighten-1 mx-auto pa-5 rounded-lg d-flex min-w-50 w-lg-25 mt-2 mb-4 text-success" 
            type="submit" 
            text="Login"
          />
          <v-btn 
            link
            class=" mx-auto pa-5 rounded-lg d-flex min-w-50 min-w-lg-25 text-warning" 
            type="submit" 
            text="Forgot Password ?"
            variant="flat"
            :to="{name: 'resetPasswordPage'}"
          />
          <div class="d-flex align-center my-7 py-2 ">
            <v-divider  />
            <p class=" mx-5 flex-0-0 text-blue-lighten-5">or continue with</p>
            <v-divider />
          </div>

          <v-btn 
            class=" border-green-lighten-1 mx-auto pa-5 rounded-lg d-flex min-w-50 w-lg-25 mt-2 mb-4 text-blue-lighten-5" 
            type="submit" 
            text="Login with google"
            prepend-icon="mdi-google"
            @loginWithGoogle="console.log('login with google')"
          />
        </v-form>
      </v-sheet>
    </v-col>
    <v-spacer/>
  </v-row>
</template>

<style scoped>
.min-w-50{
  min-width: 50%;
  max-width: 250px;
}

.p-absolute-center{
  backdrop-filter: blur(14px) saturate(18%) contrast(90%) brightness(70%);
  min-height: 100px;
  position: absolute;
  z-index: 100;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>



{ type: Point, coordinates: [ -115.570154, 51.178456 ] }