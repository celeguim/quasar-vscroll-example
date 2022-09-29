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
      style="height: calc(100vh - 100px); overflow-x: hidden"
      :virtual-scroll-item-size="20"
    >
      <q-virtual-scroll
        ref="virtualScroll"
        :items-size="size"
        :items-fn="getItems"
        separator
        v-slot="{ item, index }"
        scroll-target="virtual-scroll-area > .scroll"
      >
        <async-component
          :key="index"
          :index="item.index"
          :sent="item.sent"
        ></async-component>
      </q-virtual-scroll>
    </q-scroll-area>
  </div>
</template>

<script>
import { QChatMessage, QSkeleton } from "quasar";
import { h, defineComponent, ref, onBeforeMount, onBeforeUnmount } from "vue";

const virtualScroll = ref();
const scrollArea = ref();

const AsyncComponent = defineComponent({
  props: {
    index: Number,
    sent: Boolean,
  },

  setup(props) {
    const asyncContent = ref(null);

    let timer;

    onBeforeMount(() => {
      timer = setTimeout(() => {
        asyncContent.value = {
          sent: props.sent,
          name: props.sent === true ? "me" : "Someone else",
          avatar:
            props.sent === true
              ? "https://cdn.quasar.dev/img/avatar4.jpg"
              : "https://cdn.quasar.dev/img/avatar3.jpg",
          stamp: `${Math.floor(props.index / 1000)} minutes ago`,
          text: [`Message with id ${props.index}`],
        };
      }, 300 + Math.random() * 2000);
    });

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });

    return () => {
      if (asyncContent.value === Object(asyncContent.value)) {
        return h(QChatMessage, {
          class: "q-mx-sm",
          key: props.index,
          ...asyncContent.value,
        });
      }

      const content = [
        h(QSkeleton, {
          class: "on-left on-right",
          animation: "none",
          type: "text",
          width: "150px",
          height: "100px",
        }),
      ];

      content[props.sent === true ? "push" : "unshift"](
        h(QSkeleton, {
          animation: "none",
          type: "QAvatar",
        })
      );

      return h(
        "div",
        {
          class: `row no-wrap items-center q-mx-sm justify-${
            props.sent === true ? "end" : "start"
          }`,
          style: "height: 78px",
          key: props.index,
        },
        content
      );
    };
  },
});

const size = ref(8);
const allItems = Array(size.value)
  .fill(null)
  .map((_, index) => ({
    index,
    sent: Math.random() > 0.5,
  }));

export default {
  components: {
    AsyncComponent,
  },

  watch: {
    size(newSize) {
      console.log("size changed", newSize);
    },
  },

  mounted() {
    setTimeout(() => this.scrollToEnd(), 1000);

    console.log("mounted");
  },

  updated() {
    this.scrollToEnd();
    console.log("updated");
  },

  activated() {
    this.scrollToEnd();
    console.log("activated");
  },

  methods: {
    addItem() {
      size.value++;
      allItems.push({
        index: size.value - 1,
        sent: Math.random() > 0.5,
      });

      //debugger;
      this.scrollToEnd();
    },

    scrollTo(index) {
      console.log("scrollTo", index);
      virtualScroll.value.scrollTo(index);
    },

    scrollToEnd() {
      console.log("scrollToEnd()");

      const duration = 0;

      setTimeout(() => {
        scrollArea.value.getScrollTarget().scrollTo({
          top: scrollArea.value.getScrollTarget().scrollHeight,
          behavior: "smooth",
          duration,
        });
      }, 1000);
    },

    getItems(from, size) {
      const items = [];

      for (let i = 0; i < size; i++) {
        items.push(allItems[from + i]);
      }

      return Object.freeze(items);
    },
  },

  setup() {
    return {
      size,
      virtualScroll,
      scrollArea,
    };
  },
};
</script>
