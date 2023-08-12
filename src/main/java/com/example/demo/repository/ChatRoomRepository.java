package com.example.demo.repository;

import com.example.demo.entity.ChatRoom;
import com.example.demo.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findBySenderAndReceiver(Member sender, Member receiver);
    Page<ChatRoom> findAllBySenderOrReceiver(Pageable pageable, Member sender, Member receiver);
}
