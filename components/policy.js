/*
    政策准入
*/

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import More from './datas/more';
import FilterPolicy from './filterPolicy';
import Loading from './loading';
import EmptyComponent from './emptyComponent';
import {loadPolicyModules,loadQualitySimple,loadBaseSimple,loadInsuranceSimple,loadAssistSimple,loadLowPriceSimple,loadAntiSimple,loadPolicyProvince,loadPolicySearch} from './function/ajax';
class Policy extends Component{
    constructor(props){
        super(props);
        this._loadProvince = this._loadProvince.bind(this);
        this._showFilter = this._showFilter.bind(this);
        this._cancelButton = this._cancelButton.bind(this);
        this._hideSlider = this._hideSlider.bind(this);
        this.state={
            isLoading:false,
            isShowFilter:false,
            isShowSlider:false,
            searchDatas:[],
            defaultValue:''
        };
    }
    componentDidMount(){
        this.ele = this.refs.main;
        this.ele.addEventListener("scroll",(e)=>{
            this._isNeedLoadData();
        });
        //第一屏需要执行两个方法  1、加载模块标签；2、加载第一模块数据
        if(this.props.policy.modules.length ==0){
            this._loadData();
        }
        
//        this._isNeedLoadData();
        if(this.props.policy.provinces == 0){
            this._loadProvince();   
        }
    }
    //判断屏幕是否加载满
    _isNeedLoadData(){
        if(this.ele.scrollHeight-this.ele.scrollTop <= this.ele.clientHeight && this.props.policy.loadState <= 6 && !this.state.isLoading){
            //匹配this.props.policy.loadState分步加载6大模块
            console.log(this.props.policy.loadState);
            switch(this.props.policy.loadState){
                case 1 : return this._loadQuality();
                case 2 : return this._loadBase();
                case 3 : return this._loadInsurance();
                case 4 : return this._loadAssist();
                case 5 : return this._loadLowPrice();
                case 6 : return this._loadAnti();
                default : return false;
            } 
        }
    }
    
    //搜索词加载通用名列表
    _loadSearch(key){
        loadPolicySearch({
            searchName:key,
            callBack:(res)=>{
                this.setState({
                    searchDatas:res.datas
                });
                if(this.state.searchDatas.length == 0 || key.length == 0){
                    
                    this._hideSlider();
                }else{
                    this.setState({
                        isShowSlider:true
                    })
                };
            }
        })
    }
    
    _hideSlider(){
        this.setState({
            isShowSlider:false
        })
    }
    
