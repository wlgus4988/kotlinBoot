package com.ktbt.kotlinboot.service

import com.ktbt.kotlinboot.dto.Request
import com.ktbt.kotlinboot.entity.GeminiHistory
import com.ktbt.kotlinboot.repository.GeminiHistoryRepository
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.client.RestTemplate
import java.time.LocalDate
import java.time.LocalDateTime
import java.time.LocalTime

@Service
class GeminiService(
    private val geminiRepository: GeminiHistoryRepository,
    @Value("\${gemini.api.key}") private val apiKey: String,
    @Value("\${gemini.api.url}") private val apiUrl: String
) {
    private val restTemplate = RestTemplate()

    fun getAndSaveAnalysis(request: Request): String {
        return try {
            val analysisResult = callGeminiApi(request)
            saveToPg(request, analysisResult)
            analysisResult
        } catch (e: Exception) {
            println("에러 발생: ${e.message}")
            "서비스 이용 중 오류가 발생했습니다. 다시 시도해주세요."
        }
    }

    private fun callGeminiApi(request: Request): String {
        val finalUrl = "$apiUrl?key=$apiKey"

        val prompt = when (request.chatType) {
            "SAJU" -> """
                너는 사주 전문가야. 아래 정보를 바탕으로 2026년 운세를 분석해줘.
                - 생년월일: ${request.birthDate} (${request.calendar ?: "양력"})
                - 태어난 시간: ${request.birthTime ?: "모름"}
                - 성별: ${request.gender ?: "미지정"}
                - 사용자 추가 질문: ${request.userMessage}
                친절하고 구체적으로 2026년 이직, 금전운 위주로 설명해줘.
            """.trimIndent()

            else -> """
                너는 지현님의 다정한 AI 비서야. 
                사용자의 메시지에 대해 친절하고 도움이 되는 답변을 해줘.
                메시지: ${request.userMessage}
            """.trimIndent()
        }

        val requestBody = mapOf(
            "contents" to listOf(mapOf("parts" to listOf(mapOf("text" to prompt))))
        )

        return try {
            val response = restTemplate.postForEntity(finalUrl, requestBody, Map::class.java)
            parseTextFromResponse(response.body)
        } catch (e: Exception) {
            "Gemini API 호출 중 오류가 발생했습니다."
        }
    }

    private fun saveToPg(request: Request, result: String) {

        val parsedDate = try {
            if (!request.birthDate.isNullOrBlank()) LocalDate.parse(request.birthDate) else null
        } catch (e: Exception) { null }

        val parsedTime = try {
            if (!request.birthTime.isNullOrBlank()) {
                val timeStr = if (request.birthTime.length == 5) "${request.birthTime}:00" else request.birthTime
                LocalTime.parse(timeStr)
            } else null
        } catch (e: Exception) { null }

        val history = GeminiHistory(
            userName = request.userName ?: "황지현",
            chatType = request.chatType ?: "CHAT",
            gender = request.gender,
            calendarType = request.calendar,
            birthDate = parsedDate,
            birthTime = parsedTime,
            analysisResult = result,
            userMessage = request.userMessage ?: "",
            createdAt = LocalDateTime.now()
        )
        geminiRepository.save(history)
    }

    private fun parseTextFromResponse(body: Map<*, *>?): String {
        return try {
            val candidates = body?.get("candidates") as? List<*>
            val firstCandidate = candidates?.get(0) as? Map<*, *>
            val content = firstCandidate?.get("content") as? Map<*, *>
            val parts = content?.get("parts") as? List<*>
            val firstPart = parts?.get(0) as? Map<*, *>
            firstPart?.get("text") as? String ?: "응답 텍스트를 찾을 수 없습니다."
        } catch (e: Exception) {
            "응답 파싱 중 오류가 발생했습니다."
        }
    }

    fun getAllHistory(userName: String, chatType: String): List<GeminiHistory> {
        return geminiRepository.findByUserNameAndChatTypeOrderByCreatedAtAsc(userName, chatType)
    }
}