<script setup>
  import { ref, computed, onUnmounted, inject } from 'vue';
  import axios from '@/utils/jwt';
  import { useRouter } from 'vue-router';
  import emailValidator from '@/utils/emailValidator'; 
  
  const props = defineProps({
    user: {
      type: Object,
      required: true,
      default: () => ({
        role: '',
        name: '',
        email: '',
        active: '',
      }),
    }
  });
  const emit = defineEmits(['cancelUpdate']);
  const serverRes = ref({error: ''});
  const updateUserForm = ref(null);
  const loading = inject('loading')
  const router = useRouter();

  const photo = ref(null);
  const name = ref(props.user.name);
  const email = ref(props.user.email);
  const role = ref(props.user.role); 
  const status = ref(props.user.active ? 'Active' : 'Inactive'); 


  // Profile form validation rules
  const nameRules= [
  (value)=> (!!value) || 'Please enter your name',
    (value)=> value.trim().length > 4 || 'Name must be at least 4 characters'
  ];
  const emailRules= [
  (value)=> (!!value) || 'Please enter your email',
    (value)=> emailValidator(value) || 'Please enter a valid email'
  ];

  const roleRules= [
  (value)=> (!!value) || 'Please enter your role : admin | guide|  lead-guide | user',
    (value)=> value.trim().length > 4 || 'Role must be at least 4 characters'
  ]


  // Update User info request to the server
  const update_the_profile = async () => {
    serverRes.value.error = '';
    const formValid = await updateUserForm.value.validate();
    if (!formValid.valid) return;
    // Update the user info
  try {
    const url = '/api/v1/users/updateMe';

    const form = new FormData();
    form.append('name', name.value);
    form.append('email', email.value);
    form.append('role', role.value);
    //form.append('photo', photo.value);
    form.append('photo', selected_file.value.files[0]);
    loading.value = true;
    
    const response = await axios.patch(url, form).then(()=>{
      loading.value = false;
      router.go({name: 'profilePage'});
    });

  } catch (err) {
    serverRes.value.error = err.response.data.message;
  }
};


// ref's for Image preview
const photo_for_hrml = ref('');
const selected_file = ref('');

// Image preview on <HTML> function
function previewFile() {
  if (!selected_file?.value?.files?.length) return;
  photo.value = selected_file.value.files[0];
  const reader = new FileReader();
  // File validation
  // Check if the file is a valid image
  const isValidFile = (file) => {
    const MAX_FILE_SIZE_MB = 5;
    const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const fileSizeMB = file.size / 1024 / 1024;
    const fileType = file.type;

    if (fileSizeMB > MAX_FILE_SIZE_MB) {
      alert(`File size exceeds: ${MAX_FILE_SIZE_MB} MB`);
      return false;
    }

    if (!VALID_IMAGE_TYPES.includes(fileType)) {
      console.error('File type must be jpeg, jpg, or png');
      return false;
    }
    return true;
  };
  if (isValidFile(photo.value)) {
    reader.readAsDataURL(photo.value);
  }
  reader.onloadend = function () {
    // Assign the image to the image element HTML
    // Assign the photo for server upload
    photo_for_hrml.value = reader.result;
  }
}

const preview = computed(() => {
  return photo_for_hrml.value ;
});

onUnmounted(() => {
  photo_for_hrml.value = '';
});
</script>

<template>
  <v-sheet rounded="lg" class="min-w-250 mt-4 mb-4">
    <v-fab
      icon="mdi-arrow-left"
      location="bottom left"
      rounded="lg"
      variant="plain"
      class="my-4"
      size="40"
      absolute
      offset
      @click="emit('cancelUpdate')"
    />
    <v-col cols="10" offset-md="1" class="px-0 mb-2">
        <h1 class="heading-secondary text-h3 text-uppercase mb-2">
          Update Basic Details
        </h1>
      </v-col>
    <v-form 
      enctype="multipart/form-data"
      @submit.prevent="update_the_profile" 
      ref="updateUserForm"
      class="py-0"
    >
      <v-row>
      <!-- Name -->
       <v-col cols="10" class="mx-md-auto">
         <v-text-field
           variant="outlined"
           class="mb-2"
           label="Name"
           v-model="name"
           :rules="nameRules"
           required
         />
       </v-col>
      <!-- Email -->
      <v-col cols="10" class="mx-md-auto">
        <v-text-field
          variant="outlined"
          class="mb-2"
          label="Email"
          v-model="email"
          :rules="emailRules"
          required
        />
      </v-col>
      <!-- User role -->
      <v-col cols="10" class="mx-md-auto">
        <v-text-field
          variant="outlined"
          class="mb-2"
          label="User Role"
          v-model="role"
          :rules="roleRules"
          required
        />
      </v-col>
      <!-- User Stat active/Inactive true/false -->
      <v-col cols="10" class="mx-md-auto">
        <v-text-field
          readonly
          disabled
          class="mb-2"
          variant="outlined"
          label="User Status"
          placeholder="Active"
          v-model="status"
        />
      </v-col>
      <!-- Photo Upload Input-->
      <v-col cols="6" offset-md="1" >
        <v-file-input
          ref="selected_file"
          variant="outlined"
          cols="4"
          class="py-2 mb-2 overflow-hidden"
          label="User Photo"
          accept="image/*"
          prepend-icon="mdi-camera"
          @change="previewFile"
        />
      </v-col>
      <!-- Photo preview HTML -->
      <v-col cols="3" offset="1" class="text-end">
        <v-img 
          v-if="preview"
          max-height="80"
          max-width="80"
          class="text-left ml-auto border border-green-lighten-1 rounded-lg"
          alt="user photo"
          :src="preview"
        />
      </v-col>
      <!-- Update/Cancel Profile Button -->
      <v-col cols="10" md="11" class=" d-flex ">
        <v-btn 
          class="ml-auto border rounded-lg text-success d-flex min-w-50 w-lg-25" 
          type="submit" 
          text="Update Profile"
          :disabled="loading"
        />
        <v-btn 
          class=" ml-5 border rounded-lg text-warning d-flex min-w-50 w-lg-25" 
          @click="emit('cancelUpdate')"
          text="Cancel"
        />
      </v-col>
    </v-row>
  </v-form>
  <UpdatePassword/>
</v-sheet>
</template>