/* 
    云操作
 */
//AWS配置
import { BaseAWSConfig } from '../assets/AWSConfig'
//引入亚马逊的sdk，用于调用紫光云的api
var AWS = require('aws-sdk/dist/aws-sdk-react-native')

//s3对象
const s3 = new AWS.S3({
    accessKeyId: BaseAWSConfig.accessKeyId ,
    secretAccessKey: BaseAWSConfig.secretAccessKey ,
    endpoint: BaseAWSConfig.endpoint ,
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
})

//上传数据
export const S3Upload = (bucketParams) => {
    try{
        return new Promise((resolve, reject) => {
            s3.putObject(bucketParams,function(err, data){
                if(err){
                    reject(err)
                }else{
                    resolve(result);
                }
            })
        })
    }catch(e){
      console.log('上传数据-S3Upload',e);
    }
}

//获取桶中图片数量
export const S3GetNumofBucket = (params) => {
    try{
        return new Promise((resolve, reject) => {
            //var params = {Bucket: 'luxian2022'};
            s3.listObjects(params,function(err,data){
                if(err){
                    let res = {
                        state:false,
                        err:err
                    }
                    resolve(res)
                }else{
                    let res = {
                        state:true,
                        num:data.Contents.length
                    }
                    resolve(res)
                }
            })
        })
    }catch(e){
      console.log('获取桶中图片数量-S3GetNumofBucket',e);
    }
}

//获取aws中的文件
export const S3GetFile = (bucketParams) => {
    try{
        return new Promise((resolve, reject) => {
            s3.getObject(bucketParams,function(err, data){
                if(err){
                    console.log("err",err);
                    let res = {
                        state:false,
                        err:err
                    }
                    resolve(res)
                }else{
                    console.log("data",data);
                    let res = {
                        state:true,
                        data:data
                    }
                    resolve(res)
                }
            })
        })
    }catch(e){
      console.log('上传数据-S3Upload',e);
    }
}