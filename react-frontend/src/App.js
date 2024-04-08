import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import NavBar from './component/NavBar';
import MyProfile from './Pages/MyProfile';
import MyProfileInfo from './Pages/MyProfileInfo';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin';
import Products from './Pages/Products';
import TV from './Pages/TV';
import CartPage from './Pages/CartPage';
import OrderSuccess from "./Pages/OrderSuccess";
import Footer from "./component/Footer";
function App() {
    return (<>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
            <div className="App">
                <NavBar/>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/MyProfile" element={<MyProfile/>} />
                    <Route exact path="/MyProfileInfo" element={<MyProfileInfo/>} />
                    <Route exact path="/Login" element={<Login/>} />
                    <Route exact path="/Register" element={<Register/>} />
                    <Route exact path="/Admin" element={<Admin/>} />
                    <Route exact path="/Products/:id" element={<Products/>} />
                    <Route exact path="/CartPage" element={<CartPage />} />
                    <Route exact path="/OrderSuccess" element={<OrderSuccess />} />
                    {/*<Route exact path="/Phone" element={<Phone/>} />*/}
                    {/*<Route exact path="/TV" element={<TV/>} />*/}
                </Routes>

            </div>
            <Footer/>
    </>
    );
}

export default App;
