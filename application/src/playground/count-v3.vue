<template>
    <div>{{ count }}</div>
    <button @click="onPlus">
        Plus
    </button>
    <button @click="onMinus">
        Minus
    </button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);

function onPlus () {
    count.value++;
}

function onMinus () {
    count.value--;
}

</script>
