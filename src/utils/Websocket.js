import { REAREND_HOSTNAME } from '../configs/Rearend';

export const ws = new WebSocket("ws://" + REAREND_HOSTNAME);

export var websocketData = {
    websocketID: null,
    message: null,
    httpStatusCode: null,
    isError: null,

    //user
    user:{
        id:null,
        name:null,
        password:null,
        authority:null
    }
};

ws.onopen = () => {
    //Auto login
    var loginInfo = {
        websocketID: "",
        RequestPath: "user/login/auto",
        user:{
            userID:0,
            password:""
        }
    }

    // connection opened
    ws.send(JSON.stringify(loginInfo)); // send a message
};

ws.onmessage = (e) => {
    // a message was received
    websocketData = JSON.parse(e.data);
    console.log("解析后: " + e.data);
    console.log(websocketData["userID"]);
    // document.cookie(e.data)
};

ws.onerror = (e) => {
    // an error occurred
    console.log(e.message);
};

ws.onclose = (e) => {
    // connection closed
    console.log(e.code, e.reason);
    var expires = new Date(new Date() + 24 * 60 * 60 * 1000);
    // document.cookie = "userID="+stringify(websocketData["userID"]);
    // Cookies.set('userInfo', websocketData["userID"], {expires: expires});
};


/*
<===========================下面是改良版，正在写代码中=====================================>
*/

class OJWebSocket{
    constructor(){
        this.websocket = null;
        
        this.handlers = {
            
        };
    }

    initialize = () =>{
        try{
            this.websocket = new WebSocket("wss://" + REAREND_HOSTNAME);
        }catch(err){
            console.log("start websocket error: ", err);
            setTimeout(()=>{
                this.initialize();
            }, 10000);
        }
 
        this.websocket.onopen = (e)=>{
            //打开连接后自动登录
            var loginInfo = {
                websocketID: "",
                RequestPath: "user/login/auto",
                user:{
                    userID:0,
                    password:""
                }
            };
            this.sendData(loginInfo);
        };

        this.websocket.onmessage=(e)=>{
            var receive = JSON.parse(e.data);
            
        }

        this.websocket.onerror = (e) =>{

        };

        this.websocket.onclose = (e) =>{

        };

        sendData = (message) =>{
            this.websocket.send(JSON.stringify(message));
        };
    }
}