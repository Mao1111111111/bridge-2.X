import * as bridge from '../../database/bridge';
import * as project from '../../database/project';
import * as bridgeReport from '../../database/bridge_report';
import * as bridgeMember from '../../database/bridge_member';
import * as bridgeProjectBind from '../../database/bridge_project_bind';
import * as bridgeReportMember from '../../database/bridge_report_member';
import * as partsCheckstatusData from '../../database/parts_checkstatus_data';
import * as bridgeReportFile from '../../database/bridge_report_file';
import * as partsPlanGenesisData from '../../database/parts_plan_genesis_data';
import * as fileGPS from '../../database/file_gps';
import {score, numeric} from '../../utils/score';
import {groupMap, listToGroup} from '../../utils/common';
import { memberDeduplicate } from '../../utils/deduplicate'
import dayjs from 'dayjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';

const getMediaMap = (list, type) => {
  //list是病害下的一组图片
  const mediaMap = {};
  list.forEach(item => {
    if (mediaMap[item.mediatype]) {
      mediaMap[item.mediatype].push({
        ...item,
        ratio: '',
        photosno: item.inx,
        type,
        parentmediaid: item.parentmediaid,
        title: item.filename,
        info: item.remark,
        main: !!item.is_preference,
        date: item.u_date,
        mediaid: item.mediaid,
        filename: item?.filepath?.split('/')?.pop() || item.filename,
      });
    } else {
      mediaMap[item.mediatype] = [
        {
          ...item,
          ratio: '',
          photosno: item.inx,
          type,
          parentmediaid: item.parentmediaid,
          title: item.filename,
          info: item.remark,
          main: !!item.is_preference,
          date: item.u_date,
          mediaid: item.mediaid,
          filename: item?.filepath?.split('/')?.pop() || item.filename,
        },
      ];
    }
  });
  return mediaMap;
};

// https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/wnieme#d3iO
// 部件描述（或部件备注），一个桥梁的一个部件，仅允许有一条记录
const C1000 = (list, bindData) => {
  //list 部件文件列表,bindData绑定数据
  // memberMap = { category：[mediaObj],member-b200006:[mediaObj] }
  const memberMap = listToGroup(list, 'category');
  const c1000 = [];
  //对key遍历
  Object.keys(memberMap).forEach(key => {
    //membertype 为 b200006  ，member-b200006 -> b200006
    const membertype = key.split('-').pop();
    console.info();

    c1000.push({
      bridgereportid: bindData.bridgereportid,
      //b20
      membertype: membertype.slice(0, 3),
      //dataid 拼接 bridgereportid_b200006
      dataid: `${bindData.bridgereportid}_${membertype}`,
      checktypeid: '',
      parentdataid: '',
      memberid: `c1000_${membertype.slice(0, 3)}_${membertype}`,
      scale: '',
      datatype: 'c1000',
      u_date: memberMap[key][memberMap[key].length - 1].u_date,
      userid: memberMap[key][memberMap[key].length - 1].userid,
      //媒体数据
      media: getMediaMap(memberMap[key], 'mt103'),
      info: '',
    });
  });
  return c1000;
};

// 构件描述（良好)
const C1001_100 = (list, fileList, bindData) => {
  return (
    list?.map(item => {
      const files = fileList.filter(
        it =>
          it.dataid === item.dataid &&
          it.category === 'good' &&
          it.type === 'goodParts',
      );
      return {
        bridgereportid: bindData.bridgereportid,
        membertype: item.membertype,
        datatype: 'c1001',
        checktypeid: '',
        scale: '',
        memberid: item.dataid,
        dataid: item.version,
        memberstatus: '100',
        userid: item.userid,
        u_date: item.u_date,
        membername: item.membername,
        describeinfo: JSON.parse(item?.jsondata || '{}').remark,
        media: getMediaMap(files, 'mt104'),
      };
    }) || []
  );
};

