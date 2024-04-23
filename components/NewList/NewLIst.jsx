import button from 'react-bootstrap/Button';

/* 내역리스트 날짜*/
const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };
  /* 내역리스트 금액 입력 */
  const amountChangeHandler = (event) => {
    let isNotNumber = /^[^1-9][^0-9]{0,11}$/g.test(event.target.value)
      ? true
      : false;
    setIsEnteredWrongAmount(isNotNumber);
    if (isNotNumber) return;

    let amount = addComma(enteredOnlyNumber(event.target.value));
    setEnteredAmount(amount);
  };

  /* 내역리스트 입력 */
function CreateList({newMovie, onInputChange, onAddMovie }) {
    return (
      <>
        <h1>내역 입력</h1>
        <form>
            <div>
            <button type="button" class="btn btn-outline-primary">수입</button>
            <button type="button" class="btn btn-outline-danger">지출</button>


            </div>
          <div>
          <label>날짜</label>
            <input type="date" name="date" value={newMovie.date} onChange={dateChangeHandler}  />
          </div>
          <div class="dropdown">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 결재 수단
            </a>

            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">현금</a></li>
                <li><a class="dropdown-item" href="#">카드</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
            </div>

            <div class="approval">
            <a class="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 카테고리
            </a>

            <ul class="category">
                <li><a class="dropdown-item" href="#">식비</a></li>
                <li><a class="dropdown-item" href="#">생활비</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
            </div>
          <div>
            <label> 금액 </label>
            <input type="text" 
                    value={newMovie.release_date} 
                    onChange={amountChangeHandler} 
                    placeholder="금액을 입력해주세요." />
          </div>
        </form>
        <button onClick={onAddMovie}>Add Movie</button>
      </>
    );
  }
  