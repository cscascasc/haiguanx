import http from "@/utils/request";
//新增房间
export function addHouse(
  roomNumber, houseEstate, propertyNature,
  cityCode, regionCode, communityCode, unit,
  allArea, actualArea, shareArea, bedroomNumm,
  parlorNum, toiletNum, propertyOwner, certificateTitle,
  noties, roomNum, waterMeter, electricMeter, broadbandMeter,
  rentCycleCode, rentUnitPrice, houseImages,
  roomState) {
  const list = {
    RoomNumber: roomNumber,//房间号
    HouseEstate: houseEstate, //小区
    PropertyNature: propertyNature, // 房间属性
    CityCode: cityCode,// 县市
    RegionCode: regionCode, //区县
    CommunityCode: communityCode, //街道
    Unit: unit,//楼栋
    AllArea: allArea, // 房屋面积
    ActualArea: actualArea, // 实际使用面积
    ShareArea: shareArea,//公摊使用面积
    BedroomNumm: bedroomNumm,//卧室数
    ParlorNum: parlorNum,//客厅数
    ToiletNum: toiletNum,//厕所数
    PropertyOwner: propertyOwner, //产权人
    CertificateTitle: certificateTitle,//房产证
    Noties: noties,//备注
    RoomNum: roomNum, //卧室数
    WaterMeter: waterMeter, //水表号
    ElectricMeter: electricMeter,//电表号
    BroadbandMeter: broadbandMeter,//宽带号
    RentCycleCode: rentCycleCode, //租金周期
    RentUnitPrice: rentUnitPrice, //租金
    HouseImages: houseImages,//房屋图片
    roomAreas: roomState, //卧室面积
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
      "roomAreas": list.roomAreas
    }
  })
}
//编辑房间
export function editHouse(
  form
) {
  console.log(form)
  return http({
    method: 'post',
    url: "/house/update",
    data: {
      id: form.id,
      createTime: form.createTime,
      updateTime: form.updateTime,
      isDeleted: form.isDeleted,
      status: form.status,
      roomNumber: form.roomNumber,
      houseEstate: form.houseEstate,
      propertyNatureCode: form.propertyNature,
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
      // cityName: cityName,
      // regionName: regionCode,
      // communityName: communityName,
      houseDetails: {
        id: form.houseId,
        createTime: form.createTime,
        updateTime: form.updateTime,
        isDeleted: form.isDeleted,
        status: form.status,
        houseId: form.id,
        roomNum: form.roomNumber,
        roomAreas: form.roomAreas,
        waterMeter: form.waterMeter,
        electricMeter: form.electricMeter,
        broadbandMeter: form.broadbandMeter,
        rentCycleCode: form.rentCycleCode,
        rentUnitPrice: form.rentUnitPrice,
        houseImages: form.houseImages,
      }
    }
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
    MarriageProve: data.marriageProve,
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
      "marriageProve": from.MarriageProve,
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