// 构件描述（病害)
const C1001_200 = (list, fileList, bindData, membercheckdata) => {
  return (
    list?.map(item => {
      const files = fileList.filter(
        it =>
          it.dataid === item.version &&
          it.category === 'disease' &&
          it.type === 'diseaseParts',
      );
      const param = JSON.parse(item?.jsondata || '{}');
      const strvalueKey = Object.keys(param).filter(key =>
        membercheckdata?.find(({strvalue}) => strvalue === key),
      );

      const strvaluearr = strvalueKey.map(key => {
        const str = membercheckdata?.find(it => it.strvalue === key);
        return {
          k: str.strvalue,
          n: str.strname,
          v: param[key],
          u: str.strunit,
        };
      });

      return {
        bridgereportid: bindData.bridgereportid,
        membertype: item.membertype,
        datatype: 'c1001',
        memberid: item.dataid,
        memberstatus: '200',
        membername: item.membername,
        dataid: item.version,
        describeinfo: JSON.parse(item?.jsondata || '{}').remark,
        media: getMediaMap(files, 'mt105'),
        checktypeid: param.checktypeid,
        scale: JSON.parse(item?.jsondata || '{}')?.standard?.scale || 0,
        userid: item.userid,
        u_date: item.u_date,
        checktype: {
          checktypeid: param.checktypeid,
          checkgroupid: item.checkgroupid,
          checktypename: item.checktypename,
          scale: param?.standard?.scale,
          main: !!param.mian,
          strvaluearr,
        },
        area: {
          areatype: param.areatype,
          areaname: param.areatypeName,
          areainfo: '',
          areaparam: {
            areaparamid: param.area,
            areaparam: param.areaName,
          },
        },
        areanode: {},
      };
    }) || []
  );
};

// 构件描述（含裂缝数据）
const C1003 = (list, fileList, bindData, membercheck) => {
  return (
    list?.map(item => {
      const files = fileList.filter(
        it =>
          it.dataid === item.version &&
          it.category === 'disease' &&
          it.type === 'diseaseParts',
      );
      const param = JSON.parse(item?.jsondata || '{}');
      const strvalueKey = Object.keys(param).filter(key =>
        membercheck?.find(({strvalue}) => strvalue === key),
      );
      const areanode = param.list.map(it => {
        return {
          nodeid: it.inx,
          nodename: it.name,
          nodeinfo: '',
          nodeparam: {
            nodeparamid: item.inx,
            nodeparamlist: {
              area: it.area, // area
              point: it.areanode, // 参照点
              dx: it.dx,
              dy: it.dy,
            },
          },
        };
      });

      const strvaluearr = strvalueKey.map(key => {
        const str = membercheck?.find(it => it.strvalue === key);
        return {
          k: str.strvalue,
          n: str.strname,
          v: param[key],
          u: str.strunit,
        };
      });

      return {
        bridgereportid: bindData.bridgereportid,
        membertype: item.membertype,
        datatype: 'c1003',
        memberid: item.dataid,
        memberstatus: '200',
        dataid: item.version,
        membername: item.membername,
        describeinfo: JSON.parse(item?.jsondata || '{}').remark,
        scale: JSON.parse(item?.jsondata || '{}')?.standard?.scale || 0,
        media: getMediaMap(files, 'mt105'),
        checktypeid: param.checktypeid,
        checktype: {
          checktypeid: param.checktypeid,
          checkgroupid: item.checkgroupid,
          checktypename: item.checktypename,
          scale: param?.standard?.scale,
          main: !!param.mian,
          strvaluearr,
        },
        area: {
          areatype: param.areatype,
          areaname: param.areatypeName,
          areainfo: '',
          areaparam: {
            areaparamid: param.area,
            areaparam: param.areaName,
          },
        },
        areanode,
        c1003param: true,
        userid: item.userid,
        u_date: item.u_date,
        fissureData: {
          dataId: item.dataid,
          L: param.L,
          w1: param.w1,
          w2: param.w2,
          w3: param.w3,
        },
      };
    }) || []
  );
};
// 养护计划，一个检测桥梁的一个部件，仅允许有一条记录
const c2001 = (list, bindData, planMeta) => {
  const group = listToGroup(list, 'membertype');
  return (
    groupMap(group, (key, item) => {
      const planData =
        planMeta.list?.find(({membertype}) => key === membertype)?.list || [];
      let u_date = '';
      let userid = '';
      const c2001param = [];
      item.forEach(it => {
        const param = JSON.parse(it?.jsondata || '{}');
        const _list = Object?.keys(param).map(k => {
          const str = planData?.find(({maintplanid}) => maintplanid === k);
          console.info(planData);
          return {
            maintplanid: str.maintplanid,
            maintplanname: str.maintplanname,
            maintplanvalue: param[k],
            maintplanunit: str.maintplanunit,
          };
        });
        c2001param.push(..._list);
        u_date = it.u_date;
        userid = it.userid;
      });
      return {
        checktypeid: '',
        bridgereportid: bindData.bridgereportid,
        membertype: key.slice(0, 3),
        memberid: `c2001_${key.slice(0, 3)}_${key}`,
        dataid: bindData.bridgereportid + `_c2001_${key}`,
        datatype: 'c2001',
        scale: 0,
        c2001param,
        u_date: u_date,
        userid: userid,
      };
    }) || []
  );
};

