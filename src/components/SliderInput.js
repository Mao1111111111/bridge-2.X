import React, { useEffect, useState } from 'react';
import {Portal, Modal} from 'react-native-paper';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput as RnTextInput,
} from 'react-native';
import {Context as ThemeContext} from '../providers/ThemeProvider';
import {Context as GlobalContext} from '../providers/GlobalProvider';
import {tailwind} from 'react-native-tailwindcss';
import LabelItem from './LabelItem';
import Button from './Button';
import Pid from './Pid';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';


export const SliderInput = React.forwardRef(
  ({label, style, LabelStyle, name, onChange, value, num, memberData}, ref) => {
    const {
      state: {theme},
    } = React.useContext(ThemeContext);

    const {
      state: {keyboard},
    } = React.useContext(GlobalContext);

    const [visible, setVisible] = React.useState(false);

    const [textValue, setTextValue] = React.useState(value + '');

    const textRef = React.useRef();

    React.useImperativeHandle(ref, () => ({
      value: textValue,
      clear: () => {
        setTextValue('');
        onChange &&
          onChange({
            name,
            value: '',
          });
      },
    }));

    const [finalDisData, setFinalDisData] = useState()
    React.useEffect(() => {
      setTextValue(value + '');
      let finalDisData = (value * (memberData / 100)).toFixed(1)
      setFinalDisData(finalDisData)
      // console.log('testData--------->', finalDisData);
    }, [value]);

    const getBtnStyle = key => {
      const _style = {
        ...tailwind.flex1,
        ...tailwind.mR6,
      };
      if (isNaN(parseInt(key, 10))) {
        return {
          ..._style,
          ...tailwind.bgRed400,
        };
      } else {
        return {
          ..._style,
          ...tailwind.bgGray500,
        };
      }
    };

    const handleDelete = () => {
      setTextValue((textValue + '').slice(0, -1));
    };

    const handleClaer = () => {
      setTextValue('');
    };

    const handlePress = key => {
      setTextValue((textValue || '') + key);
    };

    const handleOk = (value) => {
      onChange &&
        onChange({
          name,
          value: value,
        });
      setVisible(false);
    };

    const handlModalShow = () => {
      setTextValue(value);
      setVisible(true);
    };

    const strToNum = (str) =>{
      let num = parseInt(str)
      if(isNaN(num)){
        return 0
      }else{
        return num
      }
    }

    const [disDataText, setDisDataText] = useState()
    useEffect(() => {
      if (name == 'disLength') {
        let disDataText = ' 长度 '
        setDisDataText(disDataText)
      } else if (name == 'disWidth') {
        let disDataText = ' 宽度 '
        setDisDataText(disDataText)
      } else if (name == 'disHeight') {
        let disDataText = ' 距顶 '
        setDisDataText(disDataText)
      }
    }, [])

    const [count, setCount] = useState(0)
    const countChange = (e) => {
      if (count <= 99) {
        let count = Math.round(Number(value)) + e
        setCount(count)
        handleOk(count)
      } else {
        console.log('溢出');
      }
    }

    return (
      <LabelItem style={style} LabelStyle={LabelStyle} label={label}>
        <View style={[tailwind.flexRow]}>
          {/* <LabelItem label="长" style={tailwind.w18} /> */}
          <Slider
            style={{width: 185, height: 20}}
            minimumValue={0}
            // value={diseaseData.disLength}
            value={strToNum(textValue)}
            maximumValue={100}
            step={1}  // 滑块的步长值
            minimumTrackTintColor="#2b427d"  // 左侧轨道颜色
            maximumTrackTintColor="#b6cafc"  // 右侧轨道颜色
            thumbTintColor="#2b427d"  // 滑块的颜色
            // onValueChange={(value) => {console.log('value:' + value)}}  // 值发生变化时的回调函数
            onValueChange={(value) => {handleOk(value)}}
            // onSlidingComplete={ () => {console.log('onSlidingComplete')}}  // 松开滑块时的回调函数
            // onSlidingComplete={(value) => {handleOk(value)}}
          />
        </View>
        <Text style={[tailwind.textBlack,{fontSize:13}]}>比例(%)</Text>
        <TouchableWithoutFeedback>
          <View style={[styles.keyboardInput]}>
            {/* <Text style={[tailwind.textBlack]}>{value}</Text> */}
            <Text style={[tailwind.textBlack, {fontSize:10}]}>{value}</Text>
          </View>
        </TouchableWithoutFeedback>
        {/* <Text style={[tailwind.textBlack]}>{disDataText}</Text> */}
          {/* <View style={[styles.keyboardInput]}>
            <Text style={[tailwind.textBlack]}>{finalDisData}</Text>
            <Text style={[tailwind.textBlack]}>{(value * (memberData / 100)).toFixed(1)}</Text>
          </View> */}
          {/* <Button style={[{width:10}]} onPress={countChange(1)}>+</Button> */}
          <Text onPress={() => countChange(1)}>   +</Text>
          <Text onPress={() => countChange(-1)}>   -</Text>
        {/* <Text style={[tailwind.textBlack]}>{(value / memberLength)*100}</Text> */}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => {
              textRef?.current?.blur();
              setVisible(false);
            }}
            contentContainerStyle={styles.modal}>
            <TouchableWithoutFeedback onPress={() => textRef?.current?.blur()}>
              <View
                style={[
                  theme.primaryBgStyle,
                  tailwind.flex1,
                  tailwind.rounded,
                  tailwind.p2,
                  tailwind.pL8,
                ]}>
                <View
                  style={[
                    tailwind.flexRow,
                    tailwind.justifyBetween,
                    tailwind.mR6,
                  ]}>
                  <Text
                    style={[tailwind.textLg, tailwind.fontBold, tailwind.mB2]}>
                    {label}
                  </Text>
                  <Pid pid="T1001" />
                </View>

                <View style={[tailwind.flexRow, tailwind.mB4]}>
                  <Button
                    style={styles.redBtn}
                    labelStyle={tailwind.wFull}
                    onPress={() => setVisible(false)}>
                    关闭
                  </Button>
                  <RnTextInput
                    ref={textRef}
                    blurOnSubmit={true}
                    value={(textValue || '') + ''}
                    onChangeText={setTextValue}
                    style={[styles.input, styles.flex16, tailwind.mR6]}
                  />
                  <Button style={[styles.yellowBtn]} onPress={handleDelete}>
                    删除
                  </Button>
                </View>
                <View style={[tailwind.flex1]}>
                  {keyboard.map((row, index) => (
                    <View key={index} style={[tailwind.flexRow, tailwind.mB4]}>
                      {row.map(item => (
                        <Button
                          key={item}
                          onPress={() => handlePress(item)}
                          labelStyle={tailwind.wFull}
                          style={getBtnStyle(item)}>
                          {item}
                        </Button>
                      ))}
                    </View>
                  ))}
                </View>
                <View style={[tailwind.flex1, tailwind.flexRow, tailwind.mB2]}>
                  <View style={[styles.flex16, tailwind.mR6]} />
                  <Button
                    style={[styles.yellowBtn]}
                    labelStyle={tailwind.wFull}
                    onPress={handleClaer}>
                    清除
                  </Button>
                  <Button
                    style={[styles.yellowBtn]}
                    labelStyle={tailwind.wFull}
                    onPress={()=>handleOk(textValue)}>
                    确定
                  </Button>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </Portal>
      </LabelItem>
    );
  },
);

