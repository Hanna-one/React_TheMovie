import React, { useEffect, useState } from 'react';
import Topbutton from '../components/Topbutton';
import { options, ko, en, imgPaths } from '../api/api-data.js';
import { getMovie, getMovies, getVideos } from '../api/api-function.js';
import { BsGooglePlay, BsInfoCircleFill } from 'react-icons/bs';
import { FaArrowDown } from 'react-icons/fa6';
import { IoCloseCircle } from 'react-icons/io5';
import SetSwiper from '../components/HomeVisual.jsx';
import HomeVisual from '../components/HomeVisual.jsx';
import HomeList from '../components/HomeList.jsx';

export default function Home() {

  return (
    <>
      <HomeVisual />
      <main className="home-content">
        <HomeList title="현재 인기 영화" option={options.popular} num={1}/>
        <HomeList title="최신, 개봉예정 영화" option={options.upcoming} num={2}/>
        <HomeList title="평점이 높은 영화" option={options.rated} num={3}/>
        <HomeList title="주간 화제작" option={options.trend} num={4}/>
      </main>
      <Topbutton />
    </>
  );
}

