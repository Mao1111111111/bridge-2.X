import React from 'react';
import {tailwind} from 'react-native-tailwindcss';
import Video from 'react-native-video-controls';
import {useFocusEffect} from '@react-navigation/native';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function VideoPlayer({video, width, top, height}) {
  const player = React.useRef();

  const [paused, setPaused] = React.useState(true);

  const [isFullScreen, setIsFullScreen] = React.useState(false);

  const handleBuffer = () => {};

  const handleError = () => {};

  const handlePlay = () => {
    if (!video) {
      return;
    }
    // dispatch({type: 'isTabBarShow', payload: false});
    // dispatch({type: 'isFabShow', payload: false});
    setPaused(false);
    setIsFullScreen(true);
  };

  const handleBack = () => {
    // dispatch({type: 'isTabBarShow', payload: true});
    // dispatch({type: 'isFabShow', payload: true});
    setPaused(true);
    setIsFullScreen(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        // dispatch({type: 'isTabBarShow', payload: true});
        // dispatch({type: 'isFabShow', payload: true});
        setPaused(true);
        setIsFullScreen(false);
      };
    }, []),
  );

  return (
    <View
      style={[
        isFullScreen
          ? {
              ...styles.fullScreen,
              // ...screenWindow(),
              top,
              height,
              width,
            }
          : {height, width},
      ]}>
      {!isFullScreen ? (
        <TouchableOpacity
          style={[styles.playBox]}
          onPress={video && handlePlay}>
          <Icon name="play" style={tailwind.textWhite} size={50} />
        </TouchableOpacity>
      ) : (
        <></>
      )}
      {video ? (
        <Video
          ref={player}
          source={{
            uri: video,
          }}
          toggleResizeModeOnFullscreen={false}
          disableVolume={true}
          disableFullscreen={true}
          paused={paused}
          onPlay={handlePlay}
          onBack={handleBack}
          onBuffer={handleBuffer}
          onError={handleError}
          playWhenInactive={false}
          playInBackground={false}
          resizeMode="contain"
        />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  notFullScreen: {
    ...tailwind.flex1,
  },
  // fullScreen: {
  //   top: 0,
  //   left: 0,
  //   position: 'absolute',
  //   zIndex: 99999,
  // },
  playBox: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 200,
    backgroundColor: 'rgba(0,0,0,0.6)',
    ...tailwind.absolute,
    ...tailwind.justifyCenter,
    ...tailwind.itemsCenter,
  },
});
