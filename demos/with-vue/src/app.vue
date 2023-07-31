<script setup lang="ts">
import {Placement, Stage, StageFocus, toFocusElementStateMany} from 'cicerone.js'

let count = 0;
const highlight = (event: Event, placement: Placement) => {
  if (count > 0) {
    return
  }
  count += 1;
  new Stage({
    focusGroup: [
      [
        new StageFocus(toFocusElementStateMany([event.target]))
      ]
    ]
  })
}

</script>

<template>
  <div class="w-screen h-screen flex flex-col items-center justify-center">
    <view class="flex flex-row items-center justify-between">
      <span @click="highlight($event, 'top-start')" class="border-1 border">TopStart</span>
      <span @click="highlight($event, 'top-start')" class="border-1 border ml-[10px]">TopCenter</span>
      <span @click="highlight($event, 'top-start')" class="border-1 border ml-[10px]">TopEnd</span>
    </view>
    <view class="flex flex-row items-center justify-between mt-[10px]">
      <span @click="highlight($event, 'top-start')" class="border-1 border">LeftStart</span>
      <span @click="highlight($event, 'top-start')" class="border-1 border ml-[10px]">LeftCenter</span>
      <span @click="highlight($event, 'top-start')" class="border-1 border ml-[10px]">LeftEnd</span>
    </view>
    <view class="flex flex-row items-center justify-between mt-[10px]">
      <span @click="highlight($event, 'top-start')" class="border-1 border">RightStart</span>
      <span @click="highlight($event, 'top-start')" class="border-1 border ml-[10px]">RightCenter</span>
      <span @click="highlight($event, 'top-start')" class="border-1 border ml-[10px]">RightEnd</span>
    </view>
  </div>
</template>

<style scoped>

</style>
