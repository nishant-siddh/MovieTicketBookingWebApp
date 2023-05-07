import { useMovieContext } from "../Context/MovieContext";
import { useEffect, useState } from "react";

const MovieBookingForm = () => {
  const { movie, toggleForm, isFormOpen } = useMovieContext();
  const [movieData, setMovieData] = useState({
    movieTitle: movie.name,
    date: '',
    time: '',
    row: '',
    seat: ''
  });
  
  useEffect(() => {
    if(localStorage) {
      const storedData = JSON.parse(localStorage.getItem('movieData'));
      storedData.movieTitle === movie.name ? setMovieData(storedData) : setMovieData({
        movieTitle: movie.name,
        date: '',
        time: '',
        row: '',
        seat: ''
      })
    }
  }, [movie]);

  const modal = document.querySelector('[data-modal]');

  if (isFormOpen) {
    modal.removeAttribute('open');
    modal.showModal()
  };

  function handleCancel() {
    modal.close();
    toggleForm();
  }

  function handleSubmit(e) {
    e.preventDefault();
    modal.close();
    alert('Form submitted!');
    localStorage.setItem('movieData', JSON.stringify(movieData));
    toggleForm();
  }

  function handleSaveData(e) {
    setMovieData({...movieData, [e.target.name]: e.target.value})
  }

  return (
    <dialog data-modal className="formDialog position-absolute top-50 start-50 translate-middle border-0">
      <form onSubmit={handleSubmit} className="d-flex flex-column px-3 py-3">

        <div className="py-2">
          <label htmlFor="movieTitle" className="mx-2">Movie Title: </label>
          <input type="text" name="movieTitle" value={movie.name} id="movieTitle" disabled />
        </div>

        <div className="py-2">
          <label htmlFor="date" className="mx-2">Date: </label>
          <input type="date" name="date" id="date" value={movieData.date} onChange={handleSaveData} required autoComplete="off" />
        </div>

        <div className="py-2">
          <label htmlFor="time" className="mx-2">Time: </label>
          <input type="time" name="time" id="time" value={movieData.time} onChange={handleSaveData} required autoComplete="off" />
        </div>

        <div className="py-2">
          <label htmlFor="row" className="mx-2">Row: </label>
          <select name="row" id="row" value={movieData.row} onChange={handleSaveData} required autoComplete="off">
            <option value="">Select Row</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        
        <div className="py-2">
          <label htmlFor="seat" className="mx-2">Seat: </label>
          <select name="seat" id="seat" value={movieData.seat} onChange={handleSaveData} required autoComplete="off">
            <option value="">Select Seat</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="mt-3">
          <button type="button" formMethod="dialog" className="bg-danger border-0 text-light px-4 py-2 mx-2" onClick={handleCancel}>Cancel</button>
          <button type="submit" className=" bg-success border-0 text-light px-5 py-2 mx-2">Book Ticket</button>
        </div>
      </form>
    </dialog>
  )
}

export default MovieBookingForm