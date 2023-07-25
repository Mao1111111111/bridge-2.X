import React, {useState} from 'react';
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
import Modals from "react-native-modal"
import { CascadePicker } from "react-native-slidepicker";

export const TextInput = React.forwardRef(function (
  {
    label,
    style,
    value,
    inputStyle,
    LabelStyle,
    name,
    onChange,
    type,
    isPassword,
    disabled,
    lines,
    height,
  },
  ref,
) {
  const textRef = React.useRef();

  const [textValue, setTextValue] = React.useState();

  React.useEffect(() => {
    if (!value) {
      setTextValue('');
      return;
    }
    setTextValue(value);
  }, [value]);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      textRef.current.focus();
    },
    blur: () => {
      textRef.current.blur();
    },
    setValue: val => {
      setTextValue(val + '');
    },
    clear: () => {
      setTextValue('');
      onChange &&
        onChange({
          name,
          value: '',
        });
    },
    value: textValue,
    name,
  }));

  const handleChange = val => {
    let _val = type === 'numeric' ? val.replace(/[^\d]+/, '') : val;
    setTextValue(_val);
    onChange &&
      onChange({
        name,
        value: _val,
      });
  };

  return (
    <LabelItem
      style={style}
      label={label}
      LabelStyle={LabelStyle}
      onPress={() => textRef.current.focus()}>
      <RnTextInput
        ref={textRef}
        blurOnSubmit={true}
        keyboardType={type || 'default'}
        value={textValue}
        textContentType={isPassword ? 'password' : 'none'}
        secureTextEntry={isPassword}
        editable={!disabled}
        multiline = {true}
        numberOfLines = {lines}
        // defaultValue={value}
        onChangeText={handleChange}
        style={[
          styles.input,
          inputStyle ? inputStyle : {},
          disabled && {
            ...tailwind.opacity10,
            ...tailwind.bgGray300,
          },
        ]}
      />
    </LabelItem>
  );
});

export const WriteInput = React.forwardRef(function (
  {
    label,
    style,
    value,
    inputStyle,
    LabelStyle,
    name,
    onChange,
    type,
    isPassword,
    disabled,
    lines,
    height,
  },
  ref,
) {
  const textRef = React.useRef();

  const [textValue, setTextValue] = React.useState();

  React.useEffect(() => {
    if (!value) {
      setTextValue('');
      return;
    }
    setTextValue(value);
  }, [value]);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      textRef.current.focus();
    },
    blur: () => {
      textRef.current.blur();
    },
    setValue: val => {
      setTextValue(val + '');
    },
    clear: () => {
      setTextValue('');
      onChange &&
        onChange({
          name,
          value: '',
        });
    },
    value: textValue,
    name,
  }));

  const handleChange = val => {
    let _val = type === 'numeric' ? val.replace(/[^\d]+/, '') : val;
    setTextValue(_val);
    onChange &&
      onChange({
        name,
        value: _val,
      });
  };

  return (
    <LabelItem
      style={style}
      label={label}
      LabelStyle={LabelStyle}
      onPress={() => textRef.current.focus()}>
      <RnTextInput
        ref={textRef}
        blurOnSubmit={true}
        keyboardType={type || 'default'}
        value={textValue}
        textContentType={isPassword ? 'password' : 'none'}
        secureTextEntry={isPassword}
        editable={!disabled}
        multiline = {true}
        numberOfLines = {lines}
        // defaultValue={value}
        onChangeText={handleChange}
        style={[
          styles.writeInput,
          {height:height},
          inputStyle ? inputStyle : {},
          disabled && {
            ...tailwind.opacity10,
            ...tailwind.bgGray300,
          },
        ]}
      />
    </LabelItem>
  );
});

