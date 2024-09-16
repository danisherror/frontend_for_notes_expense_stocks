# Folder Structure

```
frontend_for_notes_expense_stocks
├─]node_modules/ (ignored)
├─ public/
│  ├─ data.json
│  └─ favicon.ico
├─ src/
│  ├─ Auth/
│  │  └─ Auth.jsx
│  ├─ common/
│  │  └─ Loader/
│  │     └─ index.tsx
│  ├─ components/
│  │  ├─ Breadcrumbs/
│  │  │  └─ Breadcrumb.tsx
│  │  ├─ Charts/ (ignored)
│  │  ├─ Chat/ (ignored)
│  │  ├─ Checkboxes/ (ignored)
│  │  ├─ Dropdowns/
│  │  │  └─ DropdownDefault.tsx
│  │  ├─ Forms/
│  │  │  ├─ DatePicker/ (ignored)
│  │  │  ├─ SelectGroup/ (ignored)
│  │  │  └─ MultiSelect.tsx
│  │  ├─ Header/ (ignored)
│  │  ├─ Maps/ (ignored)
│  │  ├─ Sidebar/
│  │  │  ├─ index.tsx
│  │  │  └─ SidebarLinkGroup.tsx
│  │  ├─ Switchers/ (ignored)
│  │  ├─ Tables/ (ignored)
│  │  ├─ CardDataStats.tsx
│  │  ├─ ClickOutside.tsx
│  │  ├─ ModalSettings.tsx
│  │  ├─ PageTitle.tsx
│  │  └─ TableSettings.tsx
│  ├─ css/ (ignored)
│  ├─ Expenses/
│  │  ├─ Create_Expenses.jsx
│  │  ├─ Edit_Expenses.jsx
│  │  └─ Show_All_Expenses.jsx
│  ├─ fonts/(ignored)
│  ├─ hooks/
│  │  ├─ fireToast.tsx
│  │  ├─ useColorMode.tsx
│  │  └─ useLocalStorage.tsx
│  ├─ images/(ignored)
│  │  ├─ cards/ (ignored)
│  │  ├─ country/ (ignored)
│  │  ├─ cover/ (ignored)
│  │  ├─ icon/ (ignored)
│  │  ├─ logo/ (ignored)
│  │  ├─ product/ (ignored)
│  │  ├─ task/ (ignored)
│  │  ├─ user/ (ignored)
│  │  └─ favicon.ico
│  ├─ js/ (ignored)
│  ├─ layout/
│  │  └─ DefaultLayout.tsx
│  ├─ Notes/
│  │  ├─ Create_Notes.jsx
│  │  ├─ Edit_Notes.jsx
│  │  └─ Show_All_Notes.jsx
│  ├─ pages/
│  │  ├─ Authentication/
│  │  │  ├─ SignIn.tsx
│  │  │  └─ SignUp.tsx
│  │  ├─ Dashboard/
│  │  │  └─ ECommerce.tsx
│  │  ├─ Form/
│  │  │  ├─ FormElements.tsx
│  │  │  └─ FormLayout.tsx
│  │  ├─ UiElements/
│  │  │  ├─ Alerts.tsx
│  │  │  └─ Buttons.tsx
│  │  ├─ Calendar.tsx
│  │  ├─ Chart.tsx
│  │  ├─ Profile.tsx
│  │  ├─ Settings.tsx
│  │  └─ Tables.tsx
│  ├─ Transactions/
│  │  ├─ Create_Transactions.jsx
│  │  ├─ Edit_Transactions.jsx
│  │  └─ Show_All_Transactions.jsx
│  ├─ types/
│  │  ├─ brand.ts
│  │  ├─ chat.ts
│  │  ├─ package.ts
│  │  └─ product.ts
│  ├─ App.tsx
│  ├─ jsvectormap.d.ts
│  ├─ lib.d.ts
│  ├─ main.tsx
│  └─ react-app-env.d.ts
├─ .gitignore
├─ .prettierrc
├─ index.html
├─ LICENSE.md
├─ package-lock.json
├─ package.json
├─ postcss.config.cjs
├─ tailwind.config.cjs
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.js
```


---
# How to make the buy/sell stock pages:
---
- [ ] First make the form with the following fields:
    - symbols
    - Name
    - timestamp
    - price per unit
    - quantity
- [ ] `important` write in the top that the time and price should be accurate otherwise you will not get the correct analysis of your stocks
- [ ] 