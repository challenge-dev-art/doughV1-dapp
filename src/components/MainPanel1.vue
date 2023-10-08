<template>
    <v-row class="mainPanel">
      <v-col :cols="appStore.isSmall ? 12 : 6" style="padding: 0px;">
        <view-supply />
        <asset-supply />
      </v-col>
      <v-col :cols="appStore.isSmall ? 12 : 6" style="padding: 0px;">
        <view-borrow />
        <asset-borrow />
      </v-col>
    </v-row>
</template>

<script setup lang="ts">
  
  import viewSupply from "./viewSupply.vue";
  import viewBorrow from "./viewBorrow.vue";
  import assetSupply from "./assetSupply.vue";
  import assetBorrow from "./assetBorrow.vue";

  import { useAppStore } from "../store/store";

  const appStore=useAppStore();

  
</script>

<style>
  .mainPanel {
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-top: 16px !important;
    margin-bottom: 0px !important;
  }
</style>