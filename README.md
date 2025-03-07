## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).




# 🚀 Next.js 15 Starter Kit

## 📖 Overview
This is a **starter kit project** built with:
- **Next.js 15**
- **TypeScript**
- **React Query**
- **HeroUI**

It provides a **well-structured architecture**, essential tools, and an **abstraction layer** to help developers quickly start new projects with **a solid foundation**.

## How to Use

### Install dependencies

Install dependencies via `pnpm`:

```bash
pnpm install
```

### .env File
Remove the .sample from .env.local.sample

### Run the development server
```bash
pnpm dev
```

---

## 📂 Project Structure

### 🛠 **core/**
This folder contains the **abstraction layer** of the project, including:
- **UI Kit** (`core/common/`): HeroUI components or our custom UI components.
- **Core Hooks** (`core/hooks/`): Typed, well-documented hooks
- **Core Utilities** (`core/utils/`): Useful functions
- **Configurations** (`core/config/`):  
  - **Axios Interceptor** for API requests.
  - **Site Configuration (`site.ts`)** – Contains essential site details:
    - Website name, author, API base URL, site address, slogan, etc.
- **Core Components** (`core/components/`):  
  - **Controlled Input & Select** – Custom form components and ...

---

### 🎨 **common/**
This folder contains **UI components that are project-specific** but **not suitable for the abstraction layer**.

---

### 📦 **components/**
This folder holds **project-specific components** that belong to different features.  
For example, for a **Users List Page**, the structure would be:

```
components/
 ├── users/
 │   ├── users-list.tsx  # Component to display a list of users
```

---

### 🪝 **hooks/**
Contains **custom hooks** that are **specific to this project**.

---

### 📑 **models/**
The `models/` folder is **a structured API layer** that follows a clear pattern.  

Each API has its **own folder** that contains:
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

For more details, check the `README.md` file inside `models/`.

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

## 🏗 **Developing in This Structure**
When adding components to a feature folder, follow this **file structure**:

For example, if developing **`users-list/`**, the structure should be:

```
users-list/
 ├── index.tsx        # Main component definition
 ├── types.ts         # Type definitions for index.tsx
 ├── schema.ts        # Zod schema (if using a form)
 ├── constants.ts     # Constants used in the component
```

### ✅ **Best Practices**
✔ **Follow the folder structure strictly.**  
✔ **Use core/hooks & core/utils for reusable logic.**  
✔ **Re-export everything in index.ts for clean imports.**  
✔ **Follow TypeScript best practices for type safety.**  

---

## 🎉 Now your project is well-structured, maintainable, and scalable! 🚀