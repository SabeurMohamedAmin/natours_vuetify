<script setup>
    import { ref } from 'vue';
    import axios from '@/utils/jwt';
    
    const serverRes = ref({error: ''});
    const changePasswordForm = ref(null);
    const newPassword = ref('');
    const CurrentPassword = ref('');
    const confirmPassword = ref('');

    // Update Password form validation rules
    const CurrentPasswordRules= [
    (value)=> (!!value) || 'Please enter your current password',
    (value)=> value.trim().length > 4 || 'Password must be at least 4 characters'
    ];
    const newPasswordRules= [
    (value)=> (!!value) || 'Please enter your name',
    (value)=> value.trim().length > 4 || 'Password must be at least 4 characters'
    ];
    const confirmPasswordRules= [
    (value)=> (!!value) || 'Please enter your email',
    (value)=> value === newPassword.value || 'Password must be identical to the new password'
    ];

// Login send login request to the server
const change_password = async () => {
  serverRes.value.error = '';
  const formValid = await changePasswordForm.value.validate();
  if (!formValid.valid) return;
  try {
    const url = '/api/v1/users/updateMyPassword';///updateMyPassword
    const response = await axios.patch(url,
      {
          passwordCurrent: CurrentPassword.value,
          password: newPassword.value,
          passwordConfirm: confirmPassword.value,
      }
    );
    console.log(response);
  } catch (err) {
    console.log('zerror', err)
    serverRes.value.error = err.response.data.message;
  }
};
</script>

<template>
    <v-divider class="py-4 my-10 mx-4"/>
    <v-sheet rounded="lg" class="min-w-250 mt-4 mb-4">
        <v-col cols="10" offset-md="1" class="px-0 mb-2">
            <h1 class="heading-secondary text-h3 text-uppercase mb-2">
                Change Password
            </h1>
        </v-col>
        <v-form 
            @submit.prevent="change_password" 
            ref="changePasswordForm"
            class="py-0"
        >
        <v-row>
        <!-- Name -->
        <v-col cols="10" class="mx-md-auto">
            <v-text-field
                variant="outlined"
                class="mb-2"
                label="Your Current Password"
                type="password"
                :error-messages="serverRes.error"
                v-model="CurrentPassword"
                :rules="CurrentPasswordRules"
                required
            />
        </v-col>
        <!-- Email -->
        <v-col cols="10" class="mx-md-auto">
            <v-text-field
                variant="outlined"
                class="mb-2"
                label="Your New Password"
                type="password"
                v-model="newPassword"
                :rules="newPasswordRules"
                required
            />
        </v-col>
        <!-- User role -->
        <v-col cols="10" class="mx-md-auto">
            <v-text-field
                variant="outlined"
                class="mb-2"
                label="Confirm New Password"
                v-model="confirmPassword"
                type="password"
                :rules="confirmPasswordRules"
                required
            />
        </v-col>    
        <v-col cols="10" md="11" class=" d-flex ">
            <v-btn 
                class="ml-auto border rounded-lg text-success d-flex min-w-50 w-lg-25" 
                type="submit" 
                text="Change Password"
            />
        </v-col>
        </v-row>
    </v-form>
    </v-sheet>
</template>