import './App.css';
import { Route, Routes } from "react-router-dom";

// ################### AUTH #####################
import Home from './component/home/home'
import Login from './component/login/login'
import Register from './component/register/register'

import Detail from './component/detail/detail';
import TagsSearch from './component/tagsSearch/tagsSearch';

function App() {
  
  return (
    <div className="bg-slate-400 min-h-screen">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/detail/:data/:slug' element={<Detail />} />
        <Route path='/tags/:cat' element={<TagsSearch/>}/>
      {/* ###################### AUTH ##################### */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>

      </Routes>
    </div>
  );
}

export default App;
