export const adminRoutes = {
  "/prods": [
    { label: "Users", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/": [
    { label: "Users", url: "/adminPage" },
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
    { label: "Users", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/adminPage/orders": [
    { label: "Users", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
  ],
  "/buy/success": [
    { label: "Users", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/buy/failure": [
    { label: "Users", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/buy/pending": [
    { label: "Users", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/buy": [
    { label: "Users", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/profile": [
    { label: "Users", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
  "/profile/orders": [
    { label: "Users", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
    { label: "Orders", url: "/adminPage/orders" },
  ],
}

export const userRoutes = {
  "/profile/orders": [{ label: "Catalog", url: "/" }],
  "/profile": [{ label: "Catalog", url: "/" }],
  "/buy": [{ label: "Catalog", url: "/" }],
}
