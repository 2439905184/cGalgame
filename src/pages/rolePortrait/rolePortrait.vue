<template>
    <div class="loadingImageBox">
        <div class="content" :style="`backgroundImage:url('${background}')`" @click="leftShow">
            <div class="left-liHui-box" ref="leftLihui">
                <div class="hidden" @click="leftHidden" ref="leftHidded" name="hiddenClick">
                    <i class="el-icon-caret-left" ref="leftHiddedI" name="hiddenClick"></i>
                </div>
                <div class="roleImage">
                    <div class="roleInfo" v-for="i in roleSet" v-if="i.roleImage">
                        <div class="r-name">
                            {{ i.name }} - 人物立绘
                        </div>
                        <div class="r-images">
                            <img v-for="j in i.roleImage" :src="j.url" alt="roleImage" @click="roleImage = j.url">
                        </div>
                    </div>
                </div>
                <div class="backgroundImage">
                    <img v-for="i in backgroundSet" :src="i.url" alt="backgroundImage" @click="background = i.url">
                </div>
            </div>

            <div class="toTitle" @click="toTitle" ref="toTitle">
                返回标题
            </div>

            <div class="showRoleImage">
                <img :src="roleImage" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import roleSet from "@/roleWord/roleSet"
import backgroundSet from "@/roleWord/backgroundSet"

export default {
    data() {
        return {
            background: "",
            roleImage: '',
            
            roleSet: [],
            backgroundSet: []
        }
    },
    mounted() {
        this.roleSet = roleSet; this.backgroundSet = backgroundSet;
    },
    methods: {
        toTitle() {
            this.$router.replace('/')
        },
        leftHidden() {
            this.$refs.leftLihui.classList.add("left-hidden");
            this.$refs.toTitle.classList.add("left-hidden");
        },
        leftShow(event) {
            if(![...(document.getElementsByName("hiddenClick"))].includes(event.target)) {
                this.$refs.leftLihui.classList.remove("left-hidden");
                this.$refs.toTitle.classList.remove("left-hidden");
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.toTitle {
    position: absolute;
    right: 0;
    background-color: rgba($color: #ddacac, $alpha: 0.6);
    color: #fff;
    // mix-blend-mode: difference;
    padding: 10px 15px;
    border-radius: 10px 0 0 10px;
    font-size: 17px;
    font-weight: bold;
    width: 20px;
    z-index: 50;
}
.showRoleImage {
    position: absolute;
    width: 100vw;
    bottom: 0;
    display: flex;
    justify-content: center;
    z-index: 20;
    img {
        min-width: 32vw;
        max-width: 50vw;
        max-height: 100vh;
        object-fit: cover;
        object-position: 50% 20%;
    }
}
.left-hidden {
    display: none !important;
}
.left-liHui-box {
    z-index: 100;
    width: 30vw;
    max-width: 460px;
    position: absolute;
    left: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: #fff;
    background-color: rgba($color: #ddacac, $alpha: 0.6);
    .hidden {
        --w: 40px;
        --h: 50px;
        width: var(--w);
        height: var(--h);

        position: absolute;
        background-color: rgba($color: #ddacac, $alpha: 0.6);
        right: calc(var(--w) * -1);
        top: calc(50% - var(--h) / 2);
        text-align: center;
        border-radius: 0 var(--w) var(--w) 0;
        font-weight: bold;
        font-size: calc(var(--h) / 2);
        line-height: var(--h);
    }
    .roleImage {
        box-shadow: -2px 0 0 2px #fff;
        padding: 10px;
        box-sizing: border-box;
        flex: 1;
        overflow: auto;
        .r-name {
            text-align: left;
            margin: 10px 0;
            font-weight: bold;
            font-size: 16px;
            text-shadow: 0 0 10px #000;
        }
        .r-images {
            display: flex;
            flex-wrap: wrap;
            >img {
                width: 50%;
                padding: 10px;
                box-sizing: border-box;
                border-radius: 50%;
            }
        }
    }
    .backgroundImage {
        padding: 10px;
        box-sizing: border-box;
        height: 40%;
        flex-shrink: 0;
        overflow: auto;
        display: flex;
        flex-wrap: wrap;
        >img {
            width: 50%;
            padding: 10px;
            box-sizing: border-box;
            border-radius: 20px;
        }
    }
}
.content {
    background: url("") fixed 50% 100% no-repeat;
    transition: background-image 0.5s ease-in-out;
    background-size: cover;
    display: flex;
    align-items: center;
    text-align: right;
    justify-content: end;
    overflow: auto;
}
</style>
<style>