import axios from "axios";

export default function LedgerTable({ data, modifyIncoming }) {
  const baseUrl = "http://localhost:8080";

  //삭제버튼
  function deleteIncoming(incomingId) {

    if (confirm("정말 삭제하시겠습니까?")) {
      axios({
        method: "POST",
        url: baseUrl + "/deleteIncoming",
        data: {
          incomingId: incomingId,
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
                      수입일
                    </th>
                    <th scope="col" className="px-6 py-4">
                      수입금액
                    </th>
                    <th scope="col" className="px-6 py-4">
                      수입내역
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
                      key={i.incomingId}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {i.incomingTime}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.incomingAmount.toLocaleString() + " 원"}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.incomingWhy}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.incomingCategory1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.incomingCategory2}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.incomingMethod}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.incomingMemo}
                      </td>

                      <td>
                        <button
                          className="whitespace-nowrap px-6 py-4 text-green-500 hover:text-green-700"
                          onClick={() => modifyIncoming(i.incomingId)}
                        >
                          {" "}
                          수정
                        </button>
                      </td>

                      <td>
                        <button
                          className="whitespace-nowrap px-6 py-4 text-red-500 hover:text-red-700"
                          onClick={() => deleteIncoming(i.incomingId)}
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
