<template>
  <div>
    <v-dialog v-model="dialogLoopInput" :max-width="appStore.isMobile ? 5000 : 647"
      :fullscreen="appStore.isMobile ? true : false"
      :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 3;">
      <template v-slot:activator="{ props }">
        <!-- Borrow Button - Desktop -->
        <v-btn v-if="!appStore.isMobile" v-bind="props" class="text-none btnLoop"
          :disabled="aaveV3_token_balance_usd == 0" @click="amountLeverage = 1">Select</v-btn>
        <!-- Borrow Button - Mobile -->
        <v-sheet v-else v-bind="props" class="d-flex align-center btnLoopMobile" @click="amountLeverage = 1">
          <div class="d-flex me-auto align-center">
            <div>
              <v-img v-if="props_info.selected_token == 'eth'" width="33" height="33" :src="TokenEth"></v-img>
              <v-img v-if="props_info.selected_token == 'btc'" width="33" height="33" :src="TokenBtc"></v-img>
            </div>
            <div style="padding-left: 13px; text-align: start;">
              <p v-if="props_info.selected_token == 'eth'" class="font-regular text-white text-weight-700 text-size-18px">
                Ethereum</p>
              <p v-if="props_info.selected_token == 'btc'" class="font-regular text-white text-weight-700 text-size-18px">
                Bitcoin</p>
              <p v-if="props_info.selected_token == 'eth'" class="font-regular text-white text-weight-700 text-size-16px">
                ${{ parseFloat((appStore.aaveV3Weth_supply * appStore.price_eth_aave).toFixed(2)) }}</p>
              <p v-if="props_info.selected_token == 'btc'" class="font-regular text-white text-weight-700 text-size-16px">
                ${{ parseFloat((appStore.aaveV3Wbtc_supply * appStore.price_btc_aave).toFixed(2)) }}</p>
            </div>
          </div>
          <div>
            <p class="font-regular text-white text-weight-400 text-size-18px">
              {{ props_info.selected_token == 'eth' ? parseFloat(appStore.aaveV3Weth_supply.toFixed(6))
                : props_info.selected_token == 'btc' ? parseFloat(appStore.aaveV3Wbtc_supply.toFixed(8)) : 0
              }}&nbsp;&nbsp;{{ props_info.selected_token.toUpperCase() }}
            </p>
          </div>
        </v-sheet>
      </template>

      <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
        :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">

        <!-- Toolbar - Desktop -->
        <v-toolbar v-if="!appStore.isMobile" dark color="black">
          <v-spacer></v-spacer>
          <v-btn icon variant="plain" dark @click="dialogLoopInput = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- Toolbar - Mobile -->
        <div v-else>
          <layout-header />
        </div>

        <!-- Title - Desktop & Mobile -->
        <v-card-title :class="appStore.isMobile ? 'd-flex align-center mx-auto' : 'd-flex align-center'"
          :style="appStore.isMobile ? 'margin-top: 43px;' : ''">
          <div class="d-flex me-auto align-center">
            <v-btn icon variant="plain" :style="appStore.isMobile ? '' : 'margin-left: 25px;'"
              @click="dialogLoopInput = false">
              <BackButton />
            </v-btn>
            <p class="font-bold text-white text-weight-700 text-size-22px">
              Loop</p>
          </div>
        </v-card-title>

        <v-card-text class="ma-0 pa-0">
          <div style="text-align: center;">
            <v-container :class="appStore.isMobile ? 'containerBorrowInputMobile' : 'containerBorrowInput'">

              <v-row style="margin-top: 30px;">
                <v-col cols="12">
                  <p class="font-regular text-white text-weight-400 text-size-18px" style="text-align: start;">
                    Selected Token</p>
                </v-col>
              </v-row>

              <v-sheet
                :class="appStore.isMobile ? 'd-flex align-center clsRowLoopInputTokensMobile' : 'd-flex align-center clsRowLoopInputTokens'">
                <div class="d-flex me-auto align-center">
                  <div>
                    <v-img v-if="props_info.selected_token == 'eth'" width="33" height="33" :src="TokenEth"></v-img>
                    <v-img v-if="props_info.selected_token == 'btc'" width="33" height="33" :src="TokenBtc"></v-img>
                  </div>
                  <div style="padding-left: 13px; text-align: start;">
                    <p v-if="props_info.selected_token == 'eth'"
                      class="font-regular text-white text-weight-700 text-size-18px">
                      Ethereum</p>
                    <p v-if="props_info.selected_token == 'btc'"
                      class="font-regular text-white text-weight-700 text-size-18px">
                      Bitcoin</p>
                    <p v-if="props_info.selected_token == 'eth'"
                      class="font-regular text-white text-weight-700 text-size-16px">
                      ${{ parseFloat((appStore.aaveV3Weth_supply * appStore.price_eth_aave).toFixed(2)) }}</p>
                    <p v-if="props_info.selected_token == 'btc'"
                      class="font-regular text-white text-weight-700 text-size-16px">
                      ${{ parseFloat((appStore.aaveV3Wbtc_supply * appStore.price_btc_aave).toFixed(2)) }}</p>
                  </div>
                </div>
                <div>
                  <p class="font-regular text-white text-weight-400 text-size-18px">
                    {{ props_info.selected_token == 'eth' ? parseFloat(appStore.aaveV3Weth_supply.toFixed(8))
                      : props_info.selected_token == 'btc' ? parseFloat(appStore.aaveV3Wbtc_supply.toFixed(8)) : 0
                    }}&nbsp;&nbsp;{{ props_info.selected_token.toUpperCase() }}
                  </p>
                </div>
              </v-sheet>

              <div style="text-align: center; margin-top: 30px;">
                <p class="font-regular text-white text-weight-400 text-size-18px">
                  Select your leverage.</p>
              </div>

              <div>
                <v-slider v-model="amountLeverage" :ticks="tickLabels" :color="status_color" :min="slider_min"
                  :max="slider_max" step="0.01" show-ticks="always" tick-size="5" track-color="red"></v-slider>
              </div>

              <div
                :class="appStore.isMobile ? 'clsRowAmountLeverageMobile d-flex align-center' : 'clsRowAmountLeverage d-flex align-center'"
                style="margin-top: 30px;">
                <input v-model="amountLeverage" type="number" @keypress="enterDetect" id="idamountLeverage"
                  name="nameamountLeverage" color="#FFFFFF" placeholder="Enter manually"
                  class="font-regular text-white text-size-25px text-weight-700" style="width: 100%;;">
                <p class="font-regular text-white text-size-25px text-weight-700 mr-5">&nbsp;&nbsp;&nbsp;X</p>
              </div>

              <v-row class="ml-0 mr-0" style="margin-top: 25px;">
                <loop-confirm :selected_token="props_info.selected_token" :loop_amount="loop_amount"
                  :leverage_position="amountLeverage" :liquidation_price="liquidation_price_eth"
                  :calc_health_factor="health_factor_value" :gas_fee="gasFee" :gas_fee_usd="gasFeeUsd"
                  :btn_disable="btn_disabled" style="width: 100%" />
              </v-row>

              <v-row>
                <v-col cols="7" style="text-align: start;">
                  <p class="font-regular text-white text-weight-400 text-size-18px">
                    Leverage Position</p>
                </v-col>
                <v-col cols="5" style="text-align: start;">
                  {{ amountLeverage }}&nbsp;&nbsp;X
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="7" style="text-align: start;">
                  <p class="font-regular text-white text-weight-400 text-size-18px">
                    Your Liquidation Price</p>
                </v-col>
                <v-col cols="5" style="text-align: start;">
                  ${{ liquidation_price_eth.toFixed(2) }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="7" style="text-align: start;">
                  <p class="font-regular text-white text-weight-400 text-size-18px">
                    Health Factor</p>
                </v-col>
                <v-col cols="5" style="text-align: start;" class="d-flex align-center">
                  <p class="font-regular text-white text-weight-400 text-size-16px mr-2">
                    {{ health_factor_value.toFixed(2) }}</p>
                  <v-chip label class="font-regular text-size-16px text-weight-400" :color="status_color">
                    {{ status_text }}
                  </v-chip>
                </v-col>
              </v-row>

              <v-row no-gutters
                :style="appStore.isMobile ? 'margin-top: 60px;' : 'margin-top: 40px; margin-bottom: 30px;'">
                <v-spacer></v-spacer>
                <p class="font-regular text-white text-weight-400 text-size-16px">
                  <a href="#">View</a> history. Read our <a :href="appStore.doc_url_loop" target="_blank">Docs</a> on
                  Looping.
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
const props_info = defineProps({
  selected_token: {
    type: String,
    required: true,
  },
});

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import LayoutHeader from "./LayoutHeader.vue";
import LoopConfirm from "./LoopConfrim.vue"
import BackButton from "../assets/backBtn.svg";
import TokenEth from "../assets/eth.png";
import TokenBtc from "../assets/btc.png";

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

const old_leverage = ref(1);
const reqTimer = ref();
onMounted(() => {
  reqTimer.value = setInterval(async () => {
    if (dialogLoopInput.value) {
      if (old_leverage.value != amountLeverage.value) {
        await getGasFee();
        old_leverage.value = amountLeverage.value;
      }
    }
  }, 1000);
});

const dialogLoopInput = ref(false);

const aaveV3_token_balance = computed(() => {
  if (props_info.selected_token == "eth") {
    return appStore.aaveV3Weth_supply;
  } else if (props_info.selected_token == "btc") {
    return appStore.aaveV3Wbtc_supply;
  } else {
    return 0;
  }
});
const aaveV3_token_balance_usd = computed(() => {
  if (props_info.selected_token == "eth") {
    return appStore.aaveV3Weth_supply * appStore.price_eth_aave;
  } else if (props_info.selected_token == "btc") {
    return appStore.aaveV3Wbtc_supply * appStore.price_btc_aave;
  } else {
    return 0;
  }
});

const amountLeverage = ref();
const slider_min = 1.5;
const slider_max = 10;
const tickLabels = {
  1: "1.5x",
  2: "2x",
  3: "3x",
  4: "4x",
  5: "5x",
  6: "6x",
  7: "7x",
  8: "8x",
  9: "9x",
  10: "10x",
};

const amountLeverageValid = ref(false);
watch(amountLeverage, (newVal) => {
  if (newVal < slider_min) {
    amountLeverage.value = slider_min;
  }
  if (newVal > slider_max) {
    amountLeverage.value = slider_max;
  }

  if (newVal < slider_min || newVal > slider_max || isNaN(newVal)) {
    amountLeverageValid.value = false;
  } else {
    amountLeverageValid.value = true;
  }
  // getGasFee();
});

const btn_disabled = computed(() => {
  return gasFee.value == "";
});

const health_factor_value = computed(() => {
  const supply_usd = appStore.aaveV3_total_collateral_base;
  const borrow_usd = appStore.aaveV3_total_debt_base;

  const amount_flashloan_usd =
    aaveV3_token_balance_usd.value * (amountLeverage.value - 1);

  const status_value =
    supply_usd + amount_flashloan_usd == 0
      ? 0
      : ((borrow_usd + amount_flashloan_usd) /
        (supply_usd + amount_flashloan_usd)) *
      100;
  const health_factor =
    status_value == 0
      ? 0
      : appStore.aaveV3_current_liquidation_threshold / status_value;
  return health_factor;
});

const status_text = computed(() => {
  if (health_factor_value.value >= appStore.health_factor_safe) {
    return "Safe";
  } else if (health_factor_value.value >= appStore.health_factor_risky) {
    return "Risky";
  } else if (health_factor_value.value > 1) {
    return "Very Risky";
  } else {
    return "Liquidate";
  }
});
const status_color = computed(() => {
  if (health_factor_value.value >= appStore.health_factor_safe) {
    return "success";
  } else if (health_factor_value.value >= appStore.health_factor_risky) {
    return "warning";
  } else if (health_factor_value.value > 1) {
    return "error";
  } else {
    return "red";
  }
});

const liquidation_price_eth = computed(() => {
  return health_factor_value.value < 1
    ? appStore.price_eth_aave
    : appStore.price_eth_aave / health_factor_value.value;
});

function enterDetect(e: KeyboardEvent): void {
  if (e.key == "-" || e.key == "+" || e.key.toLocaleLowerCase() == "e") {
    e.preventDefault();
  }
}

const loop_amount = computed(() => {
  return amountLeverage.value <= 1
    ? 0
    : aaveV3_token_balance.value * (amountLeverage.value - 1);
});

const gasFee = ref("");
const gasFeeUsd = ref("");
async function getGasFee() {
  if (
    (props_info.selected_token == "eth" ||
      props_info.selected_token == "btc") &&
    amountLeverage.value > 1
  ) {
    let tokenAddr = "";
    let big_amount = "";
    if (props_info.selected_token == "eth") {
      tokenAddr = appStore.WETH;
      big_amount = new BigNumber(loop_amount.value)
        .multipliedBy(1e18)
        .toString();
    } else if (props_info.selected_token == "btc") {
      tokenAddr = appStore.WBTC;
      big_amount = new BigNumber(loop_amount.value)
        .multipliedBy(1e8)
        .toString();
    }
    const amount = parseInt(big_amount).toString();

    const web3 = new Web3(wallet.provider as any);

    const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
    // Loop Token
    doughV1DsaContract.methods.doughCall(3, 0, tokenAddr, tokenAddr, amount, false).estimateGas({ from: address.value })
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
  } else {
    gasFee.value = "";
    gasFeeUsd.value = "";
  }
}
</script>

<style>
.btnLoop {
  width: 119px !important;
  height: 52px !important;
  border-radius: 10px !important;
  background: white !important;
  color: black !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  text-decoration: none;
}

.btnLoopMobile {
  width: 100% !important;
  height: 83px !important;
  margin-top: 25px;
  border-radius: 6px !important;
  padding-left: 18px !important;
  padding-right: 17px !important;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  background: #1E1E1E !important;
  color: black !important;
}

.tokenRow {
  height: 97px;
  background: #1e1e1e;
  padding-left: 35px !important;
  padding-top: 5px !important;
  padding-right: 35px !important;
  border-radius: 10px !important;
  border-width: 1px !important;
}

.clsRowAmountLeverage {
  height: 97px;
  background: #1e1e1e;
  padding-left: 35px !important;
  padding-right: 35px !important;
  border-radius: 10px !important;
  border-width: 1px !important;
}

.clsRowAmountLeverageMobile {
  height: 83px;
  background: #1e1e1e;
  padding-left: 18px !important;
  padding-right: 18px !important;
  border-radius: 6px !important;
  border-width: 1px !important;
}

input::placeholder {
  color: white;
  font-weight: 400 !important;
  font-size: 18px !important;
}

.clsRowLoopInputTokens {
  height: 111px;
  background: #1e1e1e;
  padding-left: 35px !important;
  padding-right: 35px !important;
  border-radius: 10px !important;
  border-width: 0px !important;
}

.clsRowLoopInputTokensMobile {
  height: 83px;
  background: #1e1e1e;
  padding-left: 18px !important;
  padding-right: 20px !important;
  border-radius: 6px !important;
  border-width: 0px !important;
}
</style>
