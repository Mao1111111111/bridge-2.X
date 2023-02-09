import React from 'react';
import reducer from './reducer';
import {useColorScheme} from 'react-native';
import {tailwind, color} from 'react-native-tailwindcss';
const Context = React.createContext();

const Consumer = Context.Consumer;

const lightTheme = {
  primaryBgStyle: tailwind.bgWhite,
  primaryTextStyle: tailwind.textPurple700,
  primaryBtnStyle: tailwind.bgPurple700,
  primaryColor: '#2b427d',
  screenBgColor: '#f7f7f8',
  infoBgStyle: tailwind.bgGray100,
  // infoBgStyle: '#7199ff'
};

const darkTheme = {
  primaryBgStyle: {backgroundColor: '#303030'},
  primaryTextStyle: tailwind.textPurple700,
  primaryBtnStyle: tailwind.bgPurple700,
  primaryColor: '#2b427d',
  screenBgColor: '#262626',
  infoBgStyle: {backgroundColor: '#262626'},
};

// 全局的state
const Provider = props => {
  const scheme = useColorScheme();

  const [state, dispatch] = React.useReducer(reducer, {
    theme: lightTheme,
  });

  // 深色模式
  React.useEffect(() => {
    if (scheme === 'dark') {
      dispatch({type: 'theme', payload: darkTheme});
    } else {
      dispatch({type: 'theme', payload: lightTheme});
    }
  }, [scheme]);

  return (
    <Context.Provider value={{state, dispatch}}>
      {props.children}
    </Context.Provider>
  );
};

export {Context, Consumer, Provider};
