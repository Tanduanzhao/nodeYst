export const DEFAULT = 'DEFAULT';
//改变默认数据
export const SHOW = 'SHOW';
//首页显示省份
export const UNSHOW = 'UNSHOW';
//首页不显示省份
export const LOADDATA = 'LOADDATA';
//加载行情数据
export const CHANGE = 'CHANGE';
//触发行情过滤条件改变
export const LOADPROVICEN = 'LOADPROVICEN';
//省份数据
export const INCREASE = 'INCREASE';
//行情时间增加
export const DECREASE = 'DECREASE';
//行情时间减少
export const CHANGEDATA = 'CHANGEDATA';
//传入具体时间－时间改变 参数:yearMonth
export const ROUTER = 'ROUTER';
//改变路由地址  参数:uri
export const CHANGEHOSPITALFILTER = 'CHANGEHOSPITALFILTER';
//医院列表筛选条件改变  参数:areaName、areaId、searchAreaType、yearMonth、hospitalLevel
export const SHOWFILTER = 'SHOWFILTER';
//显示医院列表过滤层
export const UNSHOWFILTER = 'UNSHOWFILTER';
//隐藏医院列表过滤层
export const CHANGEHOSPITALSEARCHNAME = 'CHANGEHOSPITALSEARCHNAME';
//改变医院列表搜索关键字  参数:searchName
export const CLEARHOSPITALSEARCHNAME = 'CLEARHOSPITALSEARCHNAME';
//清空医院列表搜索关键字
export const LOADHOSPITALDATA = 'LOADHOSPITALDATA';
//加载医院列表数据  参数:pageNo、data
export const INFINITE = 'INFINITE';
//不允许无限滚动-医院列表
export const UNINFINITE = 'UNINFINITE';
//允许无限滚动-医院列表

export const LOADFEEDBACK = 'LOADFEEDBACK';
//加载反馈列表数据  参数:message

export const CHANGEDRUGFILTER = 'CHANGEDRUGFILTER';
//改变用药目录筛选条件  参数:areaName、areaId、searchAreaType、yearMonth、hospitalLevel
export const SHOWFILTERDRUG = 'SHOWFILTERDRUG';
//显示用药目录过滤层

export const CHANGEDRUGSEARCHNAME = 'CHANGEDRUGSEARCHNAME';

//改变用药目录搜索关键字  参数:searchName
export const CLEADRUGSEARCHNAME = 'CLEADRUGSEARCHNAME';
//清空用药目录搜索关键字
export const INFINITEDRUG = 'INFINITEDRUG';
//不允许无限滚动-用药目录
export const UNINFINITEDRUG = 'UNINFINITEDRUG';
//允许无限滚动-用药目录

export const LOADDRUGDATA = 'LOADDRUGDATA';
//加载用药目录数据 参数:pageNo、data
export const DRUGCONTENTDATA = 'DRUGCONTENTDATA';
//加载用药目录药品页面详细数据 参数:drugContentData

export const LOADBIFLISTDATA = 'LOADBIFLISTDATA';
//加载中标数据
export const LOADBIFLISTCONTENTDATA = 'LOADBIFLISTCONTENTDATA';
//加载中标详情数据
export const UNSHOWFILTERPBIDLIST = 'UNSHOWFILTERPBIDLIST';
//隐藏中标详情数据过滤层

export const SHOWFILTERPRODUCE = 'SHOWFILTERPRODUCE';
//显示报告过滤层
export const UNSHOWFILTERPRODUCE = 'UNSHOWFILTERPRODUCE';
//隐藏报告过滤层
export const LOADPRODUCEDATA = 'LOADPRODUCEDATA';
//加载报告数据
export const LOGIN = 'LOGIN';
//用户登录
export const LOADUSERINFO = 'LOADUSERINFO';
//加载用户数据  参数:imgUrl、id、userName
export const CHANGEVIP = 'CHANGEVIP';
//改变数据加载中的vip状态
export const LOADHOMEDATA = 'LOADHOMEDATA';
//加载home数据
export const LOADHOMEIMG = 'LOADHOMEIMG';
//加载home图片

export const CHANGETYPE = 'CHANGETYPE';
