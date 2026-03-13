"use client"

import { useState, useEffect, useCallback } from "react"
import { getAllOrders } from "@/actions/orderActions"
import {
  OrderCard,
  OrderDetailModal,
} from "@/components/Orders/OrderComponents"
import Select from "@/components/ProdsComps/Select/Select"
import Pagination from "@/components/UserComps/Pagination/Pagination"

export default function AdminOrdersList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [userSearch, setUserSearch] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [ordersPerPage, setOrdersPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    const result = await getAllOrders(statusFilter, userSearch)
    if (!result.error) {
      setOrders(result.orders)
    }
    setLoading(false)
  }, [statusFilter, userSearch])

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchOrders()
    }, 300)
    return () => clearTimeout(timeout)
  }, [fetchOrders])

  const totalPages = Math.ceil(orders.length / ordersPerPage)
  const startIndex = (currentPage - 1) * ordersPerPage
  const paginatedItems = orders.slice(startIndex, startIndex + ordersPerPage)
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Select
          value={statusFilter}
          elements={[
            { value: "all", label: "All statuses" },
            { value: "Pending", label: "Pending" },
            { value: "Payed", label: "Paid" },
            { value: "Shipped", label: "Shipped" },
            { value: "Delivered", label: "Delivered" },
            { value: "Cancelled", label: "Cancelled" },
          ]}
          type="Status"
          onChange={(e) => setStatusFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by user or email..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500"
        />
      </div>

      {!loading && (
        <div className="flex flex-row justify-between items-center mb-4">
          <p className="text-sm text-gray-400">
            {orders.length} {orders.length === 1 ? "order" : "orders"} found
          </p>

          <div className="flex flex-row gap-5">
            <button
              className={`flex-1 py-2 text-sm font-semibold transition-colors duration-200 border-b-2 ${
                ordersPerPage === 10
                  ? "border-violet-500 text-violet-400"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => {
                setOrdersPerPage(10)
                setCurrentPage(1)
              }}
            >
              10 orders
            </button>
            <button
              className={`flex-1 py-2 text-sm font-semibold transition-colors duration-200 border-b-2 ${
                ordersPerPage === 20
                  ? "border-violet-500 text-violet-400"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => {
                setOrdersPerPage(20)
                setCurrentPage(1)
              }}
            >
              20 orders
            </button>
            <button
              className={`flex-1 py-2 text-sm font-semibold transition-colors duration-200 border-b-2 ${
                ordersPerPage === 30
                  ? "border-violet-500 text-violet-400"
                  : "border-transparent text-gray-400 hover:text-gray-200"
              }`}
              onClick={() => {
                setOrdersPerPage(30)
                setCurrentPage(1)
              }}
            >
              30 orders
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No orders found</p>
      ) : (
        <div className="space-y-3">
          {paginatedItems.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              showUser={true}
              onClick={setSelectedOrder}
            />
          ))}
        </div>
      )}

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
      {totalPages > 1 && (
        <div className="flex justify-center w-full">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  )
}
