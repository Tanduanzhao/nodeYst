/*
 收藏页面
 */
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {onBridgeReady} from './function/common';
import {getReportKeepList,getReportType,cancelKeepReport,requestUnifiedorderPayService} from './function/ajax';
import FooterBar from './common/footerBar';
import FilterCollect from './filterPage/filterCollect';
import Loading from './common/loading';
import ScrollLoading from './common/scrollLoading';
import EmptyComponent from './common/emptyComponent';
import Collectpopup from './collectpopup';
import ReportList from './reportList';
import CollectPrompt from './collectPrompt';
import HeaderBar from './common/headerbar.js';

class Collect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: this.props.report.searchType,
            loading: true,
            isSrollLoading:false,
            isLoadData:true,
            request: true,
            reportTag: this.props.report.reportTag,
            showPromptMes: false,
            showPrompt: false
        };
        this._loadData = this._loadData.bind(this);
        this._infiniteScroll = this._infiniteScroll.bind(this);
    }

    componentDidMount() {
        this.ele = this.refs.content;
        this.ele.addEventListener('scroll', this._infiniteScroll);
        this._getReportType();
        if(this.props.search.clickSearch){
            this._searchDatas(this.props.search.searchName);
            return false
        }
        this._loadData();
    }

    _loadData() {
        //this.setState({
        //    loading: true
        //});
        //this.setState({
        //    request: false
        //});
        getReportKeepList({
            sidx: this.props.report.sidx,
            sord: this.props.report.sord,
            pageNo: this.props.report.pageNo,
            searchType: this.props.report.searchType,
            reportType: this.props.report.reportType,
            costStatus: this.props.report.costStatus,
            columnBigType: this.props.report.columnBigType,
            titleOrReportKey: this.props.report.titleOrReportKey,
            callBack: (res)=> {
                if (this.state.showPrompt) {
                    setTimeout(()=> {
                        this.setState({
                            showPrompt: 0
                        })
                    }, 1000)
                }
                this.setState({
                    loading: false,
                    isLoadData:false,
                    isSrollLoading:true
                });
                this.props.dispatch({
                    type: 'LOADCOLLECT',
                    data: this.props.report.data.concat(res.datas),
                    pageNo: this.props.report.pageNo + 1
                });
                if (res.totalSize <= this.props.report.data.length) {
                    this.setState({
                        isSrollLoading:false
                    });
                    this.props.dispatch({
                        type: 'UNINFINITE'
                    });
                } else {
                    this.props.dispatch({
                        type: 'INFINITE'
                    });
                }
                //this.setState({
                //    request: true
                //});
            }
        });
    }

    _infiniteScroll() {
        //全部高度-滚动高度 == 屏幕高度-顶部偏移
        if (this.ele.firstChild.clientHeight - this.ele.scrollTop <= document.body.clientHeight - this.ele.offsetTop && !this.props.report.infinite) {
            if(this.state.isLoadData) return false;
            this.setState({
                isLoadData:true
            });
            this._loadData();
        }
    }

    //支付
    _sandboxPayService(id, self) {
        requestUnifiedorderPayService({
            id: id, fun: ()=> {
                this._loadData()
            }, callBack: onBridgeReady
        })
    }

    _getReportType() {
        getReportType({
            callBack: (res)=> {
                this.props.dispatch({
                    type: 'CHANGECOLLECTREPORTTYPEDATE',
                    ReportTypeDate: res.datas
                });
            }
        });
    }
    //显示搜索
    showSearch(){
        this.props.dispatch({type: 'CHANGESMALLTYPE',smallType:11});
        this.props.dispatch({
            type:'CLICKKSEARCH',
            clickSearch:false
        })
        setTimeout(()=>{
            this.context.router.push('/search');
        })
    }
    _fn(args) {
        if (!args.reportTag) {
            this.setState({
                reportTag: false
            });
        } else {
            this.setState({
                reportTag: true
            });
        }
        this.setState({
            loading: true
        });
        this.props.dispatch({
            type: 'LOADCOLLECT',
            data: [],
            pageNo: 1
        });
        this.props.dispatch({
            type: 'UNSHOWFILTERPRODUCE'
        })
        this.props.dispatch({
            type: 'SELECTCHANGERCOLLECT',
            searchType: args.searchType,
            reportType: encodeURI(encodeURI(args.reportType)),
            active: args.active,
            sord: args.sord,
            sidx: args.sidx,
            costStatus: args.costStatus,
            reportTag: args.reportTag,
            columnBigType: args.columnBigType
        });
        setTimeout(()=> {
            this._loadData();
        }, 100);
    }

    _searchDatas(key) {
        this.setState({
            loading: true
        });
        this.props.dispatch({
            type: 'CHANGECOLLECTTITLEORREPORTKEY',
            titleOrReportKey: key
        });
        this.props.dispatch({
            type: 'LOADCOLLECT',
            data: [],
            pageNo: 1
        });
        setTimeout(()=> this._loadData(), 100);
    }

    _collectPopupCancel() {
        this.setState({
            showPrompt: 1,
            showPromptMes: "取消收藏"
        });
        cancelKeepReport({
            reportId: this.props.report.showCollectPopupID,
            callBack: (res)=> {
                if (res.state == 1)
                    this.setState({
                        isKeep: 0
                    })
            }
        });
        this.props.dispatch({
            type: 'LOADCOLLECT',
            data: [],
            pageNo: 1
        });
        setTimeout(()=> {
            this._loadData();
        });
        this.props.dispatch({
            type: 'SHOWCOLLECTPOPUP',
            showCollectPopup: false,
            showCollectPopupID: null
        })
    }

    _collectPopupCancelall() {
        this.props.dispatch({
            type: 'SHOWCOLLECTPOPUP',
            showCollectPopup: false,
            showCollectPopupID: null
        })
    }

    _showFilter() {
        this.props.dispatch({
            type: 'SHOWFILTERPRODUCE'
        });
    }

    componentWillUnmount() {
        this.props.dispatch({
            type: 'RESETREPORTCOLLECT'
        });
        this.props.dispatch({
            type: 'UNSHOWFILTERPRODUCE'
        });
    }

    render() {
        return (
            <div className="root">
                <HeaderBar {...this.props} titleName="我的收藏" showSearch={this.showSearch.bind(this)} showFilter={this._showFilter.bind(this)}/>
                <div ref="content" className="scroll-content has-header has-footer">
                    {
                        this.props.report.data.length == 0 && !this.state.loading ? <EmptyComponent/> :
                            <Main {...this.props} sandboxPayService={this._sandboxPayService.bind(this)}
                                                  reportTag={this.state.reportTag} data={this.props.report.data}/>
                    }
                    {
                        this.props.report.data.length != 0 && this.state.isSrollLoading ? <ScrollLoading {...this.props}/> : null
                    }
                </div>
                <FooterBar {...this.props}/>
                {
                    this.props.report.isShowFilter ?
                        <FilterCollect {...this.props} fn={this._fn.bind(this)}
                                                       dataSources={this.props.report}/> : null
                }
                {
                    this.state.loading ? <Loading/> : null
                }
                {
                    this.props.report.showCollectPopup ?
                        <Collectpopup collectPopupCancel={this._collectPopupCancel.bind(this)}
                                      collectPopupCancelall={this._collectPopupCancelall.bind(this)}/> : null
                }
                {
                    this.state.showPrompt ?
                        <CollectPrompt {...this.props} showPromptMes={this.state.showPromptMes}/> : null
                }
            </div>
        )
    }
}

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collect: true
        };
    }

    render() {
        return (
            <ul className="list new_report">
                {
                    this.props.data.map((ele, index)=> <ReportList  {...this.props}
                        sandboxPayService={this.props.sandboxPayService} reportTag={this.props.reportTag}
                        collect={this.state.collect} dataSources={ele} key={ele.id+Math.random()}/>)
                }
            </ul>
        )
    }
}
function select(state) {
    return {
        report: state.collect,
        search:state.search
    }
}
Collect.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default connect(select)(Collect);