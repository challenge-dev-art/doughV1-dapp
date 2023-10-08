<template>
  <div></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, provide } from "vue";
import { useDisplay } from "vuetify";
const { name } = useDisplay();
const view_normal = computed(() => {
  switch (name.value) {
    case "xs":
      return false;
    case "sm":
      return false;
    case "md":
      return true;
    case "lg":
      return true;
    case "xl":
      return true;
    case "xxl":
      return true;
  }
});

import Web3 from "web3";

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import {
  useBoard,
  useEthers,
  useWallet,
  displayEther,
  shortenAddress,
} from "vue-dapp";

const { address, balance, isActivated, chainId } = useEthers();
const { disconnect, wallet } = useWallet();
</script>

