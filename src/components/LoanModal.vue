<template>
  <div class="modal-backdrop" @click.self="closeModal">
    <div class="modal-content">
      <button class="close" @click="closeModal">x</button>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoanModal',
  emits: ['close'],
  setup(_, { emit }) {
    const closeModal = () => {
      emit('close');
    };

    return { closeModal };
  },
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
}
</style>
