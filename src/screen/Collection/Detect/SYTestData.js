// 检测记录
const record = [
    {
        dataType: 'testRocord',
        userInfo: {
            // 账号
            username: 'test_user',
            // 用户名
            realname: '张三',
            // 用户id
            userid: '12',
            // 设备id
            deviceId: '1111'
        },
        diseaseInfo: {
            // 部件编号
            membertype: 'b100001',
            // 构件名
            membername: '2-1#',
            // 更新时间
            time: '2024-10-2 10:30',
            // 病害名
            diseaseName: '混凝土网状裂缝',
            bridgereportid: 'g114pct5vyqtw04pct5vz3hf4'
        }
    },
    {
        dataType: 'testRocord',
        userInfo: {
            username: 'test_user',
            realname: '张三',
            userid: '12',
            deviceId: '1111'
        },
        diseaseInfo: {
            membertype: 'b100001',
            membername: '2-1#',
            time: '2024-10-2 10:30',
            diseaseName: '混凝土网状裂缝',
            bridgereportid: 'g114pct5vyqtw04pct5vz3hf4'
        }
    }
]

[
    {
        // 用户名
        realname: '张三',
        // 构件名
        membername: '2-1#',
        // 更新时间
        time: '2024-10-2 10:30',
        // 病害名
        diseaseName: '混凝土网状裂缝',
    },
    {
        // 用户名
        realname: '李四',
        // 构件名
        membername: '2-1#',
        // 更新时间
        time: '2024-10-2 10:30',
        // 病害名
        diseaseName: '混凝土网状裂缝',
    }
]

// 用户状态 -- 发送
const memberState = [
    {
        dataType: 'memberUserState',
        bridgereportid: 'g114pct5vyqtw04pct5vz3hf4',
        membertype: 'b100001',
        membername: '2-1#',
        realname: '张三',
        quitTime: '2024-10-2 11:30'
    },
    {
        bridgereportid: 'g114pct5vyqtw04pct5vz3hf4',
        membertype: 'b100001',
        membername: '2-1#',
        realname: '张三',
        enterTime: '2024-10-2 10:30'
    }
]

// 用户状态整理后
const memberState2 = {
    '2-1#': ['张三', '李四'],
    '2-3#': ['赵五']
}

// 总数据
const allData = [
    {
        dataType: 'testRocord',
        userInfo: {
            username: 'test_user',
            realname: '张三',
            userid: '12',
            deviceId: '1111'
        },
        diseaseInfo: {
            membertype: 'b100001',
            membername: '2-1#',
            time: '2024-10-2 10:30',
            diseaseName: '混凝土网状裂缝',
            bridgereportid: 'g114pct5vyqtw04pct5vz3hf4'
        }
    },
    {
        dataType: 'memberUserState',
        bridgereportid: 'g114pct5vyqtw04pct5vz3hf4',
        membertype: 'b100001',
        membername: '1-1#',
        realname: '李四',
        time: '2024-10-2 10:30',
        state: 'enter'
    },
    {
        dataType: 'memberUserState',
        bridgereportid: 'g114pct5vyqtw04pct5vz3hf4',
        membertype: 'b100001',
        membername: '2-1#',
        realname: '张三',
        time: '2024-10-2 11:30',
        state: 'quit'
    },
    {
        dataType: 'memberUserState',
        bridgereportid: 'g114pct5vyqtw04pct5vz3hf4',
        membertype: 'b100001',
        membername: '2-1#',
        realname: '张三',
        time: '2024-10-2 10:30',
        state: 'enter'
    }
]

// 整理数据
const dealData = (allData, bridgereportid, membertype) => {
    let enterList = []
    allData.forEach(item => {
        if (item.dataType == 'memberUserState' && item.bridgereportid == bridgereportid && item.membertype == membertype) {

        }
    })
}
