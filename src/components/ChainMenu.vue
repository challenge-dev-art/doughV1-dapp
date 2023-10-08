<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn v-if="!appStore.isMobile" class="btnChain text-none font-regular text-weight-400 text-size-16px"
                v-bind="props">
                <ChainEth class="mr-3" />
                Mainnet
            </v-btn>
            <v-btn v-if="appStore.isMobile" class="btnChainMobile text-none font-regular text-weight-400 text-size-16px"
                v-bind="props">
                <ChainEth class="mr-3" />
                Mainnet
            </v-btn>
        </template>
        <!-- <v-list>
            <v-list-item>
                <v-list-item-title><a>Arbitrum One</a></v-list-item-title>
            </v-list-item>
        </v-list> -->
    </v-menu>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import ChainEth from '../assets/chain_eth.svg'

</script>

<style>
.btnChain {
    width: 139px !important;
    height: 52px !important;
    border-radius: 10px !important;
    background: #B6BEBC !important;
    color: black !important;
}

.btnChainMobile {
    width: 128px !important;
    height: 41px !important;
    border-radius: 5px !important;
    background: #B6BEBC !important;
    color: black !important;
}
</style>