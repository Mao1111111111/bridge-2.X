import uuid from 'react-native-uuid';

const setInx = data => {
  data.forEach((item, index) => {
    item.orderdesc = index + 1 + '0';
  });
  return data;
};

// 生成主梁/挂梁
const getZhuliangAndGuanliang = (name, values, code, kua) => {
  const liang = parseInt(values.b100001num || '0', 10);
  const _data = [];
  for (let kuaInx = 1; kuaInx <= kua; kuaInx++) {
    for (let liangInx = 1; liangInx <= liang; liangInx++) {
      _data.push({
        position: code.pCode,
        membertype: code[name],
        memberid: uuid.v4(),
        membername: `${kuaInx}-${liangInx}#`,
        stepno: kuaInx,
      });
    }
  }
  return setInx(_data);
};

// 生成横隔板
const getHenggeban = (name, values, code, kua) => {
  const liang = parseInt(values.b100001num || '0', 10);
  const geban = parseInt(values.b100002num || '0', 10);
  const _data = [];
  for (let kuaInx = 1; kuaInx <= kua; kuaInx++) {
    for (let fengInx = 1; fengInx <= liang - 1; fengInx++) {
      for (let gebanInx = 1; gebanInx <= geban; gebanInx++) {
        _data.push({
          position: code.pCode,
          membertype: code[name],
          memberid: uuid.v4(),
          membername: `${kuaInx}-${fengInx}-${gebanInx}#`,
          stepno: kuaInx,
        });
      }
    }
  }
  return setInx(_data);
};

// 生成支座
const getZhizuo = (name, values, code, kua) => {
  const getMembername = (
    kuaInx, // 跨
    liangInx, // 梁
    taiInx, // 台
    zhizuoInx, // 支座
  ) => {
    switch (values.bridgepadno) {
      case 'padno1000':
        return `${kuaInx}-${liangInx}-${taiInx}-${zhizuoInx}#`;
      case 'padno1001':
        return `${kuaInx}-${taiInx}-${liangInx}-${zhizuoInx}#`;
      case 'padno1002':
        return `${liangInx}-${kuaInx}-${taiInx}-${zhizuoInx}#`;
      case 'padno1003':
        return `${liangInx}-${taiInx}-${kuaInx}-${zhizuoInx}#`;
      case 'padno1004':
        return `${taiInx}-${kuaInx}-${liangInx}-${zhizuoInx}#`;
      case 'padno1005':
        return `${taiInx}-${liangInx}-${kuaInx}-${zhizuoInx}#`;
      case 'padno1006':
        return `${kuaInx}-${taiInx}-${zhizuoInx}#`;
      default:
        return `${kuaInx}-${liangInx}-${taiInx}-${zhizuoInx}#`;
    }
  };

  const bridgestruct = values.bridgestruct;
  const liang = parseInt(values.b100001num || '0', 10);
  const zhizuo = parseInt(values.zhizuo_total || '0', 10);
  const _data = [];
  if (bridgestruct === 'funcg101') {
    for (let kuaInx = 1; kuaInx <= kua; kuaInx++) {
      for (let taiInx = kuaInx - 1; taiInx <= kuaInx; taiInx++) {
        for (let liangInx = 1; liangInx <= liang; liangInx++) {
          for (let zhizuoInx = 1; zhizuoInx <= zhizuo; zhizuoInx++) {
            _data.push({
              position: code.pCode,
              membertype: code[name],
              memberid: uuid.v4(),
              membername: getMembername(kuaInx, liangInx, taiInx, zhizuoInx),
              stepno: kuaInx,
            });
          }
        }
      }
    }
    return setInx(_data);
  } else {
    let zuhe = (values.bridgepadstr || '')
      .split('+')
      .map(item => parseInt(item, 10))
      .filter(item => !isNaN(item));
    let inxs = [];
    zuhe.forEach((item, inx) => {
      if (inx) {
        for (let i = inx - 1; i >= 0; i--) {
          item += zuhe[i];
        }
      }
      inxs.push(item + 1);
    });
    for (let kuaInx = 1; kuaInx <= kua; kuaInx++) {
      if (kuaInx === 1) {
        for (let taiInx = kuaInx - 1; taiInx <= kuaInx; taiInx++) {
          for (let liangInx = 1; liangInx <= liang; liangInx++) {
            for (let zhizuoInx = 1; zhizuoInx <= zhizuo; zhizuoInx++) {
              _data.push({
                position: code.pCode,
                membertype: code[name],
                memberid: uuid.v4(),
                membername: getMembername(kuaInx, liangInx, taiInx, zhizuoInx),
                stepno: kuaInx,
              });
            }
          }
        }
      } else {
        if (inxs.find(item => item === kuaInx)) {
          for (let taiInx = kuaInx - 1; taiInx <= kuaInx; taiInx++) {
            for (let liangInx = 1; liangInx <= liang; liangInx++) {
              for (let zhizuoInx = 1; zhizuoInx <= zhizuo; zhizuoInx++) {
                _data.push({
                  position: code.pCode,
                  membertype: code[name],
                  memberid: uuid.v4(),
                  membername: getMembername(
                    kuaInx,
                    liangInx,
                    taiInx,
                    zhizuoInx,
                  ),
                  stepno: kuaInx,
                });
              }
            }
          }
        } else {
          const taiInx = kuaInx;
          for (let liangInx = 1; liangInx <= liang; liangInx++) {
            for (let zhizuoInx = 1; zhizuoInx <= zhizuo; zhizuoInx++) {
              _data.push({
                position: code.pCode,
                membertype: code[name],
                memberid: uuid.v4(),
                membername: getMembername(kuaInx, liangInx, taiInx, zhizuoInx),
                stepno: kuaInx,
              });
            }
          }
        }
      }
    }
    return setInx(_data);
  }
};

