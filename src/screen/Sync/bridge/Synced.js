// 已上传表格
import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {View, FlatList, StyleSheet} from 'react-native';
import Table from '../../../components/Table';
import Checkbox from '../../../components/Checkbox';
import {Content} from '../../../components/CommonView';
import {Context} from '../Provider';
import {Context as GlobalContext} from '../../../providers/GlobalProvider';
import {Context as ThemeContext} from '../../../providers/ThemeProvider';
import {listToPage} from '../../../utils/common';

export default function Synced({list, onUpload}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: {bridgeside},
  } = React.useContext(GlobalContext);

  const {
    state: {bridgeUploadingIds},
  } = React.useContext(Context);

  const [tableData, setTableData] = React.useState([]);

  const [tablePageNo, setTablePageNo] = React.useState(1);

  const [nowEdit, setNowEdit] = React.useState(new Set());

  React.useEffect(() => {
    // setNowEdit(new Set());
    setTableData(listToPage(list, 10));
  }, [list]);

  const handleEdit = item => {
    const _nowEdit = new Set([...nowEdit]);
    if (_nowEdit.has(item.id)) {
      _nowEdit.delete(item.id);
    } else {
      _nowEdit.add(item.id);
    }
    setNowEdit(_nowEdit);
  };

  const handleUpload = () => {
    onUpload && onUpload(nowEdit);
    setNowEdit(new Set());
  };

  const handleAll = () => {
    onUpload && onUpload(list.map(({id}) => id));
    setNowEdit(new Set());
  };

  return (
    <Content
      operations={[
        {
          name: 'cloud-upload',
          disabled: bridgeUploadingIds.length,
          onPress: handleUpload,
        },
        {
          name: 'table-arrow-up',
          disabled: bridgeUploadingIds.length,
          onPress: handleAll,
        },
      ]}>
      <View style={[styles.card, theme.primaryBgStyle]}>
        <Table.Box>
          <Table.Header>
            <Table.Title title="选择" flex={1} />
            <Table.Title title="序号" flex={1} />
            <Table.Title title="桥梁名称" flex={3} />
            <Table.Title title="桩号" flex={3} />
            <Table.Title title="桥幅属性" flex={2} />
            <Table.Title title="上传时间" flex={3} />
          </Table.Header>
          <FlatList
            extraData={tableData}
            data={tableData[tablePageNo - 1] || []}
            renderItem={({item, index}) => (
              <Table.Row key={index}>
                <Table.Cell flex={1} onPress={() => handleEdit(item)}>
                  <Checkbox
                    onPress={() => handleEdit(item)}
                    checked={nowEdit.has(item.id)}
                  />
                </Table.Cell>
                <Table.Cell flex={1}>{index + 1}</Table.Cell>
                <Table.Cell flex={3}>{item.bridgename}</Table.Cell>
                <Table.Cell flex={3}>{item.bridgestation}</Table.Cell>
                <Table.Cell flex={2}>
                  {
                    bridgeside?.find(it => it.paramid === item.bridgeside)
                      .paramname
                  }
                </Table.Cell>
                <Table.Cell flex={3}>{item.upload_date}</Table.Cell>
              </Table.Row>
            )}
          />
        </Table.Box>
        <Table.Pagination
          pageNo={tablePageNo} //页码数字的背景色
          onPageChange={setTablePageNo}
          numberOfPages={tableData.length}
        />
      </View>
    </Content>
  );
}

const styles = StyleSheet.create({
  tab: {
    ...tailwind.flexRow,
    ...tailwind.justifyStart,
    ...tailwind.pX16,
    ...tailwind.mB2,
  },
  card: {
    ...tailwind.flex1,
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
    ...tailwind.p2,
  },
});
