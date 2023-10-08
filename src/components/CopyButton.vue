<template>
    <v-tooltip :text="tooltipText" location="bottom">
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon density="compact" v-clipboard:copy="props_address.address"
                v-clipboard:success="onCopy" v-clipboard:error="onError">
                <CopyButton v-if="!copiedStatus" />
                <CopiedButton v-else />
            </v-btn>
        </template>
    </v-tooltip>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const props_address = defineProps({
    address: {
        type: String,
        required: true,
    },
});

import CopyButton from '../assets/copyBtn.svg'
import CopiedButton from '../assets/copiedBtn.svg'

const copiedStatus = ref(false);
const tooltipText = computed(() => {
    if (copiedStatus.value) {
        return "Copied."
    } else {
        return "Copy to clipboard"
    }
})

let copy_timeout: any;
const onCopy = (res) => {
    clearTimeout(copy_timeout);
    copiedStatus.value = true;
    copy_timeout = setTimeout(async () => {
        copiedStatus.value = false;
    }, 1000);
}

const onError = (error) => {
    copiedStatus.value = false;
}
</script>

<style></style>