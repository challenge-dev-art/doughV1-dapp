<template>
    <!-- For Desktop & Mobile -->
    <div>
        <v-dialog v-model="appStore.dlgRepay" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 2;">
            <!-- <v-card color="black" class="clsDialogRepay"> -->
            <v-card color="black" :class="appStore.isMobile ? 'clsDialogRepayMobile' : 'clsDialogRepay'">

                <!-- Toolbar for Mobile -->
                <layout-header v-if="appStore.isMobile" />
                <!-- Toolbar for Desktop -->
                <v-toolbar v-else dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="appStore.dlgRepay = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>

                <!-- Title for Mobile -->
                <v-card-title v-if="appStore.isMobile" class="d-flex align-center mx-auto" style="margin-top: 43px;">
                    <v-btn icon variant="plain" @click="appStore.dlgRepay = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">
                        Repay</p>
                </v-card-title>
                <!-- Title for Desktop -->
                <v-card-title v-else>
                    <v-row no-gutters>
                        <v-col class="d-flex pa-0" align-self="center">
                            <v-btn icon variant="plain" style="margin-left: 53px;" @click="appStore.dlgRepay = false">
                                <BackButton />
                            </v-btn>
                            <p class="font-bold text-white text-weight-700 text-size-22px" style="margin-top: 8px;">
                                Repay</p>
                        </v-col>
                        <v-col style="text-align: end;" align-self="center">
                            <v-btn class="font-regular text-none text-white text-weight-700 text-size-16px"
                                style="width: 103px; height: 41px; margin-right: 50px; border-radius: 10px; background: #1E1E1E;"
                                @click="clickBtnBorrow">Borrow</v-btn>
                        </v-col>
                    </v-row>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">
                        <v-container :class="appStore.isMobile ? 'containerBorrowDialogMobile' : 'containerBorrowDialog'">
                            <div class="d-flex align-center" style="margin-top: 10px;">
                                <div class="d-flex me-auto align-center">
                                    <div>
                                        <v-img v-if="appStore.isMobile" width="54" height="51" :src="RepayBanner" />
                                        <v-img v-else width="87" height="82" :src="RepayBanner" />
                                    </div>
                                    <div style="text-align: start; margin-left: 10px;">
                                        <p
                                            :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-17px' : 'font-regular text-white text-weight-700 text-size-22px'">
                                            Total Borrows</p>
                                        <p
                                            :class="appStore.isMobile ? 'font-regular text-collateral text-weight-700 text-size-25px' : 'font-regular text-collateral text-weight-700 text-size-35px'">
                                            ${{ appStore.aaveV3_total_debt_base.toFixed(2) }}
                                        </p>
                                    </div>
                                </div>
                                <div style="text-align: end;">
                                    <div class="d-flex">
                                        <v-chip
                                            :class="appStore.isMobile ? 'font-light text-white text-weight-300 text-size-16px pa-0' : 'font-regular text-white text-weight-300 text-size-16px pa-0'"
                                            variant="text" style="margin-right: 7px;">
                                            Health Factor</v-chip>
                                        <v-chip
                                            :class="appStore.isMobile ? 'font-light text-white text-weight-300 text-size-16px pa-0' : 'font-regular text-white text-weight-300 text-size-16px pa-0'"
                                            variant="text">
                                            {{ appStore.aaveV3_health_factor > 1000 ? "> 1000" :
                                                appStore.aaveV3_health_factor.toFixed(2) }}</v-chip>
                                    </div>
                                    <v-chip label class="font-regular text-size-16px text-weight-400" :color="status_color">
                                        {{ status_text }}
                                    </v-chip>
                                </div>
                            </div>

                            <v-row no-gutters style="margin-top: 20px;">
                                <v-col>
                                    <p
                                        :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-17px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                        Select which token you would like to repay.<br />
                                        You must have funds in order to repay.</p>
                                </v-col>
                            </v-row>

                            <div v-if="appStore.isMobile">
                                <v-container class="pa-0">
                                    <repay-input repay_token="usdc" />
                                    <repay-input repay_token="eth" />
                                    <repay-input repay_token="btc" />
                                </v-container>
                            </div>
                            <div v-else>
                                <v-row no-gutters class="rowRepayDlg" style="margin-top: 10px;">
                                    <v-col align-self="center" cols="2">
                                        <v-img width="42" height="42" :src="TokenUsdc"></v-img>
                                    </v-col>
                                    <v-col align-self="center">
                                        <v-row>
                                            <p class="font-regular text-white text-weight-700 text-size-18px">USD Coin</p>
                                        </v-row>
                                        <v-row>
                                            <p class="font-regular text-white text-weight-300 text-size-18px">
                                                Borrowed ${{
                                                    parseFloat((appStore.aaveV3Usdc_borrow *
                                                        appStore.price_usdc_aave).toFixed(2))
                                                }}
                                            </p>
                                        </v-row>
                                    </v-col>
                                    <v-col align-self="center" cols="3">
                                        <repay-input repay_token="usdc" />
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class="rowRepayDlg" style="margin-top: 15px;">
                                    <v-col align-self="center" cols="2">
                                        <v-img width="42" height="42" :src="TokenEth"></v-img>
                                    </v-col>
                                    <v-col align-self="center">
                                        <v-row>
                                            <p class="font-regular text-white text-weight-700 text-size-18px">Ethereum</p>
                                        </v-row>
                                        <v-row>
                                            <p class="font-regular text-white text-weight-300 text-size-18px">
                                                Borrowed ${{
                                                    parseFloat((appStore.aaveV3Weth_borrow * appStore.price_eth_aave).toFixed(2))
                                                }}
                                            </p>
                                        </v-row>
                                    </v-col>
                                    <v-col align-self="center" cols="3">
                                        <repay-input repay_token="eth" />
                                    </v-col>
                                </v-row>
                                <v-row no-gutters class="rowRepayDlg" style="margin-top: 15px;">
                                    <v-col align-self="center" cols="2">
                                        <v-img width="42" height="42" :src="TokenBtc"></v-img>
                                    </v-col>
                                    <v-col align-self="center">
                                        <v-row>
                                            <p class="font-regular text-white text-weight-700 text-size-18px">Bitcoin</p>
                                        </v-row>
                                        <v-row>
                                            <p class="font-regular text-white text-weight-300 text-size-18px">
                                                Borrowed ${{
                                                    parseFloat((appStore.aaveV3Wbtc_borrow * appStore.price_btc_aave).toFixed(2))
                                                }}
                                            </p>
                                        </v-row>
                                    </v-col>
                                    <v-col align-self="center" cols="3">
                                        <repay-input repay_token="btc" />
                                    </v-col>
                                </v-row>
                            </div>
                            <v-row no-gutters style="margin-top: 180px; margin-bottom: 30px;">
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
import { ref, computed } from "vue";

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
import RepayInput from "./RepayInput.vue"

