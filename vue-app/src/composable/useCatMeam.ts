import { CAT_MEAM_LIST, GRADE_LIST } from "@/assets/defs"
export default () => {
    const _getRandomInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const getRandomGrade = () => {
        // Math.random()で0～1のランダム値を取得
        const randomValue = Math.random();

        // 累積確率でグレードを判定
        let cumulativeProbability = 0;

        const grades = Object.values(GRADE_LIST)
        console.log("grades:", grades)
        for (const item of grades) {
            cumulativeProbability += item.probability;
            if (randomValue < cumulativeProbability) {
                return item;
            }
        }
        return GRADE_LIST["N"]
    }

    /**
     * ランダムで猫ミームを返却
     */
    const callRandomMeam = () => {

        const tagetGrade = getRandomGrade()
        console.log("target:", tagetGrade)

        //グレード絞り込み
        const gradedItem = CAT_MEAM_LIST.filter((item) => item.grade.initial === tagetGrade.initial)
        console.log(`${tagetGrade.initial} Item:`, gradedItem)

        const maxLength = gradedItem.length
        const random = _getRandomInt(0, maxLength)
        console.log(random)
        return gradedItem[random]
    }
    return {
        callRandomMeam
    }
}