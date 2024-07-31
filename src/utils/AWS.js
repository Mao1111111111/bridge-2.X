/* 
    云操作
 */
//AWS配置
import { BaseAWSConfig } from '../assets/uploadConfig/AWSConfig'
//引入亚马逊的sdk，用于调用紫光云的api
// var AWS = require('aws-sdk/dist/aws-sdk-react-native')
import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';

const s3 = new AWS.S3({
    accessKeyId: BaseAWSConfig.accessKeyId,
    secretAccessKey: BaseAWSConfig.secretAccessKey,
    endpoint: BaseAWSConfig.endpoint
})

//上传数据
export const S3Upload = (bucketParams) => {
    try {
        return new Promise((resolve, reject) => {
            s3.upload(bucketParams, function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data);
                }
            })
        })
    } catch (e) {
        console.log('上传数据-S3Upload', e);
    }
}

//上传数据
export const S3PutObject = (bucketParams) => {
    try {
        return new Promise((resolve, reject) => {
            s3.putObject(bucketParams, function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(data);
                }
            })
        })
    } catch (e) {
        console.log('上传数据-S3Upload', e);
    }
}

// 获取桶中图片数量
export const S3GetNumofBucket = (params) => {
    try {
        return new Promise((resolve, reject) => {
            //var params = {Bucket: 'luxian2022'};
            s3.listObjects(params, function (err, data) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result);
                }
            })
        })
    } catch (e) {
        console.log('获取桶中图片数量-S3GetNumofBucket', e);
    }
}

//获取aws中的文件
export const S3GetFile = (key, filePath) => {
    try {
        return new Promise(async (resolve, reject) => {
            // 参数
            let params = {
                Bucket: "hany",
                Key: key
            }
            // 获取数据
            const data = await s3.getObject(params).promise();
            // 保存到本地文件系统
            await RNFS.writeFile(filePath, data.Body.toString('base64'), 'base64')
                .then(() => {
                    resolve(filePath)
                })
                .catch((err) => {
                    reject(err)
                });
        })
    } catch (e) {
        console.log('上传数据-S3Upload', e);
    }
}

