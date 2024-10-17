<template>
  <div class="positive-decision">
    <HeaderSection />
    <div class="content">
      <div class="image-container">
        <div class="inner-box">
          <img src="@/assets/success_image.png" alt="Loan approved image" />
        </div>
      </div>
       <div class="text-container">
          <h2 class="heading">
            <i>Good</i> news!
        </h2>
        <p>Your loan has been approved.</p>
        <table class="loan-details">
          <tbody>
            <tr class="divider">
              <td colspan="2"></td>
            </tr>
            <tr>
              <td>Loan amount</td>
              <td>{{ loanAmount }} €</td>
            </tr>
            <tr class="divider">
              <td colspan="2"></td>
            </tr>
            <tr>
              <td>Loan period</td>
              <td>{{ loanPeriod }} months</td>
            </tr>
            <tr class="divider">
              <td colspan="2"></td>
            </tr>
            <tr>
              <td>Monthly payment</td>
              <td>{{ monthlyPayment }} €</td>
            </tr>
          </tbody>
        </table>
        <router-link to="/" class="back-btn">
            Back to home page
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import HeaderSection from "@/components/HeaderSection.vue";
import { LoanState } from '@/store/types';

export default defineComponent ({
  name: "PositiveDecision",
  components: {
    HeaderSection,
  },
  setup() {
    const store = useStore<LoanState>();
    // Use computed properties to get the Vuex state values
    const loanAmount = computed(() => store.state.loanAmount);
    const loanPeriod = computed(() => store.state.loanPeriod);
    const monthlyPayment = computed(() => store.state.monthlyPayment);    
    return {
      loanAmount,
      loanPeriod,
      monthlyPayment,
    };
  },
});

</script>

<style scoped>

.positive-decision {
  display: flex;
  align-items: center; 
  min-height: 100vh; 
  flex-direction: column;
}

/* Content */
.content {
  display: flex;
  margin-top: 40px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 80%; 
  max-width: 1200px;
  background-color: #fff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

.image-container {
  background: #F0F0EA;
  margin: 2px;
  width: 50%;
  height: 680px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.inner-box{
  top: 80px;
  left: 60px;
  position: relative;
}
.image-container img {
  width: 100%;          
  height: auto;         
  max-width: 600px; 
  display: block;      
  margin: 0 auto;       
}

.text-container {
  display: flex; 
  width: 50%;
  flex: 1;
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  padding: 40px 32px 40px 44px;
}

.text-container h2 {
  font-family: Bitter;
  font-size: 48px;
  font-weight: 400;
  line-height: 56px;
  text-align: center;
  margin-bottom: 16px; 
}

.text-container p {
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  margin-bottom: 32px; 
}


.text-container h2 {
  font-family: Bitter;
  font-size: 48px;
  font-weight: 400;
  line-height: 56px;
  text-align: center;
}

.text-container p {
  font-family: Inter;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
}

.loan-details {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  max-width: 384px;
}

.loan-details td {
  padding: 12px;
  font-family: 'Inter', sans-serif;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #21093A;
  text-align: left;

}

.loan-details .divider td {
  padding: 0;
  border-bottom: 1px solid #e0e0e0;
  height: 1px;
}

.back-btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #AA93FF;
  color: #21093A;
  text-align: center;
  text-decoration: none;
  width: 100%;
  max-width: 384px; 
  height: 48px;
  font-size: 18px; 
  border-radius: 100px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
}
.back-btn:hover {
  background-color: #BBA8FF;
}
.back-btn.focused:focus {
  background-color: #BBA8FF;
}

.back-btn.pressed:active {
  background-color: #9F85FF;
  transform: translateY(2px);
}

.back-btn.enabled {
  background-color: #AA93FF;
}


@media (max-width: 768px) {
  .positive-decision {
    background: white
  }
  .content {
    flex-direction: column !important; 
    text-align: center !important; 
    padding: 20px;
    align-items: center;
    justify-content: center;
    box-shadow: none !important;
    gap: 24px;
  }
  .image-container{
    width: 240px !important;
    height: 240px !important;
    display: flex !important;
    text-align: center !important;
    border-radius: 80px !important;
  }
  .text-container h2 {
    font-family: 'Bitter';
    text-align: center;
    font-size: 32px;
    font-weight: 400;
    line-height: 36px;
    text-align: center;
  }

  .inner-box{
    display: flex !important;
    width: 100% !important;
    justify-content: center !important;
    align-items: center !important;
    top: 0px;
    left: 0px;
  }
  .inner-box img{
    width: 160px !important;
    height: 150.72px !important;
    left: 0 !important
  }
  .text-container {
    padding: 0;
    width: 100%;
  }

  .loan-details {
    max-width: 100%; 
  }

  .back-btn {
    width: 100%;
  }
}

</style>
