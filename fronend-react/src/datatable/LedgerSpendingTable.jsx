import axios from "axios";

export default function LedgerTable({ data, modifySpending }) {
  const baseUrl = "http://localhost:8080";

  //삭제버튼
  function deleteSpending(spendingId) {
    if (confirm("정말 삭제하시겠습니까?")) {
      axios({
        method: "POST",
        url: baseUrl + "/deleteSpending",
        data: {
          spendingId: spendingId,
        },
        headers: { "Content-type": "application/json" },
      })
        .then((res) => {
          alert(res.data);
          console.log(res.data);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <div className="flex flex-col w-4/6 translate-x-72">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      지출일
                    </th>
                    <th scope="col" className="px-6 py-4">
                      지출금액
                    </th>
                    <th scope="col" className="px-6 py-4">
                      지출내역
                    </th>
                    <th scope="col" className="px-6 py-4">
                      카테고리 1
                    </th>
                    <th scope="col" className="px-6 py-4">
                      카테고리 2
                    </th>
                    <th scope="col" className="px-6 py-4">
                      결제수단
                    </th>
                    <th scope="col" className="px-6 py-4">
                      메모
                    </th>
                    <th scope="col" className="px-6 py-4"></th>

                    <th scope="col" className="px-6 py-4 "></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((i) => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={i.spendingId}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {i.spendingTime}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.spendingAmount.toLocaleString() + " 원"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.spendingWhy}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.spendingCategory1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.spendingCategory2}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.spendingMethod}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.spendingMemo}
                      </td>

                      <td>
                        <button
                          className="whitespace-nowrap px-6 py-4 text-green-500 hover:text-green-700"
                          onClick={() => modifySpending(i.spendingId)}
                        >
                          {" "}
                          수정
                        </button>
                      </td>

                      <td>
                        <button
                          className="whitespace-nowrap px-6 py-4 text-red-500 hover:text-red-700"
                          onClick={() => deleteSpending(i.spendingId)}
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
    </>
  );
}
