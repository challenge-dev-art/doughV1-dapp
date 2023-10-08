<template>
    <div>
        <p v-if="appStore.isMobile" class="font-bold text-white text-weight-700 text-size-17px">Portfolio Performance</p>
        <v-container :class="appStore.isMobile ? 'portfolioMobile' : 'portfolio'" style="position: relative;">
            <p v-if="!appStore.isMobile" class="font-bold text-white text-weight-700 text-size-22px"
                style="margin-top: 21px; margin-left: 31px;">Portfolio Performance
            </p>
            <div class="d-flex"
                :style="appStore.isMobile ? 'padding-top: 20px; padding-left: 25px; padding-right: 25px; padding-bottom: 10px;' : 'padding-top: 20px; padding-left: 30px; padding-right: 30px; padding-bottom: 10px;'">
                <div class="d-flex me-auto align-center">
                    <v-img width="31" height="31" :src="ApyIcon"></v-img>
                    <div style="margin-left: 8px;">
                        <p class="font-bold text-white text-weight-700 text-size-18px">{{ apy_value.toFixed(2) }}%</p>
                        <p class="font-light text-white text-weight-400 text-size-14px">APY</p>
                    </div>
                </div>
                <div class="d-flex align-center">
                    <div :class="tab == 'day' ? 'clsToggleActive' : 'clsToggleDeactive'" @click="actionDay">D</div>
                    <div :class="tab == 'week' ? 'clsToggleActive' : 'clsToggleDeactive'" @click="actionWeek">W</div>
                    <div :class="tab == 'month' ? 'clsToggleActive' : 'clsToggleDeactive'" @click="actionMonth">M</div>
                    <div :class="tab == 'year' ? 'clsToggleActive' : 'clsToggleDeactive'" @click="actionYear">Y</div>
                    <div :class="tab == 'all' ? 'clsToggleActive' : 'clsToggleDeactive'" @click="actionAll">ALL</div>
                </div>
            </div>
            <canvas id="chartCanvas" :class="appStore.isMobile ? 'chartCanvasMobile' : 'chartCanvas'"></canvas>
            <v-progress-linear :model-value="loading_value" color="#00C797" :buffer-value="loading_value"
                style="margin-bottom: 5px;" stream></v-progress-linear>
            <!-- <v-btn @click="test">Test</v-btn> -->
            <v-overlay v-model="overlay" contained style="opacity: 0.4;"></v-overlay>
        </v-container>
    </div>
</template>
  
<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

import { useAppStore } from "../store/store";
const appStore = useAppStore();

import ApyIcon from "../assets/apyIcon.png";

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

import Web3 from "web3";

const overlay = computed(() => {
    if (loading_value.value == 100) {
        return false;
    } else {
        return true;
    }
});

const apy_value = computed(() => {
    const weth_leverage = appStore.aaveV3Weth_supply == 0 ? 0 : appStore.aaveV3Weth_supply / (appStore.aaveV3Weth_supply - appStore.aaveV3Weth_borrow);
    const weth_apy = appStore.aaveV3WethLiquidityRate * weth_leverage;
    const weth_apy_amount = appStore.aaveV3Weth_supply * appStore.price_eth_aave * weth_apy / 100;

    const wbtc_leverage = appStore.aaveV3Wbtc_supply == 0 ? 0 : appStore.aaveV3Wbtc_supply / (appStore.aaveV3Wbtc_supply - appStore.aaveV3Wbtc_borrow);
    const wbtc_apy = appStore.aaveV3WbtcLiquidityRate * wbtc_leverage;
    const wbtc_apy_amount = appStore.aaveV3Wbtc_supply * appStore.price_btc_aave * wbtc_apy / 100;

    const weth_wbtc_supply = appStore.aaveV3Weth_supply * appStore.price_eth_aave + appStore.aaveV3Wbtc_supply * appStore.price_btc_aave;

    return weth_wbtc_supply == 0 ? 0 : (weth_apy_amount + wbtc_apy_amount) * 100 / weth_wbtc_supply;
});

const start_blocknumber = 18117767;
const start_timestamp = 1694491595;
const point_cnt = 20;

// async function test() {
//     const web3 = new Web3(wallet.provider as any);

