<template>
  <v-card style="margin-left: 6px; margin-top: 29px" color="#1E1E1E">
          <div class="d-flex" style="align-items: center; margin-bottom: 72px">
            <p class="font-regular text-white text-weight-700 text-size-22px" style="margin-left: 28px; margin-top: 24px;">Assets to borrow</p>
            <v-spacer></v-spacer>
            <p class="font-light text-white text-weight-400 text-size-15px" style="margin-right: 4px; margin-top: 29px">Hide</p>
            <img src="../assets/vector 2.png" style="margin-right: 26px; margin-top: 36px; margin-bottom: 13px">
          </div>
          <v-table>
            <thead>
              <tr style="padding-bottom: 8px;">
                <th style="width: 144px">
                  <div class="d-flex" style="align-items: center; padding-left: 27px">
                    <p class="font-light text-white text-weight-400 text-size-15px">Asset</p>
                    <img src="../assets/Vector1.png" style="margin-left: 6px;">
                  </div>
                </th>
                <th style="width: 128px">
                  <div class="d-flex justify-center align-center">
                    <p class="font-light text-white text-weight-400 text-size-15px">Available</p>
                    <img src="../assets/Vector.png" style="align-self: flex-start; margin-left: 3px">
                    <img src="../assets/Vector1.png" style="margin-left: 6px;">
                  </div>
                </th>
                <th style="width: 115px">
                  <div class="d-flex  justify-center align-center" style="height: 18px;">
                    <p class="font-light text-white text-weight-400 text-size-15px">APY,</p>
                    <img src="../assets/Vector.png" style="align-self: flex-start; margin-left: 3px">
                  </div>
                  <div class="d-flex justify-center align-center" style="height: 18px;">
                    <p class="font-light text-white text-weight-400 text-size-15px">variable</p>
                    <img src="../assets/Vector1.png" style="margin-left: 6px;">
                  </div>
                </th>
                <th style="width: 94px">
                  <div class="d-flex  justify-center align-center" style="height: 18px;">
                    <p class="font-light text-white text-weight-400 text-size-15px">APY,</p>
                    <img src="../assets/Vector.png" style="align-self: flex-start; margin-left: 3px">
                  </div>
                  <div class="d-flex justify-center align-center" style="height: 18px;">
                    <p class="font-light text-white text-weight-400 text-size-15px">stable</p>
                    <img src="../assets/Vector1.png" style="margin-left: 6px;">
                  </div>
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="d-flex" style="align-items: center; margin-left: 19px;">
                    <img src="../assets/image 75.png" style="width: 32px; height: 32px">
                    <p class="font-light text-white text-weight-400 text-size-17px" style="margin-left: 14px;">USDC</p>
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-center align-center">
                    <p class="font-light text-white text-weight-400 text-size-15px">0.0100000</p>
                  </div>
                  <div class="d-flex justify-center align-center">
                    <p class="font-light text-white text-weight-400 text-size-15px" style="margin-top: 6px">$16.38</p>
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-center align-center">
                    <p class="font-light text-white text-weight-400 text-size-15px">1.18%</p>
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-center align-center">
                    <p class="font-light text-white text-weight-400 text-size-15px">5.45%</p>
                  </div>
                </td>
                <td>
                    <v-btn class="btnWithdraw text-none text-black font-regular text-weight-400 text-size-16px; align-items:center">Borrow</v-btn>
                </td>
                <td>
                    <v-btn class="btnLoop text-none text-white font-regular text-weight-400 text-size-16px; align-items:center">Detail</v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
</template>

<script setup lang="ts">

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