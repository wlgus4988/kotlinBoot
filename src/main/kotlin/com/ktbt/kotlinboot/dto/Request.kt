package com.ktbt.kotlinboot.dto

data class Request(
    val chatType: String,
    val userName: String = "황지현",
    val birthDate: String? = null,
    val calendar: String? = null,
    val gender: String? = null,
    val birthTime: String? = null,
    val userMessage: String    // 일반 채팅 메시지 또는 사주 추가 질문
)