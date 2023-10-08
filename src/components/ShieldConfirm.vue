<template>
    <div>
        <v-dialog v-model="dialogShield" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 4;">
            <template v-slot:activator="{ props }">
                <!-- Shield Confirm Button - Desktop -->
                <v-btn v-if="!appStore.isMobile" v-bind="props"
                    class="btnConfirmShield text-none font-regular text-white text-weight-700 text-size-16px"
                    :disabled="props_info.btn_disable">Update</v-btn>
                <!-- Shield Confirm Button - Mobile -->
                <v-btn v-else v-bind="props"
                    class="btnConfirmShieldMobile text-none font-regular text-white text-weight-700 text-size-15px"
                    :disabled="props_info.btn_disable">Update</v-btn>
            </template>

            <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">

                <!-- Toolbar - Desktop -->
                <v-toolbar v-if="!appStore.isMobile" dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="dialogShield = false">
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
                        @click="dialogShield = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">
                        Shield</p>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">

                        <!-- Summary -->
                        <p class="font-regular text-white text-weight-700 text-size-18px">Summary</p>

                        <v-container :class="appStore.isMobile ? 'containerShieldConfirmMobile' : 'containerShieldConfirm'">
                            <!-- Current HealthFactor -->
                            <v-row class="mt-5">
                                <v-col :cols="appStore.isMobile ? 9 : 6" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Current HealthFactor
                                    </p>
                                </v-col>
                                <v-col v-if="!appStore.isMobile" cols="3"></v-col>
                                <v-col :cols="appStore.isMobile ? 3 : 3" style="text-align: start;" align-self="center">
                                    <p class="font-regular text-white text-weight-700 text-size-18px">
                                        {{ appStore.aaveV3_health_factor > 1000 ? "> 1000" :
                                            appStore.aaveV3_health_factor.toFixed(2) }}
                                    </p>
                                </v-col>
                            </v-row>
                            <!-- Triggering HealthFactor -->
                            <v-row class="mt-5">
                                <v-col :cols="appStore.isMobile ? 9 : 6" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Triggering
                                        HealthFactor</p>
                                </v-col>
                                <v-col v-if="!appStore.isMobile" cols="3"></v-col>
                                <v-col :cols="appStore.isMobile ? 3 : 3" style="text-align: start;" align-self="center">
                                    <p class="font-regular text-white text-weight-700 text-size-18px">
                                        {{ props_info.trigger_health_factor.toFixed(2) }}
                                    </p>
                                </v-col>
                            </v-row>

                            <!-- Target HealthFactor -->
                            <v-row class="mt-5">
                                <v-col :cols="appStore.isMobile ? 9 : 6" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Target HealthFactor
                                    </p>
                                </v-col>
                                <v-col v-if="!appStore.isMobile" cols="3"></v-col>
                                <v-col :cols="appStore.isMobile ? 3 : 3" style="text-align: start;" align-self="center">
                                    <p class="font-regular text-white text-weight-700 text-size-18px">
                                        {{ props_info.target_health_factor.toFixed(2) }}
                                    </p>
                                </v-col>
                            </v-row>

                            <!-- Confirm Dialog -->
                            <v-row no-gutters style="margin-top: 30px;">
                                <v-dialog v-model="dialogShieldResult" :max-width="appStore.isMobile ? 5000 : 647"
                                    :fullscreen="appStore.isMobile ? true : false"
                                    :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" persistent
                                    style="z-index: 5;">
                                    <template v-slot:activator="{ props }">
                                        <!-- Confirm Button -->
                                        <v-btn v-bind="props"
                                            :class="appStore.isMobile ? 'btnConfirmShieldMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmShield text-none font-regular text-white text-weight-700 text-size-16px'"
                                            @click="actionShield">
                                            Confirm Shield
                                        </v-btn>
                                    </template>

                                    <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                                        :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">
                                        <!-- Toolbar - Desktop -->
                                        <v-toolbar v-if="!appStore.isMobile" dark color="black">
                                            <v-spacer></v-spacer>
                                            <v-btn icon variant="plain" dark @click="closeDialogShield"
                                                :disabled="!actionShieldDone">
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
                                                    :class="appStore.isMobile ? 'containerShieldConfirmMobile' : 'containerShieldConfirm'">
                                                    <!-- Banner -->
                                                    <v-row>
                                                        <v-spacer></v-spacer>
                                                        <v-img :width="appStore.isMobile ? 338 : 482"
                                                            :height="appStore.isMobile ? 256 : 365"
                                                            :src="ShieldResultBanner"
                                                            :style="appStore.isMobile ? 'margin-top: 72px;' : 'margin-top: 10px;'"></v-img>
                                                        <v-spacer></v-spacer>
                                                    </v-row>
                                                    <!-- Circle Progress -->
                                                    <div v-if="!actionShieldDone"
                                                        style="width: 100%; height: 105px; margin-top: 10px; padding:30px;">
                                                        <v-progress-circular indeterminate></v-progress-circular>
                                                    </div>

                                                    <p v-if="shield_success"
                                                        :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-25px' : 'font-regular text-white text-weight-700 text-size-35px'"
                                                        style="width: 100%; margin-top: 10px">
                                                        {{ result_text }}
                                                    </p>

                                                    <v-row no-gutters style="margin-top: 30px; margin-bottom: 250px;">
                                                        <v-btn variant="plain"
                                                            :class="appStore.isMobile ? 'btnConfirmDepositMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmDeposit text-none font-regular text-white text-weight-700 text-size-16px'"
                                                            @click="closeDialogShield" :disabled="!actionShieldDone">
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
                                :style="appStore.isMobile ? 'margin-top: 270px;' : 'margin-top: 395px; margin-bottom: 30px;'">
                                <v-spacer></v-spacer>
                                <p class="font-regular text-white text-weight-400 text-size-16px">
                                    <a href="#">View</a> history. Read our <a :href="appStore.doc_url_shield"
                                        target="_blank">Docs</a> on
                                    Shieldals.
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
    health_factor: {
        type: Number,
        required: true,
    },
    trigger_health_factor: {
        type: Number,
        required: true,
    },
    target_health_factor: {
        type: Number,
        required: true,
    },
    btn_disable: {
        type: Boolean,
        required: true,
    },
});

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import LayoutHeader from "./LayoutHeader.vue";
import CopyButton from './CopyButton.vue'
import BackButton from "../assets/backBtn.svg";
import ShieldResultBanner from "../assets/shieldRes.png";
import TokenUsdc from "../assets/usdc.png";
import TokenEth from "../assets/eth.png";
import TokenBtc from "../assets/btc.png";

