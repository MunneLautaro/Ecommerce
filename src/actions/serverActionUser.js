"use server";

import { revalidateTag } from "next/cache";

const actionUser = async () => {
  revalidateTag("users");
};

const actionProds = async () => {
  revalidateTag("prods");
};

const actionAlert = async () => {
  revalidateTag("alert");
};

export { actionUser, actionProds, actionAlert };
