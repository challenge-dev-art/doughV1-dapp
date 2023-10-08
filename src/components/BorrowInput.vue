<template>
    <div>
        <v-dialog v-model="dialogBorrowInput" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 3;">
            <template v-slot:activator="{ props }">
                <!-- Borrow Button - Desktop -->
                <v-btn v-if="!appStore.isMobile" v-bind="props" class="text-none btnBorrow" :disabled="borrow_up_to <= 0"
                    @click="amountBorrow = ''">Borrow</v-btn>
                <!-- Borrow Button - Mobile -->
                <v-sheet v-else v-bind="props" class="d-flex align-center btnBorrowMobile" @click="amountBorrow = ''">
                    <div class="d-flex align-center">
                        <div>
                            <v-img v-if="props_info.borrow_token == 'usdc'" width="33" height="33" :src="TokenUsdc"></v-img>
                            <v-img v-if="props_info.borrow_token == 'eth'" width="33" height="33" :src="TokenEth"></v-img>
                            <v-img v-if="props_info.borrow_token == 'btc'" width="33" height="33" :src="TokenBtc"></v-img>
                        </div>
                        <div style="padding-left: 13px; text-align: start;">
                            <p v-if="props_info.borrow_token == 'usdc'"
                                class="font-regular text-white text-weight-700 text-size-18px">USD Coin</p>
                            <p v-if="props_info.borrow_token == 'eth'"
                                class="font-regular text-white text-weight-700 text-size-18px">
                                Ethereum</p>
                            <p v-if="props_info.borrow_token == 'btc'"
                                class="font-regular text-white text-weight-700 text-size-18px">
                                Bitcoin</p>
                            <p class="font-light text-white text-weight-400 text-size-16px">
                                Borrow up to ${{ borrow_up_to }}</p>
                        </div>
                    </div>
                </v-sheet>
            </template>

            <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">

                <!-- Toolbar - Desktop -->
                <v-toolbar v-if="!appStore.isMobile" dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="dialogBorrowInput = false">
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
                    <div class="d-flex me-auto align-center">
                        <v-btn icon variant="plain" :style="appStore.isMobile ? '' : 'margin-left: 25px;'"
                            @click="dialogBorrowInput = false">
                            <BackButton />
                        </v-btn>
                        <p class="font-bold text-white text-weight-700 text-size-22px">
                            Borrow</p>
                    </div>
                    <div v-if="!appStore.isMobile">
                        <v-btn class="font-regular text-none text-white text-weight-700 text-size-16px"
                            style="width: 103px; height: 41px; margin-right: 35px; border-radius: 10px; background: #1E1E1E;"
                            @click="clickBtnRepay">Repay</v-btn>
                    </div>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">
                        <v-container :class="appStore.isMobile ? 'containerBorrowInputMobile' : 'containerBorrowInput'">
                            <div class="d-flex align-center" style="margin-top: 10px;">
                                <div class="d-flex me-auto align-center">
                                    <div>
                                        <v-img v-if="appStore.isMobile" width="52" height="52" :src="BorrowBanner" />
                                        <v-img v-else width="77" height="77" :src="BorrowBanner" />
                                    </div>
                                    <div style="text-align: start; margin-left: 10px;">
                                        <p
                                            :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-17px' : 'font-regular text-white text-weight-700 text-size-22px'">
                                            Total Collateral</p>
                                        <p
                                            :class="appStore.isMobile ? 'font-regular text-collateral text-weight-700 text-size-25px' : 'font-regular text-collateral text-weight-700 text-size-35px'">
                                            ${{ (appStore.aaveV3_total_collateral_base).toFixed(2) }}
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
                                            {{ health_factor_value.toFixed(2) }}</v-chip>
                                    </div>
                                    <v-chip label class="font-regular text-size-16px text-weight-400" :color="status_color">
                                        {{ status_text }}
                                    </v-chip>
                                </div>
                            </div>

                            <v-row style="margin-top: 30px;">
                                <v-col cols="12">
                                    <p class="font-regular text-white text-weight-400 text-size-18px"
                                        style="text-align: start;">
                                        Selected Token</p>
                                </v-col>
                            </v-row>

                            <v-sheet
                                :class="appStore.isMobile ? 'd-flex align-center clsRowBorrowInputTokensMobile' : 'd-flex align-center clsRowBorrowInputTokens'">
                                <div class="d-flex align-center">
                                    <div v-if="appStore.isMobile">
                                        <v-img v-if="props_info.borrow_token == 'usdc'" width="33" height="33"
                                            :src="TokenUsdc"></v-img>
                                        <v-img v-if="props_info.borrow_token == 'eth'" width="33" height="33"
                                            :src="TokenEth"></v-img>
                                        <v-img v-if="props_info.borrow_token == 'btc'" width="33" height="33"
                                            :src="TokenBtc"></v-img>
                                    </div>
                                    <div v-else>
                                        <v-img v-if="props_info.borrow_token == 'usdc'" width="58" height="58"
                                            :src="TokenUsdc"></v-img>
                                        <v-img v-if="props_info.borrow_token == 'eth'" width="58" height="58"
                                            :src="TokenEth"></v-img>
                                        <v-img v-if="props_info.borrow_token == 'btc'" width="58" height="58"
                                            :src="TokenBtc"></v-img>
                                    </div>
                                    <div style="padding-left: 13px; text-align: start;">
                                        <p class="font-regular text-white text-weight-700 text-size-18px">
                                            {{ props_info.borrow_token == 'usdc' ? 'USD Coin' :
                                                props_info.borrow_token == 'eth' ? 'Ethereum' :
                                                    props_info.borrow_token == 'btc' ? 'Bitcoin' : '' }}
                                        </p>
                                        <p class="font-light text-white text-weight-400 text-size-16px">
                                            Borrow up to ${{ borrow_up_to }}</p>
                                    </div>
                                </div>
                            </v-sheet>

                            <div style="text-align: center; margin-top: 30px;">
                                <p
                                    :class="appStore.isMobile ? 'font-regular text-white text-weight-400 text-size-16px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                    How much would you like to borrow? You may<br />
                                    manually enter a specific amount or use the<br />
                                    percentage buttons below.
                                </p>
                            </div>
                            <div :class="class_amountBorrowRow" style="margin-top: 20px;">
                                <v-col>
                                    <p style="width: 100%; text-align: end;">
                                        {{ tokenBalance }}&nbsp;{{ props_info.borrow_token.toUpperCase() }}
                                    </p>
                                    <div class="d-flex">
                                        <p class="font-regular text-white text-size-25px text-weight-700 mr-5">$</p>
                                        <input v-model="amountBorrow" type="number" @keypress="enterDetect"
                                            id="idAmountBorrow" name="nameAmountBorrow" color="#FFFFFF"
                                            placeholder="Insert amount to borrow"
                                            class="font-regular text-white text-size-25px text-weight-700"
                                            style="width: 100%;;">
                                    </div>
                                </v-col>
                            </div>
                            <v-row style="margin-top: 10px;">
                                <v-col>
                                    <v-btn class="clsBtnAmount" @click="amountBorrow = getAmount(20)">20%</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn class="clsBtnAmount" @click="amountBorrow = getAmount(50)">50%</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn class="clsBtnAmount" @click="amountBorrow = getAmount(75)">75%</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn class="clsBtnAmount" @click="amountBorrow = getAmount(100)">100%</v-btn>
                                </v-col>
                            </v-row>

                            <v-row class="ml-0 mr-0" style="margin-top: 20px;">
                                <!-- <v-btn class="text-none btnPreviewBorrow" style="width: 100%; border-radius: 10px;"
                                    :disabled="btn_disabled">Borrow</v-btn> -->
                                <borrow-confirm :selected_token="props_info.borrow_token"
                                    :borrow_amount="parseFloat(tokenBalance)" :calc_health_factor="health_factor_value"
                                    :gas_fee="gasFee" :gas_fee_usd="gasFeeUsd" :btn_disable="btn_disabled"
                                    style="width: 100%" />
                            </v-row>

                            <v-row v-if="borrow_amount_error"
                                :class="appStore.isMobile ? 'font-regular text-white text-size-14px text-weight-400 clsAlertAmountErrorBorrowInput' : 'font-regular text-white text-size-16px text-weight-400 clsAlertAmountErrorBorrowInput'">
                                Warning: You are trying to borrow more than the max amount.
                                You must have sufficient funds deposited in order to borrow more.
                            </v-row>

                            <v-row no-gutters
                                :style="appStore.isMobile ? 'margin-top: 90px;' : 'margin-top: 40px; margin-bottom: 30px;'">
                                <v-spacer></v-spacer>
                                <p class="font-regular text-white text-weight-400 text-size-16px">
                                    <a href="#">View</a> history. Read our <a :href="appStore.doc_url_borrow"
                                        target="_blank">Docs</a> on Borrowing.
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
    borrow_token: {
        type: String,
        required: true,
    },
});

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import LayoutHeader from "./LayoutHeader.vue";
import BorrowConfirm from "./BorrowConfirm.vue"
import BackButton from "../assets/backBtn.svg";
import BorrowBanner from "../assets/borrowBanner.png";

