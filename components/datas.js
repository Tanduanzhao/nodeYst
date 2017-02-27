/*
 数据模块datas
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import FooterBar from './common/footerBar.js';
import {loadPicture,loadReportList} from './function/ajax';
import Loading from './common/loading';

var Slider = require('react-slick');
class Datas extends Component{
    constructor(props) {
        super(props);
        this.state ={
            loading:this.props.stores.loading,
            imgType:"POLICY_ADVERTISEMENT"
        }
    }
    marketAll(name,reportUrl,id){
        this.props.dispatch({
            type:'RESETSEARCH'
        })
        switch(name){
            case "分析报告" : return this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:11});
            case "政策专栏" : return this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:21});
            case "老吴专栏" : return this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:22});
            case "华招专栏" : return this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:23});
            case "目录分组" : return this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:31});
            case "入市价数据源" : return this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:32});
            case "政策准入" : this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:33});break;
            case "中标数据" : return this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:34});
            case "全国限价" : return this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:35});
            case "产品数据" : return this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:36});
            case "基药" : this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:37});this.props.dispatch({type: 'POLICYSEARCHCHANGE',searchName:""}); break;
            case "医保" : this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:38});this.props.dispatch({type: 'POLICYSEARCHCHANGE',searchName:""}); break;
            case "抗菌药物" : this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:39});this.props.dispatch({type: 'POLICYSEARCHCHANGE',searchName:""});break;
            case "低价药" : this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:40});this.props.dispatch({type: 'POLICYSEARCHCHANGE',searchName:""});break;
            case "辅助用药" : this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:41});this.props.dispatch({type: 'POLICYSEARCHCHANGE',searchName:""});break;
            case "质量层次" : this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:42});this.props.dispatch({type: 'POLICYSEARCHCHANGE',searchName:""}); break;
            case "广东省医院市场" : return (()=>{this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:50});this.props.dispatch({type: 'CHANGE', areaId:reportUrl,areaName:"广东省"})})();
            case "江苏省医院市场" : return (()=>{this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:51});this.props.dispatch({type: 'CHANGE', areaId:reportUrl,areaName:"江苏省"})})();
            case "北京市医院市场" : return (()=>{this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:52});this.props.dispatch({type: 'CHANGE', areaId:reportUrl,areaName:"北京市"})})();
            case "山东省医院市场" : return (()=>{this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:53});this.props.dispatch({type: 'CHANGE', areaId:reportUrl,areaName:"山东省"})})();
            case "山西省医院市场" : return (()=>{this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:54});this.props.dispatch({type: 'CHANGE', areaId:reportUrl,areaName:"山西省"})})();
            case "安徽省医院市场" : return (()=>{this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:55});this.props.dispatch({type: 'CHANGE', areaId:reportUrl,areaName:"安徽省"})})();
            case "江西省医院市场" : return (()=>{this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:56});this.props.dispatch({type: 'CHANGE', areaId:reportUrl,areaName:"江西省"})})();
            case "河南省医院市场" : return (()=>{this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:57});this.props.dispatch({type: 'CHANGE', areaId:reportUrl,areaName:"河南省"})})();
            case "湖北省医院市场" : return (()=>{this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:58});this.props.dispatch({type: 'CHANGE', areaId:reportUrl,areaName:"湖北省"})})();
            case "湖南省医院市场" : return (()=>{this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:59});this.props.dispatch({type: 'CHANGE', areaId:reportUrl,areaName:"湖南省"})})();
            case "其他省份历史数据" : return (()=>{this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:60});this.props.dispatch({type: 'CHANGE', areaId:reportUrl,areaName:"安徽省"})})();
        }
    }
    componentDidMount(){
        loadReportList({
            pageSize:5,
            columnId:4,
            callBack:(res)=>{
                if(this._calledComponentWillUnmount) return false;
                if (res){
                    this.props.dispatch({
                        type:'LOADMARKETATA',
                        marketdata:res.datas
                    });
                    this.props.dispatch({
                        type:'ssss',
                        loading:false
                    });
                }
            }
        });

        loadPicture({
            yearMonth:this.props.yearMonth,
            areaId:this.props.areaId,
            imgType:this.state.imgType,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADDATAIMG',
                    img: res.datas
                });
            }
        });
    }
    componentWillMount(){
    }
    render(){
        return(
            <div className="root datas" style={{"overflow":"auto"}}>
                {this.props.stores.img.length == 0? <Slidedefault {...this.props}/> : <Slide {...this.props}/>}
               <div  className="scroll-content has-header has-footer bgcf">
                   <Column {...this.props} marketAll={this.marketAll.bind(this)}/>
               </div>
                <FooterBar {...this.props}/>
            </div>
        )
    }
}
class Slide extends Component{
    render(){
        const settings = {
            className: '',
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight:false,
            autoplay:true,
            autoplaySpeed:4000
        };
        return(
            <Slider {...settings} {...this.props}>
                {
                    this.props.stores.img.map((ele,index)=>{
                        switch(ele.resourceType){
                            case "EXTERNAL": let url = '/picture/'+encodeURIComponent(ele.imgSource);return <div  key={ele.id+Math.random()}><Link to={url}><img src={ele.imgUrl}  alt=""/></Link></div>;
                            case "INTERNAL":return <div  key={ele.id+Math.random()}><Link to={ele.imgSource}><img src={ele.imgUrl}  alt=""/></Link></div>;
                            case "ORDER_REPORT":return <div key={ele.id+Math.random()}><img src={ele.imgUrl}  alt=""/></div>;
                            case "NO":return <div key={ele.id+Math.random()}><img src={ele.imgUrl}  alt=""/></div>;
                            default :return <div key={`img_${ele.id}`}><img src={ele.imgUrl} style={{"width":"100%"}} alt=""/></div>;
                        }
                    })

                }
            </Slider>
        )
    }
}
class Slidedefault extends Component{
    render(){
        const settings = {
            className: '',
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight:false,
            autoplay:true
        };
        return(
         <Slider {...settings} {...this.props}><div><img src="/images/home.jpg" alt=""/></div></Slider>
        )
    }
}
class Column extends Component{
    render(){
        return(
            <div className="column column-block">
                {
                    this.props.stores.marketdata.map((ele,index)=>{
                       return <Link  to="/marketAll" key={ele.id+Math.random()} onClick={()=>{this.props.marketAll(ele.title,ele.reportUrl,ele.id)}}>
                                    <img src={`/images/hospital_data_0${index}.jpg`} alt=""/>
                                    { ele.title == "其他省份历史数据"?"历史数据":"医院市场"}
                                </Link>
                    })
                }
                <Link to="/datas/groups" onClick={()=>{this.props.marketAll("目录分组")}}>
                    <img src="/images/datas_groups.jpg" alt=""/>
                    <b className="assertive">目录分组</b>
                </Link>
                <Link to="/datas/dataSources" onClick={()=>{this.props.marketAll("入市价数据源")}}>
                    <img src="/images/datas_dataSources.jpg" alt=""/>
                    <b className="assertive">入市价数据源</b>
                </Link>
                <Link to="/datas/policy" onClick={()=>{this.props.marketAll("政策准入")}}>
                    <img src="/images/column03.jpg" alt=""/>
                    政策准入
                </Link>
                <Link to="/datas/bidList" onClick={()=>{this.props.marketAll("中标数据")}}>
                    <img src="/images/column02.jpg" alt=""/>
                    中标数据
                </Link>
                <Link to="/datas/marketPrice" onClick={()=>{this.props.marketAll("全国限价")}}>
                    <img src="/images/column07.jpg" alt="" className="price-icon"/>
                    全国限价
                </Link>
                <Link to="/datas/product" onClick={()=>{this.props.marketAll("产品数据")}}>
                    <img src="/images/column05.jpg" alt=""/>
                    产品数据
                </Link>
                <Link to="/datas/policy/base" onClick={()=>{this.props.marketAll("基药")}}>
                    <img src="/images/column09.jpg" alt=""/>
                    基药
                </Link>
                <Link to="/datas/policy/insurance" onClick={()=>{this.props.marketAll("医保")}}>
                    <img src="/images/column10.jpg" alt=""/>
                    医保
                </Link>
                <Link to="/datas/policy/anti" onClick={()=>{this.props.marketAll("抗菌药物")}}>
                    <img src="/images/column11.jpg" alt=""/>
                    抗菌药物
                </Link>
                <Link to="/datas/policy/lowPrice" onClick={()=>{this.props.marketAll("低价药")}}>
                    <img src="/images/column12.jpg" alt=""/>
                    低价药
                </Link>
                <Link to="/datas/policy/assist" onClick={()=>{this.props.marketAll("辅助用药")}}>
                    <img src="/images/column13.jpg" alt=""/>
                    辅助用药
                </Link>
                <Link to="/datas/policy/quality" onClick={()=>{this.props.marketAll("质量层次")}}>
                    <img src="/images/level-img.jpg" alt=""/>
                    质量层次
                </Link>
            </div>
        )
    }
}
function select(state){
    return{
        stores:state.data,
        userInfo:state.userInfo
    }
}
Datas.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(Datas);