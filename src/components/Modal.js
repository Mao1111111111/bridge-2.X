import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {tailwind} from 'react-native-tailwindcss';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import screenWindow from '../utils/screenWindow';
import {Context as ThemeContext} from '../providers/ThemeProvider';
import {Context as GlobalContext} from '../providers/GlobalProvider';
import Pid from './Pid';
import { FlatList } from 'native-base';

const ModalView = ({notScroll, children}) => {
  return notScroll ? children : <ScrollView>{children}</ScrollView>;
};

export default function ({
  visible,
  title,
  pid,
  notScroll,
  showHead,
  width,
  dividerStyle,
  height,
  onClose,
  children,
  keyboardVerticalOffset
}) {
  const {
    state: {theme},
  } = React.useContext(ThemeContext);

  const {
    state: {screen},
  } = React.useContext(GlobalContext);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={'padding'} style={tailwind.flex1} keyboardVerticalOffset={keyboardVerticalOffset?keyboardVerticalOffset:0}>
          <ModalView notScroll={notScroll}>
            <View style={[styles.modal, screen]}>
              <View style={[tailwind.flex1, tailwind.flexRow]}>
                <View style={tailwind.flexGrow} />
                <View
                  style={[styles.card, theme.primaryBgStyle, {width, height}]}>
                  {showHead ? (
                    <>
                      <View style={styles.head}>
                        <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
                          {/* 模态框标题 */}
                          <Text style={[tailwind.textBase, tailwind.fontBold]}>
                            {title}
                          </Text>
                          {pid ? (
                            <View style={styles.pid}>
                              <Pid pid={pid} />
                            </View>
                          ) : (
                            <></>
                          )}
                        </View>
                        <TouchableOpacity onPress={onClose}>
                          <Icon name="close" size={24} />
                        </TouchableOpacity>
                      </View>
                      {dividerStyle ? (
                        <Divider style={[dividerStyle]} />
                      ) : (
                        <Divider style={[tailwind.mY2]} />
                      )}
                    </>
                  ) : (
                    <></>
                  )}

                  {children}
                </View>
                <View style={tailwind.flexGrow} />
              </View>
            </View>
          </ModalView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    ...tailwind.flex1,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.flexRow,
    ...tailwind.relative,
    backgroundColor: 'rgba(0,0,0,0.6)',
    // ...screenWindow(),
  },
  card: {
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
  },
  head: {
    ...tailwind.mT2,
    ...tailwind.mX4,
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
  },
  pid: {
    ...tailwind.mL2,
    ...tailwind.justifyCenter,
  },
});
