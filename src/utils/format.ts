export const money = (value: number, currency = 'FCFA') => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value) + ' ' + currency
export const percent = (value: number) => new Intl.NumberFormat('fr-FR', { style: 'percent', maximumFractionDigits: 1 }).format(value)
