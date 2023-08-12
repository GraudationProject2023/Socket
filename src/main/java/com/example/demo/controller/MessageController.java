package com.example.demo.controller;

import com.example.demo.dto.MessageDto;
import com.example.demo.redis.PublishMessage;
import com.example.demo.redis.RedisPublisher;
import com.example.demo.service.ChatMessageService;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller
@Slf4j
@RequiredArgsConstructor
public class MessageController {

    private final ChatMessageService chatService;

    private final RedisPublisher redisPublisher;

    @Resource(name = "chatRedisTemplate")
    private final RedisTemplate redisTemplate;

    @MessageMapping("/chats/messages/{room-id}")
    public void message(@DestinationVariable("room-id") Long roomId, MessageDto messageDto) {
        LocalDateTime sendTime = LocalDateTime.now();
        PublishMessage publishMessage =
                new PublishMessage(messageDto.getRoomId(), messageDto.getSenderId(), messageDto.getContent(), sendTime);
        log.info("publishMessage: {}", publishMessage.getContent());
        // 채팅방에 메세지 전송
        redisPublisher.publish(ChannelTopic.of("room" + roomId), publishMessage);
        log.info("레디스 서버에 메세지 전송 완료");

        chatService.saveMessage(messageDto, sendTime);
    }
}
