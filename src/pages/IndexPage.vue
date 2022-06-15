<!-- style="max-height: calc(100vh-100px); width: 100vw" -->
<template>
  <div>
    <q-scroll-area id="virtual-scroll-area" style="height: calc(100vh - 50px)">
      <q-virtual-scroll
        :items="heavyList"
        separator
        scroll-target="#virtual-scroll-area > .scroll"
      >
        <template #default="{ item, index }">
          <q-banner
            v-if="item.banner"
            :key="'a' + index"
            style="background-color: grey"
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
const maxSize = 10000;
const heavyList = [];

for (let i = 0; i < maxSize; i++) {
  heavyList.push({
    label: "Option " + (i + 1),
    banner: i % 5 === 0,
  });
}
</script>
