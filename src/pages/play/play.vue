<template>
    <div class="loadingImageBox">
        <div class="content" ref="content" :style="`backgroundImage:url('${background}')`">
            <!-- 用户首选项 -->
            <el-dialog title="首选项设置" :visible.sync="preferencesDialog" style="text-align: left;">
                <div class="preferences">
                    <div class="p-option">
                        <div class="p-name">
                            背景BGM
                        </div>
                        <el-slider :step="0.1" :min="0" :max="1" v-model="$state.backgroundAudioVolume"
                            @change="setVolumeChange">
                        </el-slider>
                    </div>
                    <div class="p-option">
                        <div class="p-name">
                            其他声音
                        </div>
                        <el-slider :step="0.1" :min="0" :max="1" v-model="$state.roleAudioVolume"
                            @change="setVolumeChange">
                        </el-slider>
                    </div>
                    <div class="p-option">
                        <div class="p-name">
                            文本速度
                        </div>
                        <el-slider :step="10" v-model="$state.showTextSpeed" :min="0" :max="100"
                            @change="setVolumeChange">
                        </el-slider>
                    </div>
                    <div class="keys">
                        <div class="key-button">
                            <button>
                                <span class="transition"></span>
                                <span class="gradient"></span>
                                <span class="label">空格</span>
                            </button>
                            <span class="key-txt">点按下一步，长按快进</span>
                        </div>
                        <div class="key-button">
                            <button>
                                <span class="transition"></span>
                                <span class="gradient"></span>
                                <span class="label">Ctrl</span>
                            </button>
                            <span class="key-txt">点按下一步，长按快进</span>
                        </div>
                        <div class="key-button">
                            <button>
                                <span class="transition"></span>
                                <span class="gradient"></span>
                                <span class="label">Enter</span>
                            </button>
                            <span class="key-txt">点按下一步，长按快进</span>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <!-- 对话记录 -->
            <el-dialog title="对话记录" :visible.sync="sayRecordDialog" style="text-align: left;" :fullscreen="true">
                <div class="sayRecord">
                    <div class="sayContent" v-for="i in sayRecord">
                        <div class="s-c">{{ i.roleName }} : {{ i.content }}</div>
                    </div>
                </div>
            </el-dialog>
            <!-- 保存存档 -->
            <el-dialog title="保存存档" :visible.sync="saveDialog" style="text-align: left;">
                <div class="tempFiles">
                    <div class="tempFile" v-for="i, index in saveFile" @click="onSaveFile(index)">
                        <div class="box">
                            <img alt="" v-if="i.title" :src="saveImage">
                            <img alt="" v-else="i.else">
                            <div class="title">{{ i.title || "空存档" }}</div>
                            <div class="time">{{ i.date || "...." }}</div>
                        </div>
                    </div>
                </div>
            </el-dialog>
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

            <!-- 过场动画标签 -->
            <div class="interlude" ref="interlude"></div>

            <!-- 主体内容 -->
            <div class="dialogue" v-show="showRoleInfo">
                <div class="roleName" v-show="!['None', 'Option'].includes(showRoleWord.roleInfo.id)">
                    【<span>{{ showRoleWord.roleWord.roleName || showRoleWord.roleInfo.name }}</span>】
                </div>
                <div class="roleSay" v-if="!['None'].includes(showRoleWord.roleInfo.id)">
                    「<span>{{ showRoleWord.roleWord.content }}</span>」
                </div>
                <div class="roleSay" v-else>
                    <span>{{ showRoleWord.roleWord.content }}</span>
                </div>

                <div class="options">
                    <i class="el-icon-view" @click="showRoleInfo = false; wordStep -= 1; sayRecord.shift()"
                        :style="'margin-right: 15px;'"></i>
                    <i class="el-icon-tickets" @click="sayRecordDialog = true" style="margin-right: 15px;"></i>

                    <i class="el-icon-turn-off-microphone" v-if="!$state.audioStatus" @click="setBackgroundAudio"
                        style="margin-right: 15px;"></i>
                    <i class="el-icon-microphone" v-else style="margin-right: 15px;" @click="setBackgroundAudio"></i>
                    <!-- <i class="el-icon-caret-left" @click="bodyOnClick(-1)" style="margin-right: 10px;"
                        v-show="wordStep > 0"></i> -->
                    <i class="el-icon-video-play"
                        :style="autoPlay ? 'color:rgb(243, 74, 156);margin-right: 10px;' : 'margin-right: 10px;'"
                        @click="autoPlaySet"></i>
                    <i class="el-icon-caret-right" @click="nextContent" style="margin-right: 15px;"></i>

                    <i class="el-icon-setting" @click="preferencesDialog = true" style="margin-right: 20px;"></i>

                    <div class="option" @click="saveDialog = true">保存</div>
                    <div class="option" @click="getSaveDialog = true">读取</div>
                    <div class="option" @click="backTitle()">标题</div>
                </div>
            </div>

            <div class="illustration" v-if="this.showRoleWord.roleWord.illustration != ''">
                <img :src="showRoleWord.roleWord.illustration" alt="">
            </div>
            <div class="roleImage" v-else>
                <img :src="showRoleWord.roleInfo.roleImageUrl" alt="">
            </div>

            <div class="playOptions" v-show="showRoleWord.roleWord.options">
                <button class="playOption" v-for="i in showRoleWord.roleWord.options" @click="pushPlayOption(i)">
                    {{ i.optionName }}
                </button>
            </div>
            <!-- <div class="clickBox" ref="clickBox"></div> -->
        </div>
    </div>
