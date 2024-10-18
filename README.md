# Mini Loan App
Welcome to Mini loan App! This application provides a user-friendly interface to apply for a loan type or slide amount and put some period for which you wanna apply. After putting this information, you will be asked to provide the information that is needed to apply for loan such First name, Last name, Mobile, Email and Monthly income. Based on monthly income, decision will be made if you will get loan or not.
## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Node.js: You need Node.js installed. Download it from https://nodejs.org/en.
Vue CLI: Install the Vue CLI globally if you don't have it already using npm install -g @vue/cli

### Installation

1. Clone the repository to your local machine:

   git clone https://github.com/MamtaJhamat786/MiniLoanApp.git

2. Navigate into the project directory:

    cd mini-loan-app

3. Install project dependencies:

    npm install


4. To start the development server and view the app in your browser, run:

    npm run serve

    This command will launch the development server, and you can access the application by navigating to http://localhost:8080/ in your web browser.

### Features
    1. Interactive Loan Calculator: Users can input or use sliders to adjust loan amounts and periods, with real-time calculation of monthly payments.
    2. Smooth Scrolling: The "Apply now" button scrolls to the loan calculator smoothly.
    3. Dynamic Modals: A modal with form validation opens when users apply for a loan.
    4. Input Validation: The form inside the modal has specific validations for each input field (e.g., phone number, email, etc.).
    5. Conditional Routing: Based on the user’s input (monthly income), they are redirected to different decision views.
