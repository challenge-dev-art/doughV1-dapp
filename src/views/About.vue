<template>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { MenuTabValue } from "../store/interfaces";
import { useAppStore } from "../store/store";
const appStore = useAppStore();

onMounted(() => {
  appStore.menuTabValue = MenuTabValue.about;
});
</script>