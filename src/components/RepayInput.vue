<template>
    <div>
        <v-dialog v-model="dialogRepayInput" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 3;">
            <template v-slot:activator="{ props }">
                <!-- Repay Button - Desktop -->
                <v-btn v-if="!appStore.isMobile" v-bind="props" class="text-none btnRepay" @click="amountRepay = ''"
                    :disabled="debt_balance <= 0">Repay</v-btn>
                <!-- Repay Button - Mobile -->
                <v-sheet v-else v-bind="props" class="d-flex align-center btnBorrowMobile" @click="amountRepay = ''">
                    <div class="d-flex align-center">
                        <div>
                            <v-img v-if="props_info.repay_token == 'usdc'" width="33" height="33" :src="TokenUsdc"></v-img>
                            <v-img v-if="props_info.repay_token == 'eth'" width="33" height="33" :src="TokenEth"></v-img>
                            <v-img v-if="props_info.repay_token == 'btc'" width="33" height="33" :src="TokenBtc"></v-img>
                        </div>
                        <div style="padding-left: 13px; text-align: start;">
                            <p v-if="props_info.repay_token == 'usdc'"
                                class="font-regular text-white text-weight-700 text-size-18px">USD Coin</p>
                            <p v-if="props_info.repay_token == 'eth'"
                                class="font-regular text-white text-weight-700 text-size-18px">
                                Ethereum</p>
                            <p v-if="props_info.repay_token == 'btc'"
                                class="font-regular text-white text-weight-700 text-size-18px">
                                Bitcoin</p>
                            <p class="font-light text-white text-weight-400 text-size-16px">
                                Borrowed ${{ parseFloat((appStore.aaveV3Usdc_borrow * appStore.price_usdc_aave).toFixed(2))
                                }}
                            </p>
                        </div>
                    </div>
                </v-sheet>
            </template>

            <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">

                <!-- Toolbar - Desktop -->
                <v-toolbar v-if="!appStore.isMobile" dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="dialogRepayInput = false">
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
                            @click="dialogRepayInput = false">
                            <BackButton />
                        </v-btn>
                        <p class="font-bold text-white text-weight-700 text-size-22px">
                            Repay</p>
                    </div>
                    <div v-if="!appStore.isMobile">
                        <v-btn class="font-regular text-none text-white text-weight-700 text-size-16px"
                            style="width: 103px; height: 41px; margin-right: 35px; border-radius: 10px; background: #1E1E1E;"
                            @click="clickBtnBorrow">Borrow</v-btn>
                    </div>
                </v-card-title>

                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">
                        <v-container :class="appStore.isMobile ? 'containerRepayInputMobile' : 'containerRepayInput'">
                            <div class="d-flex align-center" style="margin-top: 10px;">
                                <div class="d-flex me-auto align-center">
                                    <div>
                                        <v-img v-if="appStore.isMobile" width="54" height="51" :src="RepayBanner" />
                                        <v-img v-else width="87" height="82" :src="RepayBanner" />
                                    </div>
                                    <div style="text-align: start; margin-left: 10px;">
                                        <p
                                            :class="appStore.isMobile ? 'font-regular text-white text-weight-700 text-size-17px' : 'font-regular text-white text-weight-700 text-size-22px'">
                                            Total Debts</p>
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
                                        Your Borrows / Debt</p>
                                </v-col>
                            </v-row>

                            <v-sheet
                                :class="appStore.isMobile ? 'd-flex align-center clsRowRepayDebtTokensMobile' : 'd-flex align-center clsRowRepayDebtTokens'">
                                <div class="d-flex me-auto align-center">
                                    <div v-if="appStore.isMobile">
                                        <v-img v-if="props_info.repay_token == 'usdc'" width="33" height="33"
                                            :src="TokenUsdc"></v-img>
                                        <v-img v-if="props_info.repay_token == 'eth'" width="33" height="33"
                                            :src="TokenEth"></v-img>
                                        <v-img v-if="props_info.repay_token == 'btc'" width="33" height="33"
                                            :src="TokenBtc"></v-img>
                                    </div>
                                    <div v-else>
                                        <v-img v-if="props_info.repay_token == 'usdc'" width="58" height="58"
                                            :src="TokenUsdc"></v-img>
                                        <v-img v-if="props_info.repay_token == 'eth'" width="58" height="58"
                                            :src="TokenEth"></v-img>
                                        <v-img v-if="props_info.repay_token == 'btc'" width="58" height="58"
                                            :src="TokenBtc"></v-img>
                                    </div>
                                    <div style="padding-left: 13px; text-align: start;">
                                        <p class="font-regular text-white text-weight-700 text-size-18px">
                                            {{ props_info.repay_token == 'usdc' ? 'USD Coin' :
                                                props_info.repay_token == 'eth' ? 'Ethereum' :
                                                    props_info.repay_token == 'btc' ? 'Bitcoin' : '' }}
                                        </p>
                                        <p class="font-light text-white text-weight-400 text-size-16px">
                                            ${{ debt_balance_usd.toFixed(2) }}</p>
                                    </div>
                                </div>
                                <p class="font-regular text-white text-weight-700 text-size-18px">
                                    {{ parseFloat(debt_balance.toFixed(8)) }}&nbsp;
                                    {{ props_info.repay_token.toUpperCase() }}</p>
                            </v-sheet>
                            <div style="text-align: center; margin-top: 30px;">
                                <p
                                    :class="appStore.isMobile ? 'font-regular text-white text-weight-400 text-size-16px' : 'font-regular text-white text-weight-400 text-size-18px'">
                                    How much would you like to repay? You may<br />
                                    manually enter a specific amount or use the<br />
                                    percentage buttons below.
                                </p>
                            </div>
                            <div :class="class_amountRepayRow" style="margin-top: 20px;">
                                <v-col>
                                    <p style="width: 100%; text-align: end;">
                                        {{ tokenBalance }}&nbsp;{{ props_info.repay_token.toUpperCase() }}
                                    </p>
                                    <div class="d-flex">
                                        <p class="font-regular text-white text-size-25px text-weight-700 mr-5">$</p>
                                        <input v-model="amountRepay" type="number" @keypress="enterDetect"
                                            id="idamountRepay" name="nameamountRepay" color="#FFFFFF"
                                            placeholder="Insert amount to repay"
                                            class="font-regular text-white text-size-25px text-weight-700"
                                            style="width: 100%;;">
                                    </div>
                                </v-col>
                            </div>
                            <v-row style="margin-top: 10px;">
                                <v-col>
                                    <v-btn class="clsBtnAmount" @click="amountRepay = getAmount(20)">20%</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn class="clsBtnAmount" @click="amountRepay = getAmount(50)">50%</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn class="clsBtnAmount" @click="amountRepay = getAmount(75)">75%</v-btn>
                                </v-col>
                                <v-col>
                                    <v-btn class="clsBtnAmount" @click="amountRepay = getAmount(100)">100%</v-btn>
                                </v-col>
                            </v-row>

                            <v-row class="ml-0 mr-0" style="margin-top: 20px;">
                                <!-- <v-btn class="text-none" style="width: 100%; border-radius: 10px;"
                                    :disabled="btn_disabled">Repay</v-btn> -->
                                <repay-confirm :selected_token="props_info.repay_token"
                                    :repay_amount="parseFloat(tokenBalance)" :calc_health_factor="health_factor_value"
                                    :gas_fee="gasFee" :gas_fee_usd="gasFeeUsd" :btn_disable="btn_disabled"
                                    style="width: 100%" />
                            </v-row>

                            <v-row v-if="repay_amount_error_over_dsa"
                                :class="appStore.isMobile ? 'clsAlertAmountErrorRepayInput font-regular text-white text-size-14px text-weight-400' : 'clsAlertAmountErrorRepayInput font-regular text-white text-size-16px text-weight-400'">
                                Warning: You have insufficient funds in your wallet to repay.
                            </v-row>

                            <v-row v-if="repay_amount_error_over_debt"
                                :class="appStore.isMobile ? 'clsAlertAmountErrorRepayInput font-regular text-white text-size-14px text-weight-400' : 'clsAlertAmountErrorRepayInput font-regular text-white text-size-16px text-weight-400'">
                                Warning: You are trying to repay more than the max amount.
                            </v-row>

                            <v-row no-gutters
                                :style="appStore.isMobile ? 'margin-top: 90px;' : 'margin-top: 36px; margin-bottom: 30px;'">
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
import { ref, computed, watch, onMounted } from "vue";
const props_info = defineProps({
    repay_token: {
        type: String,
        required: true,
    },
});

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import LayoutHeader from "./LayoutHeader.vue";
import RepayConfirm from "./RepayConfirm.vue"
import BackButton from "../assets/backBtn.svg";
import RepayBanner from "../assets/repayBanner.png";

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
        if (dialogRepayInput.value) {
            getGasFee();
        }
    }, 5000);
});

