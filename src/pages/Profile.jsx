import React from "react";
import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImageUrl } from "../services/movieSevices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

function Profile() {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {

    if (user) {
      onSnapshot(doc(db, "users", `${user.email}`), (doc) => {
        if (doc.data()) setMovies(doc.data().favShows);
      });
    }
  }, [user?.email]);

  const slide = (offset) => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + offset;
  };

  const handleUnlikeShow = async(movie) => {
    const userDoc = doc(db, 'users', user.email)

    await updateDoc(userDoc, {
      favShows: arrayRemove(movie)
    })
  }
  console.log(movies)

  return (
    <>
      <div>
        <div>
          <img
            className="block w-full h-[500px] object-cover"
            src="https://assets.nflxext.com/ffe/siteui/vlv3/ff5587c5-1052-47cf-974b-a97e3b4f0656/065df910-dec3-46ae-afa8-7ad2b52dce40/IN-en-20240506-popsignuptwoweeks-perspective_alpha_website_small.jpg"
            alt="///"
          />

          <div className="bg-black/60 fixed top-0 left-0 w-full h-[500px]" />
          <div className="absolute top-[35%] p-4 md:p-8">
            <h1 className="text-3xl md:text-5xl font-nsans-bold my-2">
              My Profile
            </h1>
            <p className="font-nsans-light text-gray-300 text-lg">
             mail: {user.email}
            </p>
          </div>
        </div>

        {/* movie row */}
        <h2 className="font-nsans-bold md:text-xl p-4 capitalize">Favorite Shows</h2>

        <div className="relative flex items-center group">
          <MdChevronLeft
            size={40}
            className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            onClick={() => slide(-500)}
          />

          <div
            id={`slider`}
            className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide"
         >
            {movies.map((movie) => (


              <div 
              key={movie.id} 
              className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[200px] inline-block rounded overflow-hidden cursor-pointer">

                <img
                  className="w-full h-40 block object-cover object-top"
                  src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")}
                  alt={movie.title}
                />

                <div className="absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100">
                  <p className="whitespace-normal text-s flex justify-center items-center h-full font-nsans-bold">
                    {movie.title}
                  </p>

                  <p>
                    <AiOutlineClose
                    size={30}
                    onClick={() => handleUnlikeShow(movie)}
                    className="absolute top-2 right-2"
                    />
                  </p>

                </div>
              </div>



            ))}
          </div>
          <MdChevronRight
            size={40}
            className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            onClick={() => slide(500)}
          />
        </div>
      </div>
    </>
  );
}

export default Profile;