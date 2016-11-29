import $ from 'jquery';
import {httpAddress} from '../config.js';
import {encode} from './common';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import ystReducers from '../../reducer/reducer.js';
export var store = createStore(ystReducers,applyMiddleware(thunk));
import {Token} from './token';
import {url2obj} from './common';
function ajaxFn(params){
//    if(store.getState().userInfo.isLogin||url2obj().code){
//        console.log(store.getState().userInfo.isLogin,"ss")
//        var params = {
//            url:params.url || null,
//            method:params.method || 'POST',
//            data:params.data || {},
//            callBack:params.callBack || function(){}
//        };
//        $.ajax({
//            url:httpAddress+'business/getInitWxUser',
//            data:{
//                code:url2obj().code
//            },
//            success:function(res){
//                console.log(url2obj().code)
//                console.log(res)
//                if(res.datas){
//                    store.dispatch({
//                        type:'LOADUSERINFO',
//                        datas:res.datas
//                    });
//                    name=res.datas.id;
//                    alert("ajax")
//                    $.ajax({
//                        url:httpAddress +params.url,
//                        method:params.method,
//                        data:params.data
//                    }).then(function(res){
//                        if(res.state == 1){
//                            params.callBack(res);
//                        }else{
////            alert(res.message);
//                            params.callBack();
//                        }
//                    })
//                }
//            }
//
    var params = {
            url:params.url || null,
            method:params.method || 'POST',
            data:params.data || {},
            callBack:params.callBack || function(){}
        };
    $.ajax({
        url:httpAddress +params.url,
        method:params.method,
        data:params.data
    }).then(function(res){
        if(!store.getState().userInfo.isLogin){
            $.ajax({
                url: httpAddress + 'business/getInitWxUser',
                data: {
                    code: url2obj().code
                },
                success: function (res) {
                    if (res.datas) {
                        store.dispatch({
                            type: 'LOADUSERINFO',
                            datas: res.datas
                        });
                        name = res.datas.id;
                    }
                }
            })
        }
        if(res.state == 1 ){
            if(store.getState().userInfo.isLogin){
                params.callBack(res);
            }else{
                ajaxFn(params)
            }
        }else{
            // alert(res.message);
            params.callBack();
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
            code:args.code,
            recommender:args.recommender
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
            areaId:args.areaId || null,
            imgType:args.imgType || null
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//专栏订阅列表
export const getCiReportColumnList = function(args){
    ajaxFn({
        url:'business/getCiReportColumnList',
        data:{
            titleOrReportKey:args.titleOrReportKey|| null,
            pageNo:args.pageNo || null,
            pageSize:args.pageSize || null
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//专栏订阅分类列表
export const getReportColumnTypeList = function(args){
    ajaxFn({
        url:'business/getReportColumnTypeList',
        data:{
            columnId:args.columnId|| null,
            titleOrReportKey:args.titleOrReportKey|| null,
            pageNo:args.pageNo || null,
            pageSize:args.pageSize || null
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//专栏订阅详情
export const getColumnReportList = function(args){
    ajaxFn({
        url:'business/getColumnReportList',
        data:{
            columnId:args.columnId|| null,
            titleOrReportKey:args.titleOrReportKey|| null,
            pageNo:args.pageNo || null,
            pageSize:args.pageSize || null
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//课程点赞
export const insertLikeReport = function(args){
    ajaxFn({
        url:'business/insertLikeReport',
        data:{
            reportId:args.reportId|| null
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
            reportType:args.reportType || null,
            pageNo:args.pageNo || null,
            searchType:args.searchType,
            titleOrReportKey:args.titleOrReportKey,
            sidx:args.sidx ,
            sord:args.sord ,
            costStatus:args.costStatus,
            pageSize:args.pageSize || null
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
            pageNo:args.pageNo || null
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//中标数据
export const loadProd = function(args){
    ajaxFn({
        url:'business/getTradeProductList',
        data:{
            searchName:args.searchName || null,
            yearMonth:args.yearMonth || null,
            areaId:args.areaId || null,
            pageNo:args.pageNo || null,
            hosLevel:args.hospitalLevel || null,
            tradeType:args.tradeType,
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
            areaId:args.areaId || null,
            sord:args.sord || null,
            sidx:args.sidx || null,
            pageNo:args.pageNo || null,
            searchName:args.searchName || null,
            searchProductStatus:args.searchProductStatus || null,
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//中标数据省份信息加载
export const getBidAreaInfo = function(args){
    ajaxFn({
        url:'business/getBidAreaInfo',
        data:{
            searchName:args.searchName || null,
            pageNo:args.pageNo || null,
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//项目状态
export const getProjectStatus = function(args){
    ajaxFn({
        url:'business/getProjectStatus',
        data:{
            statusType:"REPROT_TYPE",
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//已购报告加载
export const loadProduct = function(args){
    ajaxFn({
        url:'business/getUserBuyReportList',
        data:{
            reportType:args.reportType || null,
            pageNo:args.pageNo || null,
            searchType:args.searchType,
            titleOrReportKey:args.titleOrReportKey,
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//用户点击查看/购买报告
export const insertUserAction = function(args){
    ajaxFn({
        url:'business/insertUserAction',
        data:{
            reportId:args.reportId,
            costStatus:args.costStatus,
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//报告类型
export const getReportType = function(args){
    ajaxFn({
        url:'business/getReportType',
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//政策准入6大板块加载
export const loadPolicyModules = function(args){
    ajaxFn({
        url:'business/getPolicyAccessList',
        data:{
            areaId:args.areaId,
            searchName:encode(args.searchName) || null
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//质量层次简版
export const loadQualitySimple = function(args){
    ajaxFn({
        url:'business/getQualityLevelList',
        data:{
            searchName:encode(args.searchName),
            pageNo:args.pageNo
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//加载质量层次筛选列表项-质量层次
export const loadQualityFilter = function(args){
    ajaxFn({
        url:'business/getQualityLevelSearchMenu',
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//加载质量层次筛选列表项-来源
export const loadQualityFilterForm = function(args){
    ajaxFn({
        url:'business/getQlGradeSearchMenu',
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//质量层次全部
export const loadQualityAll = function(args){
    ajaxFn({
        url:'business/getQualityLevelDetail',
        data:{
            searchName:encode(args.searchName),
            qualityLevelType:args.qualityLevelTypeId,
            gradeId:args.gradeId,
            pageNo:args.pageNo
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//基药简版
export const loadBaseSimple = function(args){
    ajaxFn({
        url:'business/getBasicDrugList',
        data:{
            searchName:encode(args.searchName),
            areaId:args.areaId,
            catalogEditionId:args.catalogEditionId,
            pageNo:args.pageNo
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//加载基药筛选列表项
export const loadBaseFilter = function(args){
    ajaxFn({
        url:'business/getBasicDrugSearchMenu',
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//基药全部
export const loadBaseAll = function(args){
    ajaxFn({
        url:'business/getBasicDrugDetail',
        data:{
            searchName:encode(args.searchName),
            areaId:args.areaId,
            catalogEditionId:args.catalogEditionId,
            gradeId:args.gradeId,
            pageNo:args.pageNo
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//医保简版
export const loadInsuranceSimple = function(args){
    ajaxFn({
        url:'business/getPqriList',
        data:{
            searchName:encode(args.searchName),
            areaId:args.areaId,
            catalogEditionId:args.catalogEditionId,
            pageNo:args.pageNo
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//加载医保筛选列表项
export const loadInsuranceFilter = function(args){
    ajaxFn({
        url:'business/getPqriSearchMenu',
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//医保全部
export const loadInsuranceAll = function(args){
    ajaxFn({
        url:'business/getPqriDetail',
        data:{
            searchName:encode(args.searchName),
            areaId:args.areaId,
            catalogEditionId:args.catalogEditionId,
            gradeId:args.gradeId,
            pageNo:args.pageNo
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//辅助用药简版
export const loadAssistSimple = function(args){
    ajaxFn({
        url:'business/getAssistDrugList',
        data:{
            searchName:encode(args.searchName),
            areaId:args.areaId,
            pageNo:args.pageNo
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//加载辅助用药筛选列表项
export const loadAssistFilter = function(args){
    ajaxFn({
        url:'business/getAssistDrugSearchMenu',
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//辅助用药全部
export const loadAssistAll = function(args){
    ajaxFn({
        url:'business/getAssistDrugDetail',
        data:{
            searchName:encode(args.searchName),
            areaId:args.areaId,
            gradeId:args.gradeId,
            pageNo:args.pageNo
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//低价药简版
export const loadLowPriceSimple = function(args){
    ajaxFn({
        url:'business/getLowPriceDrugList',
        data:{
            searchName:encode(args.searchName),
            areaId:args.areaId,
            pageNo:args.pageNo
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//加载辅助用药筛选列表项
export const loadLowPriceFilter = function(args){
    ajaxFn({
        url:'business/getLowPriceDrugSearchMenu',
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//低价药全部
export const loadLowPriceAll = function(args){
    ajaxFn({
        url:'business/getLowPriceDrugDetail',
        data:{
            searchName:encode(args.searchName),
            areaId:args.areaId,
            gradeId:args.gradeId,
            pageNo:args.pageNo
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//抗菌药物简版
export const loadAntiSimple = function(args){
    ajaxFn({
        url:'business/getAntibioDrugList',
        data:{
            searchName:encode(args.searchName),
            areaId:args.areaId,
            catalogEditionId:args.catalogEditionId,
            pageNo:args.pageNo
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//加载抗菌药物筛选列表项
export const loadAntiFilter = function(args){
    ajaxFn({
        url:'business/getAntibioDrugSearchMenu',
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//抗菌药物全部
export const loadAntiAll = function(args){
    ajaxFn({
        url:'business/getAntibioDrugDetail',
        data:{
            searchName:encode(args.searchName),
            areaId:args.areaId,
            catalogEditionId:args.catalogEditionId,
            gradeId:args.gradeId,
            pageNo:args.pageNo
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//请求政策准入数据
export const loadPolicyProvince = function(args){
    ajaxFn({
        url:'business/getProductAreaList',
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//政策准入数据按关键词搜索通用名
export const loadPolicySearch = function(args){
    ajaxFn({
        url:'business/getProductGenericName',
        data:{
            searchName:encode(args.searchName)
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//获取金银活动状态
export const loadJoinActivity = function(args){
    ajaxFn({
        url:'partakeActivity/isJoinActivity',
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//读取报告更新状态
export const loadRecordContent = function(args){
    ajaxFn({
        url:'partakeRecord/getRecordContent',
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
//读取报告
export const loadReport = function(args){
    ajaxFn({
        url:'pub/getPubReportHtml',
        data:{
            reportId:args.id
        },
        callBack:(res)=>{
            args.callBack(res)
        }
    })
}

//加载收藏报告
export const getReportKeepList = function(args){
    ajaxFn({
        url:'business/getReportKeepList',
        data:{
            reportType:args.reportType || null,
            pageNo:args.pageNo || null,
            searchType:args.searchType,
            titleOrReportKey:args.titleOrReportKey,
            sidx:args.sidx ,
            sord:args.sord ,
            costStatus:args.costStatus
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//收藏报告
export const keepReport = function(args){
    ajaxFn({
        url:'business/keepReport',
        data:{
            reportId:args.reportId
        },
        callBack:(res)=>{
            args.callBack(res)
        }
    })
}

//取消收藏报告
export const cancelKeepReport = function(args){
    ajaxFn({
        url:'business/cancelKeepReport',
        data:{
            reportId:args.reportId
        },
        callBack:(res)=>{
            args.callBack(res)
        }
    })
}

   //中标详情页数据加载
export const getAllBidList = function(args){
    ajaxFn({
        url:'business/getAllBidList',
        data:{
            codeProId:args.codeProId || null,
            areaId:args.areaId || null,
            sord:args.sord || null,
            sidx:args.sidx || null,
            pageNo:args.pageNo || null,
            searchName:args.searchName || null,
            searchProductStatus:args.searchProductStatus || null,
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}

//获取地理位置信息
export const insertReportShare = function(args){
    ajaxFn({
        url:'business/insertReportShare',
        data:{
            shareUserId:args.shareUserId,
            reportId:args.reportId
        },
        callBack:(res)=>{
            args.callBack(res);
        }
    })
}
