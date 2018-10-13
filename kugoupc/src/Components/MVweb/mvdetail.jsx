import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Popover } from 'antd';
import store from '@/store/index.js';
import {Player } from 'video-react';
import Footer from '@/components/Footer/index.jsx';
import Header from '@/components/Header/index.jsx';
require('./mvdetail.scss');


class MVweb extends Component {
	constructor (props) {
		super(props);
		this.state = {
            display_name: 'none',
            artistName:'',
            name: '',
            desc: '',
            brs: [],
            cover:''
        }
  }
  shareshowBtn(){
    if(this.state.display_name == 'none') {
        this.setState({
            display_name: 'block'
        })
    }else {
        this.setState({
            display_name: 'none'
        })
    }
  }
  closeBtn(){
    this.setState({
        display_name: 'none'
    })
  }
  componentDidMount() {
    const id = this.props.match.params.id
    console.log(id);
    // 猜你喜欢数据
    fetch('http://localhost:4000/top/mv?limit=6')
       .then(res => res.json())
       .then(data => {
          store.dispatch({
              type: 'CHANGE_MVHOTSONG',
              data: data.data
          })
       })
       // 歌手视频
       //console.log(this.props.match.params.id);
       fetch('http://localhost:4000/mv?mvid='+id)
       .then(res => res.json())
       .then(data => {
          this.setState({
            artistName: data.data.artistName,
            name: data.data.name, 
            desc: data.data.desc,
            brs: data.data.brs[720],
            cover: data.data.cover
          })
          console.log(this.state.brs[720]);
       })
    }
	render () {
        const content = (
        <div>
            <p>扫一扫<br/>可在手机上观看</p>
            <img src={require('@/images/code.png')} alt=""/>
        </div>
        );
        return(
            <div className="content w1000 mvVideo">
                <h2><span><Link to="/mvdetail/">MV首页</Link></span> <span>></span> <span>正在播放</span><span>></span>{this.state.artistName} - {this.state.name}</h2>
                <div className="player" style={{background: 'url(' + this.state.cover + ')'}}>
                <Player >
                <source src={this.state.brs} />
                </Player>          
                </div>
                <div className="toobar clear">
                    <div className="mvTitle fl">{this.state.artistName} - {this.state.name}</div>
                    <div className="mvAction clear fr">
                        <div className="mobileShareQrcode">
                            <div className="qrcodeForMobile"></div>
                        </div>
                        <Link to="/mvdetail/"><em className="iconfont icon-shouji"></em>
                        <Popover content={content} title="Title">手机看</Popover>
                        </Link>
                        <Link to="/mvdetail/" onClick={this.shareshowBtn.bind(this)}><em className="iconfont icon-share"></em></Link>
                        <Link to="/mvdetail/"><em className="iconfont icon-download"></em></Link>
                    </div>
                </div>
                <div className="shareBtn" style={{display: this.state.display_name}}>
                    <div className="title"><em className="iconfont icon-cha" onClick={this.closeBtn.bind(this)}></em>分享歌曲</div>
                    <ul>
                        <li><Link to="/mvdetail/"><img src={require('@/images/share_qq.png')} alt=""/></Link><p>微信</p></li>
                        <li><Link to="/mvdetail/"><img src={require('@/images/share_qqspace.png')} alt=""/></Link><p>QQ好友</p></li>
                        <li><Link to="/mvdetail/"><img src={require('@/images/share_weibo.png')} alt=""/></Link><p>QQ空间</p></li>
                        <li><Link to="/mvdetail/"><img src={require('@/images/share_weixin.png')} alt=""/></Link><p>新浪微博</p></li>
                    </ul>
                </div>
                <p className="mvlike">猜你喜欢</p>
                <div className="mvlist mvdetailbo">
                    <ul className="clear">
                        {   //store.getState().MvHotSong.map
                            store.getState().MvHotSong.map((item,index) => {
                                return(
                                    <li key={index}>
                                        <Link to="/mvweb/" title="{item.artistName} - {item.name}">
                                            <img src={item.cover}/>
                                            <em></em><i></i>
                                        </Link>
                                        <span><i>{item.artistName} - </i> <span>{item.name}</span></span>
                                    </li>
                                )
                            })
                        }
                        
                        
                    </ul>
                </div>
            </div>
        )
        
	}
}

export default MVweb;
