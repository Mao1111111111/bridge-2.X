/* 
  桥梁检测的 媒体组件
 */
import React from 'react';
import _ from 'lodash';
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
import {TextInput, Textarea} from '../../../../components/Input';
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

// 显示媒体的组件
const MediaComponent = ({file}) => {
  // 检测桥梁的全局参数
  const {dispatch} = React.useContext(Context);

  // 带水印的图片保存
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
      {/* 照片 */}
      {file?.mediatype === 'image' ? (
        file?.is_source === 1 ? (
          // 源文件
          <Image
            style={styles.img}
            source={{uri: 'file://' + file?.filepath}}
          />
        ) : (
          // 带水印的图片
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
      {/* 虚拟照片 */}
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
      {/* 视频 */}
      {file?.mediatype === 'video' ? (
        <VideoPlayer video={file?.filepath} width={480} height={270} top={0} />
      ) : (
        <></>
      )}
      {/* 录音 */}
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

// 媒体列表中 -- 单个媒体 
const RowMediaComponent = ({item, onPress, isActive}) => {
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 当前是否被选中
  const getActiveStyle = () => {
    return {
      borderColor: isActive ? theme.primaryColor : 'transparent',
    };
  };

  // 获取组件
  const getComponent = () => {
    switch (item.mediatype) {
      // plus 表示第一个框，点击新增
      case 'plus':
        return <Icon name="plus-box" size={30} />;
      //照片时显示照片 
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
      //虚拟图片时，显示文件名 
      case 'virtualimage':
        return <Text>{item.filepath}</Text>;
      //录音
      case 'voice':
        return <Icon name="music" style={tailwind.textCenter} size={30} />;
      // 视频
      case 'video':
        return <Icon name="video" style={tailwind.textCenter} size={30} />;
      // 默认显示文件名 -- 比如新增后还没有添加文件时
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

// 媒体组件
export default function Media({categoryList, type, dataid, defaultFileName}) {
  // categoryList-类型列表，defaultFileName-默认文件名
  // 全局样式
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  // 桥梁检测全局参数 -- 文件列表
  const {
    state: {fileList},
    dispatch,
  } = React.useContext(Context);

  // 表单的引用
  const form = React.useRef({});

  // 媒体文件列表的引用
  const listRef = React.useRef();

  // 初始化
  const [isInit, setIsInit] = React.useState(true);

  // 媒体数据
  const [list, setList] = React.useState([]);

  // 当前编辑的照片
  const [nowEdit, setNowEdit] = React.useState();

  // 设置媒体列表数据 和 当前选中 -- 传入的数据变化时、文件列表、初始化状态 变化时 触发
  React.useEffect(() => {
    // 如果没有文件列表、类型列表、type那么返回
    if (!type || !fileList || !categoryList) {
      return;
    }
    console.info(type);
    // 过滤出 类型列表中 不重复的数据
    const set = new Set(categoryList.map(({value}) => value));
    // 第一条数据，新增按钮
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
  }, [type, fileList, categoryList, dataid, isInit]);

  // 媒体列表、当前选中变化时 -- 设置右侧表单数据
  React.useEffect(() => {
    if (!list || !nowEdit || !form.current.inx) {
      return;
    }
    const data = list.find(({mediaid}) => nowEdit === mediaid);
    if (!data) {
      return;
    }
    form.current.inx.setValue(data.inx);
    form.current.filename.setValue(data.filename);
    form.current.category.setValue(data.category);
    form.current.remark.setValue(data.remark);
  }, [list, nowEdit]);

  // 获取虚拟图片的路径
  const getExternalPath = () => {
    const code = (
      10001 +
      fileList.filter(({mediatype}) => mediatype === 'virtualimage').length +
      ''
    ).substring(1);
    return 'P' + code;
  };

  // 获取文件名的函数
  const getFileName = () => {
    // 如果存在 默认文件名
    if (defaultFileName) {
      return defaultFileName;
    }
    // 如果不存在 默认文件名 那么使用传过来的列表的 label
    return categoryList[0].label;
  };

  // 点击新增时 -- 新增一个位置
  const handleAdd = () => {
    dispatch({type: 'isLoading', payload: true});
    // 媒体id 随机数
    const mediaid = uuid.v4();
    // 将数据存入
    dispatch({
      type: 'cacheFileData',
      payload: {
        isAdd: true,
        inx: list.length,
        filename: getFileName(),
        // 类型
        category: categoryList[0].value,
        remark: '',
        is_source: 1,
        type,
        dataid,
        mediaid,
      },
    });
    // 焦点聚焦到新增的位置
    setNowEdit(mediaid);
  };
  // 克隆
  const handleCopy = () => {
    dispatch({type: 'isLoading', payload: true});
    const UUID = uuid.v4();
    // 获取当前选中媒体的数据
    const item = fileList.find(({mediaid}) => mediaid === nowEdit);
    // 将数据写入
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
    // 重置表单当前的值
    form.current.inx.setValue('');
    form.current.filename.setValue('');
    form.current.category.setValue('');
    form.current.remark.setValue('');
    // 聚焦
    setNowEdit(UUID);
  };

  // 将文件存入列表
  const setFileToList = _file => {
    // loading
    dispatch({type: 'isLoading', payload: true});
    // 将图片信息存入
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

  // 是使用原图 还是 使用副本
  const switchImg = val => {
    // 从全局文件列表中 获取当前编辑的媒体的编号
    const inx = fileList.findIndex(({mediaid}) => mediaid === nowEdit);
    // 更新数据库的数据
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

  // 删除
  const handleDelete = () => {
    dispatch({type: 'isLoading', payload: true});
    // 获取当前编辑的媒体信息
    const item = fileList.find(({mediaid}) => mediaid === nowEdit);
    // 将信息中的 isDelete 设置为 true
    item.isDelete = true;
    // 重新设置焦点
    setNowEdit(list[list.length - 1].mediaid || '');
    // 通过修改 cacheFileData 触发删除
    dispatch({type: 'cacheFileData', payload: item});
  };

  // 优先使用
  const handlePriority = () => {
    const item = fileList.find(({mediaid}) => mediaid === nowEdit);
    item.is_preference = !item.is_preference;
    item.isUpdate = true;
    dispatch({type: 'cacheFileData', payload: item});
  };

  // 点击选择媒体
  const handleEdit = item => {
    setNowEdit(item.mediaid);
  };

  // 点击右侧按钮
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

  // 点击左侧按钮
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

  // 获取当前编辑媒体的数据
  const getEditData = () => {
    return list.find(({mediaid}) => mediaid === nowEdit) || {};
  };

  // 当表单数据变化时 _.debounce 用于防抖
  const handleChenge = _.debounce(({name, value}) => {
    // 全局的文件列表中获取 当前编辑图片的数据
    const data = fileList.find(({mediaid}) => mediaid === nowEdit);
    // 将当前变化的数据存入 data
    data[name] = value;
    // 设置数据状态为 isUpdate
    data.isUpdate = true;
    // 当类型变化时，更改文件名
    if (name === 'category') {
      data.filename = categoryList.find(item => item.value === value).label;
    }
    // 
    const _list = [...list];
    // 当前编辑媒体的变化
    const inx = list.findIndex(({mediaid}) => mediaid === nowEdit);
    _list[inx][name] = value;
    setList(_list);
    setTimeout(() => {});
    // 更新数据库的数据
    dispatch({type: 'cacheFileData', payload: data});
  }, 500);

  return (
    // Content 外部盒子
    <Content
      //--左侧按钮 
      onAdd={handleAdd}
      //--克隆按钮
      onCopy={list.length === 1 ? null : handleCopy}
      // 当照片数量为0时,禁用删除按钮
      onDelete={list.length === 1 ? null : handleDelete}
      //--右侧按钮组
      operationsComponents={
        <>
          <MediaBar
            //----- 从本地获取文件---- 
            // 打开本地文件夹--当没有照片位置时，禁用打开文件夹按钮
            disableAlbum={list.length === 1}
            // 打开本地文件夹--选中照片后
            albumChange={async e => {
              // 确定 选中的媒体类型
              const mediatype = e.type.search('image') !== -1 ? 'image' : 'video';
              // 获取文件的后缀名
              const filetypes = fs.getFileType(e.uri);
              // 文件的新路径 -- 本地文件导入软件中后 的 新地址
              const copypath =
                mediatype === 'image'
                  ? `${fs.dir}/${uuid.v4()}.${filetypes}`
                  : '';
              // 将本地文件 复制到 软件文件夹下
              mediatype === 'image' && (await fs.copyFile(e.uri, copypath));
              const _file = {
                mediatype,
                filepath: e.uri,
                filesize: e.fileSize,
                copypath,
                filetypes,
              };
              // 将图片信息存入列表
              setFileToList(_file);
            }}
            // 打开本地文件夹--文件类型照片还是mixed
            disableVideo={list.length === 1}
            //----- 拍照----
            // 拍照按钮是否可用
            disableCamera={list.length === 1}
            // 拍完照后调用
            cameraChange={async e => {
              // 获取文件的后缀名
              const filetypes = fs.getFileType(e.uri);
              // 新地址
              const copypath = `${fs.dir}/${uuid.v4()}.${filetypes}`;
              await fs.copyFile(e.uri, copypath);
              const _file = {
                mediatype: 'image',
                filepath: e.uri,
                filesize: e.fileSize,
                copypath,
                filetypes,
              };
              // 将数据存入
              setFileToList(_file);
            }}
            //----- 录像----
            // 录像结束后
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
            //----- 虚拟照片----
            // 按钮是否可用
            disableExternal={list.length === 1}
            // 点击后 
            externalChange={e => {
              const _file = {
                mediatype: 'virtualimage',
                // 获取虚拟图片的路径
                filepath: getExternalPath(),
                filesize: 0,
              };
              setFileToList(_file);
            }}
            //----- 录音----
            // 按钮是否可用
            disableRecording={list.length === 1}
            // 点击后
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
        // 当没有媒体文件时
        <View style={[styles.card, theme.primaryBgStyle]}>
          {/* 中间文字可点击 */}
          <TouchableOpacity
            onPress={handleAdd}
            style={[styles.img, styles.addCard]}>
            <Text style={[tailwind.text4xl]}>
              请点击 <Icon name="plus-box" size={37} /> 添加影音数据
            </Text>
          </TouchableOpacity>
          {/* 右边表单都是禁用的 */}
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
        // 有媒体文件时
        <View style={[styles.card, theme.primaryBgStyle]}>
          {/* 显示媒体的组件 */}
          <MediaComponent file={getEditData()} />
          {/* 右侧表单 */}
          <View style={tailwind.flex1}>
            {/* 编号、标题、类型 */}
            <View style={tailwind.mB4}>
              <TextInput
                ref={e => (form.current.inx = e)}
                name="inx"
                label="编号："
                onChange={handleChenge}
              />
              <View style={tailwind.mY2} />
              <TextInput
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
            {/* 当媒体为图片时，可以选择副本 添加水印 */}
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
            {/* 描述 */}
            <View style={tailwind.flex1}>
              <Textarea
                ref={e => (form.current.remark = e)}
                label="描述："
                onChange={handleChenge}
                name="remark"
              />
            </View>
          </View>
        </View>
      )}
      {/* 控制图片左右切换的模块 */}
      <View style={[styles.card, styles.rowCard, theme.primaryBgStyle]}>
        {/* 左侧按钮 */}
        <TouchableOpacity onPress={handlePrev}>
          <Icon name="chevron-left" size={50} />
        </TouchableOpacity>
        {/* 图片列表 */}
        <View style={[tailwind.flex1]}>
          <FlatList
            ref={listRef}
            data={list}
            extraData={list}
            horizontal={true}
            renderItem={({item, index}) => (
              <View style={styles.rowBox}>
                {/* 是否优先使用，这个功能目前禁用了 */}
                {item.is_preference === 1 ? (
                  <Icon
                    name="heart"
                    style={[styles.heart, theme.primaryTextStyle]}
                    size={21}
                  />
                ) : (
                  <></>
                )}
                {/* 媒体列表中 -- 单个媒体 */}
                <RowMediaComponent
                  key={index}
                  item={item}
                  isActive={item.mediaid === nowEdit}
                  // 第一个框点击新增，第二个框点击选中
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
        {/* 左侧按钮 */}
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
