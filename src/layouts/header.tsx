import { useState, useEffect } from "react";
import { useAuth } from "../services/hooks/useauth";
import { ButtonUI } from "../components/UIs/button";
import { useNavigate } from "react-router-dom";

export const HeaderLayout = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated } = useAuth();

  // Secret admin shortcut: Ctrl+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        navigate('/admin');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const logout = () => {
    setShowDropdown(!showDropdown);
    localStorage.setItem("isAuth", "false");
    navigate("/");
    window.location.reload();
  };
  const navigate = useNavigate();

  return (
    <>
      <header>
        <img
          onClick={() => navigate("/")}
          className="h-[60px] cursor-pointer"
          src="/assets/logo.png"
          alt="Logo videobelajar"
        />

        <div>
          <div className="relative flex flex-row items-center gap-10">
            <img
              className="block h-[12px] w-[18px] cursor-pointer md:hidden"
              onClick={() => setShowDropdown(!showDropdown)}
              src="/assets/dropdown-icon.png"
              alt="Dropdown menu"
            />
          </div>
          {isAuthenticated ? (
            <div className="hidden md:block">
              <div className="relative flex flex-row items-center gap-10">
                <div className="cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                  Kategori
                  {showDropdown && (
                    <div className="absolute -left-10 top-full z-10 mt-2 min-w-[200px] bg-white shadow">
                      <div 
                        onClick={() => navigate('/profile')}
                        className="border-b border-t p-4 hover:bg-slate-100 cursor-pointer"
                      >
                        Profil saya
                      </div>
                      <div className="border-b p-4 hover:bg-slate-100">Kelas saya</div>
                      <div className="border-b p-4 hover:bg-slate-100">Pesanan saya</div>
                      <div
                        onClick={logout}
                        className="flex flex-row items-center gap-2 border-b p-4 text-red-500 hover:bg-slate-100"
                      >
                        Keluar <img src="/assets/Logout.png" />
                      </div>
                    </div>
                  )}
                </div>
                <span
                  className="cursor-pointer text-[#FF6B6B]"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </span>
                <img className="avatar h-[45px]" src="/assets/avatar.png" alt="User avatar" />
              </div>
            </div>
          ) : (
            <div className="hidden flex-row items-center gap-3 md:flex">
              <span
                className="cursor-pointer px-8 text-[#3ECF4C]"
                onClick={() => navigate("/products")}
              >
                Kategori
              </span>
              <span
                className="cursor-pointer px-4 text-[#FF6B6B]"
                onClick={() => navigate("/admin")}
              >
                Admin
              </span>
              <ButtonUI onClick={() => navigate("/login")}  className="bg-black text-white p-4">Login</ButtonUI>
              <ButtonUI onClick={() => navigate("/register")} variant="secondary">
                Register
              </ButtonUI>
            </div>
          )}
        </div>
      </header>
      {showDropdown &&
        (isAuthenticated ? (
          <div
            className="fixed left-0 top-[83px] w-screen bg-white shadow-lg md:hidden"
            style={{ zIndex: 100 }}
          >
            <div
              onClick={() => navigate('/profile')}
              className="border-b border-t p-4 hover:bg-slate-100 cursor-pointer"
            >
              Profil saya
            </div>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="border-b p-4 hover:bg-slate-100"
            >
              Kelas saya
            </div>
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="border-b p-4 hover:bg-slate-100"
            >
              Pesanan saya
            </div>
            <div
              onClick={logout}
              className="flex flex-row items-center gap-2 border-b p-4 text-red-500 hover:bg-slate-100"
            >
              Keluar <img src="/assets/Logout.png" />
            </div>
          </div>
        ) : (
          <div
            className="fixed left-0 top-[83px] w-screen bg-white shadow-lg md:hidden"
            style={{ zIndex: 100 }}
          >
            <div
              onClick={() => navigate("/admin")}
              className="cursor-pointer border-b border-t bg-[#FF6B6B] p-4 text-white hover:bg-red-600"
            >
              Admin
            </div>
            <div
              onClick={() => navigate("/login")}
              className="cursor-pointer border-b bg-[#3ecf4c] p-4 text-[#3ECF4C] hover:bg-green-600"
            >
              Login
            </div>
            <div
              onClick={() => navigate("/register")}
              className="cursor-pointer border-b bg-[#e8fde1] p-4 text-[#3ECF4C] hover:bg-slate-100"
            >
              Register
            </div>
          </div>
        ))}
    </>
  );
};
