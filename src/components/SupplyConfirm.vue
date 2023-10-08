<template>
    <div>
        <v-dialog v-model="dialogSupply" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 4;">
            <template v-slot:activator="{ props }">
                <!-- Supply Confirm Button - Desktop -->
                <v-btn v-if="!appStore.isMobile" v-bind="props"
                    class="btnConfirmSupply text-none font-regular text-white text-weight-700 text-size-16px"
                    :disabled="props_info.btn_disable">Confirm Supply</v-btn>
                <!-- Supply Confirm Button - Mobile -->
                <v-btn v-else v-bind="props"
                    class="btnConfirmSupplyMobile text-none font-regular text-white text-weight-700 text-size-15px"
                    :disabled="props_info.btn_disable">Confirm Supply</v-btn>
            </template>

            <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">

                <!-- Toolbar - Desktop -->
                <v-toolbar v-if="!appStore.isMobile" dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="dialogSupply = false">
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
                        @click="dialogSupply = false">
                        <BackButton />
                    </v-btn>
                    <p class="font-bold text-white text-weight-700 text-size-22px">
                        Supply {{ props_info.selected_token.toUpperCase() }}</p>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">

                        <!-- Summary -->
                        <p class="font-regular text-white text-weight-700 text-size-18px">Summary</p>

                        <v-container :class="appStore.isMobile ? 'containerSupplyConfirmMobile' : 'containerSupplyConfirm'">
                            <!-- Selected Token -->
                            <v-row :style="appStore.isMobile ? 'margin-top: 15px;' : 'margin-top: 20px;'">
                                <v-col :cols="appStore.isMobile ? 6 : 4" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Selected Token</p>
                                </v-col>
                                <v-col v-if="!appStore.isMobile" cols="4"></v-col>
                                <v-col :cols="appStore.isMobile ? 6 : 4" style="text-align: start;" align-self="center">
                                    <div v-if="props_info.selected_token == 'eth'">
                                        <p class="font-regular text-white text-weight-700 text-size-18px">Ethereum</p>
                                        <p class="font-regular text-white text-weight-400 text-size-18px">ETH</p>
                                    </div>
                                    <div v-if="props_info.selected_token == 'usdc'">
                                        <p class="font-regular text-white text-weight-700 text-size-18px">USD Coin</p>
                                        <p class="font-regular text-white text-weight-400 text-size-18px">USDC</p>
                                    </div>
                                    <div v-if="props_info.selected_token == 'btc'">
                                        <p class="font-regular text-white text-weight-700 text-size-18px">Bitcoin</p>
                                        <p class="font-regular text-white text-weight-400 text-size-18px">BTC</p>
                                    </div>
                                </v-col>
                            </v-row>
                            <!-- Supplied Amount -->
                            <v-row class="mt-5">
                                <v-col :cols="appStore.isMobile ? 6 : 4" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Supplied Amount</p>
                                </v-col>
                                <v-col v-if="!appStore.isMobile" cols="4"></v-col>
                                <v-col :cols="appStore.isMobile ? 6 : 4" style="text-align: start;" align-self="center">
                                    <p class="font-regular text-white text-weight-700 text-size-18px">
                                        {{ props_info.supply_amount }} {{ props_info.selected_token.toUpperCase() }}
                                    </p>
                                </v-col>
                            </v-row>
                            <!-- Gas Fee -->
                            <v-row class="mt-5">
                                <v-col :cols="appStore.isMobile ? 6 : 4" align-self="center" style="text-align: start;">
                                    <p class="font-regular text-white text-weight-400 text-size-18px">Gas Fee</p>
                                </v-col>
                                <v-col v-if="!appStore.isMobile" cols="4"></v-col>
                                <v-col :cols="appStore.isMobile ? 6 : 4" style="text-align: start;" align-self="center">
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
                                <v-dialog v-model="dialogSupplyResult" :max-width="appStore.isMobile ? 5000 : 647"
                                    :fullscreen="appStore.isMobile ? true : false"
                                    :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" persistent
                                    style="z-index: 5;">
                                    <template v-slot:activator="{ props }">
                                        <!-- Confirm Button -->
                                        <v-btn v-bind="props"
                                            :class="appStore.isMobile ? 'btnConfirmSupplyMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmSupply text-none font-regular text-white text-weight-700 text-size-16px'"
                                            @click="actionSupply">
                                            Confirm Supply
                                        </v-btn>
                                    </template>

                                    <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                                        :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">
                                        <!-- Toolbar - Desktop -->
                                        <v-toolbar v-if="!appStore.isMobile" dark color="black">
                                            <v-spacer></v-spacer>
                                            <v-btn icon variant="plain" dark @click="closeDialogSupply"
                                                :disabled="!actionSupplyDone">
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
                                                    :class="appStore.isMobile ? 'containerSupplyConfirmMobile' : 'containerSupplyConfirm'">
                                                    <v-row>
                                                        <v-spacer></v-spacer>
                                                        <v-img :width="appStore.isMobile ? 302 : 431"
                                                            :height="appStore.isMobile ? 303 : 432"
                                                            :src="SupplyResultBanner"
                                                            :style="appStore.isMobile ? 'margin-top: 136px;' : 'margin-top: 10px;'"></v-img>
                                                        <v-spacer></v-spacer>
                                                    </v-row>
                                                    <div v-if="!actionSupplyDone"
                                                        style="width: 100%; height: 30px; margin-top: 10px; padding:30px;">
                                                        <v-progress-circular indeterminate></v-progress-circular>
                                                    </div>
                                                    <p v-if="supply_success"
                                                        :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-25px' : 'font-regular text-white text-weight-700 text-size-35px'"
                                                        style="width: 100%; height: 30px; margin-top: 10px">
                                                        {{ result_text }}
                                                    </p>
                                                    <v-row no-gutters style="margin-top: 35px; margin-bottom: 225px;">
                                                        <v-btn variant="plain"
                                                            :class="appStore.isMobile ? 'btnConfirmSupplyMobile text-none font-regular text-white text-weight-700 text-size-15px' : 'btnConfirmSupply text-none font-regular text-white text-weight-700 text-size-16px'"
                                                            @click="closeDialogSupply" :disabled="!actionSupplyDone">
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
                                :style="appStore.isMobile ? 'margin-top: 330px;' : 'margin-top: 345px; margin-bottom: 30px;'">
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
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
const props_info = defineProps({
    selected_token: {
        type: String,
        required: true,
    },
    supply_amount: {
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
    },
});

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import LayoutHeader from "./LayoutHeader.vue";
import CopyButton from "./CopyButton.vue";

