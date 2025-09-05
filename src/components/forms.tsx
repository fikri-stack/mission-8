import type { FormProps } from "../utils/interfaces";
import type { LoginFormValues, Props, RegisterFormValues, Variant } from "../utils/types";
import { ButtonUI } from "./UIs/button";
import { DividerUI } from "./UIs/divider";
import { EmailInput, PasswordInput, PhoneInput, TextInput } from "./UIs/input";
import { useForm } from "react-hook-form";

export const FormComponent = ({
  className = "",
  onSubmit,
  variant = "login",
  ...props
}: Props & FormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Variant extends "login" ? LoginFormValues : RegisterFormValues>();

  const isRegister = variant === "register";
  const password = watch("password");

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit?.(data))}
      className={`flex flex-col gap-3 ${className}`}
      {...props}
    >
      {isRegister && (
        <>
          <TextInput
            label="Nama Lengkap"
            className="w-full"
            registration={register("name",{
              required: "Nama lengkap wajib diisi",
              minLength: { value: 3, message: "Nama lengkap minimal 3 karakter" },
              maxLength: { value: 50, message: "Nama lengkap maksimal 50 karakter" },
              pattern: { value: /^[A-Za-z\s]+$/, message: "Nama lengkap hanya boleh berisi huruf dan spasi" },
            })}
            error={errors?.name?.message}
          />
        </>
      )}

      <EmailInput
        label="Email"
        className="w-full"
        registration={register("email",{
          required: "Email wajib diisi",  
          pattern: { value: /^\S+@\S+$/i, message: "Format email tidak valid" },
          maxLength: { value: 100, message: "Email maksimal 100 karakter" },

        })}
        error={errors?.email?.message}
      />

      {isRegister && (
        <PhoneInput
          label="Nomor Telepon"
          className="w-full"
          registration={register("phone",{
            required: "Nomor telepon wajib diisi",
            pattern: { value: /^\d+$/, message: "Nomor telepon hanya boleh berisi angka" },
            minLength: { value: 10, message: "Nomor telepon minimal 10 digit" },
            maxLength: { value: 13, message: "Nomor telepon maksimal 13 digit" },
          })}
          error={errors?.phone?.message}
        />
      )}

      <PasswordInput
        label="Password"
        className="w-full"
        registration={register("password",{
          required: "Password wajib diisi",
          minLength: { value: 6, message: "Password minimal 6 karakter" },
          maxLength: { value: 20, message: "Password maksimal 20 karakter" },
          pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: "Password harus mengandung huruf dan angka" },
        })}
        error={errors?.password?.message}
        />

      {isRegister && (
        <PasswordInput
        label="Konfirmasi Password"
        className="w-full"
        registration={register("passwordConfirmation",{
          required: "Konfirmasi password wajib diisi",
          minLength: { value: 6, message: "Password minimal 6 karakter" },
          maxLength: { value: 20, message: "Password maksimal 20 karakter" },
          pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, message: "Password harus mengandung huruf dan angka" },
          
          validate: (value) => value === password || "Konfirmasi password tidak sama",
  
          })}
          error={errors?.passwordConfirmation?.message}
        />
      )}

      {!isRegister && (
        <div className="mt-2 flex justify-end">
          <a className="font-sans text-bodySmall text-[#4A505C]" href="#">
            Lupa password?
          </a>
        </div>
      )}

      <div className="flex flex-col gap-4 pt-2">
        <ButtonUI variant="primary">{isRegister ? "Daftar" : "Masuk"}</ButtonUI>
        <ButtonUI variant="secondary">{isRegister ? "Masuk" : "Daftar"}</ButtonUI>

        <DividerUI />

        <ButtonUI className="border border-gray-200" variant="tertiary">
          <div className="m-auto flex flex-row items-center justify-center gap-3">
            <img src="/assets/google-icon.png" />
            {isRegister ? "Daftar Dengan Google" : "Masuk Dengan Google"}
          </div>
        </ButtonUI>
      </div>
    </form>
  );
};
