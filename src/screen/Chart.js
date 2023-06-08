import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import DeviceInfo from 'react-native-device-info';
import {View, Text, StyleSheet, ImageBackground,Dimensions} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import fs from '../utils/fs';
import Headerbar from '../components/Headerbar';
import * as bridge from '../database/bridge';
import * as uploadLog from '../database/upload_log';
import * as bridgeReportFile from '../database/bridge_report_file';
import * as bridgeReport from '../database/bridge_report';
import * as media from '../database/bridge_report_member_checkstatus_media';

import {Context as ThemeContext} from '../providers/ThemeProvider';

export default function Chart() {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [disk, setDisk] = React.useState(0);

  const [file, setFile] = React.useState(0);

  const [dbSize, setDbSize] = React.useState(0);

  const [mediaSize, setMediaSize] = React.useState(0);

  const [localBridge, setLocalBridge] = React.useState(0);

  const [cloudBridge, setCloudBridge] = React.useState(0);

  const [reportBridge, setReportBridge] = React.useState(0);

  const [uploadBridge, setUploadBridge] = React.useState(0);

  const [uploadFile, setUploadFile] = React.useState(0);

  const [screenWidth,setScreenWidth] = React.useState() //屏幕宽度

  React.useEffect(() => {
    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const getGB = size => ((size || 0) / 1024 / 1024 / 1024).toFixed(2);
      DeviceInfo.getFreeDiskStorage().then(res => setDisk(getGB(res)));
      (async () => {
        const res = await media.fileDisk();
        const fileInfo = await fs.getFileInfo(
          '/data/data/com.jianlide/databases/jianlide-sql.db',
        );
        setMediaSize(getGB(res.fileDisk));
        setDbSize(getGB(fileInfo.size));
        setFile(getGB((fileInfo.size || 0) + (res.fileDisk || 0)));
      })();
      bridge.cloudnum().then(res => setCloudBridge(res?.num || 0));
      bridge.localnum().then(res => setLocalBridge(res?.num || 0));
      bridgeReport.total(res => {
        setReportBridge(new Set(res.map(({bridgeid}) => bridgeid)).size);
      });
      uploadLog.total().then(res => {
        setUploadBridge(new Set(res.map(({dataid}) => dataid)).size);
      });
      bridgeReportFile.total().then(res => {
        setUploadFile(getGB(res.filesize));
      });
    }, []),
  );

  return (
    <View style={
      screenWidth > 830 ? [tailwind.flex1]
      :
      [{backgroundColor:'rgba(255,255,255,1)',right:19,width:715,top:1,borderRadius:5,marginTop:20}]
    }>
      <ImageBackground
        style={
          [
            tailwind.mY8,
            // tailwind.mX18,
            {
              position:'absolute',
              left:70,
              width:713,
              height:466
            }
          ]
        }
      >
        <View style={[
          tailwind.mY1,
          tailwind.mX2,
          {
          width:700
          }
        ]}>
          <Headerbar items={[{name: '数据统计'}]} />
        </View>

        {/* 桥梁检测情况统计 */}
        <ImageBackground source={require('../iconImg/bridgeMainBg.png')}
          style={
            [
              // tailwind.mY1,
              tailwind.mX3,
              {
                position:'absolute',
                top:45,
                width:340,
                height:397
              }
            ]
          }
        >
          {/* 创建桥梁 */}
          <ImageBackground source={require('../iconImg/createBridge.png')}
            style={
              [
                // tailwind.mY5,
                tailwind.mX2,
                {
                  position:'absolute',
                  top:48,
                  width:326,
                  height: 62
                }
              ]
            }
          >
            <Text style={styles.LrightText}>
              {localBridge}
            </Text>
          </ImageBackground>
          {/* 检测桥梁 */}
          <ImageBackground source={require('../iconImg/checkBridge.png')}
            style={
              [
                // tailwind.mY5,
                tailwind.mX2,
                {
                  position:'absolute',
                  top:116,
                  width:326,
                  height: 62
                }
              ]
            }
          >
            <Text style={styles.LleftText}>
              {reportBridge}
            </Text>
          </ImageBackground>
          {/* 导入桥梁 */}
          <ImageBackground source={require('../iconImg/exportBridge.png')}
            style={
              [
                // tailwind.mY5,
                tailwind.mX2,
                {
                  position:'absolute',
                  top:184,
                  width:326,
                  height: 62
                }
              ]
            }
          >
            <Text style={styles.LrightText}>
              {cloudBridge}
            </Text>
          </ImageBackground>
          {/* 数据文件 */}
          <ImageBackground source={require('../iconImg/dataBridge.png')}
            style={
              [
                // tailwind.mY5,
                tailwind.mX2,
                {
                  position:'absolute',
                  top:252,
                  width:326,
                  height: 62
                }
              ]
            }
          >
            <Text style={styles.LleftText}>
              {dbSize}
            </Text>
          </ImageBackground>
          {/* 媒体文件 */}
          <ImageBackground source={require('../iconImg/mediaBridge.png')}
            style={
              [
                // tailwind.mY5,
                tailwind.mX2,
                {
                  position:'absolute',
                  top:320,
                  width:326,
                  height: 62
                }
              ]
            }
          >
            <Text style={styles.LrightText}>
              {mediaSize}
            </Text>
          </ImageBackground>
        </ImageBackground>

        {/* 数据同步情况统计 */}
        <ImageBackground source={require('../iconImg/dataMainBg.png')}
          style={
            [
              // tailwind.mY1,
              // tailwind.mX3,
              {
                position:'absolute',
                right:5,
                top:45,
                width:340,
                height:197
              }
            ]
          }
        >
          <View style={styles.rightViewLeft}>
            {/* 同步检测桥梁 */}
            <Text style={styles.rightText}>{uploadBridge}</Text>
          </View>
          <View style={styles.rightViewRight}>
            {/* 同步媒体文件 */}
            <Text style={styles.rightText}>{uploadFile}</Text>
          </View>
          
        </ImageBackground>

        {/* 软件使用情况统计 */}
        <ImageBackground source={require('../iconImg/softwareMainBg.png')}
          style={
            [
              // tailwind.mY1,
              // tailwind.mX3,
              {
                position:'absolute',
                right:5,
                bottom:24,
                width:340,
                height:197
              }
            ]
          }
        >
          <View style={styles.rightViewLeft}>
            {/* 已使用空间 */}
            <Text style={styles.rightText}>{file}</Text>
          </View>
          <View style={styles.rightViewRight}>
            {/* 设备剩余空间 */}
            <Text style={styles.rightText}>{disk}</Text>
          </View>
        </ImageBackground>
      </ImageBackground>
      
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...tailwind.mY2,
    ...tailwind.mX4,
    ...tailwind.p4,
    ...tailwind.rounded,
    ...tailwind.shadow2xl,
  },
  flex2: {
    flex: 2,
  },
  title: {
    ...tailwind.textXl,
    ...tailwind.fontBold,
  },
  row: {
    ...tailwind.flexRow,
    ...tailwind.mT2,
    ...tailwind.justifyBetween,
  },
  // 左侧 - 靠左的文字
  LleftText: {
    position:'absolute',
    right: 255,
    bottom: 17,
    fontSize:26,
    color:'#233970',
    textAlign:'right',
    fontWeight:'bold'
  },
  // 左侧 - 靠右的文字
  LrightText: {
    position:'absolute',
    right: 50,
    bottom: 17,
    fontSize:26,
    color:'#233970',
    textAlign:'left',
    fontWeight:'bold'
  },
  // 右侧所有文字的样式
  rightText: {
    fontSize:26,
    color:'#233970',
    fontWeight:'bold'
  },
  // 右侧 - 靠左的文字位置
  rightViewLeft: {
    position:'absolute',
    top: 125,
    right: 210
  },
  // 右侧 - 靠右的文字位置
  rightViewRight: {
    position:'absolute',
    top: 125,
    right: 42
  }
});