const dialogRepayInput = ref(false);

const amountRepay = ref();
const tokenBalance = computed(() => {
    const amount = isNaN(parseFloat(amountRepay.value))
        ? 0
        : parseFloat(amountRepay.value);
    if (props_info.repay_token == "usdc") {
        return (amount / appStore.price_usdc_aave).toFixed(6);
    } else if (props_info.repay_token == "eth") {
        return (amount / appStore.price_eth_aave).toFixed(8);
    } else if (props_info.repay_token == "btc") {
        return (amount / appStore.price_btc_aave).toFixed(8);
    } else {
        return "0";
    }
});

const amountRepayValid = ref(false);
watch(amountRepay, (newVal) => {
    if (newVal < 0) {
        amountRepay.value = 0;
    }
    if (
        newVal <= 0 ||
        newVal > debt_balance_usd.value ||
        newVal > dsa_balance_usd.value ||
        isNaN(newVal)
    ) {
        amountRepayValid.value = false;
    } else {
        amountRepayValid.value = true;
    }
    getGasFee();
});

const btn_disabled = computed(() => {
    return isNaN(parseFloat(amountRepay.value)) || !amountRepayValid.value || gasFee.value == "";
    // return isNaN(parseFloat(amountRepay.value)) || !amountRepayValid.value;
});

