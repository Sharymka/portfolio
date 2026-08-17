import { describe, expect, it } from 'vitest';
import { CASES } from './cases';

describe('CASES', () => {
  it('has exactly 3 cases in the spec order', () => {
    expect(CASES.map((c) => c.title)).toEqual([
      'Экосистема Альфа — маркетплейс объявлений и аукционов',
      'myHotel — система управления гостиницей',
      'Questionnaire App — Itransition',
    ]);
  });

  it('gives each case the right number of real screenshots', () => {
    const [auction, hotel, questionnaire] = CASES;
    expect(auction.images).toHaveLength(12);
    expect(hotel.images).toHaveLength(3);
    expect(questionnaire.images).toHaveLength(7);
  });

  it('points image paths at public/images/cases/<slug>/', () => {
    for (const c of CASES) {
      for (const src of c.images) {
        expect(src).toMatch(new RegExp(`^/images/cases/${c.slug}/\\d{2}\\.png$`));
      }
    }
  });
});
