<template>
    <div>
        <v-dialog v-model="dialogRepayConfig" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 4;">
            <template v-slot:activator="{ props }">
                <!-- Repay Confirm Button - Desktop -->
                <v-btn v-if="!appStore.isMobile" v-bind="props"
                    class="btnConfirmRepay text-none font-regular text-white text-weight-700 text-size-16px"
                    :disabled="props_info.btn_disable">Confirm Repay</v-btn>
                <!-- Repay Confirm Button - Mobile -->
                <v-btn v-else v-bind="props"
                    class="btnConfirmRepayMobile text-none font-regular text-white text-weight-700 text-size-15px"
                    :disabled="props_info.btn_disable">Confirm Repay</v-btn>
            </template>

            <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">

                <!-- Toolbar - Desktop -->
                <v-toolbar v-if="!appStore.isMobile" dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="dialogRepayConfig = false">
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
                        @click="dialogRepayConfig = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">
                        Repay</p>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">


                        <!-- Summary -->
                        <p class="font-regular text-white text-weight-700 text-size-18px">Summary</p>

                        <v-container :class="appStore.isMobile ? 'containerRepayConfirmMobile' : 'containerRepayConfirm'">
                            <!-- Selected Token -->
                            <v-row :style="appStore.isMobile ? 'margin-top: 15px;' : 'margin-top: 20px;'">
                                <v-col cols="7" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Selected Token</p>
                                </v-col>
                                <v-col cols="5" style="text-align: start;" align-self="center">
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
                            <v-row class="mt-5">
                                <v-col cols="7" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Amount to Repay</p>
                                </v-col>
                                <v-col cols="5" style="text-align: start;" align-self="center">
                                    <p class="font-regular text-white text-weight-700 text-size-18px">
                                        {{ props_info.repay_amount }} {{ props_info.selected_token.toUpperCase() }}
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row class="mt-5">
                                <v-col cols="7" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Total Borrowed Amount
                                    </p>
                                </v-col>
                                <v-col cols="5" style="text-align: start;" align-self="center">
                                    <p class="font-regular text-white text-weight-700 text-size-18px">
                                        ${{ appStore.aaveV3_total_debt_base.toFixed(6) }}
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row class="mt-5">
                                <v-col cols="7" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Interest Rate</p>
                                </v-col>
                                <v-col cols="5" style="text-align: start;" align-self="center">
                                    <p class="font-regular text-white text-weight-700 text-size-18px">Variable</p>
                                    <p class="font-regular text-white text-weight-400 text-size-18px">
                                        {{ props_info.selected_token == 'usdc' ?
                                            appStore.aaveV3UsdcVariableBorrowRate.toFixed(2) :
                                            props_info.selected_token == 'eth' ?
                                                appStore.aaveV3WethVariableBorrowRate.toFixed(2) :
                                                props_info.selected_token == 'btc' ?
                                                    appStore.aaveV3WbtcVariableBorrowRate.toFixed(2) : 0 }} %
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row class="mt-5">
                                <v-col cols="7" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Current Health Factor
                                    </p>
                                </v-col>
                                <v-col cols="5" style="text-align: start;" align-self="center">
                                    <p class="font-regular text-white text-weight-700 text-size-18px">
                                        {{ props_info.calc_health_factor.toFixed(2) }}
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row class="mt-5">
                                <v-col cols="7" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Previous Health Factor
                                    </p>
                                </v-col>
                                <v-col cols="5" style="text-align: start;" align-self="center">
                                    <p class="font-regular text-white text-weight-700 text-size-18px">
                                        {{ appStore.aaveV3_health_factor > 1000 ? "> 1000" :
                                            appStore.aaveV3_health_factor.toFixed(2) }}
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row class="mt-5">
                                <v-col cols="7" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Gas Fee</p>
                                </v-col>
                                <v-col cols="5" style="text-align: start;" align-self="center">
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
                                <v-dialog v-model="dialogRepayResult" :max-width="appStore.isMobile ? 5000 : 647"
                                    :fullscreen="appStore.isMobile ? true : false"
                                    :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" persistent
                                    style="z-index: 5;">
                                    <template v-slot:activator="{ props }">
                                        <!-- Confirm Button -->
                                        <v-btn v-bind="props"
                                            :class="appStore.isMobile ? 'btnConfirmRepayMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmRepay text-none font-regular text-white text-weight-700 text-size-16px'"
                                            @click="actionRepay">
                                            Confirm Repay
                                        </v-btn>
                                    </template>

                                    <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                                        :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">
                                        <!-- Toolbar - Desktop -->
                                        <v-toolbar v-if="!appStore.isMobile" dark color="black">
                                            <v-spacer></v-spacer>
                                            <v-btn icon variant="plain" dark @click="closeDialogRepay"
                                                :disabled="!actionRepayDone">
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
                                                    :class="appStore.isMobile ? 'containerRepayConfirmMobile' : 'containerRepayConfirm'">
                                                    <div :style="appStore.isMobile ? 'height: 0px;' : 'height: 60px;'">
                                                    </div>
                                                    <!-- Banner -->
                                                    <v-row>
                                                        <v-spacer></v-spacer>
                                                        <v-img :width="appStore.isMobile ? 222 : 304"
                                                            :height="appStore.isMobile ? 283 : 388" :src="RepayResultBanner"
                                                            :style="appStore.isMobile ? 'margin-top: 136px;' : 'margin-top: 10px;'"></v-img>
                                                        <v-spacer></v-spacer>
                                                    </v-row>
                                                    <!-- Circle Progress -->
                                                    <div v-if="!actionRepayDone"
                                                        style="width: 100%; height: 30px; margin-top: 10px; padding:30px;">
                                                        <v-progress-circular indeterminate></v-progress-circular>
                                                    </div>
                                                    <p v-if="repay_success"
                                                        :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-25px' : 'font-regular text-white text-weight-700 text-size-35px'"
                                                        style="width: 100%; height: 30px; margin-top: 10px">
                                                        {{ result_text }}
                                                    </p>
                                                    <v-row no-gutters style="margin-top: 35px; margin-bottom: 210px;">
                                                        <v-btn variant="plain"
                                                            :class="appStore.isMobile ? 'btnConfirmBorrowMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmBorrow text-none font-regular text-white text-weight-700 text-size-16px'"
                                                            @click="closeDialogRepay" :disabled="!actionRepayDone">
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
                                :style="appStore.isMobile ? 'margin-top: 40px;' : 'margin-top: 80px; margin-bottom: 30px;'">
                                <v-spacer></v-spacer>
                                <p class="font-regular text-white text-weight-400 text-size-16px">
                                    <a href="#">View</a> history. Read our <a :href="appStore.doc_url_repay"
                                        target="_blank">Docs</a> on Repaying.
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
    repay_amount: {
        type: Number,
        required: true,
    },
    calc_health_factor: {
        type: Number,
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
    }
});

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import LayoutHeader from "./LayoutHeader.vue";
import BackButton from '../assets/backBtn.svg'
import RepayResultBanner from "../assets/borrowRes.png";
import TokenUsdc from "../assets/usdc.png";
import TokenEth from "../assets/eth.png";
import TokenBtc from "../assets/btc.png";

