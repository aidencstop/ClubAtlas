'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import styles from './AIRecommendations.module.css';
import ClubRecommendationCard from './components/ClubRecommendationCard';
import { createRecommendationPreferences } from '@/lib/api/users';
import { getRecommendations } from '@/lib/api/recommendations';
import { getClub, Club } from '@/lib/api/clubs';

// 공용 헤더 아이콘 (Student Home과 동일)
const logoIcon = "/images/icons/logo.svg";
const bellIcon = "/images/icons/bell.svg";
const userIcon = "/images/icons/profile.svg";

// AI Recommendations 페이지 전용 아이콘
const aiStarIcon = "/images/icons/ai/star.svg";
const targetIcon = "/images/icons/ai/target.svg";
const clockIcon = "/images/icons/ai/clock.svg";
const boltIcon = "/images/icons/ai/bolt.svg";
const assistantIcon = "/images/icons/ai/assistant.svg";
const aiIcon = "/images/icons/ai/ai-avatar.svg";

// 카테고리 옵션
const CATEGORIES = [
  'Student Leadership and Media',
  'Cultural Affinity Groups',
  'Community Service and Social Justice',
  'Gender Equity and Sexual Health',
  'Mental Wellness',
  'Stem Research and Olympiad',
  'Data Science and Engineering',
  'Finance and Economy',
  'Humanities',
  'Literature, Language, and Philiology',
  'Visual Arts',
  'Performing Arts',
  'Food, Cooking, Cuisine',
  'Sports and Recreations'
];

// 활동 유형 옵션
const ACTIVITY_TYPES = [
  'Online', 'On-Campus', 'Off-Campus', 'Hybrid'
];

// 시간대 옵션 (9AM - 8PM)
const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00', '20:00'
];

type Step = 1 | 2 | 3 | 4;

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

