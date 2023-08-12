package com.example.demo.service;

import com.example.demo.dto.MessageDto;
import com.example.demo.entity.ChatMessage;
import com.example.demo.entity.ChatRoom;
import com.example.demo.entity.Member;
import com.example.demo.repository.ChatMessageRepository;
import com.example.demo.repository.ChatRoomRepository;
import com.example.demo.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatMessageService {
    private final ChatMessageRepository chatMessageRepository;
    private final MemberRepository memberRepository;
    private final ChatRoomRepository chatRoomRepository;


    public void saveMessage(MessageDto messageDto, LocalDateTime sendTime) {
        Member member = memberRepository.findById(messageDto.getSenderId()).get();
        ChatRoom chatRoom = chatRoomRepository.findById(messageDto.getRoomId()).get();
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setChatRoom(chatRoom);
        chatMessage.setMember(member);
        chatMessage.setContent(messageDto.getContent());
        chatMessage.setSendTime(sendTime);

        chatMessageRepository.save(chatMessage);

    }
}
