<template>
    <div class="contents">
        <div v-for="i in 200" class="color" :style="`backgroundColor:${getRandomColor()}`"></div>
         <!-- <div style="margin: auto;background-color: red;">666</div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    }
}
</script>
<style>
.color {
    width: calc(((100vw / 12) - 10px));
    height: calc(((100vw / 12) - 10px));
    margin: 5px auto;
}
.contents {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
}
</style>