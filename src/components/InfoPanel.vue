<template>
    <div
        :style="appStore.isMobile ? 'margin-top: 41px !important;' : 'margin-top: 68px !important; padding-left: 21px !important;'">
        <!-- <v-alert v-if="chainId == undefined" class="alertDiv mb-8" type="warning" variant="outlined"
            title="Please connect your wallet." text="">
        </v-alert>
        <v-alert v-if="chainId != appStore.chainId && chainId != undefined" class="alertDiv mb-8" type="warning"
            variant="outlined" title="Wrong chain" text="">
            <v-container>
                <v-row>
                    <v-spacer></v-spacer>
                    <v-btn class="text-none text-white ml-5" @click="switchChain">
                        Switch to Mainnet
                    </v-btn>
                </v-row>
            </v-container>
        </v-alert> -->

        <!-- Portfolio Performance -->
        <portfolio-panel />

        <!-- Health Factor - Desktop -->
        <div v-if="!appStore.isMobile">
            <v-container class="healthFactor">
                <v-row>
                    <p class="font-bold text-white text-weight-700 text-size-22px">Health Factor</p>
                    <v-spacer></v-spacer>
                    <p class="font-bold text-white text-weight-700 text-size-18px">
                        {{ appStore.aaveV3_health_factor > 1000 ? "> 1000" : appStore.aaveV3_health_factor.toFixed(2) }}
                    </p>
                </v-row>
                <v-row class="mt-10">
                    <p class="font-regular text-white text-weight-400 text-size-18px">Minimum 1.00</p>
                    <v-spacer></v-spacer>
                    <v-chip label class="font-regular text-size-16px text-weight-400" :color="status_color">
                        {{ status_text }}
                    </v-chip>
                </v-row>
            </v-container>
        </div>
        <!-- Health Factor - Mobile -->
        <div v-else>
            <p class="font-bold text-white text-weight-700 text-size-17px" style="margin-top: 42px;">Health Factor</p>
            <v-container class="healthFactorMobile">
                <v-row class="ma-0 pa-0">
                    <p class="font-bold text-white text-weight-700 text-size-17px">
                        {{ appStore.aaveV3_health_factor > 1000 ? "> 1000" : appStore.aaveV3_health_factor.toFixed(2) }}
                    </p>
                </v-row>
                <div style="width: 100%; height: 7px;"></div>
                <v-row class="ma-0 pa-0">
                    <p class="font-regular text-white text-weight-400 text-size-17px">Minimum 1.00</p>
                    <v-spacer></v-spacer>
                    <v-chip label class="font-regular text-size-17px text-weight-400" :color="status_color">
                        {{ status_text }}
                    </v-chip>
                </v-row>
            </v-container>
        </div>

        <!-- Watch List (DSA) - Desktop -->
        <div v-if="!appStore.isMobile">
            <v-container class="watchList">
                <p class="font-bold text-white text-weight-700 text-size-22px">Watch List ( DSA )</p>
                <v-row no-gutters class="align-center mt-8">
                    <div align-self="center" class="d-flex align-center">
                        <v-img width="42" height="42" :src="TokenUsdc"></v-img>
                        <div style="padding-left: 13px;">
                            <p class="font-regular text-white text-weight-700 text-size-18px">USDC</p>
                            <p class="font-regular text-white text-weight-400 text-size-16px">$
                                {{
                                    parseFloat((appStore.dsa_usdc_balance * appStore.price_usdc_aave).toFixed(2))
                                }}
                            </p>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <div align-self="center" style="text-align: end;">
                        <p class="font-regular text-white text-weight-400 text-size-18px">{{
                            parseFloat(appStore.dsa_usdc_balance.toFixed(6))
                        }}&nbsp;&nbsp;USDC
                        </p>
                    </div>
                </v-row>
                <v-row no-gutters class="align-center mt-8">
                    <div align-self="center" class="d-flex align-center">
                        <v-img width="42" height="42" :src="TokenEth"></v-img>
                        <div style="padding-left: 13px;">
                            <p class="font-regular text-white text-weight-700 text-size-18px">Ethereum</p>
                            <p class="font-regular text-white text-weight-400 text-size-16px">${{
                                parseFloat((appStore.dsa_weth_balance * appStore.price_eth_aave).toFixed(2)) }}</p>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <div align-self="center" style="text-align: end;">
                        <p class="font-regular text-white text-weight-400 text-size-18px">{{
                            parseFloat(appStore.dsa_weth_balance.toFixed(6))
                        }}&nbsp;&nbsp;ETH
                        </p>
                    </div>
                </v-row>
                <v-row no-gutters class="align-center mt-8">
                    <div align-self="center" class="d-flex align-center">
                        <v-img width="42" height="42" :src="TokenBtc"></v-img>
                        <div style="padding-left: 13px;">
                            <p class="font-regular text-white text-weight-700 text-size-18px">Bitcoin</p>
                            <p class="font-regular text-white text-weight-400 text-size-16px">${{
                                parseFloat((appStore.dsa_wbtc_balance * appStore.price_btc_aave).toFixed(2)) }}</p>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <div align-self="center" style="text-align: end;">
                        <p class="font-regular text-white text-weight-400 text-size-18px">{{
                            parseFloat(appStore.dsa_wbtc_balance.toFixed(8))
                        }}&nbsp;&nbsp;BTC
                        </p>
                    </div>
                </v-row>
            </v-container>
        </div>
        <!-- Watch List (DSA) - Mobile -->
        <div v-else>
            <p class="font-bold text-white text-weight-700 text-size-17px" style="margin-top: 40px;">Watch List ( DSA )</p>
            <v-container class="watchListMobile">
                <v-row no-gutters class="align-center mt-0">
                    <div align-self="center" class="d-flex align-center">
                        <v-img width="33" height="33" :src="TokenUsdc"></v-img>
                        <div style="padding-left: 10px;">
                            <p class="font-regular text-white text-weight-700 text-size-17px">USDC</p>
                            <p class="font-regular text-white text-weight-400 text-size-14px">${{
                                parseFloat((appStore.dsa_usdc_balance * appStore.price_usdc_aave).toFixed(2)) }}</p>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <div align-self="center" style="text-align: end;">
                        <p class="font-regular text-white text-weight-400 text-size-17px">{{
                            parseFloat(appStore.dsa_usdc_balance.toFixed(6))
                        }}&nbsp;USDC
                        </p>
                    </div>
                </v-row>
                <v-row no-gutters class="align-center" style="margin-top: 20px;">
                    <div align-self="center" class="d-flex align-center">
                        <v-img width="33" height="33" :src="TokenEth"></v-img>
                        <div style="padding-left: 10px;">
                            <p class="font-regular text-white text-weight-700 text-size-17px">Ethereum</p>
                            <p class="font-regular text-white text-weight-400 text-size-14px">${{
                                parseFloat((appStore.dsa_weth_balance * appStore.price_eth_aave).toFixed(2)) }}</p>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <div align-self="center" style="text-align: end;">
                        <p class="font-regular text-white text-weight-400 text-size-17px">{{
                            parseFloat(appStore.dsa_weth_balance.toFixed(6))
                        }}&nbsp;ETH
                        </p>
                    </div>
                </v-row>
                <v-row no-gutters class="align-center" style="margin-top: 20px;">
                    <div align-self="center" class="d-flex align-center">
                        <v-img width="33" height="33" :src="TokenBtc"></v-img>
                        <div style="padding-left: 10px;">
                            <p class="font-regular text-white text-weight-700 text-size-17px">Bitcoin</p>
                            <p class="font-regular text-white text-weight-400 text-size-14px">${{
                                parseFloat((appStore.dsa_wbtc_balance * appStore.price_btc_aave).toFixed(2)) }}</p>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <div align-self="center" style="text-align: end;">
                        <p class="font-regular text-white text-weight-400 text-size-17px">{{
                            parseFloat(appStore.dsa_wbtc_balance.toFixed(8))
                        }}&nbsp;BTC
                        </p>
                    </div>
                </v-row>
            </v-container>
        </div>
        <!-- Invite Your Friends - Desktip -->
        <v-card v-if="!appStore.isMobile" class="inviteFriends" style="position: relative;">
            <v-img style="width: 151px; height: 191px; position: absolute; bottom: 0px; right: 0px;" :src="inviteImg" cover>
            </v-img>
            <v-card-text class="font-bold text-white text-weight-700 text-size-22px mt-10 ml-5">Invite Your
                Friends</v-card-text>
            <v-card-text class="font-light text-white text-weight-400 text-size-18px mt-0 ml-5" style="width: 315px;">
                Share the link below to invite your friends to join Dough and get rewarded with $25 in USDC.
            </v-card-text>
            <v-card-text class="font-regular text-white text-weight-400 text-size-18px mt-0 ml-5" style="width: 300px;">
                {{ shortLink(invite_link) }}
            </v-card-text>
            <!-- <v-btn class="text-none btnCopy mt-5 ml-10">Copy</v-btn> -->
            <v-tooltip :text="tooltipText" location="bottom">
                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" class="text-none btnCopy mt-5 ml-10" v-clipboard:copy="invite_link"
                        v-clipboard:success="onCopy" v-clipboard:error="onError">
                        Copy
                    </v-btn>
                </template>
            </v-tooltip>
        </v-card>
        <!-- Invite Your Friends - Mobile -->
        <div v-if="appStore.isMobile">
            <p class="font-bold text-white text-weight-700 text-size-17px" style="margin-top: 40px;">
                Invite Your Friends</p>
            <v-card class="inviteFriendsMobile">
                <v-img style="width: 94px; height: 124px; position: absolute; bottom: 0px; right: 0px;" :src="inviteImg"
                    cover>
                </v-img>
                <v-card-text class="font-regular text-white text-weight-500 text-size-17px"
                    style="padding-top: 20px; padding-left: 20px; padding-bottom: 0px; width: 310px;">
                    Share the link below to invite your friends to join Dough and get rewarded with $25 in USDC.
                </v-card-text>
                <v-card-text class="font-regular text-white text-weight-400 text-size-17px"
                    style="padding-top: 0px; padding-left: 20px; margin-top: 20px; width: 300px;">
                    {{ shortLink(invite_link) }}
                </v-card-text>
                <!-- <v-btn class="text-none btnCopyMobile" style="margin-left: 20px; margin-top: 10px;">Copy</v-btn> -->
                <v-tooltip :text="tooltipText" location="bottom">
                    <template v-slot:activator="{ props }">
                        <v-btn v-bind="props" class="text-none btnCopyMobile" style="margin-left: 20px; margin-top: 10px;"
                            v-clipboard:copy="invite_link" v-clipboard:success="onCopy" v-clipboard:error="onError">
                            Copy
                        </v-btn>
                    </template>
                </v-tooltip>
            </v-card>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useTheme, useDisplay } from "vuetify";

