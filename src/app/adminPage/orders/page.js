import AdminOrdersList from "@/components/Orders/AdminOrdersList"

export default function AdminOrdersPage() {
  return (
    <div className="pt-[100px] px-4 pb-10">
      <h1 className="text-2xl font-bold text-center mb-8">Órdenes de Compra</h1>
      <AdminOrdersList />
    </div>
  )
}
