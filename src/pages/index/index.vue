<template>
    <div class="loadingImageBox">
        <div class="content" :style="`backgroundImage:url('${background}')`">
            <!-- 读取存档 -->
            <el-dialog title="读取存档" :visible.sync="getSaveDialog" style="text-align: left;">
                <div class="tempFiles">
                    <div class="tempFile" v-for="i in saveFile" @click="onGetFile(i)">
                        <div class="box">
                            <img alt="" v-if="i.title" :src="saveImage">
                            <img alt="" v-else="i.else">
                            <div class="title">{{ i.title || "空存档" }}</div>
                            <div class="time">{{ i.date || "...." }}</div>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <!-- 全部结局 -->
            <el-dialog title="全部结局" :visible.sync="showEnds" style="text-align: left;">
                <div class="ends">
                    <div class="end" v-for="i in ends" @click="endSelect = i.id">
                        <div class="e-name">
                            {{ i.name }}
                        </div>
                        <div class="e-options">
                            <div class="e-o-title">
                                查看抵达选项
                            </div>
                            <div style="display: flex;flex-wrap: wrap;">
                                <div class="e-option" v-for="j in i.condition" v-show="endSelect == i.id">
                                    — {{ j == 'None' ? '随便选' : j }} —
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>

            <div style="margin: auto;position: relative;top:-50px">
                <div class="titles">
                    交错的端口预言
                </div>
                <div class="options">
                    <div class="option" @click="$router.replace('/play');">
                        开始游戏
                    </div>
                    <div class="option" @click="gameNext">
                        继续游戏
                    </div>
                    <div class="option" @click="getSaveDialog = true">
                        读取存档
                    </div>
                    <div class="option" @click="showEnds = true">
                        全部结局
                    </div>
                    <div class="option" @click="$router.replace('/rolePortrait');">
                        人物立绘
                    </div>
                    <div class="option" @click="openClearData">
                        清空数据
                    </div>
                    <div class="option" @click="openAbout">
                        关于游戏
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import ends from '@/roleWord/end/index'
export default {
    data() {
        return {
            background: "",
            getSaveDialog: false,
            showEnds: false,

            //存档
            saveFile: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
            //存档图片
            saveImage: this.$cm.getIllustrationSetById('Rem'),

            //结局
            ends: [],
            endSelect: ""
        }
    },
    mounted() {
        this.ends = ends;

        //读取用户首选项
        try {
            let preferences = JSON.parse(this.$cm.getStorage("preferences"));
            this.$state.showTextSpeed = preferences.showTextSpeed;
            this.$state.backgroundAudioVolume = preferences.backgroundAudioVolume;
            this.$state.roleAudioVolume = preferences.roleAudioVolume;
        }catch (e) {
            console.log("无首选项");
        }

        //读取存档
        try {
            let saveFile = JSON.parse(this.$cm.getStorage("gameFile"));
            this.saveFile = saveFile.length > 0 ? saveFile : [{}, {}, {}, {}, {}, {}, {}, {}, {}];
        } catch (e) {
            console.log("无存档");
        }

        this.background = this.$cm.getBackgroundById("樱花路3");
        this.$state.audioObj[0].volume = this.$state.backgroundAudioVolume;
        this.$state.audioObj[0].loop = true;
    },
    methods: {
        onGetFile(data) {
            try {
                if (!data.step) throw new Error("无法读取存档");
                this.setTempFile(data);
                this.$router.replace('/play?temp=true');
            } catch (e) {
                this.$message({
                    type: 'warning',
                    message: `该存档为空`
                });
            }
        },
        setTempFile(data) {
            //设置临时存档
            this.$cm.setStorage("stepTempFile", Number(data.step));
            this.$cm.setStorage("optionTempFile", JSON.stringify(data.options));
            this.$cm.setStorage("endIdTempFile", data.endId);
        },
        gameNext() {
            try {
                if (!Number(this.$cm.getStorage("stepTempFile")) > 0) throw new Error("无法读取存档");

                this.$router.replace('/play?temp=true')
            } catch (e) {
                this.$message({
                    type: 'warning',
                    message: `无临时存档`
                });
            }
        },
        openClearData() {
            this.$confirm('是否清空游戏所有数据？(包括游戏存档等)', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.clear();
                this.$message({
                    type: 'success',
                    message: '清空成功!'
                });
                location.reload();
            })
        },
        openAbout() {
            this.$alert('游戏程序V1.0正式版于2024-08-08开发完成，存档 缓存 自动播放 禁音功能开发完毕，游戏剧情开发未完成，最新进度：2024-08-23', '关于游戏', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({
                        type: 'success',
                        message: `你干嘛哎哟`
                    });
                }
            });
        }
    },
}
</script>
<style lang="scss" scoped>
.ends {
    .end {
        margin-bottom: 10px;

        .e-name {
            font-weight: bold;
            color: #5787f0;
            font-size: 15px;
        }

        .e-options {
            margin-bottom: 30px;

            .e-o-title {
                color: #5787f0;
                font-size: 12px
            }

            .e-option {
                margin: 0 10px;
                color: #F34A9C;
            }
        }
    }
}

.tempFiles {
    display: flex;
    flex-wrap: wrap;
    min-width: 0;

    .tempFile {
        width: calc(100% / 3);

        .box {
            padding: 10px;
            box-sizing: border-box;

            img {
                width: 100%;
                height: 142px;
                border-radius: 5px;
                background-color: #bacffe;
                box-shadow: 0 0 5px 0 #5787f0;
            }

            .title {
                overflow: hidden;
                height: 20px;
                text-overflow: ellipsis;
                text-wrap: nowrap;
            }

            .date {
                font-size: 12px;
                color: #666;
            }
        }
    }
}

.titles {
    font-weight: bold;
    background: linear-gradient(90deg, #ff7e5f, #feb47b, #72a0f5, #7f7fe9);
    /* 复杂的多色渐变 */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    color: #ff7e5f;
    text-shadow: -10px -10px 0px rgb(255, 240, 240);
    letter-spacing: 20px;
    position: relative;

    font-size: 100px;
    // margin-bottom: 60px;
    margin-top: 50px;
    padding-top: 20px;
    font-family: 'XiangJiaoDaJiangJunLingGanTi', sans-serif;
}

.content {
    background: url("") fixed 50% 100% no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    text-align: right;
    justify-content: end;
    overflow: auto;
}

.options {
    // filter: blur(1);
    border-radius: 10px;
    padding: 10px 0;
    margin: 0 auto;
    backdrop-filter: blur(3px);
    width: 260px;

    .option {
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0 0 5px 0 rgba(243, 74, 156, 0.5);
        margin-bottom: 10px;
        border-radius: 20px 3px 20px 3px;
        
        padding: 15px 0;
        text-align: center;
        color: #888;
        font-size: 28px;
        letter-spacing: 7px;
        font-family: 'XiangJiaoDaJiangJunLingGanTi', sans-serif;
    }

    .option:hover {
        color: rgb(243, 74, 156);
        background-color: rgba(240, 170, 204, 0.6);
    }
}
</style>
<style>