export const adminRoutes = {
  "/prods": [
    { label: "Home", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Categories", url: "/categorieItems" },
  ],
  "/": [
    { label: "Home", url: "/adminPage" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
  ],
  "/adminPage": [
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
    { label: "Categories", url: "/categorieItems" },
  ],
  "/categorieItems": [
    { label: "Home", url: "/adminPage" },
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/prods" },
  ],
}
