import { useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:8080";

export default function TestPage3() {

    const [data, setData] = useState([]);

    async function findAllUser() {
        // Axios 방식 사용
        await axios
          .get(baseUrl + "/findall") // 해당 URL에 HTTP GET 요청
          .then((res) => {
            console.log(res);
            setData(res.data); // GET 요청하여 응답받은 data
          })
          .catch((err) => {
            console.log(err);
          });
      }

    return(
        <>
            <button onClick={findAllUser}>전체유저목록조회</button>
            {data && <textarea style={{width:'50%'}} rows={20} value={JSON.stringify(data)} readOnly={true}/>}
            <table class="table" id="user_table">
                <th>
                    <tr>
                        <th>번호</th>
                        <th>이메일</th>
                        <th>이름</th>
                        <th>닉네임</th>
                        <th>연락처</th>
                        <th>가입일자</th>
                    </tr>
                </th>
                <tbody>
                    {data && data.map((user) => 
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.userEmail}</td>
                            <td>{user.userName}</td>
                            <td>{user.userNickname}</td>
                            <td>{user.userPhone}</td>
                            <td>{user.userRegDate}</td>
                        </tr>)}
                </tbody>
            </table>
        </>

    );
}