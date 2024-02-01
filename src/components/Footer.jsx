import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="center">
        <h6>
          <span className="hidden">footer</span>
          <img src="./img/logo-square.png" alt="" />
        </h6>
        <div className="textbox">
          <p className="info">
            해당 사이트는 <Link to="https://www.themoviedb.org/?language=ko">TMDB</Link>에서 제공되는 API를 이용하여 구축하였습니다.<br />
            자세한 정보는 <Link to="https://developer.themoviedb.org/docs">TMDB공식문서</Link>를 참조해 주세요
          </p>
          <p className="copy">
            <i>COPYRIGHT</i>
            <i>ⓒ iamonlyone@dothome.co.kr</i>
            <i>ALL RIGHTS RESERVED</i>
          </p>
        </div>
      </div>
    </footer>
  );
}