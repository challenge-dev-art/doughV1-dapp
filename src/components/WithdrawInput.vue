<template>
  <div>
    <v-dialog v-model="dialogWithdrawAave" :max-width="appStore.isMobile ? 5000 : 647"
      :fullscreen="appStore.isMobile ? true : false"
      :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 3;">
      <template v-slot:activator="{ props }">
        <!-- Withdraw Button - Desktop -->
        <v-btn v-if="!appStore.isMobile" v-bind="props" :disabled="btnDisable" class="text-none btnWithdraw"
          @click="initInputInfo">Withdraw</v-btn>
        <!-- Withdraw Button - Mobile -->
        <v-sheet v-else v-bind="props" class="d-flex align-center btnWithdrawMobile" @click="initInputInfo">
          <div class="d-flex me-auto align-center">
            <div>
              <v-img v-if="props_token.withdraw_token == 'usdc'" width="33" height="33" :src="TokenUsdc"></v-img>
              <v-img v-if="props_token.withdraw_token == 'eth'" width="33" height="33" :src="TokenEth"></v-img>
              <v-img v-if="props_token.withdraw_token == 'btc'" width="33" height="33" :src="TokenBtc"></v-img>
            </div>
            <div style="padding-left: 13px; text-align: start;">
              <p v-if="props_token.withdraw_token == 'usdc'"
                class="font-regular text-white text-weight-700 text-size-18px">USD Coin</p>
              <p v-if="props_token.withdraw_token == 'eth'"
                class="font-regular text-white text-weight-700 text-size-18px">
                Ethereum</p>
              <p v-if="props_token.withdraw_token == 'btc'"
                class="font-regular text-white text-weight-700 text-size-18px">
                Bitcoin</p>
              <p v-if="props_token.withdraw_token == 'usdc'" class="font-light text-white text-weight-400 text-size-16px">
                ${{ parseFloat((appStore.aaveV3Usdc_supply * appStore.price_usdc_aave).toFixed(2)) }}</p>
              <p v-if="props_token.withdraw_token == 'eth'" class="font-light text-white text-weight-400 text-size-16px">
                ${{ parseFloat((appStore.aaveV3Weth_supply * appStore.price_eth_aave).toFixed(2)) }}</p>
              <p v-if="props_token.withdraw_token == 'btc'" class="font-light text-white text-weight-400 text-size-16px">
                ${{ parseFloat((appStore.aaveV3Wbtc_supply * appStore.price_btc_aave).toFixed(2)) }}</p>
            </div>
          </div>
          <div>
            <p class="font-regular text-white text-weight-400 text-size-18px">
              {{ props_token.withdraw_token == 'usdc' ? parseFloat(appStore.aaveV3Usdc_supply.toFixed(6))
                : props_token.withdraw_token == 'eth' ? parseFloat(appStore.aaveV3Weth_supply.toFixed(6))
                  : props_token.withdraw_token == 'btc' ? parseFloat(appStore.aaveV3Wbtc_supply.toFixed(6)) : 0
              }}&nbsp;&nbsp;{{ props_token.withdraw_token.toUpperCase() }}
            </p>
          </div>
        </v-sheet>
      </template>

      <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
        :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">

        <!-- Toolbar - Desktop -->
        <v-toolbar v-if="!appStore.isMobile" dark color="black">
          <v-spacer></v-spacer>
          <v-btn icon variant="plain" dark @click="dialogWithdrawAave = false">
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
            @click="dialogWithdrawAave = false">
            <BackButton />
          </v-btn>
          <p class="font-bold text-white text-weight-700 text-size-22px">
            Withdraw {{ selectedToken.toUpperCase() }}</p>
        </v-card-title>

        <v-card-text class="ma-0 pa-0">
          <div style="text-align: center;">
            <v-container :class="appStore.isMobile ? 'containerWithdrawInputMobile' : 'containerWithdrawInput'">
              <!-- Token Balance -->
              <v-sheet
                :class="appStore.isMobile ? 'd-flex align-center withdrawTokenBalanceShowMobile' : 'd-flex align-center withdrawTokenBalanceShow'">
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

              <!-- Withdraw Token Amount -->
              <v-row no-gutters :class="appStore.isMobile ? 'amountTokenMobile' : 'amountToken'">
                <v-col align-self="center" style="text-align: start;">
                  <input v-model="amountWithdraw" type="number" @keypress="enterDetect" id="idWithdrawAave"
                    name="nameWithdrawAave" placeholder="Insert amount to withdraw" bg-color="#00C797" color="#FFFFFF"
                    class="font-regular text-white text-weight-700 text-size-25px" style="width: 100%;">
                </v-col>
                <v-col cols="3" align-self="center">
                  <v-btn class="font-regular text-none text-white text-weight-700 text-size-18px" variant="plain"
                    @click="setMax">
                    Set Max
                  </v-btn>
                </v-col>
              </v-row>

              <!-- Withdraw Address -->
              <div no-gutters
                :class="appStore.isMobile ? 'withdrawAddressMobile d-flex align-center' : 'withdrawAddress d-flex align-center'">
                {{ appStore.isMobile ? shortenAddress(appStore.dsa_address) : appStore.dsa_address }}&nbsp;&nbsp;&nbsp;
                <copy-button v-if="appStore.dsa_address != ''" :address="appStore.dsa_address" />
              </div>

              <!-- Deposit Confirm Button -->
              <v-row no-gutters :style="appStore.isMobile ? 'margin-top: 25px;' : 'margin-top: 33px;'">
                <withdraw-confirm :selected_token="selectedToken"
                  :withdraw_amount="isNaN(parseFloat(amountWithdraw)) ? 0 : parseFloat(amountWithdraw)"
                  :to_address="appStore.dsa_address" :gas_fee="gasFee" :gas_fee_usd="gasFeeUsd"
                  :btn_disable="btn_disabled" style="width: 100%" />
              </v-row>

              <!-- Gas Fee -->
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
                :style="appStore.isMobile ? 'margin-top: 180px;' : 'margin-top: 114px; margin-bottom: 30px;'">
                <v-spacer></v-spacer>
                <p class="font-regular text-white text-weight-400 text-size-16px">
                  <a href="#">View</a> history. Read our <a :href="appStore.doc_url_withdraw" target="_blank">Docs</a> on
                  Withdrawals.
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
  withdraw_token: {
    type: String,
    required: true,
  },
});

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import LayoutHeader from "./LayoutHeader.vue";
import WithdrawConfirm from "./WithdrawConfirm.vue";
import BackButton from "../assets/backBtn.svg";
import TokenUsdc from "../assets/usdc.png";
import TokenEth from "../assets/eth.png";
import TokenBtc from "../assets/btc.png";
import CopyButton from './CopyButton.vue'

