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
