import React, { useState } from 'react';
import {View, StyleSheet, FlatList,Dimensions,Text,ImageBackground} from 'react-native';
import {tailwind} from 'react-native-tailwindcss';
import Table from '../../../components/Table';
import Checkbox from '../../../components/Checkbox';
import {Content} from '../../../components/CommonView';
import {Context as ThemeContext} from '../../../providers/ThemeProvider';
import {Context as GlobalContext} from '../../../providers/GlobalProvider';
import {Context} from '../Provider';
import {listToPage} from '../../../utils/common';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Select from '../../../components/Select';
import * as createData from '../createData';
import fs from '../../../utils/fs';
import RNFS from 'react-native-fs';

export default function Synced({list, onUpload}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: {bridgeside,basememberinfo},
  } = React.useContext(GlobalContext);

  const {
    state: {testDataUploadingIds},
  } = React.useContext(Context);

  const [tableData, setTableData] = React.useState([]);

  const [tablePageNo, setTablePageNo] = React.useState(1);

  const [nowEdit, setNowEdit] = React.useState(new Set());

  const [screenWidth,setScreenWidth] = React.useState(0) //屏幕宽度

  // 表格loading 
  const [loading,setLoading] = React.useState(false);

  // 模态框
  // 是否显示
  const [modalVisible,setModalVisible] = useState(false)
  // 模态框类型-- select-选择批量上传方式、project-项目上传 
  const [uploadType,setUploadType] = useState('select')
  // 项目分组数据
  const [projectGruop,setProjectGruop] = useState([])
  // 当前选中的项目
  const [curProject,setCurProject] = useState([])

  React.useEffect(() => {
    setNowEdit(new Set());
    list.sort(function(a, b) {
      return new Date(b.c_date) - new Date(a.c_date);
    })
    setTableData(listToPage(list, 10));
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
    // 按项目处理数据
    projectDeal()
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
  };

  // 点击批量上传按钮
  const handleAll = () => {
    // 设置模态框类型
    setUploadType('select')
    // 打开批量上传的模态框
    setModalVisible(true)
  };

  // 点击全部上传
  const allUploadBtn = () => {
    // 关闭模态框
    setModalVisible(false)
    // 全部上传
    onUpload && onUpload(list.map(({id}) => id));
    setNowEdit(new Set());
  }

  // 点击项目上传
  const projectUploadBtn = () => {
    // 设置模态框类型
    setUploadType('project')
  }

  // 项目数据分组
  const projectDeal = () => {
    // 以项目分组
    let projectList = []
    list.forEach(item=>{
      // 项目列表中是否存在这个项目
      let existIndex = projectList.findIndex(i=>i.projectname==item.projectname)
      if(existIndex==-1){
        // 不存在
        projectList.push({
          projectname:item.projectname,
          list:[item]
        })
      }else{
        // 存在
        projectList[existIndex].list.push(item)
      }
    })
    // 设置项目组数据
    setProjectGruop(projectList)
  }

  // 项目变化时
  const projectChange = ({value}) => {
    // 设置当前选中
    setCurProject(value)
  }

  // 确定按项目上传
  const projectUploadOk = () => {
    // 关闭模态框
    setModalVisible(false)
    // 按项目上传
    onUpload && onUpload(curProject.map(({id}) => id));
    setNowEdit(new Set());
  }

  // -----模态框------
  
  // 模态框点击关闭
  const modalClose = () => {
    setModalVisible(false)
  }

  // 导出数据到本地
  const exportData =async () => {
    try{
      setLoading(true)
      let nowEditList = Array.from(new Set([...nowEdit]))
      // 获取数据
      for(let i=0;i<nowEditList.length;i++){
        let allData = await createData.getData(
          nowEditList[i],
          null,
          null,
          null,
          basememberinfo
        )
        let bridgesideKV = {
          side111:'单幅',
          side100:'左幅',
          side001:'右幅',
          side010:'中幅',
          side200:'上行',
          side002:'下行',
          side999:'其他'
        }
        // 创建文件夹
        let bridgeside = bridgesideKV[allData.data.bridgeside]
        let folderPath = RNFS.ExternalStorageDirectoryPath + '/jianlide-data/exportData/'+allData.data.testData.projectname+'/'+allData.data.bridgename+'/'+bridgeside
        let imgFolderPath = folderPath + '/image'
        await fs.mkdir(imgFolderPath);
        // ----图片处理
        // 图片日志
        let imgLog = {
          // 图片总数
          imgTotal:allData.mediaData.length,
          // 存在图片数
          isExistNum:0,
          // 存在图片列表
          isExistList:[],
          // 不存在图片数
          inexistenceNum:0,
          // 不存在图片列表
          inexistenceList:[],
          // 导出成功数据
          exportSuccessNum:0,
          // 导出成功列表
          exportSuccessList:[],
          // 导出失败数
          exportFailNum:0,
          // 导出失败列表
          exportFailList:[]
        }
        // 判断图片是否存在
        if(allData.mediaData.length>0){
          let mediaData = allData.mediaData
          // 图片列表遍历
          for(let imgInx=0;imgInx<mediaData.length;imgInx++){
            // 图片对象
            let imgObj = mediaData[imgInx]
            //imgObj.appliedPath = "/data/user/0/com.jianlide/files/589a68eb-c40d-4194-aae5-73d05e4a452e1.jpg"
            // 图片是否存在
            let imgFileExist = await fs.fileExist(imgObj.appliedPath)
            if(imgFileExist){
              // 图片存在
              imgLog.isExistNum += 1 
              imgLog.isExistList.push(imgObj)
              // --图片导出
              try{
                await fs.copyFile(
                  imgObj.appliedPath,
                  imgFolderPath+'/'+imgObj.pathName,
                )
                imgLog.exportSuccessNum += 1 
                imgLog.exportSuccessList.push(imgObj)
              }catch(e){
                imgLog.exportFailNum += 1 
                imgLog.exportFailList.push({
                  ...imgObj,
                  exportErr:e
                })
              }
            }else{
              // 图片不存在
              imgLog.inexistenceNum += 1 
              imgLog.inexistenceList.push(imgObj)
            }
          }
        }
        try{
          // 将桥梁数据写入
          await fs.write(
            folderPath+'/allData.json',
            JSON.stringify(allData),
            'utf8',
          );
          // 将图片导出日志写入
          await fs.write(
            folderPath+'/imgLog.json',
            JSON.stringify(imgLog),
            'utf8',
          );
        }catch(e){
          alert('导出失败'+e);
        }
      }
      alert('导出成功');
      setLoading(false)
    }catch(e){
      console.log('导出数据到本地',e);
      alert('导出失败'+e);
      setLoading(false)
    }
  }

  return (
    <Content
      operations={[
        {
          // name: 'cloud-upload',
          img:'singleUpload',
          disabled: testDataUploadingIds.length,
          onPress: handleUpload,
        },
        {
          // name: 'table-arrow-up',
          img:'maintainPlan',
          disabled: testDataUploadingIds.length,
          onPress: exportData,
        },
        {
          // name: 'table-arrow-up',
          img:'allUpload',
          disabled: testDataUploadingIds.length,
          onPress: handleAll,
        },
        {
          name: 'cloud-upload',
          disabled: testDataUploadingIds.length,
          onPress: handleUpload,
        },
        {
          name: 'table-arrow-up',
          disabled: testDataUploadingIds.length,
          onPress: handleAll,
        },
      ]}>
      <ImageBackground source={require('../../../iconImg/tableBg.png')}
          style={{width:screenWidth*0.758,height:screenWidth*0.758*0.48297,padding:'0.5%'}}>
        <Table.Box loading={loading}>
          <Table.Header>
            <Table.Title title="选择" flex={1} />
            <Table.Title title="桩号" flex={2} />
            <Table.Title title="桥梁名称" flex={2} />
            <Table.Title title="桥幅" flex={2} />
            <Table.Title title="所属本地项目" flex={2} />
            <Table.Title title="上传时间" flex={3} />
          </Table.Header>
          <FlatList
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
          />
        </Table.Box>
        <Table.Pagination
          pageNo={tablePageNo}
          onPageChange={setTablePageNo}
          numberOfPages={tableData.length}
        />
      </ImageBackground>
      <Modal
        visible={modalVisible}
        title='批量上传'
        showHead={true}
        width={400}
        height={220}
        onClose={modalClose}>
        {
          uploadType=='select'&&
          <View style={[styles.modalView]}>
            <Text>请选择批量上传模式：</Text>
            <Button style={[styles.modalSelectBtn]} onPress={allUploadBtn}>全部上传</Button>
            <Button style={[styles.modalSelectBtn]} onPress={projectUploadBtn}>项目上传</Button>
          </View>
        }
        {
          uploadType=='project'&&
          <View style={[styles.modalView]}>
            <Text>请选择要上传的项目：</Text>
            <Select
              label='项目'
              labelName="projectname"
              valueName="list"
              values={projectGruop}
              value={curProject}
              onChange={projectChange}
              style={[styles.modalSelect]}
              inputStyle={{height:35,width:20}}
              />
              <Button style={[styles.modalSelectBtn,styles.modalProjectOkBtn]} onPress={projectUploadOk}>确定上传</Button>
          </View>
        }
      </Modal>
    </Content>
  );
}

const styles = StyleSheet.create({
  card: {
    ...tailwind.flex1,
    ...tailwind.pY2,
    ...tailwind.pX2,
    ...tailwind.rounded,
    ...tailwind.shadow2xl,
  },
  modalView:{
    paddingHorizontal:10
  },
  modalSelectBtn:{
    backgroundColor:'#2b427d',
    marginTop:20
  },
  modalSelect:{
    marginTop:10
  },
  modalProjectOkBtn:{
    marginTop:30
  }
});