// 生成 湿接段/湿接缝/铰缝
const getFeng = (name, values, code, kua) => {
  const liang = parseInt(values.b100001num || '0', 10);
  const _data = [];
  for (let kuaInx = 1; kuaInx <= kua; kuaInx++) {
    for (let fengInx = 1; fengInx <= liang - 1; fengInx++) {
      _data.push({
        position: code.pCode,
        membertype: code[name],
        memberid: uuid.v4(),
        membername: `${kuaInx}-${fengInx}#`,
        stepno: kuaInx,
      });
    }
  }
  return setInx(_data);
};

// 翼墙/耳墙
const getYiQiang = (name, values, code, kua, bridgewallName) => {
  const qiaotai = parseInt(values.b200001num || 0, 10);
  const _data = [];
  const getItem = (_qiaotai, membername) => ({
    position: code.pCode,
    membertype: code[name],
    memberid: uuid.v4(),
    membername: membername,
    stepno: _qiaotai,
  });
  _data.push(getItem(1, `0#台左侧${bridgewallName}`));
  _data.push(getItem(1, `0#台右侧${bridgewallName}`));
  if (qiaotai > 0) {
    _data.push(getItem(kua, `${kua}#台左侧${bridgewallName}`));
    _data.push(getItem(kua, `${kua}#台右侧${bridgewallName}`));
  }
  return setInx(_data);
};

// 锥坡/护坡
const getZhuipoAndHupo = (name, values, code, kua) => {
  const qiaotai = parseInt(values.b200001num || 0, 10);
  const _data = [];
  const getItem = (membername, _qiaotai) => ({
    position: code.pCode,
    membertype: code[name],
    memberid: uuid.v4(),
    membername: membername,
    stepno: _qiaotai,
  });
  _data.push(getItem('0#台护坡', 1));
  _data.push(getItem('0#台左锥坡', 1));
  _data.push(getItem('0#台右锥坡', 1));
  if (qiaotai > 0) {
    _data.push(getItem(`${kua}#台护坡`, kua));
    _data.push(getItem(`${kua}#台左锥坡`, kua));
    _data.push(getItem(`${kua}#台右锥坡`, kua));
  }
  return setInx(_data);
};

// 河床
const getHechuang = (name, values, code, kua) => {
  return setInx([
    {
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: '河床',
      stepno: -1,
    },
  ]);
};

// 调制构造物
const getTiaozhi = (name, values, code, kua) => {
  return setInx([
    {
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: '调制构造物',
      stepno: -1,
    },
  ]);
};

