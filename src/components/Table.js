import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {DataTable, ActivityIndicator} from 'react-native-paper';
import {tailwind, colors} from 'react-native-tailwindcss';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Context} from '../providers/ThemeProvider';

export default {
  Box: ({
    loading,
    numberOfPages,
    pageNo,
    total,
    onPageChange,
    children,
    header,
    style,
  }) => {
    const {
      state: {theme},
    } = React.useContext(Context);
    return (
      <Grid style={style ? [styles.box, style] : [styles.box]}>
        {loading ? (
          <View style={[styles.loading]}>
            <ActivityIndicator
              size={50}
              animating={true}
              color={colors.purple700}
            />
          </View>
        ) : (
          <></>
        )}
        {header}
        <Row size={90}>
          <Col>{children}</Col>
        </Row>
        {numberOfPages ? (
          <Row size={10} style={[styles.foot, theme.infoBgStyle]}>
            {/* {foot ? foot : <></>} */}
            {numberOfPages ? (
              <DataTable.Pagination
                page={pageNo}
                numberOfPages={numberOfPages}
                onPageChange={onPageChange}
                label={`第${pageNo + 1}页 共${numberOfPages}页 ${total}条数据`}
                showFastPagination
              />
            ) : (
              <></>
            )}
          </Row>
        ) : (
          <></>
        )}
      </Grid>
    );
  },
  Header: ({children}) => {
    const {
      state: {theme},
    } = React.useContext(Context);
    return <Row style={[styles.header, theme.infoBgStyle]}>{children}</Row>;
  },
  Title: ({title, flex, children}) => {
    return (
      <Col style={[{flex: flex || 1}, styles.call]}>
        {title ? <Text style={[styles.headerText]}>{title}</Text> : children}
      </Col>
    );
  },
  Row: ({onPress, children, style}) => (
    <TouchableOpacity>
      <Row
        style={
          style
            ? [tailwind.flex1, styles.row, ...style]
            : [tailwind.flex1, styles.row]
        }
        onPress={onPress}>
        {children}
      </Row>
    </TouchableOpacity>
  ),
  Cell: ({flex, children, notText}) => {
    return (
      <Col style={[{flex: flex || 1}, styles.call]}>
        {notText ? children : <Text style={styles.colText}>{children}</Text>}
      </Col>
    );
  },
  Pagination: ({
    style,
    pageNo,
    onPageChange,
    numberOfPages,
    hideItem,
    pageShow,
  }) => {
    // 第${pageNo + 1}页 共${numberOfPages}页 ${total}条数据

    const getItem = () => {
      const list = [];
      const len = numberOfPages > 4 ? 4 : numberOfPages;
      for (let inx = 1; inx <= len; inx++) {
        list.push(
          <React.Fragment key={inx}>
            <TouchableOpacity
              onPress={() => onPageChange(inx)}
              style={[
                styles.paginationBtn,
                pageNo === inx
                  ? {
                      ...tailwind.bgPurple700,
                      ...tailwind.borderPurple700,
                    }
                  : {},
              ]}>
              <Text style={pageNo === inx ? tailwind.textWhite : {}}>
                {inx}
              </Text>
            </TouchableOpacity>
            <View style={tailwind.mX1} />
          </React.Fragment>,
        );
      }
      return list;
    };

    const next = () => {
      if (pageNo < numberOfPages) {
        onPageChange(pageNo + 1);
      }
    };

    const prev = () => {
      if (pageNo > 1) {
        onPageChange(pageNo - 1);
      }
    };

    return (
      <View
        style={[tailwind.flexRow, tailwind.justifyEnd, tailwind.mT2, style]}>
        <TouchableOpacity onPress={prev} style={styles.paginationBtn}>
          <Icon name="chevron-left" size={15} />
        </TouchableOpacity>
        <View style={tailwind.mX1} />
        {hideItem ? <></> : getItem()}
        {numberOfPages > 4 ? (
          <>
            <React.Fragment>
              <TouchableOpacity
                onPress={() => onPageChange(numberOfPages)}
                style={[styles.paginationBtn, tailwind.itemsCenter]}>
                <Text>...</Text>
              </TouchableOpacity>
              <View style={tailwind.mX1} />
            </React.Fragment>
          </>
        ) : (
          <></>
        )}
        <TouchableOpacity onPress={next} style={styles.paginationBtn}>
          <Icon name="chevron-right" size={15} />
        </TouchableOpacity>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  loading: {
    ...tailwind.absolute,
    ...tailwind.wFull,
    ...tailwind.hFull,
    ...tailwind.justifyCenter,
    backgroundColor: 'rgba(255,255,255,0.6)',
    zIndex: 200,
  },
  call: {
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
    ...tailwind.flexRow,
    ...tailwind.borderGray400,
    borderWidth: 0.5,
  },
  headerText: {
    ...tailwind.textXs,
    ...tailwind.fontBold,
  },
  colText: {
    ...tailwind.textXs,
  },
  row: {
    height: 35,
  },
  box: {
    ...tailwind.borderGray400,
    borderWidth: 0.5,
  },
  header: {
    ...tailwind.h6,
  },
  foot: {
    ...tailwind.justifyEnd,
    ...tailwind.itemsCenter,
    // ...tailwind.p2,
  },
  paginationBtn: {
    ...tailwind.rounded,
    ...tailwind.border,
    ...tailwind.borderGray400,
    ...tailwind.w5,
    ...tailwind.h5,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
});
