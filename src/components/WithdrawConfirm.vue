<template>
  <div>
    <v-dialog v-model="dialogWithdraw" :max-width="appStore.isMobile ? 5000 : 647"
      :fullscreen="appStore.isMobile ? true : false"
      :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 4;">
      <template v-slot:activator="{ props }">
        <!-- Withdraw Confirm Button - Desktop -->
        <v-btn v-if="!appStore.isMobile" v-bind="props"
          class="btnConfirmWithdraw text-none font-regular text-white text-weight-700 text-size-16px"
          :disabled="props_info.btn_disable">Confirm Withdrawal</v-btn>
        <!-- Withdraw Confirm Button - Mobile -->
        <v-btn v-else v-bind="props"
          class="btnConfirmWithdrawMobile text-none font-regular text-white text-weight-700 text-size-15px"
          :disabled="props_info.btn_disable">Confirm Withdrawal</v-btn>
      </template>

      <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
        :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">

        <!-- Toolbar - Desktop -->
        <v-toolbar v-if="!appStore.isMobile" dark color="black">
          <v-spacer></v-spacer>
          <v-btn icon variant="plain" dark @click="dialogWithdraw = false">
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
            @click="dialogWithdraw = false">
            <BackButton />
          </v-btn>
          <p class="font-bold text-white text-weight-700 text-size-22px">
            Withdraw {{ props_info.selected_token.toUpperCase() }}</p>
        </v-card-title>

        <v-card-text class="ma-0 pa-0">
          <div style="text-align: center;">

            <!-- Summary -->
            <p class="font-regular text-white text-weight-700 text-size-18px">Summary</p>

            <v-container :class="appStore.isMobile ? 'containerWithdrawConfirmMobile' : 'containerWithdrawConfirm'">
              <!-- Selected Token -->
              <v-row :style="appStore.isMobile ? 'margin-top: 15px;' : 'margin-top: 20px;'">
                <v-col :cols="appStore.isMobile ? 6 : 4" align-self="center" style="text-align: start;">
                  <p class="font-regular text-white text-weight-400 text-size-18px">Selected Token</p>
                </v-col>
                <v-col v-if="!appStore.isMobile" cols="4"></v-col>
                <v-col :cols="appStore.isMobile ? 6 : 4" style="text-align: start;" align-self="center">
                  <div v-if="props_info.selected_token == 'eth'">
                    <p class="font-regular text-white text-weight-700 text-size-18px">Ethereum</p>
                    <p class="font-regular text-white text-weight-400 text-size-18px">ETH</p>
                  </div>
                  <div v-if="props_info.selected_token == 'usdc'">
                    <p class="font-regular text-white text-weight-700 text-size-18px">USD Coin</p>
                    <p class="font-regular text-white text-weight-400 text-size-18px">USDC</p>
                  </div>
                  <div v-if="props_info.selected_token == 'btc'">
                    <p class="font-regular text-white text-weight-700 text-size-18px">Bitcoin</p>
                    <p class="font-regular text-white text-weight-400 text-size-18px">BTC</p>
                  </div>
                </v-col>
              </v-row>
              <!-- Withdraw Amount -->
              <v-row class="mt-5">
                <v-col :cols="appStore.isMobile ? 6 : 4" align-self="center" style="text-align: start;">
                  <p class="font-regular text-white text-weight-400 text-size-18px">Withdrawal Amount</p>
                </v-col>
                <v-col v-if="!appStore.isMobile" cols="4"></v-col>
                <v-col :cols="appStore.isMobile ? 6 : 4" style="text-align: start;" align-self="center">
                  <p class="font-regular text-white text-weight-700 text-size-18px">
                    {{ props_info.withdraw_amount }} {{ props_info.selected_token.toUpperCase() }}
                  </p>
                </v-col>
              </v-row>
              <!-- Withdraw Address -->
              <v-row class="mt-5">
                <v-col :cols="appStore.isMobile ? 6 : 4" align-self="center" style="text-align: start;">
                  <p class="font-regular text-white text-weight-400 text-size-18px">To Dsa</p>
                </v-col>
                <v-col v-if="!appStore.isMobile" cols="4"></v-col>
                <v-col :cols="appStore.isMobile ? 6 : 4" style="text-align: start;" align-self="center">
                  <p class="font-regular text-white text-weight-700 text-size-18px">
                    {{ shortenAddress(props_info.to_address) }}
                    <copy-button v-if="appStore.dsa_address != ''" :address="appStore.dsa_address" />
                  </p>
                </v-col>
              </v-row>
              <!-- Gas Fee -->
              <v-row class="mt-5">
                <v-col :cols="appStore.isMobile ? 6 : 4" align-self="center" style="text-align: start;">
                  <p class="font-regular text-white text-weight-400 text-size-18px">Gas Fee</p>
                </v-col>
                <v-col v-if="!appStore.isMobile" cols="4"></v-col>
                <v-col :cols="appStore.isMobile ? 6 : 4" style="text-align: start;" align-self="center">
                  <p class="font-regular text-white text-weight-400 text-size-18px">
                    {{ props_info.gas_fee }} {{ props_info.gas_fee == '' ? '' : 'ETH' }}
                  </p>
                  <p class="font-regular text-white text-weight-400 text-size-16px ml-5">
                    {{ props_info.gas_fee_usd == '' ? '' : '$' }}
                    {{ props_info.gas_fee_usd }}
                  </p>
                </v-col>
              </v-row>

              <!-- Confirm Dialog -->
              <v-row no-gutters style="margin-top: 30px;">
                <v-dialog v-model="dialogWithdrawResult" :max-width="appStore.isMobile ? 5000 : 647"
                  :fullscreen="appStore.isMobile ? true : false"
                  :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" persistent
                  style="z-index: 5;">
                  <template v-slot:activator="{ props }">
                    <!-- Confirm Button -->
                    <v-btn v-bind="props"
                      :class="appStore.isMobile ? 'btnConfirmWithdrawMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmWithdraw text-none font-regular text-white text-weight-700 text-size-16px'"
                      @click="actionWithdraw">
                      Confirm Withdrawal
                    </v-btn>
                  </template>

                  <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                    :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">
                    <!-- Toolbar - Desktop -->
                    <v-toolbar v-if="!appStore.isMobile" dark color="black">
                      <v-spacer></v-spacer>
                      <v-btn icon variant="plain" dark @click="closeDialogWithdraw" :disabled="!actionWithdrawDone">
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <!-- Toolbar - Mobile -->
                    <div v-if="appStore.isMobile">
                      <layout-header />
                    </div>

                    <v-card-text class="ma-0 pa-0">
                      <div style="text-align: center;">
                        <v-container
                          :class="appStore.isMobile ? 'containerWithdrawConfirmMobile' : 'containerWithdrawConfirm'">
                          <!-- Banner -->
                          <v-row>
                            <v-spacer></v-spacer>
                            <v-img :width="appStore.isMobile ? 346 : 454" :height="appStore.isMobile ? 267 : 350"
                              :src="WithdrawResultBanner"
                              :style="appStore.isMobile ? 'margin-top: 72px;' : 'margin-top: 10px;'"></v-img>
                            <v-spacer></v-spacer>
                          </v-row>
                          <!-- Circle Progress -->
                          <div v-if="!actionWithdrawDone"
                            style="width: 100%; height: 105px; margin-top: 10px; padding:30px;">
                            <v-progress-circular indeterminate></v-progress-circular>
                          </div>

                          <p v-if="withdraw_success"
                            :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-25px' : 'font-regular text-white text-weight-700 text-size-35px'"
                            style="width: 100%; margin-top: 10px">
                            {{ result_text }}
                          </p>

                          <!-- New Balance -->
                          <p :class="appStore.isMobile ? 'font-regular text-white text-weight-400 text-size-17px' : 'font-regular text-white text-weight-400 text-size-18px'"
                            style="width: 100%; text-align: start; padding-left: 5px;">
                            Your New Balance
                          </p>
                          <v-sheet
                            :class="appStore.isMobile ? 'd-flex align-center newBalanceWithdrawMobile' : 'd-flex align-center newBalanceWithdraw'">
                            <div class="d-flex me-auto align-center">
                              <div v-if="appStore.isMobile">
                                <v-img v-if="props_info.selected_token == 'usdc'" width="33" height="33"
                                  :src="TokenUsdc"></v-img>
                                <v-img v-if="props_info.selected_token == 'eth'" width="33" height="33"
                                  :src="TokenEth"></v-img>
                                <v-img v-if="props_info.selected_token == 'btc'" width="33" height="33"
                                  :src="TokenBtc"></v-img>
                              </div>
                              <div v-else>
                                <v-img v-if="props_info.selected_token == 'usdc'" width="58" height="58"
                                  :src="TokenUsdc"></v-img>
                                <v-img v-if="props_info.selected_token == 'eth'" width="58" height="58"
                                  :src="TokenEth"></v-img>
                                <v-img v-if="props_info.selected_token == 'btc'" width="58" height="58"
                                  :src="TokenBtc"></v-img>
                              </div>
                              <div style="padding-left: 13px; text-align: start;">
                                <p
                                  :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-17px' : 'font-regular text-white text-weight-700 text-size-18px'">
                                  {{ props_info.selected_token == 'usdc' ? 'USD Coin'
                                    : props_info.selected_token == 'eth' ? 'Ethereum'
                                      : props_info.selected_token == 'btc' ? 'Bitcoin' : ''
                                  }}
                                </p>
                                <p v-if="props_info.selected_token == 'usdc'"
                                  :class="appStore.isMobile ? 'font-light text-white text-weight-300 text-size-14px' : 'font-light text-white text-weight-400 text-size-16px'">
                                  ${{ parseFloat((appStore.aaveV3Usdc_supply * appStore.price_usdc_aave).toFixed(2)) }}
                                </p>
                                <p v-if="props_info.selected_token == 'eth'"
                                  :class="appStore.isMobile ? 'font-light text-white text-weight-300 text-size-14px' : 'font-light text-white text-weight-400 text-size-16px'">
                                  ${{ parseFloat((appStore.aaveV3Weth_supply * appStore.price_eth_aave).toFixed(2)) }}</p>
                                <p v-if="props_info.selected_token == 'btc'"
                                  :class="appStore.isMobile ? 'font-light text-white text-weight-300 text-size-14px' : 'font-light text-white text-weight-400 text-size-16px'">
                                  ${{ parseFloat((appStore.aaveV3Wbtc_supply * appStore.price_btc_aave).toFixed(2)) }}</p>
                              </div>
                            </div>
                            <div>
                              <p
                                :class="appStore.isMobile ? 'font-regular text-white text-weight-400 text-size-17px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                {{ props_info.selected_token == 'usdc' ? parseFloat(appStore.aaveV3Usdc_supply.toFixed(6))
                                  : props_info.selected_token == 'eth' ? parseFloat(appStore.aaveV3Weth_supply.toFixed(6))
                                    : props_info.selected_token == 'btc' ? parseFloat(appStore.aaveV3Wbtc_supply.toFixed(6)) :
                                      0
                                }}&nbsp;&nbsp;{{ props_info.selected_token.toUpperCase() }}
                              </p>
                            </div>
                          </v-sheet>
                          <v-row no-gutters style="margin-top: 30px; margin-bottom: 130px;">
                            <v-btn variant="plain"
                              :class="appStore.isMobile ? 'btnConfirmDepositMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmDeposit text-none font-regular text-white text-weight-700 text-size-16px'"
                              @click="closeDialogWithdraw" :disabled="!actionWithdrawDone">
                              Back
                            </v-btn>
                          </v-row>
                        </v-container>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-dialog>

              </v-row>
              <v-row no-gutters
                :style="appStore.isMobile ? 'margin-top: 270px;' : 'margin-top: 260px; margin-bottom: 30px;'">
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
const props_info = defineProps({
  selected_token: {
    type: String,
    required: true,
  },
  withdraw_amount: {
    type: Number,
    required: true,
  },
  to_address: {
    type: String,
    required: true,
  },
  gas_fee: {
    type: String,
    required: true,
  },
  gas_fee_usd: {
    type: String,
    required: true,
  },
  btn_disable: {
    type: Boolean,
    required: true,
  },
});

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import LayoutHeader from "./LayoutHeader.vue";
import CopyButton from './CopyButton.vue'
import BackButton from "../assets/backBtn.svg";
import WithdrawResultBanner from "../assets/withdrawRes.png";
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

