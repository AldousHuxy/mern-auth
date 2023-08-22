const CURRECNY_FORMATTER =new Intl.NumberFormat(undefined, { currency: 'USD', style: 'currency' })

export const formatCurrency = (number: number) => {
    return CURRECNY_FORMATTER.format(number)
}