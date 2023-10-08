<template>
    <!-- For Desktop & Mobile -->
    <div>
        <v-dialog v-model="appStore.dlgShield" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 2;">
            <!-- <v-card color="black" class="clsDialogShield"> -->
            <v-card color="black" :class="appStore.isMobile ? 'clsDialogShieldMobile' : 'clsDialogShield'">

                <!-- Toolbar for Mobile -->
                <layout-header v-if="appStore.isMobile" />
                <!-- Toolbar for Desktop -->
                <v-toolbar v-else dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="appStore.dlgShield = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>

                <!-- Title for Mobile -->
                <v-card-title v-if="appStore.isMobile" class="d-flex align-center mx-auto" style="margin-top: 43px;">
                    <v-btn icon variant="plain" @click="appStore.dlgShield = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">
                        Shield</p>
                </v-card-title>
                <!-- Title for Desktop -->
                <v-card-title v-else>
                    <v-row no-gutters>
                        <v-col class="d-flex pa-0" align-self="center">
                            <v-btn icon variant="plain" style="margin-left: 53px;" @click="appStore.dlgShield = false">
                                <BackButton />
                            </v-btn>
                            <p class="font-bold text-white text-weight-700 text-size-22px" style="margin-top: 8px;">
                                Shield</p>
                        </v-col>
                    </v-row>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">
                        <v-container :class="appStore.isMobile ? 'containerBorrowDialogMobile' : 'containerBorrowDialog'">
                            <v-row no-gutters style="margin-top: 0px;">
                                <v-col>
                                    <p
                                        :class="appStore.isMobile ? 'font-bold text-white text-weight-700 text-size-17px' : 'font-bold text-white text-weight-700 text-size-18px'">
                                        Automation</p>
                                </v-col>
                            </v-row>
                            <v-row no-gutters style="margin-top: 10px;">
                                <v-col>
                                    <p
                                        :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-16px' : 'font-light text-white text-weight-400 text-size-16px'">
                                        Protection Automation will payback any debt to return the position to the specific
                                        target health ratio upon hitting the triggering health factor. The automation
                                        remains active until it is canceled.</p>
                                </v-col>
                            </v-row>

                            <div :class="appStore.isMobile ? 'clsRowInfoMobile' : 'clsRowInfo'" style="margin-top: 20px;">
                                <v-col>
                                    <p style="width: 100%; text-align: start;" :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-17px'
                                        : 'font-regular text-white text-weight-400 text-size-18px'">
                                        Max Debt to Collateral
                                    </p>
                                    <div class=" d-flex">
                                        <p class="font-regular text-white text-size-25px text-weight-700 mr-5">
                                            {{
                                                parseFloat((appStore.aaveV3_total_debt_base /
                                                    appStore.aaveV3_total_collateral_base * 100).toFixed(2))
                                            }}% / {{ appStore.aaveV3_current_liquidation_threshold }}%</p>
                                    </div>
                                </v-col>
                            </div>
                            <div :class="appStore.isMobile ? 'clsRowInfoMobile' : 'clsRowInfo'" style="margin-top: 20px;">
                                <v-col>
                                    <p style="width: 100%; text-align: start;" :class="appStore.isMobile ? 'font-light text-white text-weight-400 text-size-17px'
                                        : 'font-regular text-white text-weight-400 text-size-18px'">
                                        Health Factor
                                    </p>
                                    <div class=" d-flex align-center">
                                        <p class="font-regular text-white text-size-25px text-weight-700 mr-5 me-auto">
                                            {{ appStore.aaveV3_health_factor > 1000 ? "> 1000" :
                                                appStore.aaveV3_health_factor.toFixed(2) }}</p>
                                        <v-chip label class="font-regular text-size-17px text-weight-400"
                                            :color="status_color">
                                            {{ status_text }}
                                        </v-chip>
                                    </div>
                                </v-col>
                            </div>

                            <!-- HealthFactor Trigger Value -->
                            <div class=" d-flex align-center" style="margin-left: 20px; margin-top: 20px;">
                                <p class="font-regular text-white text-size-18px text-weight-400 mr-5">
                                    Trigger HealthFactor
                                </p>
                                <p>{{ appStore.shield_trigger }}</p>
                            </div>
                            <v-row no-gutters :class="appStore.isMobile ? 'rawInfoMobile' : 'rawInfo'">
                                <v-col align-self="center" style="text-align: start;">
                                    <input v-model="hfTriggerValue" type="number" @keypress="enterDetect" id="idWithdrawDsa"
                                        name="nameWithdrawDsa" placeholder="Insert amount" bg-color="#00C797"
                                        color="#FFFFFF" class="font-regular text-white text-weight-700 text-size-25px"
                                        style="width: 100%;">
                                </v-col>
                            </v-row>

                            <!-- HealthFactor Target Value -->
                            <div class=" d-flex align-center" style="margin-left: 20px; margin-top: 20px;">
                                <p class="font-regular text-white text-size-18px text-weight-400 mr-5">
                                    Target HealthFactor
                                </p>
                                <p>{{ appStore.shield_target }}</p>
                            </div>
                            <v-row no-gutters :class="appStore.isMobile ? 'rawInfoMobile' : 'rawInfo'">
                                <v-col align-self="center" style="text-align: start;">
                                    <input v-model="hfTargetValue" type="number" @keypress="enterDetect" id="idWithdrawDsa"
                                        name="nameWithdrawDsa" placeholder="Insert amount" bg-color="#00C797"
                                        color="#FFFFFF" class="font-regular text-white text-weight-700 text-size-25px"
                                        style="width: 100%;">
                                </v-col>
                            </v-row>

                            <!-- Confirm Button -->
                            <v-row no-gutters :style="appStore.isMobile ? 'margin-top: 25px;' : 'margin-top: 33px;'">
                                <shield-confirm :health_factor="appStore.aaveV3_health_factor"
                                    :trigger_health_factor="hf_trigger_value" :target_health_factor="hf_target_value"
                                    :btn_disable="btn_disabled" style="width: 100%" />
                            </v-row>
                            <!-- Stop Button -->
                            <v-row v-if="appStore.shield_target > 0 && appStore.shield_trigger > 0" no-gutters
                                :style="appStore.isMobile ? 'margin-top: 25px;' : 'margin-top: 33px;'">
                                <shield-stop :health_factor="appStore.aaveV3_health_factor" :trigger_health_factor="0"
                                    :target_health_factor="0" style="width: 100%" />
                            </v-row>
                            <v-row no-gutters style="margin-top: 20px; margin-bottom: 10px;">
                                <v-spacer></v-spacer>
                                <p class="font-regular text-white text-weight-400 text-size-16px">
                                    <a href="#">View</a> history. Read our <a :href="appStore.doc_url_shield"
                                        target="_blank">Docs</a> on Shielding.
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
import { ref, computed, onMounted, watch } from "vue";

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
import ShieldConfirm from "./ShieldConfirm.vue";
import ShieldStop from "./ShieldStop.vue";
import BackButton from "../assets/backBtn.svg";
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

