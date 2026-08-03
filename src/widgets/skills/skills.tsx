import styles from './skills.module.scss';

const CATEGORIES: Array<{ label: string; tags: string[]; variant: 'accent' | 'accent2' | 'neutral' }> = [
  {
    label: 'Core',
    variant: 'accent',
    tags: ['React', 'TypeScript', 'Next.js', 'JavaScript (ES6+)', 'HTML5'],
  },
  {
    label: 'State & Data',
    variant: 'accent2',
    tags: [
      'Redux Toolkit',
      'RTK Query',
      'REST API',
      'SSR / Hydration',
      'client-side caching',
      'React Hook Form',
      'Zod',
    ],
  },
  {
    label: 'Тесты и качество',
    variant: 'neutral',
    tags: ['Vitest', 'Storybook', 'Git', 'CI/CD', 'Feature-Sliced Design'],
  },
  {
    label: 'Backend-смежное',
    variant: 'neutral',
    tags: ['Node.js', 'Express', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'Docker', 'Cloudinary'],
  },
];

export function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <h6 className={styles.kicker}>Навыки</h6>
      <h2 className={styles.heading}>
        <span className={styles.gradientText}>Инструменты</span>
        <span className={styles.commaThin}>,</span> которыми решаю задачи каждый день
      </h2>
      <div className={styles.rows}>
        {CATEGORIES.map((category) => (
          <div key={category.label} className={styles.row}>
            <div className={styles.label}>{category.label}</div>
            <div className={styles.tags}>
              {category.tags.map((tag) => (
                <span key={tag} className={`${styles.tag} ${styles[category.variant]}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
        <div className={styles.row}>
          <div className={styles.alsoLabel}>Также работала с:</div>
          <div className={styles.tags}>
            <span className={`${styles.tag} ${styles.neutral} ${styles.small}`}>Vue.js</span>
            <span className={`${styles.tag} ${styles.neutral} ${styles.small}`}>Material UI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
