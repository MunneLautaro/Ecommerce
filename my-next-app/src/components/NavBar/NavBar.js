"use client";

import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  /*
  const rutas = {
    "/agregarProductos": [
      { label: "Home producto", url: "/productosMongoDB" },
      { label: "Ver productos", url: "/verProductos" },
    ],
    "/verProductos": [
      { label: "Home producto", url: "/productosMongoDB" },
      { label: "Agregar producto", url: "/agregarProductos" },
    ],
    "/productosMongoDB": [
      { label: "Agregar producto", url: "/agregarProductos" },
      { label: "Ver productos", url: "/verProductos" },
    ],
  };
*/
  return (
    <>
      <div className="flex bg-[#424242] justify-between items-center w-full h-[90px] fixed top-0 overflow-hidden z-10">
        <h1 className="text-outline text-violet-500 m-[15px] text-2xl font-sans ">
          Bobs Store
        </h1>
      </div>
    </>
  );
}