    //加载6大模块
    _loadData(){
        this.setState({
            isLoading:true
        });
        loadPolicyModules({
            areaId:JSON.stringify(this.props.policy.areaId),
            searchName:this.props.policy.searchName,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADPOLICYMODULES',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false
                });
                setTimeout((res)=>{
                    this._loadQuality();
                },100);
            }
        })
    }
    //加载质量层次数据
    _loadQuality(){
        this.setState({
            isLoading:true
        });
        loadQualitySimple({
            searchName:this.props.policy.searchName,
            pageNo:this.props.policy.pageNo,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADPOLICYQUALITYDATA',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false
                });
                //判断当前模块数据是否加载完成
                if(this.props.policy.quality.length == res.totalSize){
                    this.props.dispatch({
                         type:'BREAKSTATE'      
                    });
                }else{
                    this.props.dispatch({
                        type:'PAGEPOLICYADD'
                    });
                };
                //如果质量层次没有数据需要再次去加载下面的数据
                if(this.props.policy.quality.length == 0){
                    this._loadBase();
                }
            }
        })
    }
    //加载基药数据
    _loadBase(){
        this.setState({
            isLoading:true
        });
        loadBaseSimple({
            searchName:this.props.policy.searchName,
            catalogEditionId:this.props.policy.modules[1].catalogEditionId || null,
            areaId:JSON.stringify(this.props.policy.areaId),
            pageNo:this.props.policy.pageNo,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADPOLICYBASEDATA',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false
                });
                //判断当前模块数据是否加载完成
                if(this.props.policy.base.length == res.totalSize){
                    this.props.dispatch({
                         type:'BREAKSTATE'      
                    });
                }else{
                    this.props.dispatch({
                        type:'PAGEPOLICYADD'
                    });
                }
                //如果基药没有数据需要再次去加载下面的数据
                if(this.props.policy.base.length == 0){
                    this._loadInsurance();
                }
            }
        })
    }
    //加载医保数据
    _loadInsurance(){
        this.setState({
            isLoading:true
        });
        loadInsuranceSimple({
            searchName:this.props.policy.searchName,
            areaId:JSON.stringify(this.props.policy.areaId),
            catalogEditionId:this.props.policy.modules[2].catalogEditionId || null,
            pageNo:this.props.policy.pageNo,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADPOLICYINSURANCEDATA',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false
                });
                //判断当前模块数据是否加载完成
                if(this.props.policy.insurance.length == res.totalSize){
                    this.props.dispatch({
                         type:'BREAKSTATE'      
                    });
                }else{
                    this.props.dispatch({
                        type:'PAGEPOLICYADD'
                    });
                }
                //如果质量层次没有数据需要再次去加载下面的数据
                if(this.props.policy.insurance.length == 0){
                    this._loadAssist();
                }
            }
        })
    }
    //加载辅助用药数据
    _loadAssist(){
        this.setState({
            isLoading:true
        });
        loadAssistSimple({
            searchName:this.props.policy.searchName,
            areaId:JSON.stringify(this.props.policy.areaId),
            pageNo:this.props.policy.pageNo,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADPOLICYASSISTDATA',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false
                });
                //判断当前模块数据是否加载完成
                if(this.props.policy.assist.length == res.totalSize){
                    this.props.dispatch({
                         type:'BREAKSTATE'      
                    });
                }else{
                    this.props.dispatch({
                        type:'PAGEPOLICYADD'
                    });
                }
                //如果质量层次没有数据需要再次去加载下面的数据
                if(this.props.policy.assist.length == 0){
                    this._loadLowPrice();
                }
            }
        })
    }
    //加载低价药数据
    _loadLowPrice(){
        this.setState({
            isLoading:true
        });
        loadLowPriceSimple({
            searchName:this.props.policy.searchName,
            areaId:JSON.stringify(this.props.policy.areaId),
            pageNo:this.props.policy.pageNo,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADPOLICYLOWPRICEDATA',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false
                });
                //判断当前模块数据是否加载完成
                if(this.props.policy.lowPrice.length == res.totalSize){
                    this.props.dispatch({
                         type:'BREAKSTATE'      
                    });
                }else{
                    this.props.dispatch({
                        type:'PAGEPOLICYADD'
                    });
                }
                //如果质量层次没有数据需要再次去加载下面的数据
                if(this.props.policy.lowPrice.length == 0){
                    this._loadAnti();
                }
            }
        })
    }
    //加载抗菌药物数据
    _loadAnti(){
        this.setState({
            isLoading:true
        });
        loadAntiSimple({
            searchName:this.props.policy.searchName,
            catalogEditionId:this.props.policy.modules[5].catalogEditionId || null,
            areaId:JSON.stringify(this.props.policy.areaId),
            pageNo:this.props.policy.pageNo,
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADPOLICYANTIDATA',
                    datas:res.datas
                });
                this.setState({
                    isLoading:false
                });
                //判断当前模块数据是否加载完成
                if(this.props.policy.anti.length == res.totalSize){
                    this.props.dispatch({
                         type:'BREAKSTATE'      
                    });
                }else{
                    this.props.dispatch({
                        type:'PAGEPOLICYADD'
                    });
                }
            }
        })
    }
    
    //改变筛选条件
    _fn(args){
        this.props.dispatch({
            type:'POLICYRESET',
            areaId:[args.areaId],
            areaName:args.areaName
        });
        this._cancelButton();
        setTimeout(()=>{
            this._loadData();
            this._isNeedLoadData();
        },100);
    }
    
    //请求省份数据接口
    _loadProvince(){
        loadPolicyProvince({
            callBack:(res)=>{
                this.props.dispatch({
                    type:'LOADPOLICYPROVINCE',
                    datas:res.datas
                });
            }
        });
    }
    
    //显示筛选条件
    _showFilter(){
        if(this.props.isVip == '0'){
            this.context.router.push('/vip');
            return false;
        }else{
            this.setState({
                isShowFilter:true
            });
        }
    }
    
    //关闭筛选条件
    _cancelButton(){
        this.setState({
            isShowFilter:false
        });
    }
    //搜索结果通用名点击查询对应数据
    _searchDatas(key){
        if(this.props.isVip == '0'){
           this.context.router.push('/vip');
            return false;
        }
//        console.dir(this.refs.header.ref.policySearchName);
        this.refs.header.refs.policySearchName.value=key;
        this.props.dispatch({
            type:'POLICYRESET',
            areaId:this.props.policy.areaId,
            areaName:this.props.policy.areaName
        });
        this.props.dispatch({
            type:'POLICYSEARCHCHANGE',
            searchName:key
        });
        this.setState({
            isShowFilter:false,
            searchDatas:[]
        });
        setTimeout(()=>{
            this.setState({
                defaultValue:key
            });
            this._loadData();
            this._isNeedLoadData();
        },10);
    }

    render(){
        return(
            <div className="root">
                <HeaderBar ref="header" hideAction={this._hideSlider.bind(this)} searchAction = {this._loadSearch.bind(this)} {...this.props} showFilter={this._showFilter}/>
                {
                    this.state.isShowSlider ? <Slider itemHandle={this._searchDatas.bind(this)} dataSources={this.state.searchDatas}/> : null
                }
                <div className="scroll-content has-header">
                    <div className="bar bar-header">
                        <h3 className="title"><i className="fa fa-cube"></i> {this.props.policy.searchName}</h3>
                    </div>
                    <div ref="main" className="scroll-content has-header">
                        <Main {...this.props}/>
                    </div>
                    <More/>
                </div>
                {
                    !this.state.isShowFilter ? null : <FilterPolicy dataSources={this.props.policy.provinces} areaId={this.props.policy.areaId} areaName={this.props.policy.areaName} fn={this._fn.bind(this)} cancelButton={this._cancelButton}/>  
                }
                {
                    !this.state.isLoading ? null : <Loading/>
                }
            </div>
        )
    }
}

