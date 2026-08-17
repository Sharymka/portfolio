import { describe, expect, it } from 'vitest';
import { answerFor, QA_DATA } from './qa-data';

describe('answerFor', () => {
  it('has the 4 verbatim QA pairs from the mockup', () => {
    expect(QA_DATA).toHaveLength(4);
    expect(QA_DATA.map((qa) => qa.question)).toEqual([
      'Как ты подходишь к сложным задачам на фронте?',
      'Каким кейсом ты больше всего гордишься?',
      'Какой стек предпочитаешь?',
      'Готова к переезду или удалёнке?',
    ]);
  });

  it('matches a keyword case-insensitively anywhere in the text', () => {
    expect(answerFor('Расскажи про свой СТЕК технологий')).toBe(QA_DATA[2].answer);
  });

  it('falls back when nothing matches', () => {
    expect(answerFor('какая твоя любимая еда')).toBe(
      'Хороший вопрос — отвечу подробно лично. Оставьте сообщение в разделе «Контакты», и я вернусь с ответом.',
    );
  });
});
