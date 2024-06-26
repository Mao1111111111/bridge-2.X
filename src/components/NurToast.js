/* 
    封装的toast组件
    使用方法:
    1、引用组件
    2、在最外层的内部使用标签 <NurToast/>
    3、使用函数调用
    DeviceEventEmitter.emit('toast', {title:'暂无照片',position:'bottom',duration:'LENGTH_SHORT'})
    1）title 提醒文字，必填
    2）position 位置，选填，bottom、center、top三个值
    3）duration 持续时间，选填，LENGTH_SHORT(2000)、LENGTH_NORMAL(3000)、LENGTH_LOG(4000) 三个值
 */
    import React, {Component} from 'react'
    import {DeviceEventEmitter, Dimensions, LayoutAnimation, Platform, Text, UIManager, View} from "react-native";
    
    const window = Dimensions.get('window');
    
    export const ToastPosition = {bottom: 8, center: 2.2, top: 1.2};
    export const DURATION = {
        LENGTH_SHORT: 2000,
        LENGTH_NORMAL: 3000,
        LENGTH_LOG: 4000,
    };
    export default class NurToast extends Component {
    
    
        /* propTypes: {
            ...ViewPropTypes,
            position: PropTypes.number,
            duration: PropTypes.number,
        }; */
    
        // 构造
        constructor(props) {
            try{
                super(props);
        
                this.toastCloseNum = 0;
                this.toastCloseNumOld = 0;
                // 初始状态
                this.state = {
                    toastR: window.width,
                    toastMessage: '',
                    position:'',
                    duration:''
                };
            }catch(e){
              console.log('NurToast-构造',e);
            }
        }
    
    
        componentDidMount() {
            try{
                this.toastListner = DeviceEventEmitter.addListener('toast', (obj) => {
                    this.showToast(obj);
                })
            }catch(e){
              console.log('NurToast-componentDidMount',e);
            }
        }
    
        componentWillUnmount() {
            try{
                this.toastListner && this.toastListner.remove();
                this.timer && clearTimeout(this.timer)
            }catch(e){
              console.log('NurToast-componentWillUnmount',e);
            }
        }
    
    
        /**
         * show toast
         * @param msj
         */
        showToast(obj) {
            try{
                let state = this.state;
                if (!state.toastR && state.toastMessage !== obj.title) {
                    this.toastCloseNum += 1;
                    //this.anim();
                    this.setState({
                        toastR: window.width,
                    });
        
                    this.timer = setTimeout(() => {
                        //this.anim();
                        this.setState({
                            toastR: window.width/2,
                            toastMessage: obj.title,
                            position:obj.position?ToastPosition[obj.position]:'',
                            duration:obj.duration?DURATION[obj.duration]:''
                        });
                    }, 300);
                    this.closeToast();
                } else if (state.toastR) {
                    this.toastCloseNum += 1;
                    //this.anim();
                    this.setState({
                        toastR: window.width/2,
                        toastMessage: obj.title,
                        position:obj.position?ToastPosition[obj.position]:'',
                        duration:obj.duration?DURATION[obj.duration]:''
                    });
                    this.closeToast();
                }
            }catch(e){
              console.log('NurToast-showToast',e);
            }
        }
    
        /**
         * toast close
         */
        closeToast() {
            try{
                this.timer = setTimeout(() => {
                    this.toastCloseNumOld += 1;
                    if (this.toastCloseNumOld === this.toastCloseNum) {
                        this.toastCloseNumOld = 0;
                        this.toastCloseNum = 0;
                        //this.anim();
                        this.setState({
                            toastR: window.width,
                        });
                    }
                }, this.state.duration || DURATION.LENGTH_SHORT);
            }catch(e){
              console.log('NurToast-closeToast',e);
            }
        }
    
        /**
         * set动画效果
         */
        anim() {
            try{
                if (Platform.OS === 'android') {
                    UIManager.setLayoutAnimationEnabledExperimental(true);
                }
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            }catch(e){
              console.log('NurToast-anim',e);
            }
        }
    
    
        render() {
            return <View style={
                (this.toastCloseNumOld==0&&this.toastCloseNum==0)?
                {
                    backgroundColor: 'black',
                    minWidth: 100,
                    paddingRight: 10,
                    paddingLeft: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                /*  marginRight: 20, */
                    minHeight: 30,
                    borderRadius:5,
                    /* borderBottomRightRadius: 50,
                    borderTopRightRadius: 50, */
                    position: 'absolute',
                    justifyContent: 'center',
                    right: this.state.toastR,
                    /* right: this.state.toastR, */
                    alignItems: 'center',
                    opacity: 0.8,
                    bottom: (window.height / (this.props.position || ToastPosition.bottom)),
                }:{
                    backgroundColor: 'black',
                    minWidth: 100,
                    paddingRight: 10,
                    paddingLeft: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                /*  marginRight: 20, */
                    minHeight: 30,
                    borderRadius:5,
                    /* borderBottomRightRadius: 50,
                    borderTopRightRadius: 50, */
                    position: 'absolute',
                    justifyContent: 'center',
                    
                    /* right: this.state.toastR, */
                    alignItems: 'center',
                    opacity: 0.8,
                    bottom: (window.height / (this.state.position || ToastPosition.bottom)),
                }
        }>
    
                <Text style={{
                    color: 'white',
                    fontSize: 16,
                    backgroundColor: 'transparent',
                }}>{this.state.toastMessage}</Text>
    
            </View>
        }
    }