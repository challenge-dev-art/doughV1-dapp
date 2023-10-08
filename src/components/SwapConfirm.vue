<template>
    <div>
        <v-dialog v-model="dialogSwap" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 4;">
            <template v-slot:activator="{ props }">
                <!-- Swap Confirm Button - Desktop -->
                <v-btn v-if="!appStore.isMobile" v-bind="props"
                    class="btnConfirmSwap text-none font-regular text-white text-weight-700 text-size-16px"
                    :disabled="props_info.btn_disable">Preview Swap</v-btn>
                <!-- Swap Confirm Button - Mobile -->
                <v-btn v-else v-bind="props"
                    class="btnConfirmSwapMobile text-none font-regular text-white text-weight-700 text-size-15px"
                    :disabled="props_info.btn_disable">Preview Swap</v-btn>
            </template>

            <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">

                <!-- Toolbar - Desktop -->
                <v-toolbar v-if="!appStore.isMobile" dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="dialogSwap = false">
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
                        @click="dialogSwap = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">
                        Swap</p>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">

                    <div style="text-align: center;">
                        <v-container :class="appStore.isMobile ? 'containerSwapConfirmMobile' : 'containerSwapConfirm'">
                            <!-- Collateral -->
                            <p class="font-regular text-white text-weight-400 text-size-18px"
                                style="width: 100%; text-align: start; padding-bottom: 5px;">
                                Collateral</p>

                            <!-- Swap Token From -->
                            <v-row no-gutters
                                :class="appStore.isMobile ? 'd-flex align-center rowSwapConfirmMobile' : 'd-flex align-center rowSwapConfirm'">
                                <div class="d-flex me-auto align-center">
                                    <p class="font-regular text-white text-size-25px text-weight-700 me-auto">
                                        {{
                                            appStore.isMobile ? parseFloat(parseFloat(props_info.amount_from).toFixed(8)) :
                                            parseFloat(props_info.amount_from)
                                        }}
                                    </p>
                                </div>
                                <div class="d-flex align-center">
                                    <div v-if="appStore.isMobile">
                                        <v-img v-if="props_info.selected_token_from == 'usdc'" width="21" height="21"
                                            :src="TokenUsdc"></v-img>
                                        <v-img v-if="props_info.selected_token_from == 'eth'" width="21" height="21"
                                            :src="TokenEth"></v-img>
                                        <v-img v-if="props_info.selected_token_from == 'btc'" width="21" height="21"
                                            :src="TokenBtc"></v-img>
                                    </div>
                                    <div v-else>
                                        <v-img v-if="props_info.selected_token_from == 'usdc'" width="42" height="42"
                                            :src="TokenUsdc"></v-img>
                                        <v-img v-if="props_info.selected_token_from == 'eth'" width="42" height="42"
                                            :src="TokenEth"></v-img>
                                        <v-img v-if="props_info.selected_token_from == 'btc'" width="42" height="42"
                                            :src="TokenBtc"></v-img>
                                    </div>
                                    <p class="font-regular text-white text-weight-700 text-size-25px"
                                        style="margin-left: 10px;">
                                        {{ props_info.selected_token_from.toUpperCase() }}
                                    </p>
                                </div>
                            </v-row>
                            <v-row>
                                <div v-if="appStore.isMobile">
                                    <v-btn icon size="large" disabled :density="appStore.isMobile ? 'compact' : 'default'"
                                        style="background: white; color: white; margin-top: -30px; margin-left: 25px;">
                                        <ReverseButton />
                                    </v-btn>
                                </div>
                                <div v-else>
                                    <v-btn icon size="large" disabled :density="appStore.isMobile ? 'compact' : 'default'"
                                        style="background: white; color: white; margin-top:-30px; margin-left: 25px;">
                                        <ReverseButton />
                                    </v-btn>
                                </div>
                            </v-row>

                            <!-- Swap Token To -->
                            <v-row no-gutters
                                :class="appStore.isMobile ? 'd-flex align-center rowSwapConfirmMobile' : 'd-flex align-center rowSwapConfirm'"
                                style="margin-top: -15px;">
                                <div class="d-flex me-auto align-center">
                                    <p class="font-regular text-white text-size-25px text-weight-700 me-auto">
                                        {{ appStore.isMobile ?
                                            parseFloat(parseFloat(props_info.amount_to).toFixed(8)) :
                                            parseFloat(props_info.amount_to)
                                        }}
                                    </p>
                                </div>
                                <div class="d-flex align-center">
                                    <div v-if="appStore.isMobile">
                                        <v-img v-if="props_info.selected_token_to == 'usdc'" width="21" height="21"
                                            :src="TokenUsdc"></v-img>
                                        <v-img v-if="props_info.selected_token_to == 'eth'" width="21" height="21"
                                            :src="TokenEth"></v-img>
                                        <v-img v-if="props_info.selected_token_to == 'btc'" width="21" height="21"
                                            :src="TokenBtc"></v-img>
                                    </div>
                                    <div v-else>
                                        <v-img v-if="props_info.selected_token_to == 'usdc'" width="42" height="42"
                                            :src="TokenUsdc"></v-img>
                                        <v-img v-if="props_info.selected_token_to == 'eth'" width="42" height="42"
                                            :src="TokenEth"></v-img>
                                        <v-img v-if="props_info.selected_token_to == 'btc'" width="42" height="42"
                                            :src="TokenBtc"></v-img>
                                    </div>
                                    <p class="font-regular text-white text-weight-700 text-size-25px"
                                        style="margin-left: 10px;">
                                        {{ props_info.selected_token_to.toUpperCase() }}
                                    </p>
                                </div>
                            </v-row>

                            <!-- Rate -->
                            <v-row no-gutters style="margin-top: 46px">
                                <v-col cols="5" style="text-align: start;">
                                    <p
                                        :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-16px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                        Rate</p>
                                </v-col>
                                <v-col style="text-align: start;">
                                    <p
                                        :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-16px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                        1 {{ props_info.selected_token_from.toUpperCase() }} &equals; {{ props_info.rate }}
                                        {{ props_info.selected_token_to.toUpperCase() }}
                                    </p>
                                </v-col>
                            </v-row>

                            <!-- Inverse Rate -->
                            <v-row no-gutters style="margin-top: 15px">
                                <v-col cols="5" style="text-align: start;">
                                    <p
                                        :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-16px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                        Inverse Rate</p>
                                </v-col>
                                <v-col style="text-align: start;">
                                    <p
                                        :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-16px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                        1 {{ props_info.selected_token_to.toUpperCase() }} &equals; {{
                                            props_info.inverse_rate }}
                                        {{ props_info.selected_token_from.toUpperCase() }}
                                    </p>
                                </v-col>
                            </v-row>

                            <!-- Transaction Fees -->
                            <v-row no-gutters style="margin-top: 15px" class="align-center">
                                <v-col cols="5" style="text-align: start;">
                                    <p
                                        :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-16px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                        Transaction Fees</p>
                                </v-col>
                                <v-col style="text-align: start;">
                                    <p
                                        :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-16px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                        {{ props_info.gas_fee }}&nbsp;ETH&nbsp;&nbsp;(&nbsp;${{ props_info.gas_fee_usd
                                        }}&nbsp;)
                                    </p>
                                </v-col>
                            </v-row>

                            <!-- You will receive -->
                            <v-row no-gutters style="margin-top: 15px">
                                <v-col cols="5" style="text-align: start;">
                                    <p
                                        :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-16px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                        You will receive
                                    </p>
                                </v-col>
                                <v-col style="text-align: start;">
                                    <p
                                        :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-22px' : 'font-regular text-white text-weight-700 text-size-25px'">
                                        {{ props_info.amount_to }}&nbsp;{{ props_info.selected_token_to.toUpperCase() }}
                                    </p>
                                </v-col>
                            </v-row>

                            <!-- Confirm Swap Dialog -->
                            <v-row no-gutters style="margin-top: 30px;">
                                <v-dialog v-model="dialogSwapResult" :max-width="appStore.isMobile ? 5000 : 647"
                                    :fullscreen="appStore.isMobile ? true : false"
                                    :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" persistent
                                    style="z-index: 5;">
                                    <template v-slot:activator="{ props }">
                                        <!-- Confirm Button -->
                                        <v-btn v-bind="props"
                                            :class="appStore.isMobile ? 'btnConfirmSwapMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmSwap text-none font-regular text-white text-weight-700 text-size-16px'"
                                            @click="actionSwap">
                                            Confirm Swap
                                        </v-btn>
                                    </template>

                                    <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                                        :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">
                                        <!-- Toolbar - Desktop -->
                                        <v-toolbar v-if="!appStore.isMobile" dark color="black">
                                            <v-spacer></v-spacer>
                                            <v-btn icon variant="plain" dark @click="closeDialogSwap"
                                                :disabled="!actionSwapDone">
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
                                                    :class="appStore.isMobile ? 'containerSwapConfirmMobile' : 'containerSwapConfirm'">
                                                    <!-- Banner -->
                                                    <v-row>
                                                        <v-spacer></v-spacer>
                                                        <v-img :width="appStore.isMobile ? 358 : 409"
                                                            :height="appStore.isMobile ? 246 : 281" :src="SwapResultBanner"
                                                            :style="appStore.isMobile ? 'margin-top: 60px;' : 'margin-top: 10px;'"></v-img>
                                                        <v-spacer></v-spacer>
                                                    </v-row>
                                                    <!-- Circle Progress -->
                                                    <div v-if="!actionSwapDone"
                                                        style="width: 100%; height: 30px; margin-top: 10px; padding:30px;">
                                                        <v-progress-circular indeterminate></v-progress-circular>
                                                    </div>
                                                    <p v-if="swap_success"
                                                        :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-25px' : 'font-regular text-white text-weight-700 text-size-35px'"
                                                        style="width: 100%; margin-top: 10px">
                                                        {{ result_text }}
                                                    </p>
                                                    <p class="font-regular text-white text-weight-400 text-size-18px"
                                                        style="margin-top: 35px; width: 100%; text-align: start; padding-left: 14px;">
                                                        Your New Balance
                                                    </p>

                                                    <!-- new Balance of From -->
                                                    <v-sheet
                                                        :class="appStore.isMobile ? 'd-flex align-center newBalanceSwapMobile' : 'd-flex align-center newBalanceSwap'">
                                                        <div class="d-flex me-auto align-center">
                                                            <div v-if="appStore.isMobile">
                                                                <v-img v-if="props_info.selected_token_from == 'usdc'"
                                                                    width="33" height="33" :src="TokenUsdc"></v-img>
                                                                <v-img v-if="props_info.selected_token_from == 'eth'"
                                                                    width="33" height="33" :src="TokenEth"></v-img>
                                                                <v-img v-if="props_info.selected_token_from == 'btc'"
                                                                    width="33" height="33" :src="TokenBtc"></v-img>
                                                            </div>
                                                            <div v-else>
                                                                <v-img v-if="props_info.selected_token_from == 'usdc'"
                                                                    width="58" height="58" :src="TokenUsdc"></v-img>
                                                                <v-img v-if="props_info.selected_token_from == 'eth'"
                                                                    width="58" height="58" :src="TokenEth"></v-img>
                                                                <v-img v-if="props_info.selected_token_from == 'btc'"
                                                                    width="58" height="58" :src="TokenBtc"></v-img>
                                                            </div>
                                                            <div style="padding-left: 13px; text-align: start;">
                                                                <p
                                                                    :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-17px' : 'font-regular text-white text-weight-700 text-size-18px'">
                                                                    {{ props_info.selected_token_from == 'usdc' ? 'USD Coin'
                                                                        : props_info.selected_token_from == 'eth' ? 'Ethereum'
                                                                            : props_info.selected_token_from == 'btc' ? 'Bitcoin' :
                                                                                ''
                                                                    }}
                                                                </p>
                                                                <p
                                                                    :class="appStore.isMobile ? 'font-light text-white text-weight-300 text-size-14px' : 'font-light text-white text-weight-400 text-size-16px'">
                                                                    {{ isNaN(parseFloat(tokenUsdBalanceFrom)) ? '' : '$' }}
                                                                    {{ tokenUsdBalanceFrom }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p
                                                                :class="appStore.isMobile ? 'font-regular text-white text-weight-400 text-size-17px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                                                {{ appStore.isMobile ?
                                                                    parseFloat(parseFloat(tokenBalanceFrom).toFixed(8)) :
                                                                    parseFloat(tokenBalanceFrom)
                                                                }}
                                                                {{ props_info.selected_token_from.toUpperCase() }}
                                                            </p>
                                                        </div>
                                                    </v-sheet>

                                                    <!-- new Balance of To -->
                                                    <v-sheet
                                                        :class="appStore.isMobile ? 'd-flex align-center newBalanceSwapMobile' : 'd-flex align-center newBalanceSwap'"
                                                        style="margin-top: 20px;">
                                                        <div class="d-flex me-auto align-center">
                                                            <div v-if="appStore.isMobile">
                                                                <v-img v-if="props_info.selected_token_to == 'usdc'"
                                                                    width="33" height="33" :src="TokenUsdc"></v-img>
                                                                <v-img v-if="props_info.selected_token_to == 'eth'"
                                                                    width="33" height="33" :src="TokenEth"></v-img>
                                                                <v-img v-if="props_info.selected_token_to == 'btc'"
                                                                    width="33" height="33" :src="TokenBtc"></v-img>
                                                            </div>
                                                            <div v-else>
                                                                <v-img v-if="props_info.selected_token_to == 'usdc'"
                                                                    width="58" height="58" :src="TokenUsdc"></v-img>
                                                                <v-img v-if="props_info.selected_token_to == 'eth'"
                                                                    width="58" height="58" :src="TokenEth"></v-img>
                                                                <v-img v-if="props_info.selected_token_to == 'btc'"
                                                                    width="58" height="58" :src="TokenBtc"></v-img>
                                                            </div>
                                                            <div style="padding-left: 13px; text-align: start;">
                                                                <p
                                                                    :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-17px' : 'font-regular text-white text-weight-700 text-size-18px'">
                                                                    {{ props_info.selected_token_to == 'usdc' ? 'USD Coin'
                                                                        : props_info.selected_token_to == 'eth' ? 'Ethereum'
                                                                            : props_info.selected_token_to == 'btc' ? 'Bitcoin' :
                                                                                ''
                                                                    }}
                                                                </p>
                                                                <p
                                                                    :class="appStore.isMobile ? 'font-light text-white text-weight-300 text-size-14px' : 'font-light text-white text-weight-400 text-size-16px'">
                                                                    {{ isNaN(parseFloat(tokenUsdBalanceTo)) ? '' : '$' }}
                                                                    {{ tokenUsdBalanceTo }}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p
                                                                :class="appStore.isMobile ? 'font-regular text-white text-weight-400 text-size-17px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                                                {{ appStore.isMobile ?
                                                                    parseFloat(parseFloat(tokenBalanceTo).toFixed(8)) :
                                                                    parseFloat(tokenBalanceTo)
                                                                }}
                                                                {{ props_info.selected_token_to.toUpperCase() }}
                                                            </p>
                                                        </div>
                                                    </v-sheet>

                                                    <v-row no-gutters style="margin-top: 25px; margin-bottom: 85px;">
                                                        <v-btn variant="plain"
                                                            :class="appStore.isMobile ? 'btnConfirmSwapMobile text-none font-regular text-white text-weight-700 text-size-16px' : 'btnConfirmSwap text-none font-regular text-white text-weight-700 text-size-16px'"
                                                            @click="closeDialogSwap" :disabled="!actionSwapDone">
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
                                :style="appStore.isMobile ? 'margin-top: 135px;' : 'margin-top: 54px; margin-bottom: 30px;'">
                                <v-spacer></v-spacer>
                                <p class="font-regular text-white text-weight-400 text-size-16px">
                                    <a href="#">View</a> history. Read our <a :href="appStore.doc_url_swap"
                                        target="_blank">Docs</a> on Swaps.
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
    selected_token_from: {
        type: String,
        required: true,
    },
    selected_token_to: {
        type: String,
        required: true,
    },
    amount_from: {
        type: String,
        required: true,
    },
    amount_to: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    inverse_rate: {
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

import Web3 from "web3";
// import DSA from "dsa-connect";

import LayoutHeader from "./LayoutHeader.vue";
import BackButton from '../assets/backBtn.svg'
import SwapResultBanner from "../assets/swapRes.png";
import TokenUsdc from "../assets/usdc.png";
import TokenEth from "../assets/eth.png";
import TokenBtc from "../assets/btc.png";
import ReverseButton from '../assets/reverse.svg'

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

const dialogSwap = ref(false);
const dialogSwapResult = ref(false);

function closeDialogSwap() {
    dialogSwap.value = false;
    dialogSwapResult.value = false;
}

function enterDetect(e: KeyboardEvent): void {
    if (e.key == "-" || e.key == "+" || e.key.toLocaleLowerCase() == "e") {
        e.preventDefault();
    }
}

const actionSwapDone = ref(false);
const swap_success = ref(false)
const result_text = ref("");
async function actionSwap() {
    appStore.dlgSwapEnable = false;
    actionSwapDone.value = false;
    swap_success.value = false;
    try {
        //------- Start Swap ---------
        let tokenAddrIn = "";
        let tokenAddrOut = "";
        let amountIn = "";
        if (props_info.selected_token_from == "usdc") {
            tokenAddrIn = appStore.USDC;
            amountIn = BigNumber(props_info.amount_from).multipliedBy(1e6).toString();
        } else if (props_info.selected_token_from == "eth") {
            tokenAddrIn = appStore.WETH;
            amountIn = BigNumber(props_info.amount_from).multipliedBy(1e18).toString();
        } else if (props_info.selected_token_from == "btc") {
            tokenAddrIn = appStore.WBTC;
            amountIn = BigNumber(props_info.amount_from).multipliedBy(1e8).toString();
        }
        if (props_info.selected_token_to == "usdc") {
            tokenAddrOut = appStore.USDC;
        } else if (props_info.selected_token_to == "eth") {
            tokenAddrOut = appStore.WETH;
        } else if (props_info.selected_token_to == "btc") {
            tokenAddrOut = appStore.WBTC;
        }

        const web3 = new Web3(wallet.provider as any);

        const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
        // Swap Token
        doughV1DsaContract.methods.doughCall(2, 0, tokenAddrIn, tokenAddrOut, amountIn, false).send({ from: address.value })
            .on('confirmation', async function (confirmationNumber: any, receipt: any) {
                if (confirmationNumber == appStore.confirmLimit) {
                    await appStore.getWalletAssets(address.value, wallet.provider);
                    result_text.value = "You have successfully swapped!";
                    swap_success.value = true;
                    console.log("Swap Token receipt: ", receipt);
                    appStore.dlgSwapEnable = true;
                    actionSwapDone.value = true;
                }
            })
            .on('error', function (error: any) {
                result_text.value = "Failed!";
                swap_success.value = true;
                console.log("Swap Token error: ", error);
                appStore.dlgSwapEnable = true;
                actionSwapDone.value = true;
            });
        //------- End Swap -----------
    } catch (error) {
        closeDialogSwap();
        console.log(error);
    }
    // actionSwapDone.value = true;
    // appStore.dlgSwapEnable = true;
}

const tokenBalanceFrom = computed(() => {
    if (props_info.selected_token_from == 'usdc') {
        return appStore.dsa_usdc_balance.toString();
    } else if (props_info.selected_token_from == 'eth') {
        return appStore.dsa_weth_balance.toString();
    } else if (props_info.selected_token_from == 'btc') {
        return appStore.dsa_wbtc_balance.toString();
    } else {
        return "";
    }
})
const tokenUsdBalanceFrom = computed(() => {
    if (props_info.selected_token_from == 'usdc') {
        return (appStore.dsa_usdc_balance * appStore.price_usdc_aave).toFixed(2);
    } else if (props_info.selected_token_from == 'eth') {
        return (appStore.dsa_weth_balance * appStore.price_eth_aave).toFixed(2);
    } else if (props_info.selected_token_from == 'btc') {
        return (appStore.dsa_wbtc_balance * appStore.price_btc_aave).toFixed(2);
    } else {
        return "";
    }
})
const tokenBalanceTo = computed(() => {
    if (props_info.selected_token_to == 'usdc') {
        return appStore.dsa_usdc_balance.toString();
    } else if (props_info.selected_token_to == 'eth') {
        return appStore.dsa_weth_balance.toString();
    } else if (props_info.selected_token_to == 'btc') {
        return appStore.dsa_wbtc_balance.toString();
    } else {
        return "";
    }
})
const tokenUsdBalanceTo = computed(() => {
    if (props_info.selected_token_to == 'usdc') {
        return (appStore.dsa_usdc_balance * appStore.price_usdc_aave).toFixed(2);
    } else if (props_info.selected_token_to == 'eth') {
        return (appStore.dsa_weth_balance * appStore.price_eth_aave).toFixed(2);
    } else if (props_info.selected_token_to == 'btc') {
        return (appStore.dsa_wbtc_balance * appStore.price_btc_aave).toFixed(2);
    } else {
        return "";
    }
})

</script>

<style>
.btnConfirmSwap {
    width: 100% !important;
    height: 52px !important;
    border: solid !important;
    border-width: 1px !important;
    border-radius: 10px !important;
    border-color: #1E1E1E !important;
    background: #1E1E1E !important;
}

.btnConfirmSwapMobile {
    width: 100% !important;
    height: 35px !important;
    border: solid !important;
    border-width: 1px !important;
    border-radius: 5px !important;
    border-color: #1E1E1E !important;
    background: #1E1E1E !important;
}

.newBalanceSwap {
    height: 111px;
    background: #1E1E1E !important;
    padding-left: 35px !important;
    padding-right: 35px !important;
    border-radius: 10px !important;
}

.newBalanceSwapMobile {
    height: 83px;
    border-radius: 6px !important;
    padding-left: 18px !important;
    padding-right: 17px !important;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    background: #1E1E1E !important;
}

.rowSwapConfirm {
    background: #1E1E1E;
    border-radius: 10px !important;
    border-width: 1px !important;
    padding-top: 50px !important;
    padding-left: 27px !important;
    padding-right: 40px !important;
    padding-bottom: 50px !important;
}

.rowSwapConfirmMobile {
    background: #1E1E1E;
    border-radius: 6px !important;
    border-width: 0px !important;
    padding-top: 30px !important;
    padding-left: 18px !important;
    padding-right: 20px !important;
    padding-bottom: 30px !important;
}

.containerSwapConfirm {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 52px !important;
    padding-right: 52px !important;
}

.containerSwapConfirmMobile {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
}
</style>