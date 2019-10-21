import  React from 'react'
import  axios from 'axios'
import  {NavLink} from 'react-router-dom'//NavLink固定写法，路径跳转
import '../assets/css/index.css'
import { Row} from 'antd';
import { Icon } from 'antd';//图标
import { Carousel } from 'antd';//轮播图
let week,data,str;
/*——————————首页——————————————————————*/
class Index extends  React.Component{
    state = {
        visible: false,
        oInd:'none',
        oMap:[],
        oNews:[],
        month:'',
        oPast:[],
        weekDay:'',
        Firs:'首页',
        finished: false,//是否全部加载完毕
        isFoot: true,   //阻止用户频繁上拉调接口
        data:'',
        arr:[],
    };
    render() {
        return(<div className='oIndex'>
{/*——————————顶部——————————————*/}
            <Row className='nav'>
                <div className='nav_box bo1'>
                    <span className="icons-list" onClick={this.index.bind(this)}><Icon type="menu"  className="cons_menu"/></span>
                    <span className='index_tet'><i>{this.state.Firs}</i></span>
                </div>
                <div  className='nav_box box_rg'>
                    <span className="icons-list">
                        <Icon type="bell" className="icons_bg"/>
                    </span>
                    <span className="icons-list" onClick={this.mode.bind(this)}>
                        <Icon type="more" className="icons_bg bg_let"/>
                    </span>
                </div>
                {/*手风琴效果*/}
                <div  className='effect' style={{display:this.state.oInd}}>
                    <div   className='ss_box' onClick={this.oEffect.bind(this)}></div>
                   <div className='effect_box'>
                       {/*头像*/}
                       <div className='top_box'>
                          <div className='oAvatar_box'>
                              <div className='user_box'>
                                  <span className='user'></span>
                              </div>
                              <p className='user_name'>哈南</p>
                          </div>
                           {/*我的收藏和离线下载*/}
                           <ul className='ment'>
                                <li>
                                    <NavLink to='/Collection'>
                                        <div className='box'>
                                            <span className="iconfont icon-shoucang2 "></span>
                                        </div>
                                        <i>我的收藏</i>
                                    </NavLink>
                                </li>
                                <li>
                                    <div className='box'>
                                       <span className="iconfont icon-xiazai "></span>
                                    </div>
                                    <i>离线下载</i>
                                </li>
                           </ul>
                       </div>
                       <div className='effect_index'>
                           <div className='index' onClick={this.clos.bind(this)}>
                               <div className='box'>
                                   <span className="iconfont icon-yemian ss"></span>
                               </div>
                               <i>首页</i>
                           </div>
                       </div>
                   </div>
                </div>
                {/*<div className='oMode'>*/}
                {/*    <ul>*/}
                {/*        <li>夜间模式</li>*/}
                {/*        <li>夜间模式</li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </Row>
{/*——————————轮播图————————————*/}
            <div   className='amap'>
                <Carousel autoplay>
                    {this.state.oMap.map((val,i)=>{
                        return <div key={i}>
                                <NavLink className='oA' to={{
                                    pathname:'/Details',
                                    state:{
                                        id:val.id
                                    }}}>
                                    <div className='omf_box'>
                                        <img src={val.image} alt={val.title}/>
                                    </div>
                                    <h3 className='amap_h3'>{val.title}</h3>
                                </NavLink>
                        </div>
                    })}
                </Carousel>
            </div>
{/*——————————新闻————————————*/}
        <section className='news'>
           <article className='news_content'>
               <div className='content_top'>
                   <h2 className='h2'>今日要闻</h2>
               </div>
                <ul className='content_ul'>
                    {this.state.oNews.map((val,i)=>{
                            return <li  key={i} >
                                    <NavLink  to={{
                                        pathname:'/Details',
                                        state:{
                                            id:val.id
                                        }
                                    }}>
                                        <p className='li_p'>{val.title}</p>
                                        <div className='con'>
                                            <img src={val.images[0]} className='con_img' alt={val.title} />
                                            <span className='con_span' style={{display:'none'}}>
                                                <span className='icons-list'><Icon type="switcher" /></span>
                                                <p>多图</p>
                                           </span>
                                        </div>
                                    </NavLink>
                            </li>
                        })}
                </ul>
           </article>
            <article className='news_content'>
                    <div className='content_top'>
                        <h2  className='h2'>{this.state.month}{this.state.weekDay}</h2>
                    </div>
                    <ul className='content_ul'>
                        {this.state.oPast.map((val,i)=>{
                            return <li  key={i} >
                                <NavLink  to={{
                                    pathname:'/Details',
                                    state:{
                                        id:val.id
                                    }}}>
                                    <p className='li_p'>{val.title}</p>
                                    <div className='con'>
                                        <img src={val.images[0]} className='con_img' alt={val.title} />
                                        <span className='con_span' style={{display:'none'}}>
                                            <span className='icons-list'><Icon type="switcher" /></span>
                                            <p>多图</p>
                                         </span>
                                    </div>
                                </NavLink>
                            </li>
                        })}
                    </ul>
                </article>
            {/*往日新闻*/}
            {this.state.arr.map((val,index)=>{
                    return <article className='news_content' key={index}>
                            <div className='content_top'>
                                <h2 className='h2'>{this.state.month}{this.state.weekDay}</h2>
                            </div>
                            <ul className='content_ul'>
                                {val.data.stories.map((val,i)=>{
                                    return <li  key={i} >
                                        <NavLink  to={{
                                            pathname:'/Details',
                                            state:{
                                                id:val.id
                                            }
                                        }}>
                                            <p className='li_p'>{val.title}</p>
                                            <div className='con'>
                                                <img src={val.images[0]} className='con_img' alt={val.title} />
                                                <span className='con_span' style={{display:'none'}}>
                                                <span className='icons-list'><Icon type="switcher" /></span>
                                                <p>多图</p>
                                             </span>
                                            </div>
                                        </NavLink>
                                    </li>
                                })}
                            </ul>
                        </article>
                  })
            }
        </section>
        </div>)};
        componentDidMount() {
            /*今日新闻*/
            axios.get('/api/4/news/latest').then((res)=>{
                this.setState({
                    oMap:res.data.top_stories,
                    oNews:res.data.stories
                })
            });
            /*往日新闻*/
            data=new Date();
            week=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
            let  ss=data.toLocaleDateString().split('/').join("");
            axios.get('/api/4/news/before/'+ss).then((res)=>{
                str=new Date(res.data.date.substr(0,4), res.data.date.substr(4,2)-1, res.data.date.substr(6,2));
                this.setState({
                    oPast:res.data.stories,
                    weekDay:week[str.getDay()],
                    month:res.data.date.substr(4,2)+'月'+res.data.date.substr(6,2)+'日',
                    data:res.data.date
                });
            });
            window.addEventListener('scroll', this.handleScroll);
        };
        // 滚动事件
    handleScroll=()=>{
        let cont=document.getElementsByClassName('news_content');
        let h2=document.getElementsByClassName('h2');//
        let clien=document.documentElement.clientHeight || document.body.clientHeight;  //页面可视高度
        let scrollTop=document.documentElement.scrollTop || document.body.scrollTop;  //滚动条滚动高度
        let scrollHeight=document.documentElement.scrollHeight;  //滚动条滚动高度
        for(let i=0;i<cont.length;i++){
            let cos=cont[i].offsetTop;
            if(scrollTop<199){
                this.setState({
                    Firs:'首页'
                })
            }else if(scrollTop>cos+200){
                this.setState({
                    Firs:h2[i].innerText
                })
            }};
        let arr1=this.state.arr;
        if(scrollTop===0||scrollTop>=(scrollHeight-clien)){
            axios.get('/api/4/news/before/'+this.state.data).then(res=>{
                str=new Date(res.data.date.substr(0,4), res.data.date.substr(4,2)-1, res.data.date.substr(6,2));
                arr1.push(res);
                this.setState({
                    arr:arr1,
                    weekDay:week[str.getDay()],
                    month:res.data.date.substr(4,2)+'月'+res.data.date.substr(6,2)+'日',
                    data:res.data.date
                });
            });
        }

    };
        // 手风琴打开
    index(){
        document.body.style.overflow='hidden';
        this.setState({
            oInd:"block"
        })
    }
    // 手风琴关闭
    clos(){
        this.setState({
            oInd:"none"
        })
    }
    oEffect(){
        document.body.style.overflow='';
        this.setState({
            oInd:"none"
        })
    }
    /*顶部设置*/
    mode(){
      console.log(1)
     }
}
export default Index