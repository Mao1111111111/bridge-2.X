/* 
    图片处理函数
 */
import RNImageManipulator  from 'react-native-image-manipulator';

// 图片旋转
export const rotateImage = async (imageUri) => {
    try {
      const manipulatedImage = await RNImageManipulator.manipulate(
        imageUri,
        [{ rotate: -90 }],
        { format: 'jpeg' }
      );
      return manipulatedImage.uri;
    } catch (error) {
      return null;
    }
  };