const dialogWithdraw = ref(false);
const dialogWithdrawResult = ref(false);

function closeDialogWithdraw() {
  dialogWithdraw.value = false;
  dialogWithdrawResult.value = false;
}

const actionWithdrawDone = ref(false);
const withdraw_success = ref(false);
const result_text = ref("");
async function actionWithdraw() {
  //   tokenBalance.value = "";
  //   tokenUsdBalance.value = "";
  appStore.dlgSwapEnable = false;
  actionWithdrawDone.value = false;
  withdraw_success.value = false;
  result_text.value = "";
  try {
    //------- Start Withdraw ---------
    let tokenAddr = "";
    let amount = "";
    let opt = false;
    if (props_info.selected_token == "usdc") {
      tokenAddr = appStore.USDC;
      amount = BigNumber(props_info.withdraw_amount)
        .multipliedBy(1e6)
        .toString();
      if (props_info.withdraw_amount > appStore.aaveV3Usdc_supply * appStore.closeOptLimit) {
        opt = true;
      }
    } else if (props_info.selected_token == "eth") {
      tokenAddr = appStore.WETH;
      amount = BigNumber(props_info.withdraw_amount)
        .multipliedBy(1e18)
        .toString();
      if (props_info.withdraw_amount > appStore.aaveV3Weth_supply * appStore.closeOptLimit) {
        opt = true;
      }
    } else if (props_info.selected_token == "btc") {
      tokenAddr = appStore.WBTC;
      amount = BigNumber(props_info.withdraw_amount)
        .multipliedBy(1e8)
        .toString();
      if (props_info.withdraw_amount > appStore.aaveV3Wbtc_supply * appStore.closeOptLimit) {
        opt = true;
      }
    }

    const withdraw_amount = parseInt(amount).toString();

    const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
    // withdraw Token
    doughV1DsaContract.methods.doughCall(1, 1, tokenAddr, tokenAddr, withdraw_amount, opt).send({ from: address.value })
      .on('confirmation', async function (confirmationNumber: any, receipt: any) {
        if (confirmationNumber == appStore.confirmLimit) {
          await appStore.getWalletAssets(address.value, wallet.provider);
          result_text.value = "You have successfully withdrawn!";
          withdraw_success.value = true;
          actionWithdrawDone.value = true;
          appStore.dlgSwapEnable = true;
          console.log("withdraw Token receipt: ", receipt);
        }
      })
      .on('error', function (error: any) {
        result_text.value = "Failed!";
        withdraw_success.value = true;
        actionWithdrawDone.value = true;
        appStore.dlgSwapEnable = true;
        console.log("withdraw Token error: ", error);
      });
    //------- End Withdraw -----------
  } catch (error) {
    closeDialogWithdraw();
    console.log(error);
  }
}