// 病害成因，一个检测桥梁的一个部件，仅允许有一条记录
const c2002 = (list, bindData, genesisMate) => {
  const group = listToGroup(list, 'membertype');
  return (
    groupMap(group, key => {
      const genesis =
        genesisMate[0].list.find(it => key === it.membertype)?.list || [];
      let u_date = '';
      let userid = '';
      const c2001param = group[key].map(item => {
        u_date = item.u_date;
        userid = item.userid;
        const param = JSON.parse(item?.jsondata).list;
        return {
          checktypeid: item.checktypeid,
          causetypelist: param.map(it => ({
            causetypeid: it,
          })),
          causetypeinfo: genesis
            .map(it => param.find(t => t === it.causetypeid)?.causetypename)
            .join(','),
        };
      });
      return {
        checktypeid: '',
        bridgereportid: bindData.bridgereportid,
        dataid: `${bindData.bridgereportid}_c2002_${key}`,
        membertype: key.slice(0, 3),
        memberid: `c2002_${key.slice(0, 3)}_${key}`,
        datatype: 'c2002',
        c2001param,
        scale: 0,
        u_date,
        userid,
      };
    }) || []
  );
};

// 桥梁正面照，一个检测桥梁，仅允许有一条记录
// 桥梁立面照，一个检测桥梁，仅允许有一条记录
// 桥梁备注，一个检测桥梁，仅允许有一条记录
const C3000 = (list, bindDate) => {
  const datas = [];

  // 桥梁正面照
  const frontList = list.filter(({category}) => category === 'front');
  const front = getMediaMap(frontList, 'mt100');
  if (Object.keys(front).length) {
    datas.push({
      parentdataid: '',
      checktypeid: '',
      scale: '',
      membertype: '',
      memberid: '',
      u_date: frontList[frontList.length - 1].u_date,
      userid: frontList[frontList.length - 1].userid,
      bridgereportid: bindDate.bridgereportid,
      datatype: 'c3001',
      dataid: `${bindDate.bridgereportid}_front`,
      media: front,
    });
  }

  // 桥梁立面照
  const facadeList = list.filter(({category}) => category === 'facade');
  const facade = getMediaMap(facadeList, 'mt101');
  if (Object.keys(facade).length) {
    datas.push({
      parentdataid: '',
      checktypeid: '',
      scale: '',
      membertype: '',
      memberid: '',
      u_date: facadeList[facadeList.length - 1].u_date,
      userid: facadeList[facadeList.length - 1].userid,
      bridgereportid: bindDate.bridgereportid,
      datatype: 'c3002',
      dataid: `${bindDate.bridgereportid}_facade`,
      media: facade,
    });
  }
  // 桥梁备注
  const remakeList = list.filter(({category}) => category === 'remake');
  const remake = getMediaMap(remakeList, 'mt102');
  if (Object.keys(facade).length) {
    datas.push({
      parentdataid: '',
      checktypeid: '',
      scale: '',
      membertype: '',
      memberid: '',
      u_date: remakeList[remakeList.length - 1].u_date,
      userid: remakeList[remakeList.length - 1].userid,
      bridgereportid: bindDate.bridgereportid,
      datatype: 'c3003',
      dataid: `${bindDate.bridgereportid}_remake`,
      media: remake,
    });
  }
  return datas;
};

