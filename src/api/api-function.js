import axios from "axios";
import { baseUrl, apiKey, ko, en, options, imgPaths, gradeColors, genreList } from "./api-data.js";
import { useEffect, useState } from "react";
// import { qySel, qySelAll, setPersonModal, showModal, sortArray, videoResize } from "./functions.js";

export const getMovies = (option, lang=ko, page = 1) => { 
  return new Promise (async resolve => {
    let result = await fetch(`${baseUrl}${option}${apiKey}${lang}&include_adult=false&page=${page}`) 
    //https://api.themoviedb.org/3/movie/latest?api_key={key}&language=ko-KR&include_adult=false&sort_by=popularity.desc&page=1
    let data = await result.json()
    resolve(data) 
  })//promise
}//getMovies

export const GetMovieslist = (option, lang=ko, page = 1) => { 
  const [list, setList] = useState([]);
  useEffect(()=>{
    axios.get(`${baseUrl}${option}${apiKey}${lang}&include_adult=false&page=${page}`) 
    .then(result => setList(result.data.results))
  }, [option])
  return [list];
}//getMovies

export const getMovie = (movieId, lang=ko) => {
  return new Promise (async resolve => {
    let result = await fetch(`${baseUrl}/movie/${movieId}${apiKey}${lang}&include_adult=false`)
    let data = await result.json()
    resolve(data)
  })//promise
}//getMovie

export const getVideos = (movieId, lang=ko) => {
  return new Promise (async resolve =>{
    let result = await fetch(`${baseUrl}/movie/${movieId}/videos${apiKey}${lang}&include_adult=false`)
    let data = await result.json()
    resolve(data)
  })//promise
}//getVideos

export const getImages = (movieId) => {
  return new Promise(async resolve => {
    let result = await fetch(`${baseUrl}/movie/${movieId}/images${apiKey}`)
    let data = await result.json()
    resolve(data)
  })//promise
}//getImages

export const getCredits = (movieId, lang=ko) => {
  return new Promise( async resolve => {
    const result = await fetch(`${baseUrl}/movie/${movieId}/credits${apiKey}${lang}&include_adult=false`)
    const data = await result.json()
  resolve(data)
  })//promise
}//getCredits

export const getSimilarMovies = (movieId, lang=ko) => {
  return new Promise (async resolve => {
    let result = await fetch(`${baseUrl}/movie/${movieId}/similar${apiKey}${lang}&include_adult=false`)
    let data = await result.json()
    resolve(data)
  })//promise
}//getSimilarMovies

export const getProfile = (personId, lang = ko) => {
  return new Promise (async resolve => {
    let result = await fetch(`${baseUrl}/person/${personId}${apiKey}${lang}`)
    let data = result.json()
    resolve(data)
  })//promise
}//getProfile

export const getFilmography = (personId, lang=ko) => {
  return new Promise (async resolve => {
    let result = await fetch(`${baseUrl}/person/${personId}/movie_credits${apiKey}${lang}`)
    let data = result.json()
    resolve(data)//promise
  })//promise
}//getFilmography

/* display 주석처리 -> 컴포넌트로 처리하기 */

// export const displayMovies = (data, container, gridClassName='') => { 
//   if(!data.length){ //= if(data.length === 0)
//     qySel(container).innerHTML = '<p class="no-data">관련 영화목록이 존재하지 않습니다</p>'
//     return false
//   }//if
//   data.forEach(movie => {
//     let {id, poster_path, vote_average, title, genre_ids, release_date} = movie
//     let imgPath = (poster_path) ? `${imgPaths.w500}${poster_path}`: './img/no-image.jpg'
//     vote_average = vote_average.toFixed(1)
//     let gradeLevel = Math.floor(vote_average - 5)
//     if(gradeLevel > 4) gradeLevel = 4
//     if(gradeLevel < 0) gradeLevel = 0
//     let gradecolor = gradeColors[gradeLevel]
//     let genres = genre_ids.map(num=>genreList[num]).join('/')
//     /* 
//     genre_ids = [28,53,80]

