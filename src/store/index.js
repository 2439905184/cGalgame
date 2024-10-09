import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		//音频禁用状态
        audioStatus: true,
        //文字显示速度
        showTextSpeed: 60,
        //背景音乐音量
        backgroundAudioVolume: 0.5,
        //角色音量
        roleAudioVolume: 0.8,
        //音乐播放
        audioObj: [
            //背景音乐
            new Audio(require('@/assets/audio/00.mp3')),
            //其他音频
            new Audio(),
            new Audio()
        ]
	},
	actions: {
		
	},
	mutations: {
		
	},
	getters: {
		
	}
});

export default store;