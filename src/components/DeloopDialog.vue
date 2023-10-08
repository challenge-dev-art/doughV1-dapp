<template>
    <!-- For Desktop & Mobile -->
    <div>
        <v-dialog v-model="appStore.dlgDeloop" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 2;">
            <v-card color="black" :class="appStore.isMobile ? 'clsDialogDeloopMobile' : 'clsDialogDeloop'">

                <!-- Toolbar for Mobile -->
                <layout-header v-if="appStore.isMobile" />
                <!-- Toolbar for Desktop -->
                <v-toolbar v-else dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="appStore.dlgDeloop = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>

                <!-- Title for Mobile -->
                <v-card-title v-if="appStore.isMobile" class="d-flex align-center mx-auto" style="margin-top: 43px;">
                    <v-btn icon variant="plain" @click="appStore.dlgDeloop = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">
                        Deloop</p>
                </v-card-title>
                <!-- Title for Desktop -->
                <v-card-title v-else>
                    <v-row no-gutters>
                        <v-col class="d-flex pa-0" align-self="center">
                            <v-btn icon variant="plain" style="margin-left: 53px;" @click="appStore.dlgDeloop = false">
                                <BackButton />
                            </v-btn>
                            <p class="font-bold text-white text-weight-700 text-size-22px" style="margin-top: 8px;">Deloop
                            </p>
                        </v-col>
                    </v-row>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">
                        <p style="margin-top: 20px;"
                            :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-17px' : 'font-regular text-white text-weight-400 text-size-18px'">
                            Select a token you would like to deloop.<br />
                            You must have funds deposited order to deloop.
                        </p>

                        <v-container :class="appStore.isMobile ? 'containerDeloopDialogMobile' : 'containerDeloopDialog'">
                            <div v-if="appStore.isMobile">
                                <v-container class="pa-0">
                                    <deloop-input selected_token="eth" />
                                    <deloop-input selected_token="btc" />
                                </v-container>
                            </div>
                            <div v-else>
                                <v-row no-gutters class="rowDeloop" style="margin-top: 15px;">
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
                                                    parseFloat((appStore.aaveV3Weth_borrow *
                                                        appStore.price_eth_aave).toFixed(2))
                                                }}
                                            </p>
                                        </v-row>
                                    </v-col>
                                    <v-col align-self="center" style="text-align: end;" cols="5">
                                        <p class="font-regular text-white text-weight-700 text-size-18px mr-5">
                                            {{ parseFloat(appStore.aaveV3Weth_borrow.toFixed(6)) }}&nbsp;&nbsp;ETH
                                        </p>
                                    </v-col>
                                    <v-col align-self="center" cols="3">
                                        <deloop-input selected_token="eth" />
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class="rowDeloop" style="margin-top: 28px;">
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
                                                    parseFloat((appStore.aaveV3Wbtc_borrow *
                                                        appStore.price_btc_aave).toFixed(2))
                                                }}
                                            </p>
                                        </v-row>
                                    </v-col>
                                    <v-col align-self="center" style="text-align: end;" cols="5">
                                        <p class="font-regular text-white text-weight-700 text-size-18px mr-5">
                                            {{ parseFloat(appStore.aaveV3Wbtc_borrow.toFixed(8)) }}&nbsp;&nbsp;BTC
                                        </p>
                                    </v-col>
                                    <v-col align-self="center" cols="3">
                                        <deloop-input selected_token="btc" />
                                    </v-col>
                                </v-row>
                            </div>
                            <v-row no-gutters
                                :style="appStore.isMobile ? 'margin-top: 330px;' : 'margin-top: 370px; margin-bottom: 30px;'">
                                <v-spacer></v-spacer>
                                <p class="font-regular text-white text-weight-400 text-size-16px">
                                    <a href="#">View</a> history. Read our <a :href="appStore.doc_url_deloop"
                                        target="_blank">Docs</a> on Delooping.
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
import DeloopInput from "./DeloopInput.vue"
import BackButton from "../assets/backBtn.svg";

import TokenUsdc from '../assets/usdc.png';
import TokenEth from '../assets/eth.png';
import TokenBtc from '../assets/btc.png';

</script>

<style>
.clsDialogDeloop {
    border: solid !important;
    border-color: #00C797 !important;
    border-width: 1px !important;
    padding-bottom: 0px !important;
}

.clsDialogDeloopMobile {
    padding-left: 27px !important;
    padding-right: 27px !important;
    padding-bottom: 0px !important;
}


.rowDeloop {
    height: 97px;
    background: #1E1E1E;
    padding: 10px !important;
    border-radius: 10px !important;
    border-width: 1px !important;
}

.containerDeloopDialog {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 52px !important;
    padding-right: 52px !important;
}

.containerDeloopDialogMobile {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
}
</style>