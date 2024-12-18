
# Playwright E2E Testing Project

This repository is designed for **end-to-end (E2E) testing** using [Playwright](https://playwright.dev/). It includes utilities 
for managing environment variables with `dotenv` and generating dynamic fake data using `faker`. The project is structured to streamline 
automated testing workflows and boost productivity.

---

## 🚀 Getting Started

Clone this repository and follow the steps 
below to set up and run your automated tests.

---

## 📋 Prerequisites

Ensure you have the following tools installed:

- **[Node.js](https://nodejs.org/)** (v14 or later)
- **npm** (Node Package Manager - bundled with Node.js)

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/JoaoVP-Tester-QA/pw-saucedemo-atm.git
```

### 2. Initialize Playwright

Set up Playwright by running:

```bash
npm init playwright@latest
```


### 3. Install Dependencies

Install the necessary packages for environment management and fake data generation:

```bash
npm install dotenv @faker-js/faker
npm install --save-dev @types/dotenv
```

### 4. Install Playwright Browsers

Ensure Playwright browsers are installed:

```bash
npx playwright install
```

---

## 🛠️ Usage

### Run the e2e Tests

To execute the Playwright, e2e test in the project:

```bash
npm run e2e
```

### View HTML Test Reports

Generate and view an HTML report for test results:

```bash
npx playwright show-report
```

---

## 📂 Project Structure

```plaintext
project-root/
├── tests/               # Folder containing Playwright test e2e
├── .env                 # Environment variables file
├── playwright.config.ts # Configuration for Playwright
├── package.json         # npm configuration file
├── README.md            # Documentation (you are here!)
```


---

## 📜 Acknowledgments

- [Playwright](https://playwright.dev/) for providing a powerful framework for browser automation.
- [dotenv](https://www.npmjs.com/package/dotenv) for simplifying environment variable management.
- [faker.js](https://github.com/faker-js/faker) for making fake data generation effortless.

---

### 💡 Need Help?

If you encounter any issues or have questions, feel free to [open an issue](https://github.com/JoaoVP-Tester-QA/pw-saucedemo-atm.git) or reach out.

---

## 🌟 Show Your Support

If you find this project helpful, please ⭐ the repository to show your support!
