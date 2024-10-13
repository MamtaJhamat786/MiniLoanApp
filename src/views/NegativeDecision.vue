<template>
  <div class="negative-decision">
    <HeaderSection />
    <div class="content">
      <div class="text-container">
        <h2 class="title">
          <span class="italic">Dear </span>
          <span class="regular"> {{ customerName }}</span>
        </h2>
        <p class="subtitle">Unfortunately, your loan was denied.</p>
      </div>
      <div>
        <hr class="divider" />
        <p class="description">
          In addition to your income and expenses, a number of other factors play a role in loan decisions.
        </p>
        <hr class="divider" />
      </div>
      <router-link to="/" class="exit-btn" @click="exit">Exit</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import HeaderSection from "@/components/HeaderSection.vue";
import { defineComponent, computed } from 'vue';
import { LoanState } from '@/store/types';
import { useStore } from 'vuex'; // Import useStore for Vuex integration

export default defineComponent({
  name: "NegativeDecision",
  components: {
    HeaderSection,
  },
  props: {
    userName: {
      type: String,
      required: true,
    },
  },
  setup() {
    const store = useStore<LoanState>();
    // Use computed properties to get the Vuex state values
    const customerName = computed(() => store.state.personalDetails.firstName);

    return { customerName };
  },
});
</script>

<style scoped>
/* Main container */
.negative-decision {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
}

/* Content */
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
}

/* Title */
.title {
  font-family: 'Bitter', serif;
  font-size: 28px; /* Adjust font size for mobile */
  font-weight: 400;
  line-height: 36px;
  text-align: center;
  color: #21093a;
  margin-bottom: 10px;
}

.italic {
  font-style: italic;
}

.regular {
  font-style: normal;
}

/* Subtitle */
.subtitle {
  font-family: 'Bitter', serif;
  font-size: 18px;
  font-weight: 400;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

/* Divider */
.divider {
  width: 100%;
  border: 0;
  border-top: 1px solid #21093a;
  margin: 10px 0;
}

/* Description */
.description {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Exit Button */
.exit-btn {
  background-color: #aa93ff;
  color: white;
  width: 100%;
  max-width: 300px;
  height: 48px;
  padding: 12px;
  border: none;
  border-radius: 100px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}

.exit-btn:hover {
  background-color: #a583d0;
}

@media (max-width: 600px) {
  .content {
    padding: 30px;
    box-shadow: none;
  }

  .title {
    font-size: 24px;
    line-height: 32px;
  }

  .subtitle {
    font-size: 16px;
  }

  .exit-btn {
    max-width: 280px;
    font-size: 14px;
  }
}
</style>
