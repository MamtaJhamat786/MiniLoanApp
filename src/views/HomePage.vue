<template>
  <HeaderSection />
  <ContentSection />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderSection from '@/components/HeaderSection.vue';
import ContentSection from '@/components/ContentSection.vue';

export default defineComponent({
  name: 'HomePage',
  components: {
    HeaderSection,
    ContentSection,
  },
});
</script>
