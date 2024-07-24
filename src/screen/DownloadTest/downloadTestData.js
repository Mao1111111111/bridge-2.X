const data1 = {
    // ---- 项目数据（project表） ----
    // -* 项目编号（YYYYMMDDHHmmss），未上传，app新增编辑项目时，最下面那行的数据，（疑问：这个数据目前是非必须的，在app端无其他用处，可以后端随机生成一个或者app端自己生成）
    projectno: '20240722093400',
    // -？ 项目id（随机数），有上传(projectid)，唯一值，（疑问：是后端返回个新的还是使用上传时的，这个影响桥梁数据的存放）
    projectid: '917d8310-64cb-48ff-a796-c4457cf4124f',
    // -？ 项目名称（字符串），有上传(projectname)，(疑问：这个值和项目id一样都属于唯一值，但是这个唯一值的意义是在项目列表页中唯一，实际检测中使用的唯一值是项目id，所以这个数据要和projectid采取同样的获取方式)
    projectname: '2024默认路线默认路段',
    // -* 项目类型（int），未上传，app端无用，可以不传或默认为0
    projecttype: 1,
    // -* 项目状态（int），未上传，app端无用，可以不传或默认为0
    projectstatus: 0,
    // -* 用户id（字符串），有上传(userid)，app端需要用当前用户的id，所以后端可以默认项目创建者id或者不传
    userid: '11',
    // -* 用户名（字符串），有上传(username)，处理同userid
    username: 'test_user',
    // -* 项目创建时间（字符串），未上传，app端生成，可以不传或默认为空
    preject_c_date: '2024-07-18 10:51:37',
    // -* 项目更新时间（字符串），未上传，app端生成，可以不传或默认为空
    preject_u_date: '2024-07-18 10:51:37',
    // -* 数据来源（int），未上传，app端生成，可以不传或默认为空
    preject_datasources: 1,
    // ---- 桥梁基本数据（bridge表） ----
    // ？桥梁id（字符串），有上传(bridgeid)，（疑问：考虑和本地重复的情况）
    bridgeid: 'g114phea9aic0k',
    // 桥梁名称（字符串），有上传(bridgename)
    bridgename: '测试桥梁',
    // 养护区编号（字符串）, 有上传(areacode)
    areacode: 'a10001000',
    // 路线编号（字符串）, 有上传(routecode)
    routecode: 'a100010001000',
    // 桥梁类型（字符串），有上传(bridgetype)
    bridgetype: 'bridge-g',
    // 桥梁桩号（字符串），有上传(bridgestation)
    bridgestation: 'k500+111',
    // 桥梁长度（浮点数），有上传(b16)
    b16: 0,
    // 功能类型（字符串），有上传(bridgefunc)
    bridgefunc: 'func101',
    // 桥幅属性（字符串），有上传(bridgeside)
    bridgeside: 'side111',
    // 结构体系（字符串），有上传(bridgestruct)
    bridgestruct: 'funcg101',
    // 主桥编号（字符串），有上传(mainbridgeid)
    mainbridgeid: '0',
    // * 桥梁创建时间（字符串），未上传，app端生成，可以不传或默认为空
    bridge_c_date: '2024-07-18 10:51:37',
    // * 桥梁更新时间（字符串），未上传，app端生成，可以不传或默认为空
    bridge_u_date: '2024-07-18 10:51:37',
    // 经度，有上传(longitude)
    longitude: 0,
    // 纬度，有上传(latitude)
    latitude: 0,
    // 其他配置，有上传(bridgeconfig)
    bridgeconfig: {
        // 桥台数
        "b200001num": "2",
        // 桥墩数
        "b200002num": "1",
        // 梁片数
        "b100001num": "1",
        // 人行道数
        "b300003num": "2",
        // 伸缩装置数
        "b300002num": "2",
        // 支座数
        "zhizuo_total": "2",
        // 照明系统
        "bridgelightsys": "light10",
        // 翼墙、耳墙
        "bridgewall": "ears",
        // 支座编号
        "bridgepadno": "padno1000",
        // 桥台形式
        "bridgeabutment": "abutment102",
        // 桥墩形式
        "bridgepier": "pier100",
        // 桥台柱数
        "qiaotaizhushu": "1",
        // 桥墩柱数
        "qiaodunzhushu": "1",
        // 肋板数
        "leibanshu": "1"
    },
    // * 数据来源（int），未上传，app端生成，可以不传或默认为空
    bridge_datasources: 1,
    // ---- 桥梁结构数据（bridge_member表） ----
    // 桥梁结构数据
    structureInfo: [
        {
            // 桥梁id（字符串），有上传(bridgeid)，同桥梁基本数据中bridgeid
            bridgeid: 'g114phea9aic0k',
            // 部件结构（字符串），有上传(structureInfo.memberData.position)
            position: 'b10',
            // 部件编号（字符串），有上传(structureInfo.memberData.membertype)
            membertype: 'b100001',
            // 构件编号（字符串），有上传(structureInfo.memberData.memberid)
            memberid: 'g114phea9aic0k_b100001_lyqodat3_0',
            // 构件名称（字符串），有上传(structureInfo.memberData.membername)
            membername: '1-1#',
            // 跨编号（int），有上传(structureInfo.memberData.stepno)
            stepno: 1,
            // 排序编号（int），有上传(structureInfo.memberData.orderdesc)
            orderdesc: 10,
            // * 更新时间，有上传(structureInfo.memberData.u_date)，可不传或使用上传的时间
            u_date: '2024-07-18 10:51:37'
        }
    ],
    // ===== 检测数据 =====
    // ---- ？桥梁项目绑定数据（bridge_project_bind表）,(如果只下载结构数据，那么可以不需要这部分数据，app端自动生成，相当于一个新的桥，如果下载检测数据，那么需要这部分数据) ----
    // 检测编号，有上传(testData.bridgereportid)
    bridgereportid: 'g114phea9aic0k4phea9asri4',
    // * 绑定编码，未上传，app端生成，可以不传或默认为空
    bridgereportbindid: '',
    // * 桥梁项目绑定时间，有上传(testData.binddate)，可以不传或默认为空
    binddate: '2024-07-18 14:15:02',
    // ---- 桥梁检测--基础信息（bridge_report表） ----
    // 基础数据包-桥梁属性-基础数据，有上传(reportname)，app端无用
    reportname: '',
    // 创建日期时间，有上传(startdate)
    startdate: '2024-07-18 10:51:46',
    // ？ 检测完成日期时间，有上传(finishdate)，这个时间在每次上传的时候变化
    finishdate: '2024-07-22 09:31:47',
    // * 检测状态，有上传(rstatus)，app端无用
    rstatus: 0,
    // 经度，有上传(testData.longitude)
    bridge_report_longitude: 0,
    // 纬度，有上传(testData.latitude)
    bridge_report_latitude: 0,
    // ---- 桥梁检测--构件数据（bridge_report_member表） ----
    bridge_report_member: [
        {
            // 部件结构，有上传(testData.detailTestData.memberData.position)
            position: 'b10',
            // 部件编号，有上传(testData.detailTestData.memberData.membertype)
            membertype: 'b100001',
            // 构件编号，有上传(testData.detailTestData.memberData.memberid)
            memberid: 'g114phea9aic0k4phea9asri4_b100001_lyqodat3_0',
            // 构建名称，有上传(testData.detailTestData.memberData.membername)
            membername: '1-1#',
            // 跨编号，有上传(testData.detailTestData.memberData.stepno)
            stepno: 1,
            // 排序编号，有上传(testData.detailTestData.memberData.orderdesc)
            orderdesc: 10,
            // 构建状态，有上传(testData.detailTestData.memberData.memberstatus)
            memberstatus: '100',
            // 构件评分，有上传(testData.detailTestData.memberData.dpscores_auto)
            dpscores_auto: 1,
            // 更新时间，有上传(testData.detailTestData.memberData.u_date)
            u_date: 1
        }
    ],
    // ---- 桥梁检测--图片数据（bridge_report_file表、bridge_report_member_checkstatus_media表、file_gps表） ----
    bridge_report_media: [
        {
            // 数据编号，有上传(dataid)，建议使用上传的dataid，桥梁图片(dataid=bridgeid)，部件图片(dataid=partid)，良好构件图片(dataid=构件的memberid)，病害图片(dataid=病害唯一值)
            dataid: 'g114phea9aic0k4phea9asri4_b100004_lyqodat3_4',
            // 文件id，有上传(memberid)
            mediaid: "b3919ce8-5c91-4db3-a21e-53fbbe9905fd",
            // 文件类型，有上传(type)，建议使用上传的type，桥梁图片(bridge)，部件图片(member)，良好构件图片(goodParts)，病害图片(diseaseParts)
            type: 'diseaseParts',
            // ？ 分类，有上传(category)，建议使用上传的category，这里是后期改动的，可能和之前的数据对应不上
            category: 'L0101',
            // 图片编号，有上传(inx)，例如桥梁图片有三张数据，三张图片的inx分别为'1'、'2'、'3'，序号是根据图片类型排序的，必要排序
            inx: '1',
            // 图片描述，有上传(remark)
            remark: '',
            // ？ 是否使用源文件 1是 0否，有上传(is_source)，下载后这里只能是1，因为上传的时候没有上传副本文件
            is_source: 1,
            // 更新时间，有上传(u_date)
            u_date: '2024-07-22 11:27:21',
            // ？媒体类型，有上传(mediatype)，voice、image、virtualimage、video，以前还有虚拟图片，现在没有了
            mediatype: 'image',
            // * 主媒体id，默认0
            parentmediaid: '0',
            // 媒体文件名称，有上传(filename)
            filename: '2#台台身混凝土钢筋锈断',
            // 媒体文件扩展名，有上传(filetypes)
            filetypes: 'jpg',
            // 媒体文件大小Kb，有上传(filesize)
            filesize: 106999,
            // 媒体文件时长，有上传(duration)
            duration: 0,
            // * 文件gps，如果没有gps数据，那么没有gpsInfo字段
            gpsInfo: {
                // 经度
                longitude: 106.826929,
                // 纬度
                latitude: 29.719054,
                // 精度
                accuracy: 30,
                // 高度
                altitude: 0
            },
            // ？ 远端下载的key 或 在压缩包中对应的名字
            key: ''
        }
    ],
    // ---- 桥梁检测--检测数据（parts_checkstatus_data表）
    bridge_report_data: [
        {
            // 构件编号，构件id，有上传(testData.detailTestData.memberData.diseaseData/goodData.dataid = testData.detailTestData.memberData.memberid)
            dataid: 'g114phea9aic0k4phea9asri4_b200001_lyqodat3_24',
            // ？构件检测数据，是一个json，下面会具体举例，对应不上的情况
            jsondata: '',
            // 构件状态，有上传(testData.detailTestData.memberData.diseaseData/goodData.memberstatus)
            memberstatus: '200',
            // 数据类型，有上传(testData.detailTestData.memberData.diseaseData/goodData.datatype)
            datatype: 'c1001',
            // 是否重点关注，有上传(testData.detailTestData.memberData.diseaseData/goodData.mian)
            mian: 0,
            // 数据版本，病害唯一值，有上传(testData.detailTestData.memberData.diseaseData/goodData.version)，对应图片数据中的 dataid，用来确定图片
            version: 'ab10374b-260e-4f9e-bfa8-334a843f6889',
            // 数据组id，有上传(testData.detailTestData.memberData.diseaseData/goodData.dataGroupId)，只有当多选构件时录入病害会有值，其他时候录入病害或标记良好都为''
            dataGroupId: '8861d332-2448-4b26-b553-bf54f334218c',
            // 更新时间，有上传(testData.detailTestData.memberData.diseaseData/goodData.u_date)
            u_date: '2024-07-22 15:25:59',
            // 经度，有上传(testData.detailTestData.memberData.diseaseData/goodData.longitude)
            longitude: '',
            // 纬度，有上传(testData.detailTestData.memberData.diseaseData/goodData.latitude)
            latitude: ''
        }
    ]
}

