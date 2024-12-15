<script lang="ts" setup>
import { ref, computed, nextTick } from "vue"
import useCatMeam from './composable/useCatMeam';
import { type GachaResult } from "@/types/GachaResult";
const { callRandomMeam } = useCatMeam()

const currentMeam = ref<GachaResult>({
  description: "",
  desc_jp: "",
  grade: {},
  movieId: "",
  movieCerts: ""
})

const isLoading = ref(false)

/**
 * 遷移用パス
 */
const ankerPath = computed(() =>
  "https://youtu.be/" + currentMeam.value.movieId
)

/**
 * 埋め込み用パス
 */
const embedPath = computed(() =>
  `https://www.youtube.com/embed/${currentMeam.value.movieId}?si=${currentMeam.value.movieCerts}&controls=0`
)

/**
 * ガチャを回す
 */
const onExecuteGacha = async () => {
  isLoading.value = true
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      currentMeam.value = callRandomMeam()
      isLoading.value = false
      resolve()
    }, 1500)
  })
}

</script>

<template>
  <div>
    <div>
      <h1>猫ミームガチャ</h1>
      <button @click="onExecuteGacha">ガチャを回す</button>
    </div>
    <div style="height:30rem">
      <div v-if="!isLoading && currentMeam.description != ''">
        <h2>{{ currentMeam.desc_jp }}</h2>
        <p>{{ currentMeam.description }}</p>
        <div style="display:flex">
          <h3>レア度:{{ currentMeam.grade.initial }}</h3>
          <h3 style="margin-left:2rem">確率:{{ (currentMeam.grade.probability ?? 0) * 100 }}%</h3>
        </div>
        <div>
          <iframe id="youtubeMovie" width="360" height="215" :src="embedPath" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
        <a :href="ankerPath">YouTubeで見る</a>
      </div>
      <h2 v-else-if="isLoading">ガチャ中・・・</h2>
    </div>
  </div>
</template>