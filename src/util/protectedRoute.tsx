import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

import React, { ReactNode, useEffect } from "react";

const ProtectedRoute = (WrappedComponent: any) => {
  return (props: React.JSX.IntrinsicAttributes) => {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (!user) {
        router.push("/");
      }
    }, [user, router]);
    return user ? <WrappedComponent {...props} /> : null;
  };
};

export default ProtectedRoute;