const styles = StyleSheet.create({
  input: {
    textAlignVertical: 'center',
    ...tailwind.border,
    ...tailwind.borderGray400,
    ...tailwind.roundedSm,
    ...tailwind.flex1,
    ...tailwind.textSm,
    ...tailwind.pY1,
    ...tailwind.pX2,
    height: 25,
  },
  textarea: {
    textAlignVertical: 'top',
    ...tailwind.border,
    ...tailwind.borderGray400,
    ...tailwind.roundedSm,
    ...tailwind.flex1,
    ...tailwind.textSm,
    ...tailwind.pY1,
    ...tailwind.pX2,
    // overflow: 'hidden',
    height: 50,
  },
  keyboardInput: {
    ...tailwind.justifyCenter,
    ...tailwind.border,
    ...tailwind.borderGray400,
    ...tailwind.roundedSm,
    // ...tailwind.flex1,
    ...tailwind.textSm,
    ...tailwind.pX2,
    paddingBottom: 1,
    height: 20,
    // ...tailwind.pX2,
  },
  modal: {
    ...tailwind.w3_5,
    ...tailwind.pB12,
    ...tailwind.absolute,
    ...tailwind.selfCenter,
  },
  modalTitle: {
    ...tailwind.mT4,
    ...tailwind.mX6,
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
  },
  flex16: {
    flex: 16,
  },
  yellowBtn: {
    ...tailwind.flex1,
    ...tailwind.mR6,
    ...tailwind.bgYellow600,
  },
  redBtn: {
    ...tailwind.flex1,
    ...tailwind.mR6,
    ...tailwind.bgRed600,
  },

  password: {
    ...tailwind.border,
    ...tailwind.borderGray400,
    ...tailwind.roundedSm,
    ...tailwind.flex1,
    ...tailwind.flexRow,
    ...tailwind.itemsCenter,
  },

  passwordInput: {
    textAlignVertical: 'center',
    ...tailwind.flex1,
    ...tailwind.textSm,
    ...tailwind.pY1,
    ...tailwind.pX2,
    height: 25,
  },
});
