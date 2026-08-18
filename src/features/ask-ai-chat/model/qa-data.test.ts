import { describe, expect, it } from 'vitest';
import { answerFor, QA_DATA } from './qa-data';

describe('answerFor', () => {
  it('has the 4 verbatim QA pairs from the mockup, in RU', () => {
    expect(QA_DATA.ru).toHaveLength(4);
    expect(QA_DATA.ru.map((qa) => qa.question)).toEqual([
      'Как ты подходишь к сложным задачам на фронте?',
      'Каким кейсом ты больше всего гордишься?',
      'Какой стек предпочитаешь?',
      'Готова к переезду или удалёнке?',
    ]);
  });

  it('has 4 QA pairs in EN', () => {
    expect(QA_DATA.en).toHaveLength(4);
  });

  it('matches a keyword case-insensitively anywhere in the text, in RU', () => {
    expect(answerFor('Расскажи про свой СТЕК технологий', 'ru')).toBe(QA_DATA.ru[2].answer);
  });

  it('matches a keyword case-insensitively anywhere in the text, in EN', () => {
    expect(answerFor('Tell me about your STACK', 'en')).toBe(QA_DATA.en[2].answer);
  });

  it('falls back when nothing matches, in RU', () => {
    expect(answerFor('какая твоя любимая еда', 'ru')).toBe(
      'Хороший вопрос — отвечу подробно лично. Оставьте сообщение в разделе «Контакты», и я вернусь с ответом.',
    );
  });

  it('falls back when nothing matches, in EN', () => {
    expect(answerFor('what is your favorite food', 'en')).toBe(
      'Good question — I\'ll answer that in detail personally. Leave a message in the "Contact" section and I\'ll get back to you.',
    );
  });
});
