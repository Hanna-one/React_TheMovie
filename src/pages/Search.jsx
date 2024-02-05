import React from 'react';

export default function Search() {
  return (
    <>
      <figure className="slide">

      </figure>

      <main className="search-content">
        <form className="search-form">
          <fieldset className="search-keyword"> 
            <span className="search-icon">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <input list="keyword-list" className="search-input" type="text" placeholder="영화제목을 입력하세요" />
              <datalist id="keyword-list"> 
              </datalist>
              <button className="delete-btn" title="검색기록삭제" type="button">
                <i className="fa-solid fa-trash-can"></i>
              </button>
          </fieldset>

          <fieldset className="genre-btns">
          </fieldset>
        </form>

        <section className="common-section movie-grid-section wrap-section search-result-section">
          <h2>
            <i className="fa-solid fa-square-poll-vertical"></i>
            <em>검색결과</em>
          </h2>
          <div className="grid-container">
          </div>
        </section>

      </main>
      <div className="trigger">

      </div>
    </>
  );
}

