export type RuleForm = {
    robotType: number | null,
    armsTransportRobot: number | null,
    arms: number | null
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

