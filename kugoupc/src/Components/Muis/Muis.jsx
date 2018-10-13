import React from 'react'
import axios from 'axios'
import Header from '../Header/headerindex'
import '@/main.scss'
import $ from 'jquery'
import { Progress } from 'antd';
// import { clearTimeout } from 'timers';
require('./index.scss')

class Kind extends React.Component{
    constructor (props) {
        super (props) 
        this.state = {
           Muislist:[],
           wordsArray:[],
           minute:0,
           progresstime:0,
           top:0,//歌词滚动
           y:0,
           x:0,//歌词时间
           isPlay: true,//暂停开关
        }
    };
    Getdate(){
        // console.log(this.props.location.pathname.split('=')[1])
        let hash = this.props.location.pathname.split('=')[1]
            
        axios.get('/dproxy/yy/index.php?r=play/getdata&hash='+hash)
       .then(res => {
           let wordsArray=[];
           const  content =res.data.data.lyrics
            //获取歌词并且截取
            // const content=document.getElementById("song1").innerHTML;
            //通过换行符来分割出所有的文本\n
            var arrays=content.split("\n");
            //过滤掉前几个不带时间的数据
            for(let i=0;i<arrays.length;i++){
                let temp=arrays[i];
                //根据分号分割过滤数据
                let tempNum=temp.split(":")[0].replace("[","");
                //是合法歌词的时候
                if(!isNaN(tempNum)){
                    //重新根据]来分割 ，分离数据
                    let timeArray=temp.split("]")[0].replace("[","").split(":");//33:44
                    //计算分钟数
                    let min=parseInt(timeArray[0]);
                    //计算总秒数
                    let second=parseFloat(timeArray[1])+min*60;
                    //获取对应的歌词内容
                    let content=temp.split("]")[1];
                    //封装成歌词对象放入数组
                    let obj={
                        time:second,
                        content:content
                    };
                    wordsArray.push(obj);
                }
            }

            this.setState({
                Muislist:res.data.data,
                wordsArray:wordsArray
               })
        });
    };
    muistimetion () {//时间控制  定时器
        let progresstime = this.state.progresstime;
        let time = setInterval(()=>{
             if (document.getElementById("MuisBox") === null) {
                clearInterval(time);
                return;
            }
            if(this.state.isPlay){
                    progresstime+=1;
                    this.setState({
                        progresstime:(progresstime/(this.state.Muislist.timelength/1000)*100),
                        x:progresstime,
                    })
                    if(this.state.progresstime>=100){
                        clearInterval(time)
                    }
                    
                    this.getWordsByTime();
                }
            },1000)
        
    }
    componentDidMount () {//页面加载执行
        this.Getdate();
        this.muistimetion();
    };
    getWordsByTime(){//歌词的滚动函数
        let MuisGC = document.getElementById('MuisGC');
        let data = this.state.wordsArray;
            for(let i=0;i<data.length-1;i++){
                if(this.state.x>this.state.wordsArray[i].time){  //播放时候的秒数大于数组中的秒数的时候，播放的应该是前一句歌词
                    this.setState({
                        top :-i*35,
                        y:i
                    })
                    MuisGC.style.top = this.state.top+'px';
                    $('#MuisGC li').eq(i).css('color','red')
                }else{
                    this.setState({
                        top :this.state.top,
                        y:this.state.i
                    })
                }
            }
    }
    playtion() {//点击暂停播放控制
        let myaudio = document.getElementById("audio-element");
        if(this.state.isPlay){
            this.setState({
                isPlay:false
            })
            myaudio.pause();
            
            $('#Suspend').addClass('icon-icon-1').removeClass('icon-bofang')
        }else{
            this.setState({
                isPlay:true
            })
            myaudio.play();
            $('#Suspend').addClass('icon-bofang').removeClass('icon-icon-1')
        }
    }
    
    render () {
        let MYsecond =this.state.x;
        let MYminute =0;
        if(MYsecond>60){
            MYminute = Math.floor(MYsecond/60);
            // MYsecond =MYsecond - 60
            // MYminute +=1;
            MYsecond = MYsecond%60
        };
        
        if(MYminute<10){
            MYminute ='0'+ MYminute
        };
        if(MYsecond<10){
            MYsecond ='0'+ MYsecond
        };
        let Timequantum = this.state.Muislist.timelength;
        let  second = Timequantum%60;
        let minute = parseInt(this.state.Muislist.timelength/60000);
        if(second<10){
            second ='0'+ second
        };
        if(minute<10){
            minute ='0'+ minute
        }
        return (
            <div className='MuisBox' id='MuisBox'>
                <Header className='main'/>
                    <div className='boxlist'>
                        <div className='main Box'>
                            <div className='Muislyric'>
                                <div className='Muisboxleft'>
                                    <img src={this.state.Muislist.img} alt=''/>
                                    <p>下载这首歌</p>
                                </div>
                                <div className='Muisboxright'>
                                    <b>{this.state.Muislist.song_name}</b>
                                    <div className='Muisboxrighttop'> <p>专辑：<span>{this.state.Muislist.album_name}</span></p><p>歌手：<span>{this.state.Muislist.author_name}</span></p></div>
                                    <div className='Muisboxrightbtm'>
                                       <ul id='MuisGC'>
                                           {
                                               this.state.wordsArray.map((item,index) => {
                                                    return(
                                                        <li key={index}>{item.content}</li>
                                                    )
                                               })
                                           }
                                       </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className='Muisbtmbox'>
                        <div className='main'>
                        <div className='Muisbtmboxs'>
                            {/* 播放控制区左 */}
                            
                            <div className='control'>
                                <span className='iconfont icon-shangyishou'></span>
                                <span id='Suspend' className='iconfont icon-bofang' onClick={this.playtion.bind(this)}></span>
                                <span className='iconfont icon-xiayishou'></span>
                            </div>
                            {/* 头像 */}
                            <div className='portrait'>
                                <img src={this.state.Muislist.img} alt=''></img>
                            </div>
                            {/* 进度条 */}
                            <div className='progress'>
                                     <p>{this.state.Muislist.song_name}<span>{MYminute+':'+MYsecond+'/'+minute+':'+second}</span></p>
                                    <Progress percent={this.state.progresstime} />       
                                           
                            </div>
                            {/* 右边操作建 */}
                            <div className='controlrigth'>
                                <span className='iconfont icon-laba_'></span>
                                <span className='iconfont icon-xunhuanbofang'></span>
                                <span className='iconfont icon-download'></span>          
                                <span className='iconfont icon-fenxiang'></span>          
                                <span className='iconfont icon-yitipaixu'></span>          
                            </div>
                            <audio id="audio-element"  
                                src={this.state.Muislist.play_url}
                                // preload='true'
                                autoPlay = {this.state.isPlay}
                                ></audio>
                        </div>
                        </div>
                    </div>
              
            </div>
        )
    }
}

export default Kind