const jsondata = {
    // (必要) 构件类型 at0001、at0000、at0004、at0005、at0006等
    "areatype": "at0001",
    // (必要) 构件区域
    "area": "at0001r1002",
    // 病害编号
    "checktypeid": "b100001t00c1040",
    // standard
    "standard": {
        // ？标度 -- 实际
        "scale": "3",
        // 标准
        "id": "JTG-TH21-2011-T000-0"
    },
    // ？原本默认的标度
    "scale": "2",
    // ？
    "list": [],
    // 病害名称
    "diseaseName": "混凝土破损、露筋",
    "unit": {
        // 构件类型
        "areatype": "at0001",
        // 构件区域
        "area": "at0001r1002",
        // 原本默认的标度
        "scale": "2",
        "lengthText": "NaN",
        "widthText": "NaN",
        "heightText": "NaN",
        // *
        "memberLength": "9",
        // *
        "memberWidth": "8",
        // *
        "memberHeight": "5",
        // *
        "hzbrmc_area_m": "93"
    },
    "lengthText": "NaN",
    "widthText": "NaN",
    "heightText": "NaN",
    // ?checkinfoshort + 
    "remark": "混凝土破损、露筋，/",
    // 一级病害id
    "stairgroupid": "10000dg00003",
    // 病害描述
    "description": "混凝土破损、露筋",
    // 位置描述
    "writePositionTxt": "/",
    // standardscalestr 和 scaleArr 二选一？
    "standardscalestr": "1,2,3",
    // standardscalestr 和 scaleArr 二选一？
    "scaleArr": [
        {
        "label": 1,
        "value": "1"
    }, {
        "label": 2,
        "value": "2"
    }, {
        "label": 3,
        "value": "3"
    }, {
        "label": 4,
        "value": "4"
    }],
    // (必要) 病害评定标准数据，如果没有这个数据，有standardid也行
    "scaleTableArr": [{
        "qualitative": "完好.无剥落、掉角",
        "ration": "—",
        "standardid": "JTG-TH21-2011-T511-2",
        "standardname": "剥落、掉角",
        "standardscale": "1"
    }, {
        "qualitative": "局部混凝土剥落或掉角",
        "ration": "累计面积≤构件面积5%，或单处面积≤0.5平方米",
        "standardid": "JTG-TH21-2011-T511-2",
        "standardname": "剥落、掉角",
        "standardscale": "2"
    }, {
        "qualitative": "较大范围混凝土剥落或掉角",
        "ration": "累计面积＞构件面积的5%且＜构件面积的10%，或单处面积＞0.5平方米且＜1.0平方米",
        "standardid": "JTG-TH21-2011-T511-2",
        "standardname": "剥落、掉角",
        "standardscale": "3"
    }, {
        "qualitative": "大范围混凝土剥落或掉角",
        "ration": "累计面积≥构件面积的10%，或单处面积≥1.0平方米",
        "standardid": "JTG-TH21-2011-T511-2",
        "standardname": "剥落、掉角",
        "standardscale": "4"
    }],
    // 病害单位信息
    "infoList": [{
        "strid": "s1401",
        "strinfo": "面积（平方米）",
        "strname": "面积",
        "strunit": "平方米",
        "strvalue": "hzbrmc_area_m"
    }],
    "checktypegroupid": "10000dg00045",
    "scalegroupid": "10000sg0013",
    // *
    "hzbrmc_area_m": "93",
    // *
    "memberLength": "9",
    // *
    "memberWidth": "8",
    // *
    "memberHeight": "5",
}

