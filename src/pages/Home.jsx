import React, { useEffect, useState } from 'react';
import Topbutton from '../components/Topbutton';
import { options, ko, en, imgPaths } from "../api/api-data.js";
import { getMovie, getMovies, getVideos } from '../api/api-function.js';
import { BsGooglePlay, BsInfoCircleFill } from 'react-icons/bs';
import { FaArrowDown } from "react-icons/fa6";
import { IoClose } from 'react-icons/io5';

export default function Home() {
  const [movieList, setMovieList] = useState([]);
  const [videoKeyList, setVideoKeyList] = useState([]);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const getMovieList = async () => {
    let playing = await getMovies(options.playing)
    let playinglist = playing.results
    playinglist = playinglist.slice(0, 5)

    let videoKeys = [];

    for (let movie of playinglist) { //for안에서 await하려고 forEach 대신 쓰는 것. movie는 객체.
      let { id, title, original_title, overview, backdrop_path } = movie

      if (!overview) { //lang=ko 가 default이므로 한글로 된 영화설명이 없으면 그것만 따로 영어로 가져오는 것.
        let movieEn = await getMovie(id, en)//영어로 된 영화정보를 가져온다
        overview = movieEn.overview
      }//if !overview
      overview = overview.slice(0, 150) + '...'

      let videoData = await getVideos(id) //videoData = 객체. 내가 필요한건 키값
      if (videoData.results.length === 0) { //videoData.results(video배열)의 길이가 0이라면(=ko영상없는것)
        videoData = await getVideos(id, en) //영어로 된 영화영상을 가져온다
      }
      let videoKey = videoData.results[0].key

      videoKeys.push(videoKey);
    }
    setVideoKeyList(videoKeys);
    setMovieList(playinglist);
  }

  useEffect(() => {
    getMovieList();
  }, [])

  const getVideoUrl = (value) => {
    setVideoUrl(`http://www.youtube.com/embed/${value}?playlist=${value}&autoplay=1&loop=1&mute=1&playsinline=1`);
  }

  const handlePlay = (e) => {
    setVideoModalOpen(!videoModalOpen)
    console.log(videoModalOpen);
    getVideoUrl(e.target.dataset.id)
  }

  const handleClose = () => {
    setVideoModalOpen(!videoModalOpen)
  }

  return (
    <>
      <section className="home-visual">
        <div className="swiper-wrapper">
          {movieList.map((list, idx) =>
            <figure className="swiper-slide" key={list.id}>
              <img src={`${imgPaths.original}${list.backdrop_path}`} alt="" />
              <figcaption>
                <small className="original-title">{list.original_title}</small>
                <h6 className="title">{list.title}</h6>
                <p className="overview">
                  {list.overview}
                </p>
                <div>
                  <button type="button" className="play-btn" data-id={videoKeyList[idx]} onClick={(e) => handlePlay(e)}>
                    <BsGooglePlay /><span>재생</span>
                  </button>
                  <button type="button" className="detail-btn" value={list.id}>
                    <BsInfoCircleFill /><span>상세정보</span>
                  </button>
                </div>
              </figcaption>
            </figure>
          )}
        </div>
        {/* <!-- 버튼 안 넣으면 carousel grid-container 버튼누를때 같이움직임--> */}
        <button className="prev"></button>
        <button className="next"></button>

        <button className="wheel-btn">
          <FaArrowDown />
        </button>
        {/* <VideoModal videoModalOpen={videoModalOpen} videoUrl={videoUrl} getModalOpen={setVideoModalOpen}/> */}
      </section>
      {/* {videoModalOpen && <VideoModal videoUrl={videoUrl} />} */}
      {videoModalOpen &&
        <section className="video-modal" style={{ display: !videoModalOpen ? "none" : "block" }}>
          {/* <img className="youtube-ratio" src="./img/youtube-ratio.jpg" alt="" /> */}
          <iframe src={videoUrl} allowFullScreen></iframe>
          <button type="button" className="modal-close-btn" onClick={handleClose}>
            <IoClose />
          </button>
        </section>
      }

      <main className="home-content">
        <section className="common-section movie-grid-section swiper-section popular-section" >
          <h2>
            <i className="fa-solid fa-clapperboard"></i>
            <em>현재 인기 영화</em>
          </h2>
          <div className="carousel grid-container">
            <div className="swiper-wrapper">
            </div>
            <button className="prev"><i className="fa-solid fa-arrow-left"></i></button>
            <button className="next"><i className="fa-solid fa-arrow-right"></i></button>
          </div>
        </section>

        <section className="common-section movie-grid-section swiper-section upcoming-section">
          <h2>
            <i className="fa-solid fa-calendar-days"></i>
            <em>최신, 개봉예정 영화</em>
          </h2>
          <div className="carousel grid-container">
            <div className="swiper-wrapper">
            </div>
            <button className="prev"><i className="fa-solid fa-arrow-left"></i></button>
            <button className="next"><i className="fa-solid fa-arrow-right"></i></button>
          </div>
        </section>

        <section className="common-section movie-grid-section swiper-section rated-section">
          <h2>
            <i className="fa-solid fa-square-poll-vertical"></i>
            <em>평점이 높은 영화</em>
          </h2>
          <div className="carousel grid-container">
            <div className="swiper-wrapper">
            </div>
            <button className="prev"><i className="fa-solid fa-arrow-left"></i></button>
            <button className="next"><i className="fa-solid fa-arrow-right"></i></button>
          </div>
        </section>

        <section className="common-section movie-grid-section swiper-section trend-section">
          <h2>
            <i className="fa-solid fa-comments"></i>
            <em>주간 화제작</em>
          </h2>
          <div className="carousel grid-container">
            <div className="swiper-wrapper">
            </div>
            <button className="prev"><i className="fa-solid fa-arrow-left"></i></button>
            <button className="next"><i className="fa-solid fa-arrow-right"></i></button>
          </div>
        </section>
      </main>
      <Topbutton />
    </>
  );
}

