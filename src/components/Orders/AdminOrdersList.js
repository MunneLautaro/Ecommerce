"use client"

import { useState, useEffect, useCallback } from "react"
import { getAllOrders } from "@/actions/orderActions"
import {
  OrderCard,
  OrderDetailModal,
  StatusFilter,
} from "@/components/Orders/OrderComponents"

export default function AdminOrdersList() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [userSearch, setUserSearch] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)

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

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <StatusFilter
          value={statusFilter}
          onChange={setStatusFilter}
          className="flex-1"
        />
        <input
          type="text"
          placeholder="Buscar por usuario o email..."
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-violet-500"
        />
      </div>

      {!loading && (
        <p className="text-sm text-gray-400 mb-4">
          {orders.length} {orders.length === 1 ? "orden" : "órdenes"} encontrada
          {orders.length !== 1 ? "s" : ""}
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-400 py-10">
          No se encontraron órdenes
        </p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
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
    </div>
  )
}
