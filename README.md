# Test Plan for Bookstore Website

## Test Objectives
The objective of this test plan is to validate the core functionalities of the [Bookstore Website](https://practice.expandtesting.com/bookstore). The tests aim to ensure that the website provides a seamless user experience, handles edge cases effectively, and meets functional requirements.

---

## Test Scope
The scope of testing includes the following areas:
- **Bookstore Features:** Displaying books, searching, sorting, and viewing book details.
- **User Authentication:** Sign-up, login, and logout functionality.
- **Cart and Checkout:** Adding books to the cart, proceeding to checkout, and completing purchases.
- **Order Management:** Viewing past orders after login.
- **Error Handling:** Validation of error messages for invalid inputs (e.g., incorrect email, invalid password).

---

## High-Level Test Cases

### Bookstore Features
1. Verify the display of the book list with titles and prices.
2. Verify the search functionality for books.
3. Verify sorting books by price (ascending and descending).
4. Verify book details (e.g., title, author, price).

### User Authentication
5. Verify user sign-up with valid data.
6. Verify error messages for invalid sign-up inputs (e.g., invalid email).
7. Verify user login with valid credentials.
8. Verify error messages for invalid login attempts (e.g., incorrect password, invalid email).
9. Verify user logout functionality.

### Cart and Checkout
10. Verify adding books to the cart.
11. Verify the end-to-end purchase flow, including:
    - Adding a book to the cart.
    - Signing in during checkout.
    - Filling in payment and shipping details.
    - Completing the purchase.
    - Verifying the success message.

### Order Management
12. Verify that users can view past orders after logging in.

---

## Additional Features

### Page Object Model (POM) with Modals
- The project uses the **Page Object Model (POM)** design pattern combined with **modals** to ensure better organization and maintainability.
- Each page (e.g., Bookstore Page, Cart Page, Checkout Page) is represented by a dedicated class that encapsulates its elements and actions.
- Modals (e.g., Sign-In Modal, Sign-Up Modal, Checkout Modal) are implemented as reusable components to handle specific UI interactions.

#### Example Structure:
```plaintext

├── pages/
│   ├── bookstore-page.ts       # Represents the Bookstore page
│   ├── cart-page.ts            # Represents the Cart page
│   ├── checkout-page.ts        # Represents the Checkout page
│   └── user-profile-page.ts    # Represents the User Profile page
├── modals/
│   ├── sign-in-modal.ts        # Handles the Sign-In modal
│   ├── sign-up-modal.ts        # Handles the Sign-Up modal
│   ├── checkout-modal.ts       # Handles the Checkout modal
│   └── header-modal.ts         # Handles the Header modal
```

#### Benefits:
- **Reusability:** Modals can be reused across multiple tests (e.g., Sign-In Modal used in both login and checkout tests).
- **Readability:** Tests are easier to read and maintain as they focus on high-level actions rather than low-level UI interactions.
- **Scalability:** Adding new pages or modals is straightforward without affecting existing tests.

### Step Function Decorator
- Each test step is wrapped in a **step function decorator** to provide detailed visibility into the execution flow.
- The decorator ensures that each step is logged and displayed in the HTML report for better traceability.

### Test Data in JSON
- All test data is stored in separate JSON files for better organization and reusability.
- Test data is dynamically loaded into the tests using a `TestDataService` utility.

---

## Out of Scope
- Performance testing (e.g., load testing).
- API testing (focus is on UI functionality).
- Third-party integrations (e.g., payment gateway backend).


---

## Deliverables
- Test execution results.
- HTML and JUnit test reports.
- Identified bugs and issues logged in the tracking system.
- Detailed step-by-step execution logs in the HTML report.

---

## Running Tests

### Run All Tests
To execute all tests and automatically open the HTML report:
```bash
npm run test