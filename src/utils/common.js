export function listToGroup(list, key) {
  const group = {};
  list?.forEach(item => {
    if (!group[item[key]]) {
      group[item[key]] = [];
    }
    group[item[key]].push(item);
  });
  return group;
}

export function groupToList(group) {
  const list = [];
  groupEach(group, item => {
    list.push(...item);
  });
  return list;
}

export function groupEach(group, callback) {
  Object.keys(group).forEach(key => {
    callback(key, group[key]);
  });
}

export function groupMap(group, callback) {
  const result = [];
  Object.keys(group).map(key => {
    result.push(callback(key, group[key]));
  });
  return result;
}

export function listToPage(list, pageRow) {
  const pageNum = Math.ceil(list.length / pageRow);
  const pageData = [];
  if (list.length > 0) {
    for (let inx = 0; inx < pageNum; inx++) {
      pageData.push(list.slice(inx * pageRow, (inx + 1) * pageRow));
    }
  }
  return pageData;
}

export async function loop(list, callback) {
  const fun = async inx => {
    if (list.length === inx) {
      return;
    }
    await callback(list[inx], inx);
    await fun(inx + 1);
  };
  await fun(0);
}
