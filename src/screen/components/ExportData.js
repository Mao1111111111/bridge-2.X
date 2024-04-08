/* 
    导出数据
 */
import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native'
import {tailwind} from 'react-native-tailwindcss'
import Table from '../../components/Table'

export default function ExportData() {
  // 表格loading
  const [tableLoading,setTableLoading] = useState(false)
  // 共几页
  const [pageTotal,setPageTotal] = useState(0)
  // 共几条
  const [total,setTotal] = useState(0)
  // 当前页
  const [page, setPage] = React.useState()
  // 表格数据
  const [tableData, setTableData] = React.useState([]);


  return (
    <View style={styles.box}>
      <View style={[styles.titleBox]}>
            <Text>{'    '}</Text>
            <Image style={{ height: 20, width: 5, alignItems: 'center' }}
              source={require('../../iconImg/shuxian.png')}/>
            <Text>{'  '}</Text>
            <Text style={[
              {
                fontSize:14,
                color:'#2b427d',
                fontWeight:'bold'
              }
            ]}>程序调试</Text>
        </View>
        <View style={styles.btnBox}>
          <TouchableHighlight style={styles.exportDataBtn}>
            <Text style={styles.btnFont}>导出数据</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.tableBox}>
          <Table.Box loading={tableLoading}>
              <Table.Header>
                <Table.Title title="序号" flex={0.7} />
                <Table.Title title="桩号" flex={2} />
                <Table.Title title="桥梁名称" flex={3} />
                <Table.Title title="桥幅" flex={1} />
                <Table.Title title="所属本地项目" flex={3} />
                <Table.Title title="上传时间" flex={2} />
                <Table.Title title="选择" flex={1} />
              </Table.Header>
              {/* <FlatList
                extraData={tableData}
                data={tableData[tablePageNo - 1] || []}
                renderItem={({item, index}) => (
                  <Table.Row key={index} onPress={() => handleEdit(item)}>
                    <Table.Cell flex={1}>
                      <Checkbox
                        onPress={() => handleEdit(item)}
                        checked={nowEdit.has(item.id)}
                      />
                    </Table.Cell>
                    <Table.Cell flex={2}>{item.bridgestation}</Table.Cell>
                    <Table.Cell flex={2}>{item.bridgename}</Table.Cell>
                    <Table.Cell flex={2}>
                      {
                        bridgeside?.find(it => it.paramid === item.bridgeside)
                          .paramname
                      }
                    </Table.Cell>
                    <Table.Cell flex={2}>{item.projectname}</Table.Cell>
                    <Table.Cell flex={3}>{item.upload_date}</Table.Cell>
                  </Table.Row>
                )}
              /> */}
            </Table.Box>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box:{
    width:'100%',
    height:'100%',
    marginLeft:-20,
    marginTop:10
  },
  titleBox:{
    flexDirection:'row',
    marginTop:8
  },
  btnBox:{
    
  },
  exportDataBtn:{
    width:100,
    height:25,
    top:5,
    left:5,
    backgroundColor:'#2b427d',
    borderRadius:3,
    alignItems:'center',
    justifyContent:'center'
  },
  btnFont:{
    color:'white'
  },
  tableBox:{
    // backgroundColor:'red',
    top:10,
    bottom:10,
    flex:1
  }
})
