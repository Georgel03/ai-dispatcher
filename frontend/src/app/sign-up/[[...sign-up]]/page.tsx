import { SignUp } from "@clerk/nextjs";
import AuthLayout from "../../../components/auth/AuthLayout";

export default function SignUpPage() {
  return (
    <AuthLayout 
      title="Create account" 
      subtitle="Start your 30-day free trial today."
    >
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: 
              "bg-[#5465FF] hover:bg-indigo-600 text-white font-semibold rounded-xl py-3.5 text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98]",
            card: "shadow-none p-0",
            headerTitle: "hidden",
            headerSubtitle: "hidden",
            socialButtonsBlockButton: 
              "bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl py-2.5",
            formFieldInput: 
              "bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:bg-white focus:border-[#5465FF] focus:ring-4 focus:ring-[#5465FF]/10 transition-all placeholder:text-slate-400 text-slate-900 font-medium",
            formFieldLabel: "text-xs font-semibold text-slate-700 ml-1 mb-1.5",
            footerActionLink: "text-[#5465FF] font-semibold hover:text-indigo-600"
          }
        }}
      />
    </AuthLayout>
  );
}