export const WriteInputSlide = React.forwardRef(function (
  {
    label,
    style,
    value,
    inputStyle,
    LabelStyle,
    name,
    onChange,
    type,
    isPassword,
    disabled,
    lines,
    height,
    dataArr,
    memberTitle
  },
  ref,
) {
  const textRef = React.useRef();

  const [textValue, setTextValue] = React.useState();
  const [labelText, setLabelText] = React.useState();

  React.useEffect(() => {
    if (!value) {
      setTextValue('');
      return;
    }
    setTextValue(value);
    console.log('WriteInputSlide value',value);
  }, [value]);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      textRef.current.focus();
    },
    blur: () => {
      textRef.current.blur();
    },
    setValue: val => {
      setTextValue(val + '');
    },
    clear: () => {
      setTextValue('');
      onChange &&
        onChange({
          name,
          value: '',
        });
    },
    value: textValue,
    name,
  }));

  const handleChange = val => {
    console.log('val',val);
    let _val = type === 'numeric' ? val.replace(/[^\d]+/, '') : val;
    setTextValue(_val);
    onChange &&
      onChange({
        name,
        value: _val,
      });
  };

  const [pickerVisible, setPickerVisible] = React.useState(false);
  const openMadol = () => {
    console.log('打开弹窗');
    setPickerVisible(true)
  }
  cancel = () => {
    console.log('点击关闭321');
    setPickerVisible(false)
  };
  confirm = data => getLabel(data);
  const getLabel = (data) => {
    console.log('memberTitlememberTitle',memberTitle);
    try {
      if (data) {
        if (memberTitle == '主梁') {
          let labelText = data[1].name + '梁状况'
          //console.log(labelText);
          // setLabelText(labelText)
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '横隔板') {
          let labelText = data[1].name + '横隔板状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '湿接段') {
          let labelText = data[1].name + '湿接段状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '支座') {
          let labelText = data[1].name + '支座状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '铰缝') {
          let labelText = data[1].name + '铰缝状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '挂梁') {
          let labelText = data[1].name + '挂梁状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '湿接缝') {
          let labelText = data[1].name + '湿接缝状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '桥台') {
          let labelText = data[0].name + '状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '桥墩') {
          let labelText = data[0].name + '桥墩状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '墩台基础') {
          let labelText = data[0].name + '基础状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        }  else if (memberTitle == '翼墙、耳墙') {
          let labelText = data[0].name + '状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '锥坡、护坡') {
          let labelText = data[0].name + '状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '河床') {
          let labelText = data[0].name + '状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '调治构造物') {
          let labelText = data[0].name + '状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '桥面铺装') {
          let labelText = data[0].name + '状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '伸缩装置') {
          let labelText = data[0].name + '状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '人行道') {
          let labelText = data[0].name + '状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '栏杆、护栏') {
          let labelText = data[0].name + '状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '排水系统') {
          let labelText = data[0].name + '状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        } else if (memberTitle == '照明、标志') {
          let labelText = data[0].name + '状况'
          //console.log(labelText);
          setTextValue(labelText)
          handleChange(labelText)
          setPickerVisible(false)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LabelItem
      style={style}
      label={label}
      LabelStyle={LabelStyle}
      // onPress={() => textRef.current.focus()}
      onPress={() => {openMadol()}}
      >
      <RnTextInput
        ref={textRef}
        blurOnSubmit={true}
        keyboardType={type || 'default'}
        value={textValue}
        textContentType={isPassword ? 'password' : 'none'}
        secureTextEntry={isPassword}
        editable={!disabled}
        multiline = {true}
        numberOfLines = {lines}
        // defaultValue={value}
        onChangeText={handleChange}
        style={[
          styles.writeInput,
          {height:height},
          inputStyle ? inputStyle : {},
          disabled && {
            ...tailwind.opacity10,
            ...tailwind.bgGray300,
          },
        ]}
      />
      {/* 级联列表弹窗 */}
      <Modals isVisible={pickerVisible}>
        <CascadePicker 
          dataSource={dataArr}
          cancel={this.cancel}
          confirm={this.confirm}
          headOptions={{
            confirmText:'确认',
            cancelText:'取消',
            backgroundColor:'#eeeeee',
            confirmStyle:{
              color:'#2b427d',
              fontSize:16
            },
            cancelStyle:{
              color:'#2b427d',
              fontSize:16
            },
          }}
          pickerStyle={{
            activeFontColor:'#2b427d'
          }}
        />
      </Modals>
    </LabelItem>
  );
});


export const Textarea = React.forwardRef(function (
  {label, style, value, inputStyle, labelStyle, name, onChange, type, disabled},
  ref,
) {
  const textRef = React.useRef();

  const [textValue, setTextValue] = React.useState();

  React.useEffect(() => {
    if (!value) {
      setTextValue('');
      return;
    }
    setTextValue(value);
  }, [value]);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      textRef.current.focus();
    },
    blur: () => {
      textRef.current.blur();
    },
    setValue: val => {
      setTextValue(val);
    },
    clear: () => {
      setTextValue('');
      onChange &&
        onChange({
          name,
          value: '',
        });
    },
    value: textValue,
    name,
  }));

  const handleChange = val => {
    let _val = type === 'numeric' ? val.replace(/[^\d]+/, '') : val;
    setTextValue(_val);
    onChange &&
      onChange({
        name,
        value: _val,
      });
  };
  return (
    <View style={style}>
      <Text style={[tailwind.mB1, tailwind.fontBold, labelStyle]}>{label}</Text>
      <RnTextInput
        ref={textRef}
        blurOnSubmit={true}
        keyboardType={type || 'default'}
        multiline={true}
        value={textValue}
        editable={!disabled}
        onChangeText={handleChange}
        style={[
          styles.textarea,
          inputStyle ? inputStyle : {},
          disabled && {
            ...tailwind.opacity50,
            ...tailwind.bgGray300,
          },
        ]}
      />
    </View>
  );
});

