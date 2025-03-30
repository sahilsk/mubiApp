import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import MovieCard from './components/MovieCard.jsx'

// import './App.css'

const App = () => {
    // const [count, setCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);


    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        }
    };


    const fetchMovies = async () => {

        const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                console.log("valid response received");
            }
            const t_result = await response.json();
            setMovies(t_result.results);
            console.log(movieList);
        }
        catch (e) {
            if (typeof response !== 'undefined') {
                console.log(`Ooosp Http response code: ${response.status}`);
            }
            console.log(`ooops, got an error : ${e}`);
        }
        finally {
            console.log("Finished fetching movies");

        }

    }


    const fetchTrendingMovies = async (limit = 10) => {
        const url = 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';

        try {
            const response = await fetch(url, options);
            if (!response.ok && typeof response !== 'undefined') {
                console.log(`Error fetching trending movie: ${response.status}`);
            }
            const t_result = await response.json();
            setTrendingMovies(t_result.results.splice(0, limit));
        }
        catch (e) {
            console.log(`Error fetching trending movies: ${e}`)
        }
        finally {
            console.log("done fetching trending movies")

        }
    }

    useEffect(() => {
        console.log("Initializing...");
        fetchMovies();
        fetchTrendingMovies(6);

    }, []);

    return (
        <>
            <main className="w-full max-w-5xl mx-auto px-4 bg-slate-950 min-h-screen">
//background pattern
                <div className="relative h-full w-full bg-slate-950"><div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div><div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div></div>

                <header className="w-sm md:w-md mx-auto">
                    <img className="w-full block" src="./hero-img.png" />
                    <div className="w-sm md:w-md mx-auto mb-4">
                        <h1 className="text-white text-4xl font-serif font-extrabold text-center"> Find
                            <span className="bg-gradient-to-l from-purple-400 to-violet-900 bg-clip-text text-transparent "> Movies </span>
                            You'll love Without the Hassle </h1>
                    </div>
                </header>


                <section className="w-sm md:w-md flex flex-row justify-start items-center searchArea mx-auto ">

                    <icon className="inline-block w-4 h-4 mr-[-28px]">
                        <svg className="text-sm text-white " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </icon>

                    <input id="searchBar" type="text" className="searchbar block border-slate-700 border-3 pl-2 text-center w-full text-slate-300 rounded-full font-bold" placeholder="search movie" onChange={(e) => { setSearchTerm(e.target.value); }} />
                </section>

                <h3 className="text-white mx-auto justify-center block"> {searchTerm} </h3>


                <br />

                <section id="trending" className="" >
                    <hr className="text-slate-400 m-5" />
                    <span className="text-slate-400  font-bold block"> Trending Movies </span>
                    <ul className="flex flex-row flex-wrap grid grid-cols-2 md:grid-cols-6 gap-1 space-y-1">

                        {trendingMovies.map((movie, index) => {
                            return (
                                <li key={movie.id} className="flex-row flex-nowrap">
                                    <span className="absolute w-2 bottom-[0px] text-9xl bg-gradient-to-tr from-amber-300 to-amber-900 bg-clip-text text-transparent stroke-white "> {index + 1} </span>
                                    <MovieCard movie={movie} showDetail={false} />

                                </li>
                            )
                        })}

                        < /ul>
                </section>

                <hr className="text-slate-400 m-5" />
                <span className="text-slate-400  font-bold block"> All Movies </span>


                <ul className="flex flex-row flex-wrap grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 space-y-1">
                    {movies.map((movie) => {
                        return (<li key={movie.id}>
                            <MovieCard movie={movie} />
                        </li>)
                    })}
                </ul>

                <footer  className="text-center text-slate-800 border-t-slate-800 border-t-1 mt-10 mb-10">

                    Copyright @Advaeta
                </footer>

            </main>
        </>
    )
}

export default App
