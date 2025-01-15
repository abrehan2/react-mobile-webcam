// Imports:
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Mobile from "../pages/mobile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mobile />,
  },
]);

export default router;
