import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCredits, getImages, getMovie, getVideos } from '../api/api-function';
import { en, gradeColors, imgPaths } from '../api/api-data';
import { IoClose } from 'react-icons/io5';

export default function Detail() {
  const params = useParams();
  const id = params.id;
  const [imageList, setImageList] = useState([]);
  const [movieInfo, setMovieInfo] = useState([]);
  const [runtime, setRuntime] = useState([]);
  const [gradeColor, setGradeColor] = useState("");
  const [genreName, setGenreName] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [directorList, setDirectorList] = useState([]);
  const [producerList, setProducerList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [castList, setCastList] = useState([]);
  const [similarMovieList, setSimilarMovieList] = useState([]);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");


  useEffect(() => {
    getMovieInformation();
    imageSlide(imageList);
  }, [])

  const getMovieInformation = async () => {
    let imageData = await getImages(id);
    let { backdrops, posters } = imageData // let backdrops = imageData.backdrops
    let images = backdrops.slice(0, 10)
    setImageList(images);

    let movieData = await getMovie(id);
    setMovieInfo(movieData);

    let {
      title, vote_average, vote_count, runtime, release_date, genres,
      overview, original_title, production_companies
    } = movieData
    let gradeLevel = Math.floor(vote_average - 5)
    if (gradeLevel > 4) gradeLevel = 4
    if (gradeLevel < 0) gradeLevel = 0
    let gradecolor = gradeColors[gradeLevel]
    genres = (genres.length) ? genres.map(genre => genre.name).join('/') : '장르 정보 없음'
    release_date = (release_date) ? movieInfo.release_date : '출시일 정보 없음'

    if (!overview) {
      let enmovieData = getMovie(id, en)
      overview = (enmovieData.overview) ? enmovieData.overview : '영화설명 정보 없음'
    }
    let company = (production_companies.length) ? production_companies.map(company => company.name).join(', ') : '제작사 정보 없음'

    setGradeColor(gradecolor)
    setGenreName(genres)
    setCompanyName(company)

    let credits = await getCredits(id)
    let { cast, crew } = credits
    setCastList(cast.slice(0, 10))
    /* 
    crew filter. map 상세설명 복붙하기
    */
    let directors = crew.filter(v => v.job === 'Director').map(v => v.name).join(', ')
    setDirectorList(directors ? directors : '감독 정보 없음')
    //setDirectorist(directors)
    let producers = crew.filter(v => v.job === 'Producer').map(v => v.name).join(', ')
    setProducerList(producers ? producers : '제작자 정보 없음')
    //setProducerList(producers)

    let videoData = await getVideos(id)
    let videos = videoData.results
    if (videos.length === 0) { //videoData.results(video배열)의 길이가 0이라면(=ko영상없는것)
      videoData = await getVideos(id, en) //영어로 된 영화영상을 가져온다
      videos = videoData.results
    }
    setVideoList(videos);
  }

  const [slide, setSlide] = useState(false);
  const [num, setNum] = useState(0);

  const imageSlide = (image) => {
    let n = 0
    setTimeout(() => { //화면뜨자마자 active걸면 제대로 작동이 안되므로.
      setSlide(true)
    }, 10)

    setInterval(() => {
      n++
      if (n > 9) n = 1;
      setNum(n);
    }, 5000)
  }

  const getVideoUrl = (value) => {
    setVideoUrl(`http://www.youtube.com/embed/${value}?playlist=${value}&autoplay=1&loop=1&mute=1&playsinline=1`);
  }

  const handlePlay = (e) => {
    setVideoModalOpen(!videoModalOpen)
    getVideoUrl(e.currentTarget.dataset.id)
  }


  return (
    <>
      <figure className="slide">
        {imageList.length < 2
          ? <img src={`http://localhost:3000/img/film${num}.jpg`} className={slide ? `slide-img${num} active` : `slide-img${num}`} alt="" key={num} />
          : imageList.map((img, idx) =>
            <img src={`${imgPaths.original}${img.file_path}`} className={idx === num ? `slide-img${idx + 1} active` : `slide-img${idx + 1}`} alt="" key={idx} />)
        }
      </figure>
      <main className="detail-content">
        <section className="detail-section">
          {movieInfo && movieInfo.poster_path
            ? <img className="poster" src={`${imgPaths.w500}${movieInfo.poster_path}`} alt="" />
            : <img className="poster" src="http://localhost:3000/img/no-image.jpg" alt="" />
          }
          <div className="detail-info">
            {movieInfo &&
              <>
                <h2 className="title">{movieInfo.title}</h2>
                <ul className="meta">
                  <li>
                    <div className="vote_average">
                      <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="35" className="stroke" />
                        <circle cx="50" cy="50" r="35" pathLength="10" className="progress" style={{ stroke: `${gradeColor}` }}/>
                      </svg>
                      <b className="average" style={{ color: `${gradeColor}` }}>{Number(movieInfo.vote_average).toFixed(1)}</b>
                      <img className="logo-small" src="http://localhost:3000/img/logo-square.png" alt="" />
                    </div>
                    <small className="vote_cnt">({movieInfo.vote_count})</small>
                  </li>
                  <li>
                    <i className="fa-solid fa-clock-rotate-left"></i>
                    <em className="hour">{movieInfo.runtime && parseInt(movieInfo.runtime / 60)}</em>
                    <small className="hourtext">Hour</small>
                    <em className="min">{movieInfo.runtime && movieInfo.runtime % 60}</em>
                    <small>Min</small>
                  </li>
                  <li>
                    <i className="fa-regular fa-calendar-check"></i>
                    <small className="date">{movieInfo.release_date}</small>
                  </li>
                  <li className="genres">
                    <i className="fa-solid fa-tags"></i>
                    <small className="genre">{genreName}</small>
                  </li>
                </ul>
                <p className="overview">{movieInfo.overview}</p>
                <ul className="info">
                  <li>
                    <i className="fa-solid fa-clapperboard"></i>
                    <small>제목</small>
                    <em className="original_title">{movieInfo.original_title}</em>
                  </li>
                  <li>
                    <i className="fa-solid fa-building"></i>
                    <small>제작사</small>
                    <em className="production">{companyName}</em>
                  </li>
                  <li>
                    <i className="fa-solid fa-user-tie"></i>
                    <small>제작자</small>
                    <em className="producer">{producerList}</em>
                  </li>
                  <li>
                    <i className="fa-solid fa-user-gear"></i>
                    <small>감독</small>
                    <em className="director">{directorList}</em>
                  </li>
                </ul>
              </>
            }
          </div>

        </section>

        <section className="common-section scroll-section people-section">
          <h2>
            <i className="fa-solid fa-users"></i>
            <em>출연진</em>
          </h2>
          <div className="grid-container">
            {castList.length === 0
              ? <p className="no-data">관련 정보가 존재하지 없습니다</p>
              : castList.map(list =>
                <figure key={list.id}>
                  {/* <Link to={`${list.id}`}>
                    <img src={(list.profile_path) ? `${imgPaths.w500}${list.profile_path}` : './img/no-image.jpg'} alt="" />
                    <figcaption>
                      <em>{list.name}</em>
                      <b>{list.character}</b>
                    </figcaption>
                  </Link> */}
                  <div>
                    <img src={(list.profile_path) ? `${imgPaths.w500}${list.profile_path}` : './img/no-image.jpg'} alt="" />
                    <figcaption>
                      <em>{list.name}</em>
                      <b>{list.character}</b>
                    </figcaption>
                  </div>
                </figure>
              )}
          </div>
        </section>

        <section className="common-section scroll-section img-section">
          <h2>
            <i className="fa-solid fa-image"></i>
            <em>관련 이미지</em>
          </h2>
          <div className="grid-container">
            {imageList.length === 0
              ? <p className="no-data">관련 이미지가 존재하지 없습니다</p>
              : imageList.map(list =>
                <div /* to={`${imgPaths.original}${list.file_path}`} */ className="viewbox-btn" key={list.file_path}>
                  <img src={`${imgPaths.w500}${list.file_path}`} alt="" />
                </div>
              )}
          </div>
        </section>

        <section className="common-section scroll-section video-section">
          <h2>
            <i className="fa-solid fa-video"></i>
            <em>관련 영상</em>
          </h2>
          <div className="grid-container">
            {videoList.length === 0
              ? <p className="no-data">관련 영상이 존재하지 않습니다</p>
              : videoList.map((list) =>
                <button data-id={list.key} onClick={e => handlePlay(e)} key={list.id}>
                  <img src={`https://img.youtube.com/vi/${list.key}/mqdefault.jpg`} alt="" />
                </button>
              )}
          </div>
        </section>

        {videoModalOpen &&
          <section className="video-modal" style={{ display: !videoModalOpen ? "none" : "block" }}>
            <div className="youtube-ratio">
              <iframe src={videoUrl} allowFullScreen></iframe>
            </div>
            <button type="button" className="modal-close-btn" onClick={() => setVideoModalOpen(!videoModalOpen)}>
            <IoClose size="40"/>
            </button>
          </section>
        }

        {/* <section className="common-section movie-grid-section wrap-section similar-section">
          <h2>
            <i className="fa-solid fa-photo-film"></i>
            <em>유사한 영화</em>
          </h2>
          <div className="grid-container">

          </div>
        </section> */}
      </main>
    </>
  );
}

{/* <Link to={`${imgPaths.original}${list.file_path}`} className="viewbox-btn" key={list.file_path}>
  <img src={`${imgPaths.w500}${list.file_path}`} alt="" />
</Link> */}