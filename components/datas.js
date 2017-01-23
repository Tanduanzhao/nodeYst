/*
 数据模块datas
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import FooterBar from './common/footerBar.js';
import {loadPicture} from './function/ajax';
import Loading from './common/loading';

var Slider = require('react-slick');
class Datas extends Component{
    constructor(props) {
        super(props);
        this.state ={
            loading:this.props.datas.loading,
            imgType:"POLICY_ADVERTISEMENT"
        }
    }
    componentDidMount(){
        loadPicture({
            yearMonth:this.props.yearMonth,
            areaId:this.props.areaId,
            imgType:this.state.imgType,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADDATAIMG',
                    img: res.datas
                });
                this.props.dispatch({
                    type:'ssss',
                    loading:false
                });
            }
        });
    }
    componentWillMount(){
        //if(!this.props.userInfo.isVip){
        //    this.props.dispatch({
        //        type:'OPENVIP'
        //    });
        //    this.context.router.push('/pay/vip');
        //}
    }
    render(){
        return(
            <div className="root datas" style={{"overflow":"auto"}}>
                {this.props.datas.img.length == 0? <Slidedefault {...this.props}/> : <Slide {...this.props}/>}
               <div  className="scroll-content has-header has-footer bgcf">
                   <Column {...this.props}/>
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
                    this.props.datas.img.map((ele,index)=>{
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
            <ul className="column column-block">
                <Link to="/datas/groups">
                    <img src="/images/datas_groups.jpg" alt=""/>
                    <b className="assertive">目录分组</b>
                </Link>
                <Link to="/datas/dataSources">
                    <img src="/images/datas_dataSources.jpg" alt=""/>
                    <b className="assertive">入市价数据源</b>
                </Link>
                <Link to="/datas/policy">
                    <img src="/images/column03.jpg" alt=""/>
                    政策准入
                </Link>
                <Link to="/datas/bidList">
                    <img src="/images/column02.jpg" alt=""/>
                    中标数据
                </Link>
                <Link to="/datas/marketPrice">
                    <img src="/images/column07.jpg" alt="" className="price-icon"/>
                    全国限价
                </Link>
                <Link to="/datas/product">
                    <img src="/images/column05.jpg" alt=""/>
                    产品数据
                </Link>
                <Link to="/datas/policy/base">
                    <img src="/images/column09.jpg" alt=""/>
                    基药
                </Link>
                <Link to="/datas/policy/insurance">
                    <img src="/images/column10.jpg" alt=""/>
                    医保
                </Link>
                <Link to="/datas/policy/anti">
                    <img src="/images/column11.jpg" alt=""/>
                    抗菌药物
                </Link>
                <Link to="/datas/policy/lowPrice">
                    <img src="/images/column12.jpg" alt=""/>
                    低价药
                </Link>
                <Link to="/datas/policy/assist">
                    <img src="/images/column13.jpg" alt=""/>
                    辅助用药
                </Link>
                <Link to="/datas/policy/quality">
                    <img src="/images/level-img.jpg" alt=""/>
                    质量层次
                </Link>
            </ul>
        )
    }
}
function select(state){
    return{
        datas:state.data,
        userInfo:state.userInfo
    }
}
Datas.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(Datas);