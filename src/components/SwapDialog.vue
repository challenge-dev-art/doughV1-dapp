<template>
  <!-- For Desktop -->
  <div v-if="!appStore.isMobile">
    <v-dialog v-model="appStore.dlgSwap" max-width="647" style="z-index: 2;">

      <v-card color="black" class="dialogSwap">
        <v-toolbar dark color="black">
          <v-spacer></v-spacer>
          <v-btn icon variant="plain" dark @click="appStore.dlgSwap = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>

        <!-- Title - Desktop & Mobile -->
        <v-card-title :class="appStore.isMobile ? 'd-flex align-center mx-auto' : 'd-flex align-center'"
          :style="appStore.isMobile ? 'margin-top: 43px;' : ''">
          <v-btn icon variant="plain" :style="appStore.isMobile ? '' : 'margin-left: 25px;'"
            @click="appStore.dlgSwap = false">
            <BackButton />
          </v-btn>
          <p class="font-bold text-white text-weight-700 text-size-22px">Swap</p>
        </v-card-title>

        <v-card-text class="pt-0 pb-0">
          <p class="font-regular text-white text-weight-400 text-size-18px" style="margin-left: 20px;">
            Collateral</p>
          <div style="text-align: center;">
            <v-container class="pt-0 pb-0">
              <!-- Swap Token From -->
              <v-row no-gutters class="rowSwap">
                <v-col>
                  <v-row no-gutters>
                    <v-col cols="2" style="text-align: start;">
                      <p class="font-regular text-white text-weight-400 text-size-16px">
                        From</p>
                    </v-col>
                    <v-col cols="10" style="text-align: end;">
                      <p class="font-regular text-white text-weight-400 text-size-16px">
                        Balance:
                        <v-btn variant="text" @click="amountSwapFrom = tokenBalanceFrom">
                          {{ tokenBalanceFrom }}
                        </v-btn>
                      </p>
                    </v-col>
                  </v-row>
                  <v-row no-gutters class="mt-3">
                    <v-col align-self="center" style="text-align: start; padding-right:20px;">
                      <input v-model="amountSwapFrom" type="number" @keypress="enterDetect" id="idSwapFromDlg"
                        name="nameSwapFromDlg" bg-color="#1E1E1E" color="#FFFFFF"
                        class="font-regular text-white text-size-25px text-weight-700" style="width: 100%;;">
                    </v-col>
                    <v-col align-self="center" cols="1">
                      <v-img v-if="selectedTokenFrom == 'usdc'" width="42" height="42" :src="TokenUsdc"></v-img>
                      <v-img v-if="selectedTokenFrom == 'eth'" width="42" height="42" :src="TokenEth"></v-img>
                      <v-img v-if="selectedTokenFrom == 'btc'" width="42" height="42" :src="TokenBtc"></v-img>
                    </v-col>
                    <v-col align-self="center" cols="3" style="text-align: start; padding-left:10px;">
                      <v-menu>
                        <template v-slot:activator="{ props }">
                          <v-btn variant="plain" v-bind="props" style="padding:0px;">
                            <p class="font-regular text-white text-weight-700 text-size-25px mr-1">
                              {{ selectedTokenFrom.toUpperCase() }}
                            </p>
                            <v-icon>expand_more</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item value="usdc">
                            <v-list-item-title @click="switchTokenFrom('usdc')">USDC</v-list-item-title>
                          </v-list-item>
                          <v-list-item value="eth">
                            <v-list-item-title @click="switchTokenFrom('eth')">ETH</v-list-item-title>
                          </v-list-item>
                          <v-list-item value="btc">
                            <v-list-item-title @click="switchTokenFrom('btc')">BTC</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-btn icon size="large" @click="reverseTokens" style="background: white; color: black; margin-top:-15px;">
                <ReverseButton />
              </v-btn>
              <!-- Swap Token To -->
              <v-row no-gutters class="rowSwap" style="margin-top: -15px;">
                <v-col>
                  <v-row no-gutters>
                    <v-col cols="2" style="text-align: start;">
                      <p class="font-regular text-white text-weight-400 text-size-16px">
                        To</p>
                    </v-col>
                    <v-col cols="10" style="text-align: end;">
                      <p class="font-regular text-white text-weight-400 text-size-16px">
                        Balance: {{ tokenBalanceTo }}
                      </p>
                    </v-col>
                  </v-row>
                  <v-row no-gutters class="mt-3">
                    <v-col align-self="center" style="text-align: start; padding-right:20px;">
                      <input v-model="amountSwapTo" type="number" @keypress="enterDetect" readonly id="idSwapToDlg"
                        name="nameSwapToDlg" bg-color="#1E1E1E" color="#FFFFFF"
                        class="font-regular text-white text-size-25px text-weight-700" style="width: 100%;;">
                    </v-col>
                    <v-col align-self="center" cols="1">
                      <v-img v-if="selectedTokenTo == 'usdc'" width="42" height="42" :src="TokenUsdc"></v-img>
                      <v-img v-if="selectedTokenTo == 'eth'" width="42" height="42" :src="TokenEth"></v-img>
                      <v-img v-if="selectedTokenTo == 'btc'" width="42" height="42" :src="TokenBtc"></v-img>
                    </v-col>
                    <v-col align-self="center" cols="3" style="text-align: start; padding-left: 10px;">
                      <v-menu>
                        <template v-slot:activator="{ props }">
                          <v-btn variant="plain" v-bind="props" style="padding: 0px;">
                            <p class="font-regular text-white text-weight-700 text-size-25px mr-2">
                              {{ selectedTokenTo.toUpperCase() }}
                            </p>
                            <v-icon>expand_more</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item value="usdc">
                            <v-list-item-title @click="switchTokenTo('usdc')">USDC</v-list-item-title>
                          </v-list-item>
                          <v-list-item value="eth">
                            <v-list-item-title @click="switchTokenTo('eth')">ETH</v-list-item-title>
                          </v-list-item>
                          <v-list-item value="btc">
                            <v-list-item-title @click="switchTokenTo('btc')">BTC</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row no-gutters style="margin-top: 30px">
                <swap-confirm :selected_token_from="selectedTokenFrom" :selected_token_to="selectedTokenTo"
                  :amount_from="amountSwapFrom.toString()" :amount_to="amountSwapTo.toString()" :rate="rate"
                  :inverse_rate="inverse_rate" :gas_fee="gasFee" :gas_fee_usd="gasFeeUsd" :btn_disable="btn_disabled"
                  style="width: 100%" />
              </v-row>
              <v-row no-gutters style="margin-top: 26px">
                <v-col style="text-align: start;">
                  <p class="font-regular text-white text-weight-400 text-size-18px">
                    Transaction Fees
                  </p>
                </v-col>
                <v-col style="text-align: start;">
                  <p class="font-regular text-white text-weight-400 text-size-18px">
                    0.3 %
                  </p>
                </v-col>
              </v-row>
              <v-row no-gutters style="margin-top: 228px; margin-bottom: 30px;">
                <v-spacer></v-spacer>
                <p class="font-regular text-white text-weight-400 text-size-16px">
                  <a href="#">View</a> history. Read our <a :href="appStore.doc_url_swap" target="_blank">Docs</a> on
                  Swaps.
                </p>
                <v-spacer></v-spacer>
              </v-row>
            </v-container>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
  <div v-else>
    <v-dialog v-model="appStore.dlgSwap" fullscreen transition="fade-transition" style="z-index: 2;">
      <v-card color="black" class="dialogSwapMobile">
        <layout-header />
        <v-card-title class="d-flex align-center mx-auto" style="margin-top: 43px;">
          <v-btn icon variant="plain" @click="appStore.dlgSwap = false">
            <BackButton />
          </v-btn>
          <p class="font-bold text-white text-weight-700 text-size-22px">
            Swap</p>
        </v-card-title>
        <v-card-text class="ma-0 pa-0">
          <p class="font-regular text-white text-weight-400 text-size-18px" style="margin-left: 20px;">
            Collateral</p>
          <div style="text-align: center;">
            <v-container>
              <!-- Swap Token From -->
              <v-row no-gutters class="rowSwapMobile">
                <v-col>
                  <div class="d-flex align-center">
                    <p class="me-auto font-regular text-white text-weight-400 text-size-15px">
                      From</p>
                    <p class="font-regular text-white text-weight-400 text-size-15px">
                      Balance:</p>
                    <v-btn variant="text" @click="amountSwapFrom = tokenBalanceFrom">
                      {{ parseFloat(tokenBalanceFrom.toFixed(6)) }}
                    </v-btn>
                  </div>
                  <div class="mt-3 d-flex align-center">
                    <input v-model="amountSwapFrom" type="number" @keypress="enterDetect" id="idSwapFromDlg"
                      name="nameSwapFromDlg" bg-color="#1E1E1E" color="#FFFFFF"
                      class="font-regular text-white text-size-25px text-weight-700 mr-3" style="width: 100%;;">
                    <v-img v-if="selectedTokenFrom == 'usdc'" width="21" height="21" :src="TokenUsdc"></v-img>
                    <v-img v-if="selectedTokenFrom == 'eth'" width="21" height="21" :src="TokenEth"></v-img>
                    <v-img v-if="selectedTokenFrom == 'btc'" width="21" height="21" :src="TokenBtc"></v-img>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn variant="plain" v-bind="props" style="margin-left: 10px; padding:0px;">
                          <p class="font-regular text-white text-weight-700 text-size-25px">
                            {{ selectedTokenFrom.toUpperCase() }}
                          </p>
                          <v-icon>expand_more</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item value="usdc">
                          <v-list-item-title @click="switchTokenFrom('usdc')">USDC</v-list-item-title>
                        </v-list-item>
                        <v-list-item value="eth">
                          <v-list-item-title @click="switchTokenFrom('eth')">ETH</v-list-item-title>
                        </v-list-item>
                        <v-list-item value="btc">
                          <v-list-item-title @click="switchTokenFrom('btc')">BTC</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </v-col>
              </v-row>
              <v-btn icon density="compact" size="large" @click="reverseTokens"
                style="background: white; color: black; margin-top:-8px;">
                <ReverseButton />
              </v-btn>
              <!-- Swap Token To -->
              <v-row no-gutters class="rowSwapMobile" style="margin-top: -8px;">
                <v-col>
                  <div class="d-flex align-center">
                    <p class="me-auto font-regular text-white text-weight-400 text-size-15px">
                      To</p>
                    <p class="font-regular text-white text-weight-400 text-size-15px">
                      Balance: {{ parseFloat(tokenBalanceTo.toFixed(6)) }}</p>
                  </div>
                  <div class="mt-3 d-flex align-center">
                    <input v-model="amountSwapTo" type="number" @keypress="enterDetect" readonly id="idSwapToDlg"
                      name="nameSwapToDlg" bg-color="#1E1E1E" color="#FFFFFF"
                      class="font-regular text-white text-size-25px text-weight-700 mr-3" style="width: 100%;">
                    <v-img v-if="selectedTokenTo == 'usdc'" width="21" height="21" :src="TokenUsdc"></v-img>
                    <v-img v-if="selectedTokenTo == 'eth'" width="21" height="21" :src="TokenEth"></v-img>
                    <v-img v-if="selectedTokenTo == 'btc'" width="21" height="21" :src="TokenBtc"></v-img>
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn variant="plain" v-bind="props" style="margin-left: 10px; padding: 0px;">
                          <p class="font-regular text-white text-weight-700 text-size-25px">
                            {{ selectedTokenTo.toUpperCase() }}
                          </p>
                          <v-icon>expand_more</v-icon>
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item value="usdc">
                          <v-list-item-title @click="switchTokenTo('usdc')">USDC</v-list-item-title>
                        </v-list-item>
                        <v-list-item value="eth">
                          <v-list-item-title @click="switchTokenTo('eth')">ETH</v-list-item-title>
                        </v-list-item>
                        <v-list-item value="btc">
                          <v-list-item-title @click="switchTokenTo('btc')">BTC</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </v-col>
              </v-row>
              <v-row no-gutters style="margin-top: 30px">
                <swap-confirm :selected_token_from="selectedTokenFrom" :selected_token_to="selectedTokenTo"
                  :amount_from="amountSwapFrom.toString()" :amount_to="amountSwapTo.toString()" :rate="rate"
                  :inverse_rate="inverse_rate" :gas_fee="gasFee" :gas_fee_usd="gasFeeUsd" :btn_disable="btn_disabled"
                  style="width: 100%" />
              </v-row>
              <v-row no-gutters style="margin-top: 26px">
                <v-col style="text-align: start;">
                  <p class="font-regular text-white text-weight-400 text-size-17px">
                    Transaction Fees
                  </p>
                </v-col>
                <v-col style="text-align: start;">
                  <p class="font-regular text-white text-weight-400 text-size-17px">
                    0.3 %
                  </p>
                </v-col>
              </v-row>
              <v-row no-gutters style="margin-top: 235px;">
                <v-spacer></v-spacer>
                <p class="font-regular text-white text-weight-400 text-size-16px">
                  <a href="#">View</a> history. Read our <a :href="appStore.doc_url_swap" target="_blank">Docs</a> on
                  Swaps.
                </p>
                <v-spacer></v-spacer>
              </v-row>
            </v-container>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import Web3 from "web3";
