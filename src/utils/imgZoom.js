export default function DrawImage(image, maxWidth, maxHeight) {
  // 用于设定图片的宽度和高度
  let tempWidth;
  let tempHeight;
  if (image.width > 0 && image.height > 0) {
    //原图片宽高比例 大于 指定的宽高比例，这就说明了原图片的宽度必然 > 高度
    if (image.width / image.height >= maxWidth / maxHeight) {
      if (image.width > maxWidth) {
        tempWidth = maxWidth;
        // 按原图片的比例进行缩放
        tempHeight = (image.height * maxWidth) / image.width;
      } else {
        // 按原图片的大小进行缩放
        tempWidth = image.width;
        tempHeight = image.height;
      }
    } else {
      // 原图片的高度必然 > 宽度
      if (image.height > maxHeight) {
        tempHeight = maxHeight;
        // 按原图片的比例进行缩放
        tempWidth = (image.width * maxHeight) / image.height;
      } else {
        // 按原图片的大小进行缩放
        tempWidth = image.width;
        tempHeight = image.height;
      }
    }
    return {height: tempHeight, width: tempWidth};
  }
}
