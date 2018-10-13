import React from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import { Carousel } from 'antd';
import Footer from '../Footer/footerindex'
require('./home.scss')
class Home extends React.Component{
    constructor (props) {
        super (props) 
        this.state = {
            Choiceness:[],//精选歌单数据、5条
            Hotldata:[],//榜单分类数据、3条
            Muisdataone:[],//酷狗飙升榜2条
            Muisdatatwo:[],//酷狗tp500  2条
            Muisdata:[],//网络新歌  2  条
            Chineselist:[],//华语新歌30条
            Number:0,//新歌列表截取起点
            Numlist:8,//新歌列表截取终点
            Mvrecommend:[],//推荐mv数据
            Hotsinger:[],//首页热门歌手
            index:23784,
            SNumlist:0,
            x:0,
            y:5,
            cat:1001,
        }
    };
    GetChoicenessdata () {
        axios.get('/proxy/plist/index&json=true')
        .then(res => {
            this.setState(
               { Choiceness:res.data.plist.list.info.slice(0,5)}
            )
        })
    };
    GetHotldata () {
        axios.get('/proxy/rank/list&json=true')
        .then(res => {
            this.setState(
                {Hotldata:res.data.rank.list.slice(0,3)}
            )
        })
    };
    GetMuisdata () {
        axios.get('/proxy/rank/info/6666?json=true')
        .then(res => {
            this.setState(
                {Muisdata:res.data.songs.list.slice(0,2)}
            )
        });
        axios.get('/proxy/rank/info/8888?json=true')
        .then(res => {
            this.setState(
                {Muisdataone:res.data.songs.list.slice(0,2)}
            )
        });
        axios.get('/proxy/rank/info/23784?json=true')
        .then(res => {
            this.setState(
                {Muisdatatwo:res.data.songs.list.slice(0,2)}
            )
        })
    };
    
