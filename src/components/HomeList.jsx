import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../api/api-function';
import { genreList, gradeColors, imgPaths } from '../api/api-data';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

export default function HomeList({ title, option, num }) {
  const [movieList, setMovieList] = useState([]);
  const [gradeColor, setGradeColor] = useState("");
  const [genreName, setGenreName] = useState([]);

  const setItem = (lists) => {
    let gradelist = [];
    let genrelist = [];
    lists.forEach(list => {
      let { vote_average, genre_ids } = list
      vote_average = vote_average.toFixed(1)
      let gradeLevel = Math.floor(vote_average - 5)
      if (gradeLevel > 4) gradeLevel = 4
      if (gradeLevel < 0) gradeLevel = 0
      let gradecolor = gradeColors[gradeLevel]
      let genres = genre_ids.map(num => genreList[num]).join('/')
      gradelist.push(gradecolor);
      genrelist.push(genres);
    })
    setGradeColor(gradelist)
    setGenreName(genrelist)
  }

  const getMovieList = async (option) => {
    const moviesData = await getMovies(option)
    let movies = moviesData.results.slice(0, 15)
    setMovieList(movies);
    setItem(movies);
  }

  useEffect(() => {
    getMovieList(option);
  }, [])

  return (
    <section className="common-section movie-grid-section swiper-section popular-section" >
      <h2>
        <i className="fa-solid fa-clapperboard"></i>
        <em>{title}</em>
      </h2>
      <div className="carousel grid-container">
        <div className="swiper-wrapper" >
          <Swiper
            navigation={{
              prevEl: `.prevBtn${num}`,
              nextEl: `.nextBtn${num}`,
            }}
            // loop={true}
            className={`${option}`}
            modules={[Navigation]}
            breakpoints={{ //breakpoint가 들어있으면 {값} 이 return됨.
              300: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              600: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              900: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
              1200: {
                slidesPerView: 5,
                slidesPerGroup: 5,
              },
              1500: {
                slidesPerView: 6,
                slidesPerGroup: 6,
              },
            }}//breakpoints
          >
            {movieList.length === 0
              ? <p className="no-data">관련 영화목록이 존재하지 않습니다</p>
              :
              <>
                {movieList.map((list, idx) =>
                  <SwiperSlide key={list.id}>
                    <figure className="swiper-slide" >
                      <Link to={`/detail/${list.id}`}>
                        <div className="imgbox">
                          {list.poster_path
                            ? <img src={`${imgPaths.w500}${list.poster_path}`} alt="" />
                            : <img src="./img/no-image.jpg" alt="" />
                          }
                          <span style={{ background: `${gradeColor[idx]}` }}></span>
                          <small>{list.vote_average.toFixed(1)}</small>
                        </div>
                        <figcaption>
                          <h3>{list.title}</h3>
                          <p>{genreName[idx]}</p>
                          <p>{list.release_date}</p>
                        </figcaption>
                      </Link>
                    </figure>
                  </SwiperSlide>
                )}
              </>
            }
          </Swiper >
        </div>
        <button className={`prev prevBtn${num}`}><FaArrowLeft /><i className="fa-solid fa-arrow-left"></i></button>
        <button className={`next nextBtn${num}`}><FaArrowRight /><i className="fa-solid fa-arrow-right"></i></button>
      </div >
    </section >
  );
}

