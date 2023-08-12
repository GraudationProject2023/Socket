import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("TripPlannerz");
  const [chatt, setChatt] = useState([]);
  const [checkLog, setCheckLog] = useState(true); // Set to true for mock data

  const GlobalStyle = createGlobalStyle`
    ${reset}
  `;

  const onText = (event) => {
    console.log(event.target.value);
    setMsg(event.target.value);
  };

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
