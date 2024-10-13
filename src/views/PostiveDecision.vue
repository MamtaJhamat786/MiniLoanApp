<template>
  <div class="positive-decision">
    <HeaderSection />

    <div class="content">
      <!-- Left side image -->
      <div class="image-container">
        <img src="@/assets/success_image.png" alt="Loan approved image" />
      </div>
      <!-- Right side content -->
      <div class="text-container">
        <h2 class="heading">
          <i>Good</i> news!
        </h2>
        <p>Your loan has been approved.</p>
        <!-- Loan Details -->
        <table class="loan-details">
          <tbody>
            <tr class="divider">
              <td colspan="2"></td> <!-- Divider row -->
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

        <!-- Back button -->
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
/* Main container */
.positive-decision {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
}

/* HeaderComponent styles */
/* Adjust HeaderComponent styles separately if necessary */
.content {
  display: flex;              
  justify-content: space-between;
  align-items: center;          
  width: 100%;                    
  padding: 20px;                  
}

.image-container,
.text-container {
  flex: 1;                    
  width: 50%;                   
  padding: 20px;               
}
.image-container{
  background: #F0F0EA;

}
.image-container img {
  max-width: 100%;            
  height: auto;            
}

.text-container {
  padding-left: 40px;    
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
  border-collapse: collapse;  /* Merge table cells borders */
}

.loan-details td {
  padding: 15px 10px;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
}
.loan-details .divider td {
  padding: 0;
  border-bottom: 1px solid #e0e0e0;  
  height: 1px;  
}
/* Back button */
.back-btn {
  display: inline-block;
  padding: 12px 24px;
  background-color: #c09df3;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #a583d0;
}
</style>
