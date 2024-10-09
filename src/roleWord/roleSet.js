/**
 * 角色设置
 * {
        id: "None",
        name: "角色名",
        //人物图像
        roleImage: [
            {
                type: "正常姿势",
                url: require("@/assets/role/")
            }
        ]
    },
 */

export default [
    {
        //系统预设，旁白角色
        id: "None",
        name: "旁白"
    },
    {
        //系统预设，选择角色
        id: "Option",
        name: "选择"
    },
    {
        //系统预设，过场角色
        id: "Interlude",
        name: "过场"
    },

    {
        id: "Rem",
        name: "雷姆",
        //人物图像
        roleImage: [
            {
                type: "正常姿势",
                url: require("@/assets/role/REM/01.png")
            }
        ]
    },

    {
        id: "CM",
        name: "陈陌",
    },
    {
        id: "LX",
        name: "琳希",
        //人物图像
        roleImage: [
            {
                type: "正常姿势",
                url: require("@/assets/role/LX/01.png")
            },
            {
                type: "侧身姿势",
                url: require("@/assets/role/LX/02.png")
            },
            {
                type: "侧身姿势2",
                url: require("@/assets/role/LX/03.png")
            },
            {
                type: "撩头发",
                url: require("@/assets/role/LX/04.png")
            },
            {
                type: "正常姿势脸红",
                url: require("@/assets/role/LX/05.png")
            },
            {
                type: "正常姿势生气",
                url: require("@/assets/role/LX/06.png")
            },
            {
                type: "正常姿势微笑",
                url: require("@/assets/role/LX/07.png")
            }
        ]
    },
    {
        id: "ZYY",
        name: "周瑶瑶",
        //人物图像
        roleImage: [
            {
                type: "正常姿势",
                url: require("@/assets/role/ZYY/01.png")
            },
            {
                type: "侧身姿势",
                url: require("@/assets/role/ZYY/02.png")
            },
            {
                type: "侧身姿势脸红",
                url: require("@/assets/role/ZYY/03.png")
            },
            {
                type: "害羞姿势",
                url: require("@/assets/role/ZYY/04.png")
            },
            {
                type: "正常姿势脸红",
                url: require("@/assets/role/ZYY/05.png")
            },
            {
                type: "正常姿势微笑",
                url: require("@/assets/role/ZYY/06.png")
            },
        ]
    },
    {
        id: "BXM",
        name: "白筱梦",
        //人物图像
        roleImage: [
            {
                type: "正常姿势",
                url: require("@/assets/role/BXM/01.png")
            },
            {
                type: "侧身姿势",
                url: require("@/assets/role/BXM/02.png")
            },
            {
                type: "撩头发",
                url: require("@/assets/role/BXM/03.png")
            },
            {
                type: "正常姿势伤心",
                url: require("@/assets/role/BXM/04.png")
            },
            {
                type: "正常姿势微笑",
                url: require("@/assets/role/BXM/05.png")
            },
        ]
    },
    {
        id: "YF",
        name: "杨芬",
        //人物图像
        roleImage: [
            {
                type: "正常姿势",
                url: require("@/assets/role/YF/01.png")
            },
        ]
    },
    {
        id: "FX",
        name: "方星",
        //人物图像
        roleImage: [
            {
                type: "正常姿势",
                url: require("@/assets/role/FX/01.png")
            },
        ]
    }
]