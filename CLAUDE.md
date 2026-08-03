## Проект

Портфолио-лендинг frontend-разработчика (React / Next.js) — одна прокручиваемая главная страница: hero, обо мне, навыки, кейсы, подход к работе, AI-чат «Ask My AI», документы, контакты. Дизайн и содержание зафиксированы в `docs/superpowers/specs/`, порядок реализации — в `docs/superpowers/plans/`.

## Стек

- Next.js 16.2.x, App Router · React 19.2.x · TypeScript (strict)
- Стили — **SCSS Modules + CSS custom properties** (design tokens в `src/app/styles/tokens.scss`)
- Шрифты — `next/font/google`
- Тесты — Vitest + React Testing Library
- Lint/format — ESLint (`eslint-config-next`, `eslint-plugin-jsx-a11y`) + Prettier
- CI — GitHub Actions (`.github/workflows/ci.yml`) · Деплой — Vercel

Подробное обоснование стека — `docs/technical-research.md`.

## Архитектура

Урезанный Feature-Sliced Design:

```
src/app/       Next.js роутинг + глобальная инициализация (layout, fonts, styles)
src/widgets/   крупные составные блоки страницы (nav, footer, секции)
src/entities/  доменные модели — заводить, только если появляется настоящий домен
src/features/  только там, где есть реальная пользовательская интеракция (чат, форма, карусель)
src/shared/    ui-kit (button, container, ...), утилиты, типы
```

Слоя `processes` и отдельного FSD-слоя `pages` в проекте нет и не будет — роль `pages` уже выполняет `app/`.

**Правило: не перестраивать архитектуру без необходимости.** Если задача решается в рамках существующей структуры — не вводить новые слои/паттерны ради самих себя.

## Прежде чем писать код

1. Изучить существующий код, компоненты (`src/shared/ui/`), стили (`src/app/styles/`) и релевантные документы в `docs/superpowers/specs/` и `docs/superpowers/plans/`.
2. Переиспользовать существующие компоненты и токены — не дублировать и не создавать параллельные реализации того же самого.
3. Если версия Next.js в проекте ведёт себя иначе, чем ожидается по общим знаниям о фреймворке — свериться с `AGENTS.md` и `node_modules/next/dist/docs/` прежде чем писать код.

## Команды

| Команда | Назначение |
|---|---|
| `npm run dev` | dev-сервер |
| `npm run build` | продакшн-сборка |
| `npm run start` | запуск собранного приложения |
| `npm run typecheck` | проверка типов (`tsc --noEmit`) |
| `npm run lint` | ESLint |
| `npm run format` / `format:check` | Prettier |
| `npm test` / `npm run test:watch` | Vitest |

Те же проверки (кроме `start`) прогоняются в CI на каждый PR — см. `.github/workflows/ci.yml`.

## Стили и дизайн-токены

- Все цвета, шрифты, spacing, радиусы — через CSS custom properties в `src/app/styles/tokens.scss`, не хардкодить hex/px в компонентах.
- Каждый компонент — свой `*.module.scss` (scoped), не глобальные utility-классы.
- Изменение палитры/шрифтов — только вслед за design-спекой в `docs/superpowers/specs/`, не по вкусу на ходу.

## Запрещённые/нежелательные технологии

Зафиксировано в `docs/technical-research.md` и `docs/superpowers/plans/2026-07-17-portfolio-foundation.md`:

- Redux Toolkit / RTK Query — не использовать нигде в проекте.
- Tailwind CSS — не использовать (осознанный выбор в пользу ручных SCSS Modules).
- CSS-in-JS (styled-components, emotion и т.п.) — не использовать.
- Headless CMS — не нужен, контент статический.
- RAG/векторная БД для AI-чата — не нужна при текущем объёме контента.
- Biome — не принят вместо ESLint+Prettier без отдельного обсуждения.

## Код

- TypeScript strict, без `any` без явного обоснования.
- Именование — по смыслу домена, а не по техническому слою (`SiteNav`, не `NavComponent`).
- Простое достаточное решение приоритетнее лишней абстракции — не проектировать под гипотетическое будущее.
- Не устанавливать новые зависимости без обоснованной необходимости.

## Перед завершением задачи

Прогнать локально: `npm run typecheck && npm run lint && npm run format:check && npm test && npm run build`. Если менялся отрисованный UI — см. `.claude/skills/browser-verification/SKILL.md`, решает ли задача нужна ли и как визуальная проверка.

## Dev-сервер

Не поднимать второй `npm run dev`, если один уже запущен в этой сессии — переиспользовать существующий на `http://localhost:3000`.
