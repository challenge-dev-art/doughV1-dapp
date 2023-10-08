<template>
  <div>
    <!-- Banner Image -->
    <img
      :style="appStore.isMobile ? 'width: 100%; margin-top: 16px; padding-left: 0px; padding-right: 0px;' : 'width: 100%; margin-top: 54px; padding-left: 40px; padding-right: 20px;'"
      :src="appStore.isMobile ? BannerDoughMobile : BannerDough" />

    <!-- Welcome panel - Desktop -->
    <v-alert v-if="!appStore.isMobile" v-model="alert" class="alertWelcome" closable>
      <p class="font-bold text-white text-weight-700 text-size-22px" style="margin-top: 7px;">
        Welcome to Dough Finance
      </p>
      <p class="font-light text-white text-weight-400 text-size-18px mt-2">
        Thank you for joining, start exploring a world of limitless
        <br />
        opportunities and unlock your true potential.
        <br />
      </p>
      <getstarted-dialog />
      <img style="position: absolute; right: 0; bottom: 0" :src="GetStarted" />
    </v-alert>
    <!-- Welcome panel - Mobile -->
    <div v-if="appStore.isMobile">
      <p class="font-bold text-white text-weight-700 text-size-40px" style="padding-left: 15px;">Dough Finance</p>
      <p class="font-light text-white text-weight-400 text-size-17px" style="padding-left: 15px;">
        Start exploring a world of limitless<br />opportunities and potential.
      </p>
      <getstarted-dialog style="display: none;" />
      <hr style="margin-top: 37px; background: #1E1E1E; height: 1px;border: none;" />
    </div>
    <!-- Total Balance Panel -->
    <v-container :class="appStore.isMobile ? 'totalBalanceMobile' : 'totalBalance'">
      <p v-if="!appStore.isMobile" class="font-regular text-white text-size-22px text-weight-700">Total Balance</p>
      <p v-if="appStore.isMobile" class="font-regular text-white text-size-17px text-weight-700">Total Balance</p>
      <p v-if="!appStore.isMobile" class="font-bold text-size-35px text-weight-700" style="color: #00c797">${{
        parseFloat(total_usd_balance.toFixed(2)) }}</p>
      <p v-if="appStore.isMobile" class="font-bold text-size-32px text-weight-700" style="color: #00c797">${{
        parseFloat(total_usd_balance.toFixed(2)) }}</p>
    </v-container>
    <v-container :class="appStore.isMobile ? 'balanceRowOfMainPanelMobile' : 'balanceRowOfMainPanel'">
      <!-- Aave Balance Panel - Desktop -->
      <v-row v-if="!appStore.isMobile" no-gutters>
        <!-- USDC -->
        <v-col cols="4">
          <v-sheet class="walletBalance">
            <img :src="IconUSDC" style="width: 57px; height: 57px; margin-bottom: 35px;" />
            <br />
            <p class="font-light text-white text-size-18px text-weight-400">USDC</p>
            <p class="tokenValue" style="color: #00c797;">
              ${{ parseFloat((appStore.aaveV3Usdc_supply * appStore.price_usdc_aave).toFixed(2)) }}
            </p>
            <p class="tokenValue" style="color: white;">
              ${{ parseFloat((appStore.aaveV3Usdc_borrow * appStore.price_usdc_aave).toFixed(2)) }}
            </p>
          </v-sheet>
        </v-col>
        <!-- Ethereum -->
        <v-col cols="4">
          <v-sheet class="walletBalance">
            <img :src="IconETH" style="width: 35px; height: 57px; margin-bottom: 35px;" />
            <br />
            <p class="font-light text-white text-size-18px text-weight-400">ETH</p>
            <p class="tokenValue" style="color: #00c797;">
              ${{ parseFloat((appStore.aaveV3Weth_supply * appStore.price_eth_aave).toFixed(2)) }}
            </p>
            <p class="tokenValue" style="color: white;">
              ${{ parseFloat((appStore.aaveV3Weth_borrow * appStore.price_eth_aave).toFixed(2)) }}
            </p>
          </v-sheet>
        </v-col>
        <!-- Bitcoin -->
        <v-col cols="4">
          <v-sheet class="walletBalance">
            <img :src="IconBTC" style="width: 43px; height: 57px; margin-bottom: 35px;" />
            <br />
            <p class="font-light text-white text-size-18px text-weight-400">BTC</p>
            <p class="tokenValue" style="color: #00c797;">
              ${{ parseFloat((appStore.aaveV3Wbtc_supply * appStore.price_btc_aave).toFixed(2)) }}
            </p>
            <p class="tokenValue" style="color: white;">
              ${{ parseFloat((appStore.aaveV3Wbtc_borrow * appStore.price_btc_aave).toFixed(2)) }}
            </p>
          </v-sheet>
        </v-col>
      </v-row>
      <!-- Aave Balance Panel - Mobile -->
      <div v-if="appStore.isMobile">
        <!-- USDC -->
        <v-row no-gutters class="walletBalanceMobile align-center" style="margin-top: 14px !important;">
          <div align-self="center" class="d-flex align-center">
            <v-img width="34" height="34" :src="IconUSDC"></v-img>
            <div style="padding-left: 10px;">
              <p class="font-regular text-white text-weight-700 text-size-17px">USD Coin</p>
            </div>
          </div>
          <v-spacer></v-spacer>
          <div align-self="center" style="text-align: end;">
            <p class="font-regular text-white text-weight-400 text-size-17px">
              ${{ parseFloat((appStore.aaveV3Usdc_supply * appStore.price_usdc_aave).toFixed(2)) }}
            </p>
            <p class="font-regular text-white text-weight-400 text-size-17px">
              ${{ parseFloat((appStore.aaveV3Usdc_borrow * appStore.price_usdc_aave).toFixed(2)) }}
            </p>
          </div>
        </v-row>
        <!-- Ethereum -->
        <v-row no-gutters class="walletBalanceMobile align-center" style="margin-top: 14px !important;">
          <div align-self="center" class="d-flex align-center">
            <v-img width="34" height="34" :src="IconETH"></v-img>
            <div style="padding-left: 10px;">
              <p class="font-regular text-white text-weight-700 text-size-17px">Ethereum</p>
            </div>
          </div>
          <v-spacer></v-spacer>
          <div align-self="center" style="text-align: end;">
            <p class="font-regular text-white text-weight-400 text-size-17px">
              ${{ parseFloat((appStore.aaveV3Weth_supply * appStore.price_eth_aave).toFixed(2)) }}
            </p>
            <p class="font-regular text-white text-weight-400 text-size-17px">
              ${{ parseFloat((appStore.aaveV3Weth_borrow * appStore.price_eth_aave).toFixed(2)) }}
            </p>
          </div>
        </v-row>
        <!-- Bitcoin -->
        <v-row no-gutters class="walletBalanceMobile align-center" style="margin-top: 14px !important;">
          <div align-self="center" class="d-flex align-center">
            <v-img width="34" height="34" :src="IconBTC"></v-img>
            <div style="padding-left: 10px;">
              <p class="font-regular text-white text-weight-700 text-size-17px">Bitcoin</p>
            </div>
          </div>
          <v-spacer></v-spacer>
          <div align-self="center" style="text-align: end;">
            <p class="font-regular text-white text-weight-400 text-size-17px">
              ${{ parseFloat((appStore.aaveV3Wbtc_supply * appStore.price_btc_aave).toFixed(2)) }}
            </p>
            <p class="font-regular text-white text-weight-400 text-size-17px">
              ${{ parseFloat((appStore.aaveV3Wbtc_borrow * appStore.price_btc_aave).toFixed(2)) }}
            </p>
          </div>
        </v-row>
      </div>
      <!-- Actions -->
      <p v-if="appStore.isMobile" class="font-regular text-white text-weight-700 text-size-17px"
        style="margin-top: 40px; margin-bottom: 10px; padding-left: 5px;">Actions</p>
      <div v-else style="width: 100%; height: 26px;"></div>
      <!-- Action - Desktop & Mobile  -->
      <v-row no-gutters :style="appStore.isMobile ? 'margin-left: -13px;' : ''">
        <v-col cols="4" :style="appStore.isMobile ? 'padding-left: 13px !important;' : 'padding-left: 26px !important;'">
          <v-btn :class="appStore.isMobile ? 'btnActionMobile text-none' : 'btnAction text-none'" stacked variant="text"
            @click="appStore.actionDeposit">
            <v-img :width="appStore.isMobile ? 34 : 51" :height="appStore.isMobile ? 35 : 53" :src="IconDeposit"></v-img>
            <div :style="appStore.isMobile ? 'height: 12px;' : 'height: 10px;'"></div>
            Deposit
          </v-btn>
          <deposit-dialog />
        </v-col>
        <v-col cols="4" :style="appStore.isMobile ? 'padding-left: 13px !important;' : 'padding-left: 26px !important;'">
          <v-btn :class="appStore.isMobile ? 'btnActionMobile text-none' : 'btnAction text-none'" stacked variant="text"
            @click="appStore.actionBorrowRepay">
            <v-img :width="appStore.isMobile ? 45 : 62" :height="appStore.isMobile ? 35 : 49" :src="IconBorrow"></v-img>
            <div :style="appStore.isMobile ? 'height: 5px;' : 'height: 18px;'"></div>
            Borrow / <br v-if="appStore.isMobile" />Repay
          </v-btn>
          <borrow-repay />
        </v-col>
        <v-col cols="4" :style="appStore.isMobile ? 'padding-left: 13px !important;' : 'padding-left: 26px !important;'">
          <v-btn :class="appStore.isMobile ? 'btnActionMobile text-none' : 'btnAction text-none'" stacked variant="text"
            @click="appStore.actionSupply">
            <v-img :width="appStore.isMobile ? 34 : 51" :height="appStore.isMobile ? 35 : 53" :src="IconDeposit"></v-img>
            <div :style="appStore.isMobile ? 'height: 12px;' : 'height: 10px;'"></div>
            Supply
          </v-btn>
          <supply-dialog />
        </v-col>
      </v-row>
      <v-row no-gutters :style="appStore.isMobile ? 'margin-left: -13px; margin-top: 13px;' : 'margin-top: 26px;'">
        <v-col cols="4" :style="appStore.isMobile ? 'padding-left: 13px !important;' : 'padding-left: 26px !important;'">
          <v-btn :class="appStore.isMobile ? 'btnActionMobile text-none' : 'btnAction text-none'" stacked variant="text"
            @click="appStore.actionWithdrawDsa">
            <v-img :width="appStore.isMobile ? 34 : 47" :height="appStore.isMobile ? 35 : 48" :src="IconWithdraw"></v-img>
            <div :style="appStore.isMobile ? 'height: 15px;' : 'height: 7px;'"></div>
            Withdraw
          </v-btn>
          <withdraw-dsa-dialog />
        </v-col>
        <v-col cols="4" :style="appStore.isMobile ? 'padding-left: 13px !important;' : 'padding-left: 26px !important;'">
          <v-btn :class="appStore.isMobile ? 'btnActionMobile text-none' : 'btnAction text-none'" stacked variant="text"
            @click="appStore.actionLoop">
            <v-img :width="appStore.isMobile ? 62 : 76" :height="appStore.isMobile ? 42 : 51" :src="IconLoop"></v-img>
            <div :style="appStore.isMobile ? 'height: 6px;' : 'height: 10px;'"></div>
            Loop
          </v-btn>
          <loop-dialog />
        </v-col>
        <v-col cols="4" :style="appStore.isMobile ? 'padding-left: 13px !important;' : 'padding-left: 26px !important;'">
          <v-btn :class="appStore.isMobile ? 'btnActionMobile text-none' : 'btnAction text-none'" stacked variant="text"
            @click="appStore.actionWithdraw">
            <v-img :width="appStore.isMobile ? 34 : 51" :height="appStore.isMobile ? 35 : 53" :src="IconWithdraw"></v-img>
            <div :style="appStore.isMobile ? 'height: 12px;' : 'height: 10px;'"></div>
            Withdraw
          </v-btn>
          <withdraw-dialog />
        </v-col>
      </v-row>
      <v-row no-gutters :style="appStore.isMobile ? 'margin-left: -13px; margin-top: 13px;' : 'margin-top: 26px;'">
        <v-col cols="4" :style="appStore.isMobile ? 'padding-left: 13px !important;' : 'padding-left: 26px !important;'">
          <v-btn :class="appStore.isMobile ? 'btnActionMobile text-none' : 'btnAction text-none'" stacked variant="text"
            @click="appStore.actionSwap">
            <v-img :width="appStore.isMobile ? 75 : 111" :height="appStore.isMobile ? 46 : 68" :src="IconSwap"></v-img>
            <div :style="appStore.isMobile ? 'height: 5px;' : 'height: 2px;'"></div>
            Swap
          </v-btn>
          <swap-dialog />
        </v-col>
        <v-col cols="4" :style="appStore.isMobile ? 'padding-left: 13px !important;' : 'padding-left: 26px !important;'">
          <v-btn :class="appStore.isMobile ? 'btnActionMobile text-none' : 'btnAction text-none'" stacked variant="text"
            @click="appStore.actionDeloop">
            <v-img :width="appStore.isMobile ? 34 : 51" :height="appStore.isMobile ? 35 : 53" :src="IconWithdraw"></v-img>
            <div :style="appStore.isMobile ? 'height: 12px;' : 'height: 10px;'"></div>
            Deloop
          </v-btn>
          <deloop-dialog />
        </v-col>
        <v-col cols="4" :style="appStore.isMobile ? 'padding-left: 13px !important;' : 'padding-left: 26px !important;'">
          <v-btn :class="appStore.isMobile ? 'btnActionMobile text-none' : 'btnAction text-none'" stacked variant="text"
            @click="appStore.actionShield">
            <v-img :width="appStore.isMobile ? 32 : 45" :height="appStore.isMobile ? 35 : 49" :src="IconShield"></v-img>
            <div :style="appStore.isMobile ? 'height: 14px;' : 'height: 17px;'"></div>
            Shield
          </v-btn>
          <shield-dialog />
        </v-col>
      </v-row>
    </v-container>
    <!-- Learn -->
    <p v-if="!appStore.isMobile" class="font-bold text-white text-weight-700 text-size-22px"
      style="margin-top: 31px; margin-left: 55px; margin-bottom: 16px;">
      Learn About Investing
    </p>
    <v-container v-if="!appStore.isMobile" style="
      padding-left: 45px;
      padding-right: 0px;
      padding-top: 0px;
      padding-bottom: 0px;
    ">
      <v-row>
        <v-col>
          <v-sheet class="learnInvesting" style="position: relative; background: #00c797;">
            <a href="#" class="learnLink">{{ items[0].content }}</a>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="learnInvesting" style="position: relative; background: #b6bebc;">
            <a href="#" class="learnLink">{{ items[1].content }}</a>
          </v-sheet>
        </v-col>
        <v-col>
          <v-sheet class="learnInvesting" style="position: relative; background: #b5df77;">
            <a href="#" class="learnLink">{{ items[2].content }}</a>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>

    <p v-if="appStore.isMobile" class="font-bold text-white text-weight-700 text-size-17px"
      style="margin-top: 39px; margin-left: 4px; margin-bottom: 10px;">
      Learn About Investing
    </p>
    <v-sheet v-if="appStore.isMobile" style="background: black;">
      <v-slide-group>
        <v-slide-group-item key="1">
          <v-sheet class="learnInvestingMobile" style="position: relative; background: #00c797;">
            <a href="#" class="learnLinkMobile">{{ items[0].content }}</a>
          </v-sheet>
        </v-slide-group-item>
        <v-slide-group-item key="2">
          <v-sheet class="learnInvestingMobile" style="position: relative; background: #b5df77; margin-left: 15px;">
            <a href="#" class="learnLinkMobile">{{ items[1].content }}</a>
          </v-sheet>
        </v-slide-group-item>
        <v-slide-group-item key="3">
          <v-sheet class="learnInvestingMobile" style="position: relative; background: #b6bebc; margin-left: 15px;">
            <a href="#" class="learnLinkMobile">{{ items[2].content }}</a>
          </v-sheet>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";

