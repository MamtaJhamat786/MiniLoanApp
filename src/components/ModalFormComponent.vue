<template>
  <div class="modal-overlay" v-if="show">
      <div class="modal-content">
        <div class="header">
          <p class="personal-details">Personal details</p>
          <button class="modal-close" @click="$emit('close')">&times;</button>
        </div>
        <form @submit.prevent="submitForm" class="modal-form">
          <div class="content">
            <input
              class="form-input"
              placeholder="First name"
              type="text"
              v-model="localForm.firstName"
              id="firstName"
            />
            <span v-if="validationErrors?.firstName" class="error">{{ validationErrors.firstName }}</span>
            <input
              class="form-input"
              placeholder="Last name"
              type="text"
              v-model="localForm.lastName"
              id="lastName"
            />
            <span v-if="validationErrors?.lastName" class="error">{{ validationErrors.lastName }}</span>
            <input
              class="form-input"
              placeholder="Mobile number"
              type="text"
              v-model="localForm.mobileNumber"
              id="mobileNumber"
            />
            <span v-if="validationErrors?.mobileNumber" class="error">{{ validationErrors.mobileNumber }}</span>
            <input
              class="form-input"
              placeholder="Email"
              type="email"
              v-model="localForm.email"
              id="email"
            />
            <span v-if="validationErrors?.email" class="error">{{ validationErrors.email }}</span>
            <input
              class="form-input"
              placeholder="Monthly income"
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
.header{
  display: flex; 
  justify-content: space-between;
  align-items: center;
}
.modal-close{
  background: none;
  border: none;
  width: 24px;
  height: 24px;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  color: #333;
  padding: 0;
}

.modal-content {
  background-color: #FFFFFF;
  position: relative;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 540px;
  padding: 40px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  opacity: 0px;
}
.personal-details{
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  text-align: left;
  margin-bottom: 0;
  color: #21093A;
}

.content{
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-form {
  display: flex;
  flex-direction: column;
}

.form-input {
  height: 48px;
  border-radius: 8px;
  opacity: 0px;
  border: 1px solid #DEDEDE;
  padding: 4px 16px;
}

.error {
  color: red;
  font-size: 12px;
  padding: 0 16px
}

.submit-btn {
  width: 460px;
  height: 48px;
  gap: 8px;
  border-radius: 100px;
  opacity: 0px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-align: center;
  background-color: #AA93FF;
  color: #21093A;
  border: none;
  margin-top: 24px;

}

.submit-btn:hover {
  background-color: #5c41a0;
}
/* Media Queries for Small Screens */
@media (max-width: 768px) {
  .modal-content{
    width: 100%;
    position: absolute;
    bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .submit-btn {
    width: 100%;
  }
}
</style>

