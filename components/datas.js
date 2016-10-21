/*
 数据模块datas
 */
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import FooterBar from './footerBar.js';
import {loadPicture} from './function/ajax';
import Loading from './loading';

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
        console.log(this.props.userInfo.isVip);
        if(!this.props.userInfo.isVip){
            this.props.dispatch({
                type:'OPENVIP'
            });
            this.context.router.push('/vip');
        }
    }
    render(){
        return(
            <div className="root datas" style={{"overflow":"auto"}}>
                {this.props.datas.img.length == 0? <Slidedefault {...this.props}/> : <Slide {...this.props}/>}
               <div  className="scroll-content has-header bgcf">
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
            autoplay:true
        };
        return(
            <Slider {...settings} {...this.props}>
                {
                    this.props.datas.img.map((ele,index)=> <div key={`img_${ele.id}`}><img src={ele.imgUrl} style={{"width":"100%"}} alt=""/></div>)
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
                    入市价
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
                <Link to="/datas/policy">
                    <img src="/images/column14.jpg" alt=""/>
                    专利
                </Link>
                <Link to="/datas/policy">
                    <img src="/images/column15.jpg" alt=""/>
                    过期专利
                </Link>
                <Link to="/datas/policy">
                    <img src="/images/column16.jpg" alt=""/>
                    一类新药
                </Link>
                <Link to="/datas/policy">
                    <img src="/images/column17.jpg" alt=""/>
                    首仿
                </Link>
                <Link to="/datas/policy">
                    <img src="/images/column18.jpg" alt=""/>
                    欧盟认证
                </Link>
                <Link to="/datas/policy">
                    <img src="/images/column19.jpg" alt=""/>
                    美国认证
                </Link>
                <Link to="/datas/policy">
                    <img src="/images/column20.jpg" alt=""/>
                    日本认证
                </Link>
                <Link to="/datas/policy">
                    <img src="/images/column21.jpg" alt=""/>
                    国家科技奖
                </Link>
                <Link to="/datas/policy">
                    <img src="/images/column22.jpg" alt=""/>
                    中药保密处方
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