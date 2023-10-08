<template>
  <div>
    <v-dialog v-model="dialogSupply" :max-width="appStore.isMobile ? 5000 : 647"
      :fullscreen="appStore.isMobile ? true : false"
      :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 3;">
      <template v-slot:activator="{ props }">
        <!-- Supply Button - Desktop -->
        <v-btn v-if="!appStore.isMobile" v-bind="props" class="text-none btnSupply" :disabled="btnDisable"
          @click="initInputInfo">Supply</v-btn>
        <!-- Deposit Button - Mobile -->
        <v-sheet v-else v-bind="props" class="d-flex align-center btnDepositMobile" @click="initInputInfo">
          <div class="d-flex me-auto align-center">
            <div>
              <v-img v-if="props_token.supply_token == 'usdc'" width="33" height="33" :src="TokenUsdc"></v-img>
              <v-img v-if="props_token.supply_token == 'eth'" width="33" height="33" :src="TokenEth"></v-img>
              <v-img v-if="props_token.supply_token == 'btc'" width="33" height="33" :src="TokenBtc"></v-img>
            </div>
            <div style="padding-left: 13px; text-align: start;">
              <p v-if="props_token.supply_token == 'usdc'" class="font-regular text-white text-weight-700 text-size-18px">
                USD Coin</p>
              <p v-if="props_token.supply_token == 'eth'" class="font-regular text-white text-weight-700 text-size-18px">
                Ethereum</p>
              <p v-if="props_token.supply_token == 'btc'" class="font-regular text-white text-weight-700 text-size-18px">
                Bitcoin</p>
              <p v-if="props_token.supply_token == 'usdc'" class="font-light text-white text-weight-400 text-size-16px">
                ${{ parseFloat((appStore.dsa_usdc_balance * appStore.price_usdc_aave).toFixed(2)) }}</p>
              <p v-if="props_token.supply_token == 'eth'" class="font-light text-white text-weight-400 text-size-16px">
                ${{ parseFloat((appStore.dsa_weth_balance * appStore.price_eth_aave).toFixed(2)) }}</p>
              <p v-if="props_token.supply_token == 'btc'" class="font-light text-white text-weight-400 text-size-16px">
                ${{ parseFloat((appStore.dsa_wbtc_balance * appStore.price_btc_aave).toFixed(2)) }}</p>
            </div>
          </div>
          <div>
            <p class="font-regular text-white text-weight-400 text-size-18px">
              {{ props_token.supply_token == 'usdc' ? parseFloat(appStore.dsa_usdc_balance.toFixed(6))
                : props_token.supply_token == 'eth' ? parseFloat(appStore.dsa_weth_balance.toFixed(6))
                  : props_token.supply_token == 'btc' ? parseFloat(appStore.dsa_wbtc_balance.toFixed(6)) : 0
              }}&nbsp;&nbsp;{{ props_token.supply_token.toUpperCase() }}
            </p>
          </div>
        </v-sheet>
      </template>

      <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
        :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">

        <!-- Toolbar - Desktop -->
        <v-toolbar v-if="!appStore.isMobile" dark color="black">
          <v-spacer></v-spacer>
          <v-btn icon variant="plain" dark @click="dialogSupply = false">
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
          <v-btn icon variant="plain" :style="appStore.isMobile ? '' : 'margin-left: 25px;'"
            @click="dialogSupply = false">
            <BackButton />
          </v-btn>
          <p class="font-bold text-white text-weight-700 text-size-22px">
            Supply {{ selectedToken.toUpperCase() }}</p>
        </v-card-title>

        <v-card-text class="ma-0 pa-0">
          <div style="text-align: center;">
            <v-container :class="appStore.isMobile ? 'containerSupplyInputMobile' : 'containerSupplyInput'">

              <!-- Token Balance -->
              <v-sheet
                :class="appStore.isMobile ? 'd-flex align-center supplyTokenBalanceShowMobile' : 'd-flex align-center supplyTokenBalanceShow'">
                <div class="me-auto" style="text-align: start;">
                  <p
                    :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-16px' : 'font-light text-white text-weight-400 text-size-18px'">
                    Token Balance
                  </p>
                  <p
                    :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-22px' : 'font-regular text-white text-weight-700 text-size-25px'">
                    {{ tokenBalance }}
                  </p>
                </div>
                <div>
                  <v-img v-if="selectedToken == 'usdc'" width="44" height="44" :src="TokenUsdc"></v-img>
                  <v-img v-if="selectedToken == 'eth'" width="44" height="44" :src="TokenEth"></v-img>
                  <v-img v-if="selectedToken == 'btc'" width="44" height="44" :src="TokenBtc"></v-img>
                </div>
              </v-sheet>

              <!-- Deposit Token Amount -->
              <v-row no-gutters :class="appStore.isMobile ? 'amountTokenMobile' : 'amountToken'">
                <v-col align-self="center" style="text-align: start;">
                  <input v-model="amountSupply" type="number" id="idSupply" name="nameSupply" @keypress="enterDetect"
                    placeholder="Insert amount to supply" bg-color="#00C797" color="#FFFFFF"
                    class="font-regular text-white text-weight-700 text-size-25px" style="width: 100%;">
                </v-col>
                <v-col cols="3" align-self="center">
                  <v-btn class="font-regular text-none text-white text-weight-700 text-size-18px" variant="plain"
                    @click="setMax">
                    Set Max
                  </v-btn>
                </v-col>
              </v-row>

              <!-- Supply Status - Desktop & Mobile -->
              <v-row no-gutters class="d-flex" style="margin-top: 30px">
                <p class="font-regular text-white text-weight-400 text-size-18px">
                  Status&nbsp;&nbsp;&nbsp;</p>
                <p class="font-regular text-weight-400 text-size-18px me-auto">
                  {{ status_value.toFixed(2) }} %
                </p>
                <p class="font-regular text-white text-weight-400 text-size-16px">
                  max : {{ appStore.aaveV3_current_liquidation_threshold }} %</p>
              </v-row>
              <v-progress-linear v-model="status_value" :color="status_color"
                style="margin-top: 10px;"></v-progress-linear>

              <!-- Gas Fee -->
              <v-row no-gutters style="margin-top: 30px">
                <supply-confirm :selected_token="selectedToken"
                  :supply_amount="isNaN(parseFloat(amountSupply)) ? 0 : parseFloat(amountSupply)" :gas_fee="gasFee"
                  :gas_fee_usd="gasFeeUsd" :btn_disable="btn_disabled" style="width: 100%" />
              </v-row>
              <v-row no-gutters style="margin-top: 47px">
                <v-col align-self="center" style="text-align: start">
                  <p class="font-regular text-white text-weight-400 text-size-18px">
                    Gas Fee
                  </p>
                </v-col>
                <v-col align-self="center">
                  <v-row>
                    <p class="font-regular text-white text-weight-400 text-size-18px">
                      {{ gasFee }} {{ gasFee == "" ? "" : "ETH" }}
                    </p>
                    <p class="font-regular text-white text-weight-400 text-size-16px ml-5">
                      {{ gasFeeUsd == "" ? "" : "( $" }}
                      {{ gasFeeUsd }}
                      {{ gasFeeUsd == "" ? "" : " ) " }}
                    </p>
                  </v-row>
                </v-col>
                <v-col></v-col>
              </v-row>

              <v-row no-gutters
                :style="appStore.isMobile ? 'margin-top: 215px;' : 'margin-top: 190px; margin-bottom: 30px;'">
                <v-spacer></v-spacer>
                <p class="font-regular text-white text-weight-400 text-size-16px">
                  <a href="#">View</a> history. Read our <a :href="appStore.doc_url_supply" target="_blank">Docs</a> on
                  Supplying.
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
const props_token = defineProps({
  supply_token: {
    type: String,
    required: true,
  },
});

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import LayoutHeader from "./LayoutHeader.vue";
import SupplyConfirm from "./SupplyConfirm.vue";
import BackButton from "../assets/backBtn.svg";
import TokenUsdc from "../assets/usdc.png";
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

