import http from "@/utils/request";
//获取资产列表
export function getAssetList(data) {
  return http(
    {
      method: 'get',
      url: "/asset/page",
      params: data
    }
  )
}
//获取资产详情
export function AssetListDetile(id) {
  return http({
    method: 'get',
    url: '/asset/details/' + id
  })
}
//新增资产
export function addAsset(nitID,
  assetName,
  specificationType,
  unitPrice,
  sourceCode,
  acquisitionDate,
  usefulLife,
  cardNum,
  userDeptID,
  invoiceNum,
  brand,
  storePositionId,
  roomNum,
  notes) {
  const list = {
    nitID: nitID,
    assetName: assetName,
    specificationType: specificationType,
    unitPrice: unitPrice,
    sourceCode: sourceCode,
    acquisitionDate: acquisitionDate,
    usefulLife: usefulLife,
    cardNum: cardNum,
    userDeptID: userDeptID,
    invoiceNum: invoiceNum,
    brand: brand,
    storePositionId: storePositionId,
    roomNum: roomNum,
    notes: notes
  }
  console.log(list)
  return http({
    method: 'post',
    url: '/asset/save',
    data: {
      unitId: list.nitID,
      assetName: list.assetName,
      specificationType: list.specificationType,
      unitPrice: list.unitPrice,
      sourceCode: list.sourceCode,
      acquisitionDate: list.acquisitionDate,
      usefulLife: list.usefulLife,
      cardNum: list.cardNum,
      userDeptId: list.userDeptID,
      invoiceNum: list.invoiceNum,
      brand: list.brand,
      storePositionId: list.storePositionId,
      roomNum: list.roomNum,
      notes: list.notes
    }
  })
}
//删除资产
export function deleteAsset(id) {
  return http({
    method: 'get',
    url: '/asset/remove',
    params: {
      ids: id
    }
  })
}
//编辑资产
export function editAsset(
  id, assetName, specificationType, unitPrice, sourceCode, acquisitionDate, usefulLife, cardNum, invoiceNum, brand, storePositionId, roomNum, notes
) {
  const Id = id //资产id 
  const AssetName = assetName //资产名称
  const SpecificationType = specificationType //规格型号
  const UnitPrice = unitPrice //资产价格
  const SourceCode = sourceCode //资产来源
  const AcquisitionDate = acquisitionDate //获取日期
  const UsefulLife = usefulLife //使用年限
  const CardNum = cardNum //卡片号
  const InvoiceNum = invoiceNum // 发票号
  const Brand = brand // 资产品牌
  const StorePositionId = storePositionId // 所在房间id
  const RoomNum = roomNum //所在房间号
  const Notes = notes //备注
  return http({
    method: 'post',
    url: "/asset/edit",
    data: {
      id: Id,
      assetName: AssetName,
      specificationType: SpecificationType,
      unitPrice: UnitPrice,
      sourceCode: SourceCode,
      acquisitionDate: AcquisitionDate,
      usefulLife: UsefulLife,
      cardNum: CardNum,
      invoiceNum: InvoiceNum,
      brand: Brand,
      storePositionId: StorePositionId,
      roomNum: RoomNum,
      notes: Notes
    }
  })
}
//获取当前房间资产
export function gethouseAsset(id) {
  return http(
    {
      method: 'get',
      url: "/asset/page",
      params: {
        size: '10',
        storePositionId: id
      }
    }
  )
}
//确认资产
export function comfirmAsset(assetid, houseid) {
  return http({
    method: 'post',
    url: '/houseLodging/recognition',
    data: {
      lodgingId: houseid,
      assetId: assetid
    }
  })
}
//退租资产确认
export function comfirmAssetexit(assetid) {
  return http(
    {
      method: 'get',
      url: '/asset/checkOut',
      params: { assetIds: assetid }
    }
  )
}