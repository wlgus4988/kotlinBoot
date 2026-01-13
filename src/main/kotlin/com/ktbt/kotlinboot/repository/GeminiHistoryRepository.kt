package com.ktbt.kotlinboot.repository

import com.ktbt.kotlinboot.entity.GeminiHistory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface GeminiHistoryRepository : JpaRepository<GeminiHistory, Long> {

    // 특정 사용자 이름 & 채팅 타입
    fun findByUserNameAndChatTypeOrderByCreatedAtAsc(userName: String, chatType: String): List<GeminiHistory>
}