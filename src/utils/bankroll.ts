import type { Bet, Movement, Settings } from '../types'

export const betProfit = (bet: Pick<Bet, 'mise' | 'cote' | 'resultat'>): number => bet.resultat === 'gagné' ? bet.mise * (bet.cote - 1) : bet.resultat === 'perdu' ? -bet.mise : 0
export const totalProfit = (bets: Bet[]) => bets.reduce((sum, bet) => sum + betProfit(bet), 0)
export const invested = (bets: Bet[]) => bets.filter((bet) => bet.resultat === 'en_cours').reduce((sum, bet) => sum + bet.mise, 0)
export const movementsBalance = (movements: Movement[]) => movements.reduce((sum, item) => sum + (item.type === 'dépôt' ? item.montant : -item.montant), 0)
export const currentBankroll = (settings: Settings, bets: Bet[], movements: Movement[]) => settings.bankroll_initiale + movementsBalance(movements) + totalProfit(bets)
export const availableBankroll = (settings: Settings, bets: Bet[], movements: Movement[]) => currentBankroll(settings, bets, movements) - invested(bets)
export const roi = (bets: Bet[]) => { const finished = bets.filter((bet) => bet.resultat !== 'en_cours'); const stake = finished.reduce((sum, bet) => sum + bet.mise, 0); return stake ? totalProfit(finished) / stake : 0 }
export const winrate = (bets: Bet[]) => { const finished = bets.filter((bet) => bet.resultat !== 'en_cours'); return finished.length ? finished.filter((bet) => bet.resultat === 'gagné').length / finished.length : 0 }
export const averageOdds = (bets: Bet[]) => { const finished = bets.filter((bet) => bet.resultat !== 'en_cours'); return finished.length ? finished.reduce((sum, bet) => sum + bet.cote, 0) / finished.length : 0 }
export const breakEvenRate = (bets: Bet[]) => { const odds = averageOdds(bets); return odds ? 1 / odds : 0 }
export const currentStreak = (bets: Bet[]) => { const finished = [...bets].filter((bet) => bet.resultat !== 'en_cours').sort((a, b) => b.date_pari.localeCompare(a.date_pari)); if (!finished.length) return { result: null as 'gagné' | 'perdu' | null, count: 0 }; const result = finished[0].resultat as 'gagné' | 'perdu'; return { result, count: finished.findIndex((bet) => bet.resultat !== result) === -1 ? finished.length : finished.findIndex((bet) => bet.resultat !== result) } }