import Web3 from "web3";
// import DSA from 'dsa-connect';

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

const dialogRepayConfig = ref(false);
const dialogRepayResult = ref(false);

function closeDialogRepay() {
    dialogRepayConfig.value = false;
    dialogRepayResult.value = false;
}

const actionRepayDone = ref(false);
const repay_success = ref(false)
const result_text = ref("");
async function actionRepay() {
    appStore.dlgSwapEnable = false;
    actionRepayDone.value = false;
    repay_success.value = false;
    try {
        //------- Start Repay ---------
        let tokenAddr = "";
        let amount = "";
        let opt = false;
        if (props_info.selected_token == "usdc") {
            tokenAddr = appStore.USDC;
            amount = BigNumber(props_info.repay_amount).multipliedBy(1e6).toString();
            if (props_info.repay_amount * appStore.price_usdc_aave > appStore.aaveV3_total_debt_base * appStore.closeOptLimit) {
                opt = true;
            }
        } else if (props_info.selected_token == "eth") {
            tokenAddr = appStore.WETH;
            amount = BigNumber(props_info.repay_amount).multipliedBy(1e18).toString();
            if (props_info.repay_amount * appStore.price_eth_aave > appStore.aaveV3_total_debt_base * appStore.closeOptLimit) {
                opt = true;
            }
        } else if (props_info.selected_token == "btc") {
            tokenAddr = appStore.WBTC;
            amount = BigNumber(props_info.repay_amount).multipliedBy(1e8).toString();
            if (props_info.repay_amount * appStore.price_btc_aave > appStore.aaveV3_total_debt_base * appStore.closeOptLimit) {
                opt = true;
            }
        }

        const web3 = new Web3(wallet.provider as any);

        const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
        // Repay Token
        doughV1DsaContract.methods.doughCall(1, 2, tokenAddr, tokenAddr, amount, opt).send({ from: address.value })
            .on('confirmation', async function (confirmationNumber: any, receipt: any) {
                if (confirmationNumber == appStore.confirmLimit) {
                    await appStore.getWalletAssets(address.value, wallet.provider);
                    result_text.value = "You have successfully repayed!";
                    repay_success.value = true;
                    console.log("Repay Token receipt: ", receipt);
                    actionRepayDone.value = true;
                    appStore.dlgSwapEnable = true;
                }
            })
            .on('error', function (error: any) {
                result_text.value = "Failed!";
                repay_success.value = true;
                console.log("Repay Token error: ", error);
                actionRepayDone.value = true;
                appStore.dlgSwapEnable = true;
            });
        //------- End Repay -----------

    } catch (error) {
        closeDialogRepay();
        console.log(error);
    }
}

</script>

<style>
.btnConfirmRepay {
    width: 100% !important;
    height: 52px !important;
    border: solid !important;
    border-width: 1px !important;
    border-radius: 10px !important;
    border-color: #1E1E1E !important;
    background: #1E1E1E !important;
}

.btnConfirmRepayMobile {
    width: 100% !important;
    height: 35px !important;
    border: solid !important;
    border-width: 1px !important;
    border-radius: 5px !important;
    border-color: #1E1E1E !important;
    background: #1E1E1E !important;
}

.containerRepayConfirm {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 52px !important;
    padding-right: 52px !important;
}

.containerRepayConfirmMobile {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
}
</style>