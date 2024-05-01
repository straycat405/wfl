import React from "react";
import Dropdown from "./CategoryDD";

function ListForm() {
  return (
    <>
      {" "}
      {/*부트스트랩에서 콜랩스 사용 가능한지 확인 필요 */}
      <div class="bg-body-tertiary">
        <div class="container">
          <main>
            <div class="row g-5">
              <div class="col-md-5 col-lg-4 order-md-last"></div>
              <div class="col-md-7 col-lg-8">
                <h4 class="mb-3">입력</h4>
                <form class="needs-validation" novalidate>
                  <div class="row g-3">
                    <div class="col-sm-6">
                      <label for="date" class="form-label">
                        날짜
                      </label>
                      <div>
                        <input
                          type="text"
                          class="form-control"
                          id="date"
                          placeholder="날짜를 선택하세요"
                          value=""
                          required
                        />
                        <input
                          type="text"
                          class="form-control"
                          id="time"
                          placeholder="시간을 선택하세요"
                          value=""
                          required
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="username" class="form-label">
                        결재수단
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="결재수단을 선택하세요."
                      />
                    </div>

                    <div class="col-12">
                      <Dropdown />
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
                      <label
                        for="exampleFormControlTextarea1"
                        class="form-label"
                      >
                        Example textarea
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                  <button type="button" class="btn btn-primary">
                    저장
                  </button>
                  <button type="button" class="btn btn-danger">
                    삭제
                  </button>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default ListForm;
