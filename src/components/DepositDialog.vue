<template>
    <!-- For Desktop -->
    <div v-if="!appStore.isMobile">
        <v-dialog v-model="appStore.dlgDeposit" max-width="647" style="z-index: 2;">
            <v-card color="black" class="dialogDeposit">
                <v-toolbar dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="appStore.dlgDeposit = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <!-- Title - Desktop & Mobile -->
                <v-card-title :class="appStore.isMobile ? 'd-flex align-center mx-auto' : 'd-flex align-center'"
                    :style="appStore.isMobile ? 'margin-top: 43px;' : ''">
                    <v-btn icon variant="plain" :style="appStore.isMobile ? '' : 'margin-left: 25px;'"
                        @click="appStore.dlgDeposit = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">Deposit ( DSA )</p>
                </v-card-title>

                <v-card-text class="mt-0 mb-0 pt-0 pb-0">
                    <div style="text-align: center;">
                        <p class="font-regular text-white text-weight-400 text-size-18px">Your address:</p>
                        <v-row no-gutters class="mt-3">
                            <v-spacer></v-spacer>
                            <v-col align-self="center" style="text-align: end;">
                                <p class="font-regular text-white text-weight-700 text-size-18px">
                                    {{ address }}
                                </p>
                            </v-col>
                            <v-col align-self="center" style="text-align: start; margin-left: 10px;">
                                <copy-button :address="address" />
                            </v-col>
                            <v-spacer></v-spacer>
                        </v-row>
                        <p class="font-regular text-white text-weight-400 text-size-18px" style="margin-top: 37px;">
                            Select a token you would like to deposit.
                        </p>

                        <v-container class="pt-0 pb-0">
                            <v-row no-gutters class="mt-5 rowDeposit">
                                <v-col align-self="center" cols="2">
                                    <v-img width="42" height="42" :src="TokenUsdc"></v-img>
                                </v-col>
                                <v-col align-self="center" cols="2">
                                    <v-row>
                                        <p class="font-regular text-white text-weight-700 text-size-18px">USD Coin</p>
                                    </v-row>
                                    <v-row>
                                        <p class="font-regular text-white text-weight-400 text-size-16px">
                                            ${{
                                                parseFloat((appStore.wallet_usdc_balance * appStore.price_usdc_aave).toFixed(2))
                                            }}
                                        </p>
                                    </v-row>
                                </v-col>
                                <v-col align-self="center" style="text-align: end;" cols="5">
                                    <p class="font-regular text-white text-weight-700 text-size-18px mr-5">
                                        {{ parseFloat(appStore.wallet_usdc_balance.toFixed(6)) }}&nbsp;&nbsp;USDC
                                    </p>
                                </v-col>
                                <v-col align-self="center" cols="3">
                                    <deposit-input deposit_token="usdc" />
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="mt-8 rowDeposit">
                                <v-col align-self="center" cols="2">
                                    <v-img width="42" height="42" :src="TokenEth"></v-img>
                                </v-col>
                                <v-col align-self="center" cols="2">
                                    <v-row>
                                        <p class="font-regular text-white text-weight-700 text-size-18px">Ethereum</p>
                                    </v-row>
                                    <v-row>
                                        <p class="font-regular text-white text-weight-400 text-size-16px">
                                            ${{ parseFloat((appStore.wallet_eth_balance *
                                                appStore.price_eth_aave).toFixed(2))
                                            }}
                                        </p>
                                    </v-row>
                                </v-col>
                                <v-col align-self="center" style="text-align: end;" cols="5">
                                    <p class="font-regular text-white text-weight-700 text-size-18px mr-5">
                                        {{ parseFloat(appStore.wallet_eth_balance.toFixed(5)) }}&nbsp;&nbsp;ETH
                                    </p>
                                </v-col>
                                <v-col align-self="center" cols="3">
                                    <deposit-input deposit_token="eth" />
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="mt-8 rowDeposit">
                                <v-col align-self="center" cols="2">
                                    <v-img width="42" height="42" :src="TokenBtc"></v-img>
                                </v-col>
                                <v-col align-self="center" cols="2">
                                    <v-row>
                                        <p class="font-regular text-white text-weight-700 text-size-18px">Bitcoin</p>
                                    </v-row>
                                    <v-row>
                                        <p class="font-regular text-white text-weight-400 text-size-16px">
                                            ${{
                                                parseFloat((appStore.wallet_wbtc_balance * appStore.price_btc_aave).toFixed(2))
                                            }}
                                        </p>
                                    </v-row>
                                </v-col>
                                <v-col align-self="center" style="text-align: end;" cols="5">
                                    <p class="font-regular text-white text-weight-700 text-size-18px mr-5">
                                        {{ parseFloat(appStore.wallet_wbtc_balance.toFixed(8)) }}&nbsp;&nbsp;BTC
                                    </p>
                                </v-col>
                                <v-col align-self="center" cols="3">
                                    <deposit-input deposit_token="btc" />
                                </v-col>
                            </v-row>
                            <v-row no-gutters style="margin-top: 175px; margin-bottom: 30px;">
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
    <div v-else>
        <v-dialog v-model="appStore.dlgDeposit" fullscreen transition="fade-transition" style="z-index: 2;">
            <v-card color="black" class="dialogDepositMobile">
                <layout-header />
                <v-card-title class="d-flex align-center mx-auto" style="margin-top: 43px;">
                    <v-btn icon variant="plain" @click="appStore.dlgDeposit = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">
                        Deposit ( DSA )</p>
                </v-card-title>
                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">
                        <p class="font-regular text-white text-weight-400 text-size-16px">Your address:</p>
                        <v-row no-gutters class="mt-3 align-center">
                            <v-spacer></v-spacer>
                            <p class="font-regular text-white text-weight-700 text-size-14px" style="margin-right: 10px;">
                                {{ shortenAddress(address) }}
                            </p>
                            <copy-button :address="address" />
                            <v-spacer></v-spacer>
                        </v-row>
                        <p class="font-light text-white text-weight-400 text-size-16px" style="margin-top: 20px;">
                            Select a token you would like to deposit.
                        </p>

                        <v-container class="pa-0">
                            <deposit-input deposit_token="usdc" />
                            <deposit-input deposit_token="eth" />
                            <deposit-input deposit_token="btc" />
                        </v-container>

                        <v-row no-gutters style="margin-top: 215px;">
                            <v-spacer></v-spacer>
                            <p class="font-regular text-white text-weight-400 text-size-16px">
                                <a href="#">View</a> history. Read our <a :href="appStore.doc_url_deposit"
                                    target="_blank">Docs</a> on Deposits.
                            </p>
                            <v-spacer></v-spacer>
                        </v-row>

                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useAppStore } from "../store/store";
const appStore = useAppStore();

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
import CopyButton from './CopyButton.vue'
import BackButton from "../assets/backBtn.svg";
import DepositInput from "./DepositInput.vue"

import TokenUsdc from '../assets/usdc.png';
import TokenEth from '../assets/eth.png';
import TokenBtc from '../assets/btc.png';

</script>

<style>
.dialogDeposit {
    border: solid !important;
    border-color: #00C797 !important;
    border-width: 1px !important;
}

.dialogDepositMobile {
    padding-left: 27px !important;
    padding-right: 27px !important;
    padding-bottom: 0px !important;
}

.rowDeposit {
    height: 97px;
    background: #1E1E1E;
    padding: 10px !important;
    border-radius: 10px !important;
    border-width: 1px !important;
}
</style>