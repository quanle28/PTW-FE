import './App.scss'
import {Navigate, Route, Routes, useLocation} from "react-router-dom";
import {Home} from "./pages/Home.tsx";
import {Collection} from "./pages/Collection.tsx";
import {About} from "./pages/About.tsx";
import {Contact} from "./pages/Contact.tsx";
import {Product} from "./pages/Product.tsx";
import {Cart} from "./pages/Cart.tsx";
import {Login} from "./pages/Login.tsx";
import {PlaceOrders} from "./pages/PlaceOrders.tsx";
import {Orders} from "./pages/Orders.tsx";
import {Navbar} from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import SearchBar from "./components/SearchBar.tsx";
import 'react-toastify/dist/ReactToastify.css'
import {toast, ToastContainer} from "react-toastify";
import ChatbotWidget from "./components/ChatbotWidget.tsx";
import {PrivateRoute} from "./components/PrivateRoute.tsx";
import {AdminPage} from "./pages/AdminPage.tsx";
import {AddAdmin} from "./components/AddAdmin.tsx";
import {ListAdmin} from "./components/ListAdmin.tsx";
import {OrdersAdmin} from "./components/OrdersAdmin.tsx";
import {UpdateAdmin} from "./components/UpdateAdmin.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import VnpayReturn from "./pages/VnpayReturn.tsx";
import {Revenue} from "./components/Revenue.tsx";

function App() {
    const location = useLocation();

    const isAdminRoute = location.pathname.startsWith("/admin");

    const existToken = localStorage.getItem("token");

  return (
    <>
        <ScrollToTop />
        <ToastContainer />
        {!isAdminRoute && (
            <>
                <div className="app-page">
                    <Navbar />
                    <SearchBar />
                </div>
            </>
        )}

        <div className={!isAdminRoute ? 'app-page' : ''}>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/collection' element={<Collection />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/product/:productId' element={<Product />} />
                <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
                <Route path='/login' element={
                    existToken ? (
                        <>
                            <Navigate to={"/"} replace />
                        </>
                            ) : (
                            <Login />
                        )
                } />

                <Route path='/place-order' element={<PrivateRoute><PlaceOrders /></PrivateRoute>} />
                <Route path='/orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
                <Route path="/vnpay-return" element={<VnpayReturn />} />

                {/* Admin route */}
                <Route path='/admin' element={<AdminPage />} >
                    <Route path='revenue' element={<Revenue />}/>
                    <Route path='add' element={<AddAdmin />}/>
                    <Route path='update/:productId' element={<UpdateAdmin />}/>
                    <Route path='list' element={<ListAdmin />}/>
                    <Route path='orders' element={<OrdersAdmin />}/>
                </Route>
            </Routes>
        </div>

        {!isAdminRoute && (
            <>
                <div className="app-page">
                    <ChatbotWidget />
                    <Footer />
                </div>
            </>
        )}
    </>
  )
}

export default App