// 主梁b100001、挂梁b100006
const jsondata1 = {
    "areatype": "at0001",
    "checktypeid": "b100001t00c1040",
    "standard": {
        "scale": "3",
        "id": "JTG-TH21-2011-T000-0"
    },
    "scale": "2",
    "list": [],
    "diseaseName": "混凝土破损、露筋",
    "unit": {
        "areatype": "at0001",
        "area": "at0001r1002",
        "scale": "2",
        "lengthText": "NaN",
        "widthText": "NaN",
        "heightText": "NaN",
        // *
        "memberLength": "9",
        // *
        "memberWidth": "8",
        // *
        "memberHeight": "5",
        // *
        "hzbrmc_area_m": "93"
    },
    "lengthText": "NaN",
    "widthText": "NaN",
    "heightText": "NaN",
    "remark": "混凝土破损、露筋，/",
    "stairgroupid": "10000dg00003",
    "description": "混凝土破损、露筋",
    "writePositionTxt": "/",
    "scaleArr": [{
        "label": 1,
        "value": "1"
    }, {
        "label": 2,
        "value": "2"
    }, {
        "label": 3,
        "value": "3"
    }, {
        "label": 4,
        "value": "4"
    }],
    "scaleTableArr": [{
        "qualitative": "完好.无剥落、掉角",
        "ration": "—",
        "standardid": "JTG-TH21-2011-T511-2",
        "standardname": "剥落、掉角",
        "standardscale": "1"
    }, {
        "qualitative": "局部混凝土剥落或掉角",
        "ration": "累计面积≤构件面积5%，或单处面积≤0.5平方米",
        "standardid": "JTG-TH21-2011-T511-2",
        "standardname": "剥落、掉角",
        "standardscale": "2"
    }, {
        "qualitative": "较大范围混凝土剥落或掉角",
        "ration": "累计面积＞构件面积的5%且＜构件面积的10%，或单处面积＞0.5平方米且＜1.0平方米",
        "standardid": "JTG-TH21-2011-T511-2",
        "standardname": "剥落、掉角",
        "standardscale": "3"
    }, {
        "qualitative": "大范围混凝土剥落或掉角",
        "ration": "累计面积≥构件面积的10%，或单处面积≥1.0平方米",
        "standardid": "JTG-TH21-2011-T511-2",
        "standardname": "剥落、掉角",
        "standardscale": "4"
    }],
    "infoList": [{
        "strid": "s1401",
        "strinfo": "面积（平方米）",
        "strname": "面积",
        "strunit": "平方米",
        "strvalue": "hzbrmc_area_m"
    }],
    "area": "at0001r1002",
    "checktypegroupid": "10000dg00045",
    "scalegroupid": "10000sg0013",
    // *
    "hzbrmc_area_m": "93",
    // *
    "memberLength": "9",
    // *
    "memberWidth": "8",
    // *
    "memberHeight": "5",
    // *
    "mian": 1,
}

