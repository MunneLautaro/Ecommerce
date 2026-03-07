import AdminOrdersList from "@/components/Orders/AdminOrdersList"
import Caption from "@/components/Ui/Caption/Caption"

export default function AdminOrdersPage() {
  return (
    <div className="pt-10 px-4 pb-10">
      <Caption customStyle="text-2xl font-bold text-center mb-8">
        Admin Orders
      </Caption>
      <AdminOrdersList />
    </div>
  )
}
