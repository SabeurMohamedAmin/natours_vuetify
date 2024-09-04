<script setup>
  import {onBeforeMount, inject} from 'vue'
  import {useRouter} from 'vue-router'
  import axios from '@/utils/jwt'

  const userLogin = inject('userLogin');
  const router = useRouter();
  onBeforeMount( async() => {
    const user = await axios.get('api/v1/auth/login');
    if(user.data.userLogin){
      const response = await axios.get('api/v1/auth/logout').then((res)=>{
        userLogin.value = false;
        router.go({name: 'homePage'});
        return;
      });
    }
    
    router.push({name: 'homePage'});
  })
</script>
<template>

</template>