// 横隔板b100002、支座b100004、墩台基础b200003、翼墙耳墙b200004、河床b200006、调治构造物b200007、伸缩装置b300002、人行道b300003、栏杆护栏b300004、排水系统b300005
const jsondata2 = {
    "areatype": "at0000",
    "checktypeid": "b200003t00c1002",
    "standard": {
        "scale": "3",
        "id": "JTG-TH21-2011-T000-0"
    },
    "scale": "2",
    "list": [],
    // * 数组里面可能有值也可能没有，跟选择的病害有关
    "infoList": [{
        "strid": "s1401",
        "strinfo": "面积（平方米）",
        "strname": "面积",
        "strunit": "平方米",
        "strvalue": "hzbrmc_area_m"
    }],
    "unit": {
        "areatype": "at0000",
        "scale": "2",
        "lengthText": "NaN",
        "widthText": "NaN",
        "heightText": "NaN",
        // *
        "area": "g",
    },
    "diseaseName": "基础冲蚀，青苔滋生",
    "lengthText": "NaN",
    "widthText": "NaN",
    "heightText": "NaN",
    "remark": "基础冲蚀，青苔滋生，/",
    "stairgroupid": "10000dg00020",
    "description": "基础冲蚀，青苔滋生",
    "writePositionTxt": "/",
    "scaleArr": [{
        "label": 1,
        "value": "1"
    }, {
        "label": 2,
        "value": "2"
    }, {
        "label": 3,
        "value": "3"
    }, {
        "label": 4,
        "value": "4"
    }, {
        "label": 5,
        "value": "5"
    }],
    "scaleTableArr": [{
        "qualitative": "完好",
        "ration": "—",
        "standardid": "JTG-TH21-2011-T932-1",
        "standardname": "冲刷、淘空",
        "standardscale": "1"
    }, {
        "qualitative": "基础无冲蚀现象，表面长有青苔、杂草",
        "ration": "—",
        "standardid": "JTG-TH21-2011-T932-1",
        "standardname": "冲刷、淘空",
        "standardscale": "2"
    }, {
        "qualitative": "基础有局部冲蚀现象，部分外露，但未露出基底",
        "ration": "基础冲空面积≤10%",
        "standardid": "JTG-TH21-2011-T932-1",
        "standardname": "冲刷、淘空",
        "standardscale": "3"
    }, {
        "qualitative": "浅基被冲空，露出底面，冲刷深度大于设计值",
        "ration": "基础冲空面积且＞10%且≤20%",
        "standardid": "JTG-TH21-2011-T932-1",
        "standardname": "冲刷、淘空",
        "standardscale": "4"
    }, {
        "qualitative": "冲刷深度大于设计值，地基失效，承载力降低，或桥台岸坡滑移或基础无法修复",
        "ration": "基础冲空面积且＞20%",
        "standardid": "JTG-TH21-2011-T932-1",
        "standardname": "冲刷、淘空",
        "standardscale": "5"
    }],
    // *
    "area": "g",
    // *
    "mian": 1,
    "checktypegroupid": "10000dg00224",
    "scalegroupid": "10000sg0192"
}

