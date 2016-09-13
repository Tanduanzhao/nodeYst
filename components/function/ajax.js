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
        url:'getMarketInfo',
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
        url:'getProvinceAreaAllInfo',
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
        url:'getSalesBreedInfo',
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
        url:'getBusinessSalesInfo',
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
        url:'getConceptBreedInfo',
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
        url:'getBusinessConceptInfo',
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
        url:'getBusinessBreedByUpInfo',
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
        url:'getBusinessHospitalInfo',
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

//药品列表
export const loadListDrug = function(dispatch,args){
    ajaxFn({
        url:'getProductAreaSimpleInfo',
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