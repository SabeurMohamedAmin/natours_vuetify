<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  reviews: {
    type: Array,
    required: true,
    default: [
      {
        id: 1559,
        review: 'Lorem ipsum dolor sit amet consectetur adipi.',
        rating: 4,
        user: {
          name: 'John Doe',
          photo: 'user-1.jpg'
        }
      }
    ]
  },
});

const imgDomainUrl = "http://127.0.0.1:3000/img/";


</script>

<template>
    <div id="slide_element" class="reviews">
      <v-card 
        v-for="(review, i) in props.reviews" :key="review._id"
        class="reviews__card rounded-lg"
      >
        <div class="reviews__avatar">
          <img
            :src="imgDomainUrl + 'users/' + review.user.photo"
            :alt="review.user.name"
            class="reviews__avatar-img"
          />
          <h6 class="reviews__user">{{ review?.user.name }}</h6>
        </div>
        <p class="reviews__text">
          {{ review.review }}
        </p>
        <div class="reviews__rating">
          <v-rating
            :model-value="review.rating"
            :length="5"
            size="38"
            active-color="yellow-accent-4"
            color="white"
            half-increments
            readonly
          />
        </div>
      </v-card>
    </div>
</template>