<template>
    <!-- For Desktop -->
    <div v-if="!appStore.isMobile">
        <v-dialog v-model="appStore.dlgWithdrawAave" max-width="647" style="z-index: 2;">
            <v-card color="black" class="clsDialogWithdraw">
                <v-toolbar dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="appStore.dlgWithdrawAave = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <!-- Title - Desktop & Mobile -->
                <v-card-title :class="appStore.isMobile ? 'd-flex align-center mx-auto' : 'd-flex align-center'"
                    :style="appStore.isMobile ? 'margin-top: 43px;' : ''">
                    <v-btn icon variant="plain" :style="appStore.isMobile ? '' : 'margin-left: 25px;'"
                        @click="appStore.dlgWithdrawAave = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">Withdraw</p>
                </v-card-title>
                <v-card-text class="pt-0 pb-0">
                    <div style="text-align: center;">
                        <p class="font-regular text-white text-weight-400 text-size-18px"
                            style="margin-top: 5px; margin-bottom: 10px;">
                            Select a token you would like to withdraw.</p>
                        <v-container class="pt-0 pb-0">
                            <v-row no-gutters class="mt-5 rowWithdraw">
                                <v-col align-self="center" cols="2">
                                    <v-img width="42" height="42" :src="TokenUsdc"></v-img>
                                </v-col>
                                <v-col align-self="center" cols="2">
                                    <v-row>
                                        <p class="font-regular text-white text-weight-700 text-size-18px">USDC</p>
                                    </v-row>
                                    <v-row>
                                        <p class="font-regular text-white text-weight-400 text-size-16px">
                                            ${{
                                                parseFloat((appStore.aaveV3Usdc_supply * appStore.price_usdc_aave).toFixed(2))
                                            }}</p>
                                    </v-row>
                                </v-col>
                                <v-col align-self="center" cols="5">
                                    <p class="font-regular text-white text-weight-700 text-size-18px mr-5"
                                        style="text-align: end;">
                                        {{ parseFloat(appStore.aaveV3Usdc_supply.toFixed(6)) }} USDC</p>
                                </v-col>
                                <v-col align-self="center" cols="3">
                                    <!-- <withdraw-input withdraw_token="usdc" /> -->
                                    <withdraw-input withdraw_token="usdc" />
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="mt-8 rowWithdraw">
                                <v-col align-self="center" cols="2">
                                    <v-img width="42" height="42" :src="TokenEth"></v-img>
                                </v-col>
                                <v-col align-self="center" cols="2">
                                    <v-row>
                                        <p class="font-regular text-white text-weight-700 text-size-18px">Ethereum</p>
                                    </v-row>
                                    <v-row>
                                        <p class="font-regular text-white text-weight-400 text-size-16px">
                                            ${{
                                                parseFloat((appStore.aaveV3Weth_supply * appStore.price_eth_aave).toFixed(2))
                                            }}
                                        </p>
                                    </v-row>
                                </v-col>
                                <v-col align-self="center" cols="5">
                                    <p class="font-regular text-white text-weight-700 text-size-18px mr-5"
                                        style="text-align: end;">
                                        {{ parseFloat(appStore.aaveV3Weth_supply.toFixed(5)) }} ETH
                                    </p>
                                </v-col>
                                <v-col align-self="center" cols="3">
                                    <withdraw-input withdraw_token="eth" />
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="mt-8 rowWithdraw">
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
                                                parseFloat((appStore.aaveV3Wbtc_supply * appStore.price_btc_aave).toFixed(2))
                                            }}
                                        </p>
                                    </v-row>
                                </v-col>
                                <v-col align-self="center" cols="5">
                                    <p class="font-regular text-white text-weight-700 text-size-18px mr-5"
                                        style="text-align: end;">
                                        {{ parseFloat(appStore.aaveV3Wbtc_supply.toFixed(8)) }} BTC</p>
                                </v-col>
                                <v-col align-self="center" cols="3">
                                    <withdraw-input withdraw_token="btc" />
                                </v-col>
                            </v-row>
                            <v-row no-gutters style="margin-top: 278px; margin-bottom: 30px;">
                                <v-spacer></v-spacer>
                                <p class="font-regular text-white text-weight-400 text-size-16px">
                                    <a href="#">View</a> history. Read our <a :href="appStore.doc_url_withdraw"
                                        target="_blank">Docs</a> on Withdrawals.
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
        <v-dialog v-model="appStore.dlgWithdrawAave" fullscreen transition="fade-transition" style="z-index: 2;">
            <v-card color="black" class="clsDialogWithdrawAaveMobile">
                <layout-header />
                <v-card-title class="d-flex align-center mx-auto" style="margin-top: 43px;">
                    <v-btn icon variant="plain" @click="appStore.dlgWithdrawAave = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">
                        Withdraw</p>
                </v-card-title>
                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">
                        <p class="font-light text-white text-weight-400 text-size-16px" style="margin-top: 20px;">
                            Select a token you would like to withdraw.
                        </p>
                        <v-container class="pa-0">
                            <withdraw-input withdraw_token="usdc" />
                            <withdraw-input withdraw_token="eth" />
                            <withdraw-input withdraw_token="btc" />
                        </v-container>

                        <v-row no-gutters style="margin-top: 275px;">
                            <v-spacer></v-spacer>
                            <p class="font-regular text-white text-weight-400 text-size-16px">
                                <a href="#">View</a> history. Read our <a :href="appStore.doc_url_withdraw"
                                    target="_blank">Docs</a> on Withdrawals.
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

import LayoutHeader from "./LayoutHeader.vue";
import BackButton from '../assets/backBtn.svg'
import WithdrawInput from './WithdrawInput.vue'
import IconWithdraw from '../assets/withdraw.svg';

import TokenUsdc from '../assets/usdc.png';
import TokenEth from '../assets/eth.png';
import TokenBtc from '../assets/btc.png';
</script>

<style>
.clsDialogWithdrawAave {
    border: solid !important;
    border-color: #00C797 !important;
    border-width: 1px !important;
    padding-bottom: 0px !important;
}

.clsDialogWithdrawAaveMobile {
    padding-left: 27px !important;
    padding-right: 27px !important;
    padding-bottom: 0px !important;
}

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

.rowWithdraw {
    height: 97px;
    background: #1E1E1E;
    padding: 10px !important;
    border-radius: 10px !important;
    border-width: 1px !important;
}
</style>