import TokenUsdc from "../assets/usdc.png";
import TokenEth from "../assets/eth.png";
import TokenBtc from "../assets/btc.png";

import Web3 from "web3";
// import DSA from "dsa-connect";

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

const reqTimer = ref();
onMounted(() => {
    reqTimer.value = setInterval(() => {
        if (dialogBorrowInput.value) {
            getGasFee();
        }
    }, 5000);
});

const dialogBorrowInput = ref(false);

const amountBorrow = ref();
const tokenBalance = computed(() => {
    const amount = isNaN(parseFloat(amountBorrow.value)) ? 0 : parseFloat(amountBorrow.value);
    if (props_info.borrow_token == 'usdc') {
        return (amount / appStore.price_usdc_aave).toFixed(6);
    } else if (props_info.borrow_token == 'eth') {
        return (amount / appStore.price_eth_aave).toFixed(8);
    } else if (props_info.borrow_token == 'btc') {
        return (amount / appStore.price_btc_aave).toFixed(8);
    } else {
        return "0"
    }
})
const amountBorrowValid = ref(false);
watch(amountBorrow, (newVal) => {
    if (newVal < 0) {
        amountBorrow.value = 0;
    }
    if (
        newVal <= 0 ||
        newVal > borrow_up_to.value * 1.2 ||
        isNaN(newVal)
    ) {
        amountBorrowValid.value = false;
    } else {
        amountBorrowValid.value = true;
    }
    getGasFee();
});

