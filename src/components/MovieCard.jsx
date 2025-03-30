
const MovieCard = ({ movie: { poster_path, title, vote_average, original_language, release_date }, showDetail=true }) => {

    const baseUrl = "https://image.tmdb.org/t/p/w500";
    const constructImageUrl = (path) => {
        return `${baseUrl}/${path}`;
    }

    return (

        // <div className="movieCard p-2 bg-slate-900 rounded-xl min-w-xs w-full sm:w-1/2 md:w-1/4 lg:w-1/4 shadow-inner mb-2 " >
        <div className="movieCard m-1 p-1 bg-slate-900 rounded-xl" >
            <img className="block rounded-xl" src={constructImageUrl(poster_path)} />


            { showDetail && (

            <div className="flex flex-col justify-start">
                <h1 className="text-slate-300 text-sm font-bold text-lg ml-1 truncate text-clip"> {title} </h1>

                <div className="inline-block flex flex-row text-slate-400" >
                    <img src="star.svg" className="inline-block align-middle" />
                    <span className=""> {vote_average.toFixed(1)} </span>
                    <span className="text-slate-500 font-extrabold"> • </span>
                    <span className="capitalize"> {original_language} </span>
                    <span className="text-slate-500 font-extrabold"> • </span>
                    <span className="capitalize"> {release_date.split("-")[0]} </span>
                </div>

            </div> 
            )}

        </div> // 'end movieCard'


    )
}

export default MovieCard;
