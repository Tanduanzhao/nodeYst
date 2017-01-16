/*
 药市通会员服务协议
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
class BecomeManager extends Component{
    render(){
        return(
            <div className="root">
                <div className="scroll-content become-manager">
                    <img src="/images/bg_becomeManager.jpg" alt="" style={{width:'100%'}}/>
                    <div  className="padding center-secondary" style={{textAlign: 'center'}}>
                        <img src="/images/becomeManage_title.jpg" alt="" style={{width:"80%",margin:'23px auto 39px'}}/>
                        <div  style={{margin:'0 10px 15px 10px',letterSpacing: '1px'}}>
                            您当前的服务等级为1,赶紧进入您的个人中心发展您的客户吧！
                        </div>
                        <div className="bar bar-button">
                            <Link to="/center" className="button button-positive">我知道了</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

BecomeManager.contextTypes = {
    router:React.PropTypes.object.isRequired
}

function select(state){
    return{

    }
}
export default connect(select)(BecomeManager);