// 桥墩
const getQiaodun = (name, values, code, kua) => {
  const _data = [];
  const _piaodun_type = values.bridgepier || 'pier100';
  const len = parseInt(values.b200002num, 10);
  for (let inx = 1; inx <= len; inx++) {
    if (_piaodun_type === 'pier100') {
      _data.push({
        position: code.pCode,
        membertype: code[name],
        memberid: uuid.v4(),
        membername: `${inx}#墩盖梁`,
        stepno: inx,
      });
      _data.push({
        position: code.pCode,
        membertype: code[name],
        memberid: uuid.v4(),
        membername: `${inx}#墩墩柱`,
        stepno: inx,
      });
      let qiaodunzhushu = parseInt(values.qiaodunzhushu, 10);
      qiaodunzhushu = isNaN(qiaodunzhushu) ? 0 : values.qiaodunzhushu;
      if (qiaodunzhushu > 1) {
        for (let i = 1; i <= qiaodunzhushu; i++) {
          _data.push({
            position: code.pCode,
            membertype: code[name],
            memberid: uuid.v4(),
            membername: `${inx}-${i}#柱`,
            stepno: inx,
          });
        }
      }
    } else {
      _data.push({
        position: code.pCode,
        membertype: code[name],
        memberid: uuid.v4(),
        membername: `${inx}#墩墩身`,
        stepno: inx,
      });
      _data.push({
        position: code.pCode,
        membertype: code[name],
        memberid: uuid.v4(),
        membername: `${inx}#墩墩帽`,
        stepno: inx,
      });
    }
  }

  return setInx(_data);
};

// 桥台
const getQiaotai = (name, values, code, kua) => {
  const _data = [];
  const _piaotai_type = values.bridgeabutment;
  if (_piaotai_type === 'abutment101') {
    _data.push({
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: '0#台盖梁',
      stepno: 1,
    });
    _data.push({
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: '0#台台柱',
      stepno: 1,
    });
    let qiaotaizhushu = parseInt(values.qiaotaizhushu, 10);
    qiaotaizhushu = isNaN(qiaotaizhushu) ? 0 : values.qiaotaizhushu;
    if (qiaotaizhushu > 1) {
      for (let i = 1; i <= qiaotaizhushu; i++) {
        _data.push({
          position: code.pCode,
          membertype: code[name],
          memberid: uuid.v4(),
          membername: `0-${i}#柱`,
          stepno: 1,
        });
      }
    }
    if (kua > 0) {
      _data.push({
        position: code.pCode,
        membertype: code[name],
        memberid: uuid.v4(),
        membername: `${kua}#台盖梁`,
        stepno: kua,
      });
      _data.push({
        position: code.pCode,
        membertype: code[name],
        memberid: uuid.v4(),
        membername: `${kua}#台台柱`,
        stepno: kua,
      });
      if (qiaotaizhushu > 1) {
        for (let i = 1; i <= qiaotaizhushu; i++) {
          _data.push({
            position: code.pCode,
            membertype: code[name],
            memberid: uuid.v4(),
            membername: `${kua}-${i}#柱`,
            stepno: kua,
          });
        }
      }
    }
  } else {
    _data.push({
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: `${0}#台台身`,
      stepno: 1,
    });
    _data.push({
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: `${0}#台台帽`,
      stepno: 1,
    });
    if (_piaotai_type === 'abutment107') {
      let leibanshu = parseInt(values.leibanshu, 10);
      leibanshu = isNaN(leibanshu) ? 0 : values.leibanshu;
      if (leibanshu > 1) {
        for (let i = 1; i <= leibanshu; i++) {
          _data.push({
            position: code.pCode,
            membertype: code[name],
            memberid: uuid.v4(),
            membername: `0-${i}#肋板`,
            stepno: 1,
          });
        }
      }
    }
    if (kua > 0) {
      _data.push({
        position: code.pCode,
        membertype: code[name],
        memberid: uuid.v4(),
        membername: `${kua}#台台身`,
        stepno: 1,
      });
      _data.push({
        position: code.pCode,
        membertype: code[name],
        memberid: uuid.v4(),
        membername: `${kua}#台台帽`,
        stepno: 1,
      });
      if (_piaotai_type === 'abutment107') {
        let leibanshu = parseInt(values.leibanshu, 10);
        leibanshu = isNaN(leibanshu) ? 0 : values.leibanshu;
        if (leibanshu > 1) {
          for (let i = 1; i <= leibanshu; i++) {
            _data.push({
              position: code.pCode,
              membertype: code[name],
              memberid: uuid.v4(),
              membername: `${kua}-${i}#肋板`,
              stepno: 1,
            });
          }
        }
      }
    }
  }
  return setInx(_data);
};

