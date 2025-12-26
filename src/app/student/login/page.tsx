import styles from './StudentLogin.module.css';
import Logo from '../../welcome/components/Logo';
import InfoPanel from './components/InfoPanel';
import LoginForm from './components/LoginForm';
import Link from 'next/link';

export default function StudentLoginPage() {
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

        {/* 중앙 섹션: 로그인 카드 */}
        <div className={styles.loginCard}>
          <InfoPanel />
          <LoginForm />
        </div>

        {/* 푸터 */}
        <p className={styles.footer}>
          Connecting students with their perfect campus communities
        </p>
      </div>
    </div>
  );
}



