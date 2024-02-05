import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from './../components/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <div style={{ margin: "auto 0", width: "100vw", height: "90vh", lineHeight: "90vh"}}>
        <h1 style={{ fontSize: "40px", textAlign: "center" }}>404 Page Not found!</h1>
      </div>
    </>
  );
}

