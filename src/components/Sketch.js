/* 
  处理图片水印的组件
 */
import React from 'react';
import {WebView} from 'react-native-webview';
import {tailwind} from 'react-native-tailwindcss';
import ColorPalette from 'react-native-color-palette';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Context as ThemeContext} from '../providers/ThemeProvider';
import imgZoom from '../utils/imgZoom';
import fs from '../utils/fs';
import {TextInput} from './Input';
import Select from './Select';
import Button from './Button';
import Modal from './Modal';

const EditBtn = ({icon, children, onPress, color, selected}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btn,
        selected ? tailwind.bgGray400 : tailwind.bgTransparent,
      ]}
      onPress={onPress}>
      {icon ? <Icon name={icon} style={{color}} size={23} /> : children}
    </TouchableOpacity>
  );
};

export default function Sketch({id, source, onSave, maxHeight, maxWidth}) {
  const ref = React.useRef(null);

  const inputRef = React.useRef(null);

  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [color, setColor] = React.useState('red');

  const [type, setType] = React.useState('pencil');

  const [lineWidth, setLineWidth] = React.useState(2);

  const [fontSize, setFontSize] = React.useState('12px');

  const [point, setPoint] = React.useState(1);

  const [visible, setVisible] = React.useState(false);

  const [textVisible, setTextVisible] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(true);

  const [history, setHistory] = React.useState([]);

  const [historyInx, setHistoryInx] = React.useState(0);

  const [img, setImg] = React.useState(0);

  const [webviewStyle, setWebviewStyle] = React.useState({
    height: maxHeight,
    width: maxWidth,
  });

  const [list] = React.useState([
    {k: '12px', v: '12px'},
    {k: '16px', v: '16px'},
    {k: '20px', v: '20px'},
    {k: '24px', v: '24px'},
    {k: '36px', v: '36px'},
    {k: '48px', v: '48px'},
  ]);

  React.useEffect(() => {
    console.info(id, source, maxHeight, maxWidth);
  }, [id, source, maxHeight, maxWidth]);

  React.useEffect(() => {
    if (ref.current && !isLoading) {
      ref.current.postMessage(
        JSON.stringify({
          type: 'color',
          param: color,
        }),
      );
    }
  }, [ref, color, isLoading]);

  React.useEffect(() => {
    if (ref.current && !isLoading) {
      ref.current.postMessage(
        JSON.stringify({
          type: 'lineWidth',
          param: lineWidth,
        }),
      );
    }
  }, [ref, lineWidth, isLoading]);

  React.useEffect(() => {
    if (ref.current && !isLoading) {
      ref.current.postMessage(
        JSON.stringify({
          type: 'fontSize',
          param: fontSize,
        }),
      );
    }
  }, [ref, fontSize, isLoading]);

  React.useEffect(() => {
    if (ref.current && !isLoading) {
      ref.current.postMessage(
        JSON.stringify({
          type: 'setPointInx',
          param: point,
        }),
      );
    }
  }, [ref, point, isLoading]);

  const handleMessage = ({nativeEvent}) => {
    const event = JSON.parse(nativeEvent.data);
    if (event.type === 'setType') {
      setType(event.data);
    }
    if (event.type === 'point') {
      setPoint(event.data + 1);
    }
    if (event.type === 'onChange') {
      const _history = [img, ...history];
      setHistory(_history);
      setImg(event.data);
      setHistoryInx(0);
    }
  };

  const handleShape = val => {
    postMassage({
      type: 'shape',
      param: val,
    });
  };

  const handleText = () => {
    postMassage({
      type: 'text',
      param: inputRef.current.value,
    });
    setTextVisible(false);
  };

  const handlePoint = () => {
    postMassage({
      type: 'point',
    });
  };

  const handleColorPicker = () => {
    setVisible(true);
  };

  const postMassage = val => {
    ref.current.postMessage(JSON.stringify(val));
  };

  const handleLoadEnd = async () => {
    const base64 = await fs.getBase64(source);
    setImg(base64);
    ref.current.injectJavaScript(`
      draw.setLineWidth(${lineWidth});
      draw.setColor('${color}');
      draw.setImg('data:image/jpeg;base64,${base64}');
      draw.setPointInx(${point});
      draw.setFontSize('${fontSize}');
      console.info('load end')
      console.info(draw)
    `);
    setIsLoading(false);
  };

  const handleUndo = async () => {
    if (historyInx === history.length - 1) {
      const base64 = await fs.getBase64(source);
      ref.current.injectJavaScript(`
        draw.setImg('data:image/jpeg;base64,${base64}');
        console.info(draw)
      `);
      setImg(base64);
      setHistoryInx(0);
      setHistory([]);
      return;
    }
    ref.current.postMessage(
      JSON.stringify({
        type: 'img',
        param: history[historyInx],
      }),
    );
    if (history[historyInx]) {
      setImg(history[historyInx]);
      setHistoryInx(historyInx + 1);
    }
  };

  // 剪裁图片
  const handleCrop = async () => {
    const {data, width, height} = await ImagePicker.openCropper({
      path: 'file://' + source,
      cropping: true,
      multiple: true,
      forceJpg: true,
      freeStyleCropEnabled: true,
      enableRotationGesture: true,
      includeBase64: true,
      mediaType: 'photo',
      cropperChooseText: '确定',
      cropperCancelText: '取消',
    });
    setWebviewStyle(imgZoom({width, height}, maxWidth, maxHeight));
    setTimeout(() => {
      ref.current.injectJavaScript(`
      draw.setImg('data:image/jpeg;base64,${data}');
      console.info('???',draw.img.length)
    `);
      setImg(data);
      setHistoryInx(0);
      setHistory([]);
    }, 200);
  };

  const handleClear = async () => {
    const base64 = await fs.getBase64(source);
    setWebviewStyle({width: maxWidth, height: maxHeight});
    ref.current.injectJavaScript(`
      draw.setImg('data:image/jpeg;base64,${base64}');
      console.info(draw.ler)
    `);
    setHistory([]);
    setHistoryInx(0);
    setImg(base64);
  };

  const handleSave = () => {
    onSave && onSave(img?.split(',').pop() || '');
  };

  return (
    <View style={[tailwind.flex1]}>
      {/* 左侧操作区 + 图片展示 */}
      <View style={tailwind.flexRow}>
        {/* 操作区 */}
        <View style={[tailwind.pX1, tailwind.pT2]}>
          {/* 剪裁 */}
          <EditBtn icon="crop" onPress={handleCrop} />
          <View style={[tailwind.mY1]} />
          <EditBtn icon="arrow-u-left-top" onPress={handleUndo} />
          <View style={[tailwind.mY1]} />
          <EditBtn icon="cached" onPress={handleClear} />
          <View style={[tailwind.mY1]} />
          <EditBtn icon="content-save" onPress={handleSave} />
        </View>
        {/* 图片 */}
        <View
          style={[
            tailwind.bgBlack,
            tailwind.flex1,
            tailwind.justifyCenter,
            tailwind.itemsCenter,
          ]}>
          <View
            style={{width: webviewStyle.width, height: webviewStyle.height}}>
            <WebView
              ref={ref}
              overScrollMode="never"
              onStartShouldSetResponder={() => true}
              onResponderTerminate={() => false}
              originWhitelist={['*']}
              mixedContentMode="always"
              scalesPageToFit={false}
              scrollEnabled={false}
              startInLoadingState={true}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              automaticallyAdjustContentInsets={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              bounces={false}
              onLoadEnd={handleLoadEnd}
              thirdPartyCookiesEnabled
              allowUniversalAccessFromFileURLs
              onError={() => {
                console.info('error');
              }}
              onMessage={handleMessage}
              source={{
                uri: 'file:///android_asset/sketch.html?' + id,
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={[
          tailwind.p1,
          tailwind.pL6,
          tailwind.flexRow,
          theme.primaryBgStyle,
          tailwind.justifyCenter,
        ]}>
        <EditBtn
          selected={type === 'pencil'}
          color={color}
          icon="pencil"
          onPress={() => handleShape('pencil')}
        />
        <View style={tailwind.mX2} />
        <EditBtn
          selected={type === 'rectangle'}
          color={color}
          icon="square-outline"
          onPress={() => handleShape('rectangle')}
        />
        <View style={tailwind.mX2} />
        <EditBtn
          selected={type === 'circle'}
          color={color}
          icon="checkbox-blank-circle-outline"
          onPress={() => handleShape('circle')}
        />
        <View style={tailwind.mX2} />
        <EditBtn
          selected={type === 'straightLine'}
          color={color}
          icon="slash-forward"
          onPress={() => handleShape('straightLine')}
        />
        <View style={tailwind.mX2} />
        <EditBtn
          selected={type === 'arrow'}
          color={color}
          icon="arrow-up"
          onPress={() => handleShape('arrow')}
        />
        <View style={tailwind.mX2} />
        <EditBtn
          color={color}
          selected={type === 'text'}
          icon="format-text-variant"
          onPress={() => setTextVisible(true)}
        />
        <View style={[tailwind.mX2, tailwind.border, tailwind.borderGray400]} />
        <EditBtn selected={lineWidth === 2} onPress={() => setLineWidth(2)}>
          <Text style={[tailwind.textLg, tailwind.mX2, {color}]}>L</Text>
        </EditBtn>
        <View style={tailwind.mX2} />
        <EditBtn selected={lineWidth === 5} onPress={() => setLineWidth(5)}>
          <Text
            style={[tailwind.textLg, tailwind.mX2, tailwind.fontBold, {color}]}>
            L
          </Text>
        </EditBtn>
        <View style={tailwind.mX2} />
        <EditBtn color={color} icon="square" onPress={handleColorPicker} />
        <View style={[tailwind.mX2, tailwind.border, tailwind.borderGray400]} />

        <EditBtn
          icon="minus"
          onPress={() => {
            if (point > 1) {
              setPoint(point - 1);
            }
          }}
        />
        <EditBtn onPress={handlePoint} selected={type === 'point'}>
          <View style={[styles.circle, {borderColor: color}]}>
            <Text style={{color}}>{point}</Text>
          </View>
        </EditBtn>
        <EditBtn icon="plus" onPress={() => setPoint(point + 1)} />
      </View>
      <Modal visible={visible} showHead={false}>
        <View style={tailwind.p2}>
          <ColorPalette
            onChange={_color => {
              setColor(_color);
              setVisible(false);
            }}
            defaultColor={color}
            colors={['red', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
            title={'请选择颜色'}
            icon={<Text>✔</Text>}
          />
        </View>
      </Modal>
      <Modal visible={textVisible} showHead={false} width={300} height={175}>
        <View style={[tailwind.p2, tailwind.flex1]}>
          <Text>请输入文字：</Text>
          <View style={tailwind.mY1} />
          <TextInput ref={inputRef} />
          <View style={tailwind.mY1} />
          <Text>请选择字号：</Text>
          <View style={tailwind.mY1} />
          <View style={styles.select}>
            <Select
              labelName="k"
              valueName="v"
              onChange={({value}) => setFontSize(value)}
              value={fontSize}
              values={list}
            />
          </View>

          <View style={tailwind.mY2} />
          <View style={[tailwind.flexRow, tailwind.justifyBetween]}>
            <Button
              style={tailwind.bgRed700}
              onPress={() => setTextVisible(false)}>
              取消
            </Button>
            <Button onPress={handleText}>确定</Button>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
  select: {
    height: 28,
  },
  circle: {
    ...tailwind.mX1,
    ...tailwind.roundedFull,
    ...tailwind.border,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.h5,
    ...tailwind.w5,
  },
});
