import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

export default function TestPage() {

    const baseUrl = "http://localhost:8080";

  const [ data, setData ] = useState('');

  useEffect(() => { // 컴포넌트가 마운트 될 때 실행
        springDataSet();
    },[])

  async function springDataSet() { // Axios 방식 사용
    await axios
    .get(baseUrl + "/data-test") // 해당 URL에 HTTP GET 요청 
    .then((res)=>{
      	console.log(res);
        setData(res.data); // GET 요청하여 응답받은 data
    })
    .catch((err)=>{
        console.log(err);
    })
  }


    // const[id, setId] = useState();
    // const[title, setTitle] = useState();
    // const[message,setMessage] = useState("");

    // useEffect(()=> {
    //     fetch("/board")
    //       .then(response => response.text())
    //       .then(message => {
    //         setMessage(message);
    //       });
    //   },[])

    // function Send() {
    //    Axios.get('/user/insert', {
    //     params: {
    //         id: id,
    //         title: title
    //     }
    //    }).catch(function() {
    //     console.log('실패');
    //    })
    // }
    
    return(

        <div className="App">
        <h1>{data}</h1>
    </div>

    // <>

    //     <p>board : {message}</p>
    //     <input onChange={(e)=>{
    //         setId(e.target.value);
    //     }} />

    //     <input onChange={(e)=>{
    //         setTitle(e.target.value);
    //     }} />
    //     <button onClick = {Send} >전송</button>
    // </>
    );
}
