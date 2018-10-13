import React from 'react'
require('./footer.scss');
const list = [
    {msg:'关于酷狗'},
    {msg:'监督举报'},
    {msg:'广告服务'},
    {msg:'版权指引'},
    {msg:'隐私政策'},
    {msg:'用户服务协议'},
    {msg:'推广合作'},
    {msg:'酷狗音乐人'},
    {msg:'酷狗音乐推'},
    {msg:'招聘信息'},
    {msg:'客服中心'},
    {msg:'用户体验提升计划'},
];


class Footer extends React.Component{
    constructor (props) {
        super (props) 
        this.state = {
           list,
           videoL:''
        }
    }
    render () {
        return (
            <footer className='footer '>
                <div className='footerbox'>
                    <div className='footercontent main'>
                        <div className='footernav'>
                            <ul>
                                {
                                    this.state.list.map((item,index) => {
                                        return (
                                            <li key={index}><span>{item.msg}</span></li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='footerlist'>
                    <p>我们致力于推动网络正版音乐发展，相关版权合作请联系copyrights@kugou.com</p>
                    <p>信息网络传播视听节目许可证 1910564 增值电信业务经营许可证粤B2-20060339<img src='http://www.kugou.com/common/images/footer_icon.png' alt=''></img></p>
                    <p>广播电视节目制作经营许可证（粤）字第01270号    营业性演出许可证穗天演440106026</p>
                    <p>穗公网监备案证第44010650010167    互联网药品信息服务资格证编号（粤）-非经营性-2012-0018,粤公网安备 44010602000141号<img src='http://www.kugou.com/common/images/icon_yuewangga1.png' alt=''></img></p>
                    <p>不良信息举报邮箱：jubao_music@kugou.net    客服邮箱：kefu@kugou.com</p>
                    <p>Copyright  ©  2004-2018 KuGou-Inc.All Rights Reserved<img src='http://www.kugou.com/common/images/logo_down.png' alt=''></img></p>
                </div>
                {/* <video src={this.state.videoL} controls></video> */}
            </footer>
        )
    }
}

export default Footer