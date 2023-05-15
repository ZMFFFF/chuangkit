<template>
    <div class="gotop" @click="gotop">
        <img src="../assets/gotop.png" alt="" />
    </div>
</template>

<script>
export default {
    methods: {
        gotop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
    },
};
</script>

<style scoped lang="scss">
.gotop {
    position: fixed;
    right: 10px;
    bottom: 70px;
    background-color: #fff;
    z-index: 9998;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    img {
        width: 40px;
        height: 40px;
    }
}
</style>