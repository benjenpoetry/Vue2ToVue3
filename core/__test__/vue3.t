<template>
    <div class="vue">
        {{ name }}
    </div>
</template>

<script setup>
import { ref } from 'vue';
const name = ref('App');
</script>

<style lang="scss" scoped>
.vue {
    height: 100%;
    width: 100%;
}
</style>
