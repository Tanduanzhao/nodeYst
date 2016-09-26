import $ from 'jquery';
import {httpAddress} from '../config.js';
//异步读取数据
function ajaxFn(params){
    var params = {
        url:params.url || null,
        method:params.method || 'POST',
        data:params.data || {},
        callBack:params.callBack || function(){}
    }
    $.ajax({
        url:httpAddress +params.url,
        method:params.method,
        data:params.data
    }).then(function(res){
        if(res.state == 1){
            params.callBack(res);
        }else{
            alert(res.message);
            return false;
        }
    })
}
//首页数据加载
export const loadIndex = function(dispatch,args){
    
    var params ={
        yearMonth:args.yearMonth,
        areaId:args.areaId,
        searchAreaType:args.searchAreaType,
        callBack:args.callBack || function(){}
    }
    ajaxFn({
        url:'business/getMarketInfo',
        data:{
            yearMonth:params.yearMonth,
            areaId:params.areaId,
            searchAreaType:params.searchAreaType
        },
        callBack:(res)=>{
            if(res.state == 1){
                params.callBack(res);
            }else{
                alert(res.message);
            }
        }
    })
}
//省份加载
export const loadProvince = function(dispatch){
    ajaxFn({
        url:'business/getProvinceAreaAllInfo',
        callBack:(res)=>{
            dispatch({
                type:'LOADPROVICEN',
                data:res.datas
            });
        }
    })
}

//分类涨幅榜品种详情
export const loadSingleClassifyProduct = function(dispatch,args){
    ajaxFn({
        url:'business/getSalesBreedInfo',
        data:{
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null,
            salesId:args.salesId || null,
            searchAreaType:args.searchAreaType || null
        },
        callBack:(res)=>{
            args.callBack(res)
        }
    })
}

//分类涨幅榜品种列表
export const loadListClassifyProduct = function(dispatch,args){
    ajaxFn({
        url:'business/getBusinessSalesInfo',
        data:{
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null,
            searchAreaType:args.searchAreaType || null,
            pageNo:args.pageNo || 1
        },
        callBack:(res)=>{
            args.callBack(res)
        }
    })
}
//概念涨幅榜品种详情
export const loadSingleConceptProduct = function(dispatch,args){
    ajaxFn({
        url:'business/getConceptBreedInfo',
        data:{
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null,
            conceptId:args.conceptId || null,
            searchAreaType:args.searchAreaType || null
        },
        callBack:(res)=>{
            args.callBack(res)
        }
    })
}
//概念涨幅榜品种列表
export const loadListConceptProduct = function(dispatch,args){
    ajaxFn({
        url:'business/getBusinessConceptInfo',
        data:{
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null,
            searchAreaType:args.searchAreaType || null,
            pageNo:args.pageNo || 1
        },
        callBack:(res)=>{
            args.callBack(res)
        }
    })
}
//影响力排行榜列表
export const loadListBreedProduct = function(dispatch,args){
    ajaxFn({
        url:'business/getBusinessBreedByUpInfo',
        data:{
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null,
            searchAreaType:args.searchAreaType || null,
            pageNo:args.pageNo || 1
        },
        callBack:(res)=>{
            args.callBack(res)
        }
    })
}

//医院列表
export const loadListHospital = function(dispatch,args){
    ajaxFn({
        url:'business/getBusinessHospitalInfo',
        data:{
            searchName:args.searchName || null,
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null,
            pageNo:args.pageNo || null,
            hosLevel:args.hospitalLevel || null
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//发送反馈信息
export const sendFeedBackMessage = function(dispatch,args){
    ajaxFn({
        url:'business/insertBusinessFeedBackInfo',
        data:{
            feedContent:args.feedContent
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//药品列表
export const loadListDrug = function(dispatch,args){
    ajaxFn({
        url:'business/getProductAreaSimpleInfo',
        data:{
            searchName:args.searchName || null,
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null,
            pageNo:args.pageNo || null,
            hosLevel:args.hospitalLevel || null
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//药品内容
export const loadDrugContent = function(dispatch,args){
    ajaxFn({
        url:'business/getProductAreaDetailInfo',
        data:{
            id:args.salesId || null,
        },
        callBack:(res)=>{
            args.callBack(res)
        }
    })
}

//JS-SDK授权
export const loadJssdk = function(args){
    ajaxFn({
        url:'business/getJsSdkInfo',
        data:{
            strBackUrl:encodeURI(encodeURI(args.uri))
        },
        callBack:(res)=>{
            args.callBack(res)
        }
    })
}

//初始化用户
export const loadWx = function(args){
    ajaxFn({
        url:'business/getInitWxUser',
        data:{
            code:args.code
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//获取用户信息
export const loadUserInfo = function(args){
    ajaxFn({
        url:'business/getWxUserInfo',
        callBack:(res) =>{
            args.callBack(res);
        }
    })
}


//获取用户反馈列表
export const getBusinessFeedBackInfo = function(args){
    ajaxFn({
        url:'business/getBusinessFeedBackInfo',
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//发送反馈建议
export const insertBusinessFeedBackInfo = function(args){
    ajaxFn({
        url:'business/insertBusinessFeedBackInfo',
        data:{
            feedContent:args.feedContent
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//获取地理位置信息
export const getUserAreaInfo = function(args){
    ajaxFn({
        url:'business/getUserAreaInfo',
        data:{
            latitude:args.latitude,
            longitude:args.longitude
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//首页数据加载
export const loadNewrepor = function(args){
    ajaxFn({
        url:'business/firstPage',
        data:{
            searchName:args.searchName || null,
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null,
            pageNo:args.pageNo || null,
            hosLevel:args.hospitalLevel || null
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//图片
export const loadPicture = function(args){
    ajaxFn({
        url:'advertisement/getPicture',
        data:{
            searchName:args.searchName || null,
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//报告列表数据加载
export const loadReportList = function(args){
    ajaxFn({
        url:'business/getLastHotReport',
        data:{
            searchName:args.searchName || null,
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null,
            pageNo:args.pageNo || null,
            hosLevel:args.hospitalLevel || null,
            searchType:args.searchType,
            titleOrReportKey:args.titleOrReportKey,
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//中标数据加载
export const loadBidList = function(args){
    ajaxFn({
        url:'business/getBidList',
        data:{
            searchName:args.searchName || null,
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null,
            pageNo:args.pageNo || null,
            hosLevel:args.hospitalLevel || null
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//中标详情页数据加载
export const loadBidListContent = function(args){
    ajaxFn({
        url:'business/getBidDetail',
        data:{
            searchName:args.searchName || null,
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null,
            pageNo:args.pageNo || null,
            hosLevel:args.hospitalLevel || null
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
