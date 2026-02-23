"use client"

import { useState, useEffect, useCallback } from "react"
import { getUserOrders } from "@/actions/orderActions"
import {
  OrderCard,
  OrderDetailModal,
} from "@/components/Orders/OrderComponents"
import Select from "@/components/ProdsComps/Select/Select"

export default function UserOrdersList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    const result = await getUserOrders(statusFilter)
    if (!result.error) {
      setOrders(result.orders)
    }
    setLoading(false)
  }, [statusFilter])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex gap-3 mb-6">
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
      </div>

      {!loading && (
        <p className="text-sm text-gray-400 mb-4">
          {orders.length} {orders.length === 1 ? "order" : "orders"} found
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-400 py-10">
          No orders found {statusFilter !== "all" ? "with that status" : ""}
        </p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              showUser={false}
              onClick={setSelectedOrder}
            />
          ))}
        </div>
      )}

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  )
}
