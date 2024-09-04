<script setup>
  import { ref, provide, onMounted } from 'vue';
  import axios from '@/utils/jwt';
  import GuestLayout from './layouts/GuestLayout.vue';
  import GuestHeader from './components/GuestHeader.vue';

  const userPhoto = ref(null);
  const userLogin = ref(false);
  const loading = ref(false);

  provide('userPhoto', userPhoto);
  provide('userLogin', userLogin);
  provide('loading', loading);

  onMounted(async ()=>{
    const res = await axios.get('/api/v1/auth/login');
    userPhoto.value = res.data.photo;
    userLogin.value = !!res.data.userLogin;
    return
  });
</script>

<template >
  <!-- the App -->
  <v-app id="inspire" class="min-w-250">
    <!-- the App header-->
      <v-app-bar flat class="min-w-250 bg-unset border-t border-black">
        <GuestHeader/>
      </v-app-bar>
      <!-- the App content-->
      <GuestLayout />
      <!--v-show="searchList"-->
    <!-- the App footer-->
      <AppFooter />
      <v-overlay
        :model-value="loading"
        class="align-center justify-center"
        z-index="900"
        location-strategy="connected"
        scroll-strategy="block"
        persistent
      >
        <v-progress-circular
          color="primary"
          size="64"
          indeterminate
        ></v-progress-circular>
      </v-overlay>
  </v-app>
</template>

