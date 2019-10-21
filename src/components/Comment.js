import  React from 'react'
import  axios from 'axios'
// import  {NavLink} from 'react-router-dom'//NavLink固定写法，路径跳转
import  '../assets/images/ico/iconfont.css'
import '../assets/css/public.css'
import '../assets/css/comment.css'
class Comment extends  React.Component{
    constructor(){
        super();
        this.state={
            long:[],
            short:[],
            long_num:'',
            short_num:'',
            oShort:'none',
            nothing:'block',
            oLong:'none',
            color:'darkgrey',
            oLike:0,
            oTime:0,
            oShort_class:'icon-shang1-copy',
            ss:true,
            str:0,
            Thumbs:0,
        }
    }
    // 评论
    render() {
        return(<div className='oComment details'>
{/*         顶部             */}
            <nav className='nav oC_nav'>
                <div className='nav_box box' onClick={this.oFan.bind(this)}>
                    <span className="iconfont icon-fanhui1 "></span>
                    <p>{this.state.long_num+this.state.short_num}条评论</p>
                </div>
                <div className='box_righr box'>
                    <span className="iconfont icon-bianji "></span>
                </div>
            </nav>
{/*         评论信息             */}
            <section className='oCom_box clearfix'>
                {/*长评*/}
                <div className='long_comment'>
                    {/*数目*/}
                   <div className='long_num oLon'>
                     <h3>{this.state.long_num}条长评</h3>
                   </div>
                    {this.state.long_num===0?
                        (<div className='nothing'>
                        <div className='nothing_box'>
                            <span className="iconfont icon-xuweiyidai"></span>
                            <p>深度长评虚位以待</p>
                        </div>
                        </div>):(<ul className='long_list olist'>
                        {this.state.long.map((val,index)=>{
                            return<li key={index}>
                                {/*用户头像*/}
                                <div className='oHead'>
                                    <div className='oHead_box'>
                                        <img src={val.avatar} className='bg' alt={val.id}/>
                                    </div>
                                </div>
                                {/*用户名/用户评论/时间*/}
                                <div className='oMultiple'>
                                    {/*用户名*/}
                                    <div className='user'>
                                        <p>{val.author}</p>
                                        <div className='uset_zan'>
                                            <span className="iconfont icon-dianzan1 "></span>
                                            <i>{val.likes}</i>
                                        </div>
                                    </div>
                                    {/*用户评论*/}
                                    <div className='user_com'>
                                        {val.content}
                                    </div>
                                    {/*时间*/}
                                    <time className='oTime'>{val.time}</time>
                                </div>
                            </li>
                        })}
                    </ul>)}
                </div>
                {/*短评*/}
                <div className='long_comment  short_comment'>
                    {/*数目*/}
                    <div className='long_num'>
                        <h3>{this.state.short_num}条短评</h3>
                        <span className={"iconfont"+' '+`${this.state.oShort_class}`+' '+"ss"} onClick={this.Open.bind(this)}></span>
                    </div>
                    {/*评论列表*/}
                    <ul className='long_list' style={{display:this.state.oShort}}>
                        {this.state.short.map((val,index)=>{
                            return<li key={index}>
                                {/*用户头像*/}
                                <div className='oHead'>
                                    <div className='oHead_box'>
                                        <img src={val.avatar} className='bg' alt={val.id}/>
                                    </div>
                                </div>
                                {/*用户名/用户评论/时间*/}
                                <div className='oMultiple'>
                                    {/*用户名*/}
                                    <div className='user'>
                                        <p>{val.author}</p>
                                        <div className='uset_zan'>
                                            <span className="iconfont icon-dianzan1"  style={{color:this.state.color}} onClick={this.colour.bind(this,val.likes)}></span>
                                            <i>{val.likes}</i>
                                        </div>
                                    </div>
                                    {/*用户评论*/}
                                    <div className='user_com'>
                                       {val.content}
                                    </div>
                                    {/*时间*/}
                                    <time className='oTime'>{val.time}</time>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
            </section>
        </div>)};
    oFan(){
        this.props.history.go(-1);
    };
    componentDidMount() {
        //长评
        axios.get('/api/4/story/'+this.props.location.state.id+'/long-comments').then(res=>{
            this.setState({
                long:res.data.comments,
                long_num:res.data.comments.length,
                str:this.state.short_num+this.state.long_num,
            });
        });
        // 短评
        axios.get('/api/4/story/'+this.props.location.state.id+'/short-comments').then(res=>{
            // console.log(res);
            this.setState({
                short:res.data.comments,
                short_num:res.data.comments.length,
                str:this.state.short_num+this.state.long_num
            });
        });
    };
    Open(){
     if(this.state.ss===true){
         this.state.ss=false;
         this.setState({
             oShort:'block',
             oShort_class:"icon-shang1"
         })
     }else{
          this.state.ss=true;
          this.setState({
            oShort:'none',
            oShort_class:"icon-shang1-copy"
          })
        }
    };
    colour(x){
         x++;
        console.log(x);
    }
}
export default Comment