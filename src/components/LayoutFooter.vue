<template>
    <div v-if="!appStore.isMobile" style="margin-top: 44px;">
        <v-row class="appFooter align-center">
            <v-col cols="4" style="text-align: center;">
                <p class="font-regular text-white text-weight-400 text-size-18px">Our Policy</p>
            </v-col>
            <v-col cols="4" style="text-align: center;">
                <p class="font-regular text-white text-weight-400 text-size-18px">All rights reserved Dough | 2023</p>
            </v-col>
            <v-col cols="4" style="text-align: center;">
                <a href="#">
                    <iconTwitter />
                </a>
                <a href="#" class="ml-3">
                    <iconTeleram />
                </a>
                <a href="#" class="ml-3">
                    <iconDiscord />
                </a>
            </v-col>
        </v-row>
    </div>
    <div v-else style="margin-top: 64px; margin-bottom: 40px;">
        <v-row>
            <v-spacer></v-spacer>
            <a href="#">
                <iconTwitter />
            </a>
            <a href="#" class="ml-3">
                <iconTeleram />
            </a>
            <a href="#" class="ml-3">
                <iconDiscord />
            </a>
            <v-spacer></v-spacer>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <p class="font-regular text-white text-weight-400 text-size-17px">All rights reserved Dough | 2023</p>
            <v-spacer></v-spacer>
        </v-row>
        <v-row>
            <v-spacer></v-spacer>
            <p class="font-regular text-white text-weight-400 text-size-17px">Our Policy</p>
            <v-spacer></v-spacer>
        </v-row>
    </div>
</template>
  
<script setup lang="ts">
import iconTwitter from "../assets/twitter.svg"
import iconTeleram from "../assets/telegram.svg"
import iconDiscord from "../assets/discord.svg"

import { useAppStore } from "../store/store";
const appStore = useAppStore();

</script>
  
<style>
.appFooter {
    height: 55px;
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    color: white;
    border: solid;
    border-radius: 0px !important;
    border-width: 0px;
    background: #1E1E1E;
}
</style>