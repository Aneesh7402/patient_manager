

# Patient Manager

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

A **frontend-only patient registration** app using **Pglite** for browser-based data storage. Live on Vercel:

👉 **[Live Demo](https://patient-manager-weld.vercel.app/)**

---

## ✨Required Features 📄 [View feature documentation](https://docs.google.com/document/d/1Y-bGLojVR21H9KOf2fMLRb8KUDiMaZRkvvYx6PdMcik/edit?usp=sharing)

* **Patient Registration**
  Register new patients and store their data in a local SQLite database.
 

* **SQL Query Panel**
  Run **read-only** SQL queries on patient records directly in the browser. Restricted to read-only for safety


* **Data Persistence Across Refreshes**
  Patient records persist using IndexedDB under the hood via Pglite.

* **Multi-tab Sync**
  Keep data synchronized across multiple tabs in the same browser session.
  
* **Ton of additional features**
  Refer to the doc.

---

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone git@github.com:Aneesh7402/patient_manager.git
cd my-next-app
npm install
```

### 2. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

---

## 🧠 Tech Stack

* [Next.js App Router](https://nextjs.org/docs/app) – Modern file-based routing and layouts.
* [Pglite (SQLite in the browser)](https://github.com/leeoniya/pglite) – Lightweight, persistent SQLite database running in the browser via WebAssembly.
* [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) – Used under the hood by Pglite for local storage.
* [Zustand](https://github.com/pmndrs/zustand) – Minimal, scalable state management for synchronizing app state across tabs.
* [Formik](https://formik.org/docs/overview) – For handling form state and submission logic.
* [Yup](https://github.com/jquense/yup) – Schema-based validation for forms.


---

## 📦 Deployed on Vercel

This app is hosted on [Vercel](https://vercel.com](https://patient-manager-weld.vercel.app/)), offering automatic deployment and fast global delivery.

📄 [Deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)


