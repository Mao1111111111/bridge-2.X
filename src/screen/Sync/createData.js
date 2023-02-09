import * as bridgeReport from '../../database/bridge_report';
import * as bridgeProjectBind from '../../database/bridge_project_bind';
import * as bridgeReportMember from '../../database/bridge_report_member';
import * as partsCheckstatusData from '../../database/parts_checkstatus_data';
import * as bridgeReportFile from '../../database/bridge_report_file';
import * as partsPlanGenesisData from '../../database/parts_plan_genesis_data';
import {score, numeric} from '../../utils/score';
import {groupMap, listToGroup} from '../../utils/common';
import dayjs from 'dayjs';

const getMediaMap = (list, type) => {
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
  const memberMap = listToGroup(list, 'category');
  const c1000 = [];
  Object.keys(memberMap).forEach(key => {
    const membertype = key.split('-').pop();
    console.info();
    c1000.push({
      bridgereportid: bindData.bridgereportid,
      membertype: membertype.slice(0, 3),
      dataid: `${bindData.bridgereportid}_${membertype}`,
      checktypeid: '',
      parentdataid: '',
      memberid: `c1000_${membertype.slice(0, 3)}_${membertype}`,
      scale: '',
      datatype: 'c1000',
      u_date: memberMap[key][memberMap[key].length - 1].u_date,
      userid: memberMap[key][memberMap[key].length - 1].userid,
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

export const getTestData = async (
  id,
  planMeta,
  genesisMate,
  membercheckdata,
) => {
  try {
    const data = {
      testData: [],
      mediaData: [],
      fissureData: [],
      membercheckstatus: [],
      strvaluearr: [],
    };
    const bindData = await bridgeProjectBind.getById(id);
    const bridgeReportData = await bridgeReport.get(bindData);
    if (!bridgeReportData) {
      return data;
    }
    console.info(3);
    data.bridgeReportData = {
      ...bridgeReportData,
      finishdate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    console.info(4);
    data.bridgeReportMemberData = await bridgeReportMember.list(bindData);
    console.info(5);
    data.bridgeReportMemberData.forEach(item => {
      item.dpscoresauto = 100;
    });
    console.info(6);
    const diseaseMember = data.bridgeReportMemberData.filter(
      ({memberstatus}) => memberstatus === '200',
    );
    console.info(7);
    const diseaseData = await partsCheckstatusData.getDisease(
      bindData.bridgereportid,
      diseaseMember.map(item => item.memberid),
    );
    console.info(8);
    diseaseMember.forEach(e => {
      const list = diseaseData
        .filter(({dataid}) => e.memberid === dataid)
        .map(item => {
          const jsondata = JSON.parse(item?.jsondata || '{}');
          if (jsondata?.standard?.scale) {
            item.score =
              numeric(jsondata?.standard?.scale)[item?.jsondata?.scale] || 0;
          }
          item.membername = e.membername;
          item.membertype = e.membertype;
          return item;
        });
      if (list.length === 1) {
        const inx = data.bridgeReportMemberData.findIndex(
          ({memberid}) => memberid === list[0].memberid,
        );
        if (data.bridgeReportMemberData[inx]) {
          data.bridgeReportMemberData[inx].dpscoresauto =
            100 - (list[0].score || 0);
        }
      }
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

    const goodsMember = data.bridgeReportMemberData.filter(
      ({memberstatus}) => memberstatus === '100',
    );

    const _goodsData = goodsMember.length
      ? await partsCheckstatusData.getGoods(
          bindData.bridgereportid,
          goodsMember.map(it => it.memberid),
        )
      : [];
    const goodsData = [];
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

    const fileList = await bridgeReportFile.list(bindData);
    // console.info('fileList', fileList);
    const memberFiles = fileList.filter(e => e.type === 'member');
    const c1000 = C1000(memberFiles, bindData);
    const bridgeFiles = fileList.filter(({category}) =>
      new Set(['front', 'facade', 'remake']).has(category),
    );
    const c3000 = C3000(bridgeFiles, bindData);

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
      ...c1000,
      ...C1001_100(goodsData, fileList, bindData),
      ...C1001_200(c1001List, fileList, bindData, membercheckdata),
      ...C1003(c1003List, fileList, bindData, membercheckdata),
      ...c2001(planGenesis.plan, bindData, planMeta),
      ...c2002(planGenesis.genesis, bindData, genesisMate),
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
