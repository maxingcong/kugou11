import React from 'react'
import {NavLink} from 'react-router-dom'
require('./header.scss')
class Header extends React.Component{
    constructor (props) {
        super (props) 
        this.state = {
            list:[
                {name:'首页',path:'/home'},
                {name:'榜单',path:'/kind'},
                {name:'下载客户端',path:'/cart'}
            ]
           
        }
    };
    
    render () {
        return (
               <div className='header'>
                    <div className='headertop main'> 
						<img src = "http://static.kgimg.com/public/root/images/logo.png"alt=''/>
                        <div className='headeript'>
                            <input type="text" placeholder='陈雅森 不认识你该有多好'/>
                            <span><i className='iconfont icon-41'></i></span>
                        </div>
                        <ul>
                            <li><a href=''>客服中心</a></li>
                            <li><a href=''>招贤纳士</a></li>
                            <li><a href=''>会员中心 </a></li>
                        </ul>
                        <div className='loginbtn'>
                            <a href=''>登录</a>
                            <a href=''>注册</a>
                        </div>
                    </div>
                    <div className='navWrap'>
                        <div className='navlist main'>
                            <ul>
                                {
                                    this.state.list.map((item,index) => {
                                        return (
                                            <li key={index}>
                                               <NavLink to={item.path}> {item.name}<span>{item.msg}</span></NavLink>
                                            </li>
                                        )
                                    })
                                }
                                <li><a href=''>更多<span> ﹀</span></a></li>
                            </ul>
                            <ol>
                                <li><a href=''><span className='iconfont icon-star'></span><i>音乐直播</i></a></li>
                                <li><a href=''><span className='iconfont icon-icon-'></span><i>酷狗LIVE</i></a></li>
                                <li><a href=''><span className='iconfont icon-erji'></span><i>音乐人</i></a></li>
                                <li><a href=''><span className='iconfont icon-shouye'></span><i>商城</i></a></li>
                            </ol>
                        </div>
                    </div>

               </div>
                
           
        )
    }
}

export default Header