import { defineStore } from "pinia";
import { appStore } from "./interfaces";
import BigNumber from "bignumber.js";

import Web3 from "web3";

import wethABI from "../abi/wethABI.json"
import usdcABI from "../abi/usdcABI.json"
import wbtcABI from "../abi/wbtcABI.json"

import aaveV3PoolABI from "../abi/aaveV3PoolABI.json";
const aaveV3PoolAddress = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2";

import aaveV3DataProviderABI from "../abi/aaveV3DataProviderABI.json";
const aaveV3DataProviderAddress = "0x7B4EB56E7CD4b454BA8ff71E4518426369a138a3";

import aaveOracleABI from "../abi/aaveOracleABI.json";
const aaveOracleAddress = "0x54586bE62E3c3580375aE3723C145253060Ca0C2";

import uniswapV2RouterABI from "../abi/uniswapV2RouterABI.json";
const uniswapV2RouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

import doughV1DsaABI from "../abi/doughV1DsaABI.json";
import doughV1IndexABI from "../abi/doughV1IndexABI.json";
const doughV1IndexAddress = "0x9f2877BACC57f399F7D6d3E90e698390a8568695";

// (aEthUSDC)
import aEthUSDCABI from "../abi/aEthUsdcABI.json";
const aEthUSDC = "0x98C23E9d8f34FEFb1B7BD6a91B7FF122F4e16F5c";

// (aEthWETH)
import aEthWethABI from "../abi/aEthWethABI.json";
const aEthWETH = "0x4d5F47FA6A74757f35C14fD3a6Ef8E3C9BC514E8";

// (aEthWBTC)
import aEthWbtcABI from "../abi/aEthWbtcABI.json";
const aEthWBTC = "0x5Ee5bf7ae06D1Be5997A1A72006FE6C607eC6DE8";

