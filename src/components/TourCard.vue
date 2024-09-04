<script setup>

const props = defineProps({
  tour: Object
});

  //set an icon for the easy, medium and hard props.tours
  const difficultyIcon = (tour)=>{
    if(tour.difficulty){
      if(tour.difficulty === 'easy') return 'success';
      else if(tour.difficulty === 'medium') return 'warning';
      else return 'error';
    }
  };
  const simpleDate = (tour)=>{

    return new Date(tour.startDates[0]).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

</script>

<template>
  <v-card
    class="mx-auto"
    max-width="374"
  >
    <v-img
      height="250"
      :src="`http://127.0.0.1:3000/img/tours/${props.tour.imageCover}`"
      cover
    />
    <v-card-item>
      <v-card-title class="text-body-1">
        <strong>
          {{props.tour.name}}
        </strong>
      </v-card-title>
      
      <v-card-subtitle>
        <span class="me-1">
          <strong>{{`(${props.tour.difficulty})`}}</strong>{{` ${props.tour.duration}-day tour`}}
      </span>
      <v-icon
        :color="difficultyIcon(props.tour)"
        icon="mdi-elevation-rise"
        size="small"
        />
      
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :model-value="props.tour.ratingsAverage"
          color="amber"
          density="compact"
          size="small"
          half-increments
          readonly
        />
        <div class="text-grey ms-4">
          {{`${props.tour.ratingsAverage} (${props.tour.ratingsQuantity})`}}
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1 d-flex align-baseline">
        {{`$${ props.tour.price }`}}
        <v-spacer/>
        <span class=" text-subtitle-2 text-disabled align-end">
          <v-icon
          class="mr-1"
          color="green-lighten-1"
          icon="mdi-calendar"
          size="small"
        />
          {{`${simpleDate(props.tour)}`}}
        </span>
        <p>
        </p>
      </div>
      <div>
        <p>
          {{ props.tour.summary }}
        </p>
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1" />
    <v-card-title class="text-body-2 d-flex align-center">
      <v-icon
        class="mr-1"
        color="green-lighten-1"
        icon="mdi-map-marker"
        size="small"
      />
      <p>{{props.tour.startLocation.description}}</p>
      <v-spacer/>
      <span>
        <p> ({{ props.tour.maxGroupSize }})</p>
      </span>
      <v-icon
        class="mx-1"
        color="green-lighten-1"
        icon="mdi-account-multiple"
        size="small"
      />
    </v-card-title>

    <div class="px-4 mb-2">
      <v-chip-group >
        <template  v-for="local in props.tour.locations">
          <v-chip >
            <v-icon
              class="mx-1"
              color="green-lighten-1"
              icon="mdi-flag-variant"
              size="small"
            />
            {{local.description}}
          </v-chip>
        </template>
      </v-chip-group>
    </div>
    <v-card-actions>
      <v-btn
        color="green-lighten-1"
        text="See Details"
        append-icon="mdi-open-in-app"
        block
        border
        :to="{ name: 'tourPage',  params:{slug: props.tour.slug} }"
      />
    </v-card-actions>
  </v-card>
</template>