//     const latestBlock = await web3.eth.getBlock("latest");
//     // console.log("lastBlock: ", latestBlock);
//     const latestBlockNumber = latestBlock.number;
//     console.log("latestBlockNumber: ", latestBlockNumber);
//     const latestBlockTimestamp = parseInt(latestBlock.timestamp.toString());
//     console.log("latestBlockTimestamp: ", latestBlockTimestamp);

//     // // const block = await web3.eth.getBlock(start_blocknumber);
//     // // const blockNumber = block.number;
//     // // console.log("blockNumber: ", blockNumber);
//     // // const blockTimestamp = block.timestamp;
//     // // console.log("blockTimestamp: ", blockTimestamp);
//     // const block_number = 18130000;
//     // const dsa_addr = "0xB8ca3F88C4CBEC43b389a7cFCd39E874974a2d58";
//     // const aEthUsdcContract = appStore.getAEthUsdcContract(wallet.provider);
//     // const balance1 = await aEthUsdcContract.methods.balanceOf(dsa_addr).call({}, block_number);
//     // console.log("balance1: ", balance1);
//     // const balance2 = await aEthUsdcContract.methods.balanceOf(dsa_addr).call({}, latestBlockNumber);
//     // console.log("balance2: ", balance2);

//     // const aaveOracleContract = appStore.getAaveOracleContract(wallet.provider);

//     // const asset_price = await aaveOracleContract.methods
//     //     .getAssetsPrices([appStore.USDC, appStore.WETH, appStore.WBTC])
//     //     .call({}, block_number);

//     // const price_usdc_aave = new BigNumber(asset_price[0]).dividedBy(1e8).toNumber();
//     // const price_eth_aave = new BigNumber(asset_price[1]).dividedBy(1e8).toNumber();
//     // const price_btc_aave = new BigNumber(asset_price[2]).dividedBy(1e8).toNumber();
//     // console.log("usdc: ", price_usdc_aave, " eth: ", price_eth_aave, " btc: ", price_btc_aave);

//     // const asset_price1 = await aaveOracleContract.methods
//     //     .getAssetsPrices([appStore.USDC, appStore.WETH, appStore.WBTC])
//     //     .call({});

//     // const price_usdc_aave1 = new BigNumber(asset_price1[0]).dividedBy(1e8).toNumber();
//     // const price_eth_aave1 = new BigNumber(asset_price1[1]).dividedBy(1e8).toNumber();
//     // const price_btc_aave1 = new BigNumber(asset_price1[2]).dividedBy(1e8).toNumber();
//     // console.log("usdc: ", price_usdc_aave1, " eth: ", price_eth_aave1, " btc: ", price_btc_aave1);

//     const timestamp = latestBlockTimestamp * 1000; // The timestamp in milliseconds

//     // Using toLocaleString()
//     const date1 = new Date(timestamp).toLocaleString();

//     console.log(date1); // Output in the format of the user's locale (e.g., 08/02/2021, 11:32:17 AM)
//     const weth_leverage = appStore.aaveV3Weth_supply == 0 ? 0 : appStore.aaveV3Weth_supply / (appStore.aaveV3Weth_supply - appStore.aaveV3Weth_borrow);
//     console.log("weth_leverage: ", weth_leverage);
//     const weth_apy = appStore.aaveV3WethLiquidityRate * weth_leverage;
//     console.log("weth_apy: ", weth_apy);
//     const weth_apy_amount = appStore.aaveV3Weth_supply * appStore.price_eth_aave * weth_apy / 100;
//     console.log("weth_apy_amount: ", weth_apy_amount);

//     const wbtc_leverage = appStore.aaveV3Wbtc_supply == 0 ? 0 : appStore.aaveV3Wbtc_supply / (appStore.aaveV3Wbtc_supply - appStore.aaveV3Wbtc_borrow);
//     console.log("wbtc_leverage: ", wbtc_leverage);
//     const wbtc_apy = appStore.aaveV3WbtcLiquidityRate * wbtc_leverage;
//     console.log("wbtc_apy: ", wbtc_apy);
//     const wbtc_apy_amount = appStore.aaveV3Wbtc_supply * appStore.price_btc_aave * wbtc_apy / 100;
//     console.log("wbtc_apy_amount: ", wbtc_apy_amount);

