<script>
export default {
  name: 'FeaturedSingle',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <div class="flex gap-4 items-start">
    <!-- Replace this div with your actual icon rendering logic if you have an image or icon -->
    <div class="mt-1 bg-black rounded-full p-2 w-8 h-8 shrink-0 flex items-end justify-center">
      <i :class="`fas text-white ${item.icon}`"></i>
    </div>
    <div>
      <!-- Access the title and description from the item prop -->
      <h3 class="font-semibold text-lg">{{ item.title }}</h3>
      <p class="text-slate-500 mt-2 leading-relaxed">{{ item.discription }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Add any styles you need */
</style>
