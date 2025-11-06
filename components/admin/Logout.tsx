"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Logout() {
  const router = useRouter();
  
  const logout = async () => {
    try {
      const res = await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return <Button variant="admin" onClick={logout} className="m-0">Logout</Button>
}
