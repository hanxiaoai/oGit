import  React from 'react'
import  axios from 'axios'
import  Store from '../store/Store.js'
import  {NavLink} from 'react-router-dom'//NavLink固定写法，路径跳转
import  '../assets/images/ico/iconfont.css'
import '../assets/css/details.css'
import '../assets/css/public.css'
// 详情页
class Details extends  React.Component{
    constructor(){
        super();
        this.state={
            icon:[{
                imgs:'icon-xinlang ',
                text:'新浪微博',
                code:'#f13f19'
            },{
                imgs:'icon-weixin2',
                text:'微信',
                code:'#60c84f'
            },{
                imgs:'icon-weixinpengyouquan1',
                text:'微信朋友圈',
                code:'#72cf29'
            },{
                imgs:'icon-yinxiangbiji ',
                text:'印象笔记',
                code:'#5ab540'
            },{
                imgs:'icon-youdaoyunbiji1 ',
                text:'有道云笔记',
                code:'#30a1ed',
            },{
                imgs:'icon-QQ1 ',
                text:'QQ',
                code:'#2369c8'
            },{
                imgs:'icon-gengduo1 ',
                text:'更多平台',
                code:'#7f7f7f'
            }],
            block:'none',
            like:'',
            information:'',
            col:Store.state.oColor,
            colArr:Store.state.arr,
            oUrl:[],
            oSend:'',
        }
    }
    render() {
        return(<div className='details'>
            <nav className='nav'>
                <div className='nav_box ' onClick={this.oFan.bind(this)}>
                    <span className="iconfont icon-fanhui1 ">
                    </span>
                </div>
                <div className='box_righr'>
                    <span className="iconfont icon-fenxiang2" onClick={this.share.bind(this)}> </span>
                    <span className="iconfont icon-shoucang2"
                          onClick={this.oCollec.bind(this,this.state.oUrl.id,this.state.oUrl.title,this.state.oUrl.images)}
                          style={{color:this.state.col}}>
                    </span>
                     <NavLink to={{
                         pathname:"/Comment",
                         state:{id:this.state.oSend}
                         }}>
                        <span className="iconfont icon-pinglun1"> </span>
                        <i>{this.state.information} </i>
                    </NavLink>
                    <div className='like_box'>
                        <span className="iconfont icon-dianzan1"> </span>
                        <i>{this.state.like} </i>
                    </div>
                </div>
            </nav>
            {/*分享部分*/}
            <div className='share' style={{display:this.state.block}}>
                <div className='share_box'>
                    <div className='box_top'>
                        <h2>分享</h2>
                    </div>
                    <ul className='share_img clearfix'>
                        {this.state.icon.map((val,index)=>{
                            return<li key={index}>
                                <NavLink to='#'>
                                    <div className='ico_big clearfix'>
                                        <i className="ico_box" style={{background:val.code}}> </i>
                                        <span className={"iconfont "+' '+`${val.imgs}`+' '+"ss"}></span>
                                    </div>
                                    <p>{val.text}</p>
                                </NavLink>
                            </li>
                        })}
                    </ul>
                </div>
            </div>
{/*————————————顶部图片——————————*/}
            <section className='section clearfix'>
                {/*图片标题*/}
               <div className='section_top'>
                   <img src={this.state.oUrl.image} className='section_bg' alt={this.state.oUrl.title}/>
                   <div className='top_tltie'>
                       <div className='title'>{this.state.oUrl.title}</div>
                       <p className='source'>{this.state.oUrl.image_source}</p>
                   </div>
               </div>
            </section>
{/*————————————文章——————————*/}
            <section className='article clearfix'>
               <article className='arit_box'>
                   <div dangerouslySetInnerHTML={{__html:this.state.oUrl.body}}></div>
                   <link rel="stylesheet" type="text/css" href={this.state.oUrl.css} />
               </article>
            </section>
        </div>)};
    componentDidMount() {
        axios.get('/api/4/news/'+this.props.location.state.id).then((res)=>{
           console.log(res);
            this.setState({
                oUrl:res.data,
                oSend:Number(res.config.url.substr(res.config.url.lastIndexOf('/')+1)),
            })
        });
        axios.get('/api/4/story-extra/'+this.props.location.state.id).then(res=>{
            this.setState({
                like:res.data.popularity,
                information:res.data.comments
            })
        });
        Store.state.on('chang',()=>{
            this.setState({
                col:Store.state.oColor,
                colArr:Store.state.arr,
            })
        })
    };

//收藏
    oCollec(id,title,images){

            Store.dispatcher.dispatch({
                actionType:'colorName',
                actionParams:'yellow'
            });
            Store.dispatcher.dispatch({
                actionType:'colorArr',
                actionParams:{
                    id:id,
                    title:title,
                    image:images
                }
            });



        // console.log(Store.state.oColor);
        console.log(this.state.colArr);
    };
    // 返回
    oFan(){
        this.props.history.go(-1);
    };
    // 分享
    share(){
        this.setState({
            block:'block'
        });
    }
}
export default Details