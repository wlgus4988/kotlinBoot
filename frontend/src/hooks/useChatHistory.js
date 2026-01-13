import { useState, useEffect } from 'react';

export const useChatHistory = (type) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. [가져오기] 과거 내역 로드 및 필드명 매핑
    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/history?type=${type}`);
            if (!response.ok) throw new Error('내역 로드 실패');
            const data = await response.json();

            // 백엔드 Entity(calendarType)를 프론트(calendar) 구조로 매핑하여 저장
            const mappedData = data.map(item => ({
                ...item,
                calendar: item.calendarType || item.calendar, // 필드명 불일치 해결
                userMessage: item.userMessage,
                analysisResult: item.analysisResult
            }));
            setHistory(mappedData);
        } catch (error) {
            console.error(`${type} 내역 로드 에러:`, error);
        } finally {
            setLoading(false);
        }
    };

    // 2. [보내기] 낙관적 업데이트 및 백엔드 전송
    const sendMessage = async (payload) => {
        // 1. [낙관적 업데이트] 내 메시지를 즉시 추가
        const newUserMsg = {
            userMessage: payload.userMessage, //
            analysisResult: type === 'SAJU' ? "사주를 분석 중입니다... 🔮" : "답변을 생각 중입니다... 💭"
        };
        setHistory(prev => [...prev, newUserMsg]);

        setLoading(true);
        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...payload,
                    chatType: type,          //
                    userName: "황지현"        //
                })
            });

            if (!response.ok) throw new Error('서버 응답 에러');
            const result = await response.json();

            // 🔍 디버깅용: 서버가 실제로 어떤 데이터를 주는지 콘솔에서 꼭 확인해보세요!
            console.log("서버 응답 데이터:", result);

            setHistory(prev => {
                const newHistory = [...prev];
                const lastIndex = newHistory.length - 1;

                // 2. 서버 응답으로 데이터 교체 (기존 userMessage가 사라지지 않게 보호)
                newHistory[lastIndex] = {
                    ...newHistory[lastIndex], // 1) 먼저 임시 데이터를 깔아주고 (userMessage 유지)
                    analysisResult: result.analysis,                // 2) 서버가 준 데이터로 덮어쓰기 (analysisResult 업데이트)
                    calendar: result.calendarType || result.calendar //
                };
                return newHistory;
            });
        } catch (error) {
            console.error("전송 에러:", error);
            // 에러 시 사용자에게 알림
            alert("메시지 전송에 실패했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // 타입(SAJU/CHAT)이 바뀔 때마다 자동으로 내역을 가져옴
    useEffect(() => {
        fetchHistory();
    }, [type]);

    return { history, loading, sendMessage, fetchHistory };
};