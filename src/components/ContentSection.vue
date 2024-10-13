<template>
  <div class="content-section">
    <!-- Bracket and Photo Section -->
    <div class="bracket-and-photo">
      <div class="content">
        <!-- Left Text (Bracket) -->
        <div class="text-in-bracket">
          <p class="text-product-name">Mini loan</p>
          <h1 class="heading-main">
            <span class="heading-italic">Take charge of</span> unexpected costs
          </h1>
          <p class="body-text">
            Finance unforeseen expenses with Inbank. A quick and easy application process with an instant credit decision.
          </p>
          <button class="btn-custom">Apply now</button>
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
    <LoanCalculator />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoanCalculator from './LoanCalculator.vue';

export default defineComponent({
  name: 'ContentSection',
  components: {
    LoanCalculator,
  },
});
</script>

<style scoped>
.content-section {
  max-width: 1536px;
  margin: 0 auto;
}

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
  margin-bottom: 10px;
  color: black;
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

/* Body text for the last line */
.body-text {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #21093a;
  opacity: 0.9; /* 90% opacity */
}

.heading-italic {
  font-style: italic;
}

.content {
  display: flex;
  gap: 24px;
}

.text-in-bracket {
  background-color: #d9d4a7;
  border-radius: 200px;
  width: 593px;
  height: 839px;
  padding: 80px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

/* Right Image (Photo) */
.photo {
  width: 593px;
  height: 839px;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 200px;
}
</style>
