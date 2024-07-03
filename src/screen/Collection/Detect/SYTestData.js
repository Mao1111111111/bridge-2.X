// 检测记录
const record = {
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
        bridgereportid: 'g114pct5vyqtw04pct5vz3hf4',
        membertype: 'b100001',
        membername: '1-1#',
        realname: '李四',
        enterTime: '2024-10-2 10:30'
    },
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

// 整理用户状态
const 
