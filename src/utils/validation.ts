import type { Bet, Settings } from '../types'
import { availableBankroll } from './bankroll'

export const validateBetInput = (input: Pick<Bet, 'mise' | 'cote'>, settings: Settings, bets: Bet[], movements: Parameters<typeof availableBankroll>[2]) => {
  if (!Number.isFinite(input.mise) || input.mise <= 0) return 'La mise doit être supérieure à 0.'
  if (!Number.isFinite(input.cote) || input.cote < 2) return 'La cote doit être supérieure ou égale à 2,00.'
  const available = availableBankroll(settings, bets, movements)
  if (input.mise > available) return `Mise refusée : disponible ${available.toLocaleString('fr-FR')} ${settings.devise}.`
  if (settings.mise_max_pourcent && input.mise > available * settings.mise_max_pourcent / 100) return `Cette mise dépasse la limite de ${settings.mise_max_pourcent} % autorisée.`
  return null
}
