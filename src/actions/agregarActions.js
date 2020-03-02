export const CREATE_LOAN = 'CREATE_LOAN';
export const CREATE_LOAN_ERROR = 'CREATE_LOAN_ERROR';
export const CREATE_LOAN_SUCCESS = 'CREATE_LOAN_SUCCESS';

export function createLoan() {
  return () => {
    console.log('cretae loan action');
  };
}