// 湿接段b100003、铰缝b100005、湿接缝b100007
const jsondata3 = {
    "areatype": "at0000",
    "checktypeid": "b100003t00c1005",
    "standard": {
        "scale": "3",
        "id": "JTG-TH21-2011-T000-0"
    },
    "scale": "2",
    "list": [],
    "diseaseName": "混凝土破损、露筋",
    "unit": {
        "areatype": "at0000",
        "scale": "2",
        "lengthText": "1.04",
        "widthText": "NaN",
        "heightText": "NaN",
        // *
        "area": "uu",
        // *
        "memberLength": "8",
        // *
        "disLength": 13,
        // *
        "hzbrmc_area_m": "6"
    },
    "lengthText": "1.04",
    "widthText": "NaN",
    "heightText": "NaN",
    "remark": "混凝土破损、露筋，/",
    "stairgroupid": "10000dg00007",
    "description": "混凝土破损、露筋",
    "writePositionTxt": "/",
    "scaleArr": [{
        "label": 1,
        "value": "1"
    }, {
        "label": 2,
        "value": "2"
    }, {
        "label": 3,
        "value": "3"
    }, {
        "label": 4,
        "value": "4"
    }],
    "scaleTableArr": [{
        "qualitative": "完好.无剥落、掉角",
        "ration": "—",
        "standardid": "JTG-TH21-2011-T511-2",
        "standardname": "剥落、掉角",
        "standardscale": "1"
    }, {
        "qualitative": "局部混凝土剥落或掉角",
        "ration": "累计面积≤构件面积5%，或单处面积≤0.5平方米",
        "standardid": "JTG-TH21-2011-T511-2",
        "standardname": "剥落、掉角",
        "standardscale": "2"
    }, {
        "qualitative": "较大范围混凝土剥落或掉角",
        "ration": "累计面积＞构件面积的5%且＜构件面积的10%，或单处面积＞0.5平方米且＜1.0平方米",
        "standardid": "JTG-TH21-2011-T511-2",
        "standardname": "剥落、掉角",
        "standardscale": "3"
    }, {
        "qualitative": "大范围混凝土剥落或掉角",
        "ration": "累计面积≥构件面积的10%，或单处面积≥1.0平方米",
        "standardid": "JTG-TH21-2011-T511-2",
        "standardname": "剥落、掉角",
        "standardscale": "4"
    }],
    "infoList": [{
        "strid": "s1401",
        "strinfo": "面积（平方米）",
        "strname": "面积",
        "strunit": "平方米",
        "strvalue": "hzbrmc_area_m"
    }],
    "checktypegroupid": "10000dg00076",
    "scalegroupid": "",
    // *
    "mian": 1,
    // *
    "area": "uu",
    // *
    "hzbrmc_area_m": "6",
    // *
    "memberLength": "8",
    // *
    "disLength": 13,
}

