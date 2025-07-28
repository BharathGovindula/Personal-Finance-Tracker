# Personal Finance Tracker

A single-page React application that allows users to track their personal income and expenses. The application provides functionalities to add, view, filter, and manage financial transactions, with all data persistently stored using Firebase Firestore.

## Features

- **Transaction Entry**: Add new financial transactions with description, amount, type, category, and date.
- **Transaction List Display**: View all transactions in a sortable list with visual distinction between income and expenses.
- **Current Balance Summary**: See your total balance, income, and expenses at a glance.
- **Filtering and Sorting**: Filter transactions by type or category, and sort by date or amount.
- **Edit and Delete Transactions**: Modify or remove existing transactions as needed.
- **Data Persistence**: All data is stored in Firebase Firestore and synced in real-time.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Expense Visualization**: View your expenses by category in a pie chart.

## Technologies Used

- React (with Hooks)
- Firebase (Authentication and Firestore)
- Tailwind CSS
- Recharts (for data visualization)
- Vite (for fast development and building)

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- A Firebase account and project

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/BharathGovindula/Personal-Finance-Tracker.git
   cd personal-finance-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Firestore and Anonymous Authentication in your Firebase project
   - Get your Firebase configuration (apiKey, authDomain, etc.)
   - Update the Firebase configuration in `src/firebase.js`

4. Start the development server:
   ```
   npm run dev
   ```

5. Build for production:
   ```
   npm run build
   ```

## Deployment to Netlify

### Option 1: Deploy via Netlify UI

1. Create a Netlify account at [https://app.netlify.com/](https://app.netlify.com/)
2. Click the "New site from Git" button
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Netlify and select your repository
5. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Deploy using Netlify CLI

1. Install the Netlify CLI globally:
   ```
   npm install -g netlify-cli
   ```
2. Build your project:
   ```
   npm run build
   ```
3. Login to Netlify:
   ```
   netlify login
   ```
4. Initialize your site:
   ```
   netlify init
   ```
5. Deploy your site:
   ```
   netlify deploy --prod
   ```

### Environment Variables

Make sure to add your Firebase configuration as environment variables in Netlify:

1. Go to Site settings > Build & deploy > Environment
2. Add the following variables:
   - VITE_FIREBASE_API_KEY
   - VITE_FIREBASE_AUTH_DOMAIN
   - VITE_FIREBASE_PROJECT_ID
   - VITE_FIREBASE_STORAGE_BUCKET
   - VITE_FIREBASE_MESSAGING_SENDER_ID
   - VITE_FIREBASE_APP_ID
   - VITE_FIREBASE_MEASUREMENT_ID (if applicable)

## Usage

1. **Adding Transactions**:
   - Fill out the transaction form with description, amount, type, category, and date
   - Click "Add Transaction" to save

2. **Viewing Transactions**:
   - All transactions are displayed in the transaction list
   - Income is shown in green, expenses in red

3. **Filtering and Sorting**:
   - Use the filter dropdowns to filter by transaction type or category
   - Click on column headers to sort by that field

4. **Editing Transactions**:
   - Click the "Edit" button on a transaction to load it into the form
   - Make your changes and click "Update Transaction"

5. **Deleting Transactions**:
   - Click the "Delete" button on a transaction to remove it
   - Confirm the deletion when prompted

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- React team for the amazing library
- Firebase for the backend services
- Tailwind CSS for the styling framework
- Recharts for the charting library
