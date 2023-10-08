<template>
    <div>
      <v-row class="appHeader">
        <div class="d-flex" style="align-items: center">
          <router-link to="/">
            <v-img style="width: 116px; height:23px" :src="LogoDough"></v-img>
          </router-link>
          <router-link to="/" class="linkDocs font-regular text-weight-400 text-size-16px">Docs</router-link>
          <router-link to="/" class="linkMore font-regular text-weight-400 text-size-16px">More</router-link>
        </div>
          <v-spacer></v-spacer>
          <v-btn class="btnMainnet text-none font-regular text-weight-400 text-size-16px"><ChainEth class="mr-3" />Mainnet</v-btn>
          <v-btn class="btnWallet text-none font-regular text-weight-400 text-size-16px">Wallet</v-btn>
      </v-row>     
    </div>  
</template>

<script setup lang="ts">

  import LogoDough from '../assets/logo_dough.png';
  import ChainEth from '../assets/chain_eth.svg'

</script>

<style scoped>
  .appHeader {
    padding-top: 58px;
    margin: 0px !important;
  }
  .linkDocs {
    margin-left: 48px;
    text-decoration: none;
    color: white;
  }
  .linkMore {
    margin-left: 43px;
    text-decoration: none;
    color: white;
  }
  .btnMainnet {
    width: 136px;
    height: 51px !important;
    background: #00c797;
    border-radius: 10px;
    align-items: center;
    margin-right: 43.5px;
  }
  .btnWallet {
    width: 139px;
    height: 52px !important;
    background: white;
    border-radius: 10px;
    margin-right: -4px;
    color: black;
  }
</style>