/*
    帮助中心
*/
import React,{Component} from 'react';
import {connect} from 'react-redux';
class Help extends Component{
    componentDidMount(){
    }
    render(){
        return(
            <div className="root">
                <HeaderBar {...this.props}/>
                <Main/>
            </div>
        )
    }
}

class HeaderBar extends Component{
    render(){
        return(
            <div className="bar bar-header bar-positive">
               <div className="title"> 公司简介</div>
            </div>
        )
    }
}
class Main extends Component{
    render(){
        return(
            <div className="scroll-content has-header padding bg-fff center-secondary">
                <p>
                    广东医睦科技有限公司（简称“医睦科技”）位于广州市珠江新城核心CBD商务区，是一家聚焦医疗领域信息化应用技术和服务的提供商。
                </p>
               <p>
                   “医睦科技”历时数年积累，将“思维导图”技术、“医药知识库”、“大数据标准”以及相关“政策法规”相结合，开发出适应医药市场发展的专业应用软件和移动端服务产品,为政府、医疗机构、企业提供底层的数据管理平台，提高数据互联互通的水平，为阳光采购、三医联动政策及客户的信息化发展提供支持。我们还将继续加大在研发方面的投入，为我国的医疗信息化发展作出贡献。
               </p>
                <p>
                    已上市产品经过众多机构的实践检验，明显提高了业内人士的工作效率，实现了部门间信息交流的互联互通，促进了医药信息数据共享，并为客户提供了更全面的分析维度，在客户中建立了良好的口碑，我们还将继续提高我们的服务质量，让客户更加满意。
                </p>
                <p>
                    我们的使命：不断为企业提供行业领先的信息化产品和高品质服务，帮助提高企业的效益及效率，最终实现社会价值和企业价值。
                </p>
                <h3>合作单位</h3>
                <img src="/images/user01.jpg" alt=""/>
            </div>
        )
    }
}
function select(state){
    return{

    }
}
export default connect(select)(Help);
