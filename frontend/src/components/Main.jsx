export default function Main({ onSelect }) {
    return (
        <div className="chat-container">
            <header>지현 AI 어드바이저</header>
            <div className="menu-body">
                <div className="service-card" onClick={() => onSelect('CHAT')}>
                    <div className="icon">💬</div>
                    <h2>일반 채팅</h2>
                    <p>AI 비서와 대화하기</p>
                </div>
                <div className="service-card" onClick={() => onSelect('SAJU')}>
                    <div className="icon">🔮</div>
                    <h2>2026 사주</h2>
                    <p>나의 신년 운세 보기</p>
                </div>
            </div>
        </div>
    );
}