const hf_trigger_value = computed(() => {
    return isNaN(parseFloat(hfTriggerValue.value)) ? 0 : parseFloat(hfTriggerValue.value);
})

const hf_target_value = computed(() => {
    return isNaN(parseFloat(hfTargetValue.value)) ? 0 : parseFloat(hfTargetValue.value);
})

const hfTriggerValue = ref();
const hfTargetValue = ref();

const shieldTriggerInfoValid = ref(false);
watch(hfTriggerValue, (newVal) => {
    if (
        parseFloat(newVal) <= 0 ||
        isNaN(parseFloat(newVal))
    ) {
        shieldTriggerInfoValid.value = false;
    } else {
        shieldTriggerInfoValid.value = true;
    }
});

const shieldTargetInfoValid = ref(false);
watch(hfTargetValue, (newVal) => {
    if (
        parseFloat(newVal) <= 0 ||
        isNaN(parseFloat(newVal))
    ) {
        shieldTargetInfoValid.value = false;
    } else {
        shieldTargetInfoValid.value = true;
    }
});

const btn_disabled = computed(() => {
    return !(shieldTriggerInfoValid.value && shieldTargetInfoValid.value && (hf_target_value.value > hf_trigger_value.value) && (hf_trigger_value.value > 1));
});

function enterDetect(e: KeyboardEvent): void {
    if (e.key == "-" || e.key == "+" || e.key.toLocaleLowerCase() == "e") {
        e.preventDefault();
    }
}

</script>

<style>
.clsDialogShield {
    border: solid !important;
    border-color: #00C797 !important;
    border-width: 1px !important;
}

.clsDialogShieldMobile {
    padding-left: 27px !important;
    padding-right: 27px !important;
    padding-bottom: 0px !important;
}

.rowShieldDlg {
    height: 97px;
    background: #1E1E1E;
    padding: 10px !important;
    border-radius: 10px !important;
    border-width: 1px !important;
}

.containerShieldDialog {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 52px !important;
    padding-right: 52px !important;
}

.containerShieldDialogMobile {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
}

.clsRowInfo {
    height: 97px;
    background: #1e1e1e;
    padding-left: 27px !important;
    padding-top: 8px !important;
    padding-right: 35px !important;
    border-radius: 10px !important;
    border-width: 1px !important;
}

.clsRowInfoMobile {
    /* height: 111px; */
    background: #1e1e1e;
    padding-left: 18px !important;
    padding-top: 15px !important;
    padding-bottom: 10px !important;
    padding-right: 20px !important;
    border-radius: 10px !important;
    border-width: 0px !important;
}

.rawInfo {
    margin-top: 10px !important;
    padding-top: 16px !important;
    padding-bottom: 14px !important;
    padding-left: 40px !important;
    padding-right: 20px !important;
    background: #00c797;
    border: solid;
    border-radius: 10px;
    border-width: 1px;
    border-color: #00c797;
}

.rawInfoMobile {
    margin-top: 10px !important;
    padding-top: 12px !important;
    padding-bottom: 10px !important;
    padding-left: 18px !important;
    padding-right: 18px !important;
    background: #00c797;
    border: solid;
    border-radius: 6px;
    border-width: 1px;
    border-color: #00c797;
}
</style>