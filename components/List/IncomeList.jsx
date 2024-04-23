function IncomeList() {
  return (
    <>
      {" "}
      {/*부트스트랩에서 콜랩스 사용 가능한지 확인 필요 */}
      <div className="container-fluid">
        <div className="row">
          <button></button>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2">수입내역</h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group me-2">
                  <button type="button" className="btn btn-sm btn-outline-secondary">🠔</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary"> 이번 달 </button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">{" "} ➞ </button>
                </div>
              </div>
            </div>

            <div className="table-responsive small">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">날짜</th>
                    <th scope="col">결제 수단</th>
                    <th scope="col">카테고리</th>
                    <th scope="col">금액</th>
                    <th scope="col">메모</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2024.04.05</td>
                    <td>계좌</td>
                    <td>용돈</td>
                    <td>100,000</td>
                    <td>용돈</td>
                  </tr>
                  <tr>
                    <td>2024.04.06</td>
                    <td>계좌</td>
                    <td>이자</td>
                    <td>1,230</td>
                    <td>예금 이자</td>
                  </tr>
                  <tr>
                    <td>2024.04.25</td>
                    <td>계좌</td>
                    <td>월급</td>
                    <td>2,700,000</td>
                    <td>급여</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
export default IncomeList;
