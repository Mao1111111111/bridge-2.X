/* 
    历史数据-接口
 */

const host = 'http://106.3.97.61:1081/history'

// 获取养护单位列表
export const getGcompanylist = () => {
    return new Promise((resolve, reject) => {
        fetch(host + '/get_gcompanylist', {
            method: 'POST'
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    resolve(res.resultJson)
                } else {
                    reject(res.resultMsg)
                }
            })
    })
}

// 获取云端项目列表
export const getGprojectlist = (params) => {
    // 模拟数据
    params = {
        gycompanyid: 'm16244jt01000',
        userid: '63'
    }

    let form = new FormData()
    form.append('gycompanyid', params.gycompanyid)
    form.append('userid', params.userid)
    return new Promise((resolve, reject) => {
        fetch(host + '/get_gprojectlist', {
            method: 'POST',
            headers: {
                "Content-type": "multipart/form-data"
            },
            body: form
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    resolve(res.resultJson)
                } else {
                    reject(res.resultMsg)
                }
            })
    })
}

// 获取云端桥梁列表
export const getBridgelist = (params) => {
    // 模拟数据
    params = {
        gprojectid: 'r100000000_1705561696577'
    }

    let form = new FormData()
    form.append('gprojectid', params.gprojectid)
    return new Promise((resolve, reject) => {
        fetch(host + '/get_bridgelist', {
            method: 'POST',
            headers: {
                "Content-type": "multipart/form-data"
            },
            body: form
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    resolve(res.resultJson)
                } else {
                    reject(res.resultMsg)
                }
            })
    })
}

// 下载结构数据
export const getStructureData = (params) => {
    params = {
        bridgeid: 'g114mv2d60lip0',
        reportid: 'g114mv2d60lip04mv2d61nbjo'
    }
    return new Promise((resolve, reject) => {
        fetch(host + '/get_structure_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
            .then(response => response.json())
            .then(res => {
                if (res.success) {
                    resolve(res.resultJson)
                } else {
                    reject(res.resultMsg)
                }
            })
    })
}

// 下载结构数据分配处理