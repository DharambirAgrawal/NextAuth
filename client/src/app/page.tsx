import Image from "next/image";
import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <>
      <h1 className=" font-bold text-lg">Auth</h1>
      <p>Simple way for Authentication</p>
      <LoginButton>
        <Button>Sign in</Button>
      </LoginButton>
    </>
  );
}
