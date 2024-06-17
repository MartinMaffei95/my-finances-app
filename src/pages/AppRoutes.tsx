import Layout from "@/components/LayOuts/Layout";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Home from "./Home/Home";
import Palette from "./Lab/Palette";
import NewMove from "./Move/NewMove";
import Account from "./Account/Account";
import CreateAccount from "./Account/CreateAccount";
import AddCategory from "./Categories/AddCategory";
import AllCAtegories from "./Categories/AllCAtegories";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path:"move",
        children:[
          {
            path:"",
            element:<NewMove />
          },
          // {
          //   path:"",
          //   element:<MovesList />
          // }
        ]
      },
      {
        path:"account",
        children:[
          {
            path:"",
            element:<Account />
          },
          {
            path:":accountId",
            element:<Account />
          },
          {
            path:"new",
            element:<CreateAccount />
          }
        ]
      },
      {
        path:"categories",
        children:[
          {
            path:"",
            element:<AllCAtegories />
          },
          {
            path:"new",
            element:<AddCategory />
          }
        ]
      }
    ],
  },
  {
    path: "/lab",
    element: (
        <Outlet />
    ),
    children: [
      {
        path: "palette",
        element: <Palette />,
      },
    ],
  },
]);

export default router;
