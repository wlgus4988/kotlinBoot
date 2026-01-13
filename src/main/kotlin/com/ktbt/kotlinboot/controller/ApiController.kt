package com.ktbt.kotlinboot.controller

import com.ktbt.kotlinboot.dto.Request
import com.ktbt.kotlinboot.entity.GeminiHistory
import com.ktbt.kotlinboot.service.GeminiService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api")
class ApiController(private val geminiService: GeminiService) {

    /**
     * 사주 분석 및 일반 채팅 통합 API
     * chatType: "SAJU" 또는 "CHAT"
     */
    @PostMapping("/analyze")
    fun analyze(@RequestBody request: Request): ResponseEntity<Map<String, String>> {
        val result = geminiService.getAndSaveAnalysis(request)
        return ResponseEntity.ok(mapOf("analysis" to result))
    }

    /**
     * 타입별 과거 내역 조회 API
     * 예: /api/history?type=SAJU
     */
    @GetMapping("/history")
    fun getHistory(
        @RequestParam(defaultValue = "황지현") userName: String,
        @RequestParam(name = "type") chatType: String
    ): ResponseEntity<List<GeminiHistory>> {
        val history = geminiService.getAllHistory(userName, chatType)
        return ResponseEntity.ok(history)
    }

}