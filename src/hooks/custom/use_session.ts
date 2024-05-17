import { auth } from "@/auth";
import { useSession } from "next-auth/react";

export const useClientSession = (type?: string) => {
  const session = useSession();
  switch (type) {
    default:
      return session?.data?.user;
    case "id":
      return session?.data?.user.id;
    case "email":
      return session?.data?.user.email;
  }
};

export const getSeverSession = async (type: string | null) => {
  const session = await auth();
  switch (type) {
    default:
      return session?.user;
    case "role":
      return session?.user.role;
    case "id":
      return session?.user.id;
    case "info":
      return {
        id: session?.user.id,
        username: session?.user.name,
        email: session?.user.email,
      };
  }
};