import { useAppStore } from "../store/store";
const appStore = useAppStore();

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
import { useDisplay } from "vuetify";

import GetstartedDialog from "./GetstartedDialog.vue";
import DepositDialog from "./DepositDialog.vue";
import WithdrawDsaDialog from "./WithdrawDsaDialog.vue";
import SwapDialog from "./SwapDialog.vue";
import LoopDialog from "./LoopDialog.vue";
import DeloopDialog from "./DeloopDialog.vue";
import SupplyDialog from "./SupplyDialog.vue";
import WithdrawDialog from "./WithdrawDialog.vue";
import BorrowRepay from "./BorrowRepay.vue";
import ShieldDialog from "./ShieldDialog.vue"

import BannerDough from "../assets/banner.png";
import BannerDoughMobile from "../assets/bannerMobile.png";
import GetStarted from "../assets/mark.png";

import IconUSDC from "../assets/iUSDC.png";
import IconETH from "../assets/iETH.png";
import IconBTC from "../assets/iBTC.png";
import IconDeposit from "../assets/deposit.png";
import IconBorrow from "../assets/borrow.png";
import IconLoop from "../assets/loop.png";
import IconSwap from "../assets/swap.png";
import IconShield from "../assets/shield.png";
import IconWithdraw from "../assets/withdraw.png";

