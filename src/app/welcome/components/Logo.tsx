import styles from './Logo.module.css';

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoIcon}>
        <img 
          src="https://www.figma.com/api/mcp/asset/c2f42767-8af4-4630-a3b1-edeb83b8aa04" 
          alt="ClubAtlas Logo"
          className={styles.logoImage}
        />
      </div>
    </div>
  );
}



