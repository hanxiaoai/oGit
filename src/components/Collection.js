import  React from 'react'
import  Store from '../store/Store.js'
import  '../assets/images/ico/iconfont.css'
import { Icon } from 'antd';//图标
import '../assets/css/public.css'
import '../assets/css/index.css'
import '../assets/css/comment.css'
import '../assets/css/coll.css'
import {NavLink} from "react-router-dom";
// 收藏
class Coll extends  React.Component{
    constructor(){
        super();
        this.state={
            coll:Store.state.arr,
            number:0
        }
    }
    render() {
        return(<div className='oIndex oComment details coll'>
            <nav className='nav oC_nav'>
                <div className='nav_box box' onClick={this.oFan.bind(this)}>
                    <span className="iconfont icon-ziyuan "></span>
                    <p>{this.state.number}条收藏</p>
                </div>
            </nav>
            <section className='news'>
                 <article className='news_content'>
                    <ul className='content_ul'>
                        {this.state.coll.map((val,index)=>{
                                return <li key={index}>
                                    <NavLink  to={{
                                        pathname:'/Details',
                                        state:{id:val.id}
                                    }}>
                                        <p className='li_p'>{val.title}</p>
                                        <div className='con'>
                                            <img src={val.image} className='con_img' alt={val.title} />
                                            <span className='con_span' style={{display:'none'}}>
                                                <span className='icons-list'><Icon type="switcher" /></span>
                                                <p>多图</p>
                                             </span>
                                        </div>
                                    </NavLink>
                                </li>
                            })
                        }
                    </ul>
                </article>
            </section>
        </div>)};
    componentDidMount() {
        let sum=this.state.coll.length;
        Store.state.on('chang',()=>{
            this.setState({
                coll:Store.state.arr
            })
        });
        this.setState({
            number:sum
        });
        console.log(this.state.coll.length);
    }

    oFan(){
        this.props.history.go(-1);
    };
}
export default Coll