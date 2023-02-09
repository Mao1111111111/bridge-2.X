/*
    构件打分算法
    文档：https://jldandroid.yuque.com/staff-gng0zp/ee6qgq/ern9n1
*/

/*
const pt = (scoreList) => {
    if (!Array.isArray(scoreList)) return 0
    console.log("输入", scoreList.sort((c, p) => c - p).reverse());
    const u = new Array(scoreList.length);
    const u1 = scoreList[0];
    u[0] = u1;
    const u2 = parseFloat(((100 - u1) * scoreList[1] / 100 / Math.sqrt(2)).toFixed(3));
    u[1] = u2;
    const u3 = parseFloat(((100 - u1 - u2) * scoreList[2] / 100 / Math.sqrt(3)).toFixed(3));
    u[2] = u3;
    const u4 = parseFloat(((100 - u1 - u2 - u3) * scoreList[3] / 100 / Math.sqrt(4)).toFixed(3));
    u[3] = u4;
    const u5 = parseFloat(((100 - u1 - u2 - u3 - u4) * scoreList[4] / 100 / Math.sqrt(5)).toFixed(3));
    u[4] = u5;
    return u;
}
console.log("输出", pt([45, 40, 35, 20, 25]));
*/

export const score = scoreList => {
  if (!Array.isArray(scoreList)) {
    return [];
  }
  console.log('输入', scoreList);
  console.log('排序', scoreList.sort((c, p) => c - p).reverse());
  let rrr = [];
  const loop = (list, index, result) => {
    if (index === list.length) {
      rrr = result.slice();
      return;
    }
    const right = uList => 100 - uList.reduce((a, c) => a + c);
    const left = (dpn, i) => dpn / 100 / Math.sqrt(i + 1);
    result[index] = parseFloat(
      (left(list[index] || 0, index) * right(result || [0])).toFixed(3),
    );
    loop(list, index + 1, result);
  };
  loop(scoreList.sort((c, p) => c - p).reverse(), 0, [0]);
  return rrr;
};

// 按JTG/T H21-2011 规范表4.1.1 构件各检测指标扣分值
export const numeric = standardscale => {
  switch (standardscale) {
    case '3':
      return {1: 0, 2: 20, 3: 35};
    case '4':
      return {1: 0, 2: 25, 3: 40, 4: 50};
    case '5':
      return {1: 0, 2: 35, 3: 45, 4: 60, 5: 100};
    default:
      return {};
  }
};

//测试
/*
const r = score([45, 40, 35, 20, 25]);
console.log("结果[]", r);
console.log("结果", parseFloat((100 - r.reduce((a, c) => a + c)).toFixed(3)));
*/