import BackButton from "../assets/backBtn.svg";
import RepayBanner from "../assets/repayBanner.png";

import TokenUsdc from '../assets/usdc.png';
import TokenEth from '../assets/eth.png';
import TokenBtc from '../assets/btc.png';

const status_text = computed(() => {
    if (appStore.aaveV3_health_factor >= appStore.health_factor_safe) {
        return "Safe";
    } else if (appStore.aaveV3_health_factor >= appStore.health_factor_risky) {
        return "Risky";
    } else if (appStore.aaveV3_health_factor > 1) {
        return "Very Risky";
    } else {
        return "Liquidate";
    }
});
const status_color = computed(() => {
    if (appStore.aaveV3_health_factor >= appStore.health_factor_safe) {
        return "success";
    } else if (appStore.aaveV3_health_factor >= appStore.health_factor_risky) {
        return "warning";
    } else if (appStore.aaveV3_health_factor > 1) {
        return "error";
    } else {
        return "red";
    }
});

function clickBtnBorrow() {
    appStore.dlgRepay = false;
    appStore.dlgBorrow = true;
}

</script>

<style>
.clsDialogRepay {
    border: solid !important;
    border-color: #00C797 !important;
    border-width: 1px !important;
}

.clsDialogRepayMobile {
    padding-left: 27px !important;
    padding-right: 27px !important;
    padding-bottom: 0px !important;
}

.rowRepayDlg {
    height: 97px;
    background: #1E1E1E;
    padding: 10px !important;
    border-radius: 10px !important;
    border-width: 1px !important;
}

.containerRepayDialog {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 52px !important;
    padding-right: 52px !important;
}

.containerRepayDialogMobile {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
}
</style>