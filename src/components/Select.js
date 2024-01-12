import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {tailwind} from 'react-native-tailwindcss';
import LabelItem from './LabelItem';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Select = React.forwardRef(function (props, ref) {
  const [pickerValue, setPickerValue] = React.useState('');

  const [hlightStyle, setHlightStyle] = React.useState({});

  const [valueList, setValueList] = React.useState([]);

  const pickerRef = React.useRef();

  const {
    label,
    labelName,
    valueName,
    style,
    inputStyle,
    LabelStyle,
    values,
    name,
    onChange,
    value,
    disabled,
  } = props;

  React.useImperativeHandle(ref, () => ({
    value: pickerValue,
    setValue: e => setPickerValue(e),
    clear: () => {
      const item = values[0] || {};
      setPickerValue(item[valueName || 'value']);
      onChange &&
        onChange(
          {
            name,
            value: item[valueName || 'value'],
            ...item,
          } || {},
        );
    },
    name,
  }));

  React.useEffect(() => {
    if (values && values.length) {
      setValueList(values);
      const defaultValue = values.find(({isDefault}) => isDefault === 1);
      if (defaultValue && !value) {
        setPickerValue(defaultValue[valueName || 'value']);
      } else if (value) {
        setPickerValue(value);
      } else {
        setPickerValue(values[0][valueName || 'value']);
      }
    }
  }, [values, value, valueName]);

  const handleChange = val => {
    setPickerValue(val);
    onChange &&
      onChange({
        name,
        ...values?.find(item => item[valueName || 'value'] === val),
        value: val,
      });
  };

  const handleBlur = () => {
    setHlightStyle({});
  };

  const handleFocus = () => {
    setHlightStyle(tailwind.textPurple700);
  };

  const getLabel = () => {
    const item =
      values?.find(it => it[valueName || 'value'] === pickerValue) || {};
    return item[labelName || 'label'];
  };

  return (
    <LabelItem
      style={style}
      label={label}
      LabelStyle={LabelStyle}
      onPress={() => pickerRef.current.focus()}>
      <View
        style={[
          styles.input,
          inputStyle ? inputStyle : {},
          disabled && {
            ...tailwind.opacity50,
            ...tailwind.bgGray300,
          },
        ]}>
        <View style={styles.showText}>
          <Text
            numberOfLines={1}
            style={[tailwind.textSm, tailwind.flex1,{color:'#8e8e8e',marginLeft:5}]}>
            {getLabel()}
          </Text>
          {/* <Icon name="menu-down" size={20} style={tailwind.selfCenter} /> */}
        </View>
        <Picker
          ref={pickerRef}
          style={styles.select}
          onBlur={handleBlur}
          onFocus={handleFocus}
          enabled={!disabled}
          mode={Picker.MODE_DIALOG}
          selectedValue={pickerValue}
          onValueChange={handleChange}>
          {valueList &&
            valueList.map(item => (
              <Picker.Item
                key={item[valueName || 'value']}
                style={
                  pickerValue === item[valueName || 'value'] ? hlightStyle : {}
                }
                label={item[labelName || 'label']}
                value={item[valueName || 'value']}
              />
            ))}
        </Picker>
      </View>
    </LabelItem>
  );
});

export default Select;

const styles = StyleSheet.create({
  input: {
    ...tailwind.border,
    ...tailwind.borderGray400,
    ...tailwind.roundedSm,
    ...tailwind.flex1,
    ...tailwind.h8,
    ...tailwind.justifyCenter,
    ...tailwind.relative,
    // height: 25,
    height: 40,
  },
  select: {
    paddingHorizontal: 0,
    marginHorizontal: 0,
    horizontal: 0,
    opacity: 0,
  },
  showText: {
    ...tailwind.absolute,
    ...tailwind.wFull,
    ...tailwind.pX2,
    ...tailwind.flexRow,
  },
});