import Web3 from "web3";

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

const dialogShield = ref(false);
const dialogShieldResult = ref(false);

function closeDialogShield() {
    dialogShield.value = false;
    dialogShieldResult.value = false;
}

const actionShieldDone = ref(false);
const shield_success = ref(false);
const result_text = ref("");
async function actionShield() {
    //   tokenBalance.value = "";
    //   tokenUsdBalance.value = "";
    appStore.dlgSwapEnable = false;
    actionShieldDone.value = false;
    shield_success.value = false;
    result_text.value = "";
    try {
        //------- Start set Shield ---------
        const hr_trigger = BigNumber(props_info.trigger_health_factor)
            .multipliedBy(1e18)
            .toFixed(0);
        const hr_target = BigNumber(props_info.target_health_factor)
            .multipliedBy(1e18)
            .toFixed(0);

        const doughV1DsaIndex = appStore.getDoughV1IndexContract(wallet.provider);
        // set shield value
        doughV1DsaIndex.methods.setShield(hr_trigger, hr_target).send({ from: address.value })
            .on('confirmation', async function (confirmationNumber: any, receipt: any) {
                if (confirmationNumber == appStore.confirmLimit) {
                    await appStore.getWalletAssets(address.value, wallet.provider);
                    result_text.value = "All done!";
                    shield_success.value = true;
                    actionShieldDone.value = true;
                    appStore.dlgSwapEnable = true;
                    console.log("shield Token receipt: ", receipt);
                }
            })
            .on('error', function (error: any) {
                result_text.value = "Failed!";
                shield_success.value = true;
                actionShieldDone.value = true;
                appStore.dlgSwapEnable = true;
                console.log("shield Token error: ", error);
            });
        //------- End Shield -----------
    } catch (error) {
        closeDialogShield();
        console.log(error);
    }
}
</script>
  
<style>
.btnConfirmShield {
    width: 100% !important;
    height: 52px !important;
    border: solid !important;
    border-width: 1px !important;
    border-radius: 10px !important;
    border-color: #1e1e1e !important;
    background: #1e1e1e !important;
}

.btnConfirmShieldMobile {
    width: 100% !important;
    height: 35px !important;
    border: solid !important;
    border-width: 1px !important;
    border-radius: 5px !important;
    border-color: #1E1E1E !important;
    background: #1E1E1E !important;
}


.newBalanceShield {
    height: 111px;
    background: #1E1E1E !important;
    padding-left: 35px !important;
    padding-right: 35px !important;
    border-radius: 10px !important;
}

.newBalanceShieldMobile {
    height: 83px;
    border-radius: 6px !important;
    padding-left: 18px !important;
    padding-right: 17px !important;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    background: #1E1E1E !important;
}

.containerShieldConfirm {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 52px !important;
    padding-right: 52px !important;
}

.containerShieldConfirmMobile {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
}
</style>