<!-- style="max-height: calc(100vh-100px); width: 100vw" -->
<template>
  <div>
    <div class="row q-gutter-y-md">
      <q-btn label="scroll to 0" @click="scrollTo(0)" />
      <q-btn label="scroll to end" @click="scrollToEnd()" />
      <q-btn label="Add Item" @click="addItem()" />
    </div>

    <q-scroll-area
      ref="scrollArea"
      id="virtual-scroll-area"
      style="height: calc(100vh - 100px)"
      :virtual-scroll-item-size="32"
    >
      <q-virtual-scroll
        ref="virtualScroll"
        :items-size="heavyList.length"
        :items-fn="getItems"
        separator
        scroll-target="virtual-scroll-area > .scroll"
      >
        <template #default="{ item, index }">
          <q-item :key="'b' + index" dense>
            <q-item-section>
              <q-item-label> . {{ index }} - {{ item }} </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-virtual-scroll>
    </q-scroll-area>
  </div>
</template>

<script>
import { onMounted, ref, watch } from "vue";
const virtualScroll = ref();
const scrollArea = ref();
const maxSize = 20;
var heavyList = [];
var heavyListChanged = "";
const isMounted = ref(false);

export default {
  data() {},

  mounted() {
    this.scrollToEnd();
    isMounted.value = true;
  },

  methods: {
    getItems(from, size) {
      console.log("getItems()", from, size);
      // const newItem = {
      //   label: "Option " + (heavyList.length + 1),
      // };
      // heavyList.push(newItem);
      return heavyList;
    },

    scrollTo(index) {
      virtualScroll.value.scrollTo(index);
      console.log("scrollTo", index);
    },

    scrollToEnd() {
      console.log("scrollToEnd()");
      const duration = 10;

      scrollArea.value.getScrollTarget().scrollTo({
        top: scrollArea.value.getScrollTarget().scrollHeight,
        behavior: "smooth",
        duration,
      });
    },

    addItem() {
      console.log("addItem()");
      this.scrollTo(heavyList.length);
      virtualScroll.value.refresh();

      const newItem = {
        label: "Option " + (heavyList.length + 1),
      };
      heavyList.push(newItem);

      virtualScroll.value.refresh();
      heavyListChanged = "changed";
      this.scrollTo(0);
      virtualScroll.value.refresh();
      this.scrollToEnd();
    },
  },

  watch: {
    heavyList: {
      handler(newValue) {
        // if (isMounted.value) {
        //   console.log("heavyList", newValue);
        //   this.scrollToEnd();
        // }
        console.log("heavyList", newValue);
      },
      immediate: true,
      deep: true,
    },

    heavyListChanged(newValue) {
      console.log("heavyListChanged", newValue);
      heavyListChanged = "";
    },

    "virtualScroll.items": {
      handler(newValue) {
        console.log("virtualScroll.items", newValue);
      },
      immediate: true,
      deep: true,
    },

    virtualScroll: {
      handler(newValue) {
        console.log("virtualScroll", newValue);
      },
      immediate: true,
      deep: true,
    },
  },

  setup() {
    for (let i = 0; i < maxSize; i++) {
      heavyList.push({
        label: "Option " + (i + 1),
      });
    }

    return {
      heavyList,
      virtualScroll,
      scrollArea,
    };
  },
};
</script>
