<script setup>
import {onBeforeMount, onMounted, ref, inject} from "vue";
import emailValidator from "@/utils/emailValidator";
import axios from "@/utils/jwt";
import {useRouter} from "vue-router";

// before Mounting the component, 
// check if the user is LOGIN or not
const userLogin = inject('userLogin');
const router = useRouter();
onBeforeMount(()=>{
  if(userLogin.value){
    router.back();
  }
  return;
});

const email_input = ref(null);
onMounted(()=>{
  email_input.value.focus();
  return;
});
// Email and password validation rules
const emailRules= [
 (value)=> (!!value) || 'Please enter your email',
  (value)=> emailValidator(value) || 'Please enter a valid email'
]

// Email wich will be used to send the reset password link
const email = ref('');
const resetPasswordForm = ref(null);
const sendResetPasswordEmail = async()=>{
    const form = await resetPasswordForm.value.validate();
    if(!form.valid)return;
    loading.value = true;
    try{
        //POST:{{URL}}/api/v1/users/forgotPassword
        const response = await axios.post('/api/v1/users/forgotPassword', {email: email.value});
        
        if(response.data){
            resetAlert.value = {type: 'success', text: response.data.message, code: 'Verification link sent'};
            showAlert.value = true;
            loading.value = false;
            const timeoutIdBack = setTimeout(() => {
              router.back();
            }, 1500);

        }
    }catch(err){
        showAlert.value = true;
        loading.value = false;
        resetAlert.value = {type: 'error', text: err.response.data.message, code:(err.response.status).toString()};
        const timeoutAlert = setTimeout(() => {
            showAlert.value = false;
            resetAlert.value = {type: null, text: '', code: null};
            return;
        }, 3000);
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
          Reset Password
        </h2>
        <p class="body-1 mt-8 mb-6">
          Enter your email address and click 
          the button below to get a password reset link,
          which will be sent to your email
          "in the next couples munites".
        </p>
        <v-form ref="resetPasswordForm" @submit.prevent="sendResetPasswordEmail" class="py-0" >
          <v-text-field
            required
            class="mb-2"
            label="Email"
            variant="outlined"
            ref="email_input"
            v-model="email"
            :rules="emailRules"
          />

          <v-btn 
            class=" border-green-lighten-1 mx-auto pa-5 rounded-lg d-flex min-w-50 w-lg-25 mt-2 mb-4 text-success px-8" 
            type="submit" 
            text="Send Reset Link"
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