import PortfolioPanel from './PortfolioPanel.vue'
import TokenUsdc from '../assets/usdc.png';
import TokenEth from '../assets/eth.png';
import TokenBtc from '../assets/btc.png';
import inviteImg from '../assets/invite.png'

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import Web3 from "web3";

import * as CryptoJS from 'crypto-js';

const copiedStatus = ref(false);
const tooltipText = computed(() => {
    if (copiedStatus.value) {
        return "Copied."
    } else {
        return "Copy to clipboard"
    }
})

let copy_timeout: any;
const onCopy = () => {
    clearTimeout(copy_timeout);
    copiedStatus.value = true;
    copy_timeout = setTimeout(async () => {
        copiedStatus.value = false;
    }, 1000);
}

const onError = () => {
    copiedStatus.value = false;
}

import {
    useBoard,
    useEthers,
    useWallet,
    displayEther,
    shortenAddress,
} from "vue-dapp";

const { open } = useBoard();
const { address, balance, isActivated, chainId } = useEthers();
const { disconnect, wallet } = useWallet();

// async function switchChain() {
//     try {
//         await wallet.provider.request({
//             method: "wallet_switchEthereumChain",
//             params: [
//                 {
//                     chainId: Web3.utils.toHex(
//                         appStore.chainId
//                     ),
//                 },
//             ],
//         });
//     } catch (switchError) {
//         // This error code indicates that the chain has not been added to MetaMask.
//         if (switchError.code === 4902) {
//             try {
//                 await wallet.provider.request({
//                     method: "wallet_addEthereumChain",
//                     params: [
//                         {
//                             chainId: Web3.utils.toHex(
//                                 appStore.chainId
//                             ),
//                             chainName: appStore.chainName,
//                             nativeCurrency: {
//                                 name: appStore.currencySymbol,
//                                 symbol: appStore.currencySymbol,
//                                 decimals: 18,
//                             },
//                             rpcUrls: [appStore.rpcUrl],
//                             blockExplorerUrls: [
//                                 appStore.blockExplorerUrl,
//                             ],
//                         },
//                     ],
//                 });
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//     }
// }

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