// 桥面铺装b300001
const jsondata4 = {
    "areatype": "at0000",
    "checktypeid": "b300001t00c1088",
    "standard": {
        "scale": "3",
        "id": "JTG-TH21-2011-T000-0"
    },
    "scale": "2",
    "list": [],
    "diseaseName": "搭板凹陷",
    "unit": {
        "areatype": "at0000",
        "scale": "2",
        "lengthText": "5.46",
        "widthText": "3.60",
        "heightText": "NaN",
        // *
        "area": "only",
        // *
        "memberLength": "7",
        // *
        "memberWidth": "9",
        // *
        "disLength": 78,
        // *
        "disWidth": 40,
        // *
        "hzbrmc_area_m": "9"
    },
    "lengthText": "5.46",
    "widthText": "3.60",
    "heightText": "NaN",
    "remark": "搭板凹陷，/",
    "stairgroupid": "10000dg00306",
    "description": "搭板凹陷",
    "writePositionTxt": "/",
    "scaleArr": [{
        "label": 1,
        "value": "1"
    }, {
        "label": 2,
        "value": "2"
    }, {
        "label": 3,
        "value": "3"
    }, {
        "label": 4,
        "value": "4"
    }],
    "scaleTableArr": [{
        "qualitative": "完好",
        "ration": "—",
        "standardid": "JTG-TH21-2011-T1011-1",
        "standardname": "变形",
        "standardscale": "1"
    }, {
        "qualitative": "局部出现波浪拥包",
        "ration": "波浪拥包面积≤10%，波峰波谷高差≤25mm",
        "standardid": "JTG-TH21-2011-T1011-1",
        "standardname": "变形",
        "standardscale": "2"
    }, {
        "qualitative": "或局部有高低不平的现象",
        "ration": "高低差≤25mm",
        "standardid": "JTG-TH21-2011-T1011-1",
        "standardname": "变形",
        "standardscale": "2"
    }, {
        "qualitative": "或局部出现车辙，深度较浅",
        "ration": "铺装层出现车辙的面积≤10%，深度≤25mm",
        "standardid": "JTG-TH21-2011-T1011-1",
        "standardname": "变形",
        "standardscale": "2"
    }, {
        "qualitative": "多处出现波浪拥包",
        "ration": "波浪拥包面积＞10%且≤20%，波峰波谷高差≤25mm",
        "standardid": "JTG-TH21-2011-T1011-1",
        "standardname": "变形",
        "standardscale": "3"
    }, {
        "qualitative": "或多处有高低不平的现象",
        "ration": "高低差≤25mm",
        "standardid": "JTG-TH21-2011-T1011-1",
        "standardname": "变形",
        "standardscale": "3"
    }, {
        "qualitative": "或较大面积出现车辙，深度较浅",
        "ration": "铺装层出现车辙的面积＞10%且≤20%，深度≤25mm",
        "standardid": "JTG-TH21-2011-T1011-1",
        "standardname": "变形",
        "standardscale": "3"
    }, {
        "qualitative": "大面积出现波浪拥包",
        "ration": "波浪拥包面积＞20%，波峰波谷高差＞25mm",
        "standardid": "JTG-TH21-2011-T1011-1",
        "standardname": "变形",
        "standardscale": "4"
    }, {
        "qualitative": "或普遍有高低不平的现象",
        "ration": "高低差＞25mm",
        "standardid": "JTG-TH21-2011-T1011-1",
        "standardname": "变形",
        "standardscale": "4"
    }, {
        "qualitative": "或大面积出现车辙，深度较深",
        "ration": "铺装层出现车辙的面积＞20%，深度＞25mm",
        "standardid": "JTG-TH21-2011-T1011-1",
        "standardname": "变形",
        "standardscale": "4"
    }],
    "infoList": [{
        "strid": "s1503",
        "strinfo": "高差（毫米）",
        "strname": "高差",
        "strunit": "毫米",
        "strvalue": "hzbrmc_heightdiff_mm"
    }],
    "checktypegroupid": "10000dg00309",
    "scalegroupid": "",
    // *
    "area": "only",
    // *
    "hzbrmc_area_m": "9",
    // *
    "memberLength": "7",
    // *
    "memberWidth": "9",
    // *
    "disLength": 78,
    // *
    "disWidth": 40,
    // *
    "mian": 1,
}