export const getData =async (
  id,
  planMeta,
  genesisMate,
  membercheckdata,
  basememberinfo
) =>{
  try{
    let data = {}
    //****************** 版本号和设备id ******************
    let deviceId = ''
    try{
      // 获取设备id
      deviceId = await AsyncStorage.getItem('deviceId'); 
      if(!deviceId){
        getDeviceId()
        setTimeout(() => {
          deviceId = AsyncStorage.getItem('deviceId');
        }, 1000); 
      }
      if(deviceId==''){
        return errorDeal(id,e,'设备id为空')
      }
    }catch(e){
      console.log('deviceId',e);
      return errorDeal(id,e,'获取设备id失败')
    }
    data['deviceId'] = deviceId
    data['dataVersion'] = '1.0'
    //****************** 桥梁绑定信息 ******************
    let bindData = null
    try{
      bindData = await bridgeProjectBind.getById(id);
    }catch(e){
      console.log('桥梁项目绑定信息',e);
      return errorDeal(id,e,'获取桥梁项目绑定信息失败')
    }
    //****************** 项目信息 ******************
    let projectData = null
    try{
      projectData = await project.getByProjectid(bindData.projectid)
      bindData['projectname'] = projectData.projectname
    }catch(e){
      console.log('项目信息',e);
      return errorDeal(id,e,'获取项目信息失败')
    }
    //****************** 桥梁信息 ******************
    //----获取 桥梁信息
    let bridgeData = null
    try{
      bridgeData = await bridge.getByBridgeid(bindData.bridgeid);
    }catch(e){
      console.log('获取桥梁信息',e);
      return errorDeal(id,e,'获取桥梁信息失败')
    }
    data = {
      ...bridgeData,
      ...data
    }
    try{
      data.bridgeconfig = data.bridgeconfig?JSON.parse(data.bridgeconfig):{}
    }catch(e){
      console.log('解析桥梁配置信息',e);
      return errorDeal(id,e,'解析桥梁配置信息失败')
    }
    //----桥梁的部件、构件数据
    //初始构件数据
    let initialMemberData = null
    try{
      let memberList = await bridgeMember.list(data.bridgeid)
      initialMemberData = await memberDeduplicate(memberList)
    }catch(e){
      console.log('获取桥梁构件列表',e);
      return errorDeal(id,e,'获取桥梁构件列表失败')
    }
    //初始部件数据
    let initialPartData = []
    //整合
    try{
      initialMemberData.forEach(item=>{
        let index = initialPartData.findIndex(i=> i.membertype==item.membertype)
        if(index==-1){
          //不存在
          let part = basememberinfo.find(i=>i.membertype==item.membertype)
          let newPart = {
            bridgertype:part.bridgertype,
            membername:part.membername,
            membertype:part.membertype,
            positionid:part.positionid,
            weight:part.weight,
            memberData:[item]
          }
          initialPartData.push(newPart)
        }else{
          initialPartData[index].memberData.push(item)
        }
      })
    }catch(e){
      console.log('初始化部件数据',e);
      return errorDeal(id,e,'初始化部件数据失败')
    }
    //桥梁结构信息
    data['structureInfo'] = initialPartData
    //****************** 检测数据--基本数据 ******************
    //绑定项目信息
    data['testData'] = bindData
    //获取桥梁检测信息 -- 桥梁检测列表
    let bridgeReportData = null
    try{
      bridgeReportData = await bridgeReport.get(bindData);
    }catch(e){
      console.log('获取桥梁检测信息',e);
      return errorDeal(id,e,'获取桥梁检测信息失败')
    }
    //如果没有检测数据，那么返回空的data
    if (!bridgeReportData) {
      return null;
    }
    //将检测信息存入
    data.testData = {
      ...data.testData,
      ...{
        "reportname":bridgeReportData.reportname,
        "startdate":bridgeReportData.startdate,
        "rstatus":bridgeReportData.rstatus,
        "finishdate":dayjs().format('YYYY-MM-DD HH:mm:ss'),
        "longitude":bridgeReportData.longitude,
        "latitude":bridgeReportData.latitude,
      }
    }
    //****************** 检测数据--媒体数据 ******************
    //----获取照片文件列表 -- 文件表
    let fileList = null
    try{
      fileList = await bridgeReportFile.list(bindData);
    }catch(e){
      console.log('获取照片文件列表',e);
      return errorDeal(id,e,'获取照片文件列表失败')
    }
    // 处理照片数据
    try{
      for(let i=0;i<fileList.length;i++){
        let item = fileList[i]
        // 真正应用的路径
        let appliedPath = item.filepath
        if(item.is_source==0){
          appliedPath = item.copypath
        }
        // 路径名字
        let pathArr = appliedPath.split('/')
        let pathName = pathArr[pathArr.length-1]
        item['appliedPath'] = appliedPath
        item['pathName'] = pathName
        // 获取经纬度
        let gpsINfo = await fileGPS.getForMediaid(item.mediaid)
        if(gpsINfo){
            let {
            longitude,
            latitude,
            accuracy,
            altitude
          } = gpsINfo
          item['gpsInfo'] = {
            longitude,
            latitude,
            accuracy,
            altitude
          }
        }
        fileList[i] = item
      }
    }catch(e){
      console.log('处理照片数据',e);
      return errorDeal(id,e,'处理照片数据失败')
    }
    //桥梁媒体信息
    let bridgeMedia = []
    //部件媒体信息
    let partMedia = []
    //病害媒体信息
    let diseasePartsMedia = []
    //好构件媒体信息
    let goodMemberMedia = []
    //媒体信息分配
    try{
      fileList.forEach(item=>{
        if(item.type=='bridge'){
          bridgeMedia.push(item)
        }else if(item.type=='member'){
          partMedia.push(item)
        }else if(item.type=='diseaseParts'){
          diseasePartsMedia.push(item)
        }else if(item.type=='goodParts'){
          goodMemberMedia.push(item)
        }
      })
    }catch(e){
      console.log('媒体信息分配',e);
      return errorDeal(id,e,'媒体信息分配失败')
    }
    //存入桥梁媒体信息
    data.testData['bridgeMedia'] = bridgeMedia
    //****************** 检测数据--养护计划 ******************
    //获取 养护计划 和 病害成因 数据，并根据category分类
    let planGenesis = null
    try{
      planGenesis = listToGroup(
        await partsPlanGenesisData.list(bindData),
        'category',
      );
    }catch(e){
      console.log('获取 养护计划 和 病害成因 数据',e);
      return errorDeal(id,e,'获取养护计划和病害成因数据失败')
    }
    //养护计划
    let planData = planGenesis.plan?planGenesis.plan:[]
    //病害成因
    let genesisData = planGenesis.genesis?planGenesis.genesis:[]
    //****************** 检测数据--构件数据 ******************
    //获取构件数据 -- 与上面构件的区别是 会有新添加的构件
    let memberData = null
    try{
      memberData = await bridgeReportMember.list({bridgeid: bindData.bridgeid,bridgereportid:bindData.bridgereportid})
    }catch(e){
      console.log('获取测试构件数据',e);
      return errorDeal(id,e,'获取测试构件数据失败')
    }
    //处理构件数据
    try{
      memberData.forEach(item=>{
        item.dpscoresauto = 100
        if(item.memberstatus=='200'){
          item['diseaseData']=[]
        }else if(item.memberstatus=='100'){
          item['goodData']=[]
        }
      })
    }catch(e){
      console.log('处理构件数据',e);
      return errorDeal(id,e,'处理构件数据失败')
    }
    //----病害构件
    let diseaseMember = memberData.filter(
      ({memberstatus}) => memberstatus === '200',
    );
    //获取 病害数据
    let diseaseData = null
    try{
      diseaseData = await partsCheckstatusData.getDisease(
        bindData.bridgereportid,
        diseaseMember.map(item => item.memberid),
      )
    }catch(e){
      console.log('获取 病害数据',e);
      return errorDeal(id,e,'获取病害数据失败')
    }
    //处理 病害数据 和 构件数据
    try{
      diseaseMember.forEach(e=>{
        const list = diseaseData
            .filter(({dataid}) => e.memberid === dataid)
            .map(item => {
              //数据解析
              const jsondata = JSON.parse(item?.jsondata || '{}');
              if (jsondata?.standard?.scale) {
                item.score =
                  numeric(jsondata?.standard?.scale)[item?.jsondata?.scale] || 0;
              }
              item.parentdataid = ''
              item.jsondata = jsondata
              item.membername = e.membername;
              item.membertype = e.membertype;
              return item;
            });
        //如果只一条病害数据 
        if (list.length === 1) {
          //memberData 构件数据
          //查找这条病害输入哪条构件数据
          const inx = memberData.findIndex(
            ({memberid}) => memberid === list[0].memberid,
          );
          //计算 dpscoresauto
          if (memberData[inx]) {
            memberData[inx].dpscoresauto =
              100 - (list[0].score || 0);
          }
        }
        //如果有多条病害数据
        //计算dpscoresauto
        if (list.length > 1) {
          const m = {};
          list.forEach(item => {
            if (m[item.scalegroupid || 'not']) {
              m[item.scalegroupid || 'not'].push(item.score || 0);
            } else {
              m[item.scalegroupid || 'not'] = [item.score || 0];
            }
          });
          const scoreList = [...(m.not || [])];
          Object.keys(m)
            .filter(key => key !== 'not')
            .forEach(key => {
              scoreList.push(Math.max(...m[key]));
            });
          const inx = memberData.findIndex(
            ({memberid}) => memberid === list[0].dataid,
          );
          if (memberData[inx]) {
            memberData[inx].dpscoresauto = parseFloat(
              (100 - score(scoreList).reduce((a, c) => a + c)).toFixed(3),
            );
          }
        }
      })
    }catch(e){
      console.log('处理 病害数据 和 构件数据',e);
      return errorDeal(id,e,'处理病害数据和构件数据失败')
    }
    //病害数据 添加 媒体 属性
    diseaseData.forEach(item=>{item['media']=[]})
    //将 病害媒体数据 存入病害
    try{
      diseasePartsMedia.forEach(item=>{
        let index = diseaseData.findIndex(i=> i.version==item.dataid)
        if(index!==-1){
          diseaseData[index].media.push(item)
        }
      })
    }catch(e){
      console.log('将 病害媒体数据 存入病害',e);
      return errorDeal(id,e,'病害媒体数据存入病害失败')
    }
    //将 养护计划数据 存入病害
    try{
      planData.forEach(item=>{
        let index = diseaseData.findIndex(i=> i.version==item.checkstatusdataid)
        let jsondata = JSON.parse(item?.jsondata || '{}')
        if(index!==-1){
            diseaseData[index].maintenancePlan = {
            ...item,
            jsondata:jsondata
          }
        }
      })
    }catch(e){
      console.log('养护计划数据存入病害失败',e);
      return errorDeal(id,e,'养护计划数据存入病害失败')
    }
    //将 病害成因数据 存入病害
    try{
      genesisData.forEach(item=>{
        let index = diseaseData.findIndex(i=> i.version==item.checkstatusdataid)
        let jsondata = JSON.parse(item?.jsondata || '{}')
        if(index!==-1){
            diseaseData[index].diseaseCause = {
            ...item,
            jsondata:jsondata
          }
        }
      })
    }catch(e){
      console.log('病害成因数据 存入病害',e);
      return errorDeal(id,e,'病害成因数据存入病害失败')
    }
    //将 病害数据 存入构件
    try{
      diseaseData.forEach(item=>{
        let index = memberData.findIndex(i=> i.memberid==item.dataid)
        if(index!==-1){
          memberData[index].diseaseData.push(item)
        }
      })
    }catch(e){
      console.log('病害数据存入构件',e);
      return errorDeal(id,e,'病害数据存入构件失败')
    }
    //----好构件
    let goodsMember = memberData.filter(
      ({memberstatus}) => memberstatus == '100',
    );
    //获取 好构件 的 数据
    let _goodsData = null
    try{
      _goodsData = goodsMember.length
      ? await partsCheckstatusData.getGoods(
          bindData.bridgereportid,
          goodsMember.map(it => it.memberid),
        )
      : []
    }catch(e){
      console.log('获取 好构件 的 数据',e);
      return errorDeal(id,e,'获取好构件的数据失败')
    }
    //好构件数据
    let goodsData = [];
    //处理 好构件数据
    try{
      goodsMember.forEach(e => {
        const goods = _goodsData
          .filter(({dataid}) => e.memberid === dataid)
          .sort((a, b) => a.u_date - b.u_date)[0];
        if (goods) {
          goods.parentdataid = ''
          goods.membername = e.membername;
          goods.membertype = e.membertype;
          goods.media = []
          goods.jsondata = JSON.parse(goods.jsondata)
          goodsData.push(goods);
        }
      });
    }catch(e){
      console.log('处理好构件数据失败',e);
      return errorDeal(id,e,'处理好构件数据失败')
    }
    //将 好构件数据 存入 好构件
    try{
      goodsData.forEach(item=>{
        let index = memberData.findIndex(i=> i.memberid==item.dataid)
        if(index!==-1){
          memberData[index].goodData.push(item)
        }
      })
    }catch(e){
      console.log('好构件数据 存入 好构件',e);
      return errorDeal(id,e,'好构件数据存入好构件失败')
    }
    //将 好构件 的 媒体数据 存入好构件数据
    try{
      goodMemberMedia.forEach(item=>{
        let index = memberData.findIndex(i=> i.memberid==item.dataid)
        if(index!==-1){
          if(memberData[index].goodData){
            if(memberData[index].goodData.length>0){
              if(memberData[index].goodData[0]){
                if(memberData[index].goodData[0].media){
                  memberData[index].goodData[0].media.push(item)
                }
              }
            }
          }
        }
      })
    }catch(e){
      console.log('好构件的媒体数据存入构件失败',e);
      return errorDeal(id,e,'好构件的媒体数据存入构件失败')
    }
    //****************** 检测数据--部件数据 ******************
    //部件数据
    let partData = []
    //整合部件数据
    try{
      memberData.forEach(async (item)=>{
        let exist = partData.findIndex(i=> i.membertype==item.membertype)
        if(exist==-1){
          //不存在
          let part = basememberinfo.find(i=>i.membertype==item.membertype)
          part["memberData"] = [item]
          part["media"] = []
          part["partid"] = item.bridgereportid + '_' + item.position + '_' + item.membertype
          partData.push(part)
        }else{
          //存在
          partData[exist].memberData.push(item)
        }
      })
    }catch(e){
      console.log('整合部件数据失败',e);
      return errorDeal(id,e,'整合部件数据失败')
    }
    //----将部件图片信息存入部件
    try{
      partMedia.forEach(item=>{
        let index = partData.findIndex(i=> i.membertype==item.dataid)
        if(index!==-1){
          partData[index].media.push({
            ...item,
            dataid:partData[index].partid
          })
        }
      })
    }catch(e){
      console.log('部件图片信息存入部件失败',e);
      return errorDeal(id,e,'部件图片信息存入部件失败')
    }
    //部件数据 存入 测试数据
    data.testData['detailTestData'] = partData
    // 处理媒体数据
    let mediaData = []
    fileList.forEach(item=>{
      if(item.mediatype!=='virtualimage'){
        mediaData.push(item)
      }
    })
    let newData = {
      state:true,
      data:data,
      mediaData:mediaData
    }
    return newData
  }catch(e){
    console.log("e111",e);
    return errorDeal(id,e,'')
  }
}

