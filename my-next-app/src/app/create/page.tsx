import { Suspense } from "react";
import App from "./mainComponent";
// or adjust the path to your component

export default function CreatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  );
}
