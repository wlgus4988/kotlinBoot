package com.ktbt.kotlinboot.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class PageController {

    // 메인 페이지
    @GetMapping("/")
    fun index(): String {
        return "index.html"
    }

    // 사주 서비스 페이지
    @GetMapping("/saju")
    fun sajuPage(): String {
        return "saju.html"
    }

    // 일반 프롬프트 챗봇 페이지
    @GetMapping("/chat")
    fun chatPage(): String {
        return "chat.html"
    }
}