/**
 * Created by ibm on 2018/6/5.
 */
function move(obj,dir,attr,traget,fun){ //A、要运动的元素  B 、步长   C、运动终止值
    // -  500  0     + 0 500
    dir= parseInt(getStyle(obj,attr))<traget?dir:-dir;
    //如果在不断触发的事件中添加定时器，先清除，后添加
    clearInterval(obj.timer);
    obj.timer = setInterval(function (){
        //改变left的值，实现移动      先获取当前left的值，然后+或者-一个值
        var speed = parseInt(getStyle(obj,attr))+dir;

        //如果往左走，speed必须<=0   如果往右走，speed>=500
        if(speed <= traget&&dir<0 || speed >= traget&&dir>0){
            speed = traget;
            clearInterval(obj.timer);
            //2个为真才为真，前面一个为假，后一个就不会再看了
            fun && fun();
        }
        //设置div的left值
        obj.style[attr] = speed +"px";
    },30);
}


//找不确定的不一定值，用参数  元素，属性，目标值
function hcMove(obj,json,fun){
    //保证当前元素只有一个定时器在运动，
    clearInterval(obj.timer);
    obj.timer = setInterval(function (){
        //自己定义一个属性标志当前的状态
        var tag = true;  //假设都到达了目标点
        for(var attr in json){
            //attr 属性
            //json[attr]  目标值
            //1.判断是否是透明度，透明度需要单独处理
            if(attr == "opacity"){
                var cur = parseFloat(getStyle(obj,attr))*100;
            }else{
                var cur = Math.round(parseFloat(getStyle(obj,attr)));

            }
            var speed = (json[attr]-cur)/5;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //当前值已经到目标点了就可以停止
            /*if(cur == json[attr]){
             clearInterval(obj.timer);
             }*/

            if(cur != json[attr]){tag = false};
            //2.判断，透明度不加单位
            if(attr == "opacity"){
                obj.style[attr] = (cur + speed)/100;
            }else{
                obj.style[attr] = cur + speed + "px";  //491.9
            }
        }

        if(tag == true){
            clearInterval(obj.timer);
            fun&&fun();
        }
    },30);
}









function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj)[attr];
    }
}


function ajax(url,sFun,cFun) {
    //1.创建对象
    var ajax = new XMLHttpRequest();
    ajax.dataType = "jsonp";
    //2.建立连接 open
    ajax.open("GET", url, true);

    //3.发送请求
    ajax.send();

    //4.响应
    ajax.onreadystatechange = function () {
        //5.响应完成
        if (ajax.readyState == 4) {
            //6.成功or 失败
            if (ajax.status == 200) {
                //成功
                sFun && sFun(ajax.responseText);
            } else {
                //失败
                cFun && cFun(ajax.status);
            }
        }
    }
}

