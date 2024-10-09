import roleSet from "@/roleWord/roleSet"
import backgroundSet from "@/roleWord/backgroundSet"
import illustrationSet from "@/roleWord/illustrationSet"
import ends from "@/roleWord/end/index"

//vm为页面this
const install = (Vue, vm) => {

    //将常用变量混入Vue
    Vue.mixin({
        data() {
            return {
                
            }
        }
    })

    // 获取日期时间
    const getDateTime = (cut = '-') => {
        const dateTime = new Date();
        return `${dateTime.getFullYear()}${cut}${dateTime.getMonth() + 1}${cut}${dateTime.getDate()} ${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
    }

    // 获取日期
    const getDate = (cut = '-') => {
        const dateTime = new Date();
        return `${dateTime.getFullYear()}${cut}${dateTime.getMonth() + 1}${cut}${dateTime.getDate()}`;
    }

    //获取时间
    const getTime = () => {
        const dateTime = new Date();
        return `${dateTime.getHours()}:${dateTime.getMinutes()}:${dateTime.getSeconds()}`;
    }

    //数组是否包含某元素
    const arrayItemExists = (array, item) => {
        let i = array.length - 1;
        for (i; i >= 0; i--) {
            if (array[i] == item) {
                return true;
            }
        }
        return false;
    }

    //获取随机整数
    const getRandomInteger = (min, max) => {
        if (min > max) return "最小值不能大于最大值！";
        return Math.floor(Math.random() * (max - min) + min);
    }

    //获取随机字符串
    const getRandomString = (len = 0) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < len; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    //写入COOKIE缓存
    const setStorage = (name, value) => {
        return localStorage.setItem(name, value);
    }

    //获取COOKIE缓存
    const getStorage = (name) => {
        return localStorage.getItem(name);
    }

    //-----业务工具
    //通过角色ID返回角色信息
    const getRoleInfoById = (roleId) => {
        let role = { name: "None" };
        try {
            roleSet.forEach((roles) => {
                if (roles.id === roleId) {
                    role = roles;
                }
            })
        } catch (e) {
            console.warn("roleSet无法遍历",e);
        }

        return role;
    }
    //通过角色状态获取角色图像
    const getRoleImageUrlByRoleImage = (roleId, roleImage) => {
        //处理展示其他角色图像
        if(roleImage && roleImage.includes(".")) {
            let splitRole = roleImage.split(".");
            roleId = splitRole[0];
            roleImage = splitRole[1];
        }

        let roleImageUrl = "";
        try {
            roleSet.forEach((roles) => {
                if (roles.id.toLowerCase() === roleId.toLowerCase()) {
                    roles.roleImage.forEach((images) => {
                        if (roleImage === images.type) {
                            roleImageUrl = images.url;
                        }
                    })
                }
            })
        } catch (e) {
            console.warn("roleSet无法遍历",e);
        }

        return roleImageUrl;
    }
    //通过背景图ID获取背景图路径
    const getBackgroundById = (backId) => {
        let background = "";
        try {
            backgroundSet.forEach((backs) => {
                if (backs.id.toLowerCase() === backId.toLowerCase()) {
                    background = backs.url;
                }
            })
        } catch (e) {
            console.warn("backgroundSet无法遍历",e);
        }

        return background;
    }
    //通过插画图ID获取插画图路径
    const getIllustrationSetById = (id) => {
        let ill = "";
        try {
            illustrationSet.forEach((ills) => {
                if (ills.id.toLowerCase() === id.toLowerCase()) {
                    ill = ills.url;
                }
            })
        } catch (e) {
            console.warn("illustrationSet无法遍历",e);
        }

        return ill;
    }
    //通过选项返回结局
    const getEndByOptions = (options)=>{
        let end = {
            id: "",
            conditionNumber: 0,
            condition: [],
            content: [],
        }

        ends.forEach((enda)=> {
            let conditionNumber = 0;
            for(let i=0;i<enda.condition.length;i++) {
                if(enda.condition[i] === options[i]) {
                    conditionNumber++;
                }
            }
            //判断结局是否达成，并且符合度最高
            if(conditionNumber >= enda.conditionNumber &&  conditionNumber > end.conditionNumber) {
                end = enda;
            }
        })

        return end;
    }

    //将方法设置vue原型
    Vue.prototype.$cm = {
        //基本方法
        getDateTime,
        getDate,
        getTime,
        arrayItemExists,
        getRandomInteger,
        getRandomString,
        setStorage,
        getStorage,

        //功能方法
        getRoleInfoById,
        getRoleImageUrlByRoleImage,
        getBackgroundById,
        getIllustrationSetById,
        getEndByOptions
    };
}

export default install;