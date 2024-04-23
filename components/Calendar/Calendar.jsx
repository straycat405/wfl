import './Calendar.css';
import { useState } from 'react';
import moment from 'moment';
import data from './data.json'
// import Modal from './Modal';


const Calendar = () => {

  const [getMoment, setMoment] = useState(moment());

  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

  const calendarArr = () => {

    let result = [];
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <div className='calendar_body_line' key={week}>
          {
            Array(7).fill(0).map((price, index) => {
              let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day'); //d로해도되지만 직관성

              if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                return (
                  <div className='calendar_body_days' onClick={() => console.log(days.format('YYYYMMDD'))} key={index} >
                    <span style={{ backgroundColor: 'pink' }}>{days.format('D')}</span>
                    <Show_event days={days} />
                  </div>
                );
              } else if (days.format('MM') !== today.format('MM')) {
                return (
                  <div className='calendar_body_days' onClick={() => console.log(days.format('YYYYMMDD'))} key={index} >
                    <span style={{ color: 'gray' }}>{days.format('D')}</span>
                  </div>
                  // 'D'는 날짜를 나타내는 포맷 문자
                  // moment.js 라이브러리에서 format('D')를 사용하면, 해당 날짜의 “일” 부분을 반환 예를 들어, 2024년 4월 11일의 경우, format('D')는 '11’을 반환
                );
              } else {
                return (
                  <div className='calendar_body_days' onClick={() => console.log(days.format('YYYYMMDD'))} key={index}  >
                    <span>{days.format('D')}</span>
                      <Show_event days={days} />
                  </div>
                );
              }
            })
          }
        </div>
      );
    }
    return result;
  }

  return (
    <div className="Calendar">
  {/*    <div> <Modal/></div> */}
      <div className="calendar_head">
        <button className='calendar_button' onClick={() => { setMoment(getMoment.clone().subtract(1, 'month')) }} >이전달</button>
        <div className='calendar_head_text'>{today.format('YYYY 년 MM 월')}</div>
        <button className='calendar_button' onClick={() => { setMoment(getMoment.clone().add(1, 'month')) }} >다음달</button>
      </div>
      <div className='calendar_body'>
        <div className='calendar_body_box'>
          <Day_kor />
          {calendarArr()}
        </div>
      </div>
    </div>
  );
}
export default Calendar;

function Show_event({ days }) {
  return (
    <>
      {
        data.work.map((v, i) => {
          if (days.format('YYYYMMDD') == moment(v.date).format('YYYYMMDD')) {
            return <div key={i} onClick={() => console.log(v)} className='calendar_body_days_event'>{v.price} {v.memo}</div>
            // 'v.start’는 이벤트의 시작 날짜를 나타내고, 'v.data’는 이벤트의 데이터를 나타냄
          }
        })
      }
    </>
  )
}

function Day_kor() {
  return (
    <>
      <div className='calendar_body_head'>
        <div className='calendar_body_head_days'>
          일
        </div>
        <div className='calendar_body_head_days'>
          월
        </div>
        <div className='calendar_body_head_days'>
          화
        </div>
        <div className='calendar_body_head_days'>
          수
        </div>
        <div className='calendar_body_head_days'>
          목
        </div>
        <div className='calendar_body_head_days'>
          금
        </div>
        <div className='calendar_body_head_days'>
          토
        </div>
      </div>
    </>
  )
}