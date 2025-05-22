import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";
import './index.css'
import ShopContextProvider from "./context/ShopContext.tsx";

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
  </BrowserRouter>,
)
