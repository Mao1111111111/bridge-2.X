import React from 'react';
import RnCheckbox from '@react-native-community/checkbox';
import {Context as ThemeContext} from '../providers/ThemeProvider';

export default function Checkbox({checked, onPress, disabled}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  return (
    <RnCheckbox
      tintColors={{true: theme.primaryColor}}
      value={checked}
      disabled={disabled}
      onChange={onPress}
    />
  );
}
