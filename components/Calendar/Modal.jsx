import { useState } from "react";
import moment from "moment";
import "./Modal.scss";

function Modal({ setmodal }) {
  const [x, setx] = useState(10000);
  const [y, sety] = useState(10000);

  const [start, setstart] = useState(moment().format("YYYYMMDD"));

  const close_modal = (e) => {
    e.preventDefault();
    if (e.target.className === "modal") {
      setmodal(false);
    }
    if (e.target.className != "modal_button_start") {
      setx(10000);
      sety(10000);
    }
    if (e.target.className != "modal_button_end") {
      setendx(10000);
      setendy(10000);
    }
  };

  const show_calendar = (e) => {
    if (e.target.className == "modal_button_start") {
      setx(e.clientY + 30);
      sety(e.clientX - 20);
    }
    if (e.target.className == "modal_button_end") {
      setendx(e.clientY + 30);
      setendy(e.clientX - 20);
    }
  };
  return (
    <div className="modal" onClick={(e) => close_modal(e)} value={true}>
      <div>
        <div className="modal_div">
          <div className="modal_title">내역 추가</div>
          <div className="modal_body">
            <div onClick={(e) => show_calendar(e)}>
              <div>날짜</div>
              <input
                className="modal_button_start"
                value={start}
                readOnly
              ></input>
            </div>
            <div
              style={{ top: x, left: y, position: "absolute" }}
              className="modal_calendar"
            >
              <Day_kor></Day_kor>
              <Date_picker setstart={setstart}></Date_picker>
            </div>
            <div class="col-12">
              <label for="username" class="form-label">
                결재수단
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="결재수단을 입력하세요."
              />
            </div>
            <div class="col-12">
              <label for="username" class="form-label">
                카테고리
              </label>
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="카테고리"
              />
            </div>
            <div class="col-12">
              <label for="address" class="form-label">
                금액
              </label>
              <input
                type="text"
                class="form-control"
                id="address"
                placeholder="금액을 입력하세요"
                required
              />
            </div>
            <div class="col-12">
              <label for="exampleFormControlTextarea1" class="form-label">
                메모
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
              ></textarea>
            </div>
            <div style = {{FlexDirection : 'row'}}>
            <button type="button" class="btn btn-primary">
              저장
            </button>
            <button type="button" class="btn btn-danger">
              삭제
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Date_picker({ setstart }) {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const firstWeek = today.clone().startOf("month").week();
  const lastWeek =
    today.clone().endOf("month").week() === 1
      ? 53
      : today.clone().endOf("month").week();

  let result = [];
  let week = firstWeek;
  for (week; week <= lastWeek; week++) {
    result = result.concat(
      <div className="calendar_body_line" key={week}>
        {Array(7)
          .fill(0)
          .map((price, index) => {
            let days = today
              .clone()
              .startOf("year")
              .week(week)
              .startOf("week")
              .add(index, "day"); //d로해도되지만 직관성

            if (moment().format("YYYYMMDD") === days.format("YYYYMMDD")) {
              return (
                <div
                  className="calendar_body_days"
                  onClick={() => setstart(days.format("YYYYMMDD"))}
                  key={index}
                >
                  <span style={{ color: "red" }}>{days.format("D")}</span>
                </div>
              );
            } else if (days.format("MM") !== today.format("MM")) {
              return (
                <div
                  className="calendar_body_days"
                  onClick={() => setstart(days.format("YYYYMMDD"))}
                  key={index}
                >
                  <span style={{ color: "gray" }}>{days.format("D")}</span>
                </div>
              );
            } else {
              return (
                <div
                  className="calendar_body_days"
                  onClick={() => setstart(days.format("YYYYMMDD"))}
                  key={index}
                >
                  <span>{days.format("D")}</span>
                </div>
              );
            }
          })}
      </div>
    );
  }
  return result;
}

function Day_kor() {
  return (
    <>
      <div className="calendar_body_head">
        <div style={{ color: "red" }} className="calendar_body_head_days">
          일
        </div>
        <div className="calendar_body_head_days">월</div>
        <div className="calendar_body_head_days">화</div>
        <div className="calendar_body_head_days">수</div>
        <div className="calendar_body_head_days">목</div>
        <div className="calendar_body_head_days">금</div>
        <div className="calendar_body_head_days">토</div>
      </div>
    </>
  );
}

export default Modal;
