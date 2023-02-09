import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  PanResponder,
  StyleSheet,
  Easing,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {tailwind} from 'react-native-tailwindcss';
import {Context} from '../providers/GlobalProvider';

const MenuItem = props => {
  return props.isHidden ? (
    <TouchableHighlight
      style={[
        styles.bollItem,
        styles.circle,
        ...props.style,
        tailwind.opacity0,
      ]}>
      <View
        style={[
          styles.circle,
          styles.bollItemChild,
          {
            transform: [{rotateY: props.isLeft ? '0deg' : '180deg'}],
          },
        ]}>
        <Text style={[tailwind.textWhite]}>
          {props.label ? props.label : 'TEXT'}
        </Text>
      </View>
    </TouchableHighlight>
  ) : (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.bollItem, styles.circle, ...props.style]}>
      <View
        style={[
          styles.circle,
          styles.bollItemChild,
          {
            transform: [{rotateY: props.isLeft ? '0deg' : '180deg'}],
          },
        ]}>
        {props.isIcon ? (
          <Icon name={props.label} style={[tailwind.textWhite]} size={24} />
        ) : (
          <Text style={[tailwind.textWhite]}>
            {props.label ? props.label : 'TEXT'}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const Menu = React.forwardRef(({isLeft}, ref) => {
  const {
    state: {isTabBarShow, FABItem},
    dispatch,
  } = React.useContext(Context);

  const [isOpen, setIsOpen] = React.useState(false);

  const [items, setItems] = React.useState([]);

  const [menuOpacity] = React.useState(new Animated.Value(0));

  const [menuWH] = React.useState(new Animated.ValueXY(0, 0));

  const baseItem = [
    // {
    //   label: '侧栏',
    //   onPress: () =>
    //     dispatch({type: 'drawerShowFlg', payload: drawerShowFlg + 1}),
    // },
    {
      label: isTabBarShow ? 'arrow-down-bold' : 'arrow-up-bold',
      isIcon: true,
      onPress: () => dispatch({type: 'isTabBarShow', payload: !isTabBarShow}),
    },
  ];

  const opacity = menuOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const height = menuWH.y.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
    extrapolate: 'clamp',
  });

  const width = menuWH.x.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 130],
    extrapolate: 'clamp',
  });

  React.useEffect(() => {
    if (!FABItem || !FABItem.length) {
      setItems([]);
      return;
    }
    const _FABItem = FABItem.slice(0, FABItem.length > 5 ? 5 : FABItem.length);
    setItems(_FABItem);
  }, [FABItem]);

  React.useImperativeHandle(ref, () => ({
    toggle: () => {
      const value = isOpen ? 0 : 1;
      Animated.timing(menuOpacity, {
        toValue: value,
        duration: 100,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(menuWH.x, {
          toValue: value,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
        Animated.timing(menuWH.y, {
          toValue: value,
          duration: 50,
          easing: Easing.linear,
          useNativeDriver: false,
        }).start();
      });
      setIsOpen(!isOpen);
      return !isOpen;
    },
  }));

  const getItem = () => {
    const _items = items.concat(baseItem);
    const itemsElement = [];
    for (let inx = 0; inx <= 6; inx++) {
      itemsElement.push(
        <MenuItem
          key={inx}
          style={[styles[`bollItem${inx + 1}`]]}
          isHidden={!_items[inx]}
          isLeft={isLeft}
          isIcon={_items[inx] ? _items[inx].isIcon : false}
          label={_items[inx] ? _items[inx].label : ''}
          onPress={_items[inx] ? _items[inx].onPress : null}
        />,
      );
    }
    return itemsElement;
  };

  return (
    <Animated.View
      style={[
        [
          styles.boll,
          {
            transform: [{translateX: -10}],
          },
          {...(isLeft ? styles.bollLeft : styles.bollRight)},
          {
            opacity,
            height: height,
            width: width,
          },
        ],
      ]}>
      {/* <View
        style={[
          tailwind.absolute,
          tailwind.bgBlack,
          tailwind.wFull,
          tailwind.h1,
        ]}
      />
      <View
        style={[
          tailwind.absolute,
          tailwind.bgBlack,
          tailwind.w1,
          tailwind.hFull,
          {right: 2, zIndex: 3000},
        ]}
      />
      <View
        style={[
          tailwind.absolute,
          tailwind.bgBlack,
          tailwind.w1,
          tailwind.hFull,
          {right: 46, zIndex: 3000},
        ]}
      />
      <View
        style={[
          tailwind.absolute,
          tailwind.bgBlack,
          tailwind.w1,
          tailwind.hFull,
          {right: 90, zIndex: 3000},
        ]}
      /> */}
      {getItem()}
    </Animated.View>
  );
});

