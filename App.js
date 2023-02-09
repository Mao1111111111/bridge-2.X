import React from 'react';
import {LogBox, StatusBar, View, StyleSheet, Image, ImageBackground, Text, Pressable} from 'react-native';
import {tailwind, colors} from 'react-native-tailwindcss';
import {ActivityIndicator, Provider as PaperProvider} from 'react-native-paper';
import {Provider as GlobalProvider} from './src/providers/GlobalProvider';
import {Provider as ThemeProvider} from './src/providers/ThemeProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Main from './src/screen/Main';
import location from './src/utils/location';
import permission from './src/utils/permission';
import {init as sqliteInit} from './src/utils/sqlite';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'If you want to use Reanimated 2 then go through our installation steps https://docs.swmansion.com/react-native-reanimated/docs/installation',
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  'Require cycle: node_modules\rn-fetch-blobindex.js -> node_modules\rn-fetch-blobpolyfillindex.js -> node_modules\rn-fetch-blobpolyfillFetch.js -> node_modules\rn-fetch-blobindex.js',
]);

function App() {
  const [isReady, setIsReady] = React.useState(false);

  const [isError, setIsError] = React.useState(false);

  // const [massage, setMassage] = React.useState('');

  React.useEffect(() => {
    (async () => {
      try {
        // 访问权限
        await permission();
        // 初始化数据库
        await sqliteInit();
        // 初始化定位监听
        location.initWatch();
        setIsReady(true);
      } catch (err) {
        setIsError(true);
        console.info(err);
      }
    })();
  }, []);

  // return <Login />;

  return isReady ? (
    <GlobalProvider>
      <ThemeProvider>
        <PaperProvider
          settings={{
            icon: props => <Icon {...props} />,
          }}>
          <ImageBackground source={require('./src/iconImg/wangge.jpg')} style={[{width:'100%', height:'100%'}]}>
            <Main />
          </ImageBackground>
        </PaperProvider>
      </ThemeProvider>
    </GlobalProvider>
  ) : !isError ? (
    <View
      style={[tailwind.flex1, tailwind.justifyCenter, tailwind.itemsCenter]}>
      <View style={[styles.loading]}>
        <ActivityIndicator
          size={50}
          animating={true}
          color={colors.purple700}
        />
      </View>
    </View>
  ) : (
    <View
      style={[tailwind.flex1, tailwind.justifyCenter, tailwind.itemsCenter]}>
      <Text>发生错误</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    ...tailwind.absolute,
    ...tailwind.wFull,
    ...tailwind.hFull,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: 200,
  },
});

export default App;
