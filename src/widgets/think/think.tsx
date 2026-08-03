import styles from './think.module.scss';

const ITEMS = [
  {
    title: 'Сначала понимаю ограничения',
    body: 'Прежде чем выбирать решение, определяю требования, ограничения и то, что нельзя менять.',
  },
  {
    title: 'Простота — по умолчанию',
    body: 'Выбираю самое простое решение и усложняю его только тогда, когда это действительно необходимо.',
  },
  {
    title: 'Думаю о развитии проекта',
    body: 'Предпочитаю решения, которые легко поддерживать, расширять и при необходимости изменить.',
  },
];

export function Think() {
  return (
    <section id="think" className={styles.section}>
      <div className={styles.intro}>
        <h6 className={styles.kicker}>Как я думаю</h6>
        <h2 className={styles.heading}>
          <span className={styles.gradientText}>Инженерный подход</span>
          <span className={styles.commaThin}>,</span> а не просто реализация
        </h2>
        <p className={styles.lead}>
          Каждое техническое решение принимаю с учетом требований продукта, ограничений проекта и
          долгосрочной поддержки кода.
        </p>
      </div>
      <div className={styles.items}>
        {ITEMS.map((item) => (
          <div key={item.title} className={styles.item}>
            <div className={styles.itemIcon} />
            <div>
              <div className={styles.itemTitle}>{item.title}</div>
              <div className={styles.itemBody}>{item.body}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
