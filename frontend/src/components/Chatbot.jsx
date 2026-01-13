import { useState, useEffect, useRef, Fragment } from 'react';
import { useChatHistory } from '../hooks/useChatHistory';

export default function Chatbot({ onHome }) {
    
    // 'CHAT' 타입으로 데이터와 전송 함수 가져오기
    const { history, sendMessage, loading } = useChatHistory('CHAT');
    const [userMessage, setUserMessage] = useState('');
    const chatBodyRef = useRef(null);

    // 메시지 내역이 바뀔 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [history]);

    // 메시지 전송 핸들러
    const handleSend = async () => {
        const messageToSend = userMessage.trim();
        if (!messageToSend) return;

        setUserMessage(''); // 입력창 즉시 비우기

        // ✅ formData 없이 userMessage만 보냅니다.
        await sendMessage({
            userMessage: messageToSend
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
                <span className="home-icon" onClick={onHome} title="홈으로 가기">🏠</span>
                💬 AI 비서 채팅
            </header>

            {/* ref를 연결하여 스크롤 위치를 제어합니다 */}
            <div className="chat-body" ref={chatBodyRef}>
                {history && history.map((item, i) => (
                    /* Fragment를 사용해 중간 태그 없이 렌더링 -> CSS align-self 정상 작동! */
                    <Fragment key={i}>
                        <div className="bubble user">{item.userMessage}</div>
                        <div className="bubble bot">{item.analysisResult}</div>
                    </Fragment>
                ))}
                {/* {loading && <div className="bubble bot">답변을 생각 중입니다... 💭</div>} */}
            </div>

            <div className="input-area">
                <textarea
                    placeholder="무엇이든 물어보세요!"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                ></textarea>
                <button onClick={handleSend} disabled={loading || !userMessage.trim()}>
                    {loading ? '...' : '전송'}
                </button>
            </div>
        </div>
    );
}