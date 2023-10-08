<template>
  <v-card class="mx-auto" max-width="1440" style="background: black;">
    <div class="mainCard" :style="'padding-left: 61px; padding-right: 61px;'"> 
        <layout-header />
        <info-panel />
        <main-panel />
    </div>
    <layout-footer /> 
  </v-card>
</template>

<script setup lang="ts">
  
  import LayoutHeader from "./components/LayoutHeader1.vue";
  import MainPanel from './components/MainPanel1.vue';
  import InfoPanel from './components/InfoPanel1.vue';
  import LayoutFooter from './components/LayoutFooter1.vue';

  import { ref, onBeforeMount, computed, onMounted, watch } from "vue";
  import { useDisplay } from "vuetify";
  import { useAppStore } from "./store/store";
  
  const appStore = useAppStore();

  const {name} = useDisplay();

  // console.log(appStore.isSmall);
  // console.log(appStore.isMobile);
  
  watch(name, (newVal) => {
    console.log(newVal);
    isMobile(newVal);
  })

  const isMobile=(dispMode: string)=> {
    if (dispMode == "md" || dispMode=="sm") {
      appStore.isSmall = true;
      appStore.isMobile=false;
      console.log(appStore.isSmall);
      console.log(appStore.isMobile);
    } else if (dispMode=="xs") {
      appStore.isSmall = true;
      appStore.isMobile = true;
      console.log(appStore.isSmall);
      console.log(appStore.isMobile);
    } else {
      appStore.isSmall=false;
      appStore.isMobile=false;
      console.log(appStore.isSmall);
      console.log(appStore.isMobile);
    }
  }

</script>

<style>
  .mainCard {
    padding-left: 61px;
    padding-right: 61px;
    padding-bottom: 30px;
  }
  .font-regular {
    font-family: "Aeonik-Regular" !important;
    letter-spacing: 0.7px !important;
  }

  .font-light {
    font-family: "Aeonik-Light" !important;
    letter-spacing: 0.7px !important;
  }

  .font-bold {
    font-family: "Aeonik-Bold" !important;
    letter-spacing: 0.7px !important;
  }

  .text-white {
    color: white !important;
  }

  .text-red {
    color: red !important;
  }

  .text-black {
    color: black !important;
  }
  
  .text-green {
    color: #00c798 !important;
  }

  .text-collateral {
    color: #B5DF77 !important;
  }

  .text-weight-700 {
    font-weight: 700 !important;
  }

  .text-weight-400 {
    font-weight: 400 !important;
  }

  .text-weight-300 {
    font-weight: 300 !important;
  }

  .text-size-40px {
    font-size: 40px !important;
  }

  .text-size-35px {
    font-size: 35px !important;
  }

  .text-size-32px {
    font-size: 32px !important;
  }

  .text-size-25px {
    font-size: 25px !important;
  }

  .text-size-22px {
    font-size: 22px !important;
  }

  .text-size-18px {
    font-size: 18px !important;
  }

  .text-size-17px {
    font-size: 17px !important;
  }

  .text-size-16px {
    font-size: 16px !important;
  }

  .text-size-15px {
    font-size: 15px !important;
  }

  .text-size-14px {
    font-size: 14px !important;
  }
  @font-face {
  font-family: "Aeonik-Bold";
  src: url(./assets/fonts/Aeonik-Bold-Web/Aeonik-Bold.woff) format("woff");
  }

  @font-face {
    font-family: "Aeonik-Light";
    src: url(./assets/fonts/Aeonik-Light-Web/Aeonik-Light.woff) format("woff");
  }

  @font-face {
    font-family: "Aeonik-Regular";
    src: url(./assets/fonts/Aeonik-Regular-Web/Aeonik-Regular.woff2) format("woff2");
  }
</style>