// const tokenBalance = computed(() => {
//   if (props_info.selected_token == "usdc") {
//     return appStore.aaveV3Usdc_supply.toString();
//   } else if (props_info.selected_token == "eth") {
//     return appStore.aaveV3Weth_supply.toString();
//   } else if (props_info.selected_token == "btc") {
//     return appStore.aaveV3Wbtc_supply.toString();
//   } else {
//     return "";
//   }
// });
// const tokenUsdBalance = computed(() => {
//   if (props_info.selected_token == "usdc") {
//     return (appStore.aaveV3Usdc_supply * appStore.price_usdc_aave).toFixed(2);
//   } else if (props_info.selected_token == "eth") {
//     return (appStore.aaveV3Weth_supply * appStore.price_eth_aave).toFixed(2);
//   } else if (props_info.selected_token == "btc") {
//     return (appStore.aaveV3Wbtc_supply * appStore.price_btc_aave).toFixed(2);
//   } else {
//     return "";
//   }
// });
</script>

<style>
.btnConfirmWithdraw {
  width: 100px !important;
  height: 52px !important;
  border: solid !important;
  border-width: 1px !important;
  border-radius: 10px !important;
  border-color: #1e1e1e !important;
  background: #1e1e1e !important;
}

.btnConfirmWithdrawMobile {
  width: 100% !important;
  height: 35px !important;
  border: solid !important;
  border-width: 1px !important;
  border-radius: 5px !important;
  border-color: #1E1E1E !important;
  background: #1E1E1E !important;
}


.newBalanceWithdraw {
  height: 111px;
  background: #1E1E1E !important;
  padding-left: 35px !important;
  padding-right: 35px !important;
  border-radius: 10px !important;
}

.newBalanceWithdrawMobile {
  height: 83px;
  border-radius: 6px !important;
  padding-left: 18px !important;
  padding-right: 17px !important;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  background: #1E1E1E !important;
}

.containerWithdrawConfirm {
  margin: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  padding-left: 52px !important;
  padding-right: 52px !important;
}

.containerWithdrawConfirmMobile {
  margin: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 0px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>