//     const weth_wbtc_supply = appStore.aaveV3Weth_supply * appStore.price_eth_aave + appStore.aaveV3Wbtc_supply * appStore.price_btc_aave;
//     console.log("weth_wbtc_supply: ", weth_wbtc_supply);

//     const apy = weth_wbtc_supply == 0 ? 0 : (weth_apy_amount + wbtc_apy_amount) * 100 / weth_wbtc_supply;
//     console.log("apy: ", apy);
// }

import Chart from "chart.js/auto";

const tab = ref("day")
function actionDay() {
    if (loading_value.value == 100) {
        tab.value = 'day';
        loadingPortfolio(tab.value);
    }
}
function actionWeek() {
    if (loading_value.value == 100) {
        tab.value = 'week';
        loadingPortfolio(tab.value);
    }
}
function actionMonth() {
    if (loading_value.value == 100) {
        tab.value = 'month';
        loadingPortfolio(tab.value);
    }
}
function actionYear() {
    if (loading_value.value == 100) {
        tab.value = 'year';
        loadingPortfolio(tab.value);
    }
}
function actionAll() {
    if (loading_value.value == 100) {
        tab.value = 'all';
        loadingPortfolio(tab.value);
    }
}

const dsa_address = computed(() => {
    return appStore.dsa_address;
})
watch(dsa_address, (newVal) => {
    if (newVal == '') {
        chart_obj.data.labels = ["DSA not found"];
        chart_obj.data.datasets[0].data = [0];
        chart_obj.update();
    } else {
        loadingPortfolio(tab.value);
    }
})

let chart_obj: Chart;
let ctx;
onMounted(() => {
    //------------ Chart Init ---------------
    ctx = document.getElementById("chartCanvas");

    chart_obj = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["DSA not found"],
            datasets: [{
                label: '',
                data: [0],
                borderWidth: 1,
                borderColor: "#00C797",
                backgroundColor: "#00C797",
                fill: true,
                tension: 0.2
            }]
        },
        options: {
            radius: 0,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    boxWidth: 100,
                    backgroundColor: "#00C797",
                    borderColor: "rgb(255,255,255,255)",
                    borderWidth: 1,
                    displayColors: false,
                    titleAlign: 'right',
                    bodyAlign: 'right',
                    titleFont: {
                        weight: 'bold', size: '11'
                    },
                    bodyFont: { weight: 'bold', size: '14' },
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: false,
                },
                y: {
                    display: false,
                    beginAtZero: true
                }
            }
        }
    });
    tab.value = 'day';
    //------ Get Portfolio for day --------------
    reqTimer.value = setInterval(() => {
        if (appStore.dsa_address != '') {
            loadingPortfolio(tab.value);
            clearInterval(reqTimer.value);
        }
    }, 1000);
})
const reqTimer = ref();

