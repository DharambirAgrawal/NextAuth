"use client";

import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}
export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <Button asChild variant="link">
      <Link href={href}>{label}</Link>
    </Button>
  );
};
