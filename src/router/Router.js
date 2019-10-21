import  React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Index from '../components/Index'
import Collection from '../components/Collection'
import Comment from '../components/Comment'
import Details from '../components/Details'
let arr=[
    {
        path:'/Index',
        component:Index
    }, {
        path:'/Collection',
        component:Collection
    }, {
        path:'/Comment',
        component:Comment
    }, {
        path:'/Details',
        component:Details
    },{
        path:'*',
        redirect:'/Index'
    }
];
const  Router=()=>{
    return(<div>
            <Switch>
                {arr.map((val,index)=>{
                        if(val.path==='*'){
                           return <Redirect  key={index} to={val.redirect}/>
                        }else {
                            return <Route key={index} path={val.path} component={val.component}/>
                        }
                    })}
            </Switch>
        </div>)
}
export  default Router