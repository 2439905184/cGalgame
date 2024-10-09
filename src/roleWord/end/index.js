/**
 * 结局设置
 * {
        id: "结局1",
        name: "纯爱结局",
        //达成条件
        condition: [
            //选项
            "选择内容",
        ],
        //达成次数
        conditionNumber: 3,
        //通往结局
        content: end1,
    },
 */

import end1 from './end1'
import end2 from './end2'
import end3 from './end3'
import end4 from './end4'

export default [
    {
        id: "结局1",
        name: "结局1",
        //达成条件
        condition: [
            //选项
            "再多看几眼",
        ],
        //达成次数
        conditionNumber: 1,
        //通往结局
        content: end1,
    },
    {
        id: "结局2",
        name: "结局2",
        //达成条件
        condition: [
            //选项
            "移开眼睛",
        ],
        //达成次数
        conditionNumber: 1,
        //通往结局
        content: end2,
    },
]