import { FormComponent } from "../components/forms";
import { DefaultLayout } from "../layouts/default";
import { HeaderLayout } from "../layouts/header";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const navigate = useNavigate()
  const register = (data:{
    name: string;
    email: string;
    phone: string;
    password: string;
    passwordConfirmation: string;
  }) => {
    const email = localStorage.getItem(data.email);
    if(email){
      alert("Email sudah terdaftar");
      return;
    }   
    localStorage.setItem(data.email,data.password);
    localStorage.setItem('userData', JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone
    }));
    window.confirm("Akun berhasil dibuat, silahkan login");
    navigate("/login")
  }
  return (
    <>
      <HeaderLayout />
      <div className="mx-auto my-16 flex items-center justify-center">
        <DefaultLayout className="mx-3 flex w-full flex-col items-center justify-start gap-1 rounded-lg p-7 md:w-[600px]">
          <h1 className="text-heading3 font-bold">Pendaftaran Akun</h1>
          <p className="text-bodyMedium font-light">Yuk, Daftarkan akunmu sekarang juga!</p>
          <FormComponent variant="register" className="w-full pt-6" onSubmit={register} />
        </DefaultLayout>
      </div>
    </>
  );
};