export const Password = React.forwardRef(function (
  {label, style, value, inputStyle, LabelStyle, name, onChange, type, disabled},
  ref,
) {
  const textRef = React.useRef();

  const [textValue, setTextValue] = React.useState();

  const [isShow, setIsShow] = React.useState(false);

  React.useEffect(() => {
    if (!value) {
      setTextValue('');
      return;
    }
    setTextValue(value);
  }, [value]);

  React.useImperativeHandle(ref, () => ({
    focus: () => {
      textRef.current.focus();
    },
    blur: () => {
      textRef.current.blur();
    },
    setValue: val => {
      setTextValue(val + '');
    },
    clear: () => {
      setTextValue('');
      onChange &&
        onChange({
          name,
          value: '',
        });
    },
    value: textValue,
    name,
  }));

  const handleChange = val => {
    let _val = type === 'numeric' ? val.replace(/[^\d]+/, '') : val;
    setTextValue(_val);
    onChange &&
      onChange({
        name,
        value: _val,
      });
  };

  return (
    <LabelItem
      style={style}
      label={label}
      LabelStyle={LabelStyle}
      onPress={() => textRef.current.focus()}>
      <View style={[styles.password]}>
        <RnTextInput
          ref={textRef}
          blurOnSubmit={true}
          keyboardType={type || 'default'}
          value={textValue}
          textContentType={isShow ? 'none' : 'password'}
          secureTextEntry={!isShow}
          editable={!disabled}
          // defaultValue={value}
          onChangeText={handleChange}
          style={[
            styles.passwordInput,
            inputStyle ? inputStyle : {},
            disabled && {
              ...tailwind.opacity50,
              ...tailwind.bgGray300,
            },
          ]}
        />
        <TouchableOpacity onPress={() => setIsShow(!isShow)}>
          {isShow ? (
            <Icon name="eye-off" size={20} style={tailwind.mR1} />
          ) : (
            <Icon name="eye" size={20} style={tailwind.mR1} />
          )}
        </TouchableOpacity>
      </View>
    </LabelItem>
  );
});

