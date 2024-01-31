import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import LoginForm from "../loginForm/LoginForm";
import ProductList from "../productList/ProductList";
import Header from "../header/Header";
import Products from "../products/Products";
import ProductPage from "../productPage/ProductPage";
import RegisterForm from "../registerForm/RegisterForm";
import Contacts from "../contacts/Contacts";
import Footer from "../footer/Footer";

function App() {
  
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<ProductList/>}/>
          <Route path='/products/:id' element={<ProductList/>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/contacts' element={<Contacts/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/userProducts/:id' element={<Products/>}/>
          <Route path='/product/:id' element={<ProductPage/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
