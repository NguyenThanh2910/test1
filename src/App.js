import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Calculator from "./calculator/Calculator";
import Weather from "./weather/Weather";
import Home from "./Home/Home";
import Navbar from "./Home/Navbar";
import TodoList from "./todolist/TodoList";
import { Provider } from "react-redux";
import store from "./todolist/store";



function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Calculator />} />
      <Route path="/contact" element={<Weather/>} />
      <Route path="/todo" element={<TodoList/>} />
    </Routes>
    </BrowserRouter>
    </Provider>
);
}

export default App;