const dialogSupply = ref(false);
const reqTimer = ref();
onMounted(() => {
  reqTimer.value = setInterval(() => {
    if (dialogSupply.value) {
      getGasFee();
    }
  }, 5000);
});

function initInputInfo() {
  selectedToken.value = props_token.supply_token;
  amountSupply.value = "";
}

const btnDisable = computed(() => {
  return tokenBalance.value > 0 ? false : true;
});

const selectedToken = ref(props_token.supply_token);

const tokenBalance = computed(() => {
  return selectedToken.value == "usdc"
    ? appStore.dsa_usdc_balance
    : selectedToken.value == "eth"
      ? appStore.dsa_weth_balance
      : selectedToken.value == "btc"
        ? appStore.dsa_wbtc_balance
        : 0;
});

const status_value = computed(() => {
  const supply_usd = appStore.aaveV3_total_collateral_base;
  const borrow_usd = appStore.aaveV3_total_debt_base;

  let res = 0;
  if (supply_usd + amountSupplyUsd.value == 0) {
    res = 0;
  } else {
    res = (borrow_usd / (supply_usd + amountSupplyUsd.value)) * 100;
  }
  if (res > 100) {
    res = 100;
  }
  return res;
});

const status_color = computed(() => {
  const estimate_health_factor =
    status_value.value == 0
      ? 0
      : appStore.aaveV3_current_liquidation_threshold / status_value.value;
  if (estimate_health_factor >= appStore.health_factor_safe) {
    return "success";
  } else if (estimate_health_factor >= appStore.health_factor_risky) {
    return "warning";
  } else if (estimate_health_factor > 1) {
    return "error";
  } else {
    return "red";
  }
});

