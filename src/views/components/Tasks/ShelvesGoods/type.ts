export type RuleForm = {
    targetShelf: number | null,
}

export type GoodsType = {
    goodsId: number,
    goodsName: string,
    taskType: number
    taskStatus: number,
}

export type RobotType = {
    robotId: number,
    robotName: string
}

export type ShelfType = {
    shelfId: number,
    shelfName: string
}