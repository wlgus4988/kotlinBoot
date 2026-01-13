package com.ktbt.kotlinboot.entity

import jakarta.persistence.*
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime

@Entity
@Table(name = "gemini_history")
class GeminiHistory(

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    val userName: String = "황지현",

    val chatType: String,

    val gender: String?,

    val calendarType: String?,

    val birthDate: LocalDate?,

    val birthTime: LocalTime?,

    val userMessage: String?, // 추가된 컬럼 매핑

    @Column(columnDefinition = "TEXT") // PG의 TEXT 타입 명시
    val analysisResult: String,

    val createdAt: LocalDateTime = LocalDateTime.now()
)