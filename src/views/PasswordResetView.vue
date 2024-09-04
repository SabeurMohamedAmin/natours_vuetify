<script setup>
import {onBeforeMount, ref, inject, onUnmounted} from "vue";
import axios from "@/utils/jwt";
import {useRouter, useRoute} from "vue-router";

// before Mounting the component, 
// check if the user is LOGIN or not
const userLogin = inject('userLogin');
const isValidToken = ref(false);
const router = useRouter();
const token = useRoute().query.token;

const CheckIsValid = async ()=>{
    //GET:{{URL}}/api/v1/users/auth/checkToken?token
    try{
      const response = await axios.get(`/api/v1/auth/checkToken?token=${token}`);
      if(response?.data?.isValid){
        isValidToken.value = true;
        email.value = response.data.userEmail;
      }
    }
    catch(err){
      resetAlert.value = {
        type: 'error',
        text: err.response.data.message,
        code:(err.response.status).toString()
    };
  showAlert.value = true;
  }
}
onBeforeMount(()=>{
  if(userLogin.value){
    router.back();
    return;
  };

  CheckIsValid();
  return;
});

// Email and password validation rules
const passwordRules = [
  (value)=> (!!value) || 'Please enter your password',
  (value)=> value.trim().length > 4 || 'Password must be at least 4 characters'
]
const confirmPasswordRules = [
  (value)=> (!!value) || 'Please confirm your password',
  (value)=> value.trim().length > 4 || 'Password must be at least 4 characters',
  (value)=> value === password.value || 'Passwords do not match'
]

// Email wich will be used to send the reset password link
const email = ref('random');
const password = ref('');
const confirmPassword = ref('');
const updatePasswordForm = ref(null);

const updatePassword = async()=>{
    const form = await updatePasswordForm.value.validate();
    if(!form.valid)return;
    loading.value = true;
    try{
        //Patch:{{url}}api/v1/users/resetPassword/{{reset_password_token}}
        const url = `/api/v1/users/resetPassword/${token}`;
        const response = await axios.patch(url, {
          password: password.value,
          passwordConfirm: confirmPassword.value
        });
        
        if(response.data){
            resetAlert.value = {type: 'success', text: response.data.message, code: 'great!, your password has been updated successfully, you can now login'};
            showAlert.value = true;
            loading.value = false;
            const timeoutIdToHome = setTimeout(() => {
            router.push({name: 'homePage'});
            return;
            }, 1500);
        }
    }catch(err){
      console.log('err', err)
        showAlert.value = true;
        loading.value = false;
        resetAlert.value = {type: 'error', text: err.response.data.message, code:(err.response.status).toString()};
    }
}

const loading = inject('loading');
const showAlert = ref(false);
const resetAlert = ref({type: null, text: '', code: null});
</script>

<template>
  <v-alert
      v-if="showAlert"
      :text="resetAlert.text"
      :type="resetAlert.type"
      :title = "resetAlert.code"
      border="start"
      close-label="Close Alert"
      variant="text"
      style= "z-index: 901;"
      class="text-h6 position-absolute w-75 p-absolute-center py-4 border-green-lighten-1 bg-drop"
  />
  <v-row class='py-4 pb-md-8 pb-lg-10'>
    <v-spacer/>
    <v-col cols="11" sm=7 md="7" lg="6">
      <v-sheet class="pa-3 rounded-lg">
        <h2  class="heading-secondary my-2 py-1">
          Update Password
        </h2>
        <p class="text-subtitle-1 mt-8 mb-6">
          Enter your new password and confirm it then click 
          the button below to update your password,
          which will be able to connect your email and the new password
        </p>
        <v-form 
          ref="updatePasswordForm" @submit.prevent="updatePassword" class="py-0"
        >
          <v-text-field
            readonly
            disabled
            :model-value="email"
            class="mb-2"
            label="Email"
            variant="outlined"
          />

          <v-text-field
            class="mb-2 "
            variant="outlined"
            v-model="password"
            label="Password"
            type="password" 
            :rules="passwordRules"
            required
          />
          <v-text-field
            class="mb-2 "
            variant="outlined"
            v-model="confirmPassword"
            label="Password"
            type="password" 
            :rules="confirmPasswordRules"
            required
            />
            error-messages="add : serverRes.error"

          <v-btn 
            class=" border-green-lighten-1 mx-auto pa-5 rounded-lg d-flex min-w-50 w-lg-25 mt-2 mb-4 text-success px-8" 
            type="submit" 
            text="Update My Password"
          />
        </v-form>
      </v-sheet>
    </v-col>
    <v-spacer/>
  </v-row>
</template>

<style scoped>

.bg-drop{
    backdrop-filter: blur(15px);
    background-color: rgba(255, 255, 255, 0.1);
    max-width: 70% !important;
}
</style>