const btn_disabled = computed(() => {
    return isNaN(parseFloat(amountBorrow.value)) || !amountBorrowValid.value || gasFee.value == "";
});


const borrow_up_to = computed(() => {
    return parseFloat((appStore.aaveV3_available_borrows_base).toFixed(2))
})
const borrow_amount_error = computed(() => {
    const amount = parseFloat(amountBorrow.value);
    if (isNaN(amount)) {
        return false;
    } else {
        return amount > borrow_up_to.value;
    }
})
const class_amountBorrowRow = computed(() => {
    if (appStore.isMobile) {
        return borrow_amount_error.value ? "clsRowAmountBorrowErrorMobile" : "clsRowAmountBorrowMobile"
    } else {
        return borrow_amount_error.value ? "clsRowAmountBorrowError" : "clsRowAmountBorrow"
    }
})

function clickBtnRepay() {
    appStore.dlgBorrow = false;
    appStore.dlgRepay = true;
}

const health_factor_value = computed(() => {
    const supply_usd = appStore.aaveV3_total_collateral_base;
    const borrow_usd = appStore.aaveV3_total_debt_base;

    const amount_borrow = isNaN(parseFloat(amountBorrow.value)) ? 0 : parseFloat(amountBorrow.value);
    const status_value = supply_usd == 0 ? 0 : (borrow_usd + amount_borrow) / supply_usd * 100
    const health_factor = status_value == 0 ? 0 : appStore.aaveV3_current_liquidation_threshold / status_value;
    return health_factor;
});

const status_text = computed(() => {
    if (health_factor_value.value >= appStore.health_factor_safe) {
        return "Safe";
    } else if (health_factor_value.value >= appStore.health_factor_risky) {
        return "Risky";
    } else if (health_factor_value.value > 1) {
        return "Very Risky";
    } else {
        return "Liquidate";
    }
});
const status_color = computed(() => {
    if (health_factor_value.value >= appStore.health_factor_safe) {
        return "success";
    } else if (health_factor_value.value >= appStore.health_factor_risky) {
        return "warning";
    } else if (health_factor_value.value > 1) {
        return "error";
    } else {
        return "red";
    }
});

function enterDetect(e: KeyboardEvent): void {
    if (e.key == "-" || e.key == "+" || e.key.toLocaleLowerCase() == "e") {
        e.preventDefault();
    }
}

function getAmount(percent: number): number {
    return parseFloat((borrow_up_to.value * percent / 100).toFixed(2));
}

