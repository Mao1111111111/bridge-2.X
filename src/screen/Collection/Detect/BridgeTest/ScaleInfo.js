import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Modal from '../../../../components/Modal';

function ScaleInfo({info}, ref) {
  const [visible, setVisible] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
  }));

  return (
    <Modal
      pid="P1605"
      title="病害评定标准表"
      width={400}
      height={450}
      visible={visible}
      showHead
      notScroll
      onClose={() => setVisible(false)}>
      <View style={[tailwind.mX4, tailwind.mB4, styles.border, tailwind.flex1]}>
        <View style={tailwind.flexRow}>
          <View style={[styles.center, tailwind.flex1, styles.borderRB]}>
            <Text>标度</Text>
          </View>
          <View style={[styles.center, styles.flex2, styles.borderRB]}>
            <Text>定性描述</Text>
          </View>
          <View style={[styles.center, styles.flex2, styles.borderB]}>
            <Text>定量描述</Text>
          </View>
        </View>
        <FlatList
          data={info}
          renderItem={({item}) => (
            <View key={item.standardscale} style={tailwind.flexRow}>
              <View style={[styles.center, tailwind.flex1, styles.borderRB]}>
                <Text>{item.standardscale}</Text>
              </View>
              <View style={[styles.center, styles.flex2, styles.borderRB]}>
                <Text>{item.qualitative}</Text>
              </View>
              <View style={[styles.center, styles.flex2, styles.borderB]}>
                <Text>{item.standardname}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </Modal>
  );
}

export default React.forwardRef(ScaleInfo);

const styles = StyleSheet.create({
  flex2: {
    flex: 3,
  },
  center: {
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
  borderRB: {
    ...tailwind.borderR,
    ...tailwind.borderB,
    ...tailwind.borderGray400,
  },
  borderB: {
    ...tailwind.borderB,
    ...tailwind.borderGray400,
  },
  border: {
    ...tailwind.border,
    ...tailwind.borderGray400,
  },
});
