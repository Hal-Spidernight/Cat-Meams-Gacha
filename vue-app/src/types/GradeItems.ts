
export type GradeKeys = "N" | "R" | "SR" | "SSR"

/**
 * ガチャグレード
 */
export type GradeItem = {
    initial: GradeKeys
    name: string
    probability: number
}
