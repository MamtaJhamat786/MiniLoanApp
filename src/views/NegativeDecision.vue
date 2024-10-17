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
import { useStore } from 'vuex';

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
.negative-decision {
  display: flex;
  flex-direction: column;
  align-items: center; 
  height: 100vh;
  background-color: #f7f7f7;
  gap: 40px;
}
.text-container{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: 792px; 
  height: 450px;
  gap: 40px;
  border-radius: 20px;
  opacity: 0px;
}

.title {
  font-family: 'Bitter', serif;
  font-size: 48px;
  font-weight: 400;
  line-height: 56px;
  color: #21093A;
}

.italic {
  font-style: italic;
}

.regular {
  font-style: normal;
}

.subtitle {
  font-family: 'Bitter', serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #21093A;
}
.divider {
  width: 100%;
  border: 0;
  border-top: 1px solid #21093a;
  margin: 10px 0;
}

.description {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #21093A;
  text-align: center; 
  max-width: 450px; 
  width: 384px;
  height: 40px;
  margin: 0 auto;
}

.exit-btn {
  background-color: #AA93FF;
  color: white;
  width: 100%;
  max-width: 300px;
  height: 48px;
  padding: 12px;
  border: none;
  border-radius: 100px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  color: #21093A;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}

.exit-btn:hover {
  background-color: #BBA8FF;
}
.exit-btn.focused:focus {
  background-color: #BBA8FF;
}

.exit-btn.pressed:active {
  background-color: #9F85FF;
  transform: translateY(2px);
}
.exit-btn.enabled {
  background-color: #AA93FF;
}

/* Mobile Styles */
@media (max-width: 600px) {
  .negative-decision {
    background: white;
  }

  /* Description */
  .description {
    width: 260px;
    text-align: center;
    opacity: 75%;
    height: 60px;
    margin: 0 auto; 
  }

  .content {
    padding: 30px;
    box-shadow: none;
    max-width: 90%;
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
