import { Link } from "react-router-dom";
import { useMovieContext } from "../Context/MovieContext";

const Home = () => {
    const { movies } = useMovieContext();

    return (
        <div className="container col-sm-10 d-flex justify-content-center flex-wrap">
            {movies && movies.map((movie) => {
                const { id, name, image, language, genres } = movie.show;
                return (
                    <Link className="link-underline link-underline-opacity-0" key={id} to={`/movieDetail/${id}`}>
                        <div className="card movie_card_component mx-3 my-4" style={{width: "15rem"}} >
                            {image ? <img src={image.medium} className="card-img opacity-75" alt={name}  /> : <img src="https://via.placeholder.com/210x295?text=No+Image" className="card-img" alt={name} />}
                            <div className="card-body">
                                <h3 className="card-title">{name}</h3>
                                <p><b>Genre: </b>{genres.join(', ')}</p>
                                <p><b>Language: </b>{language}</p>
                            </div>
                            
                            {/* <button type="button" className="btn btn-outline-secondary mx-3 mb-4">Book Tickets</button> */}
                        </div>
                    </Link>
                )
            })
        }
        </div>
    )
}

export default Home
