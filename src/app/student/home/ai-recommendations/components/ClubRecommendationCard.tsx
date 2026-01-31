'use client';

import Link from 'next/link';
import styles from './ClubRecommendationCard.module.css';

interface RecommendationReason {
  type: string;
  description: string;
  score_contribution: number;
}

interface ClubRecommendation {
  club_id: string;
  score: number;
  rank: number;
  reasons: RecommendationReason[];
}

interface ClubData {
  id: string;
  name: string;
  description: string;
  tagline?: string;
  categories: string[];
  tags: string[];
  activity_type: string;
}

interface Props {
  recommendation: ClubRecommendation;
  clubData?: ClubData;
}

export default function ClubRecommendationCard({ recommendation, clubData }: Props) {
  // clubData가 없으면 기본 정보만 표시
  const displayName = clubData?.name || `Club ${recommendation.club_id}`;
  const displayDescription = clubData?.description || 'Loading club information...';
  const displayTagline = clubData?.tagline;
  const displayCategories = clubData?.categories || [];
  const displayActivityType = clubData?.activity_type;

  // 추천 점수를 0-100 스케일로 변환 (최대 13.5점 기준)
  const scorePercentage = Math.min(100, Math.round((recommendation.score / 13.5) * 100));

  // 이유 타입별 아이콘 및 색상
  const getReasonStyle = (type: string) => {
    switch (type) {
      case 'category_match':
        return { icon: '🎯', color: '#4A90E2' };
      case 'activity_type_match':
        return { icon: '🏃', color: '#7B68EE' };
      case 'time_match':
        return { icon: '⏰', color: '#50C878' };
      case 'user_behavior':
        return { icon: '👥', color: '#FF6B6B' };
      default:
        return { icon: '✨', color: '#999' };
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.rankBadge}>
          <span className={styles.rankNumber}>#{recommendation.rank}</span>
        </div>
        <div className={styles.scoreContainer}>
          <div className={styles.scoreBar}>
            <div 
              className={styles.scoreBarFill} 
              style={{ width: `${scorePercentage}%` }}
            />
          </div>
          <span className={styles.scoreText}>{scorePercentage}% Match</span>
        </div>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.clubName}>{displayName}</h3>
        {displayTagline && (
          <p className={styles.clubTagline}>{displayTagline}</p>
        )}
        <p className={styles.clubDescription}>{displayDescription}</p>

        {displayCategories.length > 0 && (
          <div className={styles.categoryTags}>
            {displayCategories.slice(0, 3).map((category) => (
              <span key={category} className={styles.categoryTag}>
                {category}
              </span>
            ))}
            {displayActivityType && (
              <span className={styles.activityTypeTag}>{displayActivityType}</span>
            )}
          </div>
        )}

        <div className={styles.reasonsSection}>
          <h4 className={styles.reasonsTitle}>Why we recommend this:</h4>
          <div className={styles.reasonsList}>
            {recommendation.reasons.map((reason, index) => {
              const style = getReasonStyle(reason.type);
              return (
                <div 
                  key={index} 
                  className={styles.reasonItem}
                  style={{ borderLeftColor: style.color }}
                >
                  <span className={styles.reasonIcon}>{style.icon}</span>
                  <span className={styles.reasonText}>{reason.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.cardFooter}>
        <Link 
          href={`/student/clubs/${recommendation.club_id}`}
          className={styles.viewDetailsButton}
        >
          View Club Details
        </Link>
        <button className={styles.subscribeButton}>
          Subscribe
        </button>
      </div>
    </div>
  );
}


