export type RuleForm = {
    loadRobot: String,
    loadGoods: String
}

export type GoodsType = {
    goodsId: number,
    goodsName: string,
    currentExecuteTaskType: number,
    currentAssignTaskType: number,
    currentExecuteTaskStatus: number,
}


export type RobotType = {
    robotId: number,
    robotName: string
}
