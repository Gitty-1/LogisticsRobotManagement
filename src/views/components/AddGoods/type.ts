export type GoodsTypeDataType = {
    goodsTypeId: number,
    goodsTypeName: string
}

export type RuleForm = {
    goodsName: string,
    goodsTypeId: number | null,
    details: string,
    positionX: number | null,
    positionY: number | null
}