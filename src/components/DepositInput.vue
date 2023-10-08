<template>
  <div>
    <v-dialog v-model="dialogDeposit" :max-width="appStore.isMobile ? 5000 : 647"
      :fullscreen="appStore.isMobile ? true : false"
      :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 3;">
      <template v-slot:activator="{ props }">
        <!-- Deposit Button - Desktop -->
        <v-btn v-if="!appStore.isMobile" v-bind="props" :disabled="btnDisable" class="text-none btnDeposit"
          @click="initInputInfo">Deposit</v-btn>
        <!-- Deposit Button - Mobile -->
        <v-sheet v-else v-bind="props" class="d-flex align-center btnDepositMobile" @click="initInputInfo">
          <div class="d-flex me-auto align-center">
            <div>
              <v-img v-if="props_token.deposit_token == 'usdc'" width="33" height="33" :src="TokenUsdc"></v-img>
              <v-img v-if="props_token.deposit_token == 'eth'" width="33" height="33" :src="TokenEth"></v-img>
              <v-img v-if="props_token.deposit_token == 'btc'" width="33" height="33" :src="TokenBtc"></v-img>
            </div>
            <div style="padding-left: 13px; text-align: start;">
              <p v-if="props_token.deposit_token == 'usdc'"
                class="font-regular text-white text-weight-700 text-size-18px">USD Coin</p>
              <p v-if="props_token.deposit_token == 'eth'" class="font-regular text-white text-weight-700 text-size-18px">
                Ethereum</p>
              <p v-if="props_token.deposit_token == 'btc'" class="font-regular text-white text-weight-700 text-size-18px">
                Bitcoin</p>
              <p v-if="props_token.deposit_token == 'usdc'" class="font-light text-white text-weight-400 text-size-16px">
                ${{ parseFloat((appStore.wallet_usdc_balance * appStore.price_usdc_aave).toFixed(2)) }}</p>
              <p v-if="props_token.deposit_token == 'eth'" class="font-light text-white text-weight-400 text-size-16px">
                ${{ parseFloat((appStore.wallet_eth_balance * appStore.price_eth_aave).toFixed(2)) }}</p>
              <p v-if="props_token.deposit_token == 'btc'" class="font-light text-white text-weight-400 text-size-16px">
                ${{ parseFloat((appStore.wallet_wbtc_balance * appStore.price_btc_aave).toFixed(2)) }}</p>
            </div>
          </div>
          <div>
            <p class="font-regular text-white text-weight-400 text-size-18px">
              {{ props_token.deposit_token == 'usdc' ? parseFloat(appStore.wallet_usdc_balance.toFixed(6))
                : props_token.deposit_token == 'eth' ? parseFloat(appStore.wallet_eth_balance.toFixed(6))
                  : props_token.deposit_token == 'btc' ? parseFloat(appStore.wallet_wbtc_balance.toFixed(6)) : 0
              }}&nbsp;&nbsp;{{ props_token.deposit_token.toUpperCase() }}
            </p>
          </div>
        </v-sheet>
      </template>

      <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
        :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">

        <!-- Toolbar - Desktop -->
        <v-toolbar v-if="!appStore.isMobile" dark color="black">
          <v-spacer></v-spacer>
          <v-btn icon variant="plain" dark @click="dialogDeposit = false">
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
            @click="dialogDeposit = false">
            <BackButton />
          </v-btn>
          <p class="font-bold text-white text-weight-700 text-size-22px">
            Deposit {{ selectedToken.toUpperCase() }} ( DSA )</p>
        </v-card-title>

        <v-card-text class="ma-0 pa-0">
          <div style="text-align: center;">
            <v-container :class="appStore.isMobile ? 'containerDepositInputMobile' : 'containerDepositInput'">

              <!-- Token Balance -->
              <v-sheet
                :class="appStore.isMobile ? 'd-flex align-center depositTokenBalanceShowMobile' : 'd-flex align-center depositTokenBalanceShow'">
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
                  <input v-model="amountDeposit" type="number" id="idDeposit" name="nameDeposit" @keypress="enterDetect"
                    placeholder="Insert amount to deposit" bg-color="#00C797" color="#FFFFFF"
                    class="font-regular text-white text-weight-700 text-size-25px" style="width: 100%;">
                </v-col>
                <v-col cols="3" align-self="center">
                  <v-btn class="font-regular text-none text-white text-weight-700 text-size-18px" variant="plain"
                    @click="setMax">
                    Set Max
                  </v-btn>
                </v-col>
              </v-row>

              <!-- Deposit Confirm Button -->
              <v-row no-gutters :style="appStore.isMobile ? 'margin-top: 25px;' : 'margin-top: 33px;'">
                <deposit-confirm :selected_token="selectedToken"
                  :deposit_amount="isNaN(parseFloat(amountDeposit)) ? 0 : parseFloat(amountDeposit)" :gas_fee="gasFee"
                  :gas_fee_usd="gasFeeUsd" :btn_disable="btn_disabled" style="width: 100%" />
              </v-row>

              <!-- Gas Fee -->
              <!-- <v-row no-gutters style="margin-top: 47px">
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
              </v-row> -->

              <v-row no-gutters
                :style="appStore.isMobile ? 'margin-top: 290px;' : 'margin-top: 330px; margin-bottom: 30px;'">
                <v-spacer></v-spacer>
                <p class="font-regular text-white text-weight-400 text-size-16px">
                  <a href="#">View</a> history. Read our <a :href="appStore.doc_url_deposit" target="_blank">Docs</a> on
                  Deposits.
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
  deposit_token: {
    type: String,
    required: true,
  },
});

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import LayoutHeader from "./LayoutHeader.vue";
import DepositConfirm from "./DepositConfirm.vue";
import BackButton from "../assets/backBtn.svg";
import TokenUsdc from "../assets/usdc.png";
import TokenEth from "../assets/eth.png";
import TokenBtc from "../assets/btc.png";

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

