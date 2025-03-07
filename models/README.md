# 📦 Models Directory Guide

## 📖 Overview
The `models` directory is structured to **organize API-related logic** cleanly and efficiently. Each API has its **own folder**, containing:
- **hooks/** → React Query hooks for API calls.
- **options/** → Query options & configurations.
- **types/** → TypeScript types for API responses & hooks.

This structure ensures **scalability, maintainability, and better API management**.

---

## 📂 **Folder Structure**
For every API, a **dedicated folder** must be created inside `models/`.  
For example, if there are APIs related to `users`, the folder structure should look like this:

```
models/
 ├── users/               # Folder for user-related API logic
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

---

## 🚀 **How to Define a New API Model**
Each API follows **these steps**:

### 1️⃣ **Create an API Folder**
For example, if managing **user-related APIs**, create a `users/` folder in `models/`.

---

### 2️⃣ **Define Hooks (`hooks/` Folder)**
Each API action should have a **custom React Query hook**.

#### Example: `useGetUsersList.ts` (Fetching User List)
```ts
import { useQuery } from "@tanstack/react-query";
import { getUsersListOptions } from "../options";
import type { UseGetUsersListType } from "../types";

/**
 * Custom React Query hook to fetch the list of users.
 *
 * @param {UseGetUsersListType["options"]} options - Query options.
 * @returns Query result from `useQuery`.
 */
export function useGetUsersList(options?: UseGetUsersListType["options"]) {
  return useQuery(getUsersListOptions(options));
}
```
✅ **Re-export the hook** in `hooks/index.ts`:
```ts
export * from "./useGetUsersList";
```

---

### 3️⃣ **Define API Call Options (`options/` Folder)**
Each API request should have an **option file** for defining `queryFn` and configurations.

#### Example: `getUsersList.ts` (Defining Query Options)
```ts
import { api } from "@/core/config";
import { queryOptions } from "@tanstack/react-query";
import type { UseGetUsersListType } from "../types";

/**
 * Query options for fetching the list of users.
 *
 * @param {UseGetUsersListType["options"]} options - Custom options.
 * @returns Query configuration object.
 */
export function getUsersListOptions(options?: UseGetUsersListType["options"]) {
  return queryOptions<UseGetUsersListType["response"]>({
    queryKey: ["usersList"],
    queryFn: async () => {
      const url = "users/list";
      const response = await api.get(url);
      return response.data;
    },
    ...options,
  });
}
```
✅ **Re-export the option file** in `options/index.ts`:
```ts
export * from "./getUsersList";
```

---

### 4️⃣ **Define API Types (`types/` Folder)**
Define **query response types** and **hook option types**.

#### Example: `getUsersList.ts` (Defining Types)
```ts
import type { QueryOptionsParams } from "@/core/types";
import type { User } from "@/types/users";

/**
 * Defines the structure of the API response for fetching user lists.
 */
export type GetUsersListResponse = {
  data: User[];
};

/**
 * Defines the types for using the `useGetUsersList` hook.
 */
export type UseGetUsersListType = {
  options: QueryOptionsParams<UseGetUsersListType["response"]>;
  response: GetUsersListResponse;
};
```
✅ **Re-export types** in `types/index.ts`:
```ts
export * from "./getUsersList";
```

---

### 5️⃣ **Export Everything in `index.ts`**
To ensure clean imports, create an `index.ts` file inside the `users` folder and **re-export all modules**:
```ts
export * from "./hooks";
export * from "./options";
export * from "./types";
```

---

## 🎯 **Final Step: Using the API Hook**
Now, you can use the `useGetUsersList` hook in a React component like this:
```tsx
import { useGetUsersList } from "@/models/users";

function UsersComponent() {
  const { data, isLoading } = useGetUsersList();

  if (isLoading) return <p>Loading...</p>;

  return (
    <ul>
      {data?.data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## 🛠 **Adding a New API**
Follow **the same steps** for any new API:
1. **Create a new API folder** inside `models/` (e.g., `models/products/`).
2. **Add hooks, options, and types** inside the folder.
3. **Re-export everything in `index.ts`**.
4. **Follow the same structure as the `users` API.**

---

## ✅ **Best Practices**
✔ **Each API has its own folder** for better organization.  
✔ **Use React Query hooks** to handle API interactions efficiently.  
✔ **Each API action (`GET`, `POST`, `PUT`, etc.) has a separate file**.  
✔ **API response types and query options are strongly typed**.  
✔ **Re-export everything in `index.ts`** for cleaner imports.

---

## 🎉 Now your models are well-structured, maintainable, and scalable! 🚀