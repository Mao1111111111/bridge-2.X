/* 
    华为云服务
 */
//配置信息
import * as ObsConfig from '../assets/uploadConfig/OBSConfig'
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

// 上传图片
export const uploadImageToObs = (key,file) => {
  // --接口获取上传参数
  // 参数
  let obsUploadParams = {acl: 'public-read', 'content-type': 'image/jpeg'+file.type};
  // 请求sdk
  var postObjectResult = obsClient.createPostSignatureSync({Bucket : BucketName, Key : key,Expires:3600,obsUploadParams});

  // --拼接form
  let form = new FormData()
  form.append('AccessKeyID',ObsConfig.ak);
  form.append('policy',postObjectResult.Policy);
  form.append('signature',postObjectResult.Signature);
  form.append('content-type','image/'+file.type);
  form.append('key', key);
  form.append('file', {uri: file.filePath, type: 'application/octet-stream', name: key});

  // 接口上传
  fetch(OBSHost, {
    method: 'POST',
    header: {
      'content-type': 'multipart/form-data'
    },
    body:form
  })
    .then(res => console.log(res))
      .catch(e=>console.log(e));
}