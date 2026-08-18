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

export const CASES_EN: Case[] = [
  {
    slug: 'auction',
    index: '01',
    role: 'Fullstack Developer',
    period: 'July 2023 — present',
    title: 'Alpha Ecosystem — a marketplace for listings and auctions',
    goal: 'catalog, filtering, reviews, personal account, real-time chat — in a cross-functional Agile team',
    result: 'Eliminated repeat network requests when navigating between tabs — from 3-4 down to 0',
    details:
      'Designed the data layer so that switching between catalog tabs no longer triggers redundant network calls.',
    tags: ['Next.js', 'React', 'TypeScript', 'Redux Toolkit', 'RTK Query'],
    images: imagesFor('auction', 12),
  },
  {
    slug: 'hotel',
    index: '02',
    role: 'Web Developer',
    period: 'September 2021 — May 2023',
    title: 'myHotel — a hotel management system',
    goal: 'a web app for running a hotel business: bookings, rooms, users, and orders',
    result: 'Reusable UI components and a stable REST layer between React and Laravel',
    details:
      'Built the frontend in React, implemented booking and order management flows, integrated it with a Laravel backend via REST API, handled loading and error states, worked with PostgreSQL and Docker at the local development level, took part in technical discussions with the backend team, and refactored components.',
    tags: ['React', 'REST API', 'Laravel', 'PostgreSQL', 'Docker'],
    images: imagesFor('hotel', 3),
  },
  {
    slug: 'questionnaire',
    index: '03',
    role: 'Fullstack Developer Intern',
    period: 'September — December 2023',
    title: 'Questionnaire App — Itransition',
    goal: 'a survey builder with user roles',
    result: 'Full cycle in 4 months: UI → API → access roles',
    details:
      'Built a drag-and-drop form builder on the frontend and a REST API on Express.js on the backend — from the UI down to access roles and image uploads.',
    tags: ['React', 'Express.js', 'MySQL', 'Cloudinary'],
    images: imagesFor('questionnaire', 7),
  },
];
