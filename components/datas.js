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
            loading:this.props.datas.loading
        }
    }
    componentDidMount(){
        loadPicture({
            yearMonth:this.props.yearMonth,
            areaId:this.props.areaId,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADHOMEIMG',
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
        if(!this.props.datas.isVip){
            this.props.dispatch({
                type:'CHANGEVIP'
            });
            this.context.router.push('/vip');
        }
    }
    render(){
        return(
            <div className="root" style={{"overflow":"auto"}}>
                {this.state.loading ? <Loading/> : <Slide {...this.props}/>}
                <Column {...this.props}/>
                <div className="item item-divider home-item-title">
                    <strong>数据简介</strong>
                </div>
                <div className="content">

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
                    this.props.datas.img.length?this.props.home.img.map((ele,index)=> <div key={`img_${ele.id}`}><img src={ele.imgUrl} style={{"width":"100%"}} alt=""/></div>):<div><img src="/images/home.jpg" alt=""/></div>
                }
            </Slider>
        )
    }
}
class Column extends Component{
    render(){
        return(
            <div>
                <ul className="column">
                    <Link to="/datas/bidList">
                        <img src="/images/column02.jpg" alt=""/>
                        中标数据
                    </Link>
                    <Link to="/datas/product">
                        <img src="/images/column05.jpg" alt=""/>
                        产品数据
                    </Link>
                    <Link to="/datas/policy">
                        <img src="/images/column03.jpg" alt=""/>
                        政策准入
                    </Link>
                    <Link to="/datas/marketPrice">
                        <img src="/images/column07.jpg" alt="" className="price-icon"/>
                        广东省入市价
                    </Link>
                    <Link to="/datas/hospitalList">
                        <img src="/images/column03.jpg" alt="" className="price-icon"/>
                        医院列表
                    </Link>
                    <Link to="/datas/drugList">
                        <img src="/images/column03.jpg" alt="" className="price-icon"/>
                        用药目录
                    </Link>
                </ul>
            </div>
        )
    }
}
function select(state){
    return{
        uri:state.router.uri,
        datas:state.data
    }
}
Datas.contextTypes = {
    router:React.PropTypes.object.isRequired
}
export default connect(select)(Datas);