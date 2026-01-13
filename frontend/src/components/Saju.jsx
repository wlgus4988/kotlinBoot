import { useState, useEffect, useRef, Fragment } from 'react';
import { useChatHistory } from '../hooks/useChatHistory';

export default function Saju({ onHome }) {
    const { history, sendMessage, loading } = useChatHistory('SAJU');
    const [userMessage, setUserMessage] = useState('');
    const [formData, setFormData] = useState({
        birthDate: '',
        calendar: '양력',
        gender: '여성',
        birthTime: ''
    });
    const chatBodyRef = useRef(null);

    // 메시지 내역이 바뀔 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [history]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    // 메시지 전송 핸들러
    const handleSend = async () => {
        if (!formData.birthDate) return alert("생년월일을 입력해주세요!");

        const currentMsg = userMessage;
        setUserMessage('');

        // ✅ 여기서는 formData와 userMessage를 같이 보냅니다.
        await sendMessage({
            ...formData,
            userMessage: formData.birthDate + " " + currentMsg || formData.birthDate + " 사주 봐줘 !"
        });
    };

    // 엔터키 누르면 바로 전송 (Shift+Enter는 줄바꿈)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-container">
            <header>
                <span className="home-icon" onClick={onHome}>🏠</span>
                🔮 2026 신년 사주 분석
            </header>

            <div className="chat-body" ref={chatBodyRef}>
                {history && history.map((item, i) => (
                    <Fragment key={i}>
                        <div className="bubble user">{item.userMessage}</div>
                        <div className="bubble bot">{item.analysisResult}</div>
                    </Fragment>
                ))}
                {/* {loading && <div className="bubble bot">사주를 분석 중입니다... 🔮</div>} */}
            </div>

            <div className="input-area">
                <div className="form-group">
                    <input type="date" id="birthDate" value={formData.birthDate} onChange={handleInputChange} />
                    <select id="calendar" value={formData.calendar} onChange={handleInputChange}>
                        <option value="양력">양력</option>
                        <option value="음력">음력</option>
                    </select>
                    <select id="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="여성">여성</option>
                        <option value="남성">남성</option>
                    </select>
                    <input type="time" id="birthTime" value={formData.birthTime} onChange={handleInputChange} />
                </div>
                <textarea
                    placeholder="추가로 궁금한 점을 적어주세요."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                ></textarea>
                <button onClick={handleSend} disabled={loading}>
                    {loading ? '분석 중...' : '분석하기'}
                </button>
            </div>
        </div>
    );
}