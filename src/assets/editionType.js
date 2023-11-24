/* 
    版本类型
 */
// 1、检立得--jld
// 2、客户--Client
export const editionType = 'jld'

// 类型列表
export const editionList = {
    // 检立得
    jld:{
        // 
        // 上传到 华为云(OBS) 还是 紫光云(AWS)
        UploadObjectStorageName:'OBS'
    },
    // 客户版
    Client:{
        // 上传到 华为云(OBS) 还是 紫光云(AWS)
        UploadObjectStorageName:'AWS'
    }
}


// 上传配置
// 上传到 华为云(OBS) 还是 紫光云(AWS)
export const UploadObjectStorageName = 'AWS'