/**
 * Created by Administrator on 2017/11/26.
 */
function extend(O1,O2){
    for(var i in O2){
        O1[i]=O2[i];
    }
}
function each(arr,f){
    for(var i = 0;i<arr.length;i++){
        f.call(arr[i],i,arr[i]);
    }
}
function dataInfo(Obj,x,y){
    var c=document.createElement("canvas");
    var txt= c.getContext("2d");
    c.width=Obj.img.width;
    c.height=Obj.img.height;
    txt.drawImage(Obj.img,0,0);
    var data=txt.getImageData(x-1,y-1,3,3);
    var num=0;
    for(var q=0;q<data.data.length;q+=4){
        num+=data.data[q+3];
    }
    num=num/9;
    return parseInt(num);
}
var HGAME=new Object();
HGAME.event=new Object();//事件对象
HGAME.event.clickBuffer=new Array();//缓存要添加事件的节点 click buffer
HGAME.animate=function(Obj){
    var defaultObj={
        time:30,//动画间隔
        frequency:-1,//动画次数 -1表示无限制
        action:function(){},//动画每一帧的动作
        lastAction:function(){}//最后一次动画执行完成触发函数
    };
    extend(defaultObj,Obj);
    var oldTime=new Date();
    var newTime=null;
    this.time=defaultObj.time;
    this.frequency=defaultObj.frequency;
    this.action=defaultObj.action;
    this.lastAction=defaultObj.lastAction;
    this.stop=function(){
        cancelAnimationFrame(this.INT_BUFFER);
    };
    var THIS = this;
    this.run=function(){
        THIS.INT_BUFFER=requestAnimationFrame(THIS.run);
        newTime=new Date();
        if(newTime-oldTime>THIS.time){
            if(THIS.frequency!=-1){
                if(THIS.frequency-1==0){
                    THIS.frequency--;
                    THIS.stop();
                    THIS.action.call(THIS,THIS);
                    THIS.lastAction.call(THIS,THIS);
                    return;
                }
                THIS.frequency--;
                THIS.action(THIS);
            }else{
                THIS.action(THIS);
            }

        }
        THIS.INT_BUFFER=0;
    };
    this.action=Obj.action;
    return this;
};
//HGAME.initGame=new HGAME.animate();
/**
 * 2d对象类型
 * x 对象的x坐标
 * y 对象的y坐标
 * w 对象的宽度
 * h 对象的高度
 * color 对象的颜色
 * img 对象的img
 * child 对象的子代 子代的x y会相对于父代
 * W_INT 当一张图出现多帧的时候需要使用
 * H_INT 当一张图出现多帧的时候需要使用
 * CONST_BUF_X 在画布上的x 不用修改 修改了也没用
 * CONST_BUF_Y 在画布上的y 不用修改 修改了也没用
 *
 * click相关
 * clickFun 点击
 * isClick 是否添加点击事件
 */

HGAME.Object2D=function(Obj){
    var defaultObj={
        x:0,
        y:0,
        w:20,
        h:20,
        W_INT:0,
        H_INT:0,
        color:"#cccccc",
        img:null,
        child:new Array(),
        CONST_BUF_X:0,
        CONST_BUF_Y:0,
        clickFun:function(){},
        isClick:false
    };
    extend(defaultObj,Obj);
    extend(this,defaultObj);
    if(this.isClick){
        HGAME.event.clickBuffer.push(this);
    }
    this.add=function(Obj){
        this.child.push(Obj);
    }
};
/**
 * 画布类型
 * dom 节点
 * w 宽度
 * h 高度
 * clearColor 默认的颜色
 * child 对象的子代 子代的x y会相对于父代
 * W_INT 当一张图出现多帧的时候需要使用
 * H_INT 当一张图出现多帧的时候需要使用
 * x 画布的x 相对于画布来说x应该是不需要改变的
 * y 画布的y 相对于划不来说y应该是不需要改变的
 * CONST_BUF_X 在画布上的x 不用修改 修改了也没用
 * CONST_BUF_Y 在画布上的y 不用修改 修改了也没用
 */