const dialogDeposit = ref(false);
const reqTimer = ref();
onMounted(() => {
  // reqTimer.value = setInterval(() => {
  //   if (dialogDeposit.value) {
  //     getGasFee();
  //   }
  // }, 5000);
});

function initInputInfo() {
  selectedToken.value = props_token.deposit_token;
  amountDeposit.value = "";
  appStore.getWalletAssets(address.value, wallet.provider);
}

const btnDisable = computed(() => {
  switch (props_token.deposit_token) {
    case "usdc":
      return appStore.wallet_usdc_balance == 0 ? true : false;
    case "eth":
      return appStore.wallet_eth_balance == 0 ? true : false;
    case "btc":
      return appStore.wallet_wbtc_balance == 0 ? true : false;
    default:
      return true;
  }
});

const selectedToken = ref(props_token.deposit_token);
const suffixToken = computed(() => {
  return selectedToken.value == "usdc"
    ? "USDC"
    : selectedToken.value == "eth"
      ? "ETH"
      : selectedToken.value == "btc"
        ? "BTC"
        : "";
});

const tokenBalance = computed(() => {
  return selectedToken.value == "usdc"
    ? appStore.wallet_usdc_balance
    : selectedToken.value == "eth"
      ? appStore.wallet_eth_balance
      : selectedToken.value == "btc"
        ? appStore.wallet_wbtc_balance
        : 0;
});

const amountDeposit = ref("");

function enterDetect(e: KeyboardEvent): void {
  if (e.key == "-" || e.key == "+" || e.key.toLocaleLowerCase() == "e") {
    e.preventDefault();
  }
}
const amountDepositValid = ref(false);
watch(amountDeposit, (newVal) => {
  if (parseFloat(newVal) < 0) {
    amountDeposit.value = "0";
  }
  if (
    parseFloat(newVal) <= 0 ||
    parseFloat(newVal) > tokenBalance.value ||
    isNaN(parseFloat(newVal))
  ) {
    amountDepositValid.value = false;
  } else {
    amountDepositValid.value = true;
  }
});