class HeaderBar extends Component{
  _showProvicenHandle(){
    this.props.showFilter();
  }
  _hideSlider(){
      this.props.hideAction();
      this.refs.policySearchName.value = this.props.policy.searchName;
  }
  _changeHandle(){
      setTimeout(()=>{
          this.props.searchAction(this.refs.policySearchName.value);
      },1000);
  }
  render(){
    return(
      <div className="bar bar-header bar-positive item-input-inset">
        <div className="buttons">
            <button className="button" onClick={this._showProvicenHandle.bind(this)}><i className="fa fa-map-marker"></i><span style={{paddingLeft:'5px'}}>{this.props.policy.areaName}</span></button>
        </div>
        <label className="item-input-wrapper">
          <i className="icon ion-ios-search placeholder-icon"></i>
          <input ref="policySearchName" onChange={this._changeHandle.bind(this)} type="search" value={this.props.defaultValue} placeholder={this.props.policy.searchName}/>
        </label>
      </div>
    )
  }
}

class Main extends Component{   
    render(){
        console.log(this.props.policy.quality,'quality');
        return(
            <div className="list">
                <TitleBar title={this.props.policy.modules.length !=0 ? this.props.policy.modules[0].title : null}/>
                    {
                        this.props.policy.quality.length == 0? <EmptyComponent/> :
                <div className="card" style={{marginTop:0}}>
                    <div className="item item-divider item-text-wrap">
                        <i className="fa fa-tag
"></i> 来源：{this.props.policy.quality[0].grade}（{this.props.policy.quality[0].publishDate}）
                    </div>
                    <ul className="list">
                        {
                            typeof this.props.policy.quality[0].lists == 'undefined' ? null : this.props.policy.quality[0].lists.map((ele)=>{
                                var trandName = (()=>{
                                    var string = "";
                                    if( ele.trandName !="无"|| ele.trandName==null || ele.trandName==undefined){
                                        string += "（";
                                        string +=ele.trandName;
                                        string += " ）";
                                    }else{
                                        string = "";
                                    }
                                    return string;
                                })();
                                return(
                                    <li className="item" key={Math.random(1)}>
                                        <h2>{ele.productName}
                                            {trandName}
                                        </h2>
                                        <p>剂型/规格：{ele.prepName} / {ele.spec}</p>
                                        <p>生产企业：{ele.manufacturerName}</p>
                                        <p>
                                           {
                                               ele.qualityLevelTypes != null && ele.qualityLevelTypes.length > 0 ?  ele.qualityLevelTypes.map((ele)=>{
                                                    return(
                                                        <span className="tag" key={Math.random(1)}>{ele}</span>
                                                    )
                                                }):null
                                            }
                                        </p>
                                    </li>
                                )
                            }) 
                        }
                    </ul>
                    <MoreBar link={`/datas/policy/quality/${this.props.policy.quality[0].gradeId}`}/>
                </div>
                }
                <TitleBar title={this.props.policy.modules.length !=0 ? this.props.policy.modules[1].title : null}/>
                <div className="card" style={{marginTop:0}}>
                   {
                        this.props.policy.base.length == 0 ? <EmptyComponent/> : this.props.policy.base.map((ele)=>{
                               return(
                                    <div key={Math.random(2)}>
                                       <LinkBar title={`${ele.grade}(${ele.publishDate})`}/>
                                        <div className="item" style={{boxSizing:'content-box'}}>
                                            <table className="table-border" width="100%">
                                                <thead>
                                                    <tr>
                                                        <th>药品名称</th>
                                                        <th>剂型</th>
                                                        <th>规格</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   {
                                                        ele.lists.map((item)=>{
                                                            return(
                                                                <tr key={Math.random(1)}>
                                                                    <td>{item.productName}</td>
                                                                    <td>{item.prepName || null}</td>
                                                                    <td>{item.spec || null}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <MoreBar link={`/datas/policy/base/${ele.gradeId}/${ele.catalogEditionId}`}/>
                                   </div>
                               )
                        })
                    }
                </div>
                <TitleBar title={this.props.policy.modules.length !=0 ? this.props.policy.modules[2].title : null}/>
                <div className="card" style={{marginTop:0}}>
                    {
                      this.props.policy.insurance.length == 0 ? <EmptyComponent/> : this.props.policy.insurance.map((ele)=>{
                          return(
                            <div key={Math.random(2)}>
                                <LinkBar title={`${ele.grade}(${ele.publishDate})`}/>
                                <div className="item" style={{boxSizing:'content-box'}}>
                                    <table className="table-border" width="100%">
                                        <thead>
                                            <tr>
                                                <th>药品名称</th>
                                                <th>剂型</th>
                                                <th>医保类别</th>
                                                <th>医保编号</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {
                                                ele.lists.map((item)=>{
                                                    return(
                                                        <tr key={Math.random(1)}>
                                                            <td>{item.productName}</td>
                                                            <td>{item.prepName || null}</td>
                                                            <td>{item.pqriType || null}</td>
                                                            <td>{item.pqriCode || null}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <MoreBar link={`/datas/policy/insurance/${ele.gradeId}/${ele.catalogEditionId}`}/>
                            </div>
                          )
                      })
                    }
                </div>
                <TitleBar title={this.props.policy.modules.length !=0 ? this.props.policy.modules[3].title : null}/>
                <div className="card" style={{marginTop:0}}>
                    {
                      this.props.policy.assist.length == 0 ? <EmptyComponent/> : this.props.policy.assist.map((ele)=>{
                        return(
                            <div key={Math.random(2)}>
                                <LinkBar title={`${ele.grade}(${ele.publishDate})`}/>
                                <div className="item" style={{boxSizing:'content-box'}}>
                                    <table className="table-border" width="100%">
                                        <thead>
                                            <tr>
                                                <th>药品名称</th>
                                                <th>剂型</th>
                                                <th>规格</th>
                                                <th>包装</th>
                                                <th>生产企业</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                ele.lists.map((item)=>{
                                                    return(
                                                        <tr key={Math.random(1)}>
                                                            <td>{item.productName}</td>
                                                            <td>{item.prepName || null}</td>
                                                            <td>{item.spec || null}</td>
                                                            <td>{item.drugPack || null}</td>
                                                            <td>{item.manufacturerName || null}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <MoreBar link={`/datas/policy/assist/${ele.gradeId}/${ele.catalogEditionId}`}/>
                            </div>
                        )
                      })
                    }
                </div>
                <TitleBar title={this.props.policy.modules.length !=0 ? this.props.policy.modules[4].title : null}/>
                <div className="card" style={{marginTop:0}}>
                    {
                      this.props.policy.lowPrice.length == 0 ? <EmptyComponent/> : this.props.policy.lowPrice.map((ele)=>{
                        return(
                            <div key={Math.random(2)}>
                                <LinkBar title={`${ele.grade}(${ele.publishDate})`}/>
                                <div className="item" style={{boxSizing:'content-box'}}>
                                    <table className="table-border" width="100%">
                                        <thead>
                                            <tr>
                                                <th>药品名称</th>
                                                <th>剂型</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                ele.lists.map((item)=>{
                                                    return(
                                                        <tr key={Math.random(1)}>
                                                            <td>{item.productName}</td>
                                                            <td>{item.prepName || null}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <MoreBar link={`/datas/policy/lowPrice/${ele.gradeId}/${ele.catalogEditionId}`}/>
                            </div>
                        )
                      })
                    }
                </div>
                <TitleBar title={this.props.policy.modules.length !=0 ? this.props.policy.modules[5].title : null}/>
                <div className="card" style={{marginTop:0}}>
                    {
                      this.props.policy.anti.length == 0 ? <EmptyComponent/> : this.props.policy.anti.map((ele)=>{
                        return(
                            <div key={Math.random(2)}>
                                <LinkBar title={`${ele.grade}(${ele.publishDate})`}/>
                                <div className="item" style={{boxSizing:'content-box'}}>
                                    <table className="table-border" width="100%">
                                        <thead>
                                            <tr>
                                                <th>药品名称</th>
                                                <th>剂型</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                ele.lists.map((item)=>{
                                                    return(
                                                        <tr key={Math.random(1)}>
                                                            <td>{item.productName}</td>
                                                            <td>{item.antibioLevel || null}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <MoreBar link={`/datas/policy/anti/${ele.gradeId}/${ele.catalogEditionId}`}/>
                            </div>
                        )
                      })
                    }
                </div>
            </div>
        )
    }
}

class Slider extends Component{
    render(){
        return(
            <div className="slider-menu"  style={{position:'absolute',maxHeihgt:'300px',overFlow:'auto',top:'42px',zIndex:'99',width:'100%'}}>
                <ul className="list">
                   {
                        this.props.dataSources.map((ele)=>{
                            return <li key={ele.genericName} onClick={()=>this.props.itemHandle(ele.genericName)} className="item">{ele.genericName}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

class LinkBar extends Component{
	render(){
		return(
                <div className="item item-divider item-text-wrap">
                    <i className="fa fa-file-text-o"></i> 文号：{this.props.title}
                </div>
        )
	}
}
class TitleBar extends Component{
    render(){
        return(
            <div className="item">
                <strong>{this.props.title}</strong>
            </div>
        )
    }
}
class MoreBar extends Component{
    render(){
        return(
            <Link className="item text-center" to={`${this.props.link}`}>更多</Link>
        )
    }
}
const styles ={
    more:{
        position:'absolute',
        right:'1rem',
        fontSize:'1.2rem'
    }
}

function select(state){
    return {
        policy:state.policy,
        isVip:state.userInfo.isVip
    }
}

Policy.contextTypes = {
    router:React.PropTypes.object.isRequired
}

export default connect(select)(Policy);