// import DSA from "dsa-connect";

import {
  useBoard,
  useEthers,
  useWallet,
  displayEther,
  shortenAddress,
} from "vue-dapp";
import BigNumber from "bignumber.js";

const { open } = useBoard();
const { address, balance, isActivated, chainId } = useEthers();
const { disconnect, wallet } = useWallet();

import LayoutHeader from "./LayoutHeader.vue";
import BackButton from "../assets/backBtn.svg";
import SwapConfirm from "./SwapConfirm.vue";
import IconWithdraw from "../assets/withdraw.svg";

import TokenUsdc from "../assets/usdc.png";
import TokenEth from "../assets/eth.png";
import TokenBtc from "../assets/btc.png";
import ReverseButton from "../assets/reverse.svg";

const reqTimer = ref();
onMounted(() => {
  reqTimer.value = setInterval(() => {
    if (
      appStore.dlgSwap &&
      !isNaN(amountSwapFrom.value) &&
      amountSwapFrom.value > 0
    ) {
      getAmountOut();
      getRate();
      getTransactionFee();
    } else {
      amountSwapTo.value = 0;
    }
  }, 5000);
});

const selectedTokenFrom = ref("eth");
const selectedTokenTo = ref("usdc");
function switchTokenFrom(token_name: string) {
  if (token_name == "usdc" || token_name == "eth" || token_name == "btc") {
    if (token_name != selectedTokenTo.value) {
      selectedTokenFrom.value = token_name;
      amountSwapFrom.value = 0;
      amountSwapTo.value = 0;
    }
  }
}
function switchTokenTo(token_name: string) {
  if (token_name == "usdc" || token_name == "eth" || token_name == "btc") {
    if (token_name != selectedTokenFrom.value) {
      selectedTokenTo.value = token_name;
      if (!isNaN(amountSwapFrom.value) && amountSwapFrom.value > 0) {
        getAmountOut();
        getRate();
        getTransactionFee();
      } else {
        amountSwapTo.value = 0;
      }
    }
  }
}
function reverseTokens() {
  const tempToken = selectedTokenFrom.value;
  selectedTokenFrom.value = selectedTokenTo.value;
  selectedTokenTo.value = tempToken;
  amountSwapFrom.value = 0;
  amountSwapTo.value = 0;
}

