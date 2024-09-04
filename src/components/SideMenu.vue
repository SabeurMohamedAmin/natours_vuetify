<script setup>
</script>

<template>
  <section 
    id="side_filter" 
    class="position-sticky" 
    style="top:68px"
  >
    <v-sheet class="rounded-lg ">
      <v-list class="rounded-lg">
        <v-list-item
          class="mx-2 rounded-lg user-select-none"
          v-for="n in 10"
          :key="n"
          :title="`List Item ${n}`"
          link
        />
        <v-divider  class="my-2"/>
        <v-list-item
          color="grey-lighten-4"
          title="Refresh"
          link
        />
      </v-list>
    </v-sheet>
  </section>  
</template>

<style scoped>
.text-selecte-none{
  user-select: none;
}
</style>