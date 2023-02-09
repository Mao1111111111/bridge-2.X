import {StyleSheet} from 'react-native';
import {tailwind} from 'react-native-tailwindcss';

export default StyleSheet.create({
  card: {
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
    ...tailwind.borderGray400,
  },
  header: {
    ...tailwind.flexRow,
    ...tailwind.pY1,
    ...tailwind.pX4,
    ...tailwind.shadowLg,
    ...tailwind.itemsCenter,
    ...tailwind.justifyBetween,
  },
  bridgeForm: {
    ...tailwind.absolute,
    ...tailwind.selfCenter,
    top: -25,
  },
  flex2: {
    flex: 2,
  },
  flex3: {
    flex: 3,
  },
  cardBtn: {
    ...tailwind.rounded,
    ...tailwind.shadow,
    ...tailwind.border,
    ...tailwind.borderGray400,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.pY6,
    ...tailwind.flex1,
  },
  inter: {
    ...tailwind.pY1,
    ...tailwind.pX2,
    ...tailwind.rounded,
    ...tailwind.border,
    ...tailwind.borderGray400,
    ...tailwind.m1,
  },
  row: {
    ...tailwind.flexRow,
    ...tailwind.flex1,
    ...tailwind.borderGray400,
    ...tailwind.borderB,
  },
  col: {
    ...tailwind.borderGray400,
    ...tailwind.borderL,
    ...tailwind.w12,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
  col2: {
    ...tailwind.borderGray400,
    ...tailwind.borderL,
  },
  textBox: {
    ...tailwind.mX4,
    ...tailwind.mT2,
    ...tailwind.mB4,
    ...tailwind.flex1,
    ...tailwind.flexGrow,
    ...tailwind.borderGray400,
    ...tailwind.border,
    ...tailwind.rounded,
    ...tailwind.p1,
  },
  textBox2: {
    ...tailwind.m2,
  },
  center: {
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
  partsEdit: {
    ...tailwind.m2,
    ...tailwind.flexGrow,
    ...tailwind.flexRow,
  },
  partsEditCard: {
    width: 300,
    ...tailwind.shadow2xl,
    ...tailwind.rounded,
    ...tailwind.borderGray400,
    ...tailwind.mR2,
    ...tailwind.p2,
  },
  partsEditTeble: {
    ...tailwind.flex1,
    ...tailwind.borderX,
    ...tailwind.borderT,
    ...tailwind.borderGray400,
  },
  partsEditTebleTitle: {
    ...tailwind.m1,
    ...tailwind.fontBold,
  },
  partsEditList: {
    ...tailwind.mB2,
    ...tailwind.flexRow,
    ...tailwind.itemsCenter,
    ...tailwind.justifyBetween,
  },
  partsEditModalContent: {
    ...tailwind.w2_5,
    ...tailwind.absolute,
    ...tailwind.selfCenter,
  },
  partsEditModalHand: {
    ...tailwind.pY2,
    ...tailwind.pX2,
    ...tailwind.flexRow,
    ...tailwind.justifyBetween,
    ...tailwind.borderB,
    ...tailwind.borderGray300,
  },
  partsEditModalFoot: {
    ...tailwind.mT4,
    ...tailwind.pY2,
    ...tailwind.pX6,
    ...tailwind.justifyBetween,
    ...tailwind.itemsCenter,
    ...tailwind.flexRow,
    ...tailwind.borderT,
    ...tailwind.borderGray300,
  },

  partsAddModalContent: {
    ...tailwind.w2_4,
    ...tailwind.absolute,
    ...tailwind.selfCenter,
  },
});
