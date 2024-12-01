import AuthForm from "@/components/Forms/AuthForm";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <AuthForm formType="Login"/>
    </div>
  );
}
