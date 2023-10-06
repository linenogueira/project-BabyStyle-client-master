import { Route, Routes } from 'react-router-dom'

import ClothingListPage from './Pages/ClothingList'
import ClothingDetailsPage from './Pages/ClothingDetails'
import AddClothing from './Pages/AddClothing'
import EditClothing from './Pages/EditClothing/clothing'
import LaundryList from './Pages/LaundryList'
import PackingList from './Pages/PackingList'
import SignupPage from './Pages/Signup'
import LoginPage from './Pages/Login'
import Navbar from "./Components/Navbar"
import HomePage from './Pages/HomePage'
import IsPrivate from "./Components/isPrivate";
import IsAnon from "./Components/isAnon";
import './App.css';



function App() {
 
  return (
    <div>
    <Navbar/>
    <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/clothing" element={<IsPrivate><ClothingListPage /></IsPrivate>} />
        <Route path="/clothing/:clothingId" element={<IsPrivate><ClothingDetailsPage /></IsPrivate>} />
        <Route path="/clothing/create" element={<IsPrivate><AddClothing /></IsPrivate>} />
        <Route path="/clothing/edit/:clothingId" element={<IsPrivate><EditClothing /></IsPrivate>} />
        <Route path="/laundry" element={<IsPrivate><LaundryList /></IsPrivate>} /> 
        <Route path="/packing" element={<IsPrivate><PackingList /></IsPrivate>} /> 
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
        
      </Routes>
       
    </div>
  )
}

export default App

