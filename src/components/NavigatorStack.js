import React from 'react';
import {Context} from '../providers/ThemeProvider';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function NavigatorStack({routes, isModal}) {
  const {
    state: {theme},
  } = React.useContext(Context);
  return (
    <Stack.Navigator>
      {routes.map((route, index) => (
        <Stack.Screen
          key={index}
          {...route}
          style={[theme.screenBgStyle]}
          options={{headerShown: false}}
        />
      ))}
    </Stack.Navigator>
  );
}