const loading_value = ref(100);
async function loadingPortfolio(period_str: string) {
    if (appStore.dsa_address != '') {
        loading_value.value = 0;
        const web3 = new Web3(wallet.provider as any);
        try {
            //------- Start get portfolio ------------
            let labels = [];
            let data = [];

            const latestBlock = await web3.eth.getBlock("latest");
            const latestBlockNumber = parseInt(latestBlock.number.toString());
            // console.log("latestBlockNumber: ", latestBlockNumber);
            const latestBlockTimestamp = parseInt(latestBlock.timestamp.toString());
            // console.log("latestBlockTimestamp: ", latestBlockTimestamp);

            const d_blockNumber = latestBlockNumber - start_blocknumber;
            const d_timestamp = latestBlockTimestamp - start_timestamp;

            let period = 0; // in seconds
            if (period_str == 'day') {
                period = 24 * 60 * 60;
            } else if (period_str == 'week') {
                period = 7 * 24 * 60 * 60;
            } else if (period_str == 'month') {
                period = 30 * 24 * 60 * 60;
            } else if (period_str == 'year') {
                period = 365 * 24 * 60 * 60;
            } else {
                period = d_timestamp;
            }
            // console.log("period: ", period)

            const s_blocknumber = latestBlockNumber - (d_blockNumber * period) / d_timestamp;
            const step_blocknumber = (latestBlockNumber - s_blocknumber) / point_cnt;

            const aaveOracleContract = appStore.getAaveOracleContract(wallet.provider);
            const aEthUsdcContract = appStore.getAEthUsdcContract(wallet.provider);
            const aEthWethContract = appStore.getAEthWethContract(wallet.provider);
            const aEthWbtcContract = appStore.getAEthWbtcContract(wallet.provider);

            let i = 0;
            for (let bn = latestBlockNumber; bn >= s_blocknumber; bn -= step_blocknumber) {
                i++;
                const blockNumber = parseInt(bn.toString());

                const asset_price = await aaveOracleContract.methods
                    .getAssetsPrices([appStore.USDC, appStore.WETH, appStore.WBTC])
                    .call({}, blockNumber);

                const price_usdc_aave = new BigNumber(asset_price[0]).dividedBy(1e8).toNumber();
                const price_eth_aave = new BigNumber(asset_price[1]).dividedBy(1e8).toNumber();
                const price_btc_aave = new BigNumber(asset_price[2]).dividedBy(1e8).toNumber();
                // console.log(i, ": ", "usdc: ", price_usdc_aave, " eth: ", price_eth_aave, " btc: ", price_btc_aave);

                const balance_aEthUsdc = await aEthUsdcContract.methods.balanceOf(appStore.dsa_address).call({}, blockNumber);
                const amount_aEthUsdc = BigNumber(balance_aEthUsdc).dividedBy(1e6).toNumber();
                const balance_aEthWeth = await aEthWethContract.methods.balanceOf(appStore.dsa_address).call({}, blockNumber);
                const amount_aEthWeth = BigNumber(balance_aEthWeth).dividedBy(1e18).toNumber();
                const balance_aEthWbtc = await aEthWbtcContract.methods.balanceOf(appStore.dsa_address).call({}, blockNumber);
                const amount_aEthWbtc = BigNumber(balance_aEthWbtc).dividedBy(1e8).toNumber();

                const portfolio = amount_aEthUsdc * price_usdc_aave + amount_aEthWeth * price_eth_aave + amount_aEthWbtc * price_btc_aave;
                const time_stamp = (latestBlockTimestamp - (latestBlockNumber - blockNumber) * d_timestamp / d_blockNumber) * 1000;

                loading_value.value = i / point_cnt * 100;
                labels.unshift(new Date(time_stamp).toLocaleString());
                data.unshift(portfolio);
            }
            loading_value.value = 100;
            chart_obj.data.labels = labels;
            chart_obj.data.datasets[0].data = data;
            chart_obj.update();
        } catch (error) {
            loading_value.value = 100;
            console.log("loading portfolio error:", error);
        }
        //------- End get portfolio ------------
    } else {
        loading_value.value = 100;
        chart_obj.data.labels = ["DSA not found"];
        chart_obj.data.datasets[0].data = [0];
        chart_obj.update();
    }
}
</script>
  
<style>
.portfolio {
    width: 100%;
    /* height: 448px; */
    background: rgb(30, 30, 30);
    border: solid;
    border-radius: 10px;
    border-width: 1px;
    border-color: rgb(30, 30, 30);
    padding: 0px !important;
    letter-spacing: 1.2px;
}

.portfolioMobile {
    width: 100%;
    /* height: 288px; */
    background: #1E1E1E;
    border: solid;
    border-radius: 6px;
    border-width: 1px;
    border-color: #1E1E1E;
    padding: 0px !important;
    margin-top: 10px;
}

.chartCanvasMobile {
    height: 448px;
}

.chartCanvas {
    height: 288px;
}

.clsToggleDeactive {
    font-family: "Aeonik-Regular";
    font-weight: 700 !important;
    font-size: 14px !important;
    color: white !important;
    opacity: 0.42;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
    cursor: pointer;
}

.clsToggleDeactive:hover {
    opacity: 0.8;
}

.clsToggleActive {
    font-family: "Aeonik-Regular";
    font-weight: 700 !important;
    font-size: 14px !important;
    color: white !important;
    opacity: 1;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 3px;
    border-bottom: solid;
    border-color: #00C797;
    cursor: pointer;
}

.clsToggleActive:hover {
    opacity: 0.8;
}
</style>