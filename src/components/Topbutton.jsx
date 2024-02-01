import React, { useEffect, useState } from 'react';
import { BsArrowUp } from "react-icons/bs";

export default function Topbutton() {
  const [active, setActive] = useState(false);
  let scrollY = window.scrollY

  const setTopBtn = () => {
    if (window.scrollY > 300) {
      setActive(!active)
    } else {
      setActive(active)
    }
  }//setTopBtn

  useEffect(() => {
    window.addEventListener('resize', e => {
      scrollY = window.scrollY
      setTopBtn()
    })
    window.addEventListener('scroll', e => {
      scrollY = window.scrollY
      setTopBtn()
    })
  }, [])

  const handleTopBtn = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button className={active ? "top-btn active" : "top-btn"} onClick={handleTopBtn}>
      <BsArrowUp size="30"/>
    </button>
  );
}

