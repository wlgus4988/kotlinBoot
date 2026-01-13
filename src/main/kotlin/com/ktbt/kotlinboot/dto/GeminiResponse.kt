package com.ktbt.kotlinboot.dto

// 요청 및 응답을 처리할 데이터 구조
data class GeminiRequest(val contents: List<Content>)
data class Content(val parts: List<Part>)
data class Part(val text: String)

data class GeminiResponse(
    val candidates: List<Candidate>
) {
    data class Candidate(val content: Content)
}