import {Dispatcher} from 'flux'
import EventEmitter from 'events'
class State extends EventEmitter{
    oColor='white';//颜色
    arr=[];
}
var state=new State();

//实例化派发器
var dispatcher=new  Dispatcher();
//注册一个派发器
dispatcher.register((action)=>{
    switch(action.actionType){
        case 'colorName':
            state.oColor = action.actionParams;
            state.emit('chang');
            break;
        case 'colorArr':
            state.arr.push(action.actionParams);
            state.emit('chang');
            break;
    }
});
export  default {
    state,
    dispatcher

}