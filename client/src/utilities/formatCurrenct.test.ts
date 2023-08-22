import { describe, expect, it } from 'vitest'
import { formatCurrency } from './formatCurrency';

describe('#formatCurrency', () => {
    it('formats numbers into a currency', () => {
        expect(formatCurrency(10)).toBe('$10.00')
    })

    it('formats decimal numbers into a currency', () => {
        expect(formatCurrency(10.00)).toBe('$10.00')
    })

    it('formats imprecise decimal numbers into a currency', () => {
        expect(formatCurrency(10.9)).toBe('$10.90')
    })

    it('formats negative numbers into a currency', () => {
        expect(formatCurrency(-10)).toBe('-$10.00')
    })
})