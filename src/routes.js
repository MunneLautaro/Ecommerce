export const adminRoutes = {
  "/addProds": [
    { label: "Home", url: "/adminPage" },
    { label: "Catalog", url: "/" },
  ],
  "/": [
    { label: "Home", url: "/adminPage" },
    { label: "Add/Modify prods", url: "/addProds" },
  ],
  "/adminPage": [
    { label: "Catalog", url: "/" },
    { label: "Add/Modify prods", url: "/addProds" },
  ],
}
