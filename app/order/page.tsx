import { redirect } from "next/navigation";

// Empty ID
export default function Redirect() {
  redirect("/orders");
}
