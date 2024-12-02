<template>
    <div class="vue">
        {{ name }}
    </div>
</template>

<script>
export default {
    name: 'App',
    data () {
        return {
            name: 'App'
        };
    }
};
</script>

<style lang="scss" scoped>
.vue {
    height: 100%;
    width: 100%;
}
</style>
