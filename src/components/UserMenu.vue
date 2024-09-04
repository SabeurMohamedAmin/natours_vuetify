<script setup>
  import SideMenu from './SideMenu.vue';
    
  const userMenu = [
    { title: 'all tours', icon: 'mdi-home', link: '/', routeName: 'homePage'},
    {title: 'logout', icon: 'mdi-logout', link: '/auth/logout', routeName: 'logoutPage'},
  ];


</script>

<template >
  <!-- Tablet and under Menu -->
  <div class="text-center d-md-none"  >
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
        <v-list-item v-for="item in userMenu" :key="item.title">
          <v-btn
            link
            variant="plain"
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
    class="d-none d-md-flex elevation-0 "
  >
    <v-list-item v-for="item in userMenu">
      <v-btn
        link
        class="text-none"
        size="large"
        width="100%"
        :key="item.title"
        :to="item.link"
        variant="plain"
        :text="item.title"
      />
    </v-list-item>
  </v-list>
</template>