const amountSwapFrom = ref(0);
const amountSwapTo = ref(0);
watch(amountSwapFrom, (newVal) => {
  if (newVal < 0) {
    amountSwapFrom.value = 0;
  }
  if (!isNaN(newVal) && newVal > 0) {
    getAmountOut();
    getRate();
    getTransactionFee();
  } else {
    amountSwapTo.value = 0;
  }
});
function enterDetect(e: KeyboardEvent): void {
  if (e.key == "-" || e.key == "+" || e.key.toLocaleLowerCase() == "e") {
    e.preventDefault();
  }
}
function getAmountOut() {
  appStore
    .uniswapGetAmountOut(
      wallet.provider,
      selectedTokenFrom.value,
      amountSwapFrom.value.toString(),
      selectedTokenTo.value
    )
    .then((amountOut) => {
      amountSwapTo.value = amountOut;
    });
}

const rate = ref(0);
const inverse_rate = ref(0);
function getRate() {
  appStore
    .uniswapGetAmountOut(
      wallet.provider,
      selectedTokenFrom.value,
      "1",
      selectedTokenTo.value
    )
    .then((amountOut) => {
      const big_amountOut = new BigNumber(
        selectedTokenTo.value == "eth" ? amountOut.toFixed(8) : amountOut
      );
      rate.value = big_amountOut.toNumber();
    });
  appStore
    .uniswapGetAmountOut(
      wallet.provider,
      selectedTokenTo.value,
      "1",
      selectedTokenFrom.value
    )
    .then((amountOut) => {
      const big_amountOut = new BigNumber(
        selectedTokenFrom.value == "eth" ? amountOut.toFixed(8) : amountOut
      );
      inverse_rate.value = big_amountOut.toNumber();
    });
}

