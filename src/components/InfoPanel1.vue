<template>
    <v-row class="mainInfo">
      <v-col class="pa-0" cols="1">
        <div>
          <p class="font-light text-white text-weight-300 text-size-18px" style="width: 93px; height: 27px;">Net Worth</p>
          <p class="font-regular text-white text-weight-700 text-size-25px" style="width: 88px; height: 37px">$6.37</p>
        </div>
      </v-col>
      <v-col class="pa-0" cols="1" style="margin-left: 8px;">
        <div>
          <div class="d-flex" style="align-items: center">
            <p class="font-light text-white text-weight-300 text-size-18px" style="width: 93px; height: 27px;">Net APY</p>
            <img src="../assets/Vector.png" style="margin-left: -20px; align-self: flex-start">
          </div>
          <p class="font-regular text-white text-weight-700 text-size-25px" style="width: 88px; height: 37px">-3.37%</p>
        </div>
      </v-col>
      <v-col class="pa-0" cols="4" style="margin-left: 18px;">
        <div>
          <p class="font-light text-white text-weight-300 text-size-18px" style="width: 129px; height: 27px; align-content:center">Health factor</p>
            <div class="d-flex" style="align-items: center">
              <p class="font-regular text-green text-weight-700 text-size-25px" style="width: 60px; height: 37px;">1.40</p>
                <v-btn class="infoButton text-none font-light text-white text-weight-400 text-size-15px" style="width: 104px; height: 27px; margin-left: 8px">Risk Details</v-btn>
                <v-btn class="infoButton text-none font-light text-white text-weight-400 text-size-15px" style="width: 65px; height: 27px; margin-left: 5px">Notify</v-btn>
                <v-btn class="infoButton text-none font-light text-white text-weight-400 text-size-15px" style="width: 65px; height: 27px; margin-left: 6px">Shield</v-btn>
            </div>
        </div>
      </v-col>
    </v-row> 
</template>

<script>

</script>

<style scoped>
  .mainInfo {
    margin-top: 61px !important;
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-bottom: 0px !important;
  }
  .infoButton {
    background: #1E1E1E !important;
    color: #FFF;
    font-family: Aeonik Pro TRIAL;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
</style>