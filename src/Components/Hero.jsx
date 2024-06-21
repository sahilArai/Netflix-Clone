import React from 'react'
import { useState,useEffect } from 'react'
import endpoints, { createImageUrl } from '../services/movieSevices';
import axios from "axios"

function Hero() {

    const [movie, setMovie] = useState({});

    useEffect(() => {
      axios.get(endpoints.popular).then((Response) => {
        const movies = Response.data.results;
        const randomMovie = movies[Math.floor(Math.random()*movies.length)]
        // console.log(randomMovie.title)

        setMovie(randomMovie)
      })
    }, [])

    const truncate = (str, length) => {
        if (!str) return "";

        return str.length > length ? str.slice(0,length) + '...' : str
    }
    
    if (!movie) {
        return(
            <>
                <p>fetching the movie</p>
            </>
        )
    }

    const {title, backdrop_path, release_date, overview } = movie

  return (
    <div className='w-full h-[550px] lg:h-[550px]'>
        <div className='w-full h-full'>
            <div className='absolute w-full h-[550px] lg:h-[550px] bg-gradient-to-r from-black' />
                <img 
                src={createImageUrl(backdrop_path, "original")} 
                alt={title} 
                className='w-full h-full object-cover object-top'
                />

                <div className='absolute w-full top-[29%] sm:top-[30%] md:top-[24%] xl:top-[30%] md:p-8'>
                    <h1 className='text-3xl md:text-6xl font-nsans-bold'>{title}</h1>
                    <div className='mt-8 mb-4'>
                        <button className='capitalize bg-gray-700 bg-opacity-30	border border-gray-300 border-opacity-15 py-2 px-5 rounded-sm hover:scale-110'>play</button>
                        <button className='capitalize  bg-black-600 bg-opacity-20 border border-gray-300 border-opacity-15 py-2 px-5 ml-4 rounded-sm hover:scale-110'>watch later</button>
                    </div>
                    <p className='text-gray-400 text-sm'>{release_date}</p>
                    <p className='w-full md:max-w-[70%] lg:max-w-[45%] xl:max-w-[35%] text-gray-200'>{truncate(overview, 165)}</p>
                </div>

        </div>
        
    </div>
  )
}

export default Hero