const base_url = "https://doughfinance.xyz"
function shortLink(link: string): string {
    if (link.length > base_url.length) {
        return link.slice(0, 48) + "...";
    } else {
        return base_url;
    }

}
const invite_link = computed(() => {
    let ciphertext = ""
    const key = import.meta.env.VITE_INVITE_KEY;
    if (appStore.walletAddress != "") {
        // Encrypt
        ciphertext = CryptoJS.AES.encrypt(
            appStore.walletAddress,
            key
        ).toString();
        return base_url + "?invite=" + ciphertext;
    } else {
        return base_url;
    }

})
</script>
  
<style>
.alertDiv {
    border: solid;
    border-radius: 10px !important;
    border-width: 1px;
}

.portfolioTitle {
    color: #FFFFFF;
    font-weight: 700 !important;
    font-size: 22px !important;
    margin-top: 21px;
    margin-left: 31px;
}

.healthFactor {
    width: 100%;
    height: 185px;
    margin-top: 32px;
    padding-left: 35px !important;
    padding-top: 49px !important;
    padding-right: 30px !important;
    border: solid;
    background: rgb(30, 30, 30);
    border-radius: 10px;
    border-width: 1px;
    border-color: rgb(30, 30, 30);
    letter-spacing: 1.2px;
}

.healthFactorMobile {
    width: 100%;
    height: 97px;
    padding-left: 22px !important;
    padding-top: 21px !important;
    padding-right: 40px !important;
    border: solid;
    background: rgb(30, 30, 30);
    border-radius: 10px;
    border-width: 1px;
    border-color: rgb(30, 30, 30);
    margin-top: 10px;
}

