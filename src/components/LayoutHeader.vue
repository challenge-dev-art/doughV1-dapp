<template>
  <!-- <v-btn @click="testFunc">Test</v-btn> -->
  <div>
    <v-row :class="appStore.isMobile ? 'appHeaderMobile align-center' : 'appHeader align-center'">
      <router-link to="/">
        <!-- logo -->
        <v-img :width="appStore.isMobile ? 72 : 116" :height="appStore.isMobile ? 16 : 23" :src="LogoDough"
          @click="appStore.closeAllDlg"></v-img>
      </router-link>
      <v-spacer></v-spacer>
      <router-link v-if="!appStore.isMobile" to="/" class="linkEducations font-regular text-weight-400 text-size-16px">
        Education
      </router-link>
      <div v-if="!appStore.isMobile" class="linkDocs font-regular text-weight-400 text-size-16px">
        <a :href="appStore.doc_url" target="_blank" style="text-decoration: none; color: white;">Docs</a>
      </div>
      <chain-menu v-if="!appStore.isMobile" />
      <div v-if="!appStore.isMobile" style="width: 25px;"></div>
      <div v-if="isActivated">
        <v-btn variant="tonal" @click="disconnect" :disabled="!appStore.dlgSwapEnable"
          :class="appStore.isMobile ? 'text-none btnWalletMobile' : 'text-none btnWallet'">Disconnect</v-btn>
      </div>
      <v-btn v-if="!isActivated" :class="appStore.isMobile ? 'text-none btnWalletMobile' : 'text-none btnWallet'"
        variant="tonal" @click="open()" :disabled="wallet.status === 'connecting' || (!appStore.dlgSwapEnable)">
        {{
          wallet.status === "connecting"
          ? "Connecting..."
          : wallet.status === "loading"
            ? "Loading..."
            : "Wallet"
        }}
      </v-btn>
      <v-dialog v-if="appStore.isMobile" v-model="dialogMenu" fullscreen transition="fade-transition" style="z-index: 8;">
        <template v-slot:activator="{ props }">
          <v-btn icon variant="plain" v-bind="props" :disabled="!appStore.dlgSwapEnable">
            <v-icon>menu</v-icon>
          </v-btn>
        </template>
        <v-card style="background: black; padding-left:27px; padding-right: 27px; padding-top: 0px; padding-bottom: 0px;">
          <div class="appHeaderMobile align-center d-flex">
            <router-link to="/">
              <!-- logo -->
              <v-img width="72" height="16" :src="LogoDough" @click="appStore.closeAllDlg"></v-img>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialogMenu = false">
              <v-icon>close</v-icon>
            </v-btn>
          </div>
          <v-card-text style="padding-left: 29px; padding-right: 29px;">
            <v-row>
              <v-spacer></v-spacer>
              <chain-menu />
              <v-spacer></v-spacer>
            </v-row>
            <v-row style="margin-top: 20px;">
              <a :href="appStore.doc_url" target="_blank" style="width: 100% !important;">
                <v-btn class="text-none font-regular text-white text-weight-400 text-size-17px" width="100%"
                  variant="text">
                  Docs
                </v-btn>
              </a>
            </v-row>
            <v-row style="margin-top: 20px;">
              <a :href="appStore.doc_url" style="width: 100% !important;">
                <v-btn class="text-none font-regular text-white text-weight-400 text-size-17px" width="100%"
                  variant="text">
                  Education
                </v-btn>
              </a>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-divider></v-divider>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-spacer></v-spacer>
              <getstarted-dialog />
              <v-spacer></v-spacer>
            </v-row>
            <v-row style="margin-top: 30px;">
              <v-divider></v-divider>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-btn class="text-none font-regular text-white text-weight-400 text-size-17px" width="100%" variant="text"
                @click="actionDeposit">
                Deposit
              </v-btn>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-btn class="text-none font-regular text-white text-weight-400 text-size-17px" width="100%" variant="text"
                @click="actionBorrowRepay">
                Borrow / Repay
              </v-btn>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-btn class="text-none font-regular text-white text-weight-400 text-size-17px" width="100%" variant="text"
                @click="actionLoop">
                Loop
              </v-btn>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-btn class="text-none font-regular text-white text-weight-400 text-size-17px" width="100%" variant="text"
                @click="actionSwap">
                Swap
              </v-btn>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-btn class="text-none font-regular text-white text-weight-400 text-size-17px" width="100%" variant="text"
                @click="actionShield">
                Shield
              </v-btn>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-btn class="text-none font-regular text-white text-weight-400 text-size-17px" width="100%" variant="text"
                @click="actionWithdraw">
                Withdraw
              </v-btn>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-btn class="text-none font-regular text-white text-weight-400 text-size-17px" width="100%" variant="text"
                @click="actionSupply">
                Supply
              </v-btn>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-divider></v-divider>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-btn class="text-none font-regular text-white text-weight-400 text-size-17px" width="100%" variant="text">
                View All History
              </v-btn>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-divider></v-divider>
            </v-row>
            <v-row style="margin-top: 20px;">
              <v-spacer></v-spacer>
              <a href="#">
                <iconTwitter />
              </a>
              <a href="#" class="ml-3">
                <iconTeleram />
              </a>
              <a href="#" class="ml-3">
                <iconDiscord />
              </a>
              <v-spacer></v-spacer>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script setup lang="ts">
 