// 墩台基础
const getDuntai = (name, values, code, kua) => {
  const qiaotai = parseInt(values.b200001num || 0, 10);
  const len = parseInt(values.b200002num, 10);
  const _data = [];
  _data.push({
    position: code.pCode,
    membertype: code[name],
    memberid: uuid.v4(),
    membername: '0#台',
    stepno: 1,
  });
  for (let inx = 1; inx <= len; inx++) {
    _data.push({
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: `${inx}#墩`,
      stepno: inx,
    });
  }
  if (qiaotai > 0) {
    _data.push({
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: `${kua}#台`,
      stepno: kua,
    });
  }
  return setInx(_data);
};

// 伸缩缝
const getShensuofeng = (name, values, code, kua) => {
  const len = parseInt(values.b300002num || '0', 10);
  const _data = [];
  for (let inx = 1; inx <= len; inx++) {
    _data.push({
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: `${inx}#伸缩缝`,
      stepno: -1,
    });
  }
  return setInx(_data);
};

// 桥面
const getQiaomian = (name, values, code, kua) => {
  const len = parseInt(kua || '0', 10);
  const _data = [];
  if (len !== 0) {
    for (let inx = 1; inx <= len; inx++) {
      _data.push({
        position: code.pCode,
        membertype: code[name],
        memberid: uuid.v4(),
        membername: `${inx}#跨`,
        stepno: inx,
      });
    }
  }
  return setInx(_data);
};

// 人行道
const getRenxingdao = (name, values, code, kua) => {
  const len = parseInt(kua || '0', 10);
  const renxingdao = parseInt(values.b300003num || '0', 10);
  const _data = [];
  if (len !== 0) {
    if (renxingdao === 1) {
      for (let inx = 1; inx <= len; inx++) {
        _data.push({
          position: code.pCode,
          membertype: code[name],
          memberid: uuid.v4(),
          membername: `${inx}#跨`,
          stepno: inx,
        });
      }
    } else if (renxingdao > 1) {
      for (let inx = 1; inx <= len; inx++) {
        _data.push({
          position: code.pCode,
          membertype: code[name],
          memberid: uuid.v4(),
          membername: `左侧${inx}#跨`,
          stepno: inx,
        });
      }
      for (let inx = 1; inx <= len; inx++) {
        _data.push({
          position: code.pCode,
          membertype: code[name],
          memberid: uuid.v4(),
          membername: `右侧${inx}#跨`,
          stepno: inx,
        });
      }
    }
  }
  return setInx(_data);
};

// 栏杆
const getLanGan = (name, values, code, kua) => {
  const len = parseInt(kua || '0', 10);
  const _data = [];
  for (let inx = 1; inx <= len; inx++) {
    _data.push({
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: `左侧${inx}#跨`,
      stepno: inx,
    });
  }
  for (let inx = 1; inx <= len; inx++) {
    _data.push({
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: `右侧${inx}#跨`,
      stepno: inx,
    });
  }
  return setInx(_data);
};

// 排水
const getPaishui = (name, values, code, kua) => {
  return setInx([
    {
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: '排水系统',
      stepno: -1,
      orderdesc: 10,
    },
  ]);
};

// 照明
const getbridgelightsys = (name, values, code, kua) => {
  const qiaotai = parseInt(values.b200001num || '0', 10);
  const _data = [];
  _data.push({
    position: code.pCode,
    membertype: code[name],
    memberid: uuid.v4(),
    membername: '0#台桥头',
    stepno: 1,
  });
  if (qiaotai > 0) {
    _data.push({
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: `${kua}#台桥头`,
      stepno: kua,
    });
  }
  if (values.bridgelightsys !== 'light10') {
    _data.push({
      position: code.pCode,
      membertype: code[name],
      memberid: uuid.v4(),
      membername: '照明系统',
      stepno: -1,
    });
  }
  return setInx(_data);
};

export default {
  // 上部结构
  b100001: getZhuliangAndGuanliang,
  b100006: getZhuliangAndGuanliang,
  b100007: getFeng,
  b100003: getFeng,
  b100005: getFeng,
  b100002: getHenggeban,
  b100004: getZhizuo,
  // 下部结构
  b200004: getYiQiang,
  b200005: getZhuipoAndHupo,
  b200002: getQiaodun,
  b200001: getQiaotai,
  b200003: getDuntai,
  b200006: getHechuang,
  b200007: getTiaozhi,
  // 桥面系
  b300001: getQiaomian,
  b300002: getShensuofeng,
  b300003: getRenxingdao,
  b300004: getLanGan,
  b300005: getPaishui,
  b300006: getbridgelightsys,
};
