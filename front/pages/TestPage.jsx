import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function TestPage() {
  const baseUrl = "http://localhost:8080";

  const [data, setData] = useState("");
  const [ name, setName ] = useState('');

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 실행
    springDataSet();
  }, []);

  async function springDataSet() {
    // Axios 방식 사용
    await axios
      .get(baseUrl + "/data-test") // 해당 URL에 HTTP GET 요청
      .then((res) => {
        console.log(res);
        setData(res.data); // GET 요청하여 응답받은 data
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const formSubmit = async (e) => {
    e.preventDefault();

    await axios
    .post(baseUrl + "/data-test/click", { // JSON 형식 {"name":"??"}
        name: name,
    })
    .then((res) => {
        alert("서버에 보내고 서버가 다시 보낸 데이터\n" 
        + JSON.stringify(res.data))
    })
    .catch((err) => {
        console.log(err)
    })
    
}

  const nameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <>
      <div className="App">
        <h1>{data}</h1>
        <form onSubmit={formSubmit}>
          <input
            name="name"
            value={name}
            onChange={nameChange}
            placeholder="이름"
          ></input>
          <button type="submit">제출</button>
        </form>
      </div>
    </>
  );
}
