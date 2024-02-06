import React, { useEffect, useRef, useState } from 'react';
import { genreList, gradeColors, imgPaths } from '../api/api-data';
import { BsEraser, BsSearch, BsTrash3 } from 'react-icons/bs';
import { searchByGenres, searchByKeyword } from '../api/api-function';
import { Link } from 'react-router-dom';

export default function Search() {
  const [imageList, setImageList] = useState([]);
  const [slide, setSlide] = useState(false);
  const [num, setNum] = useState(0);
  const [genreNumbers, setGenreNumbers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [gradeColor, setGradeColor] = useState("");
  const [genreName, setGenreName] = useState([]);
  const [active, setActive] = useState("");
  const [text, setText] = useState("");

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    imageSlide(imageList);
  }, [])

  const imageSlide = (image) => {
    let n = 1
    setTimeout(() => { //화면뜨자마자 active걸면 제대로 작동이 안되므로.
      setSlide(true)
    }, 10)

    setInterval(() => {
      n++
      if (n > 4) n = 1;
      setNum(n);
    }, 5000)
  }

  // let timeoutId
  // const timeoutId


  const genreBtnsHandler = (e) => {//Handler 이벤트를 주는 버튼의 관례적인 이름.

    setActive((prev) => {
      return e.target.value;
    })
    setIsPending(true);
    setText("");
    // let page = 1
    // inputRef.value = "";
    // containerRef.current.style.background = 'red';
    // qySel('.search-input').value = ''
    // qySel('.grid-container').innerHTML = '' 

    /* let idx = genreNumbers.indexOf(e.target.value)
    if (idx === -1) {
      genreNumbers.push(e.target.value)
      setGenreNumbers(genreNumbers)
      console.log(genreNumbers);
    } else {
      genreNumbers.splice(idx, 1)
      setGenreNumbers(genreNumbers)
    }
    if (genreNumbers.length === 0) return false */

    setTimeout(async () => {
      // controller.abort()
      // let movieData = await searchByGenres(genreNumbers.join(', '))
      let movieData = await searchByGenres(active)
      // let totalPages = movieData.total_pages
      let movies = movieData.results.slice(0, 15)
      setMovieList(movies)
      setItem(movies)
      // displayMovies(movies, '.search-result-section .grid-container')
      setIsPending(false)
    }, 100)

    // clearTimeout(timeoutId)

  }//getreBtnsHandler

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

  const searchHandler = (e) => {
    setText(e.target.value)
    if (isPending === true) setIsPending(false)
    setTimeout(async () => {
      let movieData = await searchByKeyword(e.target.value)
      let movies = movieData.results
      setMovieList(movies)
      setItem(movies)
      setIsPending(true)
    }, 1000)
  }

  return (
    <>
      <figure className="slide">
        {imageList.length === 0
          ? <img src={`http://localhost:3000/img/film${num}.jpg`} className={slide ? `slide-img${num} active` : `slide-img${num}`} alt="" key={num} />
          : imageList.map((img, idx) =>
            <img src={`${imgPaths.original}${img.file_path}`} className={slide ? `slide-img${idx + 1} active` : `slide-img${idx + 1}`} alt="" key={idx} />)
        }
      </figure>

      <main className="search-content">
        <form className="search-form">
          <fieldset className="search-keyword">
            <span className="search-icon">
              <BsSearch size="25" />
            </span>
            <input list="keyword-list" name="search-input" className="search-input" value={text} type="text" placeholder="영화제목을 입력하세요" onChange={(e) => searchHandler(e)} />
            <datalist id="keyword-list">
            </datalist>
            <button type="reset" className="delete-btn" title="검색기록삭제">
              <BsEraser size="25" />
              {/* <BsTrash3 size="25" /> */}
            </button>
          </fieldset>

          <fieldset className="genre-btns">
            {Object.keys(genreList).map((genreNumber, idx) => (
              <button type="button" key={genreNumber} className={genreNumber === active ? "genre-btn active" : "genre-btn"} value={genreNumber} onClick={(e) => genreBtnsHandler(e)}>
                {genreList[genreNumber]}
              </button>
            ))}
          </fieldset>
        </form>

        <section className="common-section movie-grid-section wrap-section search-result-section">
          <h2>
            <i className="fa-solid fa-square-poll-vertical"></i>
            <em>검색결과</em>
          </h2>
          <div className="grid-container">
            {isPending && movieList.length === 0
              ? <p className="no-data">관련 영화목록이 존재하지 않습니다</p>
              :
              <>
                {movieList.map((list, idx) =>
                  <figure >
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
                )}
              </>
            }
          </div>
        </section>

      </main>
      <div className="trigger">

      </div>
    </>
  );
}

