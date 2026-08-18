# Ask My AI: переход на настоящую LLM — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Заменить клиентский keyword-matcher секции «Ask My AI» на настоящий LLM-чат (Google Gemini через Vercel AI SDK), отвечающий на открытые вопросы о Светлане строго на основе предоставленных фактов, со стримингом и rate limiting.

**Architecture:** Новый Route Handler `src/app/api/chat/route.ts` вызывает Gemini через Vercel AI SDK (`streamText`), собирая system prompt из новой entity `entities/profile` (RU-only факты) и переиспользуемых `entities/case`/`entities/skill`/`entities/think`. Клиент (`features/ask-ai-chat`) переходит на `useChat` из `@ai-sdk/react`. Upstash Redis защищает эндпоинт rate limiting'ом.

**Tech Stack:** `ai`, `@ai-sdk/google`, `@ai-sdk/react` (Vercel AI SDK v6), `@upstash/ratelimit`, `@upstash/redis`.

**Spec:** `docs/superpowers/specs/2026-08-18-ai-chat-real-llm-design.md`

## Global Constraints

- Провайдер: Google Gemini, модель `gemini-2.5-flash-lite` (бесплатный тариф).
- Контент профиля — только на русском; языковую версию ответа задаёт инструкция в system prompt, не ручной перевод.
- UI-строки (кнопки, плейсхолдер, приветствие, fallback на ошибку) — жёстко закодированный `COPY = { ru, en }`, как во всех остальных секциях сайта. Модель переводит только свои ответы, не интерфейс.
- Rate limit: 10 запросов на IP за 10 минут (Upstash sliding window).
- Максимальная длина последнего сообщения пользователя: 500 символов — иначе 400 без вызова модели.
- Без RAG — весь контент (профиль + кейсы + стек + подход) целиком помещается в system prompt.
- Guardrail в system prompt: если фактов недостаточно — честно предложить уточнить у Светланы лично, не выдумывать.
- Список `boundaries` в `entities/profile` — дословный, не смягчать и не сокращать формулировки.
- Переменные окружения: `GOOGLE_GENERATIVE_AI_API_KEY` (уже должна быть в `.env.local` — сверить имя), `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` (ещё не заведены — блокирует только реальный прогон, не написание кода).
- Тесты не делают реальных сетевых вызовов — `streamText`, `google`, `Ratelimit`, `Redis`, `useChat` мокаются.
- Не добавлять зависимостей сверх перечисленных в Tech Stack.

---

## Task 1: Установить зависимости и сверить env-переменную

**Files:**
- Modify: `package.json`, `package-lock.json` (через `npm install`)

**Interfaces:**
- Produces: пакеты `ai`, `@ai-sdk/google`, `@ai-sdk/react`, `@upstash/ratelimit`, `@upstash/redis` доступны для импорта во всех последующих задачах.

- [ ] **Step 1: Установить зависимости**

```bash
npm install ai @ai-sdk/google @ai-sdk/react @upstash/ratelimit @upstash/redis
```

- [ ] **Step 2: Сверить имя переменной в `.env.local` (без чтения значения)**

```bash
grep -o '^[A-Z_]*=' .env.local
```

Ожидается строка `GOOGLE_GENERATIVE_AI_API_KEY=` — именно это имя по умолчанию читает `@ai-sdk/google`. Если ключ сохранён под другим именем — переименовать переменную в `.env.local` (не трогая само значение).

- [ ] **Step 3: Убедиться, что typecheck не сломался**

Run: `npm run typecheck`
Expected: PASS (новые пакеты установлены, но пока нигде не импортированы — изменений в коде нет)

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add Vercel AI SDK and Upstash dependencies for real AI chat"
```

---

## Task 2: Вынести данные стека в `entities/skill`

**Files:**
- Create: `src/entities/skill/model/skills.ts`
- Create: `src/entities/skill/model/skills.test.ts`
- Create: `src/entities/skill/index.ts`
- Modify: `src/widgets/skills/skills.tsx`

**Interfaces:**
- Produces: `SkillCategory` interface, `SKILL_CATEGORIES: Record<Lang, SkillCategory[]>` — потребляется Task 5 (system prompt) и `src/widgets/skills/skills.tsx`.

- [ ] **Step 1: Создать `src/entities/skill/model/skills.ts`**

```ts
import type { Lang } from '@/shared/lib/language';

export interface SkillCategory {
  label: string;
  tags: string[];
  variant: 'accent' | 'accent2' | 'neutral';
}

export const SKILL_CATEGORIES: Record<Lang, SkillCategory[]> = {
  ru: [
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
      tags: [
        'Node.js',
        'Express',
        'PHP',
        'Laravel',
        'PostgreSQL',
        'MySQL',
        'Docker',
        'Cloudinary',
      ],
    },
  ],
  en: [
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
      label: 'Testing & Quality',
      variant: 'neutral',
      tags: ['Vitest', 'Storybook', 'Git', 'CI/CD', 'Feature-Sliced Design'],
    },
    {
      label: 'Backend-adjacent',
      variant: 'neutral',
      tags: [
        'Node.js',
        'Express',
        'PHP',
        'Laravel',
        'PostgreSQL',
        'MySQL',
        'Docker',
        'Cloudinary',
      ],
    },
  ],
};
```

- [ ] **Step 2: Написать тест `src/entities/skill/model/skills.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { SKILL_CATEGORIES } from './skills';

