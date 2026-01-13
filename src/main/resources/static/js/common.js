async function sendRequest(type) {
    const userMsgInput = document.getElementById('userMessage');
    const requestData = {
        chatType: type,
        userName: "황지현",
        userMessage: userMsgInput.value,
        // 사주일 때만 입력값 수집 (채팅일 땐 null)
        birthDate: document.getElementById('birthDate')?.value || null,
        calendar: document.getElementById('calendar')?.value || null,
        gender: document.getElementById('gender')?.value || null,
        birthTime: document.getElementById('birthTime')?.value || null
    };

    if (type === 'SAJU' && !requestData.birthDate) return alert("생년월일을 입력해주세요!");
    if (!requestData.userMessage) return alert("메시지를 입력해주세요!");

    addMessage(requestData.userMessage || "분석 시작", 'user');
    const typingMsg = addMessage("Gemini가 생각 중입니다...", "bot");

    try {
        const response = await fetch('/api/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });
        const data = await response.json();
        typingMsg.innerHTML = data.analysis.replace(/\n/g, '<br>');
        userMsgInput.value = '';
    } catch (e) {
        typingMsg.innerHTML = "❌ 서버 에러 발생";
    }
}

async function loadHistory(type) {
    const response = await fetch(`/api/history?type=${type}`);
    const historyList = await response.json();
    const chatBody = document.getElementById('chatBody');
    chatBody.innerHTML = '';

    historyList.forEach(item => {
        addMessage(item.userMessage || "사주 분석 요청", 'user');
        addMessage(item.analysisResult, 'bot');
    });
}

function addMessage(text, sender) {
    const chatBody = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.className = `bubble ${sender}`;
    div.innerHTML = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
    return div;
}