const errorDeal = async (id,_err,errDescribe) => {
  try{
    const bindData = await bridgeProjectBind.getById(id);
    const bridgeData = await bridge.getByBridgeid(bindData.bridgeid);
    const projectData = await project.getByProjectid(bindData.projectid)
    let data = {
      state:false,
      data:{
        ...bridgeData,
        ...bindData,
        projectname:projectData.projectname
      },
      err:(errDescribe?(errDescribe+','):'') + String(_err.message)
    }
    return data
  }catch(e){
    console.log('获取桥梁数据和绑定数据',e);
    let data = {
      state:false,
      data:{
        bridgename:'桥梁名称获取出错'
      },
      err:_err + ',' + e + errDescribe?errDescribe:''
    }
    return data
  }
}

// 获取设备id
const getDeviceId = () => {
  let deviceId = DeviceInfo.getUniqueId()
  AsyncStorage.setItem('deviceId', deviceId?deviceId.toUpperCase():'');
}
//获取
/* const fun = key => {
  const data = new Set();
  state.partsList.forEach(item => data.add(item[key]));
  return [...data].map(item => {
    const plist = state.partsList.filter(i => i[key] === item);
    return {
      title:
        key === 'membertype'
          ? basememberinfo?.find(it => it.membertype === item)?.membername
          : `${item}#跨`,
      [key]: item,
      type: key === 'membertype' ? 'member' : 'kua',
      total: plist.length,
      done: plist.filter(
        i => i.memberstatus !== '0' && i.memberstatus !== '300',
      ).length,
      lastEditDate: getLastDate(plist),
    };
  });
}; */