import BackButton from "../assets/backBtn.svg";
import SupplyResultBanner from "../assets/depositRes.png";
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

const dialogSupply = ref(false);
const dialogSupplyResult = ref(false);

function closeDialogSupply() {
    dialogSupply.value = false;
    dialogSupplyResult.value = false;
}

const actionSupplyDone = ref(false);
const supply_success = ref(false);
const result_text = ref("")
async function actionSupply() {
    appStore.dlgSwapEnable = false;
    actionSupplyDone.value = false;
    supply_success.value = false;
    //------- Start Supply ---------
    let tokenAddr = "";
    let amount = "";
    if (props_info.selected_token == "usdc") {
        tokenAddr = appStore.USDC;
        amount = BigNumber(props_info.supply_amount).multipliedBy(1e6).toString();
    } else if (props_info.selected_token == "eth") {
        tokenAddr = appStore.WETH;
        amount = BigNumber(props_info.supply_amount)
            .multipliedBy(1e18)
            .toString();
    } else if (props_info.selected_token == "btc") {
        tokenAddr = appStore.WBTC;
        amount = BigNumber(props_info.supply_amount).multipliedBy(1e8).toString();
    }

    const web3 = new Web3(wallet.provider as any);

    const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
    // supply Token
    doughV1DsaContract.methods.doughCall(1, 0, tokenAddr, tokenAddr, amount, false).send({ from: address.value })
        .on('confirmation', async function (confirmationNumber: any, receipt: any) {
            if (confirmationNumber == appStore.confirmLimit) {
                await appStore.getWalletAssets(address.value, wallet.provider);
                result_text.value = "All done!";
                supply_success.value = true;
                console.log("supply Token receipt: ", receipt);
                actionSupplyDone.value = true;
                appStore.dlgSwapEnable = true;
            }
        })
        .on('error', function (error: any) {
            result_text.value = "Failed!";
            supply_success.value = true;
            console.log("supply Token error: ", error);
            actionSupplyDone.value = true;
            appStore.dlgSwapEnable = true;
        });

    //------- End Supply -----------
}
</script>

<style>
.btnConfirmSupply {
    width: 100% !important;
    height: 52px !important;
    border: solid !important;
    border-width: 1px !important;
    border-radius: 10px !important;
    border-color: #1e1e1e !important;
    background: #1e1e1e !important;
}

.btnConfirmSupplyMobile {
    width: 100% !important;
    height: 35px !important;
    border: solid !important;
    border-width: 1px !important;
    border-radius: 5px !important;
    border-color: #1E1E1E !important;
    background: #1E1E1E !important;
}

.containerSupplyConfirm {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 52px !important;
    padding-right: 52px !important;
}

.containerSupplyConfirmMobile {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
}
</style>