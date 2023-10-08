import { createApp } from "vue";
//import App from "./App.vue";
import App from "./App1.vue";
import router from "./router";
import { VueDapp } from "vue-dapp";
import { ethers } from "ethers";
import vuetify from "./plugins/vuetify";
import { createPinia } from "pinia";
import VueClipboard from 'vue3-clipboard'

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(VueDapp, {
  autoConnect: true,
  dumb: false,
  networks: {
    1: {
      chainId: ethers.utils.hexValue(1),
      blockExplorerUrls: ["https://etherscan.io"],
      chainName: "Mainnet",
      rpcUrls: ["https://mainnet.infura.io/v3/"],
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
    },
  },
});
app.use(vuetify);
app.use(pinia);

app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true,
})

app.mount("#app");
