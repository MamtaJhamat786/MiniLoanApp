<template>
  <div class="content-section">
    <!-- Bracket and Photo Section -->
    <div class="bracket-and-photo">
      <div class="content">
        <!-- Left Text (Bracket) -->
        <div class="text-in-bracket">
          <p class="text-product-name">Mini loan</p>
          <h1 class="heading-main">
            <span class="heading-italic">Take charge</span> of
            <br/>
            unexpected
            <br class="no-display"/>
            costs
          </h1>
          <p class="body-text">
            Finance unforeseen expenses with Inbank. A quick and easy application process with an instant credit decision.
          </p>
          <button class="btn-custom" @click="scrollToCalculator">Apply now</button>
        </div>

        <!-- Right Image (Photo) -->
        <div class="photo">
          <img
            src="@/assets/man_with_dog.jpeg"
            alt="Man with dog doing laundry"
            class="image"
          />
        </div>
      </div>
    </div>

    <!-- Calculator Section -->
    <div ref="loanCalculatorDiv">
      <LoanCalculator />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LoanCalculator from './LoanCalculator.vue';

export default defineComponent({
  name: 'ContentSection',
  components: {
    LoanCalculator,
  },
  setup() {
    // Reference to the DOM element inside LoanCalculator component
    const loanCalculatorDiv = ref<HTMLElement | null>(null);
    // Scroll to LoanCalculator component
    const scrollToCalculator = () => {
      if (loanCalculatorDiv.value) {
        // Scroll to the DOM element of LoanCalculator component
        loanCalculatorDiv.value.scrollIntoView({ behavior: 'smooth' });
      }
    };
    return {
      scrollToCalculator,
      loanCalculatorDiv,
    };
  },
});
</script>

<style scoped>

/* Bracket and Photo Section */
.bracket-and-photo {
  height: 935px;
  padding: 16px 40px 80px 40px;
}

.text-product-name {
  font-family: 'Inter', sans-serif; /* Custom font-family */
  font-weight: 500; /* Medium weight */
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #21093A;
  margin-bottom: 0;
}

.btn-custom {
  background-color: #f0f0ea;
  color: #21093a;
  width: 128px;
  height: 48px;
  border-radius: 100px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

/* Typography for Heading */
.heading-main {
  font-family: 'Bitter', serif;
  font-size: 68px;
  line-height: 72px;
  font-weight: 400;
  color: #21093a; /* Dark purple color */
  text-align: center;
}

.heading-italic {
  font-style: italic;
}

/* Body text for the last line */
.body-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #21093A;
}

.content {
  display: flex;
  justify-content: center;
  gap: 24px;
  height: 839px;
  width: -webkit-fill-available;
}

.text-in-bracket {
  background-color: #d9d4a7;
  border-radius: 200px;
  /* width: 592.84px; */
  height: 839px;
  padding: 80px 40px;
  gap: 16px;
  opacity: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Right Image (Photo) */
.photo {
  width: 839px;
  height: 839px;
  border-radius: 200px 0px 0px 0px;
}
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 200px;
}

/* Media Queries for Small Screens */
@media (max-width: 768px) {
  .content {
    flex-direction: column-reverse;
    height: 816px;
  }
  .wrap{
    flex-direction: column
  }
  .photo{
    width: 100%;
    /* width: 328px; */
    height: 328px;
    gap: 0px;
    border: 1px 0px 0px 0px;
  }
  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100px;
  }
  .text-in-bracket {
    /* width: 328px; */
    height: 416px;
    padding: 64px 24px;
    gap: 8px;
    gap: 24px;
    border-radius: 100px;
  }
  .body-text {
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 0;
  }
  .heading-main{
    font-family: 'Bitter';
    font-size: 32px;
    font-weight: 400;
    line-height: 36px;
    text-align: center;
    margin-bottom: 0;
  }
  .no-display{
    display: none;
  }
}

</style>
