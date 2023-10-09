import React,{useState,useEffect} from 'react';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Easing,
  Platform,
  Text, Pressable, Image,Dimensions
} from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import {tailwind, colors} from 'react-native-tailwindcss';
import uuid from 'react-native-uuid';
import RNFS from 'react-native-fs';
import fs from '../utils/fs';
import Modal from './Modal';
import {CircleButton} from './Button';

const audioRecorderPlayer = new AudioRecorderPlayer();

export function Recording({onChange}) {
  const [audio, setAudio] = React.useState(null);

  const [isRecording, setIsRecording] = React.useState(false);

  const [radiusValue] = React.useState(new Animated.Value(0));

  const [paddingValue] = React.useState(new Animated.Value(0));

  const [recordTime, setRecordTime] = React.useState(0);

  const borderRadius = radiusValue.interpolate({
    inputRange: [0, 1],
    outputRange: [9999, 4],
    extrapolate: 'clamp',
  });

  const padding = paddingValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 7],
    extrapolate: 'clamp',
  });

  

  React.useEffect(() => {
    return () => {
      audioRecorderPlayer.stopRecorder().then(res => {});
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        audioRecorderPlayer.stopRecorder().then(res => {
          setIsRecording(false);
        });
      };
    }, []),
  );

  React.useEffect(() => {
    const value = isRecording ? 1 : 0;
    Animated.timing(radiusValue, {
      toValue: value,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    Animated.timing(paddingValue, {
      toValue: value,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isRecording, radiusValue, paddingValue]);

  const startRecording = async () => {
    setIsRecording(true);
    try {
      const UUID = uuid.v4();
      const documentDir = RNFS.DocumentDirectoryPath;
      const path = Platform.select({
        ios: 'audio.m4a',
        android: `${documentDir}/${UUID}.mp3`,
      });

      const res = await audioRecorderPlayer.startRecorder(path, {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
      });
      setAudio(res);
      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordTime(Math.floor(e.currentPosition));
        return;
      });
    } catch (err) {
      console.info('err',err);
      setIsRecording(false);
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordTime(0);
      onChange &&
        onChange({
          uri: audio,
          fileSize: (await fs.getFileInfo(audio)).size,
          duration: recordTime,
        });
    } catch (err) {
      console.info('err',err);
    } finally {
      setIsRecording(false);
    }
  };

  return (
    <View style={styles.view}>
      <Text style={[tailwind.fontBold, tailwind.textLg]}>
        {audioRecorderPlayer.mmssss(recordTime)}
      </Text>
      <Text style={[tailwind.fontBold, tailwind.textLg]}>
        {isRecording ? '录制中...' : '开始录制'}
      </Text>
      <View style={tailwind.mY1} />
      <Animated.View style={[[styles.box, {padding: padding}]]}>
        <TouchableWithoutFeedback
          onPress={isRecording ? stopRecording : startRecording}>
          <Animated.View style={[styles.btn, {borderRadius: borderRadius}]} />
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
}

export function RecordingModal({onChange, disabled}) {
  const [visible, setVisible] = React.useState(false);

  const [audioImg, setAudioImg] = useState()
  const [audioDisImg, setAudioDisImg] = useState()

  const [screenWidth,setScreenWidth] = React.useState() //屏幕宽度

  useEffect(() => {
    let audioImg = require('../iconImg/audio.png')
    setAudioImg(audioImg)
    let audioDisImg = require('../iconImg/audioDis.png')
    setAudioDisImg(audioDisImg)

    const windowWidth = Dimensions.get('window').width;
    setScreenWidth(windowWidth)
  },[])

  const audioPulldown = () => {
    let audioImg = require('../iconImg/audioPull.png')
    setAudioImg(audioImg)
  }
  const audioPullup = () => {
    let audioImg = require('../iconImg/audio.png')
    setAudioImg(audioImg)
  }

  return (
    <View>
      {/* <CircleButton
        name="microphone"
        disabled={disabled}
        onPress={() => setVisible(true)}
      /> */}
      <Pressable disabled={disabled} onPress={() => setVisible(true)}
      onPressIn={audioPulldown} onPressOut={audioPullup}>
        <Image style={
          screenWidth > 830 ? [{ height: 60, width: 60, left: 15, alignItems: 'center' }] :
          [{ height: 35, width: 35, alignItems: 'center',left:8}]
        }
          source={disabled ? audioDisImg : audioImg}
        />
      </Pressable>
      <Modal
        visible={visible}
        showHead={true}
        isNotTranslucent={true}
        dividerStyle={tailwind.mT2}
        width={300}
        height={200}
        onClose={() => setVisible(false)}>
        <View
          style={[
            tailwind.flex1,
            tailwind.justifyCenter,
            tailwind.alignCenter,
          ]}>
          {visible ? (
            <Recording
              onChange={e => {
                setVisible(false);
                onChange(e);
              }}
            />
          ) : (
            <></>
          )}
        </View>
      </Modal>
    </View>
  );
}

export function Player({audio, style}) {
  const [isPlaying, setIsPlaying] = React.useState(false);

  const [playTime, setPlayTime] = React.useState(0);

  const [duration, setDuration] = React.useState(audio?.duration || 0);

  React.useEffect(() => {
    setIsPlaying(false);
    setPlayTime(0);
    setDuration(0);
    return () => {
      audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
    };
  }, []);

  React.useEffect(() => {
    setDuration(audio?.duration || 0);
    console.info("audio",audio);
  }, [audio]);

  useFocusEffect(
    React.useCallback(() => {
      setIsPlaying(false);
      setPlayTime(0);
      setDuration(0);
      return () => {
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
        setIsPlaying(false);
        setPlayTime(0);
        setDuration(0);
      };
    }, []),
  );

  React.useEffect(() => {
    if (playTime === duration) {
      setIsPlaying(false);
    }
  }, [playTime, duration]);

  const startPlay = async () => {
    if (!audio) {
      return;
    }
    const path = Platform.select({
      android: audio.path,
    });
    await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.addPlayBackListener(e => {
      setDuration(Math.floor(e.duration));
      setPlayTime(Math.floor(e.currentPosition));
      return;
    });
    setIsPlaying(!isPlaying);
  };

  const pausePlay = async () => {
    if (!audio) {
      return;
    }
    await audioRecorderPlayer.pausePlayer();
    // audioRecorderPlayer.removePlayBackListener();
    setIsPlaying(!isPlaying);
  };

  const seekToPlayer = async e => {
    await audioRecorderPlayer.seekToPlayer(e);
  };

  return (
    <View
      style={[tailwind.justifyCenter, tailwind.bgWhite, tailwind.p2, style]}>
      <View style={[tailwind.flexRow, tailwind.itemsCenter]}>
        <TouchableOpacity
          style={[tailwind.mR2]}
          onPress={isPlaying ? pausePlay : startPlay}>
          {isPlaying ? (
            <Icon name="pause" size={24} />
          ) : (
            <Icon name="play" size={24} />
          )}
        </TouchableOpacity>
        <Text>{audioRecorderPlayer.mmssss(playTime)}</Text>
        <Slider
          style={[tailwind.flex1]}
          value={isNaN(playTime) ? 0 : playTime}
          onSlidingComplete={seekToPlayer}
          minimumValue={0}
          maximumValue={audio?.duration || 0}
          thumbTintColor={colors.purple700}
          minimumTrackTintColor={colors.purple700}
          maximumTrackTintColor="#000000"
        />
        <Text>{audioRecorderPlayer.mmssss(audio?.duration || 0)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    ...tailwind.bgWhite,
    ...tailwind.justifyEnd,
    ...tailwind.itemsCenter,
    ...tailwind.p2,
  },
  box: {
    ...tailwind.roundedFull,
    ...tailwind.h10,
    ...tailwind.w10,
    ...tailwind.relative,
    ...tailwind.border2,
    ...tailwind.borderGray400,
  },
  btn: {
    ...tailwind.bgRed700,
    ...tailwind.flex1,
  },
});