describe('SKILL_CATEGORIES', () => {
  it('has the same 4 category labels in ru and en, in the same order', () => {
    expect(SKILL_CATEGORIES.ru.map((c) => c.label)).toEqual([
      'Core',
      'State & Data',
      'Тесты и качество',
      'Backend-смежное',
    ]);
    expect(SKILL_CATEGORIES.en.map((c) => c.label)).toEqual([
      'Core',
      'State & Data',
      'Testing & Quality',
      'Backend-adjacent',
    ]);
  });

  it('lists React under Core and Docker under Backend for both languages', () => {
    for (const lang of ['ru', 'en'] as const) {
      const [core, , , backend] = SKILL_CATEGORIES[lang];
      expect(core.tags).toContain('React');
      expect(backend.tags).toContain('Docker');
    }
  });
});
```

- [ ] **Step 3: Запустить тест — убедиться, что проходит**

Run: `npx vitest run src/entities/skill`
Expected: PASS (2 теста)

- [ ] **Step 4: Создать `src/entities/skill/index.ts`**

```ts
export type { SkillCategory } from './model/skills';
export { SKILL_CATEGORIES } from './model/skills';
```

- [ ] **Step 5: Переключить `src/widgets/skills/skills.tsx` на новую entity**

В файле `src/widgets/skills/skills.tsx`:

Добавить импорт:
```ts
import { SKILL_CATEGORIES } from '@/entities/skill';
```

Удалить локальный `interface Category { ... }` (теперь `SkillCategory` живёт в entity, виджету он не нужен как публичный тип).

В объекте `COPY` убрать поле `categories` из обоих `ru`/`en` (и убрать `satisfies Category[]`), оставив только `kicker`, `headingStart`, `headingEnd`, `alsoLabel`.

В JSX заменить:
```tsx
{copy.categories.map((category) => (
```
на:
```tsx
{SKILL_CATEGORIES[lang].map((category) => (
```

- [ ] **Step 6: Прогнать существующие тесты виджета — убедиться, что визуальное поведение не изменилось**

Run: `npx vitest run src/widgets/skills`
Expected: PASS (все прежние тесты, включая перевод RU→EN, проходят без изменений в тестовом файле)

- [ ] **Step 7: Typecheck и lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/entities/skill src/widgets/skills/skills.tsx
git commit -m "refactor: extract skill categories into entities/skill for reuse in AI chat context"
```

---

## Task 3: Вынести данные подхода к работе в `entities/think`

**Files:**
- Create: `src/entities/think/model/think-principles.ts`
- Create: `src/entities/think/model/think-principles.test.ts`
- Create: `src/entities/think/index.ts`
- Modify: `src/widgets/think/think.tsx`

**Interfaces:**
- Produces: `ThinkPrinciple` interface, `THINK_PRINCIPLES: Record<Lang, ThinkPrinciple[]>` — потребляется Task 5 и `src/widgets/think/think.tsx`.

- [ ] **Step 1: Создать `src/entities/think/model/think-principles.ts`**

```ts
import type { Lang } from '@/shared/lib/language';

export interface ThinkPrinciple {
  title: string;
  body: string;
}

export const THINK_PRINCIPLES: Record<Lang, ThinkPrinciple[]> = {
  ru: [
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
  ],
  en: [
    {
      title: 'I understand the constraints first',
      body: "Before picking a solution, I define the requirements, constraints, and what can't be changed.",
    },
    {
      title: 'Simplicity by default',
      body: "I choose the simplest solution and only add complexity when it's truly necessary.",
    },
    {
      title: "I think about the project's growth",
      body: 'I prefer solutions that are easy to maintain, extend, and change when needed.',
    },
  ],
};
```

- [ ] **Step 2: Написать тест `src/entities/think/model/think-principles.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { THINK_PRINCIPLES } from './think-principles';

describe('THINK_PRINCIPLES', () => {
  it('has 3 principles in both languages', () => {
    expect(THINK_PRINCIPLES.ru).toHaveLength(3);
    expect(THINK_PRINCIPLES.en).toHaveLength(3);
  });

  it('has the expected RU titles in order', () => {
    expect(THINK_PRINCIPLES.ru.map((p) => p.title)).toEqual([
      'Сначала понимаю ограничения',
      'Простота — по умолчанию',
      'Думаю о развитии проекта',
    ]);
  });
});
```

- [ ] **Step 3: Запустить тест — убедиться, что проходит**

Run: `npx vitest run src/entities/think`
Expected: PASS (2 теста)

- [ ] **Step 4: Создать `src/entities/think/index.ts`**

```ts
export type { ThinkPrinciple } from './model/think-principles';
export { THINK_PRINCIPLES } from './model/think-principles';
```

- [ ] **Step 5: Переключить `src/widgets/think/think.tsx` на новую entity**

Добавить импорт:
```ts
import { THINK_PRINCIPLES } from '@/entities/think';
```

Удалить локальный `interface ItemCopy { ... }` (переехал в entity как `ThinkPrinciple`).

В объекте `COPY` убрать поле `items` из обоих `ru`/`en` (и `satisfies ItemCopy[]`), оставив `kicker`, `headingStart`, `headingEnd`, `lead`.

В JSX внутри `ITEM_META.map((meta, i) => { const item = copy.items[i]; ...` заменить `copy.items[i]` на `THINK_PRINCIPLES[lang][i]`.

- [ ] **Step 6: Прогнать существующие тесты виджета**

Run: `npx vitest run src/widgets/think`
Expected: PASS

- [ ] **Step 7: Typecheck и lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/entities/think src/widgets/think/think.tsx
git commit -m "refactor: extract think principles into entities/think for reuse in AI chat context"
```

---

## Task 4: Создать `entities/profile`

**Files:**
- Create: `src/entities/profile/model/profile.ts`
- Create: `src/entities/profile/model/profile.test.ts`
- Create: `src/entities/profile/index.ts`

**Interfaces:**
- Produces: `Profile` interface, `PROFILE: Profile` — потребляется Task 5 (system prompt).

- [ ] **Step 1: Создать `src/entities/profile/model/profile.ts`**

```ts
export interface Profile {
  career: string;
  experience: string;
  status: string;
  workFormat: string;
  preferences: string;
  strengths: string;
  currentlyLearning: string;
  english: string;
  teamwork: string;
  agile: string;
  documents: string;
  personal: string;
  boundaries: string[];
}

export const PROFILE: Profile = {
  career:
    'Первое образование — техническое, но не IT: окончила Южный федеральный университет по направлению, связанному с нанотехнологиями. Начинала в инженерной сфере, связанной с полупроводниковыми технологиями, затем осознанно сменила направление на разработку — хотелось более динамичной сферы и постоянного развития. Frontend изучала через профильное обучение веб-разработке в GeekBrains (индивидуальные и командные проекты, Scrum), затем прошла стажировку в Itransition, где работала над полноценным приложением и взаимодействовала с backend. Основное направление — frontend, но есть и опыт backend-разработки на Express, MySQL/Sequelize.',
  experience:
    'Текущий коммерческий опыт — разработка маркетплейс-платформы объявлений и аукционов: Next.js, React, TypeScript, Redux Toolkit/RTK Query. Проект включает каталог, фильтрацию, объявления и аукционы, личный кабинет, избранное, рейтинги и отзывы, real-time чат. Работает в команде с frontend- и backend-разработчиками, дизайнерами и продуктом, участвует в обсуждении API, архитектурных решений и code review. До этого — стажировка в Itransition (Questionnaire App: React-фронтенд, интеграция с REST API, роли и права доступа, загрузка изображений, drag-and-drop конструктор форм; также backend на Express/MySQL/Sequelize). Учебные и командные проекты в GeekBrains были до Itransition — это учебный, не коммерческий опыт.',
  status:
    'Активно ищет работу. Портфолио сделано именно для поиска следующей позиции, а не "на всякий случай". Рассматривает предложения, хочет перейти в команду, где сможет расти как frontend-разработчик и работать над полноценным продуктом.',
  workFormat:
    'Приоритет — удалённая работа. Другие форматы рассматривает индивидуально. Текущая локация — Тбилиси. Конкретные города для возможного переезда пока не определены — не называть их.',
  preferences:
    'Ищет позицию Frontend Developer, прежде всего на React/Next.js/TypeScript. Важнее не размер компании, а команда и качество разработки — интересны продуктовые задачи, где frontend существенная часть продукта, а не только вёрстка готовых страниц. Хочет работать рядом с более опытными разработчиками, участвовать в обсуждении архитектуры и постепенно брать более сложные технические задачи. Нет жёсткого ограничения "только стартап" или "только крупная компания".',
  strengths:
    'Хорошо погружается в существующий проект и чужой код; умеет разбираться в сложной frontend-логике; сильна в React, Next.js, TypeScript и Redux Toolkit/RTK Query; понимает взаимодействие frontend и backend и умеет обсуждать API с backend-разработчиками; внимательна к состояниям интерфейса, ошибкам, кешированию и пользовательским сценариям; не ограничивается выполнением задачи "по макету" — старается понимать, зачем нужна функция и как она должна работать целиком. Из конкретных задач в текущем проекте: миграция части приложения с Server Actions на RTK Query, работа с кешированием и invalidation, синхронизация фильтров Redux ↔ URL ↔ API, SSR/hydration, оптимистичные обновления, real-time чат, модуль рейтингов и отзывов.',
  currentlyLearning:
    'Продолжает углублять знания frontend-архитектуры, Next.js, производительности, работы с состоянием и устройства web-приложений в целом.',
  english:
    'Upper-Intermediate. Регулярно занимается английским с преподавателем, может читать техническую документацию и работать с англоязычными материалами, готова использовать английский в работе. Не Fluent и не Advanced.',
  teamwork:
    'Есть опыт code review — участвует в ревью кода и обсуждении технических и архитектурных решений внутри команды, тесно взаимодействует с другими frontend- и backend-разработчиками. Полноценного опыта менторства junior-разработчиков и систематического pair programming не было — не заявлять такой опыт.',
  agile:
    'Есть опыт работы в Agile/Scrum-команде — начинала знакомство с этим форматом ещё на командных проектах в обучении, сейчас использует его в реальной командной разработке. Относится к формату нормально: нравится понятное разделение задач, обсуждение требований в команде и синхронизация с backend, дизайном и продуктом. Методология не самоцель — важнее, чтобы процессы помогали команде, а не создавали лишнюю бюрократию.',
  documents:
    'Диплом — Южный федеральный университет, направление связано с нанотехнологиями. Также проходила профессиональное обучение веб/frontend-разработке в GeekBrains и стажировку в Itransition. В разделе "Документы" на сайте также размещён сертификат от Itransition — это "Certificate of Participation" за бесплатное обучение "Commercial Software Development — JavaScript" (дистанционно, 7 ноября 2024, подписан Павлом Лебедевым, Chief Knowledge Officer). На самом документе явно указано "Not a legal document" — это подтверждение участия в обучении, а не формальная профессиональная сертификация.',
  personal:
    'Пришла в разработку после другого технического образования, осознанно сменив профессиональное направление — не боится начинать сложные вещи с нуля и много учиться. Интересно разбираться, как технологии работают изнутри, а не просто использовать готовое решение. В свободное время любит экспериментировать с новыми блюдами и кухнями, ходит в хайкинги, зимой катается на сноуборде, читает книги и самостоятельно продолжает изучать английский — не только для работы, но и для собственного развития.',
  boundaries: [
    'не придумывать и не увеличивать коммерческий опыт',
    'не превращать обучение (GeekBrains) в коммерческую работу',
    'не приписывать технологии, с которыми Светлана не работала',
    'не заявлять опыт менторства или управления командой — такого опыта не было',
    'не называть уровень английского Fluent или Advanced — только Upper-Intermediate',
    'не придумывать причины ухода из компаний',
    'не называть зарплатные ожидания самостоятельно — отвечать, что они зависят от позиции, уровня ответственности и условий и обсуждаются индивидуально',
    'не обещать готовность к переезду в конкретную страну или город',
    'не раскрывать лишние подробности личной и семейной жизни',
    'если информации недостаточно для честного ответа — прямо сказать, что вопрос стоит уточнить у Светланы лично, а не придумывать ответ',
  ],
};
```

- [ ] **Step 2: Написать тест `src/entities/profile/model/profile.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { PROFILE } from './profile';

describe('PROFILE', () => {
  it('has non-empty text for every narrative field', () => {
    const narrativeFields = [
      PROFILE.career,
      PROFILE.experience,
      PROFILE.status,
      PROFILE.workFormat,
      PROFILE.preferences,
      PROFILE.strengths,
      PROFILE.currentlyLearning,
      PROFILE.english,
      PROFILE.teamwork,
      PROFILE.agile,
      PROFILE.documents,
      PROFILE.personal,
    ];
    for (const field of narrativeFields) {
      expect(field.length).toBeGreaterThan(0);
    }
  });

  it('has all 10 boundaries', () => {
    expect(PROFILE.boundaries).toHaveLength(10);
  });

  it('states the English level honestly as Upper-Intermediate, not Fluent', () => {
    expect(PROFILE.english).toContain('Upper-Intermediate');
    expect(PROFILE.english.toLowerCase()).not.toContain('fluent');
  });
});
```

- [ ] **Step 3: Запустить тест — убедиться, что проходит**

Run: `npx vitest run src/entities/profile`
Expected: PASS (3 теста)

- [ ] **Step 4: Создать `src/entities/profile/index.ts`**

```ts
export type { Profile } from './model/profile';
export { PROFILE } from './model/profile';
```

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/entities/profile
git commit -m "feat: add profile entity with facts and guardrails for AI chat context"
```

---

## Task 5: Собрать system prompt

**Files:**
- Create: `src/features/ask-ai-chat/model/system-prompt.ts`
- Create: `src/features/ask-ai-chat/model/system-prompt.test.ts`

**Interfaces:**
- Consumes: `PROFILE` из `@/entities/profile` (Task 4), `CASES` из `@/entities/case` (существует), `SKILL_CATEGORIES` из `@/entities/skill` (Task 2), `THINK_PRINCIPLES` из `@/entities/think` (Task 3), `Lang` из `@/shared/lib/language`.
- Produces: `buildSystemPrompt(lang: Lang): string` — потребляется Task 6 (Route Handler).

- [ ] **Step 1: Написать падающий тест `src/features/ask-ai-chat/model/system-prompt.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { PROFILE } from '@/entities/profile';
import { buildSystemPrompt } from './system-prompt';

describe('buildSystemPrompt', () => {
  it('includes profile facts', () => {
    const prompt = buildSystemPrompt('ru');
    expect(prompt).toContain('Upper-Intermediate');
    expect(prompt).toContain('Тбилиси');
  });

  it('includes every boundary verbatim', () => {
    const prompt = buildSystemPrompt('ru');
    for (const boundary of PROFILE.boundaries) {
      expect(prompt).toContain(boundary);
    }
  });

  it('includes case titles from the case entity', () => {
    const prompt = buildSystemPrompt('ru');
    expect(prompt).toContain('Экосистема Альфа — маркетплейс объявлений и аукционов');
  });

  it('includes skill tags', () => {
    const prompt = buildSystemPrompt('ru');
    expect(prompt).toContain('Redux Toolkit');
  });

  it('includes approach principles', () => {
    const prompt = buildSystemPrompt('ru');
    expect(prompt).toContain('Сначала понимаю ограничения');
  });

  it('instructs the model to answer in Russian for lang "ru"', () => {
    expect(buildSystemPrompt('ru')).toMatch(/русском/);
  });

  it('instructs the model to answer in English for lang "en"', () => {
    expect(buildSystemPrompt('en')).toMatch(/английском/);
  });
});
```

- [ ] **Step 2: Запустить тест — убедиться, что падает**

Run: `npx vitest run src/features/ask-ai-chat/model/system-prompt`
Expected: FAIL с "Cannot find module './system-prompt'"

- [ ] **Step 3: Реализовать `src/features/ask-ai-chat/model/system-prompt.ts`**

```ts
import { CASES } from '@/entities/case';
import { SKILL_CATEGORIES } from '@/entities/skill';
import { THINK_PRINCIPLES } from '@/entities/think';
import { PROFILE } from '@/entities/profile';
import type { Lang } from '@/shared/lib/language';

const LANGUAGE_NAME: Record<Lang, string> = {
  ru: 'русском',
  en: 'английском',
};

function formatSkills(): string {
  return SKILL_CATEGORIES.ru
    .map((category) => `- ${category.label}: ${category.tags.join(', ')}`)
    .join('\n');
}

function formatCases(): string {
  return CASES.map(
    (c) =>
      `- ${c.title} (${c.role}, ${c.period}). Цель: ${c.goal}. Результат: ${c.result}. ${c.details}`,
  ).join('\n');
}

function formatApproach(): string {
  return THINK_PRINCIPLES.ru.map((item) => `- ${item.title}: ${item.body}`).join('\n');
}

function formatBoundaries(): string {
  return PROFILE.boundaries.map((b) => `- ${b}`).join('\n');
}

export function buildSystemPrompt(lang: Lang): string {
  return `Ты — AI-ассистент на портфолио-сайте Светланы Хайрудиновой, frontend-разработчицы. Отвечай на вопросы посетителей о ней и её опыте.

ПРАВИЛА:
- Отвечай только на основе фактов ниже. Если информации недостаточно, чтобы честно ответить — прямо скажи, что этот вопрос стоит уточнить у Светланы лично, и не придумывай ответ.
- Никогда не нарушай ограничения из списка "Что нельзя говорить" ниже.
- Отвечай на ${LANGUAGE_NAME[lang]} языке, независимо от того, на каком языке задан вопрос.
- Отвечай кратко и по делу, как в чате, а не как в резюме.

О СВЕТЛАНЕ:
Карьера: ${PROFILE.career}
Опыт: ${PROFILE.experience}
Статус поиска: ${PROFILE.status}
Формат работы: ${PROFILE.workFormat}
Предпочтения по работе: ${PROFILE.preferences}
Сильные стороны: ${PROFILE.strengths}
Сейчас изучает: ${PROFILE.currentlyLearning}
Английский: ${PROFILE.english}
Командная работа: ${PROFILE.teamwork}
Agile/Scrum: ${PROFILE.agile}
Документы: ${PROFILE.documents}
Личное: ${PROFILE.personal}

СТЕК:
${formatSkills()}

КЕЙСЫ:
${formatCases()}

ПОДХОД К РАБОТЕ:
${formatApproach()}

ЧТО НЕЛЬЗЯ ГОВОРИТЬ:
${formatBoundaries()}`;
}
```

- [ ] **Step 4: Запустить тест — убедиться, что проходит**

Run: `npx vitest run src/features/ask-ai-chat/model/system-prompt`
Expected: PASS (7 тестов)

- [ ] **Step 5: Typecheck и lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/features/ask-ai-chat/model/system-prompt.ts src/features/ask-ai-chat/model/system-prompt.test.ts
git commit -m "feat: build AI chat system prompt from profile, cases, skills, and approach"
```

---

## Task 6: Route Handler `/api/chat`

**Files:**
- Create: `src/app/api/chat/route.ts`
- Create: `src/app/api/chat/route.test.ts`

**Interfaces:**
- Consumes: `buildSystemPrompt(lang)` из Task 5.
- Produces: `POST(req: Request): Promise<Response>` — потребляется Task 7 (клиент шлёт туда запросы через `useChat`).

- [ ] **Step 1: Написать падающий тест `src/app/api/chat/route.test.ts`**

```ts
import { describe, expect, it, vi, beforeEach } from 'vitest';

const streamTextMock = vi.fn();
const limitMock = vi.fn();

vi.mock('ai', () => ({
  streamText: (...args: unknown[]) => streamTextMock(...args),
  convertToModelMessages: async (messages: unknown) => messages,
}));

vi.mock('@ai-sdk/google', () => ({
  google: vi.fn((modelId: string) => ({ modelId })),
}));

vi.mock('@upstash/ratelimit', () => ({
  Ratelimit: class {
    static slidingWindow = vi.fn(() => 'sliding-window-config');
    limit = (...args: unknown[]) => limitMock(...args);
  },
}));

vi.mock('@upstash/redis', () => ({
  Redis: { fromEnv: vi.fn(() => ({})) },
}));

import { POST } from './route';

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/chat', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'x-forwarded-for': '1.2.3.4' },
  });
}

describe('POST /api/chat', () => {
  beforeEach(() => {
    streamTextMock.mockReset();
    limitMock.mockReset();
  });

  it('streams a response with the right system prompt language when under the rate limit', async () => {
    limitMock.mockResolvedValue({ success: true });
    const toUIMessageStreamResponse = vi.fn(() => new Response('ok'));
    streamTextMock.mockReturnValue({ toUIMessageStreamResponse });

    const request = makeRequest({
      messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: 'Привет' }] }],
      lang: 'ru',
    });

    const response = await POST(request);

    expect(limitMock).toHaveBeenCalledWith('1.2.3.4');
    expect(streamTextMock).toHaveBeenCalledTimes(1);
    const call = streamTextMock.mock.calls[0][0] as { system: string };
    expect(call.system).toMatch(/русском/);
    expect(toUIMessageStreamResponse).toHaveBeenCalledTimes(1);
    expect(response).toBeInstanceOf(Response);
  });

  it('returns 429 without calling the model when the rate limit is exceeded', async () => {
    limitMock.mockResolvedValue({ success: false });

    const request = makeRequest({
      messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: 'Привет' }] }],
      lang: 'ru',
    });

    const response = await POST(request);

    expect(response.status).toBe(429);
    expect(streamTextMock).not.toHaveBeenCalled();
  });

  it('returns 400 without calling the model when the last message is too long', async () => {
    limitMock.mockResolvedValue({ success: true });
    const longText = 'a'.repeat(501);

    const request = makeRequest({
      messages: [{ id: '1', role: 'user', parts: [{ type: 'text', text: longText }] }],
      lang: 'ru',
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(streamTextMock).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Запустить тест — убедиться, что падает**

Run: `npx vitest run src/app/api/chat/route.test.ts`
Expected: FAIL с "Cannot find module './route'"

- [ ] **Step 3: Реализовать `src/app/api/chat/route.ts`**

```ts
import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { buildSystemPrompt } from '@/features/ask-ai-chat/model/system-prompt';
import type { Lang } from '@/shared/lib/language';

const MAX_MESSAGE_LENGTH = 500;

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 m'),
});

function lastMessageText(messages: UIMessage[]): string {
  const last = messages[messages.length - 1];
  if (!last) return '';
  return last.parts.map((part) => (part.type === 'text' ? part.text : '')).join('');
}

export async function POST(req: Request) {
  const { messages, lang }: { messages: UIMessage[]; lang: Lang } = await req.json();

  const ip = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return new Response(null, { status: 429 });
  }

  if (lastMessageText(messages).length > MAX_MESSAGE_LENGTH) {
    return new Response(null, { status: 400 });
  }

  const result = streamText({
    model: google('gemini-2.5-flash-lite'),
    system: buildSystemPrompt(lang),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
```

- [ ] **Step 4: Запустить тест — убедиться, что проходит**

Run: `npx vitest run src/app/api/chat/route.test.ts`
Expected: PASS (3 теста)

- [ ] **Step 5: Typecheck и lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/app/api/chat
git commit -m "feat: add /api/chat route handler with Gemini streaming and rate limiting"
```

**Note:** если во время реального прогона (Task 8) Gemini вернёт ошибку "model not found" для `gemini-2.5-flash-lite` — свериться со списком актуальных моделей на aistudio.google.com и заменить строку модели здесь же.

---

## Task 7: Переписать `AskAiChat` на `useChat`, убрать keyword-matcher

**Files:**
- Modify: `src/features/ask-ai-chat/ask-ai-chat.tsx`
- Modify: `src/features/ask-ai-chat/ask-ai-chat.test.tsx`
- Delete: `src/features/ask-ai-chat/model/qa-data.ts`
- Delete: `src/features/ask-ai-chat/model/qa-data.test.ts`

**Interfaces:**
- Consumes: `useChat`/`DefaultChatTransport` из `@ai-sdk/react`/`ai`; POST `/api/chat` из Task 6; `useLanguage()` из `@/shared/lib/language`.

- [ ] **Step 1: Заменить содержимое `src/features/ask-ai-chat/ask-ai-chat.tsx`**

```tsx
'use client';

import { useState, type FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useLanguage } from '@/shared/lib/language';
import styles from './ask-ai-chat.module.scss';

const QUICK_PROMPTS = {
  ru: [
    'Как ты подходишь к сложным задачам на фронте?',
    'Каким кейсом ты больше всего гордишься?',
    'Какой стек предпочитаешь?',
    'Готова к переезду или удалёнке?',
  ],
  en: [
    'How do you approach complex frontend problems?',
    'Which case are you most proud of?',
    "What's your preferred stack?",
    'Are you open to relocation or remote work?',
  ],
};

const COPY = {
  ru: {
    startingMessage:
      'Привет! Спросите меня что-то обо мне и моей работе, или выберите готовый вопрос ниже.',
    placeholder: 'Спросите что-нибудь...',
    submitLabel: 'Отправить',
    errorFallback:
      'ИИ-ассистент временно недоступен, попробуйте позже, или напишите мне напрямую.',
  },
  en: {
    startingMessage:
      'Hi! Ask me something about me and my work, or pick one of the ready-made questions below.',
    placeholder: 'Ask something...',
    submitLabel: 'Send',
    errorFallback:
      'The AI assistant is temporarily unavailable, please try again later, or message me directly.',
  },
};

export function AskAiChat() {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const [input, setInput] = useState('');
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const busy = status === 'submitted' || status === 'streaming';

  function ask(text: string) {
    if (busy) return;
    sendMessage({ text }, { body: { lang } });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    ask(text);
    setInput('');
  }

  return (
    <div className={styles.card}>
      <div className={styles.messages}>
        <div className={styles.rowAi}>
          <div className={styles.bubbleAi}>{copy.startingMessage}</div>
        </div>
        {messages.map((m) => (
          <div key={m.id} className={m.role === 'user' ? styles.rowUser : styles.rowAi}>
            <div className={m.role === 'user' ? styles.bubbleUser : styles.bubbleAi}>
              {m.parts.map((part) => (part.type === 'text' ? part.text : '')).join('')}
            </div>
          </div>
        ))}
        {error && (
          <div className={styles.rowAi}>
            <div className={styles.bubbleAi}>{copy.errorFallback}</div>
          </div>
        )}
      </div>
      <div className={styles.prompts}>
        {QUICK_PROMPTS[lang].map((question) => (
          <button
            key={question}
            type="button"
            className={styles.promptButton}
            onClick={() => ask(question)}
            disabled={busy}
          >
            {question}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder={copy.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
        />
        <button
          type="submit"
          className={styles.submit}
          aria-label={copy.submitLabel}
          disabled={busy}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </form>
    </div>
  );
}
```

- [ ] **Step 2: Удалить keyword-matcher**

```bash
rm src/features/ask-ai-chat/model/qa-data.ts src/features/ask-ai-chat/model/qa-data.test.ts
```

- [ ] **Step 3: Заменить содержимое `src/features/ask-ai-chat/ask-ai-chat.test.tsx`**

```tsx
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider, useLanguage } from '@/shared/lib/language';

const sendMessageMock = vi.fn();

interface MockChatState {
  messages: Array<{ id: string; role: string; parts: Array<{ type: string; text?: string }> }>;
  status: string;
  error: Error | undefined;
}

const mockChatState: MockChatState = { messages: [], status: 'ready', error: undefined };

vi.mock('@ai-sdk/react', () => ({
  useChat: () => ({
    messages: mockChatState.messages,
    sendMessage: sendMessageMock,
    status: mockChatState.status,
    error: mockChatState.error,
  }),
}));

import { AskAiChat } from './ask-ai-chat';

function AskAiChatWithToggle() {
  const { toggle } = useLanguage();
  return (
    <>
      <button type="button" onClick={toggle}>
        toggle
      </button>
      <AskAiChat />
    </>
  );
}

describe('AskAiChat', () => {
  beforeEach(() => {
    sendMessageMock.mockReset();
    mockChatState.messages = [];
    mockChatState.status = 'ready';
    mockChatState.error = undefined;
  });

  it('shows the starting AI message', () => {
    render(<AskAiChat />);
    expect(
      screen.getByText(
        'Привет! Спросите меня что-то обо мне и моей работе, или выберите готовый вопрос ниже.',
      ),
    ).toBeInTheDocument();
  });

  it('renders one quick-prompt button per topic', () => {
    render(<AskAiChat />);
    expect(screen.getByRole('button', { name: 'Какой стек предпочитаешь?' })).toBeInTheDocument();
  });

  it('clicking a quick prompt sends the question with the current language', async () => {
    const user = userEvent.setup();
    render(<AskAiChat />);
    await user.click(screen.getByRole('button', { name: 'Какой стек предпочитаешь?' }));
    expect(sendMessageMock).toHaveBeenCalledWith(
      { text: 'Какой стек предпочитаешь?' },
      { body: { lang: 'ru' } },
    );
  });

  it('typing and submitting sends the message', async () => {
    const user = userEvent.setup();
    render(<AskAiChat />);
    await user.type(screen.getByPlaceholderText('Спросите что-нибудь...'), 'Привет');
    await user.click(screen.getByRole('button', { name: 'Отправить' }));
    expect(sendMessageMock).toHaveBeenCalledWith({ text: 'Привет' }, { body: { lang: 'ru' } });
  });

  it('does nothing on empty submit', async () => {
    const user = userEvent.setup();
    render(<AskAiChat />);
    await user.click(screen.getByRole('button', { name: 'Отправить' }));
    expect(sendMessageMock).not.toHaveBeenCalled();
  });

  it('renders assistant and user messages from the conversation', () => {
    mockChatState.messages = [
      { id: '1', role: 'user', parts: [{ type: 'text', text: 'Какой стек?' }] },
      { id: '2', role: 'assistant', parts: [{ type: 'text', text: 'React и TypeScript' }] },
    ];
    render(<AskAiChat />);
    expect(screen.getByText('Какой стек?')).toBeInTheDocument();
    expect(screen.getByText('React и TypeScript')).toBeInTheDocument();
  });

  it('shows the error fallback when the chat errors', () => {
    mockChatState.error = new Error('network error');
    render(<AskAiChat />);
    expect(
      screen.getByText(
        'ИИ-ассистент временно недоступен, попробуйте позже, или напишите мне напрямую.',
      ),
    ).toBeInTheDocument();
  });

  it('disables input and prompt buttons while a response is streaming', () => {
    mockChatState.status = 'streaming';
    render(<AskAiChat />);
    expect(screen.getByPlaceholderText('Спросите что-нибудь...')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Какой стек предпочитаешь?' })).toBeDisabled();
  });

  it('translates UI chrome and sends the language after switching to EN', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <AskAiChatWithToggle />
      </LanguageProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'toggle' }));

    expect(screen.getByText(/Hi! Ask me something/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: "What's your preferred stack?" }));
    expect(sendMessageMock).toHaveBeenCalledWith(
      { text: "What's your preferred stack?" },
      { body: { lang: 'en' } },
    );
  });
});
```

- [ ] **Step 4: Запустить тесты фичи**

Run: `npx vitest run src/features/ask-ai-chat`
Expected: PASS (9 тестов в `ask-ai-chat.test.tsx`, `qa-data.test.ts` больше не существует)

- [ ] **Step 5: Прогнать тесты виджета `ask-ai`, который оборачивает эту фичу**

Run: `npx vitest run src/widgets/ask-ai`
Expected: PASS (виджет не менялся, но зависит от `AskAiChat` — стартовое сообщение то же самое, тест не должен сломаться)

- [ ] **Step 6: Typecheck и lint**

Run: `npm run typecheck && npm run lint`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/features/ask-ai-chat
git commit -m "feat: switch AskAiChat from keyword-matcher to streaming useChat against /api/chat"
```

---

## Task 8: Полная проверка и ручной прогон в браузере

**Files:** нет новых файлов — это верификационный проход.

- [ ] **Step 1: Полный прогон проверок**

```bash
npm run typecheck && npm run lint && npm run format:check && npm test && npm run build
```

Expected: всё PASS. Если `format:check` найдёт незначительные расхождения в новых файлах — прогнать `npm run format` и закоммитить отдельно.

- [ ] **Step 2: Живая проверка в браузере (частично заблокирована ручным шагом)**

Живой чат с реальным Gemini можно проверить локально прямо сейчас (ключ `GOOGLE_GENERATIVE_AI_API_KEY` в `.env.local` уже есть — Task 1 это подтвердил). Rate limiting проверить нельзя, пока не заведён Upstash Redis (см. спеку, раздел 10, пункт 2) — `Redis.fromEnv()` упадёт без `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN`.

Если Upstash ещё не готов, для локальной живой проверки временно закомментировать блок rate-limit в `route.ts` (не коммитить это изменение) либо сразу завести бесплатный Upstash Redis перед этим шагом.

Через `.claude/skills/browser-verification/SKILL.md`: открыть секцию «Ask My AI», задать вопрос через быструю кнопку и через поле ввода, убедиться что ответ стримится и по существу, переключить RU↔EN и убедиться что ответ приходит на нужном языке, проверить состояние ошибки (например, временно испортив `GOOGLE_GENERATIVE_AI_API_KEY`) — должен показаться `errorFallback`, а не белый экран/консольная ошибка.

- [ ] **Step 3: Финальный коммит (если после Step 1 были правки формата)**

```bash
git add -A
git commit -m "chore: format fixes after AI chat implementation"
```

(Пропустить, если `format:check` не потребовал изменений.)

---

## Незакрытое после плана (не блокирует код, но блокирует прод)

1. Завести Upstash Redis, добавить `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` в `.env.local`.
2. При деплое на Vercel — добавить все три переменные окружения (`GOOGLE_GENERATIVE_AI_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`) в Project Settings.