.watchList {
    width: 100%;
    height: 350px;
    margin-top: 32px;
    padding-left: 31px !important;
    padding-top: 38px !important;
    padding-right: 30px !important;
    border: solid;
    background: rgb(30, 30, 30);
    border-radius: 10px;
    border-width: 1px;
    border-color: rgb(30, 30, 30);
}

.watchListMobile {
    width: 100%;
    height: 224px;
    padding-left: 25px !important;
    padding-top: 21px !important;
    padding-right: 20px !important;
    border: solid;
    background: rgb(30, 30, 30);
    border-radius: 10px;
    border-width: 1px;
    border-color: rgb(30, 30, 30);
    margin-top: 10px;
}

.inviteFriends {
    width: 100%;
    height: 372px;
    margin-top: 32px;
    border: solid;
    background: rgb(30, 30, 30);
    border-radius: 10px !important;
    border-width: 1px;
    border-color: rgb(30, 30, 30);
}

.inviteFriendsMobile {
    width: 100%;
    height: 244px;
    border: solid;
    background: rgb(30, 30, 30);
    border-radius: 10px !important;
    border-width: 1px;
    border-color: rgb(30, 30, 30);
    background-image: linear-gradient(to bottom right,
            #00c797,
            #edfcd7) !important;

    margin-top: 10px;
}

.btnCopy {
    width: 119px !important;
    height: 52px !important;
    border-radius: 10px !important;
    background: white !important;
    color: #00C797 !important;
    font-family: "Aeonik-Bold" !important;
    letter-spacing: 0.2px !important;
    font-weight: 700 !important;
    font-size: 16px !important;
}

.btnCopyMobile {
    width: 119px !important;
    height: 48px !important;
    border-radius: 10px !important;
    background: white !important;
    color: #00C797 !important;
    font-family: "Aeonik-Bold" !important;
    letter-spacing: 0.2px !important;
    font-weight: 700 !important;
    font-size: 14px !important;
}

.healthTag {
    border-radius: 5px;
    background: #00C797;
}
</style>