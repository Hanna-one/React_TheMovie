import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Paging({ list, page, totalPage }) {
  const [startPaging, setStartPaging] = useState(0);
  const [endPaging, setEndPaging] = useState(0);
  const [finishPaging, setFinishPaging] = useState(0);

  useEffect(() => {
    const start = (page % 5 !== 0)
      ? Math.floor(page / 5) * 5 + 1
      : Math.floor(page / 5) * 5 - 4;
    setStartPaging(start);

    let end = start + 4;
    end = (end < totalPage) ? end : totalPage;
    setEndPaging(end);

    const finish = Math.ceil(totalPage / 5) * 5 - 5;
    setFinishPaging(finish);
  }, [page, totalPage]);

  const pageNumbers = Array.from({ length: (endPaging - startPaging + 1) }, (_, i) => i + startPaging);

  return (
    <nav className="paging">
      {page >= 5 && 
        <Link to={`/list/${list}/${startPaging - 5}`}>이전</Link>
      }
      {pageNumbers.map((pageNum, idx) => 
      <>
      {console.log(typeof pageNum)}
      {console.log(typeof page)}
        <Link 
          key={pageNum} 
          to={`/list/${list}/${pageNum}`} 
          className={`${Number(page) === pageNum ? `paging-btn${pageNum} active` : `paging-btn${pageNum}`}`}
        >
          {pageNum}
        </Link>
        </>
      )}
      {page <= finishPaging && 
        <Link to={`/list/${list}/${endPaging + 1}`}>다음</Link>
      }
    </nav>
  );
}

