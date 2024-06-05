import { UseFormRegisterReturn } from "react-hook-form";

interface ILBInput {
  variant?: "primary" | "secondary";
  placeholder?: string;
  error?: any;
  type?: string;
  register?: UseFormRegisterReturn;
  rows?: number;
  name: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  instruction?: string;
}

export type { ILBInput };
