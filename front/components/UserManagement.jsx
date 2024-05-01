import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import UserTable from "../datatable/UserTable.jsx";
import Pagination from "../datatable/Pagination.jsx";

export default function UserManagement() {
  const [data, setData] = useState([]);

  const baseUrl = "http://localhost:8080";

  // 페이지네이션 관련
  const [loading, setLoading] = useState(false);
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
  const [selected, setSelected] = useState("All");

  /////////////////////////////////////////////////

  function searchForCategory() {
    setLoading(true);
    if (inputValue === "" && selected == "All") {
    } else {
      console.log(selected);
      console.log(inputValue);

      axios.post(baseUrl+"/api/searchUser", null, { params: { category: selected, value: inputValue } })
        .then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      <h2 className="m-auto text-center text-3xl"> 유저 리스트 </h2>

      <div className="flex mt-5 justify-center">
        <form className="flex flex-col md:flex-row gap-3">
          <div className="flex">
            <input
              type="text"
              placeholder="지정 카테고리 검색"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              className="w-20 md:w-60 px-3 h-10 rounded-l border-2 border-green-500 focus:outline-none focus:border-green-500"
            />
            <button
              onClick={searchForCategory()}
              className="bg-green-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
            >
              검색
            </button>
          </div>
          <select
            className="w-40 h-10 border-2 border-green-500 focus:outline-none focus:border-green-500 text-green-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
            onChange={(event) => setSelected(event.target.value)}
          >
            <option value="All">All</option>
            <option value="userId">유저 ID</option>
            <option value="userEmail">이메일주소</option>
          </select>
        </form>
      </div>

      <UserTable data={currentDatas(data)} loading={loading} />

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
