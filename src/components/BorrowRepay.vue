<template>
    <!-- For Desktop & Mobile -->
    <div>
        <v-dialog v-model="appStore.dlgBorrowRepay" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 1;">
            <v-card color="black" :class="appStore.isMobile ? 'dialogBorrowReplayMobile' : 'dialogBorrowReplay'">

                <!-- Toolbar for Mobile -->
                <layout-header v-if="appStore.isMobile" />
                <!-- Toolbar for Desktop -->
                <v-toolbar v-else dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="appStore.dlgBorrowRepay = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>

                <!-- Title for Mobile -->
                <v-card-title v-if="appStore.isMobile" class="d-flex align-center mx-auto" style="margin-top: 43px;">
                    <v-btn icon variant="plain" @click="appStore.dlgBorrowRepay = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">
                        Borrow / Repay</p>
                </v-card-title>
                <!-- Title for Desktop -->
                <v-card-title v-else>
                    <v-row no-gutters>
                        <v-col class="d-flex pa-0" align-self="center">
                            <v-btn icon variant="plain" style="margin-left: 53px;" @click="appStore.dlgBorrowRepay = false">
                                <BackButton />
                            </v-btn>
                            <p class="font-bold text-white text-weight-700 text-size-22px" style="margin-top: 8px;">
                                Borrow / Repay</p>
                        </v-col>
                    </v-row>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center">
                        <v-container>
                            <v-row no-gutters>
                                <v-col>
                                    <BorrowRepayBanner />
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col>
                                    <p class="font-bold text-collateral text-weight-700 text-size-35px">
                                        ${{ (appStore.aaveV3_total_collateral_base).toFixed(2) }}
                                    </p>
                                </v-col>
                            </v-row>
                            <v-row no-gutters>
                                <v-col>
                                    <p class="font-regular text-white text-weight-700 text-size-22px">
                                        Total Collateral</p>
                                </v-col>
                            </v-row>
                            <v-row no-gutters style="margin-top: 10px;">
                                <v-spacer></v-spacer>
                                <v-col class="d-flex align-center"
                                    style="text-align: start; border: solid 1px #1E1E1E; border-radius: 10px; background:#1E1E1E; padding: 9px; margin: 0px;">
                                    <v-chip class="font-light text-white text-weight-300 text-size-16px pa-0" variant="text"
                                        style="margin-right: 7px;">
                                        Health Factor</v-chip>
                                    <v-chip class="font-regular text-white text-weight-400 text-size-16px pa-0"
                                        style="margin-right: 7px;" variant="text">
                                        {{ appStore.aaveV3_health_factor > 1000 ? "> 1000" :
                                            appStore.aaveV3_health_factor.toFixed(2) }}</v-chip>
                                    <v-chip class="font-regular text-size-16px text-weight-400 pa-0" variant="text"
                                        :color="status_color">
                                        {{ status_text }}
                                    </v-chip>
                                </v-col>
                                <v-spacer></v-spacer>
                            </v-row>
                            <v-row no-gutters style="margin-top: 27px;">
                                <v-col>
                                    <p class="font-regular text-white text-weight-400 text-size-18px">
                                        What would you like to do?</p>
                                </v-col>
                            </v-row>
                            <v-row no-gutters style="margin-top: 40px; margin-bottom: 85px;">
                                <v-col style="text-align: end; padding-right: 15px;">
                                    <v-btn class="font-regular text-none text-white text-size-16px text-weight-700"
                                        :style="appStore.isMobile ? 'width: 107px; height: 107px; border-radius: 10px; background: #00C797;' : 'width: 159px; height: 159px; border-radius: 10px; background: #00C797;'"
                                        @click="clickBtnBorrow">Borrow</v-btn>
                                </v-col>
                                <v-col style="text-align: start; padding-left: 15px;">
                                    <v-btn class="font-regular text-none text-white text-size-16px text-weight-700"
                                        :style="appStore.isMobile ? 'width: 107px; height: 107px; border-radius: 10px; background: #B5DF77;' : 'width: 159px; height: 159px; border-radius: 10px; background: #B5DF77;'"
                                        @click="clickBtnRepay">Repay</v-btn>
                                </v-col>
                                <borrow-dialog />
                                <repay-dialog />
                            </v-row>
                        </v-container>
                        <div style="height: 60px;"></div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

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
import BackButton from "../assets/backBtn.svg";
import BorrowRepayBanner from "../assets/borrowRepayBanner.svg";
import BorrowDialog from "./BorrowDialog.vue"
import RepayDialog from "./RepayDialog.vue"

const reqTimer = ref();
onMounted(() => {
    reqTimer.value = setInterval(() => {
        if (appStore.dlgBorrowRepay) {
            appStore.getAaveV3Positions(appStore.dsa_address, wallet.provider);
        }
    }, 10000);
});

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
    appStore.getAaveV3Positions(appStore.dsa_address, wallet.provider)
    appStore.dlgRepay = false;
    appStore.dlgBorrow = true;
}
function clickBtnRepay() {
    appStore.getAaveV3Positions(appStore.dsa_address, wallet.provider)
    appStore.dlgBorrow = false;
    appStore.dlgRepay = true;
}
</script>

<style>
.dialogBorrowReplay {
    border: solid !important;
    border-color: #00c797 !important;
    border-width: 1px !important;
    padding-bottom: 20px !important;
}

.dialogBorrowReplayMobile {
    padding-left: 27px !important;
    padding-right: 27px !important;
    padding-bottom: 0px !important;
}
</style>