const items = [
  { id: "1", content: "Why invest?" },
  { id: "2", content: "Investing mythbusters" },
  { id: "3", content: "What is the stock market?" },
]

const total_usd_balance = computed(() => {
  // return (
  //   appStore.eth_usd_balance +
  //   appStore.usdc_usd_balance +
  //   appStore.btc_usd_balance
  // );
  return (
    appStore.aaveV3Usdc_supply * appStore.price_usdc_aave +
    appStore.aaveV3Weth_supply * appStore.price_eth_aave +
    appStore.aaveV3Wbtc_supply * appStore.price_btc_aave
  );
});

function getDsaInfo() {
  appStore.getDsaAssets(wallet.provider)
    .then(() => {
      appStore.getAaveV3UserInfo(appStore.dsa_address, wallet.provider)
        .then(() => {
          appStore.getAaveV3Positions(appStore.dsa_address, wallet.provider)
            .catch((error) => {
              console.log("MainPanel/getAaveV3Positions error: ", error);
            })
        })
        .catch((error) => {
          console.log("MainPanel/getAaveV3UserInfo error: ", error);
        })
    })
    .catch((error) => {
      console.log("MainPanel/getDsaAssets error: ", error);
    })
}

const reqTimer = ref();
onMounted(() => {
  getDsaInfo();
  reqTimer.value = setInterval(() => {
    getDsaInfo();
  }, 10000);
});