import Web3 from "web3";

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

const dialogWithdrawAave = ref(false);
// const dialogWithdraw_confirm = ref(false);
const reqTimer = ref();
onMounted(() => {
  reqTimer.value = setInterval(() => {
    if (dialogWithdrawAave.value) {
      getGasFee();
    }
  }, 5000);
});

function initInputInfo() {
  selectedToken.value = props_token.withdraw_token;
  amountWithdraw.value = "";
}

const btnDisable = computed(() => {
  switch (props_token.withdraw_token) {
    case "usdc":
      return appStore.aaveV3Usdc_supply == 0 ? true : false;
    case "eth":
      return appStore.aaveV3Weth_supply == 0 ? true : false;
    case "btc":
      return appStore.aaveV3Wbtc_supply == 0 ? true : false;
    default:
      return true;
  }
});

const selectedToken = ref(props_token.withdraw_token);

const tokenBalance = computed(() => {
  return selectedToken.value == "usdc"
    ? appStore.aaveV3Usdc_supply
    : selectedToken.value == "eth"
      ? appStore.aaveV3Weth_supply
      : selectedToken.value == "btc"
        ? appStore.aaveV3Wbtc_supply
        : 0;
});

// const addressWithdraw = ref("");
const amountWithdraw = ref("");
function enterDetect(e: KeyboardEvent): void {
  if (e.key == "-" || e.key == "+" || e.key.toLocaleLowerCase() == "e") {
    e.preventDefault();
  }
}
const amountWithdrawValid = ref(false);
watch(amountWithdraw, (newVal) => {
  if (parseFloat(newVal) < 0) {
    amountWithdraw.value = "0";
  }
  if (
    parseFloat(newVal) <= 0 ||
    parseFloat(newVal) > tokenBalance.value ||
    isNaN(parseFloat(newVal))
  ) {
    amountWithdrawValid.value = false;
  } else {
    amountWithdrawValid.value = true;
  }
});

