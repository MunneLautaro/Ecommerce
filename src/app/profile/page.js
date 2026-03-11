import CheckOutForm from "@/components/Checkout/CheckoutForm"
import { updateUserPersonalInfoAction } from "@/actions/userAction"
import Caption from "@/components/Ui/Caption/Caption"
import ProfileMenu from "@/components/Profile/ProfileMenu"

export default function Profile() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Caption customStyle={"text-3xl font-bold text-center mb-8 w-full"}>
        Profile
      </Caption>
      <CheckOutForm
        buttonChildren="Update Profile"
        onSubmit={updateUserPersonalInfoAction}
        disableWhenUnchanged
      />
      <ProfileMenu />
    </div>
  )
}
