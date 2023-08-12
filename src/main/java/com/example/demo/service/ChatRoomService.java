package com.example.demo.service;

import com.example.demo.entity.ChatRoom;
import com.example.demo.entity.Member;
import com.example.demo.redis.RedisSubscriber;
import com.example.demo.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatRoomService {

    private final Map<String, ChannelTopic> topics;
    private final RedisMessageListenerContainer redisMessageListener;
    private final RedisSubscriber redisSubscriber;
    private final ChatRoomRepository chatRoomRepository;


    public Long createRoom(String name) {

        ChatRoom chatRoom =
                ChatRoom
                        .builder()
                        .name(name)
                        .build();

        ChatRoom saveChatRoom = chatRoomRepository.save(chatRoom);

        // 토픽 생성
        String roomId = "room" + saveChatRoom.getId();

        if(!topics.containsKey(roomId)) {
            ChannelTopic topic = new ChannelTopic(roomId);
            redisMessageListener.addMessageListener(redisSubscriber, topic);
            topics.put(roomId, topic);
        }

        return saveChatRoom.getId();
    }


    public ChatRoom findRoom(long roomId) {
        ChatRoom chatRoom = findExistRoom(roomId);

        return chatRoom;
    }

    private ChatRoom findExistRoom(long roomId) {
        Optional<ChatRoom> chatRoom = chatRoomRepository.findById(roomId);

        return chatRoom.get();
    }
}
