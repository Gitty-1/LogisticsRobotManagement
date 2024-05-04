export type RuleForm = {
    goodsId: number,
    goodsName: string,
    goodsStatus: number,
    goodsTypeId: number,
    goodsTypeName: string,
    createTime: string | null,
    shelvingTime: string | null,
    details: string | null,
    shelfId: number, 
    positionX: number,
    positionY: number
}

export type GoodsTypeDataType = { 
    goodsTypeId: number,
    goodsTypeName: string
}