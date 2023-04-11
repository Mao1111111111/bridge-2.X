import React from 'react';
import reducer from './reducer';
import {useColorScheme} from 'react-native';
import {tailwind, color} from 'react-native-tailwindcss';
const Context = React.createContext();

// 消费者
const Consumer = Context.Consumer;

// 浅色配置
const lightTheme = {
  // 默认背景样式 -- 白色背景
  primaryBgStyle: tailwind.bgWhite,
  // 默认文字样式 -- 文字紫色
  primaryTextStyle: tailwind.textPurple700,
  // 默认按钮样式 -- 背景紫色
  primaryBtnStyle: tailwind.bgPurple700,
  // 默认颜色
  primaryColor: '#2b427d',
  // 屏幕背景色 
  screenBgColor: '#f7f7f8',
  // 信息背景色 -- 灰色，主要用于表头表尾
  infoBgStyle: tailwind.bgGray100,
  // infoBgStyle: '#7199ff'
};

// 深色配置
const darkTheme = {
  // 默认背景样式
  primaryBgStyle: {backgroundColor: '#303030'},
  // 默认文字样式 -- 文字紫色
  primaryTextStyle: tailwind.textPurple700,
  // 默认按钮样式 -- 背景紫色
  primaryBtnStyle: tailwind.bgPurple700,
  // 默认颜色
  primaryColor: '#2b427d',
  // 屏幕背景色 
  screenBgColor: '#262626',
  // 信息背景色 
  infoBgStyle: {backgroundColor: '#262626'},
};

// 全局的state
const Provider = props => {
  // 颜色方案 hook
  const scheme = useColorScheme();

  const [state, dispatch] = React.useReducer(reducer, {
    // 默认浅色主题
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
