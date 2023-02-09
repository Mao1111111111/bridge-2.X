import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

export default {
  remove: async path => {
    await RNFS.unlink(path);
  },
  write: async (path, data, type) => {
    await RNFS.writeFile(path, data, type);
  },
  copyFile: async (path, to) => {
    await RNFS.copyFile(path, to);
  },
  getFileInfo: async path => {
    return await RNFS.stat(path);
  },
  getBase64: async path => RNFS.readFile(path, 'base64'),
  // readFile: async path => RNFS.readFile(path, 'utf8'),
  getFileType: path => {
    RNFS.S;
    return path.split('.').pop();
  },
  mkdir: async path => {
    await RNFS.mkdir(path);
  },
  readStream: async path => {
    return RNFetchBlob.wrap(path);
  },
  dir: RNFS.DocumentDirectoryPath,
};
