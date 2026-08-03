import styles from './about-value.module.scss';

interface Card {
  title: string;
  body: string;
  rotate?: number;
}

const CARDS: Card[] = [
  {
    title: 'Убираю лишние запросы',
    body: 'Перевела главную ленту с SSR на RTK Query — повторные запросы сократились с 3–4 до 0 благодаря клиентскому кэшированию.',
    rotate: -4,
  },
  {
    title: 'Собираю сложные модули',
    body: 'Создала модуль отзывов с бесконечной пагинацией, оптимистическими обновлениями и inline-редактированием без перехода на отдельную страницу.',
  },
  {
    title: 'Ускоряю загрузку',
    body: 'Использую SSR, lazy loading и code splitting для ускорения первой загрузки и уменьшения объёма JavaScript.',
    rotate: 4,
  },
  {
    title: 'Использую AI как инженерный инструмент',
    body: 'Интегрировала Cursor, Codex и MCP в процесс разработки: исследование → проектирование → реализация → ревью кода.',
  },
  {
    title: 'Проектирую архитектуру приложений',
    body: 'Разделяю ответственность между Server и Client Components, использую SSR и гидратацию в Next.js App Router.',
    rotate: -3,
  },
  {
    title: 'Синхронизирую состояние',
    body: 'Связала Redux, URL и API — фильтры каталога сохраняются при навигации и обновлении страницы.',
  },
  {
    title: 'Покрываю код тестами',
    body: 'Использую Vitest для проверки компонентов и бизнес-логики, снижая риск регрессий.',
    rotate: 3,
  },
];

export function AboutValue() {
  return (
    <section className={styles.section}>
      <h6 className={styles.kicker}>Обо мне</h6>
      <h2 className={styles.heading}>
        Пишу код<span className={styles.commaThin}>,</span> который приносит пользу пользователям и
        результат продукту
      </h2>
      <div className={styles.grid}>
        {CARDS.map((card) => (
          <div key={card.title} className={styles.card}>
            <div
              className={styles.icon}
              style={card.rotate ? { transform: `rotate(${card.rotate}deg)` } : undefined}
            />
            <div className={styles.cardTitle}>{card.title}</div>
            <p className={styles.cardBody}>{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
