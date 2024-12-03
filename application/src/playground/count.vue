<template>
    <div>{{ count }}</div>
    <button @click="onPlus">
        Plus
    </button>
    <button @click="onMinus">
        Minus
    </button>
</template>

<script>
export default {
    name: 'Count',
    data () {
        return {
            count: 0
        };
    },
    methods: {
        onPlus () {
            this.count++;
        },
        onMinus () {
            this.count--;
        }
    }
};
</script>
