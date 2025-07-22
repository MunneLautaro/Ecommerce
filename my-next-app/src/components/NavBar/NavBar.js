"use client";

import { usePathname } from "next/navigation";
import { logut } from "../../services/actions";

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
        <h1 className="underline decoration-violet-500 text-violet-500 m-[15px] text-2xl font-serif font-bold ">
          Bobs Store
        </h1>
        <button onClick={logut}>LOGOUT</button>
      </div>
    </>
  );
}
