import { SignupForm } from "@/components/core/auth/SignUpForm";
import React from "react";

const CreateAccount = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl">
        <SignupForm />
      </div>
    </div>
  );
};

export default CreateAccount;
