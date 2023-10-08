<template>
    <div>
        <v-dialog v-model="dialogDeposit" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 4;">
            <template v-slot:activator="{ props }">
                <!-- Deposit Confirm Button - Desktop -->
                <v-btn v-if="!appStore.isMobile" v-bind="props"
                    class="btnConfirmDeposit text-none font-regular text-white text-weight-700 text-size-16px"
                    :disabled="props_info.btn_disable">Confirm Deposit</v-btn>
                <!-- Deposit Confirm Button - Mobile -->
                <v-btn v-else v-bind="props"
                    class="btnConfirmDepositMobile text-none font-regular text-white text-weight-700 text-size-15px"
                    :disabled="props_info.btn_disable">Confirm Deposit</v-btn>
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
                        Deposit {{ props_info.selected_token.toUpperCase() }} ( DSA )</p>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">

                        <!-- Summary -->
                        <p class="font-regular text-white text-weight-700 text-size-18px">Summary</p>

                        <v-container
                            :class="appStore.isMobile ? 'containerDepositConfirmMobile' : 'containerDepositConfirm'">
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
                            <!-- Deposited Amount -->
                            <v-row class="mt-5">
                                <v-col :cols="appStore.isMobile ? 6 : 4" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Deposited Amount</p>
                                </v-col>
                                <v-col v-if="!appStore.isMobile" cols="4"></v-col>
                                <v-col :cols="appStore.isMobile ? 6 : 4" style="text-align: start;" align-self="center">
                                    <p class="font-regular text-white text-weight-700 text-size-18px">
                                        {{ props_info.deposit_amount }} {{ props_info.selected_token.toUpperCase() }}
                                    </p>
                                </v-col>
                            </v-row>
                            <!-- Deposited Address -->
                            <v-row class="mt-5">
                                <v-col :cols="appStore.isMobile ? 6 : 4" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Deposited Address</p>
                                </v-col>
                                <v-col v-if="!appStore.isMobile" cols="4"></v-col>
                                <v-col :cols="appStore.isMobile ? 6 : 4" style="text-align: start;" align-self="center">
                                    <p class="font-regular text-white text-weight-700 text-size-18px">
                                        {{ shortenAddress(appStore.dsa_address) }}
                                        <copy-button v-if="appStore.dsa_address != ''" :address="appStore.dsa_address" />
                                    </p>
                                </v-col>
                            </v-row>
                            <!-- Gas Fee -->
                            <!-- <v-row class="mt-5">
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
                            </v-row> -->

                            <!-- Confirm Dialog -->
                            <v-row no-gutters style="margin-top: 30px;">
                                <v-dialog v-model="dialogDepositResult" :max-width="appStore.isMobile ? 5000 : 647"
                                    :fullscreen="appStore.isMobile ? true : false"
                                    :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" persistent
                                    style="z-index: 5;">
                                    <template v-slot:activator="{ props }">
                                        <!-- Confirm Button -->
                                        <v-btn v-bind="props"
                                            :class="appStore.isMobile ? 'btnConfirmDepositMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmDeposit text-none font-regular text-white text-weight-700 text-size-16px'"
                                            @click="actionDeposit">
                                            Confirm Deposit
                                        </v-btn>
                                    </template>

                                    <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                                        :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">
                                        <!-- Toolbar - Desktop -->
                                        <v-toolbar v-if="!appStore.isMobile" dark color="black">
                                            <v-spacer></v-spacer>
                                            <v-btn icon variant="plain" dark @click="closeDialogDeposit"
                                                :disabled="!actionDepositDone">
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
                                                    :class="appStore.isMobile ? 'containerDepositConfirmMobile' : 'containerDepositConfirm'">
                                                    <div :style="appStore.isMobile ? 'height: 0px;' : 'height: 60px;'">
                                                    </div>
                                                    <v-row>
                                                        <v-spacer></v-spacer>
                                                        <v-img :width="appStore.isMobile ? 302 : 431"
                                                            :height="appStore.isMobile ? 303 : 432"
                                                            :src="DepositResultBanner"
                                                            :style="appStore.isMobile ? 'margin-top: 136px;' : 'margin-top: 10px;'"></v-img>
                                                        <v-spacer></v-spacer>
                                                    </v-row>
                                                    <div v-if="!actionDepositDone" class="d-flex align-center"
                                                        style="width: 100%; height: 30px; margin-top: 10px; padding:30px;">
                                                        <v-spacer></v-spacer>
                                                        <p style="margin-right: 20px;"
                                                            :class="appStore.isMobile ? 'font-regular text-white text-weight-400 text-size-17px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                                            {{ state_text }}
                                                        </p>
                                                        <v-progress-circular indeterminate></v-progress-circular>
                                                        <v-spacer></v-spacer>
                                                    </div>
                                                    <p v-if="deposit_success"
                                                        :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-25px' : 'font-regular text-white text-weight-700 text-size-35px'"
                                                        style="width: 100%; height: 30px; margin-top: 10px">
                                                        {{ result_text }}
                                                    </p>
                                                    <v-row no-gutters style="margin-top: 35px; margin-bottom: 165px;">
                                                        <v-btn variant="plain"
                                                            :class="appStore.isMobile ? 'btnConfirmDepositMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmDeposit text-none font-regular text-white text-weight-700 text-size-16px'"
                                                            @click="closeDialogDeposit" :disabled="!actionDepositDone">
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
                                :style="appStore.isMobile ? 'margin-top: 270px;' : 'margin-top: 315px; margin-bottom: 30px;'">
                                <v-spacer></v-spacer>
                                <p class="font-regular text-white text-weight-400 text-size-16px">
                                    <a href="#">View</a> history. Read our <a :href="appStore.doc_url_deposit"
                                        target="_blank">Docs</a> on Deposits.
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
    deposit_amount: {
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
import CopyButton from './CopyButton.vue'

import BackButton from '../assets/backBtn.svg'
import DepositResultBanner from "../assets/depositRes.png";
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

const dialogDeposit = ref(false);
const dialogDepositResult = ref(false);

function closeDialogDeposit() {
    dialogDeposit.value = false;
    dialogDepositResult.value = false;
}

const actionDepositDone = ref(false);
const deposit_success = ref(false)
const result_text = ref("");
const state_text = ref("");
async function actionDeposit() {
    appStore.dlgSwapEnable = false;
    actionDepositDone.value = false;
    deposit_success.value = false;
    result_text.value = "";
    state_text.value = "";
    try {
        //------- Start Deposit ---------
        let tokenAddr = "";
        let amount = "";
        if (props_info.selected_token == "usdc") {
            tokenAddr = appStore.USDC;
            amount = BigNumber(props_info.deposit_amount).multipliedBy(1e6).toString();
        } else if (props_info.selected_token == "eth") {
            tokenAddr = appStore.ETH;
            amount = BigNumber(props_info.deposit_amount).multipliedBy(1e18).toString();
        } else if (props_info.selected_token == "btc") {
            tokenAddr = appStore.WBTC;
            amount = BigNumber(props_info.deposit_amount).multipliedBy(1e8).toString();
        }
        const deposit_amount = parseInt(amount).toString();

        const web3 = new Web3(wallet.provider as any);

        const usdc_contract = appStore.getUsdcContract(wallet.provider);
        const wbtc_contract = appStore.getWbtcContract(wallet.provider);

        if (tokenAddr == appStore.USDC) {
            state_text.value = "Approving USDC";
            usdc_contract.methods.approve(appStore.dsa_address, deposit_amount).send({ from: address.value })
                .then(() => {
                    state_text.value = "Deposit USDC";
                    depositCall(tokenAddr, deposit_amount, 1);
                })
                .catch((error: any) => {
                    result_text.value = "Failed!";
                    state_text.value = "";
                    deposit_success.value = true;
                    actionDepositDone.value = true;
                    appStore.dlgSwapEnable = true;
                    console.log("depositToken error: ", error);
                })
        } else if (tokenAddr == appStore.WBTC) {
            state_text.value = "Approving WBTC";
            wbtc_contract.methods.approve(appStore.dsa_address, deposit_amount).send({ from: address.value })
                .then(() => {
                    state_text.value = "Deposit WBTC";
                    depositCall(tokenAddr, deposit_amount, 1);
                })
                .catch((error: any) => {
                    result_text.value = "Failed!";
                    state_text.value = "";
                    deposit_success.value = true;
                    actionDepositDone.value = true;
                    appStore.dlgSwapEnable = true;
                    console.log("depositToken error: ", error);
                })
        } else if (tokenAddr == appStore.ETH) {
            state_text.value = "Deposit ETH";
            depositCall(tokenAddr, deposit_amount, 0);
        }

        //------- End Deposit -----------
    } catch (error) {
        closeDialogDeposit();
        console.log(error);
    }
}

function depositCall(tokenAddr: string, deposit_amount: string, actionId: number) {
    const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
    // deposit Token
    doughV1DsaContract.methods.doughCall(0, actionId, tokenAddr, tokenAddr, deposit_amount, false).send({ from: address.value, value: actionId == 0 ? deposit_amount : "0" })
        .on('confirmation', async function (confirmationNumber: any, receipt: any) {
            if (confirmationNumber == appStore.confirmLimit) {
                await appStore.getWalletAssets(address.value, wallet.provider);
                await appStore.getDsaAssets(wallet.provider);
                result_text.value = "All done!";
                state_text.value = "";
                deposit_success.value = true;
                actionDepositDone.value = true;
                appStore.dlgSwapEnable = true;
                console.log("depositToken receipt: ", receipt);
            }
        })
        .on('error', function (error: any) {
            result_text.value = "Failed!";
            state_text.value = "";
            deposit_success.value = true;
            actionDepositDone.value = true;
            appStore.dlgSwapEnable = true;
            console.log("depositToken error: ", error);
        });
}
</script>

<style>
.btnConfirmDeposit {
    width: 100% !important;
    height: 51px !important;
    border: solid !important;
    border-width: 1px !important;
    border-radius: 10px !important;
    border-color: #1E1E1E !important;
    background: #1E1E1E !important;
}

.btnConfirmDepositMobile {
    width: 100% !important;
    height: 35px !important;
    border: solid !important;
    border-width: 1px !important;
    border-radius: 5px !important;
    border-color: #1E1E1E !important;
    background: #1E1E1E !important;
}

.containerDepositConfirm {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 52px !important;
    padding-right: 52px !important;
}

.containerDepositConfirmMobile {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
}
</style>