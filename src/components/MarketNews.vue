<template>
    <v-container :class="appStore.isMobile ? 'clsNesPanelMobile' : 'clsNesPanel'">
        <!-- <v-container class="bg-surface-variant"> -->
        <p class="font-bold text-white text-weight-700 text-size-22px ms-2 mb-3">
            Crypto Market News
        </p>
        <v-sheet v-if="appStore.isMobile" style="background: black;" class="ma-0 pa-0">
            <v-slide-group>
                <v-slide-group-item key="1">
                    <div class="tokenPriceMobile d-flex align-center justify-center">
                        <p class="font-regular text-white text-weight-700 text-size-16px">USDC</p>
                        <!-- <p class="font-light text-white text-weight-300 text-size-16px ml-3">
                            {{ appStore.price_usdc.toFixed(2) }}</p> -->
                        <p class="font-light text-white text-weight-300 text-size-16px ml-3">
                            {{ appStore.price_usdc_bsc.toFixed(2) }}</p>
                        <p class="font-regular text-weight-300 text-size-16px ml-3"
                            :style="usdc_change_rate >= 0 ? 'color: #00C798;' : 'color: red;'">{{
                                usdc_change_rate.toFixed(2) }} %</p>
                    </div>
                </v-slide-group-item>
                <v-slide-group-item key="2">
                    <div class="tokenPriceMobile d-flex align-center justify-center">
                        <p class="font-regular text-white text-weight-700 text-size-16px">ETH</p>
                        <!-- <p class="font-light text-white text-weight-300 text-size-16px ml-3">
                            {{ appStore.price_eth.toFixed(2) }}</p> -->
                        <p class="font-light text-white text-weight-300 text-size-16px ml-3">
                            {{ appStore.price_eth_bsc.toFixed(2) }}</p>
                        <p class="font-regular text-weight-300 text-size-16px ml-3"
                            :style="eth_change_rate >= 0 ? 'color: #00C798;' : 'color: red;'">{{
                                eth_change_rate.toFixed(2) }} %</p>
                    </div>
                </v-slide-group-item>
                <v-slide-group-item key="3">
                    <div class="tokenPriceMobile d-flex align-center justify-center">
                        <p class="font-regular text-white text-weight-700 text-size-16px">Bitcoin</p>
                        <!-- <p class="font-light text-white text-weight-300 text-size-16px ml-3">
                            {{ appStore.price_btc.toFixed(2) }}</p> -->
                        <p class="font-light text-white text-weight-300 text-size-16px ml-3">
                            {{ appStore.price_btc_bsc.toFixed(2) }}</p>
                        <p class="font-regular text-weight-300 text-size-16px ml-3"
                            :style="btc_change_rate >= 0 ? 'color: #00C798;' : 'color: red;'">{{
                                btc_change_rate.toFixed(2) }} %</p>
                    </div>
                </v-slide-group-item>
            </v-slide-group>
        </v-sheet>
        <v-row v-else class="tokenPrice">
            <v-col>
                <v-row>
                    <p class="font-regular text-white text-weight-700 text-size-16px">USDC</p>
                    <!-- <p class="font-light text-white text-weight-300 text-size-16px ml-3">
                            {{ appStore.price_usdc.toFixed(2) }}</p> -->
                    <p class="font-light text-white text-weight-300 text-size-16px ml-3">
                        {{ appStore.price_usdc_bsc.toFixed(2) }}</p>
                    <p class="font-regular text-weight-300 text-size-16px ml-3"
                        :style="usdc_change_rate >= 0 ? 'color: #00C798;' : 'color: red;'">{{
                            usdc_change_rate.toFixed(2) }} %</p>
                </v-row>
            </v-col>
            <v-col>
                <v-row>
                    <v-spacer></v-spacer>
                    <p class="font-regular text-white text-weight-700 text-size-16px">ETH</p>
                    <!-- <p class="font-light text-white text-weight-300 text-size-16px ml-3">
                            {{ appStore.price_eth.toFixed(2) }}</p> -->
                    <p class="font-light text-white text-weight-300 text-size-16px ml-3">
                        {{ appStore.price_eth_bsc.toFixed(2) }}</p>
                    <p class="font-regular text-weight-300 text-size-16px ml-3"
                        :style="eth_change_rate >= 0 ? 'color: #00C798;' : 'color: red;'">{{
                            eth_change_rate.toFixed(2) }} %</p>
                    <v-spacer></v-spacer>
                </v-row>
            </v-col>
            <v-col>
                <v-row>
                    <v-spacer></v-spacer>
                    <p class="font-regular text-white text-weight-700 text-size-16px">Bitcoin</p>
                    <!-- <p class="font-light text-white text-weight-300 text-size-16px ml-3">
                            {{ appStore.price_btc.toFixed(2) }}</p> -->
                    <p class="font-light text-white text-weight-300 text-size-16px ml-3">
                        {{ appStore.price_btc_bsc.toFixed(2) }}</p>
                    <p class="font-regular text-weight-300 text-size-16px ml-3"
                        :style="btc_change_rate >= 0 ? 'color: #00C798;' : 'color: red;'">{{
                            btc_change_rate.toFixed(2) }} %</p>
                </v-row>
            </v-col>
        </v-row>
        <div style="width: 100%; height: 30px;"></div>
        <div v-for="item in news" :key="item.divnk" style="padding-left: 10px;">
            <a :href="item.link" target="_blank" class="font-bold text-white text-weight-700 text-size-22px mt-10"
                style="text-decoration: none;">
                {{ item.title }}</a>
            <p class="font-light text-white text-weight-400 text-size-18px mt-5">{{ item.description }}</p>
            <v-divider style="margin-top: 20px; margin-bottom: 20px;"></v-divider>
        </div>
    </v-container>
