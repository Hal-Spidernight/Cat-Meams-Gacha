import { type GradeItem } from "./GradeItems"

export type GachaResult = {
    description: string
    desc_jp: string
    grade: Partial<GradeItem>
    movieId: string
    movieCerts: string
}
