import UserOrdersList from "@/components/Orders/UserOrdersList"
import ProfileMenu from "@/components/Profile/ProfileMenu"

export default function MyOrdersPage() {
  return (
    <div className="pt-[100px] px-4 pb-10 h-screen flex flex-col items-center">
      <ProfileMenu />
      <h1 className="text-2xl font-bold text-center mb-8">My Orders</h1>
      <UserOrdersList />
    </div>
  )
}
