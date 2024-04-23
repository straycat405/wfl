import axios from 'axios';

const baseUrl = "http://localhost:8080";
// 목록
export const list = () => axios.get(baseUrl + "/Home/boards")

// 조회
export const select = (no) => axios.get(baseUrl + `/Home/boards/${no}`)

// 등록
export const insert = (title, userNickname, content) => axios.post(baseUrl + "/Home/boards", {title, userNickname, content})

// 수정
export const update = (no, title, userNickname, content) => axios.put(baseUrl + "/Home/boards", {no, title, userNickname, content})

// 삭제
export const remove = (no) => axios.delete(baseUrl + `/Home/boards/${no}`)