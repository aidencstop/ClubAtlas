import styles from './Logo.module.css';

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoIcon}>
        <img 
          src="https://www.figma.com/api/mcp/asset/e7d1fc6a-5e14-4c8e-9c03-c97e1f85a67a" 
          alt="ClubAtlas Logo"
          className={styles.logoImage}
        />
      </div>
    </div>
  );
}










