<template>
    <div>
        <v-dialog v-model="appStore.dlgGetStarted" max-width="647" persistent style="z-index: 9;">
            <template v-slot:activator="{ props }">
                <v-btn v-if="!appStore.isMobile" v-bind="props" variant="text"
                    class="text-none btnGetStarted font-regular text-weight-400 text-size-16px mt-4"
                    style="letter-spacing: 0.2px !important;">Get Started</v-btn>
                <v-btn v-if="appStore.isMobile" v-bind="props" variant="text"
                    class="text-none btnGetStartedMobile font-regular text-weight-400 text-size-14px mt-4"
                    style="letter-spacing: 0.2px !important;">Get Started</v-btn>
            </template>

            <v-card color="black" class="dialogGetstarted">
                <v-toolbar dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="appStore.dlgGetStarted = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-title style="padding-left: 0px;" class="d-flex">
                    <v-row no-gutters>
                        <v-col class="d-flex pa-0 align-center" style="margin-top: 0px;">
                            <v-btn icon variant="plain" style="margin-left: 25px;" @click="appStore.dlgGetStarted = false">
                                <BackButton />
                            </v-btn>
                            <p v-if="!appStore.isMobile" class="font-bold text-white text-weight-700 text-size-22px">
                                Get Started</p>
                            <p v-else class="font-bold text-white text-weight-700 text-size-20px">Get Started</p>
                        </v-col>
                    </v-row>
                </v-card-title>
                <v-row class="mt-1">
                    <v-spacer></v-spacer>
                    <v-btn v-if="appStore.dlgGetStartedTab == 'one'" density="comfortable" icon size="31"
                        style="background: #00C797;">1</v-btn>
                    <v-btn v-else @click="appStore.dlgGetStartedTab = 'one'" density="comfortable" icon size="31"
                        style="border:solid; border-color: #00C797; border-width: 1px;">1</v-btn>
                    <hr
                        style="width: 18px; margin-left: 8px;margin-right: 8px; margin-top: 16px; background: #00C797; height: 1px;border: none;" />
                    <v-btn v-if="appStore.dlgGetStartedTab == 'two'" density="comfortable" icon size="31"
                        style="background: #00C797;">2</v-btn>
                    <v-btn v-else @click="appStore.dlgGetStartedTab = 'two'" density="comfortable" icon size="31"
                        style="border:solid; border-color: #00C797; border-width: 1px;">2</v-btn>
                    <v-spacer></v-spacer>
                </v-row>
                <v-card-text
                    :style="appStore.isMobile ? 'padding-left: 30px; padding-right: 30px;' : 'padding-left: 56px; padding-right: 56px;'">
                    <v-window v-model="appStore.dlgGetStartedTab">
                        <v-window-item value="one">
                            <div style="text-align: center;">
                                <p v-if="!appStore.isMobile" class="font-regular text-white text-weight-700 text-size-35px"
                                    style="margin-top: 32px;">
                                    {{ address ? shortenAddress(address) : 'Connect your wallet' }}
                                    <copy-button v-if="address != ''" :address="address" class="ml-2" />
                                </p>
                                <p v-else class="font-regular text-white text-weight-700 text-size-25px"
                                    style="margin-top: 20px;">
                                    {{ address ? shortenAddress(address) : 'Connect your wallet' }}
                                    <copy-button v-if="address != ''" :address="address" class="ml-2" />
                                </p>
                                <v-row style="width: 100%;">
                                    <v-spacer></v-spacer>
                                    <v-img :width="appStore.isMobile ? 288 : 423" :height="appStore.isMobile ? 225 : 330"
                                        :src="ConnectWalletBanner"
                                        :style="appStore.isMobile ? 'margin-top: 20px;' : 'margin-top: 32px;'"></v-img>
                                    <v-spacer></v-spacer>
                                </v-row>
                                <div v-if="!appStore.isMobile" style="margin-top: 75px; margin-bottom: 122px;">
                                    <div v-if="isActivated">
                                        <v-btn variant="tonal" @click="appStore.dlgGetStartedTab = 'two'"
                                            class="text-none btnConnectWallet">Next</v-btn>
                                    </div>
                                    <v-btn v-if="!isActivated" class="text-none btnConnectWallet" variant="tonal"
                                        @click="connectWallet" :disabled="wallet.status === 'connecting'">
                                        {{
                                            wallet.status === "connecting"
                                            ? "Connecting..."
                                            : wallet.status === "loading"
                                                ? "Loading..."
                                                : "Connect Wallet"
                                        }}
                                    </v-btn>
                                </div>
                                <div v-else style="margin-top: 22px; margin-bottom: 156px;">
                                    <div v-if="isActivated">
                                        <v-btn variant="tonal" @click="appStore.dlgGetStartedTab = 'two'"
                                            class="text-none btnConnectWalletMobile">Next</v-btn>
                                    </div>
                                    <v-btn v-if="!isActivated" class="text-none btnConnectWalletMobile" variant="tonal"
                                        @click="connectWallet" :disabled="wallet.status === 'connecting'">
                                        {{
                                            wallet.status === "connecting"
                                            ? "Connecting..."
                                            : wallet.status === "loading"
                                                ? "Loading..."
                                                : "Connect Wallet"
                                        }}
                                    </v-btn>
                                </div>
                            </div>
                        </v-window-item>

                        <v-window-item value="two" style="margin: 0px;">
                            <div style="text-align: center;">
                                <div v-if="!appStore.isMobile">
                                    <p v-if="appStore.dsa_address == ''"
                                        class="font-regular text-white text-weight-700 text-size-35px"
                                        style="margin-top: 32px;">
                                        Final step, create your DeFi<br />Smart Account (DSA)
                                    </p>
                                    <p v-if="appStore.dsa_address != ''"
                                        class="font-regular text-white text-weight-400 text-size-22px"
                                        style="margin-top: 32px; margin-bottom: 20px;">
                                        DeFi Smart Account (DSA)
                                    </p>
                                    <p v-if="appStore.dsa_address != ''"
                                        class="font-regular text-white text-weight-700 text-size-35px">
                                        {{ shortenAddress(appStore.dsa_address) }}
                                        <copy-button :address="appStore.dsa_address" class="ml-2" />
                                    </p>
                                </div>
                                <div v-else style="margin-bottom: 7px;">
                                    <p v-if="appStore.dsa_address == ''"
                                        class="font-regular text-white text-weight-700 text-size-25px"
                                        style="margin-top: 15px;">
                                        Final step, create your<br />DeFi Smart Account
                                    </p>
                                    <div v-if="appStore.dsa_address != ''">
                                        <p class="font-regular text-white text-weight-400 text-size-22px"
                                            style="margin-top: 15px; margin-bottom: 10px;">
                                            DeFi Smart Account
                                        </p>
                                        <p class="font-regular text-white text-weight-700 text-size-25px">
                                            {{ shortenAddress(appStore.dsa_address) }}
                                            <copy-button :address="appStore.dsa_address" class="ml-2" />
                                        </p>
                                    </div>
                                </div>
                                <v-row style="width: 100%;">
                                    <v-spacer></v-spacer>
                                    <v-img :width="appStore.isMobile ? 265 : 385" :height="appStore.isMobile ? 227 : 330"
                                        :src="CreateDsaBanner"
                                        :style="appStore.isMobile ? 'margin-top: 20px;' : 'margin-top: 32px;'"></v-img>
                                    <v-spacer></v-spacer>
                                </v-row>
                                <div v-if="!appStore.isMobile">
                                    <v-row class="font-regular text-white text-weight-400 text-size-18px mt-1">
                                        <v-col style="text-align: start;">
                                            <v-list style="background: black;">
                                                <ListPoint /> Multiple owners
                                            </v-list>
                                            <v-list style="background: black;">
                                                <ListPoint /> DeFi Composability
                                            </v-list>
                                        </v-col>
                                        <v-col style="text-align: start;">
                                            <v-list style="background: black;">
                                                <ListPoint /> Assets optimization
                                            </v-list>
                                            <v-list style="background: black;">
                                                <ListPoint /> Authorities
                                            </v-list>
                                        </v-col>
                                    </v-row>
                                    <v-btn variant="tonal" class="text-none btnCreateAccount"
                                        style="margin-top: 30px; margin-bottom: 13px;" @click="createDSA"
                                        :loading="btnCreateDSA_loading"
                                        :disabled="appStore.dsa_address != '' || address == ''">Create Account</v-btn>
                                </div>
                                <div v-else style="margin-top: 20px;">
                                    <p class="font-regular text-white text-weight-400 text-size-17px">Multiple owners</p>
                                    <p class="font-regular text-white text-weight-400 text-size-17px">DeFi Composability</p>
                                    <p class="font-regular text-white text-weight-400 text-size-17px">
                                        Assets optimization</p>
                                    <p class="font-regular text-white text-weight-400 text-size-17px">Authorities</p>
                                    <v-btn variant="tonal" class="text-none btnCreateAccountMobile"
                                        style="margin-top: 20px; margin-bottom: 13px;" @click="createDSA"
                                        :loading="btnCreateDSA_loading"
                                        :disabled="appStore.dsa_address != '' || address == ''">Create Account</v-btn>
                                </div>
                            </div>
                        </v-window-item>
                    </v-window>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import CopyButton from './CopyButton.vue'

