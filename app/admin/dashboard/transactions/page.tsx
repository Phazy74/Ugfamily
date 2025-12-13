// "use client";

// import { useEffect, useState } from "react";

// export default function AdminTransactionsPage() {
//   const [tx, setTx] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [filters, setFilters] = useState({
//     type: "",
//     status: "",
//     search: "",
//   });

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

//   const fetchTx = async () => {
//     const params = new URLSearchParams({
//       page: String(page),
//       limit: "20",
//       ...filters,
//     });

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/admin/transactions?${params}`,
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     const data = await res.json();
//     if (data.success) {
//       setTx(data.items);
//       setPages(data.pages);
//     }
//   };

//   useEffect(() => {
//     fetchTx();
//   }, [page]);

//   return (
//     <div className="space-y-5">
//       <h1 className="text-2xl font-bold">All Transactions</h1>

//       {/* Filters */}
//       <div className="bg-white p-4 rounded shadow flex gap-3">
//         <input
//           className="input flex-1"
//           placeholder="Search by reference…"
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, search: e.target.value }))
//           }
//         />

//         <select
//           className="input"
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, type: e.target.value }))
//           }
//         >
//           <option value="">All Types</option>
//           <option value="deposit">Deposit</option>
//           <option value="withdrawal">Withdrawal</option>
//           <option value="transfer">Transfer</option>
//           <option value="card">Card</option>
//           <option value="custom">Custom</option>
//         </select>

//         <select
//           className="input"
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, status: e.target.value }))
//           }
//         >
//           <option value="">All Status</option>
//           <option value="success">Success</option>
//           <option value="pending">Pending</option>
//           <option value="failed">Failed</option>
//         </select>

//         <button
//           className="bg-blue-600 text-white px-4 rounded"
//           onClick={() => {
//             setPage(1);
//             fetchTx();
//           }}
//         >
//           Filter
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-white rounded shadow">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3">Date</th>
//               <th className="p-3">User</th>
//               <th className="p-3">Type</th>
//               <th className="p-3">Direction</th>
//               <th className="p-3">Amount</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Reference</th>
//             </tr>
//           </thead>

//           <tbody>
//             {tx.map((t) => (
//               <tr key={t._id} className="border-b">
//                 <td className="p-3">
//                   {new Date(t.createdAt).toLocaleString()}
//                 </td>
//                 <td className="p-3">{t?.user?.personalInfo?.username}</td>
//                 <td className="p-3 capitalize">{t.type}</td>
//                 <td className="p-3">{t.direction}</td>
//                 <td className="p-3">${t.amount}</td>
//                 <td className="p-3">{t.status}</td>
//                 <td className="p-3">{t.reference}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between mt-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-4 py-2 bg-gray-200 rounded"
//         >
//           Prev
//         </button>

//         <p>
//           Page {page} of {pages}
//         </p>

//         <button
//           disabled={page === pages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-4 py-2 bg-gray-200 rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";

// export default function AdminTransactionsPage() {
//   const [tx, setTx] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [modal, setModal] = useState<any>(null);

//   const [filters, setFilters] = useState({
//     type: "",
//     status: "",
//     search: "",
//   });

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

//   const fetchTx = async () => {
//     setLoading(true);

//     const params = new URLSearchParams({
//       page: String(page),
//       limit: "20",
//       ...filters,
//     });

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/admin/transactions?${params}`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const data = await res.json();

//     if (data.success) {
//       setTx(data.items);
//       setPages(data.pages);
//     }

//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchTx();
//   }, [page]);

//   const badge = (status: string) => {
//     const styles: any = {
//       success: "bg-green-100 text-green-700",
//       pending: "bg-yellow-100 text-yellow-700",
//       failed: "bg-red-100 text-red-700",
//     };
//     return (
//       <span className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}>
//         {status.toUpperCase()}
//       </span>
//     );
//   };

//   const formatAmount = (amt: number) =>
//     amt.toLocaleString("en-US", { minimumFractionDigits: 2 });

//   // ADMIN ACTIONS ----------------------------------------------------

//   const updateStatus = async (id: string, newStatus: string) => {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/admin/transaction/${id}/status`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ status: newStatus }),
//       }
//     );

//     const data = await res.json();

//     if (data.success) {
//       alert("Status updated!");
//       fetchTx();
//       setModal(null);
//     }
//   };

