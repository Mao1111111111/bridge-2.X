import React from 'react';
import {TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {tailwind} from 'react-native-tailwindcss';
import {View, Text, StyleSheet} from 'react-native';
import {Context as ThemeContext} from '../providers/ThemeProvider';

export function RadioGroup({label, values, name, value, onChange, type}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [val, setVal] = React.useState('');

  React.useEffect(() => {
    setVal(value);
  }, [value]);

  const handleChange = item => {
    setVal(item.value);
    onChange &&
      onChange({
        name,
        value: item.value,
      });
  };

  return (
    <View style={styles.box}>
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View
        style={[
          type === 'col' ? tailwind.flexCol : tailwind.flexRow,
          tailwind.pR12,
          tailwind.flexWrap,
        ]}
      >
        {values.map(item => (
          <TouchableOpacity
            onPress={() => handleChange(item)}
            style={styles.radioBox}
            key={item.value}
          >
            <RadioButton
              value={item.value}
              color={theme.primaryColor}
              onPress={() => handleChange(item)}
              status={val === item.value ? 'checked' : 'unchecked'}
            />
            <Text>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export function Radio({checked, onChange, label, value}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  return (
    <View style={styles.radioBox}>
      <RadioButton
        value={value}
        color={theme.primaryColor}
        onPress={() => onChange && onChange(value)}
        status={checked}
      />
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    ...tailwind.flexRow,
  },
  radioBox: {
    ...tailwind.flexRow,
    ...tailwind.itemsCenter,
  },
  label: {
    ...tailwind.mR2,
    ...tailwind.fontBold,
    marginTop: 8.5,
  },
});
