import { supabase } from './supabase'
import type { Bet, Movement, Settings } from '../types'
export { supabase }

export const loadData = async () => {
  const [bets, movements, settings] = await Promise.all([
    supabase.from('bets').select('*').order('date_pari', { ascending: false }),
    supabase.from('bankroll_movements').select('*').order('date_mouvement', { ascending: false }),
    supabase.from('settings').select('*').limit(1).maybeSingle(),
  ])
  const error = bets.error ?? movements.error ?? settings.error
  if (error) throw error
  return { bets: (bets.data ?? []) as Bet[], movements: (movements.data ?? []) as Movement[], settings: (settings.data ?? { bankroll_initiale: 0, devise: 'FCFA', mise_max_pourcent: null }) as Settings }
}

export const createBet = async (bet: Omit<Bet, 'id' | 'created_at'>) => {
  const { error } = await supabase.from('bets').insert(bet)
  if (error) throw error
}
export const updateBetResult = async (id: string, resultat: Bet['resultat']) => { const { error } = await supabase.from('bets').update({ resultat }).eq('id', id); if (error) throw error }
export const deleteBet = async (id: string) => { const { error } = await supabase.from('bets').delete().eq('id', id); if (error) throw error }
export const createMovement = async (movement: Omit<Movement, 'id' | 'created_at'>) => { const { error } = await supabase.from('bankroll_movements').insert(movement); if (error) throw error }
export const saveSettings = async (settings: Settings) => { const { error } = await supabase.from('settings').upsert({ id: true, ...settings }); if (error) throw error }