const gasFee = ref("");
const gasFeeUsd = ref("");
async function getTransactionFee() {
  if (
    !isNaN(amountSwapFrom.value) &&
    amountSwapFrom.value > 0 &&
    amountSwapFrom.value <= tokenBalanceFrom.value
  ) {
    let tokenAddrIn = "";
    let tokenAddrOut = "";
    let amountIn = "";
    if (selectedTokenFrom.value == "usdc") {
      tokenAddrIn = appStore.USDC;
      amountIn = BigNumber(amountSwapFrom.value).multipliedBy(1e6).toString();
    } else if (selectedTokenFrom.value == "eth") {
      tokenAddrIn = appStore.WETH;
      amountIn = BigNumber(amountSwapFrom.value).multipliedBy(1e18).toString();
    } else if (selectedTokenFrom.value == "btc") {
      tokenAddrIn = appStore.WBTC;
      amountIn = BigNumber(amountSwapFrom.value).multipliedBy(1e8).toString();
    }
    if (selectedTokenTo.value == "usdc") {
      tokenAddrOut = appStore.USDC;
    } else if (selectedTokenTo.value == "eth") {
      tokenAddrOut = appStore.WETH;
    } else if (selectedTokenTo.value == "btc") {
      tokenAddrOut = appStore.WBTC;
    }
    const web3 = new Web3(wallet.provider as any);

    const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
    // Swap Token
    doughV1DsaContract.methods.doughCall(2, 0, tokenAddrIn, tokenAddrOut, amountIn, false).estimateGas({ from: address.value })
      .then(async (gas: any) => {
        // console.log("gas: ", gas)
        const gas_price = await web3.eth.getGasPrice();
        const gasPriceInGwei = web3.utils.fromWei(gas_price, "gwei");
        // console.log("gas_price: ", gasPriceInGwei);

        gasFee.value = BigNumber(gas ?? 0)
          .multipliedBy(gasPriceInGwei)
          .dividedBy(1000000000)
          .toFixed(5);
        gasFeeUsd.value = BigNumber(gas ?? 0)
          .multipliedBy(gasPriceInGwei)
          .dividedBy(1000000000)
          .multipliedBy(appStore.price_eth_aave)
          .toFixed(2);
        // console.log("gasFee: ", gasFee)

      })
      .catch((error: any) => {
        gasFee.value = "";
        gasFeeUsd.value = "";
      })
  }
}
const tokenBalanceFrom = computed(() => {
  return selectedTokenFrom.value == "usdc"
    ? appStore.dsa_usdc_balance
    : selectedTokenFrom.value == "eth"
      ? appStore.dsa_weth_balance
      : selectedTokenFrom.value == "btc"
        ? appStore.dsa_wbtc_balance
        : 0;
});
const tokenBalanceTo = computed(() => {
  return selectedTokenTo.value == "usdc"
    ? appStore.dsa_usdc_balance
    : selectedTokenTo.value == "eth"
      ? appStore.dsa_weth_balance
      : selectedTokenTo.value == "btc"
        ? appStore.dsa_wbtc_balance
        : 0;
});

