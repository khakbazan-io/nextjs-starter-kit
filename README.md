# 🚀 Next.js 15 Starter Kit

## 📖 Overview
This is a **starter kit project** built with:
- **Next.js 15** (latest app directory features)
- **TypeScript**
- **React Query**
- **HeroUI**
- **Tailwind CSS**

This project provides **a well-structured architecture**, essential tools, and an **abstraction layer** to help developers **quickly start new projects** with **a solid foundation**.

## 📂 Project Structure

### 🛠 **core/**
This folder contains **the project's abstraction layer**, including:
- **UI Kit (`core/common/`)** → Custom HeroUI components & reusable UI components.
- **Core Hooks (`core/hooks/`)** → Well-documented, reusable hooks.
- **Core Utilities (`core/utils/`)** → Helper functions.
- **Configurations (`core/config/`)** → Global configurations:
  - **Axios Interceptor** for API requests.
  - **Site Config (`site.ts`)** – Defines site metadata (name, author, API base URL, slogan, etc.).
- **Core Components (`core/components/`)** → Essential components:
  - `ControlledInput` – Custom input component with validation.
  - `ControlledSelect` – Custom select component.

---

### 🎨 **common/**
Contains **project-specific UI components** that are **not part of the core abstraction layer**.

---

### 📦 **components/**
Holds **feature-specific components**.  
For example, if implementing a **Users List Page**, the structure should be:

```
components/
 ├── users/
 │   ├── users-list.tsx  # Component to display a list of users
```

---

### 🪝 **hooks/**
Contains **custom hooks that are specific to this project**.

---

### 📑 **models/**
The `models/` folder is **a structured API layer** that follows a clear pattern.  

Each API has its **own folder**, containing:
- **`hooks/`** → React Query hooks for API calls.
- **`options/`** → Query configurations for API calls.
- **`types/`** → TypeScript types for API responses & hooks.

#### 📌 Example Structure for `users` API:
```
models/
 ├── users/
 │   ├── hooks/           # Custom React Query hooks
 │   │   ├── useGetUsersList.ts
 │   │   ├── index.ts
 │   ├── options/         # API request configurations
 │   │   ├── getUsersList.ts
 │   │   ├── index.ts
 │   ├── types/           # Type definitions for API responses & queries
 │   │   ├── getUsersList.ts
 │   │   ├── index.ts
 │   ├── index.ts         # Re-exports everything for clean imports
```

#### ✅ **How to Define a New API Model**
For every API, developers must:
1. **Create a folder** inside `models/`.
2. **Define hooks** in `hooks/` (e.g., `useGetUsersList.ts`).
3. **Define API options** in `options/` (e.g., `getUsersList.ts`).
4. **Define API response types** in `types/` (e.g., `getUsersList.ts`).
5. **Export everything in `index.ts`**.

For more details, check the `README.md` inside `models/`.

---

### 📐 **layouts/**
Contains **layout components** used across the project.

---

### 🔧 **utils/**
Contains **helper functions** used throughout the project.

---

### 📝 **types/**
Contains **TypeScript type definitions** used across the project.

---

### 🎨 **styles/**
Contains **global and component-level styles**.

---

### 🌍 **providers/**
Contains **React context providers** for managing global state.

---

## 🏗 **Best Practices for Feature Development**

When adding components to a feature folder, follow this **file structure**:

For example, if developing **`users-list/`**, the structure should be:

```
users-list/
 ├── index.tsx        # Main component definition
 ├── types.ts         # Type definitions for index.tsx
 ├── schema.ts        # Zod schema (if using a form)
 ├── constants.ts     # Constants used in the component
```

### ✅ **Development Guidelines**
✔ **Follow the folder structure strictly.**  
✔ **Use `core/hooks` & `core/utils` for reusable logic.**  
✔ **Re-export everything in `index.ts` for clean imports.**  
✔ **Follow TypeScript best practices for type safety.**  

---

## 🏁 Getting Started

### **1️⃣ Install Dependencies**
This project uses **pnpm**. Install dependencies by running:
```sh
pnpm install
```

### **2️⃣ .env File**
Remove .sample from .env.local.sample:


### **3️⃣ Start the Development Server**
Run the Next.js development server with:
```sh
pnpm dev
```

### **4️⃣ Build for Production**
To generate an optimized production build, run:
```sh
pnpm build
```
---

## 🎉 Now your project is well-structured, maintainable, and scalable! 🚀