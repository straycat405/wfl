import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";



export default function TestPage3() {

const baseUrl = "http://localhost:8080";

const [data, setData] = useState([]);
const [time, setTime] = useState();

useEffect(() => {
    axios
      .get(baseUrl + "/datatest")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        console.log(data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changedTime = moment(time);

  const sendTime = changedTime.format("YYYY-MM-DD HH:mm:SS").toString();

  function test() {
    axios({
        method: "POST",
        url: baseUrl + "/timetest",
        data: {
            time:sendTime
        },
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

    console.log(time);
    console.log(changedTime);
    console.log(changedTime.format("YYYY-MM-DD HH:mm:SS"));
    console.log(time.toString());
    console.log(changedTime.toString());
    console.log(changedTime.format("YYYY-MM-DD HH:mm:SS").toString());

  }


    return(
        <>
            <h2>timetest</h2>
            <button onClick={test}> 테스트 </button>
            <input type="datetime-Local" value={time} onChange={(e)=>{setTime(e.target.value)}}></input>

            <textarea cols="30" rows="10" value={JSON.stringify(data)}></textarea>
        </>

    );
}