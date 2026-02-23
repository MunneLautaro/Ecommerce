"use client"

import Image from "next/image"

const statusColors = {
  Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
  Payed: "bg-green-500/10 text-green-400 border-green-500/30",
  Shipped: "bg-blue-500/10 text-blue-400 border-blue-500/30",
  Delivered: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/30",
}

const statusLabels = {
  Pending: "Pending",
  Payed: "Paid",
  Shipped: "Shipped",
  Delivered: "Delivered",
  Cancelled: "Cancelled",
}

export function StatusBadge({ status }) {
  return (
    <span
      className={`px-2 py-1 text-xs font-semibold rounded-full border ${statusColors[status] || "bg-gray-500/10 text-gray-400 border-gray-500/30"}`}
    >
      {statusLabels[status] || status}
    </span>
  )
}

export function OrderCard({ order, showUser = false, onClick }) {
  const date = new Date(order.orderDate).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const userName = showUser
    ? order.user?.user || order.user?.email || order.user?.name || "—"
    : null

  return (
    <button
      onClick={() => onClick(order)}
      className="w-full text-left p-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-mono text-gray-400">{order.orderNumber}</p>
        <StatusBadge status={order.status} />
      </div>

      {showUser && (
        <p className="text-sm text-violet-400 mb-1">
          Usuario: <span className="text-white">{userName}</span>
        </p>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {date} — {order.items?.length || 0}{" "}
          {order.items?.length === 1 ? "producto" : "productos"}
        </p>
        <p className="text-white font-semibold">
          ${order.totalAmount?.toFixed(2)}
        </p>
      </div>
    </button>
  )
}

export function OrderDetailModal({ order, onClose }) {
  if (!order) return null

  const date = new Date(order.orderDate).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const userName =
    order.user?.user || order.user?.email || order.user?.name || null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-grey-900 border border-white/10 rounded-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Detalle de Orden</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Orden</span>
            <span className="text-sm font-mono text-white">
              {order.orderNumber}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Fecha</span>
            <span className="text-sm text-white">{date}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Estado</span>
            <StatusBadge status={order.status} />
          </div>
          {userName && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Usuario</span>
              <span className="text-sm text-white">{userName}</span>
            </div>
          )}
          {order.paymentId && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">ID de Pago</span>
              <span className="text-sm font-mono text-white">
                {order.paymentId}
              </span>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 my-4" />

        <h3 className="text-sm font-semibold text-gray-400 mb-3">Productos</h3>
        <div className="space-y-3">
          {order.items?.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
            >
              {item.product.img && (
                <Image
                  src={item.product.img}
                  alt={item.product.name}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-md object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">
                  {item.product.name}
                </p>
                <p className="text-xs text-gray-400">
                  SKU: {item.product.sku} — {item.product.brand}{" "}
                  {item.product.model}
                </p>
                <p className="text-xs text-gray-400">
                  Color: {item.product.color}
                </p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-400">
                    x{item.product.cantidad} — ${item.product.price} c/u
                  </span>
                  <span className="text-sm text-white font-semibold">
                    ${item.totalPrice?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center">
          <span className="text-gray-400 font-medium">Total</span>
          <span className="text-xl font-bold text-white">
            ${order.totalAmount?.toFixed(2)}
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 text-white font-semibold transition-colors"
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}
