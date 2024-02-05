import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsList } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import Topbutton from "./Topbutton";


export default function Header() {
  const [toggle, setToggle] = useState(false);

  return (
    <header>
      <div className="center">
        <h1>
          <Link to="/">
            <span className="hidden">영화 정보 사이트</span>
            <img src="http://localhost:3000/img/logo.png" alt="" />
            <img src="http://localhost:3000/img/logo-text.png" alt="" />
          </Link>
        </h1>

        <nav className="gnb">
          <div className="menu-list">
            <button className="toggle-btn" onClick={()=>setToggle(!toggle)}>
              <BsList size="25" />
            </button>
            <ul className={toggle ? "active" : null}>
              <li><Link to="./list.php?list=playing&page=1">현재상영작</Link></li>
              <li><Link to="./list.php?list=popular&page=1">인기영화</Link></li>
              <li><Link to="./list.php?list=upcoming&page=1">최신/개봉예정</Link></li>
            </ul>
          </div>

          <Link to="/search" className="goto-search" >
            <BsSearch size="20" />
            <span>검색하기</span>
          </Link>

        </nav>
      </div>
    </header>
  );
}

/* 

  <Topbutton />
    </> 
*/