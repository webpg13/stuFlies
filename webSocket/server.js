// 获得WebSocketServer类型
const WebSocketServer = require('ws').Server;
// 创建WebSocketServer对象实例,监听指定端口
const wss = new WebSocketServer({port:8080}); 
// 创建保存所有已连接到服务器的客户端对象的数组
var clients=[];
// 为服务器添加connection事件监听,当有客户端连接到服务端时,立刻将客户端对象保存进数组中
wss.on('connection',function connection(client){
  console.log("一个客户端连接到服务器")
  // 只有当的客户端第一次连接时,就添加到数组中
  if(clients.indexOf(client)===-1){
    clients.push(client);
    console.log("有"+clients.length+"个客户端在线");
    // 为每个client对象绑定message事件,当某个客户端发来消息是,自动触发
    client.on('message',function(msg){
      console.log(msg)
      // 遍历clients数组中每个其他客户端对象,并发送消息给客户端
      for(var c of clients){
        if(c!=client){
          c.send(msg);
        }
      }
    })
  }  
})