<template>
    <div>
        <v-dialog v-model="dialogLoopConfig" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 4;">
            <template v-slot:activator="{ props }">
                <!-- Borrow Confirm Button - Desktop -->
                <v-btn v-if="!appStore.isMobile" v-bind="props"
                    class="btnConfirmLoop text-none font-regular text-white text-weight-700 text-size-16px"
                    :disabled="props_info.btn_disable">Confirm Loop</v-btn>
                <!-- Borrow Confirm Button - Mobile -->
                <v-btn v-else v-bind="props"
                    class="btnConfirmLoopMobile text-none font-regular text-white text-weight-700 text-size-15px"
                    :disabled="props_info.btn_disable">Confirm Loop</v-btn>
            </template>

            <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">

                <!-- Toolbar - Desktop -->
                <v-toolbar v-if="!appStore.isMobile" dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="dialogLoopConfig = false">
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
                        @click="dialogLoopConfig = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">
                        Loop</p>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">

                        <!-- Summary -->
                        <p class="font-regular text-white text-weight-700 text-size-18px">Summary</p>

                        <v-container :class="appStore.isMobile ? 'containerLoopConfirmMobile' : 'containerLoopConfirm'">
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
                                    <div v-if="props_info.selected_token == 'btc'">
                                        <p class="font-regular text-white text-weight-700 text-size-18px">Bitcoin</p>
                                        <p class="font-regular text-white text-weight-400 text-size-18px">BTC</p>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-row class="mt-5">
                                <v-col cols="7" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Leverage Position</p>
                                </v-col>
                                <v-col cols="5" style="text-align: start;" align-self="center">
                                    <p class="font-regular text-white text-weight-700 text-size-18px">
                                        {{ props_info.leverage_position }} x
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row class="mt-5">
                                <v-col cols="7" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Your Liquidation Price
                                    </p>
                                </v-col>
                                <v-col cols="5" style="text-align: start;" align-self="center">
                                    ${{ props_info.liquidation_price.toFixed(2) }}
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
                                <v-dialog v-model="dialogLoopResult" :max-width="appStore.isMobile ? 5000 : 647"
                                    :fullscreen="appStore.isMobile ? true : false"
                                    :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" persistent
                                    style="z-index: 5;">
                                    <template v-slot:activator="{ props }">
                                        <!-- Confirm Button -->
                                        <v-btn v-bind="props"
                                            :class="appStore.isMobile ? 'btnConfirmLoopMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmLoop text-none font-regular text-white text-weight-700 text-size-16px'"
                                            @click="actionLoop">
                                            Confirm Loop
                                        </v-btn>
                                    </template>

                                    <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                                        :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">
                                        <!-- Toolbar - Desktop -->
                                        <v-toolbar v-if="!appStore.isMobile" dark color="black">
                                            <v-spacer></v-spacer>
                                            <v-btn icon variant="plain" dark @click="closeDialogLoop"
                                                :disabled="!actionLoopDone">
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
                                                    :class="appStore.isMobile ? 'containerLoopConfirmMobile' : 'containerLoopConfirm'">
                                                    <div :style="appStore.isMobile ? 'height: 0px;' : 'height: 60px;'">
                                                    </div>
                                                    <!-- Banner -->
                                                    <v-row>
                                                        <v-spacer></v-spacer>
                                                        <v-img :width="appStore.isMobile ? 300 : 423"
                                                            :height="appStore.isMobile ? 336 : 474" :src="LoopResultBanner"
                                                            :style="appStore.isMobile ? 'margin-top: 136px;' : 'margin-top: 10px;'"></v-img>
                                                        <v-spacer></v-spacer>
                                                    </v-row>
                                                    <!-- Circle Progress -->
                                                    <div v-if="!actionLoopDone"
                                                        style="width: 100%; height: 30px; margin-top: 10px; padding:30px;">
                                                        <v-progress-circular indeterminate></v-progress-circular>
                                                    </div>
                                                    <p v-if="loop_success"
                                                        :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-25px' : 'font-regular text-white text-weight-700 text-size-35px'"
                                                        style="width: 100%; height: 30px; margin-top: 10px">
                                                        {{ result_text }}
                                                    </p>
                                                    <v-row no-gutters style="margin-top: 35px; margin-bottom: 125px;">
                                                        <v-btn variant="plain"
                                                            :class="appStore.isMobile ? 'btnConfirmBorrowMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmBorrow text-none font-regular text-white text-weight-700 text-size-16px'"
                                                            @click="closeDialogLoop" :disabled="!actionLoopDone">
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
                                :style="appStore.isMobile ? 'margin-top: 155px;' : 'margin-top: 167px; margin-bottom: 30px;'">
                                <v-spacer></v-spacer>
                                <p class="font-regular text-white text-weight-400 text-size-16px">
                                    <a href="#">View</a> history. Read our <a :href="appStore.doc_url_loop"
                                        target="_blank">Docs</a> on Looping.
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
    loop_amount: {
        type: Number,
        required: true,
    },
    leverage_position: {
        type: Number,
        required: true,
    },
    liquidation_price: {
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
import LoopResultBanner from "../assets/loopRes.png";
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

const dialogLoopConfig = ref(false);
const dialogLoopResult = ref(false);

function closeDialogLoop() {
    dialogLoopConfig.value = false;
    dialogLoopResult.value = false;
}

const actionLoopDone = ref(false);
const loop_success = ref(false)
const result_text = ref("");
async function actionLoop() {
    appStore.dlgSwapEnable = false;
    actionLoopDone.value = false;
    loop_success.value = false;
    try {
        //------- Start Loop ---------

        let tokenAddr = "";
        let big_amount = "";
        if (props_info.selected_token == "eth") {
            tokenAddr = appStore.WETH;
            big_amount = BigNumber(props_info.loop_amount).multipliedBy(1e18).toString();
        } else if (props_info.selected_token == "btc") {
            tokenAddr = appStore.WBTC;
            big_amount = BigNumber(props_info.loop_amount).multipliedBy(1e8).toString();
        }
        const amount = parseInt(big_amount).toString();

        const web3 = new Web3(wallet.provider as any);

        const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
        // Loop Token
        doughV1DsaContract.methods.doughCall(3, 0, tokenAddr, tokenAddr, amount, false).send({ from: address.value })
            .on('confirmation', async function (confirmationNumber: any, receipt: any) {
                if (confirmationNumber == appStore.confirmLimit) {
                    await appStore.getWalletAssets(address.value, wallet.provider);
                    result_text.value = "All done!";
                    loop_success.value = true;
                    console.log("Loop Token receipt: ", receipt);
                    actionLoopDone.value = true;
                    appStore.dlgSwapEnable = true;
                }
            })
            .on('error', function (error: any) {
                result_text.value = "Failed!";
                loop_success.value = true;
                console.log("Loop Token error: ", error);
                actionLoopDone.value = true;
                appStore.dlgSwapEnable = true;
            });

        //------- End Loop -----------
    } catch (error) {
        closeDialogLoop();
        console.log(error);
    }
}

</script>

<style>
.btnConfirmLoop {
    width: 100% !important;
    height: 52px !important;
    border: solid !important;
    border-width: 1px !important;
    border-radius: 10px !important;
    border-color: #1E1E1E !important;
    background: #1E1E1E !important;
}

.btnConfirmLoopMobile {
    width: 100% !important;
    height: 35px !important;
    border: solid !important;
    border-width: 1px !important;
    border-radius: 5px !important;
    border-color: #1E1E1E !important;
    background: #1E1E1E !important;
}

.containerLoopConfirm {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 52px !important;
    padding-right: 52px !important;
}

.containerLoopConfirmMobile {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
}
</style>