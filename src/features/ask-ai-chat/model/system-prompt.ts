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