export const KeyboardInput = React.forwardRef(
  ({label, style, LabelStyle, name, onChange, value}, ref) => {
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

    const [keyboardA, setkeyboardA] = useState([])
    const [keyboardB, setkeyboardB] = useState([])

    React.useEffect(() => {
      setTextValue(value + '');
      // console.log('keyboard',keyboard);
      let keyboardA = [
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["3", "6", "9"],
        ["~", "0", "."]
      ]
      setkeyboardA(keyboardA)

      let keyboardB = [
        ["(", "#", "+", "×"],
        [")", "k", "-", "/"],
        [, , , "%"]
      ]
      setkeyboardB(keyboardB)
    }, [value]);

    const getBtnStyle = key => {
      const _style = {
        ...tailwind.flex1,
        ...tailwind.mR6,
        marginTop:10,
        height:10,
        paddingTop:5
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

    const handleOk = () => {
      onChange &&
        onChange({
          name,
          value: textValue,
        });
      setVisible(false);
    };

    const handlModalShow = () => {
      setTextValue(value);
      setVisible(true);
    };

    return (
      <LabelItem style={style} LabelStyle={LabelStyle} label={label}>
        <TouchableWithoutFeedback onPress={handlModalShow}>
          <View style={[styles.keyboardInput]}>
            <Text style={[tailwind.textBlack]}>{value}</Text>
          </View>
        </TouchableWithoutFeedback>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => {
              textRef?.current?.blur();
              setVisible(false);
            }}
            contentContainerStyle={[styles.modal,{width:'90%'}]}>
            <TouchableWithoutFeedback onPress={() => textRef?.current?.blur()}>
              <View
                style={[
                  theme.primaryBgStyle,
                  tailwind.flex1,
                  tailwind.rounded,
                  tailwind.p2,
                  tailwind.pL8,
                ]}>
                  {/* 键盘顶部标题与页码 */}
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
                  {/* 关闭 输入框 删除 */}
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
                <View style={[tailwind.flex1, tailwind.flexRow, tailwind.mB2,]}>
                  {/* tailwind.flex1, */}
                  {/* {keyboard.map((row, index) => (
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
                  ))} */}
                  {keyboardA.map((row, index) => (
                    <View key={index} style={[tailwind.flex1, tailwind.mB4,]}>
                      {row.map(item => (
                        <Button
                          key={item}
                          onPress={() => handlePress(item)}
                          style={getBtnStyle(item)}>
                          {item}
                        </Button>
                      ))}
                    </View>
                  ))}
                  <View style={[{width:'28%'}]}></View>
                  {keyboardB.map((row, index) => (
                    <View key={index} style={[tailwind.flex1,tailwind.mB4,]}>
                      {row.map(item => (
                        <Button
                          key={item}
                          onPress={() => handlePress(item)}
                          style={[tailwind.bgRed400,
                          {marginTop:10,marginRight:10,}]}>
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
                    onPress={handleOk}>
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
  writeInput: {
    textAlignVertical: 'center',
    ...tailwind.border,
    ...tailwind.borderGray400,
    ...tailwind.roundedSm,
    ...tailwind.flex1,
    ...tailwind.textSm,
    ...tailwind.pY1,
    ...tailwind.pX2,
  },
  pressWrite: {
    textAlignVertical: 'center',
    ...tailwind.border,
    ...tailwind.borderGray400,
    ...tailwind.roundedSm,
    ...tailwind.flex1,
    ...tailwind.textSm,
    ...tailwind.pY1,
    ...tailwind.pX2,
    // height: 25,
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
    ...tailwind.flex1,
    ...tailwind.textSm,
    ...tailwind.pX2,
    paddingBottom: 1,
    height: 25,
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
  sideButton: {
    backgroundColor:'#2b427d',
    height:30,
    width:80,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.rounded,
  }
});
