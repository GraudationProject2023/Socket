package com.example.demo.repository;

import com.example.demo.entity.ChatMessage;
import com.example.demo.entity.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    Page<ChatMessage> findAllByChatRoomOrderBySendTimeDesc(ChatRoom chatRoom, Pageable pageable);

}
