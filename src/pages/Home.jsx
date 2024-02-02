import React, { useEffect, useState } from 'react';
import Topbutton from '../components/Topbutton';
import { options, ko, en, imgPaths } from '../api/api-data.js';
import { getMovie, getMovies, getVideos } from '../api/api-function.js';
import { BsGooglePlay, BsInfoCircleFill } from 'react-icons/bs';
import { FaArrowDown } from 'react-icons/fa6';
import { IoCloseCircle } from 'react-icons/io5';
import SetSwiper from '../components/HomeVisual.jsx';
import HomeVisual from '../components/HomeVisual.jsx';

export default function Home() {

  return (
    <>
      <HomeVisual />

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

