import RootLayout from "./layouts/RootLayouts";
import Home from "./pages/Home";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext";

import ItemEdit from "./components/ItemEdit";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route to="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/invoices/:id" element={<ItemEdit />} />
      </Route>,
    ),
  );

  return (
    <>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
    </>
  );
}
