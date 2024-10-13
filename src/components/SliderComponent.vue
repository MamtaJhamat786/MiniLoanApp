<template>
  <div class="slider-container">
    <label>{{ minLabel }} {{ modelValue }} {{ maxLabel }}</label>
    <input
      type="range"
      :min="min"
      :max="max"
      :value="modelValue"
      @input="updateValue"
    />
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
