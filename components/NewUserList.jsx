import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import UserTable from "../datatable/UserTable.jsx";
import { input } from "@material-tailwind/react";
import Pagination from "../datatable/Pagination.jsx";

export default function NewUserList() {


    // 처음에만 실행
    useEffect(() => {
        axios.get(baseUrl + "/api/findall")
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

  const [data, setData] = useState([]);

  const baseUrl = "http://localhost:8080";

  // 페이지네이션 관련
  const [currentPage, setCurrentPage] = useState(1);
  const [datasPerPage, setDatasPerPage] = useState(10);

  // 페이지네이션 2

  const indexOfLast = currentPage * datasPerPage;
  const indexOfFirst = indexOfLast - datasPerPage;
  const currentDatas = (data) => {
    let currentDatas = 0;
    currentDatas = data.slice(indexOfFirst, indexOfLast);
    return currentDatas;
  };

  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("userId");

  function searchForCategory() {

    console.log(inputValue);
    console.log(selected);

    axios.post(baseUrl+"/api/searchUser", null, { params: { category: selected, value: inputValue } })
    .then((res) => {
      setData(res.data);
      console.log(res.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  return (
    <>
      <h2 className="m-auto text-center text-3xl"> 유저 리스트 </h2>

      <div>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>
        <select onChange={(e) => setSelected(e.target.value)} value={selected}>
            <option value="userId">유저 ID</option>
            <option value="userEmail">이메일 주소</option>
            <option value="userName">이름</option>
            <option value="userNickname">닉네임</option>

        </select>
        <button onClick={searchForCategory}>검색</button>


      </div>

      <UserTable data={currentDatas(data)} />


      <div className="flex justify-center">
        <Pagination
          datasPerPage={datasPerPage}
          totalDatas={data.length}
          paginate={setCurrentPage}
        ></Pagination>
      </div>
    </>
  );
}
