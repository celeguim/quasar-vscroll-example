<!-- style="max-height: calc(100vh-100px); width: 100vw" -->
<template>
  <div>
    <div class="row q-gutter-y-md">
      <q-btn label="scroll to 900" @click="scrollTo(900)" />
      <q-btn label="scroll to end" @click="scrollToEnd()" />
    </div>

    <q-scroll-area
      ref="scrollArea"
      id="virtual-scroll-area"
      style="height: calc(100vh - 100px)"
    >
      <q-virtual-scroll
        ref="virtualScroll"
        :items="heavyList"
        separator
        scroll-target="#virtual-scroll-area > .scroll"
      >
        <template #default="{ item, index }">
          <q-banner
            v-if="item.banner"
            :key="'a' + index"
            style="background-color: rgba(117, 190, 218, 0.5)"
          >
            # {{ index }} - {{ item }}
          </q-banner>

          <q-item v-else :key="'b' + index" dense>
            <q-item-section>
              <q-item-label> . {{ index }} - {{ item }} </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-virtual-scroll>
    </q-scroll-area>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
const virtualScroll = ref();
const scrollArea = ref();
const maxSize = 10000;
const heavyList = [];

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: "Option " + (i + 1),
    banner: i % 5 === 0,
  });
}

onMounted(() => {
  virtualScroll.value.scrollTo(0);
  console.log("onMounted()");
});

function scrollTo(index) {
  virtualScroll.value.scrollTo(index);
  console.log("scrollTo", index);
}

function scrollToEnd() {
  console.log("scrollToEnd()");
  const duration = 1000;

  scrollArea.value.getScrollTarget().scrollTo({
    top: scrollArea.value.getScrollTarget().scrollHeight,
    behavior: "smooth",
    duration,
  });
}
</script>
