export type GoodsTypeDataType = {
    goodsTypeId: number,
    goodsTypeName: string
}

export type RuleForm = {
    goodsName: string,
    goodsTypeId: number | null,
    details: string
}