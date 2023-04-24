import React from 'react';
import _ from 'lodash';
import {Portal} from 'react-native-paper';
import uuid from 'react-native-uuid';
import {tailwind} from 'react-native-tailwindcss';
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Context} from './Provider';
import {Context as ThemeContext} from '../../../../providers/ThemeProvider';
import {TextInput, Textarea, WriteInput} from '../../../../components/Input';
import VideoPlayer from '../../../../components/VideoPlayer';
import {CircleButton} from '../../../../components/Button';
import {Content} from '../../../../components/CommonView';
import LabelItem from '../../../../components/LabelItem';
import {Player} from '../../../../components/Audio';
import Select from '../../../../components/Select';
import Sketch from '../../../../components/Sketch';
import Tabs from '../../../../components/Tabs';
import fs from '../../../../utils/fs';
import MediaBar from './MediaBar';
import Modal from "react-native-modal"
import { CascadePicker } from "react-native-slidepicker";

const MediaComponent = ({file}) => {
  const {dispatch} = React.useContext(Context);

  const handleSave = e => {
    const copypath = `${fs.dir}/${uuid.v4()}.jpg`;
    fs.write(copypath, e, 'base64');
    const _file = {...file, copypath};
    dispatch({
      type: 'cacheFileData',
      payload: {
        ..._file,
        isUpdate: true,
      },
    });
  };

  return (
    <View style={styles.mediaComponent}>
      {file?.mediatype === 'image' ? (
        file?.is_source === 1 ? (
          <Image
            style={styles.img}
            source={{uri: 'file://' + file?.filepath}}
          />
        ) : (
          <View style={styles.img}>
            <Sketch
              maxHeight={styles.img.height - 32}
              maxWidth={styles.img.width - 32}
              id={file.id}
              onSave={handleSave}
              source={file.copypath || file?.filepath}
            />
          </View>
        )
      ) : (
        <></>
      )}
      {file?.mediatype === 'virtualimage' ? (
        <View
          style={[
            tailwind.flex1,
            tailwind.justifyCenter,
            tailwind.itemsCenter,
          ]}>
          <Text style={[styles.externalImg]}>{file?.filepath}</Text>
        </View>
      ) : (
        <></>
      )}
      {file?.mediatype === 'video' ? (
        <VideoPlayer video={file?.filepath} width={480} height={270} top={0} />
      ) : (
        <></>
      )}
      {file?.mediatype === 'voice' ? (
        <View style={tailwind.flex1}>
          <View style={[tailwind.flex1, tailwind.justifyCenter]}>
            <Icon name="music" style={tailwind.textCenter} size={100} />
          </View>
          <View>
            <Player audio={{duration: file?.duration, path: file?.filepath}} />
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const RowMediaComponent = ({item, onPress, isActive}) => {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const getActiveStyle = () => {
    return {
      borderColor: isActive ? theme.primaryColor : 'transparent',
    };
  };

  const getComponent = () => {
    switch (item.mediatype) {
      case 'plus':
        return <Icon name="plus-box" size={30} />;
      case 'image':
        return (
          <Image
            style={[styles.imgRow, tailwind.border2, getActiveStyle()]}
            source={{
              uri: `file://${
                !item.is_source
                  ? item?.copypath || item?.filepath
                  : item?.filepath
              }`,
            }}
          />
        );
      case 'virtualimage':
        return <Text>{item.filepath}</Text>;
      case 'voice':
        return <Icon name="music" style={tailwind.textCenter} size={30} />;
      case 'video':
        return <Icon name="video" style={tailwind.textCenter} size={30} />;
      default:
        return <Text>{item.filename}</Text>;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.imgRow, tailwind.border2, getActiveStyle()]}>
      {getComponent()}
    </TouchableOpacity>
  );
};


export default function Media({categoryList, type, dataid, defaultFileName, pileTitle, pileNum, memberList,route}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: {fileList},
    dispatch,
  } = React.useContext(Context);

  const form = React.useRef({});

  const listRef = React.useRef();

  const typeModelRef = React.useRef();

  const [isInit, setIsInit] = React.useState(true);

  const [list, setList] = React.useState([]);

  const [nowEdit, setNowEdit] = React.useState();

  const [dataArr, setDataArr] = React.useState()
  const [memberArr, setMemberArr] = React.useState()

  React.useEffect(() => {
    if (!type || !fileList || !categoryList) {
      return;
    }
    console.info(type);
    const set = new Set(categoryList.map(({value}) => value));
    const _list = [{mediatype: 'plus', mediaid: '-1'}];
    switch (type) {
      case 'bridge':
        _list.push(...fileList.filter(({category}) => set.has(category)));
        break;
      case 'member': // 部件
      case 'stepno': // 跨
      case 'goodParts': // 构件
      case 'diseaseParts':
      case 'kua':
      case 'parts': // 构件
        _list.push(
          ...fileList.filter(
            item =>
              set.has(item.category) &&
              item.dataid === dataid &&
              item.type === type,
          ),
        );
        break;
    }
    setList(_list);
    if (isInit) {
      setNowEdit(fileList[0]?.mediaid || '');
      setIsInit(false);
    }

    let dataArr = [
      {
        "name": "Asia",
        "id": 1,
        "list": [
          {
            "name": "China",
            "id": 100,
            "list": [
              {
                "name": "Beijing",
                "id": 1101
              },
              {
                "name": "Chongqing",
                "id": 1102
              },
              {
                "name": "Shanghai",
                "id": 1103
              }
            ]
          },
          {
            "name": "South Korea",
            "id": 200,
            "list": []
          }
        ]
      }
    ]
    setDataArr(dataArr)

    // console.log('图片标题来源defaultFileName',defaultFileName,categoryList[0].label);
    try {
      // console.log('memberList',memberList,route.params.data.title);
      // console.log('-----------------------');
      // console.log('memberList list',memberList[0].list);
      let memberArr = [{
        name:route.params.data.title,
        id:1,
        list:[]
      }]
      memberList.forEach((index,item) => {
        // console.log('memberList[item].list', memberList[item].list);
        memberList[item].list.forEach((index1, item1) => {
          // console.log('memberList item',index1);
          memberArr[0].list.push({
          
              name:index.title,
              id:'1'.concat(item + 1),
              list:{
                name:index1.membername,
                id:'1'.concat(item + 1) + ''.concat(item1 + 1)
              }
          })
        })
        
      });
      console.log('memberArr3',memberArr[0]);
      let mArr = memberArr[0].list
      console.log('mArr',mArr);

      const groups = mArr.reduce((groups, member) => {
        const key = member.name
        if (!groups[key]) {
          groups[key] = []
        }
        groups[key].push(member)
        return groups
      },{})
      groups.forEach(item => {
        console.log('item',item);
        // if (item.name) {
        //   delete item.name
        // }
      })
      console.log('分类后的groups',groups);
      let ccArr = [{
        name:memberArr[0].name,
        id:memberArr[0].id,
        list:groups
      }]
      console.log('ccArr',ccArr);
      console.log('ccArr',ccArr[0].list);
      // console.log('memberArr4',memberArr[0].list[0]);
      // let testArr = []
      // let BBarr = []
      // let linshiArr = []
      // for (let i = 0; i < memberArr[0].list.length; i++) {
      //   testArr.push(memberArr[0].list[i].id)
      //   let idArr = [...new Set(testArr)]
      //   // console.log('idArr',idArr);
      //   for (let m = 0; m < idArr.length; m++) {
      //     if (idArr[m] == memberArr[0].list[i].id) {
      //       // console.log('id',idArr[m]);
      //       BBarr.push({
      //         name:memberArr[0].list[i].name,
      //         id:memberArr[0].list[i].id
      //       })
      //     }
      //   }
      //   console.log('BBarr',BBarr);
      //   // 去重
      //   let res = BBarr.filter(function(item,index,self){
      //     return self.findIndex(el => el.id==item.id) === index
      //   })
      //   console.log('res',res);
        
      //   for (let n = 0; n < res.length; n++) {
      //     if (memberArr[0].list[i].id == res[n].id) {
      //       console.log('res[n].id',res[n].id);
      //       // console.log('memberArr[0].list[i].list',memberArr[0].list[i].list.name);
      //       // linshiArr.push({
      //       //   name:memberArr[0].list[i].list.name,
      //       //   id:memberArr[0].list[i].list.id
      //       // })
      //       linshiArr.push({
      //         name:memberArr[0].list[i].list.name,
      //         id:memberArr[0].list[i].list.id
      //       })
      //       // res[n]['list'] = memberArr[0].list[i].list
      //     }
          
          
      //   }
        
      //   console.log('linshiArr',linshiArr);
      //   // console.log(i);
      //   // console.log('secMemberArr```',memberArr[0].list[i].list);
      // }
      setMemberArr(memberArr)
    } catch (err) {
      console.log(err);
    }
   
  }, [type, fileList, categoryList, dataid, isInit]);

  React.useEffect(() => {
    if (!list || !nowEdit || !form.current.inx) {
      return;
    }
    const data = list.find(({mediaid}) => nowEdit === mediaid);
    if (!data) {
      return;
    }
    // console.log('form.current.filename',categoryList);
    form.current.inx.setValue(data.inx);
    form.current.filename.setValue(data.filename);
    form.current.category.setValue(data.category);
    form.current.remark.setValue(data.remark);
    // if (form.current.inx.value == '' || form.current.inx.value == undefined) {
    //   form.current.inx.setValue(data.inx);
    // }
    // if (form.current.filename.value == '' || form.current.filename.value == undefined) {
    //   form.current.filename.setValue(data.filename);
    // }
    // if (form.current.category.value == '' || form.current.category.value == undefined) {
    //   form.current.category.setValue(data.category);
    // }
    // if (form.current.remark.value == '' || form.current.remark.value == undefined) {
    //   form.current.remark.setValue(data.remark);
    // }
  }, [list, nowEdit]);

  const getExternalPath = () => {
    const code = (
      10001 +
      fileList.filter(({mediatype}) => mediatype === 'virtualimage').length +
      ''
    ).substring(1);
    return 'P' + code;
  };

  // 图片标题
  const getFileName = () => {
    console.log('media type', type,pileNum,defaultFileName);
    let resetName = ''
    // 构件 DiseaseEdit2 传入
    if (defaultFileName && type == 'diseaseParts') {
      if (pileTitle == '主梁' || pileTitle == '挂梁') {
        resetName = pileNum + '梁' + defaultFileName
      } else if (pileTitle == '横隔板' || pileTitle == '湿接段' || pileTitle == '铰缝'
        || pileTitle == '湿接缝' || pileTitle == '支座' || pileTitle == '人行道') {
          resetName = pileNum + pileTitle + defaultFileName
      } else if (pileTitle == '墩台基础') {
        resetName = pileNum + '台基础' + defaultFileName
      } else if (pileTitle == '桥面铺装') {
        resetName = pileNum + '跨桥面' + defaultFileName
      } else {
        resetName = pileTitle
      }
      console.log('???',defaultFileName);
      return resetName;
    }
    // 部件 Member 传入
    if (defaultFileName && type == 'member' || type == 'parts') {
      return defaultFileName
    }
    return categoryList[0].label;
  };

  const handleAdd = () => {
    dispatch({type: 'isLoading', payload: true});
    const mediaid = uuid.v4();
    console.info({
      isAdd: true,
      inx: list.length,
      filename: getFileName(),
      category: categoryList[0].value,
      remark: '',
      is_source: 1,
      type,
      dataid,
      mediaid,
    });
    dispatch({
      type: 'cacheFileData',
      payload: {
        isAdd: true,
        inx: list.length,
        filename: getFileName(),
        category: categoryList[0].value,
        remark: '',
        is_source: 1,
        type,
        dataid,
        mediaid,
      },
    });
    setNowEdit(mediaid);
  };

  const handleCopy = () => {
    dispatch({type: 'isLoading', payload: true});
    const UUID = uuid.v4();
    const item = fileList.find(({mediaid}) => mediaid === nowEdit);
    dispatch({
      type: 'cacheFileData',
      payload: {
        ...item,
        isAdd: true,
        inx: list.length,
        filename: getFileName(),
        category: categoryList[0].value,
        remark: '',
        is_source: 1,
        copypath: item.copypath,
        mediaid: UUID,
        type,
        dataid,
      },
    });
    form.current.inx.setValue('');
    form.current.filename.setValue('');
    form.current.category.setValue('');
    form.current.remark.setValue('');
    setNowEdit(UUID);
  };

  const setFileToList = _file => {
    dispatch({type: 'isLoading', payload: true});
    const inx = fileList.findIndex(({mediaid}) => mediaid === nowEdit);
    dispatch({
      type: 'cacheFileData',
      payload: {
        ...fileList[inx],
        ..._file,
        isUpdate: true,
        type,
      },
    });
  };

  const switchImg = val => {
    const inx = fileList.findIndex(({mediaid}) => mediaid === nowEdit);
    dispatch({
      type: 'cacheFileData',
      payload: {
        isUpdate: true,
        ...fileList[inx],
        is_source: val,
        type,
      },
    });
  };

  const handleDelete = () => {
    dispatch({type: 'isLoading', payload: true});
    const item = fileList.find(({mediaid}) => mediaid === nowEdit);
    item.isDelete = true;
    setNowEdit(list[list.length - 1].mediaid || '');
    dispatch({type: 'cacheFileData', payload: item});
  };

  const handlePriority = () => {
    const item = fileList.find(({mediaid}) => mediaid === nowEdit);
    item.is_preference = !item.is_preference;
    item.isUpdate = true;
    dispatch({type: 'cacheFileData', payload: item});
  };

  const handleEdit = item => {
    setNowEdit(item.mediaid);
  };

  const handleNext = () => {
    if (list.length === 1) {
      return;
    }
    const _list = [...list];
    const inx = _list.findIndex(({mediaid}) => mediaid === nowEdit) + 1;
    if (inx >= _list.length) {
      return;
    }
    listRef.current.scrollToIndex({index: inx});
    setNowEdit(_list[inx].mediaid);
  };

  const handlePrev = () => {
    if (list.length === 1) {
      return;
    }
    const _list = [...list];
    const inx = _list.findIndex(({mediaid}) => mediaid === nowEdit) - 1;
    if (inx <= 0) {
      return;
    }
    listRef.current.scrollToIndex({index: inx});
    setNowEdit(_list[inx].mediaid);
  };

  const getEditData = () => {
    return list.find(({mediaid}) => mediaid === nowEdit) || {};
  };

  const handleChenge = _.debounce(({name, value}) => {
    const data = fileList.find(({mediaid}) => mediaid === nowEdit);
    data[name] = value;
    data.isUpdate = true;
    if (name === 'category') {
      data.filename = categoryList.find(item => item.value === value).label;
    }
    const _list = [...list];
    const inx = list.findIndex(({mediaid}) => mediaid === nowEdit);
    _list[inx][name] = value;
    setList(_list);
    setTimeout(() => {});
    dispatch({type: 'cacheFileData', payload: data});
  }, 500);

  cancel = () => {
    console.log('点击关闭321');
  };
  confirm = data => console.info('confirm', data);
  

  return (
    <Content
      onAdd={handleAdd}
      onCopy={list.length === 1 ? null : handleCopy}
      onDelete={list.length === 1 ? null : handleDelete} // 当照片数量为0时,禁用删除按钮
      operationsComponents={
        <>
          <MediaBar
            disableAlbum={list.length === 1}
            albumChange={async e => {
              const mediatype =
                e.type.search('image') !== -1 ? 'image' : 'video';
              const filetypes = fs.getFileType(e.uri);
              const copypath =
                mediatype === 'image'
                  ? `${fs.dir}/${uuid.v4()}.${filetypes}`
                  : '';
              mediatype === 'image' && (await fs.copyFile(e.uri, copypath));
              const _file = {
                mediatype,
                filepath: e.uri,
                filesize: e.fileSize,
                copypath,
                filetypes,
              };
              setFileToList(_file);
            }}
            disableCamera={list.length === 1}
            cameraChange={async e => {
              const filetypes = fs.getFileType(e.uri);
              const copypath = `${fs.dir}/${uuid.v4()}.${filetypes}`;
              await fs.copyFile(e.uri, copypath);
              const _file = {
                mediatype: 'image',
                filepath: e.uri,
                filesize: e.fileSize,
                copypath,
                filetypes,
              };
              setFileToList(_file);
            }}
            disableVideo={list.length === 1}
            videoChange={e => {
              const filetypes = fs.getFileType(e.uri);
              const _file = {
                mediatype: 'video',
                filepath: e.uri,
                filesize: e.fileSize,
                filetypes,
              };
              setFileToList(_file);
            }}
            disableExternal={list.length === 1}
            externalChange={e => {
              const _file = {
                mediatype: 'virtualimage',
                filepath: getExternalPath(),
                filesize: 0,
              };
              setFileToList(_file);
            }}
            disableRecording={list.length === 1}
            recordingChange={e => {
              const filetypes = fs.getFileType(e.uri);
              const _file = {
                mediatype: 'voice',
                filepath: e.uri,
                filesize: e.fileSize,
                duration: e.duration,
                filetypes,
              };
              setFileToList(_file);
            }}
          />
          {/* 给图片添加标记 */}
          {/* <CircleButton
            disabled={
              list.length === 1 ||
              !new Set(['image', 'virtualimage']).has(getEditData().mediatype)
            }
            name="heart"
            onPress={handlePriority}
          /> */}
        </>
      }>
      {list.length === 1 ? (
        <View style={[styles.card, theme.primaryBgStyle]}>
          <TouchableOpacity
            onPress={handleAdd}
            style={[styles.img, styles.addCard]}>
            <Text style={[tailwind.text4xl]}>
              请点击 <Icon name="plus-box" size={37} /> 添加影音数据
            </Text>
          </TouchableOpacity>
          <View style={tailwind.flex1}>
            <View style={tailwind.mB4}>
              <TextInput label="编号：" disabled={true} value={''} />
              <View style={tailwind.mY2} />
              <TextInput label="标题：" disabled={true} value={''} />
              <View style={tailwind.mY2} />
              <TextInput label="类型：" disabled={true} value={''} />
            </View>
            <View style={tailwind.flex1}>
              <Textarea label="描述：" disabled={true} value={''} />
            </View>
          </View>
        </View>
      ) : (
        <View style={[styles.card, theme.primaryBgStyle]}>
          <MediaComponent file={getEditData()} />
          <View style={tailwind.flex1}>
            <View style={tailwind.mB4}>
              <TextInput
                ref={e => (form.current.inx = e)}
                name="inx"
                label="编号："
                onChange={handleChenge}
              />
              <View style={tailwind.mY2} />
              {memberList ? (
                <Modal isVisible={false}>
                  <CascadePicker 
                    dataSource={dataArr}
                    cancel={this.cancel}
                    confirm={this.confirm}
                  />
              </Modal>
              ) : (
                <WriteInput
                ref={e => (form.current.filename = e)}
                name="filename"
                label="标题："
                onChange={handleChenge}
                />
              )}
              {/* <View style={{flex: 1}}>
                <Modal>
                  <CascadePicker 
                    dataSource={memberList}
                    cancel={this.cancel}
                    confirm={this.confirm}
                  />
                </Modal>
              </View> */}
              <WriteInput
                ref={e => (form.current.filename = e)}
                name="filename"
                label="标题："
                onChange={handleChenge}
              />
              <View style={tailwind.mY2} />
              {categoryList ? (
                <Select
                  ref={e => (form.current.category = e)}
                  label="类型："
                  name="category"
                  labelName="label"
                  valueName="value"
                  values={categoryList}
                  onChange={handleChenge}
                />
              ) : (
                <></>
              )}
            </View>
            {getEditData().mediatype === 'image' ? (
              <>
                <LabelItem label="使用: ">
                  <View style={[tailwind.flex1, tailwind.mL2, tailwind.mT1]}>
                    <Tabs
                      type="button"
                      btnStyle={tailwind.pX4}
                      defaultActive={getEditData().is_source}
                      onChangeTab={switchImg}
                      tabs={[
                        {
                          key: 1,
                          name: '原图',
                        },
                        {
                          key: 0,
                          name: '副本',
                        },
                      ]}
                    />
                  </View>
                </LabelItem>
                <View style={tailwind.mY2} />
              </>
            ) : (
              <></>
            )}
            <View style={tailwind.flex1}>
              <WriteInput
                ref={e => (form.current.remark = e)}
                label="描述："
                onChange={handleChenge}
                name="remark"
                lines={6}
              />
            </View>
          </View>
        </View>
      )}
      {/* 控制图片左右切换的模块 */}
      <View style={[styles.card, styles.rowCard, theme.primaryBgStyle]}>
        <TouchableOpacity onPress={handlePrev}>
          <Icon name="chevron-left" size={50} />
        </TouchableOpacity>
        <View style={[tailwind.flex1]}>
          <FlatList
            ref={listRef}
            data={list}
            extraData={list}
            horizontal={true}
            renderItem={({item, index}) => (
              <View style={styles.rowBox}>
                {item.is_preference === 1 ? (
                  <Icon
                    name="heart"
                    style={[styles.heart, theme.primaryTextStyle]}
                    size={21}
                  />
                ) : (
                  <></>
                )}
                <RowMediaComponent
                  key={index}
                  item={item}
                  isActive={item.mediaid === nowEdit}
                  onPress={() =>
                    item.mediatype === 'plus' ? handleAdd() : handleEdit(item)
                  }
                />
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={tailwind.mX1} />}
          />
        </View>
        <TouchableOpacity onPress={handleNext}>
          <Icon name="chevron-right" size={50} />
        </TouchableOpacity>
      </View>
    </Content>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 480,
    height: 270,
    resizeMode: 'stretch',
  },
  card: {
    ...tailwind.flexRow,
    ...tailwind.border,
    ...tailwind.rounded,
    ...tailwind.p2,
    ...tailwind.borderGray400,
  },
  imgRow: {
    width: 124.4,
    height: 70,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.border,
    ...tailwind.borderGray400,
    ...tailwind.bgGray400,
  },
  mediaComponent: {
    width: 480,
    height: 270,
    ...tailwind.bgGray400,
    ...tailwind.mR2,
  },
  externalImg: {
    ...tailwind.textPurple700,
    ...tailwind.textCenter,
    ...tailwind.text4xl,
    ...tailwind.fontBold,
  },
  flex2: {
    flex: 2,
  },
  flex4: {
    flex: 4,
  },
  addCard: {
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.bgGray400,
    ...tailwind.mR2,
  },
  rowBox: {
    height: 85,
    width: 135,
    ...tailwind.justifyCenter,
  },
  rowCard: {
    ...tailwind.p0,
    ...tailwind.mT1,
    ...tailwind.itemsCenter,
  },
  heart: {
    right: 0,
    top: -1,
    zIndex: 300,
    ...tailwind.absolute,
    ...tailwind.shadow2xl,
  },
});