HGAME.canvas=function(Obj){
    var defaultObj={
        dom:document.createElement("canvas"),
        w:500,
        h:500,
        W_INT:0,
        H_INT:0,
        color:"#cccccc",
        child:new Array(),
        x:0,
        y:0,
        CONST_BUF_X:0,
        CONST_BUF_Y:0
    };
    Object.defineProperty(this,"w",{
        set:function(a){
            this.dom.width=a;
        },
        get:function(){
            return this.dom.width;
        }
    });
    Object.defineProperty(this,"h",{
        set:function(a){
            this.dom.height=a;
        },
        get:function(){
            return this.dom.height;
        }
    });
    extend(defaultObj,Obj);
    extend(this,defaultObj);
    //由于canvas只兼容ie9及以上所以这里就不对事件进行兼容了
    this.dom.addEventListener("click",function(e){
        var event=typeof window.event!="undefined"?window.event:typeof e!="undefined"?e:event;
        var x =event.offsetX;
        var y =event.offsetY;
        var aX=0;
        var aY=0;
        var buf=null;
        for(var i =0;i<HGAME.event.clickBuffer.length;i++){
            buf=HGAME.event.clickBuffer[i];
            if(x>buf.x&&x<buf.x+buf.w&&y>buf.y&&y<buf.y+buf.h){
                if(buf.img){
                    aX=x-buf.x;
                    aY=y-buf.y;
                    if(dataInfo(buf,aX,aY)>80){
                        buf.clickFun.call(buf);
                    };
                }else{
                    buf.clickFun.call(buf);
                }
            }
        }
    });
    var THIS = this;
    this.txt=this.dom.getContext("2d");
    this.txt.draw=function(O){
        if(O.img){
            // debugger;
            THIS.txt.drawImage( O.img, O.w* O.W_INT,  O.h* O.H_INT, O.w, O.h, O.CONST_BUF_X, O.CONST_BUF_Y, O.w, O.h);
        }else{
            THIS.txt.fillStyle= O.color;
            THIS.txt.fillRect(O.CONST_BUF_X, O.CONST_BUF_Y, O.w, O.h);
        }
    };
    this.clear=function(){
        this.txt.clearRect(0,0,THIS.w,THIS.h);
    };
    this.render=function(){
        this.clear();
        this.txt.beginPath();
        function f(O){
            each(O.child,function(){
                this.CONST_BUF_X= O.CONST_BUF_X+this.x;
                this.CONST_BUF_Y= O.CONST_BUF_Y+this.y;
                THIS.txt.draw(this);
                if(this.child.length){
                    f(this);
                }
            });
        }
        f(THIS);
        this.txt.closePath();
    };
    this.add=function(Obj){
        this.child.push(Obj);
    }
};
//着色类型
HGAME.render=function(){

};
/**
 * 获取资源类型
 * data 一个资源字符串地址
 * loaded 所有资源加载完成
 * loadCall 加载资源的数字发生改变触发函数
 * loadNum 当前已经加载了多少资源
 *
 * */
HGAME.source=function(Obj){
    var defaultObj={
        data:[],
        loaded:function(THIS){

        },
        loadCall:function(num,allNum){

        },
        loadNum:0
    };
    extend(defaultObj,Obj);
    extend(this,defaultObj);
    var THIS = this;
    if(!this.data.length){
        THIS.loaded.call(this,this);
        return;
    }
    var $valueBuff="";
    Object.defineProperty(this,"loadNum",{
        get:function(){
            return $valueBuff;
        },
        set:function(v){
            THIS.loadCall.call(THIS,v,THIS.data.length);
            $valueBuff=v;
        }
    });
    var buf="";
    for(var i=0;i<this.data.length;i++){
        if(typeof this.data[i]=="string"){
            buf=this.data[i];
            this.data[i]=new Image();
            this.data[i].src=buf;
        }

    }
    for(i=0;i<this.data.length;i++){
        if(this.data[i].complete==true){
            this.data[i].width=parseInt(this.data[i].width);
            this.data[i].height=parseInt(this.data[i].height);
            this.loadNum++;
            if(this.loadNum==this.data.length){
                this.loaded.call(this,this);
            }
        }else{
            this.data[i].onload=function(){
                THIS.loadNum++;
                if(THIS.loadNum==THIS.data.length){
                    THIS.loaded.call(THIS,THIS);
                }
                this.width=parseInt(this.width);
                this.height=parseInt(this.height);
            };
            this.data[i].onerror=function(){
                window.debuggerSource=THIS;
                console.log(THIS)
            }
        }
    }
};

