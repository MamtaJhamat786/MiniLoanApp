<template>
  <div class="calculator-section">
    <!-- Left Side: Title and Description -->
    <div class="wrap">
      <div class="text-in-bracket flex-1 main-box">
        <div class="title-description">
          <h1 class="calculator-title">Calculate
            <br/>
            your
            <span class="heading-italic"> monthly</span> <br />
            <span class="heading-italic">payment</span>
          </h1>
          <p class="calculator-description">
            Estimate your monthly payments based on the chosen loan amount and time period.
          </p>
        </div>
      </div>
      <div class="divider"></div>
      <div class="calculator flex-1 main-box flex-col">
        <div class="amount-period flex flex-col">
          <div class="select-amount full-width-select-amount-period justify-center align-center flex">
            <SliderComponent
              :min="300"
              :max="7200"
              v-model="amount"   
              minLabel="€"
              maxLabel="€"
            />
            <input class="amount-input" type="number" v-model="amount" /> 
          </div>
          <div class="full-width-select-amount-period flex flex">
            <SliderComponent
              :min="2"
              :max="72"
              v-model="period"   
              minLabel="months"
              maxLabel="months"
            />
            <select class="select-period" v-model="period">
              <option v-for="month in 72" :key="month" :value="month">{{ month }} months</option>
            </select>
          </div>
        </div>
        <div class="monthly-payment-calculations-desc">
          <div class="monthly-payment">
            <div class="payment-info">
              <p class="user-monthly-pmt">Monthly payment</p>
              <h1 class="amount">{{ monthlyPayment }} €</h1>
            </div>
            <button class="apply-loan-btn">
              Apply now
            </button>
          </div>
          <ModalFormComponent
            :show="showModal"
            :form="form"
            :validationErrors="validationErrors"
            @submit="handleFormSubmit"
            @close="closeModal"
          />
          <div class="extra-desc">
            The calculation is approximate and may differ from the conditions offered to you. Please submit a loan application to receive a personal offer. Financial services are provided by AS Inbank Finance.
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import ModalFormComponent from './ModalFormComponent.vue';
import SliderComponent from './SliderComponent.vue';
import { PersonalDetails } from '@/store/types'; // Assuming you have this type defined

export default defineComponent({
  name: 'LoanCalculator',
  components: {
    SliderComponent,
    ModalFormComponent,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    // Reactive data for loan amount, period, and modal visibility
    const amount = ref(500); // Default amount
    const period = ref(48); // Default period
    const showModal = ref(false); // Modal visibility

    // Form data and validation errors
    const form = ref<PersonalDetails>({
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      monthlyIncome: null,
    });
    const validationErrors = ref<Record<string, string>>({}); // Type the errors object as a string key-value map

    // Computed property for monthly payment
    const monthlyPayment = computed(() => {
      return (amount.value / period.value).toFixed(2);
    });

    // Method to open the modal
    const openModal = () => {
      showModal.value = true;
    };

    // Method to close the modal
    const closeModal = () => {
      showModal.value = false;
    };

    // Method to apply loan details and open the modal
    const applyNow = () => {
      store.dispatch('applyLoanDetails', {
        loanAmount: amount.value,
        loanPeriod: period.value,
        monthlyPayment: parseFloat(monthlyPayment.value),
      });
      openModal();
    };

    // Form validation logic
    const validateForm = (): boolean => {
      let isValid = true;
      const errors: Record<string, string> = {}; // Errors object with string keys and values

      // Validation rules
      const validations: Record<string, { rule: () => boolean; errorMessage: string }> = {
        firstName: {
          rule: () => form.value.firstName.trim() !== '',
          errorMessage: 'First name is required.',
        },
        lastName: {
          rule: () => form.value.lastName.trim() !== '',
          errorMessage: 'Last name is required.',
        },
        mobileNumber: {
          rule: () => {
            const processedNumber = form.value.mobileNumber.replace(/[\s\-()]/g, '');
            return /^55\d{5,6}$/.test(processedNumber);
          },
          errorMessage: 'Mobile number must start with 55 and have 7 or 8 digits.',
        },
        email: {
          rule: () => /\S+@\S+\.\S+/.test(form.value.email),
          errorMessage: 'A valid email is required.',
        },
        monthlyIncome: {
          rule: () => form.value.monthlyIncome !== null && form.value.monthlyIncome > 100,
          errorMessage: 'Monthly income must be greater than 100.',
        },
      };

      // Loop over validations and check each rule
      for (const field in validations) {
        const { rule, errorMessage } = validations[field];
        if (!rule()) {
          errors[field] = errorMessage;
          isValid = false;
        }
      }

      // Update validation errors
      validationErrors.value = errors;

      return isValid; // Return true if the form is valid, false otherwise
    };

    // Handle form submission from ModalFormComponent
    const handleFormSubmit = (formData: PersonalDetails) => {
      // Safely update the form object
      Object.assign(form.value, formData);

      // Check if the form is valid
      if (validateForm()) {
        store.dispatch('applyPersonalDetails', form.value);
        closeModal();
        // Redirect based on monthly income
        if (form.value.monthlyIncome! > 1000) {
          router.push('/success');
        } else {
          router.push('/negative');
        }
      }
    };

    return {
      amount,
      period,
      showModal,
      form,
      validationErrors,
      monthlyPayment,
      openModal,
      closeModal,
      applyNow,
      handleFormSubmit,
    };
  },
});

