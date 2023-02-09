import React from 'react';
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

    React.useEffect(() => {
      setTextValue(value + '');
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
});
