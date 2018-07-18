Page({
  data:{
    id1:"back",
    id2:"clear",
    id3:"negative",
    id4:"+",
    id5:"9",
    id6:"8",
    id7:"7",
    id8:"-",
    id9:"6",
    id10:"5",
    id11:"4",
    id12:"*",
    id13:"3",
    id14:"2",
    id15:"1",
    id16:"/",
    id17:"0",
    id18:".",
    id19:"history",
    id20:"=",
    screenData:"0",
    lastIsOperator:false,
    arr:[],
    logs:[],
    mode:'top left',
    src:'../assets/img/bcg.png'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  history:function(){
   wx.navigateTo({
     url:'../list/list'
   })
  },
clickButton:function(event){
 console.log(event.target.id);
 // https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html
 var id = event.target.id; // 当前按钮值
  if(id==this.data.id1){  // 退格
   var data= this.data.screenData; // 保存当前数据
   if(data==0){
     return;
   }
   data = data.substring(0,data.length-1); // 攫取字符串，把最后一位去掉，即退格
   if(data==""||data=="-"){
   data=0;
   }
   this.setData({screenData:data});
   this.data.arr.pop();      // 删除数组最后一项
  }else if(id==this.data.id2){// 清屏
     this.setData({screenData:"0"});
     this.data.arr.length=0;
  }else if(id==this.data.id3){// 正负号
   var data=this.data.screenData;
   if(data==0){
     return;
   }
   var firstWord = data.substring(0,1);
   if(firstWord=="-"){
     data =data.substring(1,data.length);
     this.data.arr.shift(); // 负负得正，删掉开头的“-”号
   }else{
     data="-"+data;
     this.data.arr.unshift("-"); // 若数字开头没有‘-’，添加负号
   }
   this.setData({screenData:data});

  }else if(id==this.data.id20){// = 等号按键
   var data = this.data.screenData;
   if(data==0){
     return;
   }
   var lastWord = data.substring(data.length-1,data.length); // 最后一个字符
   if(isNaN(lastWord)){
     return;
   }
   var num="";

   var lastOperator;
   var arr = this.data.arr;
   var optarr=[];
   // 求和
   for(var i in arr){
     if(isNaN(arr[i])==false||arr[i]==this.data.id18||arr[i]==this.data.id3){
       num+=arr[i];  // id18 小数点.  id3 负号-
     }else{
       lastOperator = arr[i];
       optarr.push(num);
       optarr.push(arr[i]);
       num="";
     }
   }
    optarr.push(Number(num));
    var result = Number(optarr[0])*1.0;
     console.log(">>>>>>"+result);     // 输入一个数字就按“=”，那么输出自身值
    for(var i=1;i<optarr.length;i++){
      if(isNaN(optarr[i])){
         if(optarr[1]==this.data.id4){ // id4 加号+
           result += Number(optarr[i+1]);
         }else if(optarr[1]==this.data.id8){  // id8减号 -
           result -= Number(optarr[i+1]);
         }else if(optarr[1]==this.data.id12){ // id12 乘号 *
           result *= Number(optarr[i+1]);
         }else if(optarr[1]==this.data.id16){  // 除号 /
           result /= Number(optarr[i+1]);
         }
      }
    }
    this.data.logs.push(data+"="+result);
    wx.setStorageSync('callogs',this.data.logs);  // 设置本地key值callogs,历史记录list
    this.data.arr.length=0;
    this.data.arr.push(result);
    this.setData({screenData:result+""}); // 转换为字符串
  }else{
     if(id==this.data.id4||id==this.data.id8||id==this.data.id12||id==this.data.id16){// + - * /
       if(this.data.lastIsOperator==true||this.data.screenData==0){
         return;
       }
     }

     var sd = this.data.screenData;
     var data;
     if(sd==0){
       data =id;
     }else{
       data=sd+id;
     }
     this.setData({screenData:data});
     this.data.arr.push(id);

     if(id==this.data.id4||id==this.data.id8||id==this.data.id12||id==this.data.id16){
       this.setData({lastIsOperator:true});
     }else{
       this.setData({lastIsOperator:false});
     }
  }
}
})