</template>
<script>
import roleWord from "@/roleWord/roleWord"

export default {
    data() {
        return {
            //文本隐藏
            showRoleInfo: true,

            saveDialog: false,
            getSaveDialog: false,
            sayRecordDialog: false,
            preferencesDialog: false,

            background: "",
            showRoleWord: {
                //台词
                roleWord: {
                    content: "None",
                    backContent: "None",
                    backgroundImage: "",
                    //插画图片
                    illustration: "",
                    //选项
                    options: []
                },
                //角色信息
                roleInfo: {
                    id: "",
                    name: "None",
                    roleImageUrl: ""
                }
            },
            //当前步数
            wordStep: 0,
            //当前选项
            playOptions: [],
            //当前结局
            end: {
                id: "",
                conditionNumber: 0,
                condition: [],
                content: [],
            },

            //定时器-文字显示
            wordTimeOut: null,
            //定时器-自动播放
            autoPlayTimeOut: null,

            //自动播放状态
            autoPlay: false,

            //存档
            saveFile: [{}, {}, {}, {}, {}, {}, {}, {}, {}],
            //存档图片
            saveImage: this.$cm.getIllustrationSetById('Rem'),

            //历史对话记录
            sayRecord: []
        }
    },
    mounted() {
        //过场动画自动隐藏
        this.$refs.interlude.addEventListener('animationend', ()=> {
            this.$refs.interlude.classList.remove("interludeAnimation");
            this.bodyOnClick();
            this.showRoleInfo = true;
        });

        this.$state.audioObj[0].play();
        //设置检测语言播放完毕，用于播放结束后跳转下个语音
        this.$state.audioObj[1].addEventListener('ended', () => {
            console.log('角色播音结束');
            if (this.autoPlay) {
                this.clearTimeouts();
                this.bodyOnClick();
            }
        }, false);

        //读取存档
        try {
            let saveFile = JSON.parse(this.$cm.getStorage("gameFile"));
            this.saveFile = saveFile.length > 0 ? saveFile : [{}, {}, {}, {}, {}, {}, {}, {}, {}];
        } catch (e) {
            console.log("无存档");
        }

        //读取临时存档
        if (this.$route.query["temp"]) {
            try {
                this.wordStep = Number(this.$cm.getStorage("stepTempFile") || 0);
                this.playOptions = JSON.parse(this.$cm.getStorage("optionTempFile") || []);
                this.end.id = this.$cm.getStorage("endIdTempFile");
                this.getExtraWordBuyOptions(); //获取选项额外台词
            } catch (e) {
                console.log("无法读取到数据");
                return;
            }

            if (this.wordStep > 0) {
                this.bodyOnClick();
            } else {
                this.wordStep = 0;
                this.playOptions = [];
            }
        }

        //获取当前角色对话信息
        this.getRoleWordAndInfo();
        this.getBackground();

        //捕获游戏点击
        this.$refs.content.addEventListener('click', (event) => {
            console.log(event.target);
            if([this.$refs.content,document.querySelector(".roleImage"),document.querySelector(".roleImage>img"),document.querySelector(".dialogue"),document.querySelector(".illustration>img"),document.querySelector(".roleSay>span"),document.querySelector(".roleName>span")].includes(event.target)) {
                this.bodyOnClick();
            }
        })
        //捕获键盘处理
        document.addEventListener('keydown', (event) => {
            if (this.$route.path === "/play", ["Enter", " ", "Control"].includes(event.key) && (this.showRoleWord.roleWord.options || []).length === 0) {
                this.bodyOnClick();
            }
        })
    },
    destroyed() {
        this.clearTimeouts();
        console.log("页面销毁，定时器删除");
    },

    methods: {
        putSayRecord() {
            this.sayRecord.unshift({
                roleName: this.showRoleWord.roleInfo.name,
                content: this.showRoleWord.roleWord.backContent,
                wordStep: this.wordStep
            });
        },
        backTitle() {
            // location.href = './'
            location.reload();
        },
        setBackgroundAudio() {
            if (this.$state.audioStatus) {
                this.$state.audioObj[0].volume = 0;
                this.$state.audioObj[1].volume = 0;
                this.$state.audioObj[2].volume = 0;
            } else {
                this.$state.audioObj[0].volume = this.$state.backgroundAudioVolume;
                this.$state.audioObj[1].volume = this.$state.roleAudioVolume;
                this.$state.audioObj[2].volume = this.$state.roleAudioVolume;
            }

            this.$state.audioStatus = !this.$state.audioStatus;
        },
        nextContent() {
            //点击下一步功能按钮
            //过滤选项
            if (!["Option"].includes(this.showRoleWord.roleInfo.id)) {
                this.bodyOnClick();
            }
        },
        pushPlayOption(option) {
            this.playOptions.push(option.optionName);

            //追加选项对话
            try {
                let i = 0;
                option.extraWord.forEach(e => {
                    roleWord.splice(this.wordStep + i + 1, 0, e);
                    i++;
                });
            } catch (e) {
                console.log("无追加对话", e);
            }

            this.bodyOnClick(1, option);
        },
        setTempFile() {
            //设置临时存档
            this.$cm.setStorage("stepTempFile", Number(this.wordStep - 1));
            this.$cm.setStorage("optionTempFile", JSON.stringify(this.playOptions));
            this.$cm.setStorage("endIdTempFile", this.end.id);
        },
        setVolumeChange() {
            //用户首选项
            this.$state.audioObj[0].volume = this.$state.backgroundAudioVolume;
            this.$state.audioObj[1].volume = this.$state.roleAudioVolume;
            this.$state.audioObj[2].volume = this.$state.roleAudioVolume;

            this.$cm.setStorage("preferences", JSON.stringify({
                showTextSpeed: this.$state.showTextSpeed,
                backgroundAudioVolume: this.$state.backgroundAudioVolume,
                roleAudioVolume: this.$state.roleAudioVolume,
            }));
        },
        onSaveFile(i) {
            this.saveFile[i] = {
                title: `${this.showRoleWord.roleInfo.name}:${this.showRoleWord.roleWord.content}`,
                date: this.$cm.getDateTime(),
                step: Number(this.wordStep - 1),
                options: this.playOptions,
                endId: this.end.id
            }

            this.$cm.setStorage("gameFile", JSON.stringify(this.saveFile));
            this.saveDialog = false;
            this.saveDialog = true;
        },
        onGetFile(data) {
            //读取临时存档
            try {
                let datas = JSON.parse(JSON.stringify(data));

                if (!datas.step) throw new Error("无法读取存档");
                this.reloadRoleWord(); //重载台词数据
                this.wordStep = datas.step;
                this.playOptions = datas.options;
                this.end.id = datas.endId;
                this.getExtraWordBuyOptions(); //获取选项额外台词
            } catch (e) {
                this.$message({
                    type: 'warning',
                    message: `该存档为空`
                });
                return;
            }

            if (this.wordStep > 0) {
                this.bodyOnClick();
            } else {
                this.wordStep = 0;
                this.playOptions = [];
            }

            this.getRoleWordAndInfo();
            this.getBackground();
            this.getSaveDialog = false;
        },
        getExtraWordBuyOptions() {
            let forNumber = this.playOptions.length;
            let index = 0;
            let forIndex = 0;

            roleWord.forEach(e => {
                forIndex++
                if (forNumber <= index) return;
                if (e.options) {
                    e.options.forEach(eo => {
                        if (eo.extraWord.length > 0 && eo.optionName === this.playOptions[index]) {
                            //追加选项对话
                            try {
                                let i = 0;
                                eo.extraWord.forEach(ew => {
                                    roleWord.splice(forIndex+i, 0, ew);
                                    i++;
                                });
                            } catch (e) {
                                console.log("无追加对话", e);
                                return;
                            }

                            index++;
                        }
                    })
                }
                
            })
        },
        autoPlaySet() {
            this.autoPlay = !this.autoPlay;

            if (!this.autoPlay || ["Option","Interlude"].includes(this.showRoleWord.roleInfo.id)) {
                return
            }

            if (this.wordTimeOut === null) {
                this.bodyOnClick();
            }
        },
        reloadRoleWord() {
            //重新加载roleWord
            delete require.cache[require.resolve("@/roleWord/roleWord")];
            Object.assign(roleWord, require("@/roleWord/roleWord").default);
        },
        getRoleWordAndInfo() {
            this.clearTimeouts();
            let index = 0
            let roleWords

            try {
                roleWords = JSON.parse(JSON.stringify(roleWord[this.wordStep]));
            } catch (e) {
                //进入结局
                console.log("你的选择:" + this.playOptions);

                if (this.end.id === '' || this.end.content.length === 0) {
                    this.end = this.$cm.getEndByOptions(this.playOptions);
                    roleWord = [...roleWord, ...this.end.content];

                    try {
                        roleWords = JSON.parse(JSON.stringify(roleWord[this.wordStep]));
                    } catch (e) {
                        console.error(e);
                    }
                }
            }

            if (!roleWords) {
                this.clearTimeouts();
                this.autoPlay = false;
                this.wordStep--;

                //判断是否真正结束
                if (this.end.id === '') {
                    this.$notify.info({
                        title: '提示',
                        message: '未能进入特定结局',
                        showClose: false
                    });
                    // this.$router.replace("./");
                    setTimeout(() => {
                        this.backTitle();
                    }, 1000);
                } else {
                    this.$notify.success({
                        title: '提示',
                        message: `${this.end.name}已结束`,
                        showClose: false
                    });

                    //清空临时记录
                    this.wordStep = 0;
                    this.end.id = "";
                    this.setTempFile();
                    // this.$router.replace("./");

                    setTimeout(() => {
                        this.backTitle();
                    }, 1000);
                }

                return false;
            }

            let wordContent = roleWords.content;
            roleWords.content = "";
            this.showRoleWord.roleWord = roleWords;
            this.showRoleWord.roleWord.backContent = wordContent;

            this.wordTimeOut = setInterval(() => {
                if (index >= wordContent.length) {
                    this.clearTimeouts();
                    
                    //自动播放逻辑
                    if (this.autoPlay && !['Option'].includes(roleWords.role)) {
                        this.autoPlayTimeOut = setTimeout(() => {
                            if (this.autoPlay && !this.showRoleWord.roleWord.audio) {
                                this.clearTimeouts();
                                this.bodyOnClick();
                            }
                        }, (1000) + wordContent.length * 50);
                    }
                } else {
                    this.showRoleWord.roleWord.content += wordContent.charAt(index);
                }
                index++;

            }, 100 - this.$state.showTextSpeed);

            //获取配音并播放
            this.$state.audioObj[1].pause();
            if (roleWords.audio) {
                console.log("播放角色语言");
                this.$state.audioObj[1].src = roleWords.audio;
                this.$state.audioObj[1].play();
            }

            //过场动画展示
            if(roleWords.role === "Interlude") {
                this.$refs.interlude.classList.add("interludeAnimation");
                this.showRoleInfo = false;
            }

            //获取对话角色信息
            this.showRoleWord.roleInfo = this.$cm.getRoleInfoById(roleWords.role) || "None";

            //获取对话插图
            this.showRoleWord.roleWord.illustration = this.$cm.getIllustrationSetById(roleWords.illustration || "");

            //获取对话角色图片
            if (this.showRoleWord.roleWord.illustration == "") this.showRoleWord.roleInfo.roleImageUrl = this.$cm.getRoleImageUrlByRoleImage(roleWords.role, roleWords.roleImage);

            //记录临时对话记录
            this.putSayRecord();

            return roleWords.role;
        },
        bodyOnClick(step = 1) {
            this.showRoleInfo = true;
            this.wordStep += step

            if (step === -1) {
                console.log(this.sayRecord);
                this.sayRecord.shift(); this.sayRecord.shift();
            }

            //加载台词人物，返回时取消选项记录
            if (["Option"].includes(this.getRoleWordAndInfo()) && step === -1) {
                this.playOptions.pop();
            }

            //获取背景
            this.getBackground();
            //记录临时存档
            this.setTempFile();
        },
        getBackground() {
            this.background = this.$cm.getBackgroundById(this.showRoleWord.roleWord.backgroundImage);
        },
        clearTimeouts() {
            //清除定时器
            clearTimeout(this.wordTimeOut);
            clearTimeout(this.autoPlayTimeOut);
            this.wordTimeOut = null;
            this.autoPlayTimeOut = null;
        }
    },
}
</script>
<style lang="scss" scoped>
.key-button {
    button {
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
        font-size: 13px;
        padding: 0.5em 2em;
        font-weight: 500;
        background: #1f2937;
        color: white;
        border: none;
        position: relative;
        overflow: hidden;
        border-radius: 0.6em;
        cursor: pointer;
    }

    .gradient {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 0.6em;
        margin-top: -0.25em;
        background-image: linear-gradient(rgba(0, 0, 0, 0),
                rgba(0, 0, 0, 0),
                rgba(0, 0, 0, 0.3));
    }

    .label {
        position: relative;
        top: -1px;
    }

    .transition {
        transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
        transition-duration: 500ms;
        background-color: rgba(16, 185, 129, 0.6);
        border-radius: 9999px;
        width: 0;
        height: 0;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    button:hover .transition {
        width: 14em;
        height: 14em;
    }

    button:active {
        transform: scale(0.97);
    }

}

.preferences {
    padding: 10px;
    box-sizing: border-box;

    .keys {
        margin-top: 20px;

        .key-button {
            margin: 10px 0;
        }

        .key-txt {
            margin-left: 20px;
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

.interlude {
    background-color: #000;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 20;
    opacity: 0;
    display: none;
}

.interludeAnimation {
    animation: interludeAn 2s linear;
    display: block !important;
}

@keyframes interludeAn {
    0% {
        opacity: 0;
    }
    25% {
        opacity: 0.5;
    }
    50% {
        opacity: 1;
    }
    75% {
        opacity: 0.5;
    }
    100% {
        opacity: 0;
    }
}

.illustration {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        min-width: 360px;
        width: 40vw;
        max-height: 95vh;
        border-radius: 30px;
    }
}

.sayRecord {
    .sayContent {
        padding: 10px 0;
        font-size: 23px;
        color: #222;
    }
}

.playOptions {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #749df6, $alpha: 0.2);
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    z-index: 20;

    .playOption {
        background-color: rgba($color: #fff, $alpha: 0.9);
        border-radius: 25px;
        height: 50px;
        width: auto;
        width: 40vw;
        margin: 10px auto;
        padding: 15px 10px;
        border: none;
        outline: none;
    }

    .playOption:hover {
        color: #fff;
        background-color: #749df6;
    }
}

.content {
    background: url("") fixed 50% 100% no-repeat;
    background-size: cover;
    transition: background-image 0.5s ease-in-out;
}

.clickBox {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
}

.roleImage {
    position: absolute;
    width: 100vw;
    bottom: 0;
    display: flex;
    justify-content: center;
    img {
        min-width: 32vw;
        max-width: 50vw;
        max-height: 100vh;
        object-fit: cover;
        object-position: 50% 20%;
    }
}

.dialogue {
    background: linear-gradient(to top, rgba(90, 137, 240, 0.9), rgba(90, 137, 240, 0.6), transparent, transparent);
    z-index: 5;
    height: 250px;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    padding: 40px;
    padding-left: 150px;
    box-sizing: border-box;
    align-items: start;
    border-radius: 20px 20px 0 0;

    .options {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        position: absolute;
        bottom: 20px;
        color: #fff;
        right: 50px;

        i {
            font-size: 26px;
        }

        i:hover {
            color: rgb(243, 74, 156);
        }

        .option {
            padding: 0 10px;
        }

        .option:hover {
            box-shadow: 0 0 0 1px #fff;
            border-radius: 5px;
        }
    }

    .roleName {
        color: #fff;
        font-size: 30px;
        text-shadow: 0 0 10px #000;
    }

    .roleSay {
        color: #fff;
        font-size: 30px;
        margin-top: 20px;
        font-weight: bold;
        margin-left: 20px;
        text-align: left;
        overflow: hidden;
        text-shadow: 0 0 10px #000;

        >span {
            letter-spacing: 5px;
            overflow: hidden;
        }
    }
}
</style>