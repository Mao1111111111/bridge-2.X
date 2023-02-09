import React from 'react';
import Table from '../../../../components/Table';
import {tailwind} from 'react-native-tailwindcss';
import {View, Text, FlatList} from 'react-native';

export default function LogList({list}) {
  return (
    <View style={[tailwind.flex1, tailwind.p2]}>
      <Text style={[tailwind.fontBold, tailwind.mB2,{color:'#2b427d'}]}>
        操作历史
      </Text>
      <View
        style={[
          tailwind.flex1,
          tailwind.mB1,
          tailwind.borderGray400,
          tailwind.border,
        ]}>
        <Table.Header>
          <Table.Title title="对象" flex={1} />
          <Table.Title title="操作" flex={1} />
        </Table.Header>
        <View style={tailwind.flex1}>
          <FlatList
            data={list}
            extraData={list}
            style={tailwind.flex1}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <Table.Row key={index}>
                <Table.Cell flex={1}>{item.title}</Table.Cell>
                <Table.Cell flex={1}>{item.page_key}</Table.Cell>
              </Table.Row>
            )}
          />
        </View>
      </View>
    </View>
  );
}
