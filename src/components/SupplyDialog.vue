<template>
    <!-- For Desktop -->
    <div v-if="!appStore.isMobile">
        <v-dialog v-model="appStore.dlgSupply" max-width="647" style="z-index: 2;">
            <v-card color="black" class="dialogSupply">
                <v-toolbar dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="appStore.dlgSupply = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <!-- Title - Desktop & Mobile -->
                <v-card-title :class="appStore.isMobile ? 'd-flex align-center mx-auto' : 'd-flex align-center'"
                    :style="appStore.isMobile ? 'margin-top: 43px;' : ''">
                    <v-btn icon variant="plain" :style="appStore.isMobile ? '' : 'margin-left: 25px;'"
                        @click="appStore.dlgSupply = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">Supply</p>
                </v-card-title>

                <v-card-text class="pt-0 pb-0">
                    <div style="text-align: center;">
                        <p class="font-regular text-white text-weight-400 text-size-18px">DSA address</p>
                        <v-row no-gutters class="mt-3">
                            <v-spacer></v-spacer>
                            <v-col align-self="center" style="text-align: end;">
                                <p class="font-regular text-white text-weight-700 text-size-18px">
                                    {{ appStore.dsa_address }}
                                </p>
                            </v-col>
                            <v-col align-self="center" style="text-align: start; margin-left: 10px;">
                                <copy-button v-if="appStore.dsa_address != ''" :address="appStore.dsa_address" />
                            </v-col>
                            <v-spacer></v-spacer>
                        </v-row>
                        <p class="font-regular text-white text-weight-400 text-size-18px" style="margin-top: 37px;">
                            Select a token you would like to supply.
                        </p>

                        <v-container class="pt-0 pb-0">
                            <v-row no-gutters class="mt-5 rowSupply">
                                <v-col align-self="center" cols="2">
                                    <v-img width="42" height="42" :src="TokenUsdc"></v-img>
                                </v-col>
                                <v-col align-self="center" cols="2">
                                    <v-row>
                                        <p class="font-regular text-white text-weight-700 text-size-18px">USD Coin</p>
                                    </v-row>
                                    <v-row>
                                        <p class="font-regular text-white text-weight-400 text-size-16px">
                                            ${{ parseFloat((appStore.dsa_usdc_balance *
                                                appStore.price_usdc_aave).toFixed(2))
                                            }}
                                        </p>
                                    </v-row>
                                </v-col>
                                <v-col align-self="center" style="text-align: end;" cols="5">
                                    <p class="font-regular text-white text-weight-700 text-size-18px mr-5">
                                        {{ parseFloat(appStore.dsa_usdc_balance.toFixed(6)) }}&nbsp;&nbsp;USDC
                                    </p>
                                </v-col>
                                <v-col align-self="center" cols="3">
                                    <supply-input supply_token="usdc" />
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="mt-8 rowSupply">
                                <v-col align-self="center" cols="2">
                                    <v-img width="42" height="42" :src="TokenEth"></v-img>
                                </v-col>
                                <v-col align-self="center" cols="2">
                                    <v-row>
                                        <p class="font-regular text-white text-weight-700 text-size-18px">Ethereum</p>
                                    </v-row>
                                    <v-row>
                                        <p class="font-regular text-white text-weight-400 text-size-16px">
                                            ${{ parseFloat((appStore.dsa_weth_balance * appStore.price_eth_aave).toFixed(2))
                                            }}
                                        </p>
                                    </v-row>
                                </v-col>
                                <v-col align-self="center" style="text-align: end;" cols="5">
                                    <p class="font-regular text-white text-weight-700 text-size-18px mr-5">
                                        {{ parseFloat(appStore.dsa_weth_balance.toFixed(5)) }}&nbsp;&nbsp;ETH
                                    </p>
                                </v-col>
                                <v-col align-self="center" cols="3">
                                    <supply-input supply_token="eth" />
                                </v-col>
                            </v-row>
                            <v-row no-gutters class="mt-8 rowSupply">
                                <v-col align-self="center" cols="2">
                                    <v-img width="42" height="42" :src="TokenBtc"></v-img>
                                </v-col>
                                <v-col align-self="center" cols="2">
                                    <v-row>
                                        <p class="font-regular text-white text-weight-700 text-size-18px">Bitcoin</p>
                                    </v-row>
                                    <v-row>
                                        <p class="font-regular text-white text-weight-400 text-size-16px">
                                            ${{ parseFloat((appStore.dsa_wbtc_balance * appStore.price_btc_aave).toFixed(2)) }}
                                        </p>
                                    </v-row>
                                </v-col>
                                <v-col align-self="center" style="text-align: end;" cols="5">
                                    <p class="font-regular text-white text-weight-700 text-size-18px mr-5">
                                        {{ parseFloat(appStore.dsa_wbtc_balance.toFixed(8)) }}&nbsp;&nbsp;BTC
                                    </p>
                                </v-col>
                                <v-col align-self="center" cols="3">
                                    <supply-input supply_token="btc" />
                                </v-col>
                            </v-row>
                            <v-row no-gutters style="margin-top: 176px; margin-bottom: 30px;">
                                <v-spacer></v-spacer>
                                <p class="font-regular text-white text-weight-400 text-size-16px">
                                    <a href="#">View</a> history. Read our <a :href="appStore.doc_url_supply"
                                        target="_blank">Docs</a> on Supplying.
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
        <v-dialog v-model="appStore.dlgSupply" fullscreen transition="fade-transition" style="z-index: 2;">
            <v-card color="black" class="dialogSupplyMobile">
                <layout-header />
                <v-card-title class="d-flex align-center mx-auto" style="margin-top: 43px;">
                    <v-btn icon variant="plain" @click="appStore.dlgSupply = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">
                        Supply</p>
                </v-card-title>
                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">
                        <p class="font-regular text-white text-weight-400 text-size-16px">DSA address</p>
                        <v-row no-gutters class="mt-3 align-center">
                            <v-spacer></v-spacer>
                            <p class="font-regular text-white text-weight-700 text-size-14px" style="margin-right: 10px;">
                                {{ shortenAddress(appStore.dsa_address) }}
                            </p>
                            <copy-button :address="appStore.dsa_address" />
                            <v-spacer></v-spacer>
                        </v-row>
                        <p class="font-light text-white text-weight-400 text-size-16px" style="margin-top: 20px;">
                            Select a token you would like to supply.
                        </p>

                        <v-container class="pa-0">
                            <supply-input supply_token="usdc" />
                            <supply-input supply_token="eth" />
                            <supply-input supply_token="btc" />
                        </v-container>

                        <v-row no-gutters style="margin-top: 215px;">
                            <v-spacer></v-spacer>
                            <p class="font-regular text-white text-weight-400 text-size-16px">
                                <a href="#">View</a> history. Read our <a :href="appStore.doc_url_supply"
                                    target="_blank">Docs</a> on Supplying.
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
import SupplyInput from "./SupplyInput.vue"

import TokenUsdc from '../assets/usdc.png';
import TokenEth from '../assets/eth.png';
import TokenBtc from '../assets/btc.png';

</script>

<style>
.dialogSupply {
    border: solid !important;
    border-color: #00C797 !important;
    border-width: 1px !important;
    padding-bottom: 0px !important;
}

.dialogSupplyMobile {
    padding-left: 27px !important;
    padding-right: 27px !important;
    padding-bottom: 0px !important;
}

.rowSupply {
    height: 97px;
    background: #1E1E1E;
    padding: 10px !important;
    border-radius: 10px !important;
    border-width: 1px !important;
}
</style>