// 桥台b200001
const jsondata5 = {
    "areatype": "at0004",
    "checktypeid": "b200001t00c1137",
    "standard": {
        "scale": "3",
        "id": "JTG-TH21-2011-T000-0"
    },
    "scale": "3",
    "list": [],
    "diseaseName": "混凝土钢筋锈断",
    "unit": {
        "areatype": "at0004",
        "area": "at0004r1001",
        "scale": "3",
        "lengthText": "NaN",
        "widthText": "76.23",
        "heightText": "19.36",
        // *
        "memberWidth": "99",
        // *
        "memberHeight": "88",
        // *
        "disWidth": 77,
        // *
        "disHeight": 22,
        // *
        "hzbrmc_area_m": "6"
    },
    "lengthText": "NaN",
    "widthText": "76.23",
    "heightText": "19.36",
    "remark": "混凝土钢筋锈断，/",
    "stairgroupid": "10000dg00015",
    "description": "混凝土钢筋锈断",
    "writePositionTxt": "/",
    "scaleArr": [{
        "label": 1,
        "value": "1"
    }, {
        "label": 2,
        "value": "2"
    }, {
        "label": 3,
        "value": "3"
    }, {
        "label": 4,
        "value": "4"
    }, {
        "label": 5,
        "value": "5"
    }],
    "scaleTableArr": [{
        "qualitative": "完好",
        "ration": "承重构件钢筋锈蚀电位水平为0～-200mV，或电阻率＞20000Ω·㎝",
        "standardid": "JTG-TH21-2011-T511-5",
        "standardname": "钢筋锈蚀",
        "standardscale": "1"
    }, {
        "qualitative": "承重构件有轻微锈蚀现象",
        "ration": "承重构件钢筋锈蚀电位水平为-200～-300mV，或电阻率15000～20000Ω·㎝",
        "standardid": "JTG-TH21-2011-T511-5",
        "standardname": "钢筋锈蚀",
        "standardscale": "2"
    }, {
        "qualitative": "承重构件钢筋发生锈蚀，混凝土表面有沿钢筋的裂缝或混凝土表面有锈迹",
        "ration": "承重构件钢筋锈蚀电位水平为-300～-400mV，或电阻率10000～15000Ω·㎝",
        "standardid": "JTG-TH21-2011-T511-5",
        "standardname": "钢筋锈蚀",
        "standardscale": "3"
    }, {
        "qualitative": "承重构件钢筋锈蚀引起混凝土剥落，钢筋裸露，表面膨胀性锈层显著",
        "ration": "承重构件钢筋锈蚀电位水平为-400～-500mV，或电阻率5000～10000Ω·㎝",
        "standardid": "JTG-TH21-2011-T511-5",
        "standardname": "钢筋锈蚀",
        "standardscale": "4"
    }, {
        "qualitative": "承重构件大量钢筋锈蚀引起混凝土剥落，部分钢筋屈服或锈断，混凝土表面严重开裂，影响结构安全",
        "ration": "承重构件钢筋锈蚀电位水平为＜-500mV，或电阻率＜5000Ω·㎝",
        "standardid": "JTG-TH21-2011-T511-5",
        "standardname": "钢筋锈蚀",
        "standardscale": "5"
    }],
    "infoList": [{
        "strid": "s1401",
        "strinfo": "面积（平方米）",
        "strname": "面积",
        "strunit": "平方米",
        "strvalue": "hzbrmc_area_m"
    }],
    "area": "at0004r1001",
    "checktypegroupid": "10000dg00301",
    "scalegroupid": "",
    // *
    "mian": 1,
    // *
    "hzbrmc_area_m": "6",
    // *
    "memberWidth": "99",
    // *
    "memberHeight": "88",
    // *
    "disWidth": 77,
    // *
    "disHeight": 22,
}

// 桥墩b200002
const jsondata6 = {
    "areatype": "at0005",
    "checktypeid": "b200002t00c1006",
    "standard": {
        "scale": "3",
        "id": "JTG-TH21-2011-T000-0"
    },
    "scale": "2",
    "list": [],
    "diseaseName": "混凝土剥落、露筋",
    "unit": {
        "areatype": "at0005",
        "scale": "2",
        "lengthText": "6.88",
        "widthText": "NaN",
        "heightText": "0.80",
        // *
        "memberLength": "8",
        // *
        "memberHeight": "5",
        // *
        "disLength": 86,
        // *
        "disHeight": 16,
        // *
        "hzbrmc_area_m": "99"
    },
    "lengthText": "6.88",
    "widthText": "NaN",
    "heightText": "0.80",
    "remark": "混凝土剥落、露筋，/",
    "stairgroupid": "10000dg00017",
    "description": "混凝土剥落、露筋",
    "writePositionTxt": "/",
    "scaleArr": [{
        "label": 1,
        "value": "1"
    }, {
        "label": 2,
        "value": "2"
    }, {
        "label": 3,
        "value": "3"
    }, {
        "label": 4,
        "value": "4"
    }],
    "scaleTableArr": [{
        "qualitative": "完好",
        "ration": "—",
        "standardid": "JTG-TH21-2011-T911-3",
        "standardname": "空洞、孔洞",
        "standardscale": "1"
    }, {
        "qualitative": "局部空洞、孔洞",
        "ration": "累计面积≤构件面积的3%，单处面积≤0.5平方米",
        "standardid": "JTG-TH21-2011-T911-3",
        "standardname": "空洞、孔洞",
        "standardscale": "2"
    }, {
        "qualitative": "较大范围空洞、孔洞",
        "ration": "累计面积＞构件面积的3%且≤构件面积的10%，单处面积≤0.5平方米或最大深度≤25mm",
        "standardid": "JTG-TH21-2011-T911-3",
        "standardname": "空洞、孔洞",
        "standardscale": "3"
    }, {
        "qualitative": "大范围空洞、孔洞",
        "ration": "累计面积＞构件面积的10%，单处面积＞0.5平方米或最大深度＞25mm",
        "standardid": "JTG-TH21-2011-T911-3",
        "standardname": "空洞、孔洞",
        "standardscale": "4"
    }],
    "infoList": [{
        "strid": "s1401",
        "strinfo": "面积（平方米）",
        "strname": "面积",
        "strunit": "平方米",
        "strvalue": "hzbrmc_area_m"
    }],
    "checktypegroupid": "10000dg00170",
    "scalegroupid": "10000sg0138",
    // *
    "hzbrmc_area_m": "99",
    // *
    "mian": 1,
    // *
    "memberLength": "8",
    // *
    "memberHeight": "5",
    // *
    "disLength": 86,
    // *
    "disHeight": 16,
}

