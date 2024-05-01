import { useNavigate,Link } from "react-router-dom";

export default function LedgerList( { data, onClick2 }) {

  let loginedUser = JSON.parse(sessionStorage.getItem('loginedUser'));

  const navigate = useNavigate();

    // 가계부 상세 페이지로

    function toDetailLedger(ledgerId) {
      navigate("/ledger/" + loginedUser.userId + "/" + ledgerId);
    }

    return(
        <>
 <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      가계부 ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      가계부 이름
                    </th>
                    <th scope="col" className="px-6 py-4">
                        생성일자
                    </th>
                    <th scope="col" className="px-6 py-4">
                      수정일자
                    </th>
                    <th scope="col" className="px-6 py-4">
                      메모
                    </th>
                    <th scope="col" className="px-6 py-4">
                      가계부 조회
                    </th>
                    <th scope="col" className="px-6 py-4">
                      삭제
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((i) => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={i.ledgerId}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {i.ledgerId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.ledgerName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.ledgerRegDate}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.ledgerModDate = "null" ? "수정 이력 없음" : i.ledgerModDate}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.ledgerMemo}
                      </td>

                      <td>
                        <button
                          className="whitespace-nowrap px-6 py-4"
                          onClick={()=>{navigate("/ledger/" + i.ledgerId, { state: data })}}
                        >
                          {" "}
                          가계부 편집
                        </button>
                      </td>

                      <td>
                        <button
                          className="whitespace-nowrap px-6 py-4"
                          onClick={onClick2}
                        >
                          {" "}
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    {data.length == 0 ? 
          <div className="my-8 text-center">
          <h2>작성하신 가계부가 없습니다.</h2>
          </div>
          :
          ""    
    }

        </>
    );
}