// store/index.ts

import { createStore, ActionContext } from 'vuex';
import { LoanState, Mutations } from './types';

const state: LoanState = {
  loanAmount: 0,
  loanPeriod: 0,
  monthlyPayment: 0,
  personalDetails: {
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    monthlyIncome: null,
  },
};

// AugmentedActionContext type to allow multiple mutations
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<LoanState, LoanState>, 'commit'>;

const mutations = {
  SET_LOAN_DETAILS(state: LoanState, payload: { loanAmount: number; loanPeriod: number; monthlyPayment: number }) {
    state.loanAmount = payload.loanAmount;
    state.loanPeriod = payload.loanPeriod;
    state.monthlyPayment = payload.monthlyPayment;
  },
  SET_PERSONAL_DETAILS(state: LoanState, payload: { firstName: string; lastName: string; mobileNumber: string; email: string; monthlyIncome: number }) {
    state.personalDetails = payload;
  },
};


const actions = {
  applyLoanDetails({ commit } :AugmentedActionContext, payload: { loanAmount: number; loanPeriod: number; monthlyPayment: number }) {
    commit('SET_LOAN_DETAILS', payload);
  },
  applyPersonalDetails({ commit }: AugmentedActionContext, payload: { firstName: string; lastName: string; mobileNumber: string; email: string; monthlyIncome: number }) {
    commit('SET_PERSONAL_DETAILS', payload);
  },
};

export const store = createStore({
  state,
  mutations,
  actions,
});

export default store;