export const getTestData = async (
  id,
  planMeta,
  genesisMate,
  membercheckdata,
  basememberinfo
) => {
  try {
    getData( id,
      planMeta,
      genesisMate,
      membercheckdata,
      basememberinfo)
    const data = {
      testData: [],
      mediaData: [],
      fissureData: [],
      membercheckstatus: [],
      strvaluearr: [],
    };
    //bindData 1. 桥梁项目检测绑定关系列表 √
    const bindData = await bridgeProjectBind.getById(id);
    //bridgeReportData 2. 桥梁检测列表 √
    const bridgeReportData = await bridgeReport.get(bindData);
    //如果没有检测数据，那么返回空的data √
    if (!bridgeReportData) {
      return data;
    }
    //检测数据 √
    data.bridgeReportData = {
      ...bridgeReportData,
      finishdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    //构件数据 √
    data.bridgeReportMemberData = await bridgeReportMember.list(bindData);
    data.bridgeReportMemberData.forEach(item => {
      item.dpscoresauto = 100;
    });
    //过滤出病害构件 √
    const diseaseMember = data.bridgeReportMemberData.filter(
      ({memberstatus}) => memberstatus === '200',
    );
    //获取病害数据 √
    const diseaseData = await partsCheckstatusData.getDisease(
      bindData.bridgereportid,
      diseaseMember.map(item => item.memberid),
    );
    //病害部件循环 √
    diseaseMember.forEach(e => {
      //处理病害数据的值，添加 membername membertype
      const list = diseaseData
        .filter(({dataid}) => e.memberid === dataid)
        .map(item => {
          //数据解析
          const jsondata = JSON.parse(item?.jsondata || '{}');
          if (jsondata?.standard?.scale) {
            item.score =
              numeric(jsondata?.standard?.scale)[item?.jsondata?.scale] || 0;
          }
          item.membername = e.membername;
          item.membertype = e.membertype;
          return item;
        });
      //如果只一条病害数据 
      if (list.length === 1) {
        //data.bridgeReportMemberData 构件数据
        //查找这条病害输入哪条构件数据
        const inx = data.bridgeReportMemberData.findIndex(
          ({memberid}) => memberid === list[0].memberid,
        );
        //计算 dpscoresauto
        if (data.bridgeReportMemberData[inx]) {
          data.bridgeReportMemberData[inx].dpscoresauto =
            100 - (list[0].score || 0);
        }
      }
      //如果有多条病害数据
      //计算dpscoresauto
      if (list.length > 1) {
        console.info('score2');
        const m = {};
        list.forEach(item => {
          if (m[item.scalegroupid || 'not']) {
            m[item.scalegroupid || 'not'].push(item.score || 0);
          } else {
            m[item.scalegroupid || 'not'] = [item.score || 0];
          }
        });

        const scoreList = [...(m.not || [])];
        Object.keys(m)
          .filter(key => key !== 'not')
          .forEach(key => {
            scoreList.push(Math.max(...m[key]));
          });
        const inx = data.bridgeReportMemberData.findIndex(
          ({memberid}) => memberid === list[0].dataid,
        );
        if (data.bridgeReportMemberData[inx]) {
          data.bridgeReportMemberData[inx].dpscoresauto = parseFloat(
            (100 - score(scoreList).reduce((a, c) => a + c)).toFixed(3),
          );
        }
      }
    });
    //过滤处好的构件 √
    const goodsMember = data.bridgeReportMemberData.filter(
      ({memberstatus}) => memberstatus === '100',
    );
    //好的部件的数据 √
    const _goodsData = goodsMember.length
      ? await partsCheckstatusData.getGoods(
          bindData.bridgereportid,
          goodsMember.map(it => it.memberid),
        )
      : [];
    const goodsData = [];
    //将好的部件的数据放入部件中 √
    goodsMember.forEach(e => {
      const goods = _goodsData
        .filter(({dataid}) => e.memberid === dataid)
        .sort((a, b) => a.u_date - b.u_date)[0];
      if (goods) {
        goods.membername = e.membername;
        goods.membertype = e.membertype;
        goodsData.push(goods);
      }
    });
    //媒体文件数据
    const fileList = await bridgeReportFile.list(bindData);
    // console.info('fileList', fileList);
    //部件文件
    const memberFiles = fileList.filter(e => e.type === 'member');
    const c1000 = C1000(memberFiles, bindData);
    //桥媒体文件
    const bridgeFiles = fileList.filter(({category}) =>
      new Set(['front', 'facade', 'remake']).has(category),
    );
    const c3000 = C3000(bridgeFiles, bindData);

    //桥梁检测构件养护计划 and 病害成因，并根据category分类
    const planGenesis = listToGroup(
      await partsPlanGenesisData.list(bindData),
      'category',
    );
    console.info(planGenesis);
    // 非裂缝数据
    const c1001List = diseaseData.filter(({datatype}) => datatype === 'c1001');
    // 裂缝数据
    const c1003List = diseaseData.filter(({datatype}) => datatype === 'c1003');
    const testData = [
      //部件描述
      ...c1000,
      //良好构件描述
      ...C1001_100(goodsData, fileList, bindData),
      //病害构件描述--非裂缝 √1
      ...C1001_200(c1001List, fileList, bindData, membercheckdata),
      //病害构件描述--裂缝 √1
      ...C1003(c1003List, fileList, bindData, membercheckdata),
      //养护计划 √1
      ...c2001(planGenesis.plan, bindData, planMeta),
      //病害成因 √1
      ...c2002(planGenesis.genesis, bindData, genesisMate),
      //桥梁描述
      ...c3000,
    ];
    testData.forEach(item => {
      data.testData.push({
        bridgereportid: bindData.bridgereportid,
        dataid: item.dataid,
        datatype: item.datatype,
        datajson: item,
      });
      if (!data.membercheckstatus.find(({dataid}) => dataid === item.dataid)) {
        data.membercheckstatus.push({
          dataid: item.dataid,
          parentdataid: '',
          datatype: item.datatype,
          membertype: item.membertype,
          memberid: item.memberid,
          checktypeid: item.checktypeid,
          scale: item?.scale,
          u_date: item.u_date,
          userid: item.userid,
          longitude: 7618.0,
          latitude: 6285.0,
        });
      }

      if (item.media) {
        const media = [];
        Object.keys(item.media).forEach(key => media.push(...item.media[key]));
        // TODO parentmediaid
        data.mediaData.push(
          ...media.map(e => ({
            bridgereportid: bindData.bridgereportid,
            mediatype: e.mediatype || 'virtualimage',
            parentmediaid: e.parentmediaid || '',
            mediaid: e.mediaid,
            filename: e.filename,
            // filetypes: `.${e.filepath?.split('.')?.pop() || ''}`,
            filetypes: `.${e.filetypes}`,
            filesize: e.filesize,
            filepath: e.filepath,
            userid: e.userid,
            u_date: e.u_date,
          })),
        );
        Object.keys(item.media).forEach(key => {
          item.media[key] = item.media[key].map(e => ({
            ratio: '',
            photosno: e.photosno,
            title: e.title,
            type: e.type,
            info: e.remake,
            main: !!e.is_preference,
            date: e.u_date,
            mediaid: e.mediaid,
          }));
        });
      }
      if (item.fissureData) {
        data.fissureData.push(item.fissureData);
      }
      if (item?.checktype?.strvaluearr) {
        data.strvaluearr.push(
          ...(item?.checktype?.strvaluearr.map(it => ({
            bridgereportid: bindData.bridgereportid,
            checktypeid: item.checktypeid,
            dataid: item.dataid,
            strvalue: it.k,
            strvaluevalue: it.v,
          })) || []),
        );
      }
    });
    return data;
  } catch (err) {
    console.info(err);
  }
};