</script>


<style scoped>

/* Main container for the section */
.calculator-section {
  height: 584px;
  background-color: #E3D2FF;
}
.wrap{
  display: flex;
  height: 584px;
  padding: 80px 40px 80px 40px;
  gap: 40px;
}
.flex{
  display: flex;
}
.flex-row{
  flex-direction: row;
}
.flex-col{
  flex-direction: column;
}
.justify-center{
  justify-content: center;
}
.align-center{
  align-items: center;
}
.full-width-select-amount-period{
  gap: 24px;
  width: 687.5px;
}
.main-box{
  height: 424px;
}
.amount-period{
  gap: 40px;
}
.flex-1{
  flex: 1;
}
.amount-input {
  width: 160px; 
  height: 48px;
  border-radius: 8px;
  border: 1px solid #6037BB; 
  padding-left: 10px;
  color: #21093A;
  background-color: #fff; 
}
.select-period{
  width:  160px;
  height: 48px;
  max-width: 288px;
  border-radius: 8px;
  border: 1px solid #60378B;
  color: #21093A;
}

.amount-input:focus {
  box-shadow: none; 
  border-color: #6037BB;
}

.text-in-bracket{
  padding: 0px 40px 0px 40px;
}
.title-description{
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
}
.calculator-title {
  font-family: 'Bitter';
  font-size: 68px;
  font-weight: 400;
  line-height: 72px;
  text-align: center;
}
.heading-italic{
  font-style: italic;
}

.calculator-description {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #21093a;
  opacity: 0.9;
}
.calculator{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}
.monthly-payment{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.payment-info{
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px
}
.monthly-payment-calculations-desc{
  display: flex; 
  flex-direction: column;
  gap: 24px;
  height: 232px;
}

.amount{
  font-family: 'Bitter';
  font-size: 68px;
  font-weight: 400;
  line-height: 72px;
  text-align: center;
}
.user-monthly-pmt{
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 0;
}
.apply-loan-btn{
  width: 128px;
  height: 48px;
  background: #AA93FF;
  color:  #21093A;
  border-radius: 100px;
  font-family: 'Inter';
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  border: transparent;
}
.extra-desc{
  font-family: 'Inter';
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  color: #21093A;

}

.calculator-subtitle {
  font-family: 'Bitter', serif;
  font-size: 68px;
  line-height: 72px;
  font-weight: 400;
  color: #21093a;
  font-style: italic;
  margin-bottom: 20px;
}
/* Divider */
.divider {
  width: 1px;
  height: 100%; /* Full height divider */
  background-color: #21093a;
  margin: 0 40px;
}

</style>
