<script lang="ts" setup>
import { ref, computed, nextTick, compile } from "vue"
import useCatMeam from './composable/useCatMeam';
import { type GachaResult } from "@/types/GachaResult";
const { callRandomMeam } = useCatMeam()

const currentMeam = computed(() => {
  return gachaResult.value[0] ?? {
    description: "",
    desc_jp: "",
    grade: {},
    movieId: "",
    movieCerts: ""
  }
})

const gachaResult = ref<GachaResult[]>([])

const isLoading = ref(false)

const getAnkerPath = (id: string) => {
  return `https://youtu.be/${id}`
}

const getEmbedPath = (id: string, certs: string) => {
  return `https://www.youtube.com/embed/${id}?si=${certs}&controls=0`

}

/**
 * 遷移用パス
 */
const currenAnkerPath = computed(() => { return getAnkerPath(currentMeam.value.movieId) }
)

/**
 * 埋め込み用パス
 */
const currentEmbedPath = computed(() => {
  return getEmbedPath(currentMeam.value.movieId, currentMeam.value.movieCerts)
}
)

/**
 * ガチャを回す
 */
const onExecuteGacha = async (count = 1) => {
  gachaResult.value = []
  isLoading.value = true
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      for (let i = 0; i < count; i++) {
        gachaResult.value.push(callRandomMeam())
      }
      isLoading.value = false
      resolve()
    }, 1000)
  })
}

const onExecuteTenCountGacha = async () => {
  onExecuteGacha
}

</script>

<template>
  <div>
    <div>
      <h1>猫ミームガチャ</h1>
      <div style="display:flex">
        <button @click="onExecuteGacha(1)">ガチャを回す(1回)</button>
        <button @click="onExecuteGacha(10)">10連ガチャ</button>
      </div>
    </div>
    <div style="height:22rem">
      <div v-if="!isLoading && currentMeam.description != ''">
        <h2>{{ currentMeam.desc_jp }}</h2>
        <p>{{ currentMeam.description }}</p>
        <div style="display:flex">
          <h3>レア度:{{ currentMeam.grade.initial }}</h3>
          <h3 style="margin-left:2rem">確率:{{ (currentMeam.grade.probability ?? 0) * 100 }}%</h3>
        </div>
        <div>
          <iframe id="youtubeMovie" width="360" height="215" :src="currentEmbedPath" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <a :href="currenAnkerPath">YouTubeで見る</a>
      </div>
      <h2 v-else-if="isLoading">ガチャ中・・・</h2>
    </div>
    <div v-show="gachaResult.length > 0">
      <h2 style="border-bottom: 1px solid; margin-bottom:1rem">ガチャ結果</h2>
      <ul style="padding:0">
        <li v-for="(el, idx) in gachaResult" :key="idx" style="display: flex;">
          <p style="width:20rem">{{ `【${el.grade.initial}】${idx + 1} :${el.desc_jp}` }}</p>
          <button>
            <a :href="getAnkerPath(el.movieId)">YouTube</a>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>