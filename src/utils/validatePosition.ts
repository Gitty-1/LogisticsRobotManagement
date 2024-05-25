// 校验坐标值
export const validatePositionX = (rule: any, value: any, callback: any) => {
    const minValue = 0;
    const maxValue = 700;

    if (isNaN(value)) { // 判断输入是否为数字
        callback(new Error('请输入数字'));
    } else if (value < minValue || value > maxValue) { // 判断输入是否在指定范围内
        callback(new Error('请输入合法坐标值'));
    } else {
        callback();
    }
}
export const validatePositionY = (rule: any, value: any, callback: any) => {
    const minValue = 50;
    const maxValue = 320;

    if (isNaN(value)) { // 判断输入是否为数字
        callback(new Error('请输入数字'));
    } else if (value < minValue || value > maxValue) { // 判断输入是否在指定范围内
        callback(new Error('请输入合法坐标值'));
    } else {
        callback();
    }
}