import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "../../button";
import styles from "./index.module.css";

const AuthElement = () => {
  const { data: session, status } = useSession();

  return (
    <div className={styles.root}>
      {status === "authenticated" && (
        <>
          <span className={styles.name}>Hi, {session.user?.name}</span>
          <nav className={styles.root}>
            <Link href={`/list/${session.user?.fdlst_private_userId}`}>
              <Button variant="default">Your Wish List</Button>
            </Link>
            <Button variant="blue" clickHandler={() => signOut()}>
              Sign Out
            </Button>
          </nav>
        </>
      )}
      {status === "unauthenticated" && (
        <Button variant="blue" clickHandler={() => signIn("github")}>
          Sign In
        </Button>
      )}
    </div>
  );
};

export default AuthElement;