import React, { useEffect, useState } from 'react';
import { genreList, gradeColors, imgPaths, ko, options } from '../api/api-data';
import { Link, useParams } from 'react-router-dom';
import { getMovies } from '../api/api-function';
import Paging from '../components/Paging';

export default function List() {
  const [imageList, setImageList] = useState([]);
  const [slide, setSlide] = useState(false);
  const [num, setNum] = useState(0);
  const [title, setTitle] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [gradeColor, setGradeColor] = useState("");
  const [genreName, setGenreName] = useState([]);

  const params = useParams();
  const list = params.option;
  const page = params.page;
  let option = "";

  useEffect(() => {
    getMovieList();
    imageSlide(imageList);
  }, [list, page])
  
  const getTitle = () => {
    if (list === 'playing') {
      option = options.playing
      setTitle('현재상영작')
    } else if (list === 'popular') {
      option = options.popular
      setTitle('인기영화')
    } else if (list === 'upcoming') {
      option = options.upcoming
      setTitle('최신/개봉예정')
    }
  }

  const imageSlide = (image) => {
    let n = 0
    setTimeout(() => { //화면뜨자마자 active걸면 제대로 작동이 안되므로.
      setSlide(true)
    }, 10)

    setInterval(() => {
      n++
      if (n > 4) n = 1;
      setNum(n);
    }, 5000)
  }

  const getMovieList = async () => {
    if (list === 'playing') {
      option = options.playing
      setTitle('현재상영작')
    } else if (list === 'popular') {
      option = options.popular
      setTitle('인기영화')
    } else if (list === 'upcoming') {
      option = options.upcoming
      setTitle('최신/개봉예정')
    }

    const movieData = await getMovies(option, ko, page)
    let movies = movieData.results
    let images = movieData.results.slice(0, 5)
    let totalPages = parseInt(movieData.total_pages)
    totalPages = (totalPages > 100) ? 100 : totalPages
    setMovieList(movies)
    setImageList(images)
    setTotalPage(totalPages)
    setItem(movies)
    console.log(movieData);
  }

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

  return (
    <>
      <figure className="slide">
        {imageList.map((img, idx) =>
          <img src={`${imgPaths.original}${img.backdrop_path}`} className={idx === num ? `slide-img${idx + 1} active` : `slide-img${idx + 1}`} alt="" key={idx} />)
        }
      </figure>

      <main className="list-content">
        <h2 className="list-title">{title}</h2>

        <section className="common-section movie-grid-section wrap-section list-section">
          <h2>
            <i className="fa-solid fa-photo-film"></i>
            <em></em>
          </h2>
          <div className="grid-container">
            {movieList && movieList.length === 0
              ? <p className="no-data">관련 영화목록이 존재하지 않습니다</p>
              :
              <>
                {movieList.map((list, idx) =>
                  <figure >
                    <Link to={`/detail/${list.id}`}>
                      <div className="imgbox">
                        {list.poster_path
                          ? <img src={`${imgPaths.w500}${list.poster_path}`} alt="" />
                          : <img src="http://localhost:3000/img/no-image.jpg" alt="" />
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
                )}
              </>
            }
          </div>
        </section>
        <Paging list={list} page={page} totalPage={totalPage} />
        <nav className="paging">
        </nav>
      </main>
    </>
  );
}