export default function FAB() {
  const menuRef = React.useRef();

  const [animatedValue, setAnimatedValue] = React.useState(
    new Animated.ValueXY(),
  );

  const [panResponder, setPanResponder] = React.useState({});

  const [value, setValue] = React.useState({x: 0, y: 0});

  const [window, setWindow] = React.useState({});
  const {
    state: {isFabShow},
  } = React.useContext(Context);

  React.useEffect(() => {
    const {width, height} = Dimensions.get('window');
    setWindow({width, height});
    const _animatedValue = new Animated.ValueXY();
    let _value = {x: 0, y: 0};
    let oldValue = {x: 0, y: 0};
    _animatedValue.addListener(state => {
      _value = state;
      setValue(state);
    });
    // 处理元素溢出
    const getValue = val => {
      let x = val.x;
      if (val.x > width - 50) {
        x = width - 50;
      } else if (val.x < 0) {
        x = 0;
      }
      let y = val.y;
      if (val.y > height - 120) {
        y = height - 120;
      } else if (val.y < 0) {
        y = 0;
      }
      return {x, y};
    };
    // 处理展开时元素溢出
    const getValue2 = val => {
      let x = val.x;
      if (val.x > width - 60) {
        x = width - 60;
      } else if (val.x < 0) {
        x = 0;
      }
      let y = val.y;
      // if (val.y > height - 270) {
      //   y = val.y;
      // } else if (val.y <= 70) {
      //   y = 70;
      // }
      return {x, y};
    };
    setPanResponder(
      PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
        onMoveShouldSetPanResponder: (evt, gestureState) => false,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
        onPanResponderGrant: (e, gestureState) => {
          _animatedValue.setOffset({x: _value.x, y: _value.y});
          oldValue = {x: gestureState.dx, y: gestureState.dy};
        },
        onPanResponderMove: Animated.event(
          [null, {dx: _animatedValue.x, dy: _animatedValue.y}],
          {
            useNativeDriver: false,
          },
        ),
        onPanResponderRelease: (evt, gestureState) => {
          _animatedValue.flattenOffset();
          const x = gestureState.dx - oldValue.x;
          const y = gestureState.dy - oldValue.y;
          if (x < 6 && x > -6 && y < 6 && y > -6) {
            const isOpen = menuRef.current.toggle();
            if (isOpen) {
              _animatedValue.setValue(getValue2(_value));
            }
          } else {
            _animatedValue.setValue(getValue(_value));
          }
        },
      }),
    );
    // 初始位置
    _animatedValue.setValue({x: (width / 100) * 88, y: (height / 100) * 65});
    setAnimatedValue(_animatedValue);
  }, []);

  return (
    <Animated.View
      style={[
        [styles.mainBox, styles.circle, isFabShow ? {} : {opacity: 0}],
        {
          transform: [
            {translateX: animatedValue.x},
            {translateY: animatedValue.y},
          ],
        },
      ]}
      {...panResponder.panHandlers}>
      <Menu ref={menuRef} isLeft={value.x > window.width / 2} />
      <Icon name="menu" size={24} style={tailwind.textWhite} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  circle: {
    ...tailwind.roundedFull,
  },
  mainBox: {
    ...tailwind.bgPurple700,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.absolute,
    ...tailwind.w12,
    ...tailwind.h12,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1.5,
  },
  boll: {
    position: 'absolute',
    borderTopLeftRadius: 9999,
    borderBottomLeftRadius: 9999,
    // ...tailwind.bgBlue900,
    ...tailwind.absolute,
    ...tailwind.justifyCenter,
    ...tailwind.overflowHidden,
  },
  bollLeft: {
    left: -70,
  },
  bollRight: {
    left: 0,
    transform: [{rotateY: '180deg'}],
  },
  bollItem: {
    position: 'relative',
    ...tailwind.h10,
    ...tailwind.w10,
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 1.5,
    ...tailwind.flexRow,
    ...tailwind.itemsCenter,
    ...tailwind.justifyCenter,
  },
  bollItemChild: {
    ...tailwind.bgPurple700,
    ...tailwind.h10,
    ...tailwind.w10,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
  bollItem1: {
    transform: [{translateX: 84}, {translateY: 50}],
  },
  bollItem2: {
    transform: [{translateX: 40}, {translateY: 25}],
  },
  bollItem3: {
    transform: [{translateX: 10}, {translateY: 19}],
  },
  bollItem4: {
    transform: [{translateX: 10}, {translateY: 23}],
  },
  bollItem5: {
    transform: [{translateX: 40}, {translateY: 15}],
  },
  bollItem6: {
    transform: [{translateX: 84}, {translateY: -10}],
  },
});