const gasFee = ref("");
const gasFeeUsd = ref("");
async function getGasFee() {
    if (amountBorrowValid.value && props_info.borrow_token != "") {
        let tokenAddr = "";
        let amount = "";
        if (props_info.borrow_token == "usdc") {
            tokenAddr = appStore.USDC;
            amount = new BigNumber(parseFloat(tokenBalance.value)).multipliedBy(1e6).toString();
        } else if (props_info.borrow_token == "eth") {
            tokenAddr = appStore.WETH;
            amount = new BigNumber(parseFloat(tokenBalance.value))
                .multipliedBy(1e18)
                .toString();
        } else if (props_info.borrow_token == "btc") {
            tokenAddr = appStore.WBTC;
            amount = new BigNumber(parseFloat(tokenBalance.value)).multipliedBy(1e8).toString();
        }

        const web3 = new Web3(wallet.provider as any);

        const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
        // Borrow Token
        doughV1DsaContract.methods.doughCall(1, 2, tokenAddr, tokenAddr, amount, false).estimateGas({ from: address.value })
            .then(async (gas: any) => {
                // console.log("gas: ", gas)
                const gas_price = await web3.eth.getGasPrice();
                const gasPriceInGwei = web3.utils.fromWei(gas_price, "gwei");
                // console.log("gas_price: ", gasPriceInGwei);

                gasFee.value = BigNumber(gas ?? 0)
                    .multipliedBy(gasPriceInGwei)
                    .dividedBy(1000000000)
                    .toFixed(5);
                gasFeeUsd.value = BigNumber(gas ?? 0)
                    .multipliedBy(gasPriceInGwei)
                    .dividedBy(1000000000)
                    .multipliedBy(appStore.price_eth_aave)
                    .toFixed(2);
                // console.log("gasFee: ", gasFee)

            })
            .catch((error: any) => {
                gasFee.value = "";
                gasFeeUsd.value = "";
            })
    } else {
        gasFee.value = "";
        gasFeeUsd.value = "";
    }
}

</script>

<style>
.btnBorrow {
    width: 119px !important;
    height: 52px !important;
    border-radius: 10px !important;
    background: white !important;
    color: black !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    text-decoration: none;
}

.btnBorrowMobile {
    width: 100% !important;
    height: 83px !important;
    margin-top: 25px;
    border-radius: 6px !important;
    padding-left: 18px !important;
    padding-right: 17px !important;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    background: #1E1E1E !important;
    color: black !important;
}

.clsRowBorrowInputTokens {
    height: 111px;
    background: #1e1e1e;
    padding-left: 35px !important;
    border-radius: 10px !important;
    border-width: 0px !important;
}

.clsRowBorrowInputTokensMobile {
    height: 83px;
    background: #1e1e1e;
    padding-left: 18px !important;
    border-radius: 6px !important;
    border-width: 0px !important;
}

.clsRowAmountBorrow {
    height: 111px;
    background: #1e1e1e;
    padding-left: 35px !important;
    padding-top: 5px !important;
    padding-right: 35px !important;
    border-radius: 10px !important;
    border-width: 0px !important;
}

.clsRowAmountBorrowError {
    height: 111px;
    background: red;
    padding-left: 35px !important;
    padding-top: 5px !important;
    padding-right: 35px !important;
    border-radius: 10px !important;
    border-width: 0px !important;
}

.clsRowAmountBorrowMobile {
    /* height: 83px; */
    background: #1e1e1e;
    padding-left: 18px !important;
    padding-top: 5px !important;
    padding-bottom: 10px !important;
    padding-right: 20px !important;
    border-radius: 10px !important;
    border-width: 0px !important;
}

.clsRowAmountBorrowErrorMobile {
    /* height: 83px; */
    background: red;
    padding-left: 18px !important;
    padding-top: 5px !important;
    padding-bottom: 10px !important;
    padding-right: 20px !important;
    border-radius: 6px !important;
    border-width: 0px !important;
}

.clsAlertAmountErrorBorrowInput {
    background: red;
    padding-left: 0px !important;
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    padding-right: 0px !important;
    margin-top: 24px !important;
    border-radius: 10px !important;
    border-width: 1px !important;
}

.clsBtnAmount {
    width: 100%;
    height: 45px !important;
    background: #1E1E1E;
    border-radius: 10px !important;
    color: white;
}

.amountToken {
    margin-top: 35px !important;
    padding-top: 46px !important;
    padding-bottom: 34px !important;
    padding-left: 40px !important;
    padding-right: 20px !important;
    background: #00c797;
    border: solid;
    border-radius: 10px;
    border-width: 1px;
    border-color: #00c797;
}

input::placeholder {
    color: white;
    font-weight: 400 !important;
    font-size: 18px !important;
}

.containerBorrowInput {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 52px !important;
    padding-right: 52px !important;
}

.containerBorrowInputMobile {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
}
</style>
