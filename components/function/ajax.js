import $ from 'jquery';
import {httpAddress} from '../config.js';

function ajaxFn(params){
    var params = {
        url:params.url || null,
        method:params.method || 'POST',
        data:params.data || {},
        callBack:params.callBack || function(){}
    }
    console.log(params);
    $.ajax({
        url:params.url,
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

export const loadIndex = function(dispatch,args){
    
    var params ={
        yearMonth:args.yearMonth,
        areaId:args.areaId,
        searchAreaType:args.searchAreaType,
        callBack:args.callBack || function(){}
    }
    ajaxFn({
        url:httpAddress +'getMarketInfo',
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

export const loadProvince = function(dispatch){
    ajaxFn({
        url:httpAddress +'getProvinceAreaAllInfo',
        callBack:(res)=>{
            dispatch({
                type:'LOADPROVICEN',
                data:res.datas
            });
        }
    })
}