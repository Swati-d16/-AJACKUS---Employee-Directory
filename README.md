# 🧑‍💼 Employee Directory Web Interface

A responsive, interactive **Employee Directory Dashboard** built using **HTML, CSS, TypeScript, React and Freemarker templates**. This project demonstrates modern front-end development practices without relying on external APIs.

## 🚀 Features

### ✅ Dashboard Page

<img width="925" height="670" alt="Screenshot 2025-07-11 235208" src="https://github.com/user-attachments/assets/15b5c229-475d-4beb-84af-f5c9bf939124" /> 

- Displays a list/grid of employees with:
  - **Employee ID**
  - **First Name**
  - **Last Name**
  - **Email**
  - **Department**
  - **Role**
- Data is rendered using **Freemarker templates** with mock data.
- Each employee entry includes:
  - **Edit** button
  - **Delete** button

### ✍️ Add/Edit Form 

<img width="895" height="670" alt="Screenshot 2025-07-11 235230" src="https://github.com/user-attachments/assets/a4978c0d-a116-4096-911a-e42d5f932e93" /> 


- HTML form to **add** or **edit** employee details.
- Fields include:
  - First Name
  - Last Name
  - Email
  - Department
  - Role
- Styled using CSS and validated via **TypeScript**.
- Validation includes:
  - Required fields
  - Proper email format
  - Client-side only, in-memory data handling (no backend)

### 🔍 Filter, Search & Sort

<img width="890" height="669" alt="Screenshot 2025-07-11 235252" src="https://github.com/user-attachments/assets/f32d895c-fa15-44e1-be2f-67cf3ece17c9" /> 


- **Filter Sidebar/Popup** for:
  - First Name
  - Department
  - Role
- **Search bar** to find employees by name or email.
- **Sort** employees by:
  - First Name (A-Z, Z-A)
  - Department (A-Z, Z-A)

### 📄 Pagination / Infinite Scroll
- Choose to display:
  - 10, 25, 50, or 100 employees per page
- Implemented using **vanilla TypeScript**

### 📱 Responsive Design
- Fully responsive layout for:
  - **Desktop**
  - **Tablet**
  - **Mobile**

---

## 🧑‍💻 Tech Stack

- **HTML5**
- **Tailwind CSS**
- **TypeScript**
- **React**
- **Freemarker (FTL templates)**

---