</template>
  
<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
// import Parser from 'rss-parser';
import { parseString } from 'xml2js';

import { useAppStore } from "../store/store";
const appStore = useAppStore();

const news = ref();
onMounted(async () => {
    // const parser = new Parser();
    // const feed = await parser.parseURL('https://doughfinance.xyz/api?url=blockchain.news/RSS?key=0HM0B8QFN3GEO');
    // news.value = feed.items;

    try {
        // const parser = new Parser();
        // const feed = await parser.parseURL('https://doughfinance.xyz/api?url=https://cointelegraph.com/rss/tag/ethereum');
        await fetch('https://doughfinance.xyz/api?url=https://cointelegraph.com/rss/tag/ethereum')
            .then(async (feed) => {
                const response = await feed.json();
                // console.log("feed data:", response)

                parseString(response.data, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        // const res_rss = result.rss;
                        // console.log("rss: ", res_rss)
                        const data = result.rss.channel[0].item;
                        // console.log("news: ", data)

                        let res = []
                        let el = document.createElement('html');
                        for (let i = 0; i < 5; i++) {
                            el.innerHTML = data[i].description[0];
                            const p = el.getElementsByTagName('p');
                            // console.log("p: ", p[1].innerText)

                            res[i] = {
                                title: data[i].title[0],
                                description: p[1].innerText,
                                link: data[i].link
                            };
                        }

                        news.value = res;


                        // console.log(news.value)

                        // news.value = data.slice(0, 5);
                        // console.log(news.value)

                        // var el = document.createElement('html');
                        // el.innerHTML = data[0].description[0];

                        // const p = el.getElementsByTagName('p');
                        // console.log("p: ", p[1].innerText)

                    }
                })
            }).catch((err) => {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
    }
})

const btc_change_rate = computed(() => {
    if (appStore.price_btc_bsc == 0 || appStore.price_btc_bsc == undefined) {
        return 0;
    } else {
        return appStore.price_btc_change / appStore.price_btc_bsc * 100;
    }
})

const eth_change_rate = computed(() => {
    // if (appStore.price_eth == 0) {
    if (appStore.price_eth_bsc == 0 || appStore.price_eth_bsc == undefined) {
        return 0;
    } else {
        return appStore.price_eth_change / appStore.price_eth_bsc * 100;
    }
})

const usdc_change_rate = computed(() => {
    // if (appStore.price_usdc == 0) {
    if (appStore.price_usdc_bsc == 0 || appStore.price_usdc_bsc == undefined) {
        return 0;
    } else {
        return appStore.price_usdc_change / appStore.price_usdc_bsc * 100;
    }
})

</script>
  
<style>
.clsNesPanel {
    padding-left: 55px !important;
    padding-right: 15px !important;
    padding-top: 31px !important;
    padding-bottom: 0px !important;
}

.clsNesPanelMobile {
    padding-left: 0px !important;
    padding-right: 15px !important;
    padding-top: 31px !important;
    padding-bottom: 0px !important;
}

.tokenPrice {
    background: #1e1e1e;
    border-radius: 10px;
    padding-left: 36px !important;
    padding-right: 36px !important;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    margin-top: 20px !important;
}

.tokenPriceMobile {
    width: 229px;
    height: 51px;
    background: #1e1e1e;
    border-radius: 10px;
    margin-left: 5px;
    margin-right: 5px;
}
</style>