//     genre_ids.map(num=>genreList[num]) 숫자는 [''] 컴피티드로.
//     -> [ genreList[28],genreList[28],genreList[28] ]
//     -> ['액션','스릴러','범죄']

//     join('/')
//     '액션 / 스릴러 / 범죄'
//     */
//     qySel(container).insertAdjacentHTML('beforeend',`
//       <figure class="${gridClassName}">
//         <a href="./detail.php?id=${id}">
//           <div class="imgbox">
//             <img src="${imgPath}" alt="">
//             <span style="background:${gradecolor}"></span>
//             <small>${vote_average}</small>
//           </div>
//           <figcaption>
//             <h3>${title}</h3>
//             <p>${genres}</p>
//             <p>${release_date}</p>
//           </figcaption>
//         </a>
//       </figure> 
//     `)
//   })//forEach
// }//displayMovies

// export const displayVideos = (data, container) => {
//   if(data.length === 0){
//     qySel(container).innerHTML = '<p class="no-data">관련 영상이 존재하지 없습니다</p>'
//     return false //false는 안 붙여도 됨. 위의 조건에 맞으면 중지하겠다는 의미.
//   }//if
//   data.forEach((video)=>{
//     let {key} = video
//     qySel(container).insertAdjacentHTML('beforeend',`
//       <button value="${key}">
//         <img src="https://img.youtube.com/vi/${key}/mqdefault.jpg" alt>
//       </button>
//     `)
//   })//forEach
//   qySelAll(`${container} button`).forEach(btn=>{
//     btn.addEventListener('click',e=>{ //부모자식이 있는 경우는 currentTarget해야함.
//       showModal('.video-modal')
//       qySel('.video-modal').style.display = 'block'
//       let youtubeId = e.currentTarget.value //e.target.value = img를 찾으므로 currentTarget으로 변경.
//       qySel('.video-modal iframe').src=`http://www.youtube.com/embed/${youtubeId}?playlist=${youtubeId}&autoplay=1&loop=1&mute=1&playsinline=1`
//       videoResize()
//     })//.play-btn click
//   })//forEach
// }//displayVideos

// export const displayImages = (data, container) => {
//   if(data.length === 0){
//     qySel(container).innerHTML = '<p class="no-data">관련 이미지가 존재하지 없습니다</p>'
//     return false
//   }//if
//   data.forEach(img=>{
//     let {file_path} = img
//     let imgPathOriginal = `${imgPaths.original}${file_path}`
//     let imgPathW500 = `${imgPaths.w500}${file_path}`
//     qySel(container).insertAdjacentHTML('beforeend',`
//       <a class="viewbox-btn" href="${imgPathOriginal}">
//         <img src="${imgPathW500}" alt>
//       </a>
//     `)//insertAdjacentHTML
//   })//forEach
//   $('.viewbox-btn').viewbox()
// }//displayImages

// export const displayPeople = (data, container) => {
//   if(data.length === 0){
//     qySel(container).innerHTML = '<p class="no-data">관련 정보가 존재하지 없습니다</p>'
//     return false
//   }//if

//   data.forEach(person=>{
//     let {id, profile_path, name, character} = person
//     let photo = (profile_path) ? `${imgPaths.w500}${profile_path}` : './img/no-image.jpg'
//     qySel(container).insertAdjacentHTML('beforeend',`
//       <figure>
//         <a href="${id}">
//           <img src="${photo}" alt>
//           <figcaption>
//             <em>${name}</em>
//             <b>${character}</b>
//           </figcaption>
//         </a>
//       </figure>
//     `)//inline배열안에 block이 들어갈 수 없으나 <a>는 예외.
//   })//forEach

