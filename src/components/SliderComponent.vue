<template>
  <div class="slider-container flex-col align-center gap-10">
    <!--<label>{{ minLabel }} {{ modelValue }} {{ maxLabel }}</label>-->
    <input
      class="full-width"
      type="range"
      :min="min"
      :max="max"
      :value="modelValue"
      @input="updateValue"
    />
    <div class="flex-row full-width justify-between align-center">
      <p class="mb-0">{{min}} {{ minLabel }}</p>
      <p class="mb-0">{{max}} {{ maxLabel }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SliderComponent',
  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    modelValue: {  // Using modelValue for v-model
      type: Number,
      required: true,
    },
    minLabel: {
      type: String,
      default: '',
    },
    maxLabel: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  methods: {
    // Method to update value and emit the event
    updateValue(event: Event) {
      const value = (event.target as HTMLInputElement).value;
      this.$emit('update:modelValue', Number(value));  // Emit the value as a number
    },
  },
});
</script>

<style scoped>
  .slider-container{
    /* width: 503.5px; */
    width: 100%;
    height: 36px;
  }
  .align-center{
    align-items: center;
  }
  .gap-10{
    gap: 10px;
  }
  .full-width{
    width: 100%
  }
  .flex-row{
    display: flex;
    flex-direction: row;
  }
  .flex-col{
    display: flex;
    flex-direction: column;
  }
  .justify-between{
    justify-content: space-between;
  }
</style>