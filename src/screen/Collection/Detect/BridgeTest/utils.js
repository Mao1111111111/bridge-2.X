import storage from '../../../../utils/storage';

export const getBaseData = async (memberList, type) => {
  let components = [];
  let infoComponents = [];
  let basestandardtable = [];
  let membercheckdata = [];
  let scale = [];
  let basemembercheckgroup = [];
  let standardtableinfo = [];
  try {
    const baseData = await storage.getBaseAll();
    const memberInfo = baseData['桥梁结构检测位置'].data;
    if (memberInfo && memberInfo.length) {
      components = memberInfo[0].list?.find(
        ({membertype}) => memberList[0].membertype === membertype,
      ).list;
    }
    const membercheck = baseData['桥梁各部件病害信息'].data;
    if (membercheck && membercheck.length) {
      const set = new Set(type.list.map(({checktypeid}) => checktypeid));
      infoComponents = membercheck[0].list
        ?.find(({membertype}) => memberList[0].membertype === membertype)
        ?.list?.filter(({checktypeid}) => set.has(checktypeid));
      infoComponents.forEach(item => {
        if (item.datastr.split) {
          item.datastr = item.datastr.split(',');
        }
      });
    }
    basestandardtable = baseData['规范标度评分数据'].data;
    membercheckdata = baseData['病害程度单位列表'].data;
    scale = baseData['病害评定明细'].data;
    basemembercheckgroup = baseData['病害分组列表和病害明细表'].data;
    standardtableinfo = baseData['规范标度评分表明细'].data;
  } catch (err) {
    console.info('xxx', err);
  }
  return {
    scale,
    components,
    infoComponents,
    basestandardtable,
    membercheckdata,
    basemembercheckgroup,
    standardtableinfo,
  };
};