const dsa_balance_usd = computed(() => {
    if (props_info.repay_token == "usdc") {
        return (appStore.dsa_usdc_balance * appStore.price_usdc_aave);
    } else if (props_info.repay_token == "eth") {
        return (appStore.dsa_weth_balance * appStore.price_eth_aave);
    } else if (props_info.repay_token == "btc") {
        return (appStore.dsa_wbtc_balance * appStore.price_btc_aave);
    } else {
        return 0;
    }
});

const debt_balance_usd = computed(() => {
    if (props_info.repay_token == "usdc") {
        return (appStore.aaveV3Usdc_borrow * appStore.price_usdc_aave);
    } else if (props_info.repay_token == "eth") {
        return (appStore.aaveV3Weth_borrow * appStore.price_eth_aave);
    } else if (props_info.repay_token == "btc") {
        return (appStore.aaveV3Wbtc_borrow * appStore.price_btc_aave);
    } else {
        return 0;
    }
});

const debt_balance = computed(() => {
    if (props_info.repay_token == "usdc") {
        return appStore.aaveV3Usdc_borrow;
    } else if (props_info.repay_token == "eth") {
        return appStore.aaveV3Weth_borrow;
    } else if (props_info.repay_token == "btc") {
        return appStore.aaveV3Wbtc_borrow;
    } else {
        return 0;
    }
});

const repay_amount_error_over_debt = computed(() => {
    const amount = parseFloat(amountRepay.value);
    if (isNaN(amount)) {
        return false;
    } else {
        return amount > debt_balance_usd.value;
    }
});

const repay_amount_error_over_dsa = computed(() => {
    const amount = parseFloat(amountRepay.value);
    if (isNaN(amount)) {
        return false;
    } else {
        return amount > dsa_balance_usd.value;
    }
});

const class_amountRepayRow = computed(() => {
    if (appStore.isMobile) {
        return repay_amount_error_over_debt.value || repay_amount_error_over_dsa.value
            ? "clsRowAmountRepayErrorMobile"
            : "clsRowAmountRepayMobile";
    } else {
        return repay_amount_error_over_debt.value || repay_amount_error_over_dsa.value
            ? "clsRowAmountRepayError"
            : "clsRowAmountRepay";
    }
});

function clickBtnBorrow() {
    appStore.dlgRepay = false;
    appStore.dlgBorrow = true;
}

