/*
    数据模块datas
*/
import React,{Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import FooterBar from './footerBar.js';
class Datas extends Component{
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
            <div className="root">
                <div className="scroll-content row data-views">
                    <div className="col-50">
                        <Link to="/datas/hospitalList">
                            <i className="fa fa-hospital-o"></i>
                            医院列表
                        </Link>
                    </div>
                    <div className="col-50">
                        <Link to="/datas/drugList">
                            <i className="fa fa-book"></i>
                            用药目录
                        </Link>
                    </div>
                    <div className="col-50">
                        <Link to="/datas/bidList">
                            <i className="fa fa-line-chart"></i>
                            中标数据
                        </Link>
                    </div>
                </div>
                <FooterBar {...this.props}/>
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