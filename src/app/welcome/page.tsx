import styles from './Welcome.module.css';
import Logo from './components/Logo';
import AccessCard from './components/AccessCard';
import FeatureCard from './components/FeatureCard';

export default function WelcomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        {/* 배경 블러 효과 원형 장식 */}
        <div className={styles.blurCircle1}></div>
        <div className={styles.blurCircle2}></div>
        <div className={styles.blurCircle3}></div>
      </div>
      
      <div className={styles.content}>
        {/* 상단 섹션: 로고 + 헤더 */}
        <div className={styles.headerSection}>
          <Logo />
          <h1 className={styles.mainTitle}>ClubAtlas</h1>
          <p className={styles.subtitle}>
            Your centralized hub for campus club discovery, events, and personalized recommendations
          </p>
        </div>

        {/* 중앙 섹션: 접근 카드 */}
        <div className={styles.accessCards}>
          <AccessCard
            type="student"
            iconSrc="https://www.figma.com/api/mcp/asset/1a1036c9-60ad-4435-bd64-718b4bf7862b"
            title="Student Access"
            description="Browse clubs, discover events, get AI-powered recommendations, and manage your subscriptions"
            buttonText="Enter as Student"
            buttonHref="/student/login"
          />
          <AccessCard
            type="admin"
            iconSrc="https://www.figma.com/api/mcp/asset/ef78bc82-25ea-4998-817a-f8e19ca4e74a"
            title="Admin Access"
            description="Club leaders: Manage your club profile, events, announcements, and engage with subscribers"
            buttonText="Admin Login"
            buttonHref="/admin/login"
          />
        </div>

        {/* 하단 섹션: Platform Features */}
        <div className={styles.featuresSection}>
          <h2 className={styles.featuresTitle}>Platform Features</h2>
          <div className={styles.featuresGrid}>
            <FeatureCard
              iconSrc="https://www.figma.com/api/mcp/asset/e340a1af-5577-45e3-8e4b-9af678348e12"
              title="Club Discovery"
              description="Browse and search from all campus clubs with smart filters"
            />
            <FeatureCard
              iconSrc="https://www.figma.com/api/mcp/asset/e716709a-d34f-4326-9e83-1fba7611afd4"
              title="Event Calendar"
              description="Track meetings and activities in one unified calendar"
            />
            <FeatureCard
              iconSrc="https://www.figma.com/api/mcp/asset/59a88fd4-c704-48d4-bc84-9435d427da82"
              title="AI Recommendations"
              description="Get personalized club suggestions based on your interests"
            />
          </div>
        </div>

        {/* 푸터 */}
        <p className={styles.footer}>
          Connecting students with their perfect campus communities
        </p>
      </div>
    </div>
  );
}

