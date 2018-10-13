import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Carousel } from 'antd';
import store from '@/store/index.js';
require('./index.scss');
class MVweb extends Component {
	constructor (props) {
		super(props);
		this.state = {
            bannList: [
                {imgPic: require(''), name: '雷佳 - 沉香流年'},
                {imgPic: require(''), name: 'SUNMI - Siren'},
                {imgPic: require(''), name: '张杰 - 不想想你'},
                {imgPic: require(''), name: '张艺兴、Alan Walker - Sheep (Alan Walker Relift)'},
                {imgPic: require(''), name: '胡彦斌 - 我不确定'},
                {imgPic: require(''), name: '五月天、张惠妹 - 离开地球表面三天三夜 (2018“人生无限公司”巡演北京站)'}
            ],
            mvhot: [],
            newhot: [],
            limiNum: 30,
            offset: 0
    }
  }
  getMvData() {
    // 新歌推荐
    fetch('http://localhost:3000/top/mv?limit='+this.state.limiNum+'&offset='+this.state.offset)
    .then(res => res.json())
    .then(data => {
        store.dispatch({
            type: 'CHANGE_MVSONG',
            data: data.data
        })
        // console.log(store.getState().MvSong);
   })
  }
  componentDidMount() {
      fetch('http://localhost:3000/top/mv?limit=10')
         .then(res => res.json())
         .then(data => {
            store.dispatch({
                type: 'CHANGE_MVHOTSONG',
                data: data.data
            })
         })
    this.getMvData();
  }
  nextBtn(page) {
    page++
    this.setState({
        offset: page
    })
    this.getMvData();
    console.log(this.state.offset);
  }
  numBtn(num,page) {
    this.setState({
        limiNum: num,
        offset: page
    })
    this.getMvData();
  }
  tomvDetail(id) {
    // 因为子组件没有路由就没有history，要在在父组件将id传值给子组件
    this.props.history.push('/mvdetail/'+id)
    }
	render () {
        return(
            <div className="content w1000">
                <div className="mvTop clear">
                    <div className="mvBanner relative fl">
                        <Carousel autoplay>
                            {
                                this.state.bannList.map((item ,index) => {
                                    return (
                                        <div className="mvBannerList relative" key={index}>
                                            <img src={item.imgPic} alt=""/>
                                            <div className="mvBannerName absolute"><Link to="/mvweb/">{item.name}<em></em></Link></div>
                                        </div>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                    <div className="mvHotList fr">
                        <h3><span>MV热播总排行</span> <Link to="/mvweb/">更多</Link></h3>
                        <ul>
                            {
                                store.getState().MvHotSong.map((item,index) => {
                                    return(
                                        <li key={index}>
                                            <Link to="/mvweb/">
                                                <span className="num fl">{index+1}</span>
                                                <span className="name"><i>{item.artistName} - </i> <span>{item.name}</span> </span>
                                                <em></em>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                            
                        </ul>
                    </div>
                </div>
                <div className="mvContent clear">
                    <div className="mv_left fl">
                        <h3 className="title">MV分类</h3>
                        <ul>
                            <li><Link to="/mvweb/">新歌推荐</Link></li>
                            <li><Link to="/mvweb/">欧美精选</Link></li>
                            <li><Link to="/mvweb/">日韩精选</Link></li>
                            <li><Link to="/mvweb/">华语精选</Link></li>
                        </ul>
                    </div>
                    <div className="mv_right fr">
                    <h3 className="title"><label id="mvName">新歌推荐</label> (<label id="mvNum">14374</label>个)</h3>
                    <div className="mvlist">
                        <ul className="clear">
                            {
                                store.getState().MvSong.map((item,index) => {
                                    return(
                                        <li key={index}>
                                            <a onClick={this.tomvDetail.bind(this,item.id)} title="{item.artistName} - {item.name}">
                                                <img src={item.cover}/>
                                                <em></em><i></i>
                                            </a>
                                            <span><em>{item.artistName} - </em><i>{item.name}</i></span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="page">
                        <ul>
                            <li onClick={this.numBtn.bind(this, 30, 0)}>1</li>
                            <li onClick={this.numBtn.bind(this, 30, 1)}>2</li>
                            <li onClick={this.numBtn.bind(this, 30, 2)}>3</li>
                            <li onClick={this.numBtn.bind(this, 30, 3)}>4</li>
                            <li onClick={this.numBtn.bind(this, 30, 4)}>5</li>
                            <li onClick={this.numBtn.bind(this, 30, 5)}>6</li>
                            <li onClick={this.numBtn.bind(this, 30, 6)}>7</li>
                            <li onClick={this.nextBtn.bind(this,this.state.offset)} className="next">下一页</li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
        )
        
	}
}

export default MVweb;
