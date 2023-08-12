import React, { useState, useEffect, useRef, useCallback } from "react";
import { createGlobalStyle, styled } from "styled-components";
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
  const ChatWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  `;

  const ChatContainer = styled.div`
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  `;

  const ChatHeader = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
  `;

  const MessageList = styled.div`
    max-height: 300px;
    overflow-y: auto;
  `;

  const Message = styled.div`
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    background-color: ${({ isMe }) => (isMe ? "#def3fc" : "#f5f5f5")};
  `;

  const MessageName = styled.b`
    color: ${({ isMe }) => (isMe ? "#007bff" : "#333")};
  `;

  const MessageText = styled.span`
    display: block;
    color: #333;
  `;

  const InputSection = styled.div`
    display: flex;
    margin-top: 20px;
  `;

  const NameInput = styled.input`
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  `;

  const MessageInput = styled.textarea`
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: vertical;
  `;

  const SendButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    cursor: pointer;
  `;
  const MessageContainer = styled.div`
    display: flex;
    justify-content: ${({ isMe }) => (isMe ? "flex-end" : "flex-start")};
    margin-bottom: 10px;
  `;

  const MessageBubble = styled.div`
    max-width: 70%;
    padding: 10px;
    border-radius: ${({ isMe }) =>
      isMe ? "10px 10px 0 10px" : "10px 10px 10px 0"};
    background-color: ${({ isMe }) => (isMe ? "#def3fc" : "#f5f5f5")};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
  `;

  const onText = (event) => {
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
      <ChatWrapper>
        <ChatContainer>
          <ChatHeader>WebSocket Chatting</ChatHeader>
          <br />
          <MessageList>
            {chatt.map((item, idx) => (
              <MessageContainer key={idx} isMe={item.name === name}>
                <MessageBubble isMe={item.name === name}>
                  <MessageName isMe={item.name === name}>
                    {item.name}
                  </MessageName>
                  <span>[{item.date}]</span>
                  <MessageText>{item.msg}</MessageText>
                </MessageBubble>
              </MessageContainer>
            ))}
          </MessageList>
          <InputSection>
            <NameInput
              disabled={checkLog}
              placeholder="Enter your name"
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <MessageInput
              id="msg"
              value={msg}
              onChange={onText}
              onKeyDown={(ev) => {
                if (ev.keyCode === 13) {
                  send();
                }
              }}
            />
            <SendButton onClick={send}>Send</SendButton>
          </InputSection>
        </ChatContainer>
      </ChatWrapper>
    </>
  );
};

export default Chat;
