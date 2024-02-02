import React, { useEffect, useState } from "react";
import { options, en, imgPaths } from '../api/api-data.js';
import { getMovie, getMovies, getVideos } from '../api/api-function.js';
import { BsGooglePlay, BsInfoCircleFill } from 'react-icons/bs';
import { FaArrowDown } from 'react-icons/fa6';
import { IoCloseCircle } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";

export default function HomeVisual() {
  const [movieList, setMovieList] = useState([]);
  const [videoKeyList, setVideoKeyList] = useState([]);
  const [overviewList, setOverviewList] = useState([]);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const getMovieList = async () => {
    let playing = await getMovies(options.playing)
    let playinglist = playing.results
    playinglist = playinglist.slice(0, 5)

    let videoKeys = [];
    let overviews = [];

    for (let movie of playinglist) { //for안에서 await하려고 forEach 대신 쓰는 것. movie는 객체.
      let { id, overview } = movie

      if (!overview) { //lang=ko 가 default이므로 한글로 된 영화설명이 없으면 그것만 따로 영어로 가져오는 것.
        let movieEn = await getMovie(id, en)//영어로 된 영화정보를 가져온다
        overview = movieEn.overview;
      }//if !overview

      overviews.push(overview);

      let videoData = await getVideos(id) //videoData = 객체. 내가 필요한건 키값
      if (videoData.results.length === 0) { //videoData.results(video배열)의 길이가 0이라면(=ko영상없는것)
        videoData = await getVideos(id, en) //영어로 된 영화영상을 가져온다
      }
      let videoKey = videoData.results[0].key;

      videoKeys.push(videoKey);
    }
    setVideoKeyList(videoKeys);
    setOverviewList(overviews)
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
    getVideoUrl(e.target.dataset.id)
  }

  return (
    <section className="home-visual swiper-container">
      <div className="swiper-wrapper">
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          loopedslides={2}
          slidesPerView={1}
        >
          {movieList.map((list, idx) =>
            <SwiperSlide key={list.id}>
              <figure className="swiper-slide">
                <img src={`${imgPaths.original}${list.backdrop_path}`} alt="" />
                <figcaption>
                  <small className="original-title">{list.original_title}</small>
                  <h6 className="title">{list.title}</h6>
                  <p className="overview">
                    {`${overviewList[idx].slice(0, 150)}...`}
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
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {videoModalOpen &&
        <section className="video-modal" style={{ display: !videoModalOpen ? "none" : "block" }}>
          <div className="youtube-ratio">
            <iframe src={videoUrl} allowFullScreen></iframe>
          </div>
          <button type="button" className="modal-close-btn" onClick={() => setVideoModalOpen(!videoModalOpen)}>
            <IoCloseCircle />
          </button>
        </section>
      }

      <button className="prev prevBtn"></button>
      <button className="next nextBtn"></button>

      <button className="wheel-btn">
        <FaArrowDown />
      </button>
    </section>
  );
}

