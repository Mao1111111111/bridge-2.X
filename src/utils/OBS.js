/* 
    华为云服务
 */
//配置信息
import * as ObsConfig from '../assets/OBSConfig'
import ObsClient from 'esdk-obs-browserjs/src/obs'

// ObsClient实例
const obsClient = new ObsClient({
   /*  access_key_id: 'U9XPE4OB9XJXXQ4ABZJV', // ak
    secret_access_key: 'j4kX0zwcdV7HswiHBEjhl5BXTtormJcKW5vmduEU', // sk
    server: 'https://obs.cn-north-4.myhuaweicloud.com' // endPoint */
    access_key_id: ObsConfig.ak, // ak
    secret_access_key: ObsConfig.sk, // sk
    server: ObsConfig.endPoint // endPoint
})
//桶名
//const BucketName = 'jld-test-tong'
const BucketName = ObsConfig.BucketName_storeTestData

//header
const headers = {
  'x-obs-acl': 'private'
};

// 上传
export const uploadTestDataToObs = (key,data) => 
  new Promise((resolve, reject)=>{
    obsClient.putObject({
        Bucket: BucketName, // 桶名
        Key: key, // 路径 + 文件名
        Body : data
      }, function (err, result) {
        if (err) {
          console.error('Error-->' + err)
          reject(err)
        } else {
          resolve(result);
        }
      })
  })