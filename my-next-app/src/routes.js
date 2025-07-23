export const adminRoutes = {
  "/addProds": [
    { label: "Home", url: "/adminPage" },
    { label: "Catalog", url: "/catalog" },
  ],
  "/catalog": [
    { label: "Home", url: "/adminPage" },
    { label: "Add prods", url: "/addProds" },
  ],
  "/adminPage": [
    { label: "Add prods", url: "/addProds" },
    { label: "Catalog", url: "/catalog" },
  ],
}
