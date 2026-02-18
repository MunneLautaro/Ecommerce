import UserOrdersList from "@/components/Orders/UserOrdersList"

export default function MyOrdersPage() {
  return (
    <div className="pt-[100px] px-4 pb-10">
      <h1 className="text-2xl font-bold text-center mb-8">Mis Órdenes</h1>
      <UserOrdersList />
    </div>
  )
}
