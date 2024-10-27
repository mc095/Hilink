// utils/withAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase"; // Adjust the path if necessary
import { onAuthStateChanged } from "firebase/auth";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push("/login"); // Redirect to the login page if not authenticated
        }
      });

      return () => unsubscribe(); // Cleanup the subscription
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
