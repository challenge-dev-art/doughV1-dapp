<template>
  <div>
    <v-row class="appFooter" align="center">
      <v-col cols="4" style="text-align: center; padding-top: 0px; padding-bottom: 0px">
        <p class="font-light text-white text-weight-400 text-size-18px">Our Policy</p>
      </v-col>
      <v-col cols="4" style="text-align: center; padding-top: 0px; padding-bottom: 0px">
        <p class="font-light text-white text-weight-400 text-size-18px">All rights reserved Dough | 2023</p>
      </v-col>
      <v-col cols="4" style="text-align: center; padding-top: 0px; padding-bottom: 0px">
        <a href="#">
          <iconTwitter />
        </a>
        <a href="#" class="ml-3">
          <iconTeleram />
        </a>
        <a href="#" class="ml-3">
          <iconDiscord />
        </a>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
  import iconTwitter from "../assets/twitter.svg"
  import iconTeleram from "../assets/telegram.svg"
  import iconDiscord from "../assets/discord.svg"
</script>

<style scoped>
  .appFooter {
    height: 55px !important;
    margin: 0px !important;
    background: rgba(250, 250, 250, 0.12);
    flex-shrink: 0;
    padding-top: 14px;
    padding-bottom: 14px;
  }
  v-col {
    padding-top: 0Px !important;
    padding-bottom: 0px !important;
  }
</style>