<style>
  .bg-unset{
    background-color: unset !important;
  }
  .border-black{
    border-color: rgb(19, 21, 19) !important;
  }
  .min-w-250 {
    min-width: 380px;
    z-index: 200!important;
  }
  .user-select-none{
    user-select: none;
  }

  :root {
    --section-rotate: 9vw;
  }

  ::-moz-selection {
    background-color: #55c57a;
    color: #fff;
  }

  ::selection {
    background-color: #55c57a;
    color: #fff;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }

  html {
    font-size: 80%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    line-height: 1.6;
    font-weight: 300;
    font-family: 'Lato', sans-serif;
    color: #777;
    padding: 1rem 0 0 0; 
    min-height: 100vh;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }

  .main {
    background-color: #f7f7f7;
    padding: 8rem 6rem;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    position: relative;
  }

  .flex {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .container {
    max-width: 120rem;
    margin: 0 auto;
  }

  .ma-bt-md {
    margin-bottom: 3rem !important;
  }

  .ma-bt-lg {
    margin-bottom: 3.5rem !important;
  }

  .right {
    text-align: right !important;
  }

  .line {
    margin: 6rem 0;
    width: 100%;
    height: 1px;
    background-color: #e0e0e0;
  }

  .heading-secondary {
    text-transform: uppercase;
    font-weight: 300;
    background-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#7dd56f),
      to(#28b487)
    );
    background-image: linear-gradient(to right, #7dd56f, #28b487) !important;
    -webkit-background-clip: text;
    color: transparent;
    letter-spacing: 0.1rem;
    line-height: 1.2;
    display: inline-block;
  }
  
  .heading-primary,
  .heading-tertirary {
    /*color: #fff;*/
    text-transform: uppercase;
  }
  .heading-primary span {
    padding: 1rem 1.5rem;
    line-height: 2;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    background-image: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(rgba(125, 213, 111, 0.85)),
      to(rgba(40, 180, 135, 0.85))
    );
    background-image: linear-gradient(
      to bottom right,
      rgba(125, 213, 111, 0.85),
      rgba(40, 180, 135, 0.85)
    );
  }

  .text-green-lighten{
    background-image: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(rgba(125, 213, 111, 0.85)),
      to(rgba(40, 180, 135, 0.85))
    );
    background-image: linear-gradient(
      to bottom right,
      rgba(125, 213, 111, 0.85),
      rgba(40, 180, 135, 0.85)
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: #2e864b70;
  }

  .heading-primary {
    font-size: 3.2rem;
    text-align: center;
    width: 75%;
    margin: 0 auto;
  }

  .btn,
  .btn:link,
  .btn:visited {
    font-size: 1.6rem;
    padding: 1.4rem 3rem;
    border-radius: 10rem;
    text-transform: uppercase;
    display: inline-block;
    text-decoration: none;
    position: relative;
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    font-weight: 400;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    /*Add later when we use this for the button in form*/
    border: none;
    cursor: pointer;
  }

  .btn:hover {
    -webkit-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.15);
  }

  .btn:active {
    -webkit-transform: translateY(-1px);
    transform: translateY(-1px);
    -webkit-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }

  .btn:focus {
    outline: none;
    background-color: #2e864b;
  }

  .header {
    background-color: #444;
    padding: 0 5rem;
    height: 8rem;
    position: relative;
    z-index: 10;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .section-header {
    position: relative;
    height: 50vw;
    clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - var(--section-rotate)),
      0 100%
    );
    -webkit-clip-path: polygon(
      0 0,
      100% 0,
      100% calc(100% - var(--section-rotate)),
      0 100%
    );
  }

  .header__hero {
    height: 100%;
  }

  .header__hero-img {
    -o-object-fit: cover;
    object-fit: cover;
    height: 100%;
    width: 100%;
    -o-object-position: 50% 25%;
    object-position: 50% 25%;
    user-select: none;
  }

  .header__hero-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(#7dd56f),
      to(#28b487)
    );
    background-image: linear-gradient(to right bottom, #7dd56f, #28b487);
    opacity: 0.5;
  }

  .heading-box {
    position: absolute;
    bottom: 20vw;
    left: 50%;
    top: 30%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
  .heading-box__group {
    /*color: #f7f7f7;*/
    margin-top: 3rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  .heading-box__detail {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.15);
  }
  .heading-box__detail svg {
    margin-right: 0.8rem;
  }
  .heading-box__detail:not(:last-child) {
    margin-right: 4rem;
  }
  .heading-box__icon {
    height: 2rem;
    width: 2rem;
    fill: currentColor;
    -webkit-filter: drop-shadow(0 0.75rem 0.5rem rgba(0, 0, 0, 0.25));
    filter: drop-shadow(0 0.75rem 0.5rem rgba(0, 0, 0, 0.25));
  }

  .section-description {
    margin-top: calc(0px - var(--section-rotate));
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    clip-path: polygon(
      0 var(--section-rotate),
      100% 0,
      100% calc(100% - var(--section-rotate)),
      0 100%
    );
    margin-top: calc(10px - var(--section-rotate));
    
  }
  .section-description > * {
    opacity: 0.8;
    padding: 1rem;
    padding-bottom: calc(1vw + var(--section-rotate));
    width: 100%;
    font-size: 1rem;
    padding-top: 5rem;
  }


  .description-box .description__text {
    font-size: 1.6rem;
  }
  .description-box .description__text:not(:last-child) {
    margin-bottom: 2rem;
  }



  .text-h7{
    font-size: 1.5rem;
  }
  .border-green-lighten-1 {
    border-radius: 8px !important;
    border: 1px solid transparent ;
    animation: borderRotate 7s alternate infinite linear;
  }

@keyframes borderRotate {
  0% {
    border-color:  #B9F6CA20;
  }
  50% {
    border: 1px solid transparent;
  }
  100% {
    border-color: #66BB6A10;
  }
}



  .overview-box {
    width: 100%;
    font-size: 1.2rem;
    padding-top: 5rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .overview-box__group:not(:last-child) {
    margin-bottom: 7rem;
  }

  .overview-box__detail {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-weight: 400;
  }
 
  .overview-box__detail:not(:last-child) {
    margin-bottom: 2.25rem;
  }
  .overview-box__label {
    font-weight: 700;
    margin-right: 2.25rem;
    text-transform: uppercase;
    font-size: 1.4rem;
  }
  .overview-box__text {
    text-transform: capitalize;
  }
  .overview-box__img {
    border-radius: 50%;
    height: 3.5rem;
    margin-right: 1.25rem;
    user-select: none;
  }


  /* tour pictures and images section */
  .section-pictures {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    clip-path: polygon(0 var(--section-rotate), 100% 0, 100% calc(100% - var(--section-rotate)), 0 100%);
    -webkit-clip-path: polygon(0 var(--section-rotate), 100% 0, 100% calc(100% - var(--section-rotate)), 0 100%);
    margin-top: calc(0px - var(--section-rotate));
    position: relative;
    left: -2px;
    z-index: 10;
  }
  .picture-box__img {
    display: block;
    width: 100%;
    height: 120%;
    -o-object-fit: cover;
    object-fit: cover;
    user-select: none;
  }
  .picture-box__img--1 {
    padding-top: 15%;
    user-select: none;
  }
  .picture-box__img--2 {
    padding-bottom: 15%;
    user-select: none;

  }
  .picture-box__img--3 {
    padding-bottom: 15%;
    user-select: none;
  }
  .picture-box__img--4 {
    padding-bottom: 15%;
    user-select: none;
  }


  /* Review Section */
  .section-reviews {
    margin-top: calc(0px - var(--section-rotate));
    padding: calc(5rem + var(--section-rotate)) 0;
    position: relative;
    background: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(#7dd56f),
      to(#28b487)
    );
    background: linear-gradient(to right bottom, #7dd56f, #28b487);
    clip-path: polygon(
      0 var(--section-rotate),
      100% 0,
      100% calc(100% - var(--section-rotate)),
      0 100%
    );
    -webkit-clip-path: polygon(
      0 var(--section-rotate),
      100% 0,
      100% calc(100% - var(--section-rotate)),
      0 100%
    );
  }

  .reviews {
    padding: 5rem 0;
    display: grid;
    grid-column-gap: 5rem;
    grid-auto-flow: column;
    overflow-x: auto;
    -ms-scroll-snap-type: x mandatory;
    scroll-snap-type: x mandatory;
  }
  .reviews__card {
    width: 25rem;
    padding: 2rem;
    -webkit-box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
    box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.15);
    scroll-snap-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  
  .reviews:before,
  .reviews:after {
    content: '';
    width: 2rem;
  }
  .reviews__avatar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-bottom: 2rem;
  }
  .reviews__avatar-img {
    height: 4.5rem;
    border-radius: 50%;
    margin-right: 1.5rem;
    user-select: none;

  }
  .reviews__user {
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .reviews__text {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    font-style: italic;
    font-weight: 400;
  }
  .reviews__rating {
    margin-top: auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .reviews__star {
    height: 2rem;
    width: 2rem;
    margin-right: 1px;
  }
  .reviews__star--active {
    fill: #55c57a;
  }
  .reviews__star--inactive {
    fill: #bbb;
  }
  /* Media queries for mobile and tablet  CARD REVIEW*/
  @media only screen and (max-width: 50em) {
    .reviews {
      padding: 5rem 0;
      display: grid;
      grid-column-gap: 5rem;
      grid-auto-flow: column;
      overflow-x: scroll;
      -ms-scroll-snap-type: x mandatory;
      scroll-snap-type: x mandatory;
    }
    .reviews__card {
      width: 20rem;
      padding: 1.2rem;
      -webkit-box-shadow: 0 5rem 4rem rgba(0, 0, 0, 0.15);
      box-shadow: 2px 1rem 2rem rgba(0, 0, 0, 0.15);
      scroll-snap-align: center;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
    
    .reviews:before,
    .reviews:after {
      content: '';
      width: 2rem;
    }
    .reviews__avatar {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-bottom: 2rem;
    }
    .reviews__avatar-img {
      border-radius: 50%;
      z-index: 10;
      border: 2px solid #e299c97c;
      box-shadow: 1px 2px 20px -5px #000000e2;
      user-select: none;
    }
    .reviews__user {
      font-size: 1.5rem;
      font-weight: 700;
      text-transform: uppercase;
    }
    .reviews__text {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      font-style: italic;
      font-weight: 400;
    }
  }

  /* cta Book Your Ticket */
  .section-cta {
    margin-top: calc(0px - var(--section-rotate));
    padding: 3rem;
    padding-bottom: 11rem;
    padding-top: calc(15rem + var(--section-rotate));
  }
  .cta {
    position: relative;
    max-width: 80rem;
    margin: 0 auto;
    overflow: hidden;
    padding: 6rem 2rem;
    -webkit-box-shadow: 0 3rem 8rem 0.5rem rgba(0, 0, 0, 0.15);
    box-shadow: 0 3rem 8rem 0.5rem rgba(0, 0, 0, 0.15);
  }
  .cta__img {
    height: 12rem;
    width: 12rem;
    position: absolute;
    left: 0;
    top: 50%;
    border-radius: 50%;
    -webkit-box-shadow: 1rem 0.5rem 3rem rgba(0, 0, 0, 0.15);
    box-shadow: 1rem 0.5rem 3rem rgba(0, 0, 0, 0.15);
    user-select: none;
  }
  .cta__img--logo {
    padding: 2rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    background: -webkit-gradient(
      linear,
      left top,
      right bottom,
      from(#7dd56f),
      to(#28b487)
    );
    background: linear-gradient(to right bottom, #7dd56f, #28b487);
    z-index: 10;
    -webkit-transform: translate(-35%, -50%);
    transform: translate(-35%, -50%);
    user-select: none;
  }
  .cta__img--logo img {
    width: 100%;
    user-select: none;
  }
  .cta__img--1 {
    -webkit-transform: translate(-10%, -50%) scale(0.97);
    transform: translate(-10%, -50%) scale(0.97);
    z-index: 9;
    user-select: none;
  }
  .cta__img--2 {
    -webkit-transform: translate(15%, -50%) scale(0.94);
    transform: translate(15%, -50%) scale(0.94);
    z-index: 8;
    user-select: none;
  }
  .cta__content {
    display: flex;
    padding-left: 13rem;    
    grid-gap: 0.5rem;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 1.6rem !important;
  }


  /* Media queries for mobile and tablet  CTA Book Your Ticket*/
  @media only screen and (max-width: 50em) {
    .section-cta {
      margin-top: calc(0px - var(--section-rotate));
      padding: .5rem;
      padding-bottom: 11rem;
      padding-top: calc(15rem + var(--section-rotate));
    }
    .cta {
      display: grid;
      position: relative;
      max-width: 100rem;
      margin: 0 auto;
      overflow: hidden;
      padding: .7rem;
      -webkit-box-shadow: 0 3rem 8rem 0.5rem rgba(0, 0, 0, 0.15);
      box-shadow: 0 3rem 8rem 0.5rem rgba(0, 0, 0, 0.15);
    }
    .cta__img {
      height: 7rem;
      width: 7rem;
      position: absolute;
      left: 0;
      top: 18%;
      border-radius: 50%;
      -webkit-box-shadow: 1rem 0.5rem 3rem rgba(0, 0, 0, 0.15);
      box-shadow: 1rem 0.5rem 3rem rgba(0, 0, 0, 0.15);
      user-select: none;
    }
    .cta__img--logo {
      padding: .5rem;
      width: 5rem;
      height: 5rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      background: -webkit-gradient(
        linear,
        left top,
        right bottom,
        from(#7dd56f),
        to(#28b487)
      );
      background: linear-gradient(to right bottom, #7dd56f, #28b487);
      z-index: 10;
      -webkit-transform: translate(-35%, -50%);
      transform: translate(-40%, -50%);
      user-select: none;
    }

    .cta__img--logo img {
      width: 100%;
      user-select: none;
    }
    .cta__img--1 {
      -webkit-transform: translate(-10%, -50%) scale(0.97);
      transform: translate(-15%, -50%) scale(0.97);
      z-index: 7;
      user-select: none;
      height: 5rem;
      width: 5rem;
    }
    .cta__img--2 {
      -webkit-transform: translate(15%, -50%) scale(0.94);
      transform: translate(5%, -50%) scale(0.97);
      z-index: 5;
      user-select: none;
      height: 5rem;
      width: 5rem;
    }
    .cta__content {
      display: grid;
      grid-template-rows: 1fr 1fr 1fr auto;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      grid-gap: .7rem;
      grid-auto-flow: row;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
    .cra__header{
      grid-row: 1/2;
      grid-column: 2/6;
    }
    .cta__text {
      font-size: 1.7rem;
      font-weight: 200;
      grid-row: 2/4;
      grid-column: 1/6;
    }
    .cta__btn{
      grid-row: 4;
      grid-column: 2/5;
    }
  }

  .footer {
    /*background-color: #f7f7f7;*/
    padding: 6rem 4rem 3rem 4rem;
    font-size: 1.4rem;
    display: grid;
    grid-template-columns: auto auto;
    grid-row-gap: 0.75rem;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }

  /* Media queries for mobile and tablet  FOOTER*/
  @media only screen and (max-width: 50em) {
    .footer {
      grid-template-columns: 1fr;
      grid-row-gap: 1.25rem;
      justify-items: center;
    }
    .footer__logo {
      grid-row: 1;
    }
    .footer__copyright {
      justify-self: center;
    }
    .heading-primary span {
    padding: .5rem 1rem;
    line-height: 2.2;
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
    background-image: -webkit-gradient(
        linear,
        left top,
        right bottom,
        from(rgba(125, 213, 111, 0.85)),
        to(rgba(40, 180, 135, 0.85))
      );
      background-image: linear-gradient(
        to bottom right,
        rgba(125, 213, 111, 0.85),
        rgba(40, 180, 135, 0.85)
      );
    }
    .heading-primary {
      font-size: 1.2rem;
      text-align: center;
      width: 100%;
      margin: 0 auto;
    }
  }
  .footer__logo {
    grid-row: 1 / 3;
    -ms-flex-item-align: center;
    align-self: center;
  }
 
  .footer__logo img {
    height: 3rem;
    user-select: none;
  }
  .footer__nav {
    list-style: none;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
  .footer__nav li {
    margin-left: 1.5rem;
  }
  .footer__nav a {
    /*color: #777;*/
    text-decoration: none !important;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }
  .footer__nav a:hover,
  .footer__nav a:active {
    color: #55c57a;
  }
  .footer__copyright {
    justify-self: end;
    color: #999;
  }
  .nav {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }  
</style>