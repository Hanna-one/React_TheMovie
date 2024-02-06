import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from './../components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className="notfound_section" >
        <h1>404 Page Not found!</h1>
      </div>
    </>
  );
}

