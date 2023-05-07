import './App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieDetail from './pages/MovieDetail';
import Navbar from './Components/Navbar';
// import MovieBookingForm from './Components/MovieBookingForm';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movieDetail/:id" element={<MovieDetail />} />
          {/* <Route path="movieBookingForm" element={<MovieBookingForm />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
