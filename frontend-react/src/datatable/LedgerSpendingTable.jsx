import { useNavigate, Link } from "react-router-dom";
import Modal from "../components/Modal";

export default function LedgerTable({ data }) {

  const navigate = useNavigate();

  return (
    <>
      <Modal />
      <div className="flex flex-col">
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
                    <th scope="col" className="px-6 py-4 ">
                      삭제하기
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((i) => (
                    <tr
                      className="border-b border-neutral-200 dark:border-white/10"
                      key={i.userId}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {i.spendingTime}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.spendingAmount}
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
                        {i.spendingMethodId}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {i.spendingMemo}
                      </td>

                      <td>
                        <button
                          className="whitespace-nowrap px-6 py-4"
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