//   qySelAll(`${container} a`).forEach(anchor=>{
//     anchor.addEventListener('click', async e=>{ //forEach가 아닌 click했을 때 동작하는거라 await 가능
//       e.preventDefault()
//       let id = e.currentTarget.getAttribute('href')
//       let profile = await getProfile(id, en)
//       let filmography = await getFilmography(id) 
//       displayProfile(profile)
//       displayFilmography(filmography)
//       showModal('.person-modal')
//       setPersonModal()
//     })//click
//   })//forEach
// }//displayPeople 

// export const displayFilmography = (filmographyData) => {
//   let {cast, crew} = filmographyData
//   let filmography = [...cast, ...crew] //cast배열에 crew배열을 추가한 새로운 배열 창조. 
//   sortArray(filmography, 'popularity', -1) //sortArray는 배열 자체를 바꾸는 것이므로 return 할필요 없음.
//   filmography = filmography.slice(0,30) //slice는 자르기만 할 뿐 배열명을 지어줘야함. sortArray와 차이.
//   sortArray(filmography, 'release_date', -1) //인기작 중에서 최신순으로 나열
  
//   qySel('ul.filmography').innerHTML = '' //이전에 클릭한 배우의 filmo와 혼동되지 않게 비워주고 시작
//   filmography.forEach(movie => {
//     let {id, release_date, title, job} = movie
//     job = (job) ? job : 'acting'
//     qySel('ul.filmography').insertAdjacentHTML('beforeend',`
//       <li>
//         <time>${release_date}</time>
//         <a href="./detail.php?id=${id}">
//           <em>${title}</em>
//           <small>(${job})</small>
//         </a>
//       </li>
//     `)
//   })//forEach
// }//displayFilmography

// export const displayProfile = (profileData) => {
//   let {name, birthday, deathday, profile_path, known_for_department, place_of_birth, biography} = profileData
//   let photoPath = (profile_path) ? `${imgPaths.w500}${profile_path}` : './img/no-image.jpg'
//   name = (name) ? name : '관련 정보가 없습니다'
//   known_for_department = (known_for_department) ? known_for_department : '관련 정보가 없습니다'
//   place_of_birth = (place_of_birth) ? place_of_birth : '관련 정보가 없습니다'
//   biography = (biography) ? biography : '관련 정보가 없습니다'
//   deathday = (deathday) ? deathday : ''
//   birthday = (birthday) ? `${birthday} ~ ${deathday}`: '관련 정보가 없습니다'
  
//     qySel('.person-photo').src = photoPath
//     qySel('.person-name').innerText = name
//     qySel('.person-job').innerText = known_for_department
//     qySel('.person-life').innerText = birthday
//     qySel('.person-place').innerText = place_of_birth
//     qySel('.person-biography').innerText = biography
// }//displayPerson

// export let controller = new AbortController()
// let signal = controller.signal
// //fetch를 중지시키는 브레이크. 반드시 let으로 받아야함.

// export const searchByKeyword = (keyword, lang = ko) => {
//   return new Promise(async resolve => {
//     controller = new AbortController()//끊긴 전선을 새로 만들고
//     signal = controller.signal//다시 선언함
//     try{
//       const result = await fetch(
//       `${baseUrl}/search/movie${apiKey}${lang}&query=${keyword}`,{signal} 
//       //fetch의 첫번째는 주소, 두번째는 객체가 와야함.
//       )
//       const data = await result.json()
//       resolve(data)
//     }catch{}
//   })//promise
// }//searchByKeyword

// export const searchByGenres = (genreNumbers, page='1') => {
//   return new Promise ( async resolve => {
//     controller = new AbortController()
//     signal = controller.signal
//       const result = await fetch(`
//         ${baseUrl}/discover/movie${apiKey}&with_genres=${genreNumbers}&page=${page}`,
//         {signal}
//       )
//       const data = result.json()
//     resolve(data)
//   })//promise
// }//searchByGenres
