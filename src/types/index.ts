export type BetResult = 'en_cours' | 'gagné' | 'perdu'
export type BetType = 'simple' | 'combiné'
export type MovementType = 'dépôt' | 'retrait'

export interface Bet { id: string; created_at: string; date_pari: string; match: string; sport: string; type_pari: BetType; mise: number; cote: number; resultat: BetResult; note?: string | null }
export interface Movement { id: string; created_at: string; date_mouvement: string; type: MovementType; montant: number; note?: string | null }
export interface Settings { bankroll_initiale: number; devise: string; mise_max_pourcent: number | null }