    Muispaging (index) {//新歌点击切换操作
        if(index  == 2) {
            this.state.Number += 8 ;
            this.state.Numlist += 8 ;
            if(this.state.Numlist<=24){
                this.GetChineselist()
            }else{
                this.state.Number = 16 ;
                this.state.Numlist = 24 ;
            }
        };
        if(index  == 1) {
            this.state.Number -= 8 ;
            this.state.Numlist -=  8;
            if(this.state.Number >= 0){
                this.GetChineselist()
            }else{
                this.state.Number = 0 ;
                this.state.Numlist = 8 ;
            }
        }
    };
    GetMvrecommend () {
        axios.get('http://localhost:3000/personalized/mv')
        .then((res) => {
            this.setState(
                {Mvrecommend : res.data.result.slice(0,3)}
            )
        })
    };
    GetHotsinger () {
        axios.get('http://localhost:3000/artist/list?cat='+this.state.cat)
        .then((res) => {
            this.setState(
                {Hotsinger : res.data.artists.slice(this.state.x,this.state.y)}
            )
        })
    };
    GetChineselist () {
        axios.get('/proxy/rank/info/'+this.state.index+'?json=true')
        .then(res => {
            console.log(res.data.songs.list)
            this.setState(
                {Chineselist:res.data.songs.list.slice(this.state.Number,this.state.Numlist),
                    SNumlist:res.data.songs.list.length
                }
            )
        })
    };
    aaa(index){//精选歌曲文字鼠标划上切换事件
        this.setState(
            {index : index, Number:0,Numlist:8}
        );
        this.GetChineselist ();
    };
    bbb(x,y){//Mv下标鼠标划上事件
        this.setState({x:x,y:y})
        this.GetHotsinger ();
    };
    ccc (index) {//mv文字切换事件
        this.setState({ cat:index,x:0,y:5,
        })
        this.GetHotsinger ();
    }
    componentWillMount () {
        this.GetChoicenessdata()//获取精选歌单数据
        this.GetHotldata()//获取榜单分类数据
        this.GetMuisdata()//获取榜单歌曲显示数据
        this.GetChineselist() //获取华语新歌30条
        this.GetMvrecommend() //获取推荐Mv
        this.GetHotsinger()//获取热门歌手
    };
    render () {
        return (
            <div className='content'>
            {/* 轮播图模块 */}
                <div className='NavImg'>
                    <div className='Img'>
                         <Carousel autoplay>
                            <div><img src="http://imge.kugou.com/commendpic/20160713/20160713154957678313.jpg" alt=""/></div>
                            <div><img src="http://imge.kugou.com/commendpic/20180918/20180918171055833067.jpg" alt=""/></div>
                            <div><img src="http://imge.kugou.com/commendpic/20180604/20180604115326765470.jpg" alt=""/></div>
                            <div><img src="http://imge.kugou.com/commendpic/20180914/20180914203055688096.jpg" alt=""/></div>
                            <div><img src="http://imge.kugou.com/commendpic/20170929/20170929134028425664.jpg" alt=""/></div>
                        </Carousel>
                    </div>
                    <div className='overlayer'>
                        <ul>
                            <li><a href=''><i className='iconfont icon-pc'></i><span>下载PC版</span></a></li>
                            <li><a href=''><i className='iconfont icon-pingguo'></i><span>下载iPhone版</span></a></li>
                            <li><a href=''><i className='iconfont icon-anzhuo'></i><span>下载Android版</span></a></li>
                        </ul>
                    </div>
                    {/* <a href='' className='bracket-left'><span className='iconfont icon-jiantou-copy' ></span></a> */}
                    {/* <a href='' className='bracket-rigth'><span className='iconfont icon-jiantouarrow487'></span></a> */}
                </div>
                    {/* 精选歌单与榜单 */}
                <div className='Choicenessbox main'>
                    <div className='Choicenesssong'>
                            <div className='Choicenesssongtop'>
                                <img src="http://static.kgimg.com/public/root/images/selectlist.jpg" alt=""/>
                                <span><a href=''>更多</a></span>
                            </div>
                            <div className='ChoicenesssongImg'>
                                <ul>
                                    {
                                        this.state.Choiceness.map((item,index) => {
                                            return(
                                                
                                                <li key={index}>
                                                    <NavLink to={'home'}>
                                                            <img src={item.imgurl.split('{size}').join('')}alt=""/>
                                                            <p><span className='iconfont icon-erji'>{(item.playcount/10000).toFixed(1)+'万'}</span></p>
                                                        <div className='ChoicenesssongMsg'>
                                                            <div className='songMsg'>
                                                                <i>{item.specialname}</i>
                                                                <i>{item.username}</i>
                                                            </div>
                                                        </div>
                                                    </NavLink>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>     
                    </div>
                    <div className='Hotlist'>
                            <div className='Hotlisttop'>
                                <img src="http://static.kgimg.com/public/root/images/hotlist.jpg" alt=""/>
                                <span><a href=''>更多</a></span>
                            </div>
                            <div className='HotlistList'>
                                    <ul>
                                        <li><NavLink to={'home'}><img src="http://imge.kugou.com/v2/rank_cover/T1M4h4BKKj1RCvBVdK.jpg_240x240.jpg" alt=""/>
                                            <ol>
                                                <p>酷狗飙升榜</p>
                                                {
                                                    this.state.Muisdata.map((item,index) => {
                                                        return(
                                                            <p key={index}>{index+1}.{item.filename}</p>
                                                        )
                                                    })
                                                }
                                                
                                            </ol>
                                            <span className='iconfont icon-youhua'></span>
                                            </NavLink>
                                        </li>
                                        <li><NavLink to={'home'}><img src="http://imge.kugou.com/v2/rank_cover/T1fHd4BXd_1RCvBVdK.jpg_240x240.jpg" alt=""/>
                                            <ol>
                                                <p>酷狗TOP500</p>
                                                {
                                                    this.state.Muisdataone.map((item,index) => {
                                                        return(
                                                            <p key={index}>{index+1}.{item.filename}</p>
                                                        )
                                                    })
                                                }
                                                
                                            </ol>
                                            <span className='iconfont icon-youhua'></span>
                                            </NavLink>
                                        </li>
                                        <li><NavLink to={'home'}><img src="http://imge.kugou.com/v2/rank_cover/T1Fpd4BKbg1RCvBVdK.jpg_240x240.jpg" alt=""/>
                                            <ol>
                                                <p>网络红歌榜</p>
                                                {
                                                    this.state.Muisdatatwo.map((item,index) => {
                                                        return(
                                                            <p key={index}>{index+1}.{item.filename}</p>
                                                        )
                                                    })
                                                }
                                                
                                            </ol>
                                            <span className='iconfont icon-youhua'></span>
                                            </NavLink>
                                        </li>
                                    </ul>

                            </div>
                    </div>
                </div>
                   {/* 1号广告位  */}
                <div className='main'><a href=''>
                    <img className='advertising' src="http://adsfile.bssdlbig.kugou.com/8bce13888952c2eb5e99df997845f247.jpg" alt=""/>
                    </a>
                </div>
                {/* mv与新歌类 */}
                <div className='MuisMvbox main'>
                    <div className='Muisbox'>
                        <div className='Muisboxtop'>
                            <img src="http://static.kgimg.com/public/root/images/newlist.jpg" alt=""/>                
                            <ul>
                                <li onMouseOver={this.aaa.bind(this,23784)}><a href=''>华语</a></li>
                                <li onMouseOver={this.aaa.bind(this,33166)} ><a href=''>欧美</a></li>
                                <li onMouseOver={this.aaa.bind(this,4672)}><a href=''>韩国</a></li>
                                <li onMouseOver={this.aaa.bind(this,4673)}><a href=''>日本</a></li>
                            </ul>
                            <span><a href=''><i className='iconfont icon-yousanjiao'></i>立即播放</a></span>                  
                        </div> 
                        <div className='MuisList'>
                                 <ul>
                                    { 
                                        
                                        this.state.Chineselist.map((item,index) => {
                                            let a = Math.floor(item.duration/60);
                                            if(a<10){
                                                a = '0'+a;
                                            }
                                            let b = item.duration%60;
                                            if(b<10){
                                                b = '0'+b;
                                            }
                                            return(
                                                <li key={index}>
                                                    <NavLink to={'/muis/hash='+item.hash}>
                                                        <p>{item.filename}<img src="http://static.kgimg.com/public/root/images/first.png" alt=""/></p>
                                                        <b><i className='iconfont icon-yousanjiao'></i><i className='iconfont icon-download'></i><span>{a}:{b}</span></b>
                                                    </NavLink>
                                                </li>
                                            )
                                        })
                                    }
                                                
                                </ul>   
                                <p><span onClick={this.Muispaging.bind(this,1)} className='iconfont icon-jiantou2'></span> <i>{this.state.Numlist/8}/ {Math.ceil(this.state.SNumlist/8)}</i> <span onClick={this.Muispaging.bind(this,2)} className='iconfont icon-arrow-right-copy-copy-copy'></span></p>              
                        </div>                      
                    </div>
                    <div className='Mvbox'>
                        <div className='Mvboxtop'>
                            <img src="http://static.kgimg.com/public/root/images/albumlist.jpg" alt=""/>                
                            <span>更多</span>
                        </div>  
                        <div className='Mvrecommend'>
                            <ul>
                                {
                                    this.state.Mvrecommend.map((item,index) => {
                                        return(
                                            <li key={index}>
                                                <NavLink to={''}>
                                                    <img src={item.picUrl} alt=""/>
                                                    <div className='Mvname'>
                                                        <span>{item.name}</span>
                                                        <p>{item.artistName}</p>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>                   
                    </div>
                </div> 
                {/* 2号广告位 */}
                <div className='main'>
                    <a href=''><img src="http://adsfile.bssdlbig.kugou.com/ca7779333e871d4e578c323632aa38df.jpg" alt=""/></a>
                </div>                              
                {/* 电台与歌手类 */}
                <div className='main Radiosinger'>
                    <div className='Radiosingerbox'>
                        <div className='Radiobox'>
                                <div className='Radioboxtop'>
                                    <img src="http://static.kgimg.com/public/root/images/hotredio.jpg" alt=""/>
                                    <a href=''>更多</a>       
                                </div>
                                <ul>
                                    <li><a href=''><img src='http://static.kgimg.com/public/root//images/radio_1.jpg' alt=""/></a><p>KTV必点曲</p></li>
                                    <li><a href=''><img src='http://static.kgimg.com/public/root//images/radio_2.jpg' alt=""/></a><p>中文DJ</p></li>
                                    <li><a href=''><img src='http://static.kgimg.com/public/root//images/radio_3.jpg' alt=""/></a><p>酷狗热歌</p></li>
                                    <li><a href=''><img src='http://static.kgimg.com/public/root//images/radio_4.jpg' alt=""/></a><p>网络红歌</p></li>
                                    <li><a href=''><img src='http://static.kgimg.com/public/root//images/radio_5.jpg' alt=""/></a><p>经典</p></li>
                                    <li><a href=''><img src='http://static.kgimg.com/public/root//images/radio_6.jpg' alt=""/></a><p>老情歌</p></li>
                                    <li><a href=''><img src='http://static.kgimg.com/public/root//images/radio_7.jpg' alt=""/></a><p>新歌</p></li>
                                    <li><a href=''><img src='http://static.kgimg.com/public/root//images/radio_8.jpg' alt=""/></a><p>动漫</p></li>
                                    <li><a href=''><img src='http://static.kgimg.com/public/root//images/radio_9.jpg' alt=""/></a><p>轻音乐</p></li>
                                    <li><a href=''><img src='http://static.kgimg.com/public/root//images/radio_10.jpg' alt=""/></a><p>最爱成名曲</p></li>
                                </ul>
                        </div>
                        <div className='singerbox'>
                            <div className='singerboxtop'>
                                <img src="http://static.kgimg.com/public/root/images/hotsinger.jpg" alt=""/>
                                <ul>
                                    <li onMouseOver={this.ccc.bind(this,1001)}><a href=''>华语</a></li>
                                    <li onMouseOver={this.ccc.bind(this,2001)}><a href=''>欧美</a></li>
                                    <li onMouseOver={this.ccc.bind(this,7001)}><a href=''>日韩</a></li>
                                </ul>
                                <a href=''>更多</a>       
                            </div>
                            <div className='Hotsingerbox'>
                                <ul>
                                    {
                                        this.state.Hotsinger.map((item,index) => {
                                            return(
                                                <li key={index}>
                                                    <NavLink to={''}>
                                                        <img src={item.img1v1Url} alt=""/>
                                                            <p>{item.name}</p>
                                                    </NavLink>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                                <p> <span className='iconfont icon-dian' onMouseOver={this.bbb.bind(this,0,5)}></span>
                                    <span className='iconfont icon-dian' onMouseOver={this.bbb.bind(this,5,10)}></span>
                                    <span className='iconfont icon-dian' onMouseOver={this.bbb.bind(this,10,15)}></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 广告位3 */}
                <div className='main'>
                    <a href=''><img src="http://adsfile.bssdlbig.kugou.com/dd5684623939758ee8b940dcc8d76c37.jpg" alt=""/></a>
                </div> 
                {/* 合作板块 */}
                <div className='cooperationbox main'>
                    <div className='cooperation'>
                        <img src="http://static.kgimg.com/public/root/images/partner.jpg" alt=""/>
                        <ul>
                            <li><img src={require("../../images/partner01.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner02.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner03.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner04.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner05.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner06.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner07.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner08.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner09.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner10.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner11.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner12.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner13.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner14.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner15.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner16.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner17.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner18.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner19.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner20.jpg")} alt=""/></li>
                            <li><img src={require("../../images/partner21.jpg")} alt=""/></li>
                        </ul>
                    </div>
                </div>
                {/* 友情链接 */}
                <div className='main friendship'>
                    <div className='friendshipbox'>
                        <div className='friendshiptop'>
                            <img src="http://static.kgimg.com/public/root/images/friendLink.jpg" alt=""/>
                            <p>更多</p>
                        </div>
                        <ul>
                            <li><a href=''>爱美网</a></li>
                            <li><a href=''>央视网综艺频道</a></li>
                            <li><a href=''>汽车论坛</a></li>
                            <li><a href=''>IT之家</a></li>
                            <li><a href=''>iPhone游戏</a></li>
                            <li><a href=''>旅游攻略</a></li>
                            <li><a href=''>悦声无限</a></li>
                            <li><a href=''>华为商城</a></li>
                            <li><a href=''>365音乐网</a></li>
                            <li><a href=''>软件下载</a></li>
                            <li><a href=''>漫漫看漫画</a></li>
                            <li><a href=''>手机游戏</a></li>
                            <li><a href=''>5sing原创音乐</a></li>
                            <li><a href=''>腾讯音乐人</a></li>
                            <li><a href=''>豌豆荚</a></li>
                        </ul>  
                    </div>            
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Home