import BackButton from '../assets/backBtn.svg'
import ConnectWalletBanner from '../assets/connectWalletBanner.png'
import CreateDsaBanner from '../assets/createDsaBanner.png'
import ListPoint from '../assets/point.svg'

import Web3 from "web3";
// import DSA from 'dsa-connect';

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

const dialog = ref(false);

function connectWallet() {
    open();
}

const btnCreateDSA_loading = ref(false);
function createDSA() {
    if (address.value != '') {
        btnCreateDSA_loading.value = true;
        appStore.getDsaAddress(address.value, wallet.provider)
            .then(() => {
                if (appStore.dsa_address != '') {
                    btnCreateDSA_loading.value = false;
                    console.log("GetstartedDialog/getDsaAddress: aleady created dsa")
                } else {
                    const doughV1IndexContract = appStore.getDoughV1IndexContract(wallet.provider);
                    doughV1IndexContract.methods.buildDoughV1Dsa().send({ from: address.value })
                        .on('confirmation', function (confirmationNumber: any, receipt: any) {
                            if (confirmationNumber == appStore.confirmLimit) {
                                btnCreateDSA_loading.value = false;
                                console.log("createDsa receipt: ", receipt);
                                appStore.getDsaAddress(address.value, wallet.provider);
                            }
                        })
                        .on('error', function (error: any) {
                            btnCreateDSA_loading.value = false;
                            console.log("createDsa error: ", error);
                        });
                }
            })
            .catch((error) => {
                btnCreateDSA_loading.value = false;
                console.log("GetstartedDialog/getDsaAddress error: ", error);
            })
    }
}