const health_factor_value = computed(() => {
    const supply_usd = appStore.aaveV3_total_collateral_base;
    const borrow_usd = appStore.aaveV3_total_debt_base;

    const amount_repay = isNaN(parseFloat(amountRepay.value))
        ? 0
        : parseFloat(amountRepay.value);
    const status_value =
        supply_usd == 0 ? 0 : ((borrow_usd - amount_repay) / supply_usd) * 100;
    const health_factor =
        status_value <= 0
            ? 0
            : appStore.aaveV3_current_liquidation_threshold / status_value;
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
    return parseFloat(((debt_balance_usd.value * percent) / 100).toFixed(2));
}

const gasFee = ref("");
const gasFeeUsd = ref("");
async function getGasFee() {
    if (amountRepayValid.value && props_info.repay_token != "") {
        let tokenAddr = "";
        let amount = "";
        let opt = false;
        if (props_info.repay_token == "usdc") {
            tokenAddr = appStore.USDC;
            amount = new BigNumber(parseFloat(tokenBalance.value))
                .multipliedBy(1e6)
                .toString();
            if (parseFloat(tokenBalance.value) * appStore.price_usdc_aave > appStore.aaveV3_total_debt_base * appStore.closeOptLimit) {
                opt = true;
            }
        } else if (props_info.repay_token == "eth") {
            tokenAddr = appStore.WETH;
            amount = new BigNumber(parseFloat(tokenBalance.value))
                .multipliedBy(1e18)
                .toString();
            if (parseFloat(tokenBalance.value) * appStore.price_eth_aave > appStore.aaveV3_total_debt_base * appStore.closeOptLimit) {
                opt = true;
            }
        } else if (props_info.repay_token == "btc") {
            tokenAddr = appStore.WBTC;
            amount = new BigNumber(parseFloat(tokenBalance.value))
                .multipliedBy(1e8)
                .toString();
            if (parseFloat(tokenBalance.value) * appStore.price_btc_aave > appStore.aaveV3_total_debt_base * appStore.closeOptLimit) {
                opt = true;
            }
        }

        const web3 = new Web3(wallet.provider as any);

        const doughV1DsaContract = appStore.getDoughV1DsaContract(appStore.dsa_address, wallet.provider);
        // Repay Token
        doughV1DsaContract.methods.doughCall(1, 3, tokenAddr, tokenAddr, amount, opt).estimateGas({ from: address.value })
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
.btnRepay {
    width: 119px !important;
    height: 52px !important;
    border-radius: 10px !important;
    background: white !important;
    color: black !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    text-decoration: none;
}

.btnPreviewRepay {
    width: 100% !important;
    height: 52px !important;
    border-radius: 10px !important;
    background: #1e1e1e !important;
    color: white !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    text-decoration: none;
}

.clsRow {
    height: 111px;
    background: #1e1e1e;
    padding-left: 35px !important;
    padding-top: 10px !important;
    padding-right: 35px !important;
    border-radius: 10px !important;
    border-width: 1px !important;
}

.clsRowAmountRepay {
    height: 111px;
    background: #1e1e1e;
    padding-left: 35px !important;
    padding-top: 5px !important;
    padding-right: 35px !important;
    border-radius: 10px !important;
    border-width: 1px !important;
}

.clsRowAmountRepayError {
    height: 111px;
    background: red;
    padding-left: 35px !important;
    padding-top: 5px !important;
    padding-right: 35px !important;
    border-radius: 10px !important;
    border-width: 1px !important;
}

.clsRowAmountRepayMobile {
    /* height: 111px; */
    background: #1e1e1e;
    padding-left: 18px !important;
    padding-top: 5px !important;
    padding-bottom: 10px !important;
    padding-right: 20px !important;
    border-radius: 10px !important;
    border-width: 0px !important;
}

.clsRowAmountRepayErrorMobile {
    /* height: 111px; */
    background: red;
    padding-left: 18px !important;
    padding-top: 5px !important;
    padding-bottom: 10px !important;
    padding-right: 20px !important;
    border-radius: 6px !important;
    border-width: 0px !important;
}

.clsAlertAmountErrorRepayInput {
    background: red;
    color: white;
    padding-left: 20px !important;
    padding-top: 12px !important;
    padding-bottom: 12px !important;
    padding-right: 20px !important;
    margin-top: 24px !important;
    border-radius: 10px !important;
    border-width: 1px !important;
}

.clsBtnAmount {
    width: 100%;
    height: 45px !important;
    background: #1e1e1e;
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

.containerRepayInput {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 52px !important;
    padding-right: 52px !important;
}

.containerRepayInputMobile {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
}

.clsRowRepayDebtTokens {
    height: 111px;
    background: #1e1e1e;
    padding-left: 35px !important;
    padding-right: 35px !important;
    border-radius: 10px !important;
    border-width: 0px !important;
}

.clsRowRepayDebtTokensMobile {
    height: 83px;
    background: #1e1e1e;
    padding-left: 18px !important;
    padding-right: 17px !important;
    border-radius: 6px !important;
    border-width: 0px !important;
}
</style>