export const useAppStore = defineStore("appStore", {
    state: (): appStore => ({
        chainId: 1,
        walletAddress: "",
        walletIsActive: false,
        wallet: null,
        chainName: "mainnet",
        currencySymbol: "ETH",
        rpcUrl: "https://mainnet.infura.io/v3/",
        blockExplorerUrl: "https://etherscan.io/",
        confirmLimit: 0,
        getPriceUrl:
            'https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT","USDCUSDT"]',
        get24hrPriceUrl: 'https://doughfinance.xyz/api?url=https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","USDCUSDT"]',
        zeroAddress: "0x0000000000000000000000000000000000000000",
        ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
        WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        WBTC: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        price_btc_aave: 0,
        price_eth_aave: 0,
        price_usdc_aave: 0,
        price_btc_bsc: 0,
        price_eth_bsc: 0,
        price_usdc_bsc: 0,
        price_btc_change: 0,
        price_eth_change: 0,
        price_usdc_change: 0,
        dsa_wbtc_balance: 0,
        dsa_weth_balance: 0,
        dsa_usdc_balance: 0,
        wallet_wbtc_balance: 0,
        wallet_eth_balance: 0,
        wallet_usdc_balance: 0,
        dsa_address: "",
        web3: null,
        dlgWalletConnect: false,
        dlgCreateDsa: false,
        dlgGetStarted: false,
        dlgGetStartedTab: "one",
        dlgDeposit: false,
        dlgWithdrawDsa: false,
        dlgWithdrawAave: false,
        dlgSwap: false,
        dlgSupply: false,
        dlgLoop: false,
        dlgDeloop: false,
        dlgBorrowRepay: false,
        dlgBorrow: false,
        dlgRepay: false,
        dlgShield: false,
        dlgSwapEnable: true,
        aaveV3Usdc_supply: 0,
        aaveV3Weth_supply: 0,
        aaveV3Wbtc_supply: 0,
        aaveV3Usdc_borrow: 0,
        aaveV3Weth_borrow: 0,
        aaveV3Wbtc_borrow: 0,
        aaveV3_total_collateral_base: 0,
        aaveV3_total_debt_base: 0,
        aaveV3_available_borrows_base: 0,
        aaveV3_current_liquidation_threshold: 0,
        aaveV3_ltv: 0,
        aaveV3_health_factor: 0,
        health_factor_risky: 1.13,
        health_factor_safe: 1.33,
        aaveV3UsdcLiquidityRate: 0,
        aaveV3UsdcVariableBorrowRate: 0,
        aaveV3WethLiquidityRate: 0,
        aaveV3WethVariableBorrowRate: 0,
        aaveV3WbtcLiquidityRate: 0,
        aaveV3WbtcVariableBorrowRate: 0,
        closeOptLimit: 0.99,
        shield_trigger: 0,
        shield_target: 0,
        isMobile: false,
        isSmall:false,
        doc_url: "https://dough-2.gitbook.io/dough-guides/",
        doc_url_deposit: "https://dough-2.gitbook.io/dough-guides/defi-smart-account-dsa/depositing-from-your-connected-wallet-into-dsa",
        doc_url_withdraw: "https://dough-2.gitbook.io/dough-guides/defi-smart-account-dsa/withdrawing-to-your-connected-wallet",
        doc_url_borrow: "#",
        doc_url_repay: "#",
        doc_url_supply: "#",
        doc_url_swap: "https://dough-2.gitbook.io/dough-guides/features/collateral-swap",
        doc_url_loop: "https://dough-2.gitbook.io/dough-guides/features/loop",
        doc_url_deloop: "https://dough-2.gitbook.io/dough-guides/features/deloop",
        doc_url_shield: "https://dough-2.gitbook.io/dough-guides/features/shield",
    }),
    actions: {
        initVariables() {
            this.dsa_wbtc_balance = 0;
            this.dsa_weth_balance = 0;
            this.dsa_usdc_balance = 0;
            this.wallet_wbtc_balance = 0;
            this.wallet_eth_balance = 0;
            this.wallet_usdc_balance = 0;
            this.dsa_address = "";
            this.aaveV3Usdc_supply = 0;
            this.aaveV3Weth_supply = 0;
            this.aaveV3Wbtc_supply = 0;
            this.aaveV3Usdc_borrow = 0;
            this.aaveV3Weth_borrow = 0;
            this.aaveV3Wbtc_borrow = 0;
            this.aaveV3_total_collateral_base = 0;
            this.aaveV3_total_debt_base = 0;
            this.aaveV3_available_borrows_base = 0;
            this.aaveV3_current_liquidation_threshold = 0;
            this.aaveV3_ltv = 0;
            this.aaveV3_health_factor = 0;
            this.aaveV3UsdcLiquidityRate = 0;
            this.aaveV3UsdcVariableBorrowRate = 0;
            this.aaveV3WethLiquidityRate = 0;
            this.aaveV3WethVariableBorrowRate = 0;
            this.aaveV3WbtcLiquidityRate = 0;
            this.aaveV3WbtcVariableBorrowRate = 0;
            this.shield_target = 0;
            this.shield_trigger = 0;
            this.closeAllDlg();
        },
        getUsdcContract(wallet_provider: any): any { 
            this.web3 = new Web3(wallet_provider);
            const usdcContract = new this.web3.eth.Contract(
                usdcABI as any,
                this.USDC
            );
            return usdcContract;
        },
        getWbtcContract(wallet_provider: any): any {
            this.web3 = new Web3(wallet_provider);
            const wbtcContract = new this.web3.eth.Contract(
                wbtcABI as any,
                this.WBTC
            );
            return wbtcContract;
        },
        getWethContract(wallet_provider: any): any {
            this.web3 = new Web3(wallet_provider);
            const wethContract = new this.web3.eth.Contract(
                wethABI as any,
                this.WETH
            );
            return wethContract;
        },
        getAaveV3PoolContract(wallet_provider: any): any {
            this.web3 = new Web3(wallet_provider);
            const aaveV3PoolContract = new this.web3.eth.Contract(
                aaveV3PoolABI as any,
                aaveV3PoolAddress
            );
            return aaveV3PoolContract;
        },
        getAaveV3DataProviderContract(wallet_provider: any): any {
            this.web3 = new Web3(wallet_provider);
            const aaveV3DataProviderContract = new this.web3.eth.Contract(
                aaveV3DataProviderABI as any,
                aaveV3DataProviderAddress
            );
            return aaveV3DataProviderContract;
        },
         getAaveOracleContract(wallet_provider: any): any {
            this.web3 = new Web3(wallet_provider);
            const aaveOracleContract = new this.web3.eth.Contract(
                aaveOracleABI as any,
                aaveOracleAddress
            );
            return aaveOracleContract;
        },
        getUniswapV2RouterContract(wallet_provider: any): any {
            this.web3 = new Web3(wallet_provider);
            const uniswapV2RouterContract = new this.web3.eth.Contract(
                uniswapV2RouterABI as any,
                uniswapV2RouterAddress
            );
            return uniswapV2RouterContract;
        },
        getDoughV1IndexContract(wallet_provider: any): any {
            this.web3 = new Web3(wallet_provider);
            const doughV1IndexContract = new this.web3.eth.Contract(
                doughV1IndexABI as any,
                doughV1IndexAddress
            );
            return doughV1IndexContract;
        },
        getDoughV1DsaContract(dough_v1_dsa_address: string, wallet_provider: any): any {
            this.web3 = new Web3(wallet_provider);
            const doughV1DsaContract = new this.web3.eth.Contract(
                doughV1DsaABI as any,
                dough_v1_dsa_address
            );
            return doughV1DsaContract;
        },
        getAEthUsdcContract(wallet_provider: any): any {
            this.web3 = new Web3(wallet_provider);
            const aEthUsdcContract = new this.web3.eth.Contract(
                aEthUSDCABI as any,
                aEthUSDC
            );
            return aEthUsdcContract;
        },
        getAEthWethContract(wallet_provider: any): any {
            this.web3 = new Web3(wallet_provider);
            const aEthWethContract = new this.web3.eth.Contract(
                aEthWethABI as any,
                aEthWETH
            );
            return aEthWethContract;
        },
        getAEthWbtcContract(wallet_provider: any): any {
            this.web3 = new Web3(wallet_provider);
            const aEthWbtcContract = new this.web3.eth.Contract(
                aEthWbtcABI as any,
                aEthWBTC
            );
            return aEthWbtcContract;
        },
        async getDsaAddress(wallet_address: string, wallet_provider: any) {
            // console.log("getDsaAddress");
            if (wallet_address != "") {
                try {
                    const doughV1IndexContract = this.getDoughV1IndexContract(wallet_provider);
                    const doughV1DsaAddress = await doughV1IndexContract.methods.getDoughV1Dsa(wallet_address).call();

                    if (doughV1DsaAddress != this.zeroAddress) {
                        this.dsa_address = doughV1DsaAddress;
                    } else {
                        this.dsa_address = ''
                    }
                    // console.log("dsa address: ", this.dsa_address);
                } catch (error) {
                    this.dsa_address = ''
                    console.log(error)
                }
            } else {
                this.dsa_address = ''
            }
        },
        async getShieldInfo(wallet_provider: any) {
            if (this.dsa_address != "") {
                try {
                    const doughV1IndexContract = this.getDoughV1IndexContract(wallet_provider);
                    const shieldInfo = await doughV1IndexContract.methods.getShieldInfo(this.dsa_address).call();
                    this.shield_target = new BigNumber(shieldInfo[0]).dividedBy(1e18).toNumber();
                    this.shield_trigger = new BigNumber(shieldInfo[1]).dividedBy(1e18).toNumber();
                } catch (error) {
                    console.log(error)
                }
            }
        },
        async getPriceFromBinance() {
            const res = await fetch(this.get24hrPriceUrl);
            const data = await res.json();

            this.price_btc_bsc = parseFloat(data.data[0].lastPrice);
            this.price_eth_bsc = parseFloat(data.data[1].lastPrice);
            this.price_usdc_bsc = parseFloat(data.data[2].lastPrice);
            this.price_btc_change = parseFloat(data.data[0].priceChange);
            this.price_eth_change = parseFloat(data.data[1].priceChange);
            this.price_usdc_change = parseFloat(data.data[2].priceChange);
            // console.log("binance btc: ", this.price_btc_bsc, this.price_btc_change);
            // console.log("binance eth: ", this.price_eth_bsc, this.price_eth_change);
            // console.log("binance usdc: ", this.price_usdc_bsc, this.price_usdc_change);
        },
        async getAaveOraclePrices(wallet_provider: any) {
            try {
                const aaveOracleContract = this.getAaveOracleContract(wallet_provider);

                const asset_price = await aaveOracleContract.methods
                    .getAssetsPrices([this.USDC, this.WETH, this.WBTC])
                    .call();

                this.price_usdc_aave = new BigNumber(asset_price[0]).dividedBy(1e8).toNumber();
                this.price_eth_aave = new BigNumber(asset_price[1]).dividedBy(1e8).toNumber();
                this.price_btc_aave = new BigNumber(asset_price[2]).dividedBy(1e8).toNumber();
                // console.log("aaveOracle - btc: ", this.price_btc_aave);
                // console.log("aaveOracle - eth: ", this.price_eth_aave);
                // console.log("aaveOracle- usdc: ", this.price_usdc_aave);
            } catch (error) {
                console.log(error);
            }
        },
        async getDsaAssets(wallet_provider: any) {
            try {
                await this.getAaveOraclePrices(wallet_provider);
                if (this.dsa_address != "") {
                    this.web3 = new Web3(wallet_provider);
                    // //---- Get balance of ETH -------
                    // const balanceOfWei = await this.web3?.eth.getBalance(
                    //     this.dsa_address
                    // );
                    // const eth_balance = await this.web3?.utils.fromWei(
                    //     balanceOfWei ?? "0",
                    //     "ether"
                    // );
                    // const big_eth_balance = new BigNumber(eth_balance ?? '0');
                    // this.dsa_eth_balance = big_eth_balance.toNumber();

                    //---- Get balance of WETH -------
                    const wethContract = this.getWethContract(wallet_provider);
                    const balanceOfWeth = await wethContract.methods.balanceOf(this.dsa_address).call();
                    const big_weth_balance = new BigNumber(balanceOfWeth).dividedBy(1e18);
                    this.dsa_weth_balance = big_weth_balance.toNumber();

                    //---- Get balance of USDC -------
                    const usdcContract = this.getUsdcContract(wallet_provider);
                    const balanceOfUsdc = await usdcContract.methods.balanceOf(this.dsa_address).call();
                    const big_usdc_balance = new BigNumber(balanceOfUsdc).dividedBy(1e6);
                    this.dsa_usdc_balance = big_usdc_balance.toNumber();

                    //---- Get balance of BTC -------
                    const wbtcContract = this.getWbtcContract(wallet_provider);
                    const balanceOfBtc = await wbtcContract.methods.balanceOf(this.dsa_address).call();
                    const big_btc_balance = new BigNumber(balanceOfBtc).dividedBy(1e8);
                    this.dsa_wbtc_balance = big_btc_balance.toNumber();

                    // console.log("dsa eth: ", this.dsa_weth_balance);
                    // console.log("dsa usdc: ", this.dsa_usdc_balance);
                    // console.log("dsa wbtc: ", this.dsa_wbtc_balance);
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getWalletAssets(wallet_address: any, wallet_provider: any) {
            if (wallet_address != '') {
                try {
                    await this.getPriceFromBinance();
                    if (wallet_address != "") {
                        this.web3 = new Web3(wallet_provider);
                        //---- Get balance of ETH -------
                        const balanceOfWei = await this.web3?.eth.getBalance(
                            wallet_address
                        );
                        const eth_balance = await this.web3?.utils.fromWei(
                            balanceOfWei ?? "0",
                            "ether"
                        );
                        const big_eth_balance = new BigNumber(eth_balance ?? '0');
                        this.wallet_eth_balance = big_eth_balance.toNumber();

                        //---- Get balance of USDC -------
                        const usdcContract = this.getUsdcContract(wallet_provider);
                        const balanceOfUsdc = await usdcContract.methods.balanceOf(wallet_address).call();
                        const big_usdc_balance = new BigNumber(balanceOfUsdc).dividedBy(1e6);
                        this.wallet_usdc_balance = big_usdc_balance.toNumber();

                        //---- Get balance of BTC -------
                        const wbtcContract = this.getWbtcContract(wallet_provider);
                        const balanceOfBtc = await wbtcContract.methods.balanceOf(wallet_address).call();
                        const big_btc_balance = new BigNumber(balanceOfBtc).dividedBy(1e8);
                        this.wallet_wbtc_balance = big_btc_balance.toNumber();
                        // console.log("wallet eth: ", this.wallet_eth_balance);
                        // console.log("wallet usdc: ", this.wallet_usdc_balance);
                        // console.log("wallet wbtc: ", this.wallet_wbtc_balance);
                    }
                } catch (error) {
                    console.log(error);
                }
            }

        },
        async getAaveV3UserInfo(wallet_address: string, wallet_provider: any) {
            try {
                if (wallet_address != "") {
                    const aaveV3PoolContract = this.getAaveV3PoolContract(wallet_provider);
                    const account_info = await aaveV3PoolContract.methods.getUserAccountData(wallet_address).call();

                    this.aaveV3_total_collateral_base = new BigNumber(account_info['totalCollateralBase']).dividedBy(1e8).toNumber();
                    this.aaveV3_total_debt_base = new BigNumber(account_info['totalDebtBase']).dividedBy(1e8).toNumber();
                    this.aaveV3_available_borrows_base = new BigNumber(account_info['availableBorrowsBase']).dividedBy(1e8).toNumber();
                    this.aaveV3_current_liquidation_threshold = new BigNumber(account_info['currentLiquidationThreshold']).dividedBy(100).toNumber();
                    this.aaveV3_ltv = new BigNumber(account_info['ltv']).dividedBy(100).toNumber();
                    this.aaveV3_health_factor = new BigNumber(account_info['healthFactor']).dividedBy(1e18).toNumber();

                    // console.log("aaveV3_total_collateral_base:", this.aaveV3_total_collateral_base);
                    // console.log("aaveV3_total_debt_base:", this.aaveV3_total_debt_base);
                    // console.log("aaveV3_available_borrows_base:", this.aaveV3_available_borrows_base);
                    // console.log("aaveV3_current_liquidation_threshold:", this.aaveV3_current_liquidation_threshold);
                    // console.log("aaveV3_ltv:", this.aaveV3_ltv);
                    // console.log("aaveV3_health_factor:", this.aaveV3_health_factor);
                }
            } catch (error) {
                console.log("getAaveV3UserInfo: ", error);
            }
        },
        async getAaveV3GetReserveData(wallet_provider: any) {
            try {
                const aaveV3DataProviderContract = this.getAaveV3DataProviderContract(wallet_provider);

                const usdc_data = await aaveV3DataProviderContract.methods.getReserveData(this.USDC).call();
                this.aaveV3UsdcLiquidityRate = new BigNumber(usdc_data['liquidityRate']).dividedBy(1e25).toNumber();
                this.aaveV3UsdcVariableBorrowRate = new BigNumber(usdc_data['variableBorrowRate']).dividedBy(1e25).toNumber();
                // console.log("usdc: ", this.aaveV3UsdcLiquidityRate, this.aaveV3UsdcVariableBorrowRate);

                const eth_data = await aaveV3DataProviderContract.methods.getReserveData(this.WETH).call();
                this.aaveV3WethLiquidityRate = new BigNumber(eth_data['liquidityRate']).dividedBy(1e25).toNumber();
                this.aaveV3WethVariableBorrowRate = new BigNumber(eth_data['variableBorrowRate']).dividedBy(1e25).toNumber();
                // console.log("Eth: ", this.aaveV3WethLiquidityRate, this.aaveV3WethVariableBorrowRate);

                const wbtc_data = await aaveV3DataProviderContract.methods.getReserveData(this.WBTC).call();
                this.aaveV3WbtcLiquidityRate = new BigNumber(wbtc_data['liquidityRate']).dividedBy(1e25).toNumber();
                this.aaveV3WbtcVariableBorrowRate = new BigNumber(wbtc_data['variableBorrowRate']).dividedBy(1e25).toNumber();
                // console.log("Wbtc: ", this.aaveV3WbtcLiquidityRate, this.aaveV3WbtcVariableBorrowRate);
            } catch (error) {
                console.log(error)
            }
        },
        async getAaveV3Positions(wallet_address: string, wallet_provider: any) {
            try {
                if (wallet_address != "") {
                    await this.getAaveOraclePrices(wallet_provider);

                    const aaveV3DataProviderContract = this.getAaveV3DataProviderContract(wallet_provider);

                    const position_usdc = await aaveV3DataProviderContract.methods.getUserReserveData(this.USDC, wallet_address).call();
                    this.aaveV3Usdc_supply = new BigNumber(position_usdc['currentATokenBalance']).dividedBy(1e6).toNumber();
                    this.aaveV3Usdc_borrow = new BigNumber(position_usdc['currentVariableDebt']).dividedBy(1e6).toNumber();
                    // console.log("AaveV3 Position USDC: ", this.aaveV3Usdc_supply, this.aaveV3Usdc_borrow);

                    const position_weth = await aaveV3DataProviderContract.methods.getUserReserveData(this.WETH, wallet_address).call();
                    this.aaveV3Weth_supply = new BigNumber(position_weth['currentATokenBalance']).dividedBy(1e18).toNumber();
                    this.aaveV3Weth_borrow = new BigNumber(position_weth['currentVariableDebt']).dividedBy(1e18).toNumber();
                    // console.log("AaveV3 Position WETH: ", this.aaveV3Weth_supply, this.aaveV3Weth_borrow);

                    const position_wbtc = await aaveV3DataProviderContract.methods.getUserReserveData(this.WBTC, wallet_address).call();
                    this.aaveV3Wbtc_supply = new BigNumber(position_wbtc['currentATokenBalance']).dividedBy(1e8).toNumber();
                    this.aaveV3Wbtc_borrow = new BigNumber(position_wbtc['currentVariableDebt']).dividedBy(1e8).toNumber();
                    // console.log("AaveV3 Position WBTC: ", this.aaveV3Wbtc_supply, this.aaveV3Wbtc_borrow);

                    await this.getAaveV3GetReserveData(wallet_provider);
                }
            } catch (error) {
                console.log(error)
            }
        },
        async uniswapGetAmountOut(wallet_provider: any, tokenIn: string, amountIn: string, tokenOut: string): Promise<number> {
            if ((tokenIn == 'eth' || tokenIn == 'btc' || tokenIn == 'usdc') &&
                (tokenOut == 'eth' || tokenOut == 'btc' || tokenOut == 'usdc') &&
                tokenIn != tokenOut && !isNaN(parseFloat(amountIn))
            ) {
                try {
                    const tokenInAddress = tokenIn == 'eth' ? this.WETH : tokenIn == 'btc' ? this.WBTC : tokenIn == 'usdc' ? this.USDC : ''
                    const tokenOutAddress = tokenOut == 'eth' ? this.WETH : tokenOut == 'btc' ? this.WBTC : tokenOut == 'usdc' ? this.USDC : ''

                    const uniswapV2RouterContract = this.getUniswapV2RouterContract(wallet_provider);

                    const big_amountSwap_from = new BigNumber(amountIn);
                    const big_amountIn =
                        tokenIn == "eth"
                            ? big_amountSwap_from.multipliedBy(1e18)
                            : tokenIn == "usdc"
                                ? big_amountSwap_from.multipliedBy(1e6)
                                : tokenIn == "btc"
                                    ? big_amountSwap_from.multipliedBy(1e8)
                                    : "";

                    const amounts = await uniswapV2RouterContract.methods
                        .getAmountsOut(big_amountIn.toString(), [tokenInAddress, tokenOutAddress])
                        .call();

                    const big_amountOut = new BigNumber(amounts[1]);

                    const decimals =
                        tokenOut == "eth"
                            ? 1e18
                            : tokenOut == "usdc"
                                ? 1e6
                                : tokenOut == "btc"
                                    ? 1e8
                                    : 1;

                    return big_amountOut.dividedBy(decimals).toNumber();
                } catch (error) {
                    return 0;
                }
            } else {
                return 0;
            }
        },
        actionDeposit() {
            if (!this.walletIsActive) {
                this.dlgWalletConnect = true;
            } else if (this.dsa_address == '') {
                this.dlgCreateDsa = true;
            } else {
                this.closeAllDlg();
                this.getDsaAssets(this.wallet.provider);
                this.getWalletAssets(this.walletAddress, this.wallet.provider);
                this.dlgDeposit = true;
            }
        },
        actionWithdrawDsa() {
            if (!this.walletIsActive) {
                this.dlgWalletConnect = true;
            } else if (this.dsa_address == '') {
                this.dlgCreateDsa = true;
            } else {
                this.closeAllDlg();
                this.getDsaAssets(this.wallet.provider);
                this.getWalletAssets(this.walletAddress, this.wallet.provider);
                this.dlgWithdrawDsa = true;
            }
        },
        actionSwap() {
            if (!this.walletIsActive) {
                this.dlgWalletConnect = true;
            } else if (this.dsa_address == '') {
                this.dlgCreateDsa = true;
            } else {
                this.closeAllDlg();
                this.getDsaAssets(this.wallet.provider);
                this.dlgSwap = true;
            }
        },
        actionLoop() {
            if (!this.walletIsActive) {
                this.dlgWalletConnect = true;
            } else if (this.dsa_address == '') {
                this.dlgCreateDsa = true;
            } else {
                this.closeAllDlg();
                this.getDsaAssets(this.wallet.provider);
                this.getAaveV3Positions(this.dsa_address, this.wallet.provider);
                this.dlgLoop = true;
            }
        },
        actionDeloop() {
            if (!this.walletIsActive) {
                this.dlgWalletConnect = true;
            } else if (this.dsa_address == '') {
                this.dlgCreateDsa = true;
            } else {
                this.closeAllDlg();
                this.getDsaAssets(this.wallet.provider);
                this.getAaveV3Positions(this.dsa_address, this.wallet.provider);
                this.dlgDeloop = true;
            }
        },
        actionSupply() {
            if (!this.walletIsActive) {
                this.dlgWalletConnect = true;
            } else if (this.dsa_address == '') {
                this.dlgCreateDsa = true;
            } else {
                this.closeAllDlg();
                this.getDsaAssets(this.wallet.provider);
                this.getAaveV3Positions(this.dsa_address, this.wallet.provider);
                this.dlgSupply = true;
            }
        },
        actionWithdraw() {
            if (!this.walletIsActive) {
                this.dlgWalletConnect = true;
            } else if (this.dsa_address == '') {
                this.dlgCreateDsa = true;
            } else {
                this.closeAllDlg();
                this.getDsaAssets(this.wallet.provider);
                this.getAaveV3Positions(this.dsa_address, this.wallet.provider);
                this.dlgWithdrawAave = true;
            }
        },
        actionBorrowRepay() {
            if (!this.walletIsActive) {
                this.dlgWalletConnect = true;
            } else if (this.dsa_address == '') {
                this.dlgCreateDsa = true;
            } else {
                this.closeAllDlg();
                this.getDsaAssets(this.wallet.provider);
                this.getAaveV3Positions(this.dsa_address, this.wallet.provider);
                this.dlgBorrowRepay = true;
            }
        },
        actionShield() {
            if (!this.walletIsActive) {
                this.dlgWalletConnect = true;
            } else if (this.dsa_address == '') {
                this.dlgCreateDsa = true;
            } else {
                this.closeAllDlg();
                // this.getDsaAssets(this.wallet.provider);
                // this.getAaveV3Positions(this.dsa_address, this.wallet.provider);
                this.getShieldInfo(this.wallet.provider);
                this.dlgShield = true;
            }
        },
        closeAllDlg() {
            if (this.dlgSwapEnable) {
                this.dlgWalletConnect = false;
                this.dlgCreateDsa = false;
                // this.dlgGetStarted = false;
                // this.dlgGetStartedTab = "one";
                this.dlgDeposit = false;
                this.dlgWithdrawDsa = false;
                this.dlgWithdrawAave = false;
                this.dlgSwap = false;
                this.dlgSupply = false;
                this.dlgLoop = false;
                this.dlgDeloop = false;
                this.dlgBorrowRepay = false;
                this.dlgBorrow = false;
                this.dlgRepay = false;
                this.dlgShield = false;
            }
        }
    },
});
