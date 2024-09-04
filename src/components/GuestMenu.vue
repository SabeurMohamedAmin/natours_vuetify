<script setup>
  import { ref, inject, computed } from 'vue';
  import SideMenu from './SideMenu.vue';
    
  const guestMenu = [
    { title: 'all tours', icon: 'mdi-home', link: '/', routeName: 'homePage'},
    { title: 'signup', icon: 'mdi-account-edit', link: '/', routeName: 'loginPage'},
    {title: 'login', icon: 'mdi-login', link: '/auth/login', routeName: 'loginPage'},
  ];
  const userMenu = [
    { title: 'all tours', icon: 'mdi-home', link: '/', routeName: 'homePage'},
    {title: 'logout', icon: 'mdi-logout', link: '/auth/logout', routeName: 'logoutPage'},
  ];
  const userLogin = inject('userLogin');

  const menu = computed(()=> userLogin.value ? userMenu : guestMenu);

</script>

<template >
  <!-- Tablet and under Menu -->
  <div class="text-center d-md-none " >
    <v-btn
      id="humbuger_menu"
      color="primary"
      icon="mdi-menu"
      rounded="lg"
    />
    <v-menu
      open-on-click
      location="bottom"
      max-height="550px "
      activator="#humbuger_menu"
    >
      <v-list nav border dense min-width="250px">
        <v-list-item v-for="item in menu" :key="item.title">
          <v-btn
            link
            variant="elevated"
            class="text-none justify-start"
            size="large"
            width="100%"
            :text="item.title"
            :prepend-icon="item.icon"
            :to="{name: item.routeName}"
          />
        </v-list-item>
        <v-divider class="mb-7"/>
        <SideMenu />
      </v-list>
    </v-menu>
  </div>
  
  <!-- laptop and upper Menu -->
  <v-list 
    nav  dense 
    min-width="150px" 
    class="d-none d-md-flex elevation-0 bg-unset"
  >
    <v-list-item v-for="item in menu">
      <v-btn
        link
        variant="text"
        class="text-none"
        size="large"
        width="100%"
        :key="item.title"
        :to="item.link"
        :text="item.title"
      />
    </v-list-item>
  </v-list>
</template>