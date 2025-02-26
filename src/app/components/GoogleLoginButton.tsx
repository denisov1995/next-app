"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleLoginButton = () => {
  return (
    <Image
      onClick={() => signIn("google", { callbackUrl: '/profile' })}
      className="ml-4 cursor-pointer inline-block"
      src="/google.svg"
      alt="google"
      width={40}
      height={40}
    />
  );
};

export default GoogleLoginButton;
