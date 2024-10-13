
export interface PersonalDetails {
    firstName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    monthlyIncome: number | null;
 
}
export interface LoanState {
    loanAmount: number;
    loanPeriod: number;
    monthlyPayment: number;
    personalDetails: PersonalDetails
  }
  
  export interface Mutations {
    SET_LOAN_DETAILS: (state: LoanState, payload: { loanAmount: number; loanPeriod: number; monthlyPayment: number }) => void;
    SET_PERSONAL_DETAILS: (state: LoanState, payload: { firstName: string; lastName: string; mobileNumber: string; email: string; monthlyIncome: number }) => void;
  }