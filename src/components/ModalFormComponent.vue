<template>
  <div class="modal-overlay" v-if="show">
    <div class="modal-content">
      <h2>Personal Details</h2>

      <!-- Close Button -->
      <button class="modal-close" @click="$emit('close')">X</button>

      <form @submit.prevent="submitForm" class="modal-form">
        <!-- First Name Field -->
        <div class="form-group">
          <label for="firstName">First name</label>
          <input
            type="text"
            v-model="localForm.firstName"
            id="firstName"
          />
          <span v-if="validationErrors?.firstName" class="error">{{ validationErrors.firstName }}</span>
        </div>

        <!-- Last Name Field -->
        <div class="form-group">
          <label for="lastName">Last name</label>
          <input
            type="text"
            v-model="localForm.lastName"
            id="lastName"
          />
          <span v-if="validationErrors?.lastName" class="error">{{ validationErrors.lastName }}</span>
        </div>

        <!-- Mobile Number Field -->
        <div class="form-group">
          <label for="mobileNumber">Mobile number</label>
          <input
            type="text"
            v-model="localForm.mobileNumber"
            id="mobileNumber"
          />
          <span v-if="validationErrors?.mobileNumber" class="error">{{ validationErrors.mobileNumber }}</span>
        </div>

        <!-- Email Field -->
        <div class="form-group">
          <label for="email">E-mail</label>
          <input
            type="email"
            v-model="localForm.email"
            id="email"
          />
          <span v-if="validationErrors?.email" class="error">{{ validationErrors.email }}</span>
        </div>

        <!-- Monthly Income Field -->
        <div class="form-group">
          <label for="monthlyIncome">Monthly income</label>
          <input
            type="number"
            v-model="localForm.monthlyIncome"
            id="monthlyIncome"
          />
          <span v-if="validationErrors?.monthlyIncome" class="error">{{ validationErrors.monthlyIncome }}</span>
        </div>

        <button type="submit" class="submit-btn">Submit</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';
import { PersonalDetails } from '@/store/types'; // Import the type for form

export default defineComponent({
  name: 'ModalFormComponent',
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    form: {
      type: Object as () => PersonalDetails,
      required: true,
    },
    validationErrors: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    // Create a reactive local copy of form
    const localForm = reactive({ ...props.form });

    // Watch for changes in the parent form prop and sync them to localForm
    watch(
      () => props.form,
      (newForm) => {
        Object.assign(localForm, newForm); // Safely update localForm
      },
      { deep: true }
    );

    // Submit form method
    function submitForm() {
      emit('submit', { ...localForm }); // Emit updated form data
    }

    return {
      localForm,
      submitForm,
    };
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.modal-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-group input:focus {
  border-color: #7e57c2;
}

.error {
  color: red;
  font-size: 12px;
}

.submit-btn {
  background-color: #7e57c2;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #5c41a0;
}
</style>