</script>

<style>
.btnGetStarted {
    width: 119px !important;
    height: 52px !important;
    border-radius: 10px !important;
    background: white !important;
    color: black !important;
}

.btnGetStartedMobile {
    width: 128px !important;
    height: 41px !important;
    border-radius: 5px !important;
    background: #B6BEBC !important;
    color: black !important;
}

.btnConnectWallet {
    width: 100% !important;
    height: 52px !important;
    border-radius: 10px !important;
    font-family: "Aeonik-Regular" !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    text-decoration: none;
}

.btnConnectWalletMobile {
    width: 100% !important;
    height: 52px !important;
    border-radius: 5px !important;
    font-family: "Aeonik-Regular" !important;
    font-weight: 700 !important;
    font-size: 15px !important;
    text-decoration: none;
}

.btnCreateAccount {
    width: 100% !important;
    height: 52px !important;
    border-radius: 10px !important;
    font-weight: 700 !important;
    font-size: 16px !important;
    text-decoration: none;
}

.btnCreateAccountMobile {
    width: 100% !important;
    height: 35px !important;
    border-radius: 5px !important;
    font-family: "Aeonik-Regular";
    font-weight: 700 !important;
    font-size: 15px !important;
    text-decoration: none;
}

.dialogGetstarted {
    border: solid !important;
    border-color: #00C797 !important;
    border-width: 1px !important;
    padding-bottom: 20px !important;
}
</style>