//   const deleteTx = async (id: string) => {
//     if (!confirm("Delete this transaction?")) return;

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/admin/transaction/${id}`,
//       {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     const data = await res.json();

//     if (data.success) {
//       alert("Transaction deleted");
//       fetchTx();
//       setModal(null);
//     }
//   };

//   // ------------------------------------------------------------------

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Transaction History</h1>

//       {/* FILTERS */}
//       <div className="bg-white p-4 rounded shadow flex gap-3">
//         <input
//           className="input flex-1"
//           placeholder="Search reference…"
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, search: e.target.value }))
//           }
//         />

//         <select
//           className="input"
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, type: e.target.value }))
//           }
//         >
//           <option value="">All Types</option>
//           <option value="deposit">Deposit</option>
//           <option value="withdrawal">Withdrawal</option>
//           <option value="transfer">Transfer</option>
//           <option value="card">Card</option>
//           <option value="custom">Custom</option>
//         </select>

//         <select
//           className="input"
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, status: e.target.value }))
//           }
//         >
//           <option value="">All Status</option>
//           <option value="success">Success</option>
//           <option value="pending">Pending</option>
//           <option value="failed">Failed</option>
//         </select>

//         <button
//           className="bg-blue-600 text-white px-4 rounded"
//           onClick={() => {
//             setPage(1);
//             fetchTx();
//           }}
//         >
//           Filter
//         </button>
//       </div>

//       {/* TABLE -------------------------------------------------- */}
//       <div className="overflow-x-auto bg-white p-4 rounded shadow">
//         <table className="min-w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3">Date</th>
//               <th className="p-3">User</th>
//               <th className="p-3">Type</th>
//               <th className="p-3">Direction</th>
//               <th className="p-3">Amount</th>
//               <th className="p-3">Status</th>
//               <th className="p-3">Reference</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading ? (
//               [...Array(5)].map((_, i) => (
//                 <tr key={i} className="animate-pulse">
//                   <td className="p-3 bg-gray-100 rounded h-5"></td>
//                   <td className="p-3 bg-gray-100 rounded h-5"></td>
//                   <td className="p-3 bg-gray-100 rounded h-5"></td>
//                   <td className="p-3 bg-gray-100 rounded h-5"></td>
//                   <td className="p-3 bg-gray-100 rounded h-5"></td>
//                   <td className="p-3 bg-gray-100 rounded h-5"></td>
//                   <td className="p-3 bg-gray-100 rounded h-5"></td>
//                   <td className="p-3 bg-gray-100 rounded h-5"></td>
//                 </tr>
//               ))
//             ) : tx.length === 0 ? (
//               <tr>
//                 <td colSpan={8} className="p-4 text-center text-gray-500">
//                   No transactions found.
//                 </td>
//               </tr>
//             ) : (
//               tx.map((t) => (
//                 <tr key={t._id} className="border-b">
//                   <td className="p-3">
//                     {new Date(t.createdAt).toLocaleString()}
//                   </td>

//                   <td className="p-3">{t?.user?.personalInfo?.username}</td>

//                   <td className="p-3 capitalize">{t.type}</td>

//                   <td className="p-3 capitalize">{t.direction}</td>

//                   <td className="p-3 font-semibold">
//                     ${formatAmount(t.amount)}
//                   </td>

//                   <td className="p-3">{badge(t.status)}</td>

//                   <td className="p-3">{t.reference}</td>

//                   <td className="p-3">
//                     <button
//                       className="text-blue-600 underline"
//                       onClick={() => setModal(t)}
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION ------------------------------------------------ */}
//       <div className="flex justify-between mt-4">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-4 py-2 bg-gray-200 rounded"
//         >
//           Prev
//         </button>

//         <p>
//           Page {page} of {pages}
//         </p>

//         <button
//           disabled={page === pages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-4 py-2 bg-gray-200 rounded"
//         >
//           Next
//         </button>
//       </div>

//       {/* MODAL -------------------------------------------------------- */}
//       {modal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
//             <h2 className="text-xl font-bold mb-3">
//               Transaction Details
//             </h2>

//             <p><strong>User:</strong> {modal.user?.personalInfo?.username}</p>
//             <p><strong>Type:</strong> {modal.type}</p>
//             <p><strong>Direction:</strong> {modal.direction}</p>
//             <p><strong>Amount:</strong> ${formatAmount(modal.amount)}</p>
//             <p><strong>Status:</strong> {badge(modal.status)}</p>
//             <p><strong>Reference:</strong> {modal.reference}</p>
//             <p><strong>Date:</strong> {new Date(modal.createdAt).toLocaleString()}</p>

//             <div className="flex justify-end gap-2 mt-5">
//               <button
//                 className="px-4 py-2 bg-gray-300 rounded"
//                 onClick={() => setModal(null)}
//               >
//                 Close
//               </button>

//               <button
//                 className="px-4 py-2 bg-green-600 text-white rounded"
//                 onClick={() => updateStatus(modal._id, "success")}
//               >
//                 Approve
//               </button>

//               <button
//                 className="px-4 py-2 bg-yellow-600 text-white rounded"
//                 onClick={() => updateStatus(modal._id, "failed")}
//               >
//                 Mark Failed
//               </button>

//               <button
//                 className="px-4 py-2 bg-red-600 text-white rounded"
//                 onClick={() => deleteTx(modal._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

export default function AdminTransactionsPage() {
  const [tx, setTx] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<any>(null);
  const [editDate, setEditDate] = useState("");

  const [filters, setFilters] = useState({
    type: "",
    status: "",
    search: "",
  });

  const token =
    typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;

  /* ---------------- FETCH TRANSACTIONS ---------------- */
  const fetchTx = async () => {
    setLoading(true);

    const params = new URLSearchParams({
      page: String(page),
      limit: "20",
      ...filters,
    });

    const res = await fetch(
     ` ${process.env.NEXT_PUBLIC_API_URL}/admin/transactions?${params}`,
      { headers: { Authorization:` Bearer ${token}` } }
    );

    const data = await res.json();

    if (data.success) {
      setTx(data.items);
      setPages(data.pages);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTx();
  }, [page]);

  /* ---------------- HELPERS ---------------- */
  const badge = (status: string) => {
    const styles: any = {
      success: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      failed: "bg-red-100 text-red-700",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs ${styles[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  const formatAmount = (amt: number) =>
    amt.toLocaleString("en-US", { minimumFractionDigits: 2 });

  /* ---------------- ADMIN ACTIONS ---------------- */

  const updateStatus = async (id: string, newStatus: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/transaction/${id}/status ` ,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization:` Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Status updated!");
      fetchTx();
      setModal(null);
    }
  };

  const updateDate = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/transaction/${id}/date`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date: editDate }),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Transaction date updated!");
      fetchTx();
      setModal(null);
    } else {
      alert(data.message || "Failed to update date");
    }
  };

  const deleteTx = async (id: string) => {
    if (!confirm("Delete this transaction?")) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/transaction/${id}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Transaction deleted");
      fetchTx();
      setModal(null);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transaction History</h1>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded shadow flex gap-3">
        <input
          className="input flex-1"
          placeholder="Search reference…"
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value }))
          }
        />

        <select
          className="input"
          onChange={(e) =>
            setFilters((f) => ({ ...f, type: e.target.value }))
          }
        >
          <option value="">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="transfer">Transfer</option>
          <option value="card">Card</option>
          <option value="custom">Custom</option>
        </select>

        <select
          className="input"
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value }))
          }
        >
          <option value="">All Status</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        <button
          className="bg-blue-600 text-white px-4 rounded"
          onClick={() => {
            setPage(1);
            fetchTx();
          }}
        >
          Filter
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white p-4 rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">User</th>
              <th className="p-3">Type</th>
              <th className="p-3">Direction</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Reference</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : tx.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              tx.map((t) => (
                <tr key={t._id} className="border-b">
                  <td className="p-3">
                    {new Date(t.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3">
                    {t?.user?.personalInfo?.username}
                  </td>
                  <td className="p-3 capitalize">{t.type}</td>
                  <td className="p-3 capitalize">{t.direction}</td>
                  <td className="p-3 font-semibold">
                    ${formatAmount(t.amount)}
                  </td>
                  <td className="p-3">{badge(t.status)}</td>
                  <td className="p-3">{t.reference}</td>
                  <td className="p-3">
                    <button
                      className="text-blue-600 underline"
                      onClick={() => {
                        setModal(t);
                        setEditDate(
                          new Date(t.createdAt)
                            .toISOString()
                            .slice(0, 16)
                        );
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Prev
        </button>

        <p>
          Page {page} of {pages}
        </p>

        <button
          disabled={page === pages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-3">Transaction Details</h2>

            <p><strong>User:</strong> {modal.user?.personalInfo?.username}</p>
            <p><strong>Type:</strong> {modal.type}</p>
            <p><strong>Direction:</strong> {modal.direction}</p>
            <p><strong>Amount:</strong> ${formatAmount(modal.amount)}</p>
            <p><strong>Status:</strong> {badge(modal.status)}</p>
            <p><strong>Reference:</strong> {modal.reference}</p>

            <div className="mt-3">
              <label className="block text-sm font-semibold mb-1">
                Edit Transaction Date
              </label>
              <input
                type="datetime-local"
                className="input w-full"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 mt-5">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setModal(null)}
              >
                Close
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={() => updateDate(modal._id)}
              >
                Save Date
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={() => updateStatus(modal._id, "success")}
              >
                Approve
              </button>

              <button
                className="px-4 py-2 bg-yellow-600 text-white rounded"
                onClick={() => updateStatus(modal._id, "failed")}
              >
                Mark Failed
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={() => deleteTx(modal._id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}