// 锥坡护坡b200005
const jsondata7 = {
    "areatype": "at0006",
    "checktypeid": "b200005t00c1004",
    "standard": {
        "scale": "3",
        "id": "JTG-TH21-2011-T000-0"
    },
    "scale": "2",
    "list": [],
    "infoList": [{
        "strid": "s1401",
        "strinfo": "面积（平方米）",
        "strname": "面积",
        "strunit": "平方米",
        "strvalue": "hzbrmc_area_m"
    }],
    "unit": {
        "areatype": "at0006",
        "scale": "2",
        "lengthText": "NaN",
        "widthText": "NaN",
        "heightText": "NaN"
    },
    "diseaseName": "砌体松动",
    "lengthText": "NaN",
    "widthText": "NaN",
    "heightText": "NaN",
    "remark": "砌体松动，面积5@@平方米@@",
    "stairgroupid": "10000dg00022",
    "description": "砌体松动",
    "writePositionTxt": "/",
    "scaleArr": [{
        "label": 1,
        "value": "1"
    }, {
        "label": 2,
        "value": "2"
    }, {
        "label": 3,
        "value": "3"
    }, {
        "label": 4,
        "value": "4"
    }],
    "scaleTableArr": [{
        "qualitative": "完好",
        "ration": "—",
        "standardid": "JTG-TH21-2011-T951-1",
        "standardname": "缺陷",
        "standardscale": "1"
    }, {
        "qualitative": "铺砌面局部隆起、凹陷、开裂，砌缝砂浆脱落，或局部铺砌面下滑，坡角损坏",
        "ration": "缺陷面积≤10%",
        "standardid": "JTG-TH21-2011-T951-1",
        "standardname": "缺陷",
        "standardscale": "2"
    }, {
        "qualitative": "铺砌面出现大面积隆起、凹陷、开裂，砌缝砂浆脱落",
        "ration": "缺陷面积＞10%且≤20%",
        "standardid": "JTG-TH21-2011-T951-1",
        "standardname": "缺陷",
        "standardscale": "3"
    }, {
        "qualitative": "出现孔洞，破损等，丧失锥坡、护坡功能，或锥坡体和坡脚损坏严重，大面积滑坡、坍塌，坡顶下降较大，锥坡、护坡作用明显降低",
        "ration": "缺陷面积＞20%",
        "standardid": "JTG-TH21-2011-T951-1",
        "standardname": "缺陷",
        "standardscale": "4"
    }],
    // *
    "hzbrmc_area_m": "5",
    "checktypegroupid": "10000dg00246",
    "scalegroupid": "10000sg0214"
}

// 照明标志b300006
const jsondata8 = {
    "areatype": "at0000",
    "checktypeid": "b300006t00c1009",
    "standard": {
        "scale": "3",
        "id": "JTG-TH21-2011-T000-0"
    },
    "scale": "2",
    "list": [],
    "infoList": [{
        "strid": "s1801",
        "strinfo": "个数",
        "strname": "个数",
        "strunit": "个",
        "strvalue": "hzbrmc_num"
    }],
    "unit": {
        "areatype": "at0000",
        "scale": "2",
        "lengthText": "NaN",
        "widthText": "NaN",
        "heightText": "NaN",
        // *
        "hzbrmc_num": "6",
        // *
        "area": "y",
    },
    "diseaseName": "标志牌信息错误",
    "lengthText": "NaN",
    "widthText": "NaN",
    "heightText": "NaN",
    "remark": "标志牌信息错误，/",
    "stairgroupid": "10000dg00032",
    "description": "标志牌信息错误",
    "writePositionTxt": "y",
    "scaleArr": [{
        "label": 1,
        "value": "1"
    }, {
        "label": 2,
        "value": "2"
    }, {
        "label": 3,
        "value": "3"
    }, {
        "label": 4,
        "value": "4"
    }],
    "scaleTableArr": [{
        "qualitative": "完好",
        "ration": "",
        "standardid": "JTG-TH21-2011-T1061-1",
        "standardname": "污损或损坏",
        "standardscale": "1"
    }, {
        "qualitative": "个别设施松动、锈蚀、损坏，或出现污损标志不清现象",
        "ration": "",
        "standardid": "JTG-TH21-2011-T1061-1",
        "standardname": "污损或损坏",
        "standardscale": "2"
    }, {
        "qualitative": "多处设施松动、锈蚀、损坏，或出现污损标志不清现象",
        "ration": "",
        "standardid": "JTG-TH21-2011-T1061-1",
        "standardname": "污损或损坏",
        "standardscale": "3"
    }, {
        "qualitative": "大部分设施松动、锈蚀、损坏，危及行车安全",
        "ration": "",
        "standardid": "JTG-TH21-2011-T1061-1",
        "standardname": "污损或损坏",
        "standardscale": "4"
    }],
    "checktypegroupid": "10000dg00294",
    "scalegroupid": "10000sg0262",
    // *
    "area": "y",
    // *
    "hzbrmc_num": "6",
}