const amountSupply = ref("");
const amountSupplyUsd = computed(() => {
  if (isNaN(parseFloat(amountSupply.value))) {
    return 0;
  } else if (selectedToken.value == "usdc") {
    return parseFloat(amountSupply.value) * appStore.price_usdc_aave;
  } else if (selectedToken.value == "eth") {
    return parseFloat(amountSupply.value) * appStore.price_eth_aave;
  } else if (selectedToken.value == "btc") {
    return parseFloat(amountSupply.value) * appStore.price_btc_aave;
  } else {
    return 0;
  }
});

function enterDetect(e: KeyboardEvent): void {
  if (e.key == "-" || e.key == "+" || e.key.toLocaleLowerCase() == "e") {
    e.preventDefault();
  }
}
const amountSupplyValid = ref(false);
watch(amountSupply, (newVal) => {
  if (parseFloat(newVal) < 0) {
    amountSupply.value = "0";
  }
  if (
    parseFloat(newVal) <= 0 ||
    parseFloat(newVal) > tokenBalance.value ||
    isNaN(parseFloat(newVal))
  ) {
    amountSupplyValid.value = false;
  } else {
    amountSupplyValid.value = true;
  }
});

const btn_disabled = computed(() => {
  return !amountSupplyValid.value || gasFee.value == "";
});
watch(btn_disabled, () => {
  getGasFee();
});
function setMax() {
  amountSupply.value = tokenBalance.value.toString();
}

const gasFee = ref("");
const gasFeeUsd = ref("");
async function getGasFee() {
  if (amountSupplyValid.value && selectedToken.value != "") {
    let tokenAddr = "";
    let amount = "";
    if (selectedToken.value == "usdc") {
      tokenAddr = appStore.USDC;
      amount = BigNumber(amountSupply.value).multipliedBy(1e6).toString();
    } else if (selectedToken.value == "eth") {
      tokenAddr = appStore.WETH;
      amount = BigNumber(amountSupply.value).multipliedBy(1e18).toString();
    } else if (selectedToken.value == "btc") {
      tokenAddr = appStore.WBTC;
      amount = BigNumber(amountSupply.value).multipliedBy(1e8).toString();
    }

    const web3 = new Web3(wallet.provider as any);

    const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
    // supply Token
    doughV1DsaContract.methods.doughCall(1, 0, tokenAddr, tokenAddr, amount, false).estimateGas({ from: address.value })
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
.btnSupply {
  width: 119px !important;
  height: 52px !important;
  border-radius: 10px !important;
  background: white !important;
  color: black !important;
  font-weight: 400 !important;
  font-size: 16px !important;
  text-decoration: none;
}

.tokenBalance {
  height: 111px;
  background: #1e1e1e;
  padding-left: 50px !important;
  border-radius: 10px !important;
  border-width: 1px !important;
}

.amountToken {
  margin-top: 35px !important;
  padding-top: 46px !important;
  padding-bottom: 34px !important;
  padding-left: 40px !important;
  padding-right: 20px !important;
  background: #00c797;
  border: solid;
  border-radius: 10px;
  border-width: 1px;
  border-color: #00c797;
}

input::placeholder {
  color: white;
  font-weight: 400 !important;
  font-size: 18px !important;
}

.containerSupplyInput {
  margin: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  padding-left: 52px !important;
  padding-right: 52px !important;
}

.containerSupplyInputMobile {
  margin: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.supplyTokenBalanceShow {
  height: 111px;
  background: #1e1e1e;
  padding-left: 50px !important;
  padding-right: 38px !important;
  border: solid;
  border-color: #1e1e1e;
  border-radius: 10px !important;
  border-width: 0px !important;
}

.supplyTokenBalanceShowMobile {
  height: 83px;
  background: #1e1e1e;
  padding-left: 18px !important;
  padding-right: 18px !important;
  border: solid;
  border-color: #1e1e1e;
  border-radius: 6px !important;
  border-width: 0px !important;
  margin-top: 20px;
}

.amountToken {
  margin-top: 35px !important;
  padding-top: 46px !important;
  padding-bottom: 34px !important;
  padding-left: 40px !important;
  padding-right: 20px !important;
  background: #00c797;
  border: solid;
  border-radius: 10px;
  border-width: 1px;
  border-color: #00c797;
}

.amountTokenMobile {
  margin-top: 25px !important;
  padding-top: 32px !important;
  padding-bottom: 20px !important;
  padding-left: 18px !important;
  padding-right: 18px !important;
  background: #00c797;
  border: solid;
  border-radius: 6px;
  border-width: 1px;
  border-color: #00c797;
}
</style>
