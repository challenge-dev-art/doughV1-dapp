<template>
  <v-card style="margin-right: 6px; margin-top:29px" color="#1E1E1E">
          <div class="d-flex" style="align-items: center">
            <p class="font-regular text-white text-weight-700 text-size-22px" style="margin-left: 28px; margin-top: 25px">Your supplies</p>
            <v-spacer></v-spacer>
            <p class="font-light text-white text-weight-400 text-size-15px" style="margin-right: 4px; margin-top: 29px">Hide</p>
            <img src="../assets/vector 2.png" style="margin-right: 25px; margin-top: 37px; margin-bottom: 13px">
          </div>
          <div class="d-flex" style="align-items: center; margin-left: 28px; margin-top: 22px; margin-bottom: 26px">
            <v-sheet width="138px" height="27px" style="flex-shrink: 0; border-radius: 5px; border: 1px solid rgba(250, 250, 250, 0.12); padding-left: 5px; padding-bottom: 5px; padding-right: 6px; padding-top: 4px">
              <div class="d-flex" style="align-items: center; ">
                <p class="font-light text-white text-weight-400 text-size-15px">Balance</p>
                <v-spacer></v-spacer> 
                <p class="font-regular text-white text-weight-400 text-size-15px">$16.38</p>
              </div>
            </v-sheet>
            <v-sheet width="104px" height="27px" style="flex-shrink: 0; border-radius: 5px; border: 1px solid rgba(250, 250, 250, 0.12); margin-left: 10px; padding-left: 6px; padding-bottom: 5px; padding-right: 5px; padding-top: 4px">
              <div class="d-flex" style="align-items: center; ">
                <p class="font-light text-white text-weight-400 text-size-15px">APY</p>
                <v-spacer></v-spacer> 
                <p class="font-regular text-white text-weight-400 text-size-15px">1.18%</p>
                <img src="../assets/Vector.png" style="align-self: flex-center; margin-left: 2px">
              </div>
            </v-sheet>
            <v-sheet width="154px" height="27px" style="flex-shrink: 0; border-radius: 5px; border: 1px solid rgba(250, 250, 250, 0.12); margin-left: 10px; padding-left: 7px; padding-bottom: 5px; padding-right: 5px; padding-top: 4px">
              <div class="d-flex" style="align-items: center; ">
                <p class="font-light text-white text-weight-400 text-size-15px">Collateral</p>
                <v-spacer></v-spacer> 
                <p class="font-regular text-white text-weight-400 text-size-15px">$16.38</p>
                <img src="../assets/Vector.png" style="align-self: flex-center; margin-left: 2px">
              </div>
            </v-sheet>
          </div>
          <v-table>
            <thead>
              <tr style="padding-bottom: 8px;">
                <th style="width: 15%">
                  <div class="d-flex" style="align-items: center; padding-left: 27px">
                    <p class="font-light text-white text-weight-400 text-size-15px">Asset</p>
                    <img src="../assets/Vector1.png" style="margin-left: 6px;">
                  </div>
                </th>
                <th style="width: 15%">
                  <div class="d-flex justify-center align-center">
                    <p class="font-light text-white text-weight-400 text-size-15px">Balance</p>
                    <img src="../assets/Vector1.png" style="margin-left: 6px;">
                  </div>
                </th>
                <th style="width: 15%">
                  <div class="d-flex justify-center align-center">
                    <p class="font-light text-white text-weight-400 text-size-15px">APY</p>
                    <img src="../assets/Vector1.png" style="margin-left: 6px;">
                  </div>
                </th>
                <th style="width: 15%">
                  <div class="d-flex justify-center align-center">
                    <p class="font-light text-white text-weight-400 text-size-15px">Collateral</p>
                    <img src="../assets/Vector.png" style="align-self: flex-start; margin-left: 3px">
                    <img src="../assets/Vector1.png" style="margin-left: 6px;">
                  </div>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in viewSupply" :key="index">
                <td>
                  <div class="d-flex" style="align-items: center; margin-left: 24px;">
                    <img :src="item.assetImg" style="width: 32px; height: 32px">
                    <p class="font-light text-white text-weight-400 text-size-17px" style="margin-left: 14px;">{{ item.assetName }}</p>
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-center align-center">
                    <p class="font-light text-white text-weight-400 text-size-15px">{{ item.balanceCoin }}</p>
                  </div>
                  <div class="d-flex justify-center align-center">
                    <p class="font-light text-white text-weight-400 text-size-15px" style="margin-top: 6px">${{ item.balanceDollar }}</p>
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-center align-center">
                    <p class="font-light text-white text-weight-400 text-size-15px">{{ item.apy }}%</p>
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-center align-center">
                    <img src="../assets/switch.svg">
                  </div>
                </td>
                <td>
                    <v-btn class="btnWithdraw text-none text-black font-regular text-weight-400 text-size-16px; align-items:center">Withdraw</v-btn>
                </td>
                <td>
                    <v-btn class="btnLoop text-none text-white font-regular text-weight-400 text-size-16px; align-items:center">Loop</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
</template>

<script setup lang="ts">
  
  import {reactive, ref, computed, watch} from 'vue';

  import imageETH from '../assets/Ellipse 210.png';
  import imageUSDC from '../assets/image 75.png';

  //const data=ref(0);
  const viewSupply=reactive([
      {
        assetName: "ETH",
        assetImg: imageETH,
        balanceCoin: 0.0100000,
        balanceDollar: 16.38,
        apy: 1.18,
      },
      {
        assetName: "USDC",
        assetImg: imageUSDC,
        balanceCoin: 0.0100000,
        balanceDollar: 16.38,
        apy: 1.18,
      }
    ]
  );

</script>

<style scoped>
  .btnWithdraw {
    width: 86px !important;
    height: 37px !important;
    margin-right: 8px !important;
    padding-left: 8px !important;
    padding-bottom: 11px !important;
    padding-right: 8px !important;
    padding-top: 10px !important;
    flex-shrink: 0;
    border-radius: 5px;
    background: #FFF !important;
  }
  .btnLoop {
    width: 70px !important;
    height: 37px !important;
    margin-right: 18px!important;
    padding-left: 8px !important;
    padding-bottom: 11px !important;
    padding-right: 8px !important;
    padding-top: 10px !important;
    flex-shrink: 0;
    border-radius: 5px;
    background: rgba(250, 250, 250, 0.12) !important;
  }
  th {
    height: 24px !important;
    padding-left: 0px !important; 
    padding-right: 0px !important;
  }
  td {
    height: 84px !important;
    padding-right: 0px !important; 
    padding-left: 0px !important;
  }
</style>