const btn_disabled = computed(() => {
  return !amountDepositValid.value;
});
// watch(btn_disabled, () => {
//   getGasFee();
// });
function setMax() {
  if (selectedToken.value == "usdc") {
    amountDeposit.value = appStore.wallet_usdc_balance.toString();
  } else if (selectedToken.value == "eth") {
    amountDeposit.value = appStore.wallet_eth_balance.toString();
  } else if (selectedToken.value == "btc") {
    amountDeposit.value = appStore.wallet_wbtc_balance.toString();
  } else {
    amountDeposit.value = "";
  }
}

const gasFee = ref("0");
const gasFeeUsd = ref("0");
// async function getGasFee() {
//   if (amountDepositValid.value && selectedToken.value != "") {
//     let tokenAddr = "";
//     let amount = "";
//     if (selectedToken.value == "usdc") {
//       tokenAddr = appStore.USDC;
//       amount = BigNumber(amountDeposit.value).multipliedBy(1e6).toString();
//     } else if (selectedToken.value == "eth") {
//       tokenAddr = appStore.ETH;
//       amount = BigNumber(amountDeposit.value).multipliedBy(1e18).toString();
//     } else if (selectedToken.value == "btc") {
//       tokenAddr = appStore.WBTC;
//       amount = BigNumber(amountDeposit.value).multipliedBy(1e8).toString();
//     }

//     const web3 = new Web3(wallet.provider as any);

//     const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
//     // deposit Token
//     doughV1DsaContract.methods.doughCall(0, tokenAddr == appStore.ETH ? 0 : 1, tokenAddr, tokenAddr, amount, false).estimateGas({ from: address.value, value: tokenAddr == appStore.ETH ? amount : "0" })
//       .then(async (gas: any) => {
//         console.log("gas: ", gas)
//         const gas_price = await web3.eth.getGasPrice();
//         const gasPriceInGwei = web3.utils.fromWei(gas_price, "gwei");
//         // console.log("gas_price: ", gasPriceInGwei);

//         gasFee.value = BigNumber(gas ?? 0)
//           .multipliedBy(gasPriceInGwei)
//           .dividedBy(1000000000)
//           .toFixed(5);
//         gasFeeUsd.value = BigNumber(gas ?? 0)
//           .multipliedBy(gasPriceInGwei)
//           .dividedBy(1000000000)
//           .multipliedBy(appStore.price_eth_aave)
//           .toFixed(2);
//         console.log("gasFee: ", gasFee)
//       })
//       .catch((error: any) => {
//         gasFee.value = "";
//         gasFeeUsd.value = "";
//       })
//   } else {
//     gasFee.value = "";
//     gasFeeUsd.value = "";
//   }
// }
</script>

<style>
.btnDeposit {
  width: 119px !important;
  height: 52px !important;
  border-radius: 10px !important;
  background: white !important;
  color: black !important;
  font-weight: 400 !important;
  font-size: 16px !important;
  text-decoration: none;
}

.btnDepositMobile {
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

.btnDepositMobileMouseDown {
  width: 100% !important;
  height: 83px !important;
  margin-top: 25px;
  border-radius: 6px !important;
  padding-left: 18px !important;
  padding-right: 17px !important;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  background: #00C797 !important;
  color: black !important;
}

.depositTokenBalanceShow {
  height: 111px;
  background: #1e1e1e;
  padding-left: 50px !important;
  padding-right: 38px !important;
  border: solid;
  border-color: #1e1e1e;
  border-radius: 10px !important;
  border-width: 0px !important;
}

.depositTokenBalanceShowMobile {
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

.containerDepositInput {
  margin: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  padding-left: 52px !important;
  padding-right: 52px !important;
}

.containerDepositInputMobile {
  margin: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}

.btnConfirmDeposit {
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

input:focus {
  outline: none !important;
  border: none !important;
}

input::-webkit-inner-spin-button,
input::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>
