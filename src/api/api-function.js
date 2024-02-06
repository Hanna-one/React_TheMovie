import axios from "axios";
import { baseUrl, apiKey, ko } from "./api-data.js";
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

export const searchByKeyword = (keyword, lang = ko) => {
  return new Promise(async resolve => {
    let controller = new AbortController()//끊긴 전선을 새로 만들고
    let signal = controller.signal//다시 선언함
    try{
      const result = await fetch(
      `${baseUrl}/search/movie${apiKey}${lang}&query=${keyword}`,{signal} 
      //fetch의 첫번째는 주소, 두번째는 객체가 와야함.
      )
      const data = await result.json()
      resolve(data)
    }catch{}
  })//promise
}//searchByKeyword

export const searchByGenres = (genreNumbers, page='1') => {
  return new Promise ( async resolve => {
    let controller = new AbortController()
    let signal = controller.signal
      const result = await fetch(`
        ${baseUrl}/discover/movie${apiKey}&with_genres=${genreNumbers}&page=${page}`,
        {signal}
      )
      const data = result.json()
    resolve(data)
  })//promise
}//searchByGenres
