import React, { useState, useEffect, useRef, useCallback } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("TripPlannerz");
  const [chatt, setChatt] = useState([]);
  const [checkLog, setCheckLog] = useState(true); // Set to true for mock data
  const [socketData, setSocketData] = useState();

  const ws = useRef(null); //websocket을 담는 변수, 컴포넌트가 변경될 때 객체가 유지될 수 있도록 ref로 저장

  const msgBox = chatt.map((item, idx) => (
    <div key={idx} className={item.name === name ? "me" : "other"}>
      <span>
        <b>{item.name}</b>
      </span>
      <span>{item.msg}</span>
    </div>
  ));

  useEffect(() => {
    if (socketData !== undefined) {
      const tempData = chatt.concat(socketData);
      console.log(tempData);
      setChatt(tempData);
    }
  }, [socketData]);

  const GlobalStyle = createGlobalStyle`
    ${reset}
  `;
  //css가 초기화 된 component

  const onText = (event) => {
    console.log(event.target.value);
    setMsg(event.target.value);
  };

  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket("");

    ws.current.onmessage = (message) => {
      const dataSet = JSON.parse(message.data);
      setSocketData(dataSet);
    };
  });

  const send = () => {
    if (msg !== "") {
      const data = {
        name,
        msg,
        date: new Date().toLocaleString(),
      };

      setChatt([...chatt, data]); // Add the new message to the mock data
    } else {
      alert("Message cannot be empty.");
      document.getElementById("msg").focus();
      return;
    }

    setMsg("");
  };

  useEffect(() => {
    if (checkLog) {
      // Mock data for testing
      const mockData = [
        {
          name: "TripPlannerz",
          msg: "Hello there!",
          date: new Date().toLocaleString(),
        },
        {
          name: "John",
          msg: "Hi, TripPlannerz!",
          date: new Date().toLocaleString(),
        },
      ];

      setChatt(mockData);
    }
  }, [checkLog]);


//   const send = useCallback(() => {
//     if(!chkLog) {
//         if(name === "") {
//             alert("이름을 입력하세요.");
//             document.getElementById("name").focus();
//             return;
//         }
//         webSocketLogin();
//         setChkLog(true);
//     }

//     if(msg !== ''){
//         const data = {
//             name,
//             msg,
//             date: new Date().toLocaleString(),
//         };  //전송 데이터(JSON)

//         const temp = JSON.stringify(data);
        
//         if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
//             ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
//                 console.log(ws.current.readyState);
//                 ws.current.send(temp);
//             }
//         }else {
//             ws.current.send(temp);
//         }
//     }else {
//         alert("메세지를 입력하세요.");
//         document.getElementById("msg").focus();
//         return;
//     }
//     setMsg("");
// });

  return (
    <>
      <GlobalStyle />
      <div id="chat-wrap">
        <div id="chat">
          <h1 id="title">WebSocket Chatting</h1>
          <br />
          <div id="talk">
            <div className="talk-shadow"></div>
            {chatt.map((item, idx) => (
              <div key={idx} className={item.name === name ? "me" : "other"}>
                <span>
                  <b>{item.name}</b>
                </span>{" "}
                [ {item.date}]<br />
                <span>{item.msg}</span>
              </div>
            ))}
          </div>
          <input
            disabled={checkLog}
            placeholder="Enter your name"
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <div id="sendZone">
            <textarea
              id="msg"
              value={msg}
              onChange={onText}
              onKeyDown={(ev) => {
                if (ev.keyCode === 13) {
                  send();
                }
              }}
            ></textarea>
            <input type="button" value="Send" id="btnSend" onClick={send} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
