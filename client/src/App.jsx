import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Auth, RequireAuth, Orders, NewOrder, OrderPage, Prices } from "@/pages";
import { Navbar, ScrollUpButton } from "@/components";


function App() {
  const { isLoggedIn } = useSelector(state => state.auth);

  return (
    <BrowserRouter >
        {isLoggedIn ? <Navbar /> : ""}

      <div className="min-h-screen bg-main-bg">
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="/registration" element={<Auth />} />
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <Orders />
              </RequireAuth>
            }
          />
          <Route
            path="/orders/order/:id"
            element={
              <RequireAuth>
                <OrderPage/>
              </RequireAuth>
            }
          />
          <Route
            path="/orders/new"
            element={
              <RequireAuth>
                <NewOrder/>
              </RequireAuth>
            }
          />
          <Route
            path="/prices"
            element={
              <RequireAuth>
                <Prices/>
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/orders" />} />
        </Routes>

      </div>

      <ScrollUpButton />
    </BrowserRouter>
  )
}

export default App
