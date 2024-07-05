import React,{useState,useEffect} from 'react';
import Table from '../../../../components/Table';
import {tailwind} from 'react-native-tailwindcss';
import {View, Text, FlatList} from 'react-native';

export default function LogList({list}) {

  const [coopData,setCoopData] = useState([])

  useEffect(()=>{
    console.log('操作历史的组件内容');
    if(!coopData.length){
      let data = [
        {
          realName:'张三',
          menberName:'1-2#',
          time:'2024-7-5 10:06',
          diseaseName:'混凝土裂缝'
        },
        {
          realName:'张四',
          menberName:'1-1#',
          time:'2024-7-5 10:36',
          diseaseName:'混凝土破损'
        },
        {
          realName:'张三',
          menberName:'1-3#',
          time:'2024-7-5 10:09',
          diseaseName:'混凝土渗水'
        },
        {
          realName:'李一',
          menberName:'1-2#',
          time:'2024-7-5 10:02',
          diseaseName:'混凝土刮伤'
        },
        {
          realName:'张三',
          menberName:'1-1#',
          time:'2024-7-6 13:06',
          diseaseName:'底板裂缝'
        },
        {
          realName:'李五',
          menberName:'1-4#',
          time:'2024-7-5 19:50',
          diseaseName:'混凝土破损'
        },
        {
          realName:'张三',
          menberName:'3-1#',
          time:'2024-7-8 16:10',
          diseaseName:'钢结构锈蚀'
        },
        {
          realName:'张三',
          menberName:'3-1#',
          time:'2024-7-12 10:05',
          diseaseName:'钢结构锈蚀'
        },
        {
          realName:'张三',
          menberName:'3-1#',
          time:'2024-7-7 12:10',
          diseaseName:'钢结构锈蚀'
        },
        {
          realName:'张三',
          menberName:'3-1#',
          time:'2024-7-10 11:00',
          diseaseName:'钢结构锈蚀'
        },
        {
          realName:'张三',
          menberName:'3-1#',
          time:'2024-7-8 16:01',
          diseaseName:'钢结构锈蚀'
        },
        {
          realName:'张三',
          menberName:'3-1#',
          time:'2024-7-8 16:19',
          diseaseName:'钢结构锈蚀'
        },
        {
          realName:'张三',
          menberName:'3-1#',
          time:'2024-7-8 16:10',
          diseaseName:'钢结构锈蚀'
        },
      ]
      data.sort((a, b) => {
        return new Date(a.time) - new Date(b.time);
      });
  
      setCoopData(data);
    }
    console.log('coopData',coopData);
  },[coopData])

  return (
    <View style={[tailwind.flex1, tailwind.p2]}>
      {
        coopData?.length ? 
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
                data={coopData}
                extraData={coopData}
                style={[tailwind.flex1]}
                keyExtractor={(item,index) => index}
                renderItem={({item, index}) => (
                  <Table.Row key={index}>
                    <Table.Cell flex={1}>
                      <Text style={{textAlign:'left'}}>{`${item.realName}\n${item.menberName}\n${item.diseaseName}`}</Text>
                    </Table.Cell>
                    <Table.Cell flex={1}>
                      <Text>{item.time}</Text>
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