const alert = ref(true);
watch(address, (newAddress) => {
  alert.value = true;

  // if (newAddress != "") {
  //   appStore.getAssets(wallet.provider);
  //   appStore.getWalletAssets(newAddress, wallet.provider);
  // }
});
watch(chainId, () => {
  alert.value = true;
});

</script>

<style>
.alertWelcome {
  position: relative;
  padding-top: 18px !important;
  padding-left: 37px !important;
  padding-bottom: 43px !important;
  padding-right: 15px !important;
  margin-top: 94px;
  margin-left: 35px;
  margin-right: 0px;
  border-radius: 10px !important;
  background-image: linear-gradient(to bottom right,
      #00c797,
      #edfcd7) !important;
}

.btnGetStarted {
  width: 119px !important;
  height: 52px !important;
  border-radius: 10px !important;
  background: white !important;
  color: black !important;
  font-weight: 400 !important;
  font-size: 16px !important;
  text-decoration: none;
}

.totalBalance {
  width: 293px !important;
  /* height: 106px !important; */
  border-radius: 10px !important;
  margin-top: 33px;
  margin-left: 31px !important;
  padding-top: 18px !important;
  padding-left: 34px !important;
  background: #1e1e1e !important;
}

.totalBalanceMobile {
  margin-top: 34px;
  margin-left: 0px !important;
  padding-left: 4px !important;
  padding-bottom: 0px !important;
}

.balanceRowOfMainPanel {
  padding-left: 5px !important;
  padding-top: 17px !important;
  padding-right: 0px !important;
  padding-bottom: 0px !important;
}

.balanceRowOfMainPanelMobile {
  padding-left: 0px !important;
  padding-top: 0px !important;
  padding-right: 0px !important;
  padding-bottom: 0px !important;
}

.walletBalance {
  border-radius: 10px !important;
  padding-top: 27px;
  padding-left: 34px;
  padding-bottom: 39px;
  margin-top: 0px !important;
  margin-left: 26px !important;
  margin-right: 0px !important;
  margin-bottom: 0px !important;
  background: #1e1e1e !important;
  color: white !important;
  font-weight: 400 !important;
  font-size: 18px !important;
  text-decoration: none;
  letter-spacing: 1px;
}

.walletBalanceMobile {
  height: 83px;
  background: #1E1E1E;
  margin: 0px !important;
  padding-left: 17px !important;
  padding-right: 17px !important;
  border-radius: 6px !important;
  border-width: 1px !important;
}


.tokenValue {
  font-family: "Aeonik-Bold" !important;
  font-weight: 700 !important;
  font-size: 28px !important;
}

.btnAction {
  width: 100%;
  height: 122px !important;
  border-radius: 10px !important;
  background: #1e1e1e !important;
  color: white !important;
  font-family: "Aeonik-Light" !important;
  font-weight: 400 !important;
  font-size: 18px !important;
  letter-spacing: 1px !important;
}

.btnActionMobile {
  width: 100%;
  height: 100px !important;
  border-radius: 6px !important;
  background: #1e1e1e !important;
  color: white !important;
  font-family: "Aeonik-Light" !important;
  font-weight: 400 !important;
  font-size: 17px !important;
  letter-spacing: 1px !important;
}

.learnInvesting {
  height: 132px;
  border-radius: 10px !important;
  padding-left: 22px;
}

.learnInvestingMobile {
  height: 100px;
  width: 224px;
  border-radius: 10px !important;
  padding-left: 19px;
}

.learnLink {
  position: absolute;
  width: 130px;
  bottom: 32px;
  color: white !important;
  font-family: "Aeonik-Light";
  letter-spacing: 0.5px;
  font-weight: 400 !important;
  font-size: 18px !important;
  text-decoration: none;
}

.learnLinkMobile {
  position: absolute;
  width: 130px;
  bottom: 10px;
  color: white !important;
  font-family: "Aeonik-Light";
  letter-spacing: 0.5px;
  font-weight: 400 !important;
  font-size: 17px !important;
  text-decoration: none;
}

.newsRow {
  background: #1e1e1e;
  border-radius: 10px;
  padding-left: 36px !important;
  padding-right: 36px !important;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
}
</style>
