<template>
  <v-card class="mx-auto" max-width="1440" style="background: black;">
    <div class="mainCard"
      :style="appStore.isMobile ? 'padding-left:27px; padding-right: 27px;' : 'padding-left:40px; padding-right: 57px;'">
      <layout-header />
      <!-- <LayoutHeader /> -->
      <v-row class="mainDiv" no-gutters>
        <v-col :cols="appStore.isMobile ? 12 : 8" style="padding: 0px;">
          <v-card class="mainPanel" max-width="995" style="background: black;">
            <main-panel />
          </v-card>
        </v-col>
        <v-col :cols="appStore.isMobile ? 12 : 4" style="padding: 0px;">
          <v-card style="background: black;">
            <info-panel />
          </v-card>
        </v-col>
      </v-row>
      <v-row no-gutters class="pa-0 ma-0">
        <v-col :cols="appStore.isMobile ? 12 : 8" class="ma-0 pa-0">
          <market-news />
        </v-col>
      </v-row>
      <router-view></router-view>
      <vd-board v-if="connectorsCreated" :connectors="connectors" dark :autoConnectErrorHandler="autoConnectErrorHandler"
        :connectErrorHandler="connectErrorHandler" style="z-index: 10;" />
      <connect-wallet />
      <create-dsa />
    </div>
    <layout-footer />
  </v-card>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed, onMounted, watch } from "vue";
import { useDisplay } from "vuetify";
import { useAppStore } from "./store/store";
const appStore = useAppStore();

import LayoutHeader from "./components/LayoutHeader.vue";
import LayoutFooter from "./components/LayoutFooter.vue";
import MainPanel from "./components/MainPanel.vue";
import InfoPanel from "./components/InfoPanel.vue";
import ConnectWallet from "./components/ConnectWallet.vue"
import CreateDsa from "./components/CreateDsa.vue"
import MarketNews from "./components/MarketNews.vue"

import {
  MetaMaskConnector,
  WalletConnectConnector,
  CoinbaseWalletConnector,
  SafeConnector,
  Connector,
} from "vue-dapp";

const { name } = useDisplay();
watch(name, (newVal) => {
  isMobile(newVal);
})
function isMobile(dispMode: string) {
  if (dispMode == "xs" || dispMode == "sm") {
    appStore.isMobile = true;
  } else {
    appStore.isMobile = false;
  }
}

let connectors: Connector[] = [
  new MetaMaskConnector({
    appUrl: "http://localhost:3000",
  }),
  new CoinbaseWalletConnector({
    appName: "Vue Dapp",
    jsonRpcUrl: `https://mainnet.flagscan.io`,
  }),
];

const connectorsCreated = ref(false);

onBeforeMount(async () => {
  const safe = new SafeConnector();

  try {
    if (await safe.isSafeApp()) {
      connectors = [safe];
    }
  } catch (err: any) {
    console.error(err);
  }

  connectorsCreated.value = true;

  isMobile(name.value);
});

onMounted(async () => {
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    // preloader.style.opacity = 0.95;
    // await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));
    for (let i = 0.9; i > 0; i -= 0.1) {
      await new Promise<void>((resolve) => setTimeout(() => resolve(), 50));
      preloader.style.opacity = i;
    }
    preloader.style.display = 'none';
  }

  document.body.style.overflow = 'auto';
  // console.log("auto ok")

  isMobile(name.value);
})

const autoConnectErrorHandler = (err: any) => {
  console.error(err);
};

const connectErrorHandler = (err: any) => {
  console.error(err);
};
</script>

<style>
body {
  background: black;
  font-family: "Aeonik-Regular" !important;
}

.mainCard {
  background: black !important;
  border-radius: unset !important;
}

.mainDiv {
  margin: 0px !important;
}

.mainPanel {
  padding: 0px !important;
}

.clsDialog {
  border: solid !important;
  border-color: #00C797 !important;
  border-width: 1px !important;
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

/* @font-face {
  font-family: "AeonikProTRIAL-Bold";
  src: local("AeonikProTRIAL-Bold"),
    url(./assets/fonts/AeonikProTRIAL-Bold.otf) format("truetype");
}

@font-face {
  font-family: "AeonikProTRIAL-Light";
  src: local("AeonikProTRIAL-Light"),
    url(./assets/fonts/AeonikProTRIAL-Light.otf) format("truetype");
}

@font-face {
  font-family: "AeonikProTRIAL-Regular";
  src: local("AeonikProTRIAL-Regular"),
    url(./assets/fonts/AeonikProTRIAL-Regular.otf) format("truetype");
} */
</style>
