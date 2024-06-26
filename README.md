# jianlide-android

## 技术说明
基于 [React Native](https://reactnative.dev/) 构建，支持 Android(>=4.1) 平台。 
- 路由： [react-navigation](https://reactnavigation.org/)
- 组件库：[react-native-paper](https://callstack.github.io/react-native-paper/index.html) 
- 样式库：[react-native-tailwindcss](https://tvke.github.io/react-native-tailwindcss/)，[tailwindcss文档](https://tailwindcss.com/)
- 图标库：[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)/[MaterialCommunityIcons](https://materialdesignicons.com/) 
- 数据库：[react-native-sqlite-storage](https://github.com/andpor/react-native-sqlite-storage)，[sqlite文档](https://www.sqlite.org/) 

## 前置环境要求
> 具体可参考 [React Native 官方文档的步骤](https://reactnative.dev/docs/environment-setup)

- jdk11
- Android SDK
- Android SDK Platform
- Android Virtual Device

## 依赖安装
```shell
yarn
```

## 启动 (Android平台)
```shell
// 初次执行时，会执行gradle安装依赖建议有条件开个vpn
yarn android
```

## 项目依赖说明

|Package Name|备注|
|:-:|:-:|
|react|-|
|react-native|-|
|@react-navigation/native|react-navigation核心库|
|react-native-screens|react-navigation核心库 依赖| 
|react-native-safe-area-context|react-navigation核心库 依赖|
|@react-navigation/native-stack|react-navigation stack组件|
|@react-navigation/drawer|react-navigation drawer组件|
|react-native-gesture-handler|react-navigation drawer组件依赖|
|react-native-reanimated|react-navigation drawer组件依赖(版本2.2.4)|
|@react-navigation/bottom-tabs|react-navigation bottom-tabs组件|
|react-native-fs|本地文件操作|
|react-native-image-picker|相册&相机|
|react-native-video|视频播放|
|react-native-audio-recorder-player|录音&音频播放|
|react-native-uuid|uuid 生成|
|react-native-sqlite-storage|嵌入式数据库|
|react-native-vector-icons|图标库|


## git分支说明
- master：主分支，主要使用
- bridgeCreatesCaton：（未）解决创建桥梁时，新增大量构件时卡顿的问题，解决了一半，未合并到主分支
- JXR：成员分支(主分支)
- newFormat：成员分支(主分支)
- newNavigator： 成员分支(主分支)
- main: 无用分支
- newStyle_: 新样式，未应用到正式代码 master中
- synergy_: 协同检测分支