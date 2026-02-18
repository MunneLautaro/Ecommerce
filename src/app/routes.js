export const adminRoutes = {
  "/prods": [
    { label: "Home", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/": [
    { label: "Home", url: "/adminPage" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/adminPage": [
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/categorieItems": [
    { label: "Home", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/adminPage/orders": [
    { label: "Home", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
  ],
  "/buy/success": [
    { label: "Home", url: "/" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/buy/failure": [
    { label: "Home", url: "/" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/buy/pending": [
    { label: "Home", url: "/" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
}

export const userRoutes = {
  "/orders": [{ label: "Catalog", url: "/" }],
  "/": [{ label: "My Orders", url: "/orders" }],
}
