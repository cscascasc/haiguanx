import http from "@/utils/request";
//新增房间
export function addHouse(
  data) {
  const list = {
    RoomNumber: data.roomNumber,//房间号
    HouseEstate: data.houseEstate, //小区
    PropertyNature: data.propertyNature, // 房间属性
    CityCode: data.cityCode,// 县市
    RegionCode: data.regionCode, //区县
    CommunityCode: data.communityCode, //街道
    Unit: data.unit,//楼栋
    AllArea: data.allArea, // 房屋面积
    ActualArea: data.actualArea, // 实际使用面积
    ShareArea: data.shareArea,//公摊使用面积
    BedroomNumm: data.bedroomNumm,//卧室数
    ParlorNum: data.parlorNum,//客厅数
    ToiletNum: data.toiletNum,//厕所数
    PropertyOwner: data.propertyOwner, //产权人
    CertificateTitle: data.certificateTitle,//房产证
    Noties: data.noties,//备注
    RoomNum: data.roomNum, //卧室数
    WaterMeter: data.waterMeter, //水表号
    ElectricMeter: data.electricMeter,//电表号
    BroadbandMeter: data.broadbandMeter,//宽带号
    RentCycleCode: data.rentCycleCode, //租金周期
    RentUnitPrice: data.rentUnitPrice, //租金
    HouseImages: data.houseImages,//房屋图片
    roomAreas: data.roomState, //卧室面积
    gasMeter: data.gasMeter, //房屋图片
    cableTVMeter: data.cableTVMeter, //房屋图片
    propertyPhone: data.propertyPhone, //房屋图片
    manageDeptPhone: data.manageDeptPhone, //房屋图片
    intelligentDeptPhone: data.intelligentDeptPhone, //房屋图片
  }
  console.log(list, '1')
  return http({
    method: 'post',
    url: '/house/save',
    data: {
      "roomNumber": list.RoomNumber,
      "houseEstate": list.HouseEstate,
      "propertyNatureCode": list.PropertyNature,
      "cityCode": list.CityCode,
      "regionCode": list.RegionCode,
      "communityCode": list.CommunityCode,
      "unit": list.Unit,
      "allArea": list.AllArea,
      "actualArea": list.ActualArea,
      "shareArea": list.ShareArea,
      "bedroomNum": list.BedroomNumm,
      "parlorNum": list.ParlorNum,
      "toiletNum": list.ToiletNum,
      "propertyOwner": list.PropertyOwner,
      "certificateTitle": list.CertificateTitle,
      "noties": list.Noties,
      "houseDetails": {
        "roomNum": list.RoomNum,
        "waterMeter": list.WaterMeter,
        "electricMeter": list.ElectricMeter,
        "broadbandMeter": list.BroadbandMeter,
        "rentCycleCode": list.RentCycleCode,
        "rentUnitPrice": list.RentUnitPrice,
        "houseImages": list.HouseImages
      },
      "roomAreas": list.roomAreas,
      gasMeter: list.gasMeter, //房屋图片
      cableTVMeter: list.cableTVMeter, //房屋图片
      propertyPhone: list.propertyPhone, //房屋图片
      manageDeptPhone: list.manageDeptPhone, //房屋图片
      intelligentDeptPhone: list.intelligentDeptPhone, //房屋图片
    }
  })
}
//编辑房间
export function editHouse(
  form
) {
  console.log(form)
  let data = {
    id: form.id,
    createTime: form.createTime,
    updateTime: form.updateTime,
    isDeleted: form.isDeleted,
    status: form.status,
    roomNumber: form.roomNumber,
    houseEstate: form.houseEstate,
    propertyNatureCode: form.propertyNatureCode,
    cityCode: form.cityCode,
    regionCode: form.regionCode,
    unit: form.unit,
    communityCode: form.communityCode,
    allArea: form.allArea,
    actualArea: form.actualArea,
    shareArea: form.shareArea,
    bedroomNum: form.bedroomNum,
    parlorNum: form.parlorNum,
    toiletNum: form.toiletNum,
    propertyOwner: form.propertyOwner,
    certificateTitle: form.certificateTitle,
    houseDetails: {
      id: form.houseDetails.id,
      createTime: form.houseDetails.createTime,
      updateTime: form.houseDetails.updateTime,
      isDeleted: form.houseDetails.isDeleted,
      status: form.houseDetails.status,
      houseId: form.houseDetails.houseId,
      roomNum: form.houseDetails.roomNum,
      roomAreas: form.houseDetails.roomAreas,
      waterMeter: form.houseDetails.waterMeter,
      electricMeter: form.houseDetails.electricMeter,
      broadbandMeter: form.houseDetails.broadbandMeter,
      rentCycleCode: form.houseDetails.rentCycleCode,
      rentUnitPrice: form.houseDetails.rentUnitPrice,
      houseImages: form.houseDetails.houseImages,
      gasMeter: form.houseDetails.gasMeter, //房屋图片
      cableTVMeter: form.houseDetails.cableTVMeter, //房屋图片
      propertyPhone: form.houseDetails.propertyPhone, //房屋图片
      manageDeptPhone: form.houseDetails.manageDeptPhone, //房屋图片
      intelligentDeptPhone: form.houseDetails.intelligentDeptPhone, //房屋图片
    }
  }
  console.log(data)

  return http({
    method: 'post',
    url: "/house/update",
    data: data
  })
}
//新增住房申请 
export function addHouseSubmit(
  data
) {
  const from =
  {
    HouseId: data.houseId,
    ProvinceCode: data.provinceCode,
    RoomId: data.roomId,
    UrbanCode: data.urbanCode,
    StayCycle: data.time,
    RankCode: data.rankCode,
    HandleTypeCode: data.handleTypeCode,
    AttributesCode: data.attributesCode,
    Name: data.name,
    DeptName: data.deptName,
    IdCard: data.idCard,
    ExistPurchase: data.existPurchase,
    OrganizationLife: data.organizationLife,
    MarriageCode: data.marriageCode,
    annex: data.annex,
    Explains: data.explains,
    Notes: data.notes,
    CustomsType: data.customsType,
    applicantId: data.userid,
    nestExamineUser: data.nextExamineUser,
    sex: data.sex,
    phone: data.phone,
    contactsName: data.contactsName,
    contactsPhone: data.contactsPhone
  }
  console.log(from)
  return http({
    method: 'post',
    url: "/houseLodging/lodgingHouse",
    data: {
      "houseId": from.HouseId,
      "roomId": from.RoomId,
      "stayCycle": from.StayCycle,
      "handleTypeCode": from.HandleTypeCode,
      "name": from.Name,
      "idCard": from.IdCard,
      "provinceCode": from.ProvinceCode,
      "urbanCode": from.UrbanCode,
      "rankCode": from.RankCode,
      "attributesCode": from.AttributesCode,
      "deptName": from.DeptName,
      "existPurchase": from.ExistPurchase,
      "organizationLife": from.OrganizationLife,
      "marriageCode": from.MarriageCode,
      "annex": from.annex,
      "explains": from.Explains,
      "notes": from.Notes,
      "customsType": from.CustomsType,
      "applicantId": from.applicantId,
      'nextExamineUser': [from.nestExamineUser],
      'sex': from.sex,
      'phone': from.phone,
      'contactsName': from.contactsName,
      'contactsPhone': from.contactsPhone
    }
  })
}
//上线房间
export function houseturnON(id) {
  return http({
    method: 'get',
    url: '/house/modify/' + id
  })
}
//删除房间
export function housedelect(id) {
  return http({
    method: "get",
    url: "/house/remove",
    params: {
      ids: id
    }
  })
}
//申请审核
export function submitpass(judge, relatedId, userId, option, annex) {
  return http(
    {
      method: 'post',
      url: '/task/examine',
      data: {
        judge: judge,
        relatedId: relatedId,
        userId: userId,
        contractNum: '',
        opinion: option,
        annex: annex
      }
    }
  )
}
//交流干部入住校验
export function checktime(id) {
  return http(
    {
      method: 'get',
      url: '/houseLodging/checkInTimeByIdCard',
      params: {
        cardId: id
      }
    }
  )
}
//重新提交申请
export function reSubmit(form) {
  return http(
    {
      method: 'post',
      url: '/houseLodging/resubmit',
      data: form
    }
  )
}