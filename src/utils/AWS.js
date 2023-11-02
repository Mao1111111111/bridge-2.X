/* 
    云操作
 */
//AWS配置
import { BaseAWSConfig } from '../assets/uploadConfig/AWSConfig'
//引入亚马逊的sdk，用于调用紫光云的api
// var AWS = require('aws-sdk/dist/aws-sdk-react-native')
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: BaseAWSConfig.accessKeyId ,
    secretAccessKey: BaseAWSConfig.secretAccessKey ,
    endpoint: BaseAWSConfig.endpoint
})

//上传数据
export const S3Upload = (bucketParams) => {
    try{
        return new Promise((resolve, reject) => {
            s3.upload(bucketParams,function(err, data){
                if(err){
                    reject(err)
                }else{
                    resolve(data);
                }
            })
        })
    }catch(e){
      console.log('上传数据-S3Upload',e);
    }
}

//上传数据
export const S3PutObject = (bucketParams) => {
    try{
        return new Promise((resolve, reject) => {
            s3.putObject(bucketParams,function(err, data){
                if(err){
                    reject(err)
                }else{
                    resolve(data);
                }
            })
        })
    }catch(e){
      console.log('上传数据-S3Upload',e);
    }
}

// 获取桶中图片数量
export const S3GetNumofBucket = (params) => {
    try{
        return new Promise((resolve, reject) => {
            //var params = {Bucket: 'luxian2022'};
            s3.listObjects(params,function(err,data){
                if(err){
                    reject(err)
                }else{
                    resolve(result);
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