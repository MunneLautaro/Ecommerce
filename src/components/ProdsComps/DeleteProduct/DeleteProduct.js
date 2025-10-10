import MyInput from "@/components/Ui/MyInput/MyInput"

export default function DeleteProduct() {
  return (
    <div>
      <MyInput placeHolder={"Product ID/SKU"} required={true} />
    </div>
  )
}
//npm test -- -u -t="DeleteProduct" : Para testear un solo archivo
