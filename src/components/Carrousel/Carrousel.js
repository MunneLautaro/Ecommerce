"use client"

import { useState } from "react"
import MyButton from "../Ui/MyButton/MyButton"

export default function Carrousel({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(0)

  if (!products || !Array.isArray(products) || products.length < 1) return null

  return (
    <div className="flex flex-col items-center">
      <div className="flex-row flex">
        <MyButton
          text={"Atras"}
          onClick={() => {
            selectedProduct == 0
              ? setSelectedProduct(products.length - 1)
              : setSelectedProduct(selectedProduct - 1)
          }}
        />
        {products.map((prod, id) => {
          return (
            selectedProduct == id && (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={id} src={prod?.img} className="h-[100px] w-[100px]" />
            )
          )
        })}
        <MyButton
          text={"Adelante"}
          onClick={() => {
            selectedProduct == products.length - 1
              ? setSelectedProduct(0)
              : setSelectedProduct(selectedProduct + 1)
          }}
        />
      </div>
      <div className="flex-row">
        {products.map((prod, id) => {
          return (
            <MyButton
              key={id}
              onClick={() => {
                setSelectedProduct(id)
              }}
              text={id}
            />
          )
        })}
      </div>
    </div>
  )
}
