import React,{useState,useEffect} from 'react';
import Table from '../../../../components/Table';
import {tailwind} from 'react-native-tailwindcss';
import {View, Text, FlatList} from 'react-native';

export default function LogList({list,coopList}) {

  // const [coopData,setCoopData] = useState([])

  // useEffect(()=>{
  //   console.log('操作历史的组件内容');
  //   if(!coopData.length){
  //     if(coopList){
  //       const dataArr = coopList
  //       dataArr.sort((a, b) => {
  //         return new Date(b.checkTime) - new Date(a.checkTime);
  //       });
  //       setCoopData(dataArr);
  //     }
  //   }
  //   console.log('coopData',coopData);
  // },[coopData])

  return (
    <View style={[tailwind.flex1, tailwind.p2]}>
      {
        coopList?.length ? 
        <>
          <Text style={[tailwind.fontBold, tailwind.mB2,{color:'#2b427d'}]}>
            协同检测操作记录
          </Text>
          <View
            style={[
              tailwind.flex1,
              tailwind.mB1,
              tailwind.borderGray400,
              tailwind.border,
            ]}>
            <Table.Header>
              <Table.Title title="操作" flex={1} />
              <Table.Title title="时间" flex={1} />
            </Table.Header>
            <View style={tailwind.flex1}>
              <FlatList
                data={coopList}
                extraData={coopList}
                style={[tailwind.flex1]}
                keyExtractor={(item,index) => index}
                renderItem={({item, index}) => (
                  <Table.Row key={index}>
                    <Table.Cell flex={1}>
                      <Text style={{textAlign:'left'}}>{`${item.user}\n${item.membername}\n${item.diseaseName}`}</Text>
                    </Table.Cell>
                    <Table.Cell flex={1}>
                      <Text>{item.checkTime}</Text>
                    </Table.Cell>
                  </Table.Row>
                )}
              />
            </View>
          </View>
        </> 
        : 
        <>
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
        </>
      }
    </View>
  );
}
