import "./App.css";
import Navs from "./Navs";
import { UserProvider } from "./coxtext/userContext";
import {CartProvider} from './coxtext/cartContext'
function App() {
  return (
    <div className="App">
      <CartProvider>
      <UserProvider>
        <Navs />
      </UserProvider>
      </CartProvider>
    </div>
  );
}

export default App;
