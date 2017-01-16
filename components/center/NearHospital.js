/*
 药市通会员服务协议
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {getTencentMap,getUserAreaInfo} from '../function/ajax';
import Popup from '../popup';
class NearHospital extends Component{
    constructor(props){
        super(props);
        this.state={
            list:[]
        }
    }
    //渲染完成后调用
    componentDidMount(){
        this._loadData();
    }
    _loadData(){
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: (res)=> {
                getTencentMap({
                    place:encodeURI(encodeURI(this.props.params.place)),
                    lat:res.latitude,
                    long:res.longitude,
                    around:1000,
                    callBack:(res)=> {
                        console.log(res);
                        this.setState({
                            list:res.datas
                        })
                    }
                })
                //getTencentMap({
                //    lat:res.latitude,
                //    long:res.longitude
                //},1000,"医院",(res)=>{
                //    this.setState({
                //        list:res.data
                //    })
                //})
            }
        })
    }

    //开启微信内置地图查看
    _openMap(params){
        wx.openLocation({
            latitude: params.lat, // 纬度，浮点数，范围为90 ~ -90
            longitude: params.long, // 经度，浮点数，范围为180 ~ -180。
            name: params.place, // 位置名
            address: params.address, // 地址详情说明
            scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: 'http://weixin.qq.com' // 在查看位置界面底部显示的超链接,可点击跳转
        })
    }
    render(){
        return(
            <div className="root">
                <div ref="content" className="scroll-content">
                    <div className="list">
                        {
                            this.state.list.length == 0 ? null : this.state.list.data.map((ele)=>{
                                return (
                                    <div onClick={this._openMap.bind(this,{lat:ele.location.lat,long:ele.location.lng,place:ele.title,address:ele.address})} key={Math.random()} className="item item-icon-right item-text-wrap">
                                        <div>
                                            <div style={{marginBottom:'3px'}}>{ele.title}</div>
                                            <p>距离您{ele._distance}米</p>
                                            <p>{ele.address}</p>
                                            <i className="icon item-note ion-ios-arrow-right"></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

NearHospital.contextTypes = {
    router:React.PropTypes.object.isRequired
}

function select(state){
    return{
        userInfo:state.userInfo
    }
}
export default connect(select)(NearHospital);
