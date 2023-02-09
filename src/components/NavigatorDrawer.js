import React from 'react';
import {View} from 'react-native';
import {tailwind} from 'react-native-tailwindcss';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Context} from '../providers/GlobalProvider';
import {Context as ThemeContext} from '../providers/ThemeProvider';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const {
    state: {drawerShowFlg},
  } = React.useContext(Context);

  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const [flg, setFlg] = React.useState();

  React.useEffect(() => {
    if (!drawerShowFlg || flg === drawerShowFlg) {
      return;
    }
    setFlg(drawerShowFlg);
    // console.info(drawerShowFlg);
    props.navigation.openDrawer();
  }, [drawerShowFlg, flg, props.navigation]);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        tailwind.flex1,
        tailwind.justifyBetween,
        theme.primaryBgStyle,
      ]}>
      <View style={[tailwind.flex1]}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

export default function NavigatorDrawer({routes}) {
  return (
    <Drawer.Navigator
      drawerType={'permanent'}
      // drawerContentOptions={{
      //   activeTintColor: colors.purple700,
      //   activeBackgroundColor: colors.purple500,
      // }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {routes.map(route => (
        <Drawer.Screen
          {...route}
          key={route.name}
          options={{
            swipeEnabled: false,
            headerShown: false,
            drawerLabel: route.title,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}