const btn_disabled = computed(() => {
  return !amountWithdrawValid.value || gasFee.value == "";
});
watch(btn_disabled, () => {
  getGasFee();
});
function setMax() {
  if (selectedToken.value == "usdc") {
    amountWithdraw.value = appStore.aaveV3Usdc_supply.toString();
  } else if (selectedToken.value == "eth") {
    amountWithdraw.value = appStore.aaveV3Weth_supply.toString();
  } else if (selectedToken.value == "btc") {
    amountWithdraw.value = appStore.aaveV3Wbtc_supply.toString();
  } else {
    amountWithdraw.value = "";
  }
}

const gasFee = ref("");
const gasFeeUsd = ref("");
async function getGasFee() {
  if (
    amountWithdrawValid.value &&
    selectedToken.value != ""
  ) {
    let tokenAddr = "";
    let amount = "";
    let opt = false;
    if (selectedToken.value == "usdc") {
      tokenAddr = appStore.USDC;
      amount = BigNumber(amountWithdraw.value).multipliedBy(1e6).toString();
      if (parseFloat(amountWithdraw.value) > appStore.aaveV3Usdc_supply * appStore.closeOptLimit) {
        opt = true;
      }
    } else if (selectedToken.value == "eth") {
      tokenAddr = appStore.WETH;
      amount = BigNumber(amountWithdraw.value).multipliedBy(1e18).toString();
      if (parseFloat(amountWithdraw.value) > appStore.aaveV3Weth_supply * appStore.closeOptLimit) {
        opt = true;
      }
    } else if (selectedToken.value == "btc") {
      tokenAddr = appStore.WBTC;
      amount = BigNumber(amountWithdraw.value).multipliedBy(1e8).toString();
      if (parseFloat(amountWithdraw.value) > appStore.aaveV3Wbtc_supply * appStore.closeOptLimit) {
        opt = true;
      }
    }
    const withdraw_amount = parseInt(amount).toString();

    const web3 = new Web3(wallet.provider as any);

    const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
    // withdraw Token
    doughV1DsaContract.methods.doughCall(1, 1, tokenAddr, tokenAddr, withdraw_amount, opt).estimateGas({ from: address.value })
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

.btnWithdrawMobile {
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

.tokenBalance {
  height: 111px;
  background: #1e1e1e;
  padding-left: 50px !important;
  border-radius: 10px !important;
  border-width: 1px !important;
}

.withdrawAddress {
  height: 111px;
  background: #1e1e1e;
  margin-top: 35px !important;
  /* padding-top: 20px !important;
  padding-bottom: 34px !important; */
  padding-left: 40px !important;
  padding-right: 20px !important;
  border-radius: 10px !important;
  border-width: 1px !important;
}

.withdrawAddressMobile {
  height: 83px;
  background: #1e1e1e;
  margin-top: 25px !important;
  /* padding-top: 10px !important;
  padding-bottom: 20px !important; */
  padding-left: 18px !important;
  padding-right: 0px !important;
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

.containerWithdrawInput {
  margin: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  padding-left: 52px !important;
  padding-right: 52px !important;
}

.containerWithdrawInputMobile {
  margin: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.btnConfirmWithdraw {
  width: 100% !important;
  height: 52px !important;
  border: solid !important;
  border-width: 1px !important;
  border-radius: 10px !important;
  border-color: #1e1e1e !important;
  background: #1e1e1e !important;
}

input::placeholder {
  color: white;
  font-weight: 400 !important;
  font-size: 18px !important;
}

.withdrawTokenBalanceShow {
  height: 111px;
  background: #1e1e1e;
  padding-left: 50px !important;
  padding-right: 38px !important;
  border: solid;
  border-color: #1e1e1e;
  border-radius: 10px !important;
  border-width: 0px !important;
}

.withdrawTokenBalanceShowMobile {
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
</style>
