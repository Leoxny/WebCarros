import { createBrowserRouter } from "react-router-dom";
import { HomeScreen } from "./pages/home";
import { LoginScreen } from "./pages/login";
import { LoginRegister } from "./pages/register";
import { DashBoardScreen } from "./pages/dashboard";
import { NewRegisterCar } from "./pages/dashboard/new";
import { CarScreen } from "./pages/car";
import { Layout } from "./components/layout";
import { Private } from "./routes/Private";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomeScreen />
      },
      {
        path: "car/:id",
        element: <CarScreen />
      },
      {
        path: "dashboard",
        element: <Private> <DashBoardScreen /> </Private>
      },
      {
        path: "dashboard/new",
        element: <Private> <NewRegisterCar /> </Private>
      },
    ]
  },
  {
    path: '/login',
    element: <LoginScreen />
  },
  {
    path: '/login/register',
    element: <LoginRegister />
  },
]);

