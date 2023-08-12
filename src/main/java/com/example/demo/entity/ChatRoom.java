package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue
    @Column(name = "chatroom_id")
    private Long id;

    private String name;

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatRoomMember> chatRoomMemberList = new ArrayList<>();

    public void setName(String name) {
        this.name = name;
    }
}
