// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import SignupForm  from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import PrivateView from "./components/PrivateView";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route index element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/private" element={<PrivateView />} />
    </Route>
  )
);
