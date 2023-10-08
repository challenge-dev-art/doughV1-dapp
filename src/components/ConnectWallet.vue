<template>
    <div>
        <v-dialog v-model="appStore.dlgWalletConnect" :max-width="appStore.isMobile ? 5000 : 647"
            :fullscreen="appStore.isMobile ? true : false"
            :transition="appStore.isMobile ? 'fade-transition' : 'dialog-transition'" style="z-index: 5;">
            <v-card color="black" :class="appStore.isMobile ? '' : 'clsDialog'"
                :style="appStore.isMobile ? 'padding-left: 27px; padding-right: 27px;' : ''">
                <v-toolbar dark color="black">
                    <v-spacer></v-spacer>
                    <v-btn icon variant="plain" dark @click="appStore.dlgWalletConnect = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>

                <v-card-text class="ma-0 pa-0">
                    <div style="text-align: center;">
                        <v-container :class="appStore.isMobile ? 'containerConnectWalletMobile' : 'containerConnectWallet'">
                            <div :style="appStore.isMobile ? 'height: 0px;' : 'height: 60px;'"></div>
                            <!-- Banner -->
                            <v-row>
                                <v-spacer></v-spacer>
                                <v-img :width="appStore.isMobile ? 288 : 446" :height="appStore.isMobile ? 214 : 331"
                                    :src="ConnectWalletBanner"
                                    :style="appStore.isMobile ? 'margin-top: 136px;' : 'margin-top: 10px;'"></v-img>
                                <v-spacer></v-spacer>
                            </v-row>
                            <p
                                :class="appStore.isMobile ? 'font-bold text-white text-weight-700 text-size-25px mt-8' : 'font-bold text-white text-weight-700 text-size-35px mt-8'">
                                Error! You have not connected your wallet
                            </p>
                            <div style="margin-top: 35px; margin-bottom: 150px;">
                                <div v-if="isActivated">
                                    <v-btn variant="tonal" @click="disconnect"
                                        class="text-none btnConnectWallet">Disconnect</v-btn>
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

const { open } = useBoard();
const { address, balance, isActivated, chainId } = useEthers();
const { disconnect, wallet } = useWallet();

import ConnectWalletBanner from '../assets/connectWallet.png'

function connectWallet() {
    open();
}

</script>

<style>
.containerConnectWallet {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 52px !important;
    padding-right: 52px !important;
}

.containerConnectWalletMobile {
    margin: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
}
</style>