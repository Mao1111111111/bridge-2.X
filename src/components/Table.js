import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {DataTable, ActivityIndicator} from 'react-native-paper';
import {tailwind, colors} from 'react-native-tailwindcss';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Context} from '../providers/ThemeProvider';
import Select from './Select';

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

    // ---跳转页码
    // 页码列表
    const [pageList,setPageList] = useState([])
    // 处理页码列表
    useEffect(()=>{
      let list = []
      for(let i=1;i<numberOfPages+1;i++){
        list.push({
          name:i,
          value:i
        })
      }
      setPageList(list)
    },[numberOfPages])


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
            {/* <View>
              <Text style={{fontSize:12}}>跳至
              <Select
                labelName="name"
                valueName="value"
                values={pageList}
                value={pageNo + 1}
                onChange={handleChange}
                inputStyle={{height:15}}
              />
              页</Text>
            </View> */}
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

    const {
      state: {theme},
    } = React.useContext(Context);
    // 第${pageNo + 1}页 共${numberOfPages}页 ${total}条数据

    const getItem = () => {
      console.log('numberOfPages',numberOfPages);
      const list = [];
      const len = numberOfPages > 2 ? 2 : numberOfPages;
      for (let inx = 1; inx <= len; inx++) {
        console.log('inx',inx);
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
        <TouchableOpacity onPress={prev} style={[styles.paginationBtn,{width:60}]}>
          <Icon name="chevron-left" size={15} />
        </TouchableOpacity>
        <View style={tailwind.mX1} />
        {/* {hideItem ? <></> : getItem()} */}
        {/* {numberOfPages > 2 ? (
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
        )} */}
        <View style={[styles.paginationBtn]}>
          <Text
          style={[{display:'flex',justifyContent:'center',alignItems:'center'}]}>
            { pageNo }
          </Text>
        </View>
        
        {/* <View style={[styles.paginationBtn, tailwind.itemsCenter]}>
          <Text>{ pageNo }</Text>
        </View> */}
        <View style={tailwind.mX1} />
        <TouchableOpacity onPress={next} style={[styles.paginationBtn,{width:60}]}>
          <Icon name="chevron-right" size={15} />
        </TouchableOpacity>
        <View style={tailwind.mX1} />
        <View style={[styles.paginationBtn,{width:50}]}>
          <Text>共{ numberOfPages }页</Text>
        </View>
        
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
    // ...tailwind.w5,
    ...tailwind.w10, // 表格页码加宽
    // ...tailwind.h5,
    ...tailwind.h7, // 表格页码加高
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
});
