import { FormComponent } from "../components/forms";
import { DefaultLayout } from "../layouts/default";
import { HeaderLayout } from "../layouts/header";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const navigate = useNavigate()
  const login = (data:{
    email: string;
    password: string;
  }) => {
    const password = localStorage.getItem(data.email);
    if(!password){
      alert("Email belum terdaftar");
      return;
    }
    if(password !== data.password){
      alert("Password salah");
      return;
    }
    alert("Login berhasil");
    navigate("/");
  }
  return (
    <>
      <HeaderLayout />
      <div className="mx-auto mt-20 flex items-center">
        <DefaultLayout className="mx-3 flex flex-col items-center justify-start gap-1 rounded-lg p-7 md:w-[600px]">
          <h1 className="text-heading3 font-bold">Masuk ke Akun</h1>
          <p className="text-bodyMedium font-light">Yuk lanjutin belajarmu di videobelajar.</p>
          <FormComponent variant="login" className="w-full pt-6" onSubmit={login} />
        </DefaultLayout>
      </div>
    </>
  );
};
