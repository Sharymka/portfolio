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
      tags: ['Node.js', 'Express', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'Docker', 'Cloudinary'],
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
      tags: ['Node.js', 'Express', 'PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'Docker', 'Cloudinary'],
    },
  ],
};
