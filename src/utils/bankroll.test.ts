import { describe, expect, it } from 'vitest'
import { betProfit, breakEvenRate, roi, winrate } from './bankroll'
const bets = [{ id: '1', created_at: '', date_pari: '2026-01-01', match: 'A', sport: 'Football', type_pari: 'simple' as const, mise: 100, cote: 2, resultat: 'gagné' as const }, { id: '2', created_at: '', date_pari: '2026-01-02', match: 'B', sport: 'Football', type_pari: 'simple' as const, mise: 100, cote: 3, resultat: 'perdu' as const }]
describe('bankroll calculations', () => { it('calculates profit', () => expect(betProfit(bets[0])).toBe(100)); it('calculates roi and winrate', () => { expect(roi(bets)).toBe(0); expect(winrate(bets)).toBe(0.5) }); it('calculates break even', () => expect(breakEvenRate(bets)).toBe(0.4)) })
