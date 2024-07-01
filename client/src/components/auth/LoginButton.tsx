"use client";
import { useRouter } from "next/navigation";
interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: "boolean";
}
const LoginButton = ({ children, mode, asChild }: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    console.log("LOGIN BUTTON CLICKED");
    router.push("/auth/login");
  };
  if (mode === "modal") {
    return <span>Implement modal</span>;
  }
  return <span onClick={onClick}>{children}</span>;
};

export default LoginButton;
