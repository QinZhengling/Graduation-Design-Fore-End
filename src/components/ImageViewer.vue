<template>
    <div>
        <img :src="imageUrl">
    </div>
</template>

<script >
export default {
    props: {
        id: String
    },
    computed: {
        imageUrl() {
            return this.$route.params.id
        }
    }
}
</script>
<style scoped>
img {
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
}
</style>