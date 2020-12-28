// 辅助函数

/**
* @description: 处理数据格式
* @param {type} 
* @return: 
*/
const handleDataFormatForReq = (dataOfObj) => {
    let dataStr = [];
    for (const key in dataOfObj){
        dataStr.push(`${key}=${dataOfObj[key]}`);
    }
    dataStr = dataStr.join('&');
    return dataStr;
}


// const sum = (a,b) => {
//     a + b
// }
// sum(1,2);

// 封装技巧
// 1.找到重复的代码
// 2.变化的数据 => 形参
// 3.计算结果考虑到外部（调用位置）需要,return结果