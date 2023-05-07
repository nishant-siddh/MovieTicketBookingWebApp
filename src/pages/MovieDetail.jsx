import { Link, useParams } from "react-router-dom"
import { useMovieContext } from "../Context/MovieContext";
import { useEffect } from "react";
import { format } from 'date-fns';
import notAvailableImage from '../image/Image-Not-Available.png';
import MovieBookingForm from "../Components/MovieBookingForm";

const MovieDetail = () => {
  const { movie, getSingleMovieData, toggleForm } = useMovieContext();
  const {id} = useParams();
  
  const localStorageData = JSON.parse(localStorage.getItem('movieData'));
  
  useEffect(() => {
    getSingleMovieData(id);
  }, [id])

  if (movie) {
    const { name, image, summary, language, genres, status, webChannel, premiered } = movie;
    const dateStr = premiered;
    const formattedDate = format(new Date(dateStr), 'dd-MMM-yyyy');
  
    return (
      <div>
        {movie && 
          <div className="movieDetail container-fluid bg-dark py-3">
            <div className="container d-flex align-items-center justify-content-center flex-wrap gap-4 px-5">
              <div className="movieImage position-relative">
                {image ? <img src={image.original} className="card-img rounded-5 opacity-75" alt={name}  /> : <img src={notAvailableImage} className="card-img rounded-5" alt={name} />}
                <p className="position-absolute bottom-0 bg-black w-100 text-center rounded-bottom-5 text-light">{status}</p>
              </div>
              <div className="aboutMovie text-light">
                <h2><b>{name}</b></h2>

                <p><b>Genre: </b>{genres.join(', ')}</p>

                <p className="text-white-50" dangerouslySetInnerHTML={{__html: summary}}></p>

                <p><b>Language: </b>{language}</p>

                {webChannel && <p><b>Available on: </b><Link to={webChannel.officialSite} className="link-underline link-underline-opacity-0">{webChannel.name}</Link></p>}

                <p><b>Premiered: </b>{formattedDate}</p>

                <button type="button" className="btn btn-outline-success mt-4" onClick={toggleForm}>{(localStorageData && localStorageData.movieTitle === movie.name) ? 'View Form Details' : 'Book Ticket'}</button>

                <MovieBookingForm />
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default MovieDetail
