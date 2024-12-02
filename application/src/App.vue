<template>
    <NElement
        style="height: 100%;width: 100%;background-color: #f7f9fb;"
    >
        <div class="vue">
            <div class="req">
                <p>vue2:</p>
                <NInput
                    v-model:value="req"
                    type="textarea"
                    :rows="24"
                ></NInput>
                <NButton class="btn" type="info" @click="onSpawn">
                    开始转换
                </NButton>
            </div>
            <div class="res">
                <p>vue3:</p>
                <NInput
                    readonly
                    type="textarea"
                    :rows="24"
                    :value="res"
                    style="background-color: #f7f9fb;"
                ></NInput>
            </div>
        </div>
    </NElement>
</template>

<script setup lang="ts">
import { NElement, NInput, NButton } from 'naive-ui';
import { ref } from 'vue';
import { doVue2Vue3 } from '@vv/core';
import row from './_App.vue?raw';

const req = ref(row);
const res = ref('');
function onSpawn () {
    res.value = doVue2Vue3(req.value);
}
</script>

<style lang="scss">
.vue {
    height: 100%;
    width: 100%;
    display: flex;
}
.req {
    height: 100%;
    width: 50%;
    padding: 4px;
    border-right: 1px solid var(--border-color);
    background-color: var(--base-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .btn {
        margin-top: 4px;
        position: absolute;
        left: 0;
        top: 0;
    }
}

p {
    margin-bottom: 8px;
}

.res {
    height: 100%;
    width: 50%;
    padding: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
