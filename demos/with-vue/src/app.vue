<script lang="ts" setup>
import { highlightElement, Placement } from 'cicerone.js'

let count = 0;
const highlight = (event: Event, placement: Placement) => {
  if (count > 0) {
    return
  }

  const cicerone = highlightElement(event.target!, {placement: placement})
  cicerone.bootstrap()
}

</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center gap-2">
    <view class="flex flex-row items-center justify-between gap-2">
      <span class="border-1 border" @click="highlight($event, 'top-start')">TopStart</span>
      <span class="border-1 border" @click="highlight($event, 'top-start')">TopCenter</span>
      <span class="border-1 border" @click="highlight($event, 'top-start')">TopEnd</span>
    </view>
    <view class="flex flex-row items-center justify-between gap-2">
      <span class="border-1 border" @click="highlight($event, 'top-start')">LeftStart</span>
      <span class="border-1 border" @click="highlight($event, 'top-start')">LeftCenter</span>
      <span class="border-1 border" @click="highlight($event, 'top-start')">LeftEnd</span>
    </view>
    <view class="flex flex-row items-center justify-between gap-2">
      <span class="border-1 border" @click="highlight($event, 'top-start')">RightStart</span>
      <span class="border-1 border" @click="highlight($event, 'top-start')">RightCenter</span>
      <span class="border-1 border" @click="highlight($event, 'top-start')">RightEnd</span>
    </view>
  </div>
</template>

<style scoped>

</style>
