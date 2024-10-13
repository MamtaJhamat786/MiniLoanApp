<template>
  <div class="calculator-section">
    <!-- Left Side: Title and Description -->
    <div class="calculator-left">
      <h1 class="calculator-title">Calculate</h1>
      <h2 class="calculator-subtitle">
        <span class="heading-italic">your monthly</span> <br />
        payment
      </h2>
      <p class="calculator-description">
        Estimate your monthly payments based on the chosen loan amount and time period.
      </p>
    </div>

    <!-- Divider -->
    <div class="divider"></div>
    
    <!-- Right Side: Sliders and Calculations -->
    <div class="calculator-right">
      <SliderComponent
        :min="300"
        :max="7200"
        v-model="amount"   
        minLabel="€"
        maxLabel="€"
      />
      <input type="number" v-model="amount" />

      <SliderComponent
        :min="2"
        :max="72"
        v-model="period"   
        minLabel="months"
        maxLabel="months"
      />
      <select v-model="period">
        <option v-for="month in 72" :key="month" :value="month">{{ month }} months</option>
      </select>

      <!-- Monthly Payment -->
      <div class="monthly-payment">
        <h2>Monthly payment</h2>
        <p>{{ monthlyPayment }} €</p>
      </div>

      <!-- Apply Now Button to trigger modal -->
      <button class="btn-custom" @click="applyNow">Apply now</button>
    </div>
    <!-- Modal Component -->
    <ModalFormComponent
      :show="showModal"
      :form="form"
      :validationErrors="validationErrors"
      @submit="handleFormSubmit"
      @close="closeModal"
    />
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
  name: 'CalculatorComponent',
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1536px;
  margin: 0 auto;
  padding: 40px;
  background-color: #e3d2ff;
}

/* Left side (Text) */
.calculator-left {
  width: 50%;
  text-align: center; /* Center all text */
  padding-right: 40px;
}

.calculator-title {
  font-family: 'Bitter', serif;
  font-size: 68px;
  line-height: 72px;
  font-weight: 400;
  color: #21093a;
  margin-bottom: 10px;
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

.calculator-description {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #21093a;
  opacity: 0.9;
}

/* Divider */
.divider {
  width: 1px;
  height: 100%; /* Full height divider */
  background-color: #21093a;
  margin: 0 40px;
}

/* Right side (Sliders and Calculations) */
.calculator-right {
  width: 50%;
}

.amount-slider, .period-slider {
  margin-bottom: 20px;
}

.amount-slider label, .period-slider label {
  display: block;
  font-size: 16px;
  color: #21093a;
  margin-bottom: 5px;
}

input[type="range"] {
  width: 100%;
}

.monthly-payment h2 {
  font-family: 'Bitter', serif;
  font-size: 48px;
  color: #21093a;
}

.monthly-payment p {
  font-family: 'Bitter', serif;
  font-size: 68px;
  color: #21093a;
}

.btn-custom {
  background-color: #7e57c2;
  color: white;
  width: 128px;
  height: 48px;
  border-radius: 100px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s ease;
}

.btn-custom:hover {
  background-color: #5c41a0;
}
</style>