import { ref, onMounted, watch, computed } from "vue";

import ChainMenu from '../components/ChainMenu.vue'
import GetstartedDialog from "./GetstartedDialog.vue";
import LogoDough from '../assets/logo_dough.png'

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import iconTwitter from "../assets/twitter.svg"
import iconTeleram from "../assets/telegram.svg"
import iconDiscord from "../assets/discord.svg"

import {
  useBoard,
  useEthers,
  useWallet,
  displayEther,
  shortenAddress,
} from "vue-dapp";

const { open } = useBoard();
const { address, balance, isActivated, chainId } = useEthers();
const { disconnect, wallet } = useWallet();

// async function testFunc() {
//   await appStore.getDsaAddress(address.value, wallet.provider);
//   await appStore.getPriceFromBinance();
//   await appStore.getAaveOraclePrices(wallet.provider);
//   await appStore.getDsaAssets(wallet.provider);
//   await appStore.getWalletAssets(address.value, wallet.provider);
//   await appStore.getAaveV3Positions("0x8c3A9FA35461E835aEF198b8EF164B36198C5fF3", wallet.provider);
//   await appStore.getAaveV3UserInfo("0x8c3A9FA35461E835aEF198b8EF164B36198C5fF3", wallet.provider);
//   await appStore.getAaveV3GetReserveData(wallet.provider);
//   await appStore.getShieldInfo(wallet.provider);
// }

watch(address, async (newAddress) => {
  appStore.walletAddress = newAddress;
  if (newAddress != '') {
    appStore.initVariables();
    await appStore.getDsaAddress(newAddress, wallet.provider);
    await appStore.getPriceFromBinance();
    await appStore.getAaveOraclePrices(wallet.provider);
    await appStore.getDsaAssets(wallet.provider);
    await appStore.getWalletAssets(newAddress, wallet.provider);
    await appStore.getAaveV3Positions(appStore.dsa_address, wallet.provider);
    await appStore.getAaveV3UserInfo(appStore.dsa_address, wallet.provider);
  } else {
    appStore.dsa_address = '';
    appStore.initVariables();
  }
})
watch(chainId, (newVal) => {
  appStore.chainId = newVal;
  appStore.getDsaAddress(address.value, wallet.provider);
})
watch(isActivated, (newVal) => {
  appStore.walletIsActive = newVal;
})
watch(wallet, (newVal) => {
  appStore.wallet = newVal;
})

onMounted(async () => {
  appStore.walletAddress = address.value;
  appStore.walletIsActive = isActivated.value;
  appStore.chainId = chainId.value;
  appStore.wallet = wallet;

  await appStore.getPriceFromBinance();
})

const dialogMenu = ref(false);

function actionDeposit() {
  dialogMenu.value = false;
  appStore.actionDeposit();
}

function actionBorrowRepay() {
  dialogMenu.value = false;
  appStore.actionBorrowRepay();
}

function actionLoop() {
  dialogMenu.value = false;
  appStore.actionLoop();
}

function actionSwap() {
  dialogMenu.value = false;
  appStore.actionSwap();
}

function actionShield() {
  dialogMenu.value = false;
  // appStore.actionShield();
}

function actionWithdraw() {
  dialogMenu.value = false;
  appStore.actionWithdrawDsa();
}

function actionSupply() {
  dialogMenu.value = false;
  appStore.actionSupply();
}


</script>

<style>
.appHeader {
  margin: 0px !important;
  padding-left: 58px;
  padding-right: 0px;
  padding-top: 58px;
  padding-bottom: 0px;
}

.appHeaderMobile {
  margin: 0px !important;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 32px;
  padding-bottom: 0px;
}

.logoDough {
  margin-left: 17px;
  margin-top: 14px;
}

.linkEducations {
  color: #FFFFFF;
  text-decoration: none;
  margin-right: 31px;
}

.linkDocs {
  color: #FFFFFF;
  font-weight: 400 !important;
  font-size: 16px !important;
  text-decoration: none;
  margin-right: 34px;
}

.btnWallet {
  width: 139px !important;
  height: 52px !important;
  border-radius: 10px !important;
  background: white !important;
  color: black !important;
  font-family: "Aeonik-Regular" !important;
  font-weight: 400 !important;
  font-size: 16px !important;
}

.btnWalletMobile {
  width: 95px !important;
  height: 34px !important;
  border-radius: 5px !important;
  background: white !important;
  color: black !important;
  font-family: "Aeonik-Regular" !important;
  font-weight: 400 !important;
  font-size: 14px !important;
}
</style>