const btn_disabled = computed(() => {
  return (
    isNaN(amountSwapFrom.value) ||
    amountSwapFrom.value <= 0 ||
    amountSwapFrom.value > tokenBalanceFrom.value
  );
});
</script>

<style>
.dialogSwap {
  border: solid !important;
  border-color: #00c797 !important;
  border-width: 1px !important;
  padding-bottom: 0px !important;
}

.dialogSwapMobile {
  padding-left: 27px !important;
  padding-right: 27px !important;
  padding-bottom: 0px !important;
}

.btnWithdraw {
  width: 119px !important;
  height: 52px !important;
  border-radius: 10px !important;
  background: white !important;
  color: black !important;
  font-weight: 400 !important;
  font-size: 16px !important;
  text-decoration: none;
}

.rowSwap {
  background: #1e1e1e;
  border-radius: 10px !important;
  border-width: 1px !important;
  padding-top: 25px !important;
  padding-left: 25px !important;
  padding-right: 20px !important;
  padding-bottom: 25px !important;
}

.rowSwapMobile {
  background: #1e1e1e;
  border-radius: 10px !important;
  border-width: 1px !important;
  padding-top: 15px !important;
  padding-left: 18px !important;
  padding-right: 20px !important;
  padding-bottom: 20px !important;
}

input:focus {
  outline: none;
}
</style>