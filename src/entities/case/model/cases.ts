export interface Case {
  slug: string;
  index: string;
  role: string;
  period: string;
  title: string;
  goal: string;
  result: string;
  details: string;
  tags: string[];
  images: string[];
}

function imagesFor(slug: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `/images/cases/${slug}/${String(i + 1).padStart(2, '0')}.png`,
  );
}

export const CASES: Case[] = [
  {
    slug: 'auction',
    index: '01',
    role: 'Fullstack Developer',
    period: 'Июль 2023 — настоящее время',
    title: 'Экосистема Альфа — маркетплейс объявлений и аукционов',
    goal: 'каталог, фильтрация, отзывы, личный кабинет, real-time чат — в кросс-функциональной Agile-команде',
    result: 'Устранила повторные сетевые запросы при навигации между вкладками — с 3-4 до 0',
    details:
      'Спроектировала слой данных так, чтобы переключение между вкладками каталога не порождало лишних сетевых вызовов.',
    tags: ['Next.js', 'React', 'TypeScript', 'Redux Toolkit', 'RTK Query'],
    images: imagesFor('auction', 12),
  },
  {
    slug: 'hotel',
    index: '02',
    role: 'Web-разработчик',
    period: 'Сентябрь 2021 — Май 2023',
    title: 'myHotel — система управления гостиницей',
    goal: 'веб-приложение для управления гостиничным бизнесом: бронирование, номера, пользователи и заказы',
    result: 'Переиспользуемые UI-компоненты и стабильный REST-слой между React и Laravel',
    details:
      'Разрабатывала frontend на React, реализовывала сценарии бронирования и управления заказами, интегрировала его с Laravel-бэкендом через REST API, обрабатывала состояния загрузки и ошибок, работала с PostgreSQL и Docker на уровне локальной разработки, участвовала в обсуждении технических решений с backend-командой и рефакторила компоненты.',
    tags: ['React', 'REST API', 'Laravel', 'PostgreSQL', 'Docker'],
    images: imagesFor('hotel', 3),
  },
  {
    slug: 'questionnaire',
    index: '03',
    role: 'Fullstack Developer Intern',
    period: 'Сентябрь — Декабрь 2023',
    title: 'Questionnaire App — Itransition',
    goal: 'конструктор опросов с ролями пользователей',
    result: 'Полный цикл за 4 месяца: интерфейс → API → роли доступа',
    details:
      'Реализовала drag-and-drop конструктор форм на frontend и REST API на Express.js на backend — от интерфейса до ролей доступа и загрузки изображений.',
    tags: ['React', 'Express.js', 'MySQL', 'Cloudinary'],
    images: imagesFor('questionnaire', 7),
  },
];