export default function AIRecommendationsPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<ClubRecommendation[]>([]);
  const [clubsData, setClubsData] = useState<{ [key: string]: Club }>({});
  const [error, setError] = useState<string | null>(null);

  const toggleSelection = (item: string, list: string[], setList: (list: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedCategories.length === 0) {
      alert('Please select at least one category');
      return;
    }
    if (currentStep === 2 && selectedActivityTypes.length === 0) {
      alert('Please select at least one activity type');
      return;
    }
    if (currentStep === 3 && selectedTimeSlots.length === 0) {
      alert('Please select at least one time slot');
      return;
    }

    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (!user) {
        setError('You must be logged in to get recommendations.');
        setIsLoading(false);
        return;
      }

      const token = await user.getIdToken();

      // Step 1: 선호도 저장
      const preferencesData = {
        preferred_categories: selectedCategories,
        preferred_activity_types: selectedActivityTypes,
        available_time_slots: selectedTimeSlots
      };

      const savePreferencesResponse = await createRecommendationPreferences(preferencesData, token);

      if (savePreferencesResponse.error) {
        setError(`Failed to save preferences: ${savePreferencesResponse.error}`);
        setIsLoading(false);
        return;
      }

      // Step 2: 추천 받기
      const recommendationsResponse = await getRecommendations({ limit: 10 });

      if (recommendationsResponse.error) {
        setError(`Failed to get recommendations: ${recommendationsResponse.error}`);
        setIsLoading(false);
        return;
      }

      if (recommendationsResponse.data) {
        const recs = recommendationsResponse.data.recommendations || [];
        setRecommendations(recs);
        setCurrentStep(4);

        // Step 3: 각 추천 club의 상세 정보 가져오기
        const clubsDataMap: { [key: string]: Club } = {};
        for (const rec of recs) {
          try {
            const clubResponse = await getClub(rec.club_id);
            if (clubResponse.data && !clubResponse.error) {
              clubsDataMap[rec.club_id] = clubResponse.data;
            }
          } catch (clubError) {
            console.error(`Failed to load club ${rec.club_id}:`, clubError);
          }
        }
        setClubsData(clubsDataMap);
      }
    } catch (error: any) {
      console.error('Error in recommendation flow:', error);
      setError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStepMessage = () => {
    switch (currentStep) {
      case 1:
        return "Great! Let's start by understanding your interests. Which categories of clubs are you interested in? (Select all that apply)";
      case 2:
        return "Perfect! Now, what type of activities do you prefer?";
      case 3:
        return "Almost there! When are you available for club activities?";
      case 4:
        return "Excellent! I'm analyzing your preferences and finding the best club matches for you...";
      default:
        return "";
    }
  };

  const getCurrentSelections = () => {
    switch (currentStep) {
      case 1:
        return { items: CATEGORIES, selected: selectedCategories, setSelected: setSelectedCategories };
      case 2:
        return { items: ACTIVITY_TYPES, selected: selectedActivityTypes, setSelected: setSelectedActivityTypes };
      case 3:
        return { items: TIME_SLOTS, selected: selectedTimeSlots, setSelected: setSelectedTimeSlots };
      default:
        return { items: [], selected: [], setSelected: () => {} };
    }
  };

  const { items, selected, setSelected } = getCurrentSelections();

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link href="/student/home" className={styles.logoButton}>
            <div className={styles.logoIcon}>
              <img src={logoIcon} alt="ClubAtlas" />
            </div>
            <span className={styles.logoText}>ClubAtlas</span>
          </Link>

          <nav className={styles.navigation}>
            <Link href="/student/home" className={styles.navLink}>Home</Link>
            <Link href="/student/home/clubs" className={styles.navLink}>Browse Clubs</Link>
            <Link href="/student/home/calendar" className={styles.navLink}>Calendar</Link>
            <Link href="/student/home/ai-recommendations" className={`${styles.navLink} ${styles.activeNavLink}`}>AI Recommendations</Link>
            <Link href="/student/home/mypage" className={styles.navLink}>My Page</Link>
          </nav>

          <div className={styles.headerActions}>
            <button className={styles.iconButton}>
              <img src={bellIcon} alt="Notifications" />
            </button>
            <button className={styles.userButton}>
              <img src={userIcon} alt="User" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainWrapper}>
        <div className={styles.container}>
          {/* Page Title */}
          <div className={styles.pageTitle}>
            <h1>AI Club Recommendations</h1>
            <p>Get personalized club suggestions based on your interests and schedule</p>
          </div>

          {/* AI Recommendations Banner */}
          <div className={styles.aiBanner}>
            <div className={styles.aiBannerContent}>
              <div className={styles.aiBannerHeader}>
                <div className={styles.aiIconLarge}>
                  <img src={aiStarIcon} alt="AI" />
                </div>
                <div className={styles.aiBannerText}>
                  <h2>AI Club Recommendations</h2>
                  <p>Powered by intelligent matching algorithms</p>
                </div>
              </div>

              <div className={styles.featuresGrid}>
                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <img src={targetIcon} alt="Personalized" />
                  </div>
                  <h3>Personalized Matches</h3>
                  <p>Based on your interests</p>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <img src={clockIcon} alt="Schedule" />
                  </div>
                  <h3>Schedule-Friendly</h3>
                  <p>Fits your availability</p>
                </div>

                <div className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <img src={boltIcon} alt="Instant" />
                  </div>
                  <h3>Instant Results</h3>
                  <p>Real-time recommendations</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Chat Interface */}
          <div className={styles.chatInterface}>
            {/* Chat Header */}
            <div className={styles.chatHeader}>
              <div className={styles.chatHeaderContent}>
                <div className={styles.assistantIcon}>
                  <img src={assistantIcon} alt="Assistant" />
                </div>
                <div className={styles.assistantInfo}>
                  <h3>ClubAtlas AI Assistant</h3>
                  <div className={styles.statusIndicator}>
                    <span className={styles.statusDot}></span>
                    <span>Online • Ready to help</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className={styles.chatMessages}>
              {/* Welcome Message */}
              <div className={styles.messageGroup}>
                <div className={styles.aiAvatar}>
                  <img src={aiIcon} alt="AI" />
                </div>
                <div className={styles.aiMessage}>
                  <p>Hi! I'm your AI club advisor. I'll help you discover clubs that perfectly match your interests, schedule, and goals.</p>
                  <p>&nbsp;</p>
                  <p>Let's get started! I'll ask you a few quick questions to understand your preferences.</p>
                </div>
              </div>

              {/* Step Progress Indicator */}
              {currentStep < 4 && (
                <div className={styles.progressIndicator}>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: `${(currentStep / 3) * 100}%` }}
                    />
                  </div>
                  <p className={styles.progressText}>Step {currentStep} of 3</p>
                </div>
              )}

              {/* Current Step Message */}
              <div className={styles.messageGroup}>
                <div className={styles.aiAvatar}>
                  <img src={aiIcon} alt="AI" />
                </div>
                <div className={styles.aiMessageLarge}>
                  <p>{getStepMessage()}</p>
                  
                  {/* Selection Buttons Grid */}
                  {currentStep < 4 && (
                    <div className={styles.selectionGrid}>
                      {items.map((item) => (
                        <button
                          key={item}
                          onClick={() => toggleSelection(item, selected, setSelected)}
                          className={`${styles.selectionButton} ${
                            selected.includes(item) ? styles.selectionButtonActive : ''
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Selected Items Display */}
                  {currentStep < 4 && selected.length > 0 && (
                    <div className={styles.selectedItemsDisplay}>
                      <p className={styles.selectedLabel}>Selected ({selected.length}):</p>
                      <div className={styles.selectedTags}>
                        {selected.map((item) => (
                          <span key={item} className={styles.selectedTag}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next/Submit Button */}
                  {currentStep < 4 && (
                    <button
                      onClick={handleNext}
                      disabled={isLoading}
                      className={styles.nextButton}
                    >
                      {isLoading ? 'Processing...' : (currentStep === 3 ? 'Get Recommendations' : 'Next')}
                    </button>
                  )}

                  {/* Recommendations Results (Step 4) */}
                  {currentStep === 4 && !error && recommendations.length > 0 && (
                    <div className={styles.resultsContainer}>
                      <div className={styles.resultsHeader}>
                        <div className={styles.checkmark}>✓</div>
                        <h3>Found {recommendations.length} Perfect Matches for You!</h3>
                        <p>Based on your interests, activity preferences, and schedule</p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {currentStep === 4 && error && (
                    <div className={styles.errorMessage}>
                      <p>{error}</p>
                      <button 
                        onClick={() => setCurrentStep(1)}
                        className={styles.retryButton}
                      >
                        Try Again
                      </button>
                    </div>
                  )}

                  {/* No Results Message */}
                  {currentStep === 4 && !error && recommendations.length === 0 && !isLoading && (
                    <div className={styles.noResultsMessage}>
                      <p>No recommendations found. Try adjusting your preferences.</p>
                      <button 
                        onClick={() => setCurrentStep(1)}
                        className={styles.retryButton}
                      >
                        Start Over
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations Results Grid */}
          {currentStep === 4 && !error && recommendations.length > 0 && (
            <div className={styles.recommendationsGrid}>
              {recommendations.map((recommendation) => (
                <ClubRecommendationCard
                  key={recommendation.club_id}
                  recommendation={recommendation}
                  clubData={clubsData[recommendation.club_id]}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p>© 2026 Concord Academy ClubAtlas. Connecting students with their perfect campus communities.</p>
        </div>
      </footer>
    </div>
  );
}
