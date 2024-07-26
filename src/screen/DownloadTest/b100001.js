const datajson = {
	// 部件类型
	"membertype": "b100001",
	// 构件区域
	"postion": "底板",
	// 病害id
	"disease": "b100001t00c1020",
	// 位置描述
	"locationinfo": "底板距0#台1.2m，左侧边缘0.75m处",
	// 病害描述
	"describeinfo": "横向裂缝，左腹板长度0.2@@米@@，左腹板宽度0.3@@毫米@@，底板长度0.4@@米@@，底板宽度0.5@@毫米@@",
	// 备注
	"statusinfo": "",
	"file": "",
	"upimgpath": "",
	"upaudiopath": "",
	// 数据类型（这个是web端区分数据类型 平板应该用不到） c1001 构件病害 c1000 部件描述  c1002裂缝图 c1003裂缝表 
	"datatype": "c1001",
	// 构件id
	"memberid": "giqv5dd01myirtl8c2l83vr4d6_b100001_96395_0",
	// 构件状态 0 待检测  100 良好  200 病害
	"memberstatus": "200",
	// 构件名称
	"membername": "1-1#梁",
	// 桥梁报告id
	"reportid": "giqv5dd01myirtl8c2l83vr4d6",
	// 确定当前构件数据的唯一键值（平板应该用不到）
	"postid": "mgiqv5dd01myirtl8c2l83vr4d64jve3mcsrgd",
	// 病害位置-长度
	"length": "10",
	// 病害位置-长度比例
	"lengthratio": "12",
	// 病害位置-宽度
	"width": "15",
	// 病害位置-宽度比例
	"widthhratio": "5",
	// 病害位置-距顶
	"top": "",
	// 病害位置-距顶比例
	"topratio": "0",
	// 构件类型
	"areaid": "radio_postion1",
	// 选项卡索引（平板应该用不到）
	"tabindex": "0",
	// 病害信息数据
	"checktype": {
		// 三级病害id
		"checktypeid": "b100001t00c1020",
		// 三级病害名称
		"checktypename": "混凝土L形裂缝",
		// 一级病害名称
		"checkgroupname": "裂缝",
		// 一级病害id
		"checkgroupid": "10000dg00001",
		// 二级病害id
		"stairgroupid": "10000dg00038",
		// 二级病害名称
		"stairgroupname": "L形裂缝",
		// 病害程度
		"strvaluearr": [{
				// 单位编号
				"k": "hzbrmc_lb_left_length_m",
				// 病害程度名称
				"n": "左腹板长度",
				// 病害程度值
				"v": "0.2",
				// 单位名称
				"u": "米"
			},
			{
				"k": "hzbrmc_lb_left_width_mm",
				"n": "左腹板宽度",
				"v": "0.3",
				"u": "毫米"
			},
			{
				"k": "hzbrmc_lb_right_length_m",
				"n": "右腹板长度",
				"v": "0",
				"u": "米"
			},
			{
				"k": "hzbrmc_lb_right_width_mm",
				"n": "右腹板宽度",
				"v": "0",
				"u": "毫米"
			},
			{
				"k": "hzbrmc_lb_bottom_length_m",
				"n": "底板长度",
				"v": "0.4",
				"u": "米"
			},
			{
				"k": "hzbrmc_lb_bottom_width_mm",
				"n": "底板宽度",
				"v": "0.5",
				"u": "毫米"
			}
		],
		// 标度
		"scale": "2"
	},
	// 图片数据
	"imginfo": {
		// 图片名称
		"imgtitle": "1-1#梁横向裂缝",
		// 图片宽度（平板应该用不到）
		"imgwidth": "0.40",
		// 图片默认宽度（平板应该用不到）
		"imgwidthdesc": "1",
		// 当前图片集合唯一值（平板应该用不到）
		"imgtag": "mgiqv5dd01myirtl8c2l83vr4d64lmc4v0g8md",
		// 图片列表
		"imglist": [{
			// 当前图片唯一值（平板应该用不到）
			"tag": "20220916105315460171",
			// 图片名称
			"filename": "thumb20220916105315460171.png",
			// 图片路径
			"dirpath": "pro_m1624439268_giqv5dd01myirtl8c2l83vr4d6/img/d20220916105314944",
			// 确定图片是否插入到报告（平板应该用不到）
			"flag": true,
			// 图片大小
			"filesize": "270.0kb"
		}]
	},
	// 音频数据
	"audioinfo": {
		// 音频列表
		"audiolist": [{
			// 当前音频唯一值（平板应该用不到）
			"tag": "20220916105315460171",
			// 音频名称
			"filename": "thumb20220916105315460171.png",
			// 音频路径
			"dirpath": "pro_m1624439268_giqv5dd01myirtl8c2l83vr4d6/img/d20220916105314944",
			// 音频大小
			"filesize": "270.0kb"
		}]
	},
	// 批量病害 不是批量为[] 是批量为memberid数组
	"memberidarr": [],
	// 批量病害构件数量
	"memberidarrNum": 1,
	// 批量病害构件唯一键
	"memberidarrKeys": "5087bab5-a286-4bc9-8d94-0fa4c2c3a09a"
}

// 初拟病害录入页所需json
const needjson = {
  // 部件id
  membertype:'b100001',
  // 构件名称
  membername:'1-1#',
  // 构件id
  memberid:'giqv5dd01myirtl8c2l83vr4d6_b100001_96395_0',
  // 构件类型
  areatype:'at0001',
  // 构件区域
  area:'at0001r1002',
  // 标度
  scale:'3',
  // 病害位置长宽高与其各自百分比
  // 病害位置-长度
	length: '10',
	// 病害位置-长度比例
	lengthratio: '12',
	// 病害位置-宽度
	width: '15',
	// 病害位置-宽度比例
	widthhratio: '5',
	// 病害位置-距顶
	top: '',
	// 病害位置-距顶比例
	topratio: '0',
  // 病害值（右侧根据病害类型动态生成的若干输入框）
  hzbrmc_area_m:'8',
  // ...
  // ...
  // 病害描述
  describeinfo:"混凝土破损、露筋,面积8@@平方米@@",
  // 位置描述
  locationinfo: "底板距0#台1.2m，左侧边缘0.75m处",
}