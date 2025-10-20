import { HeaderLayout } from "../layouts/header";
import { FooterLayout } from "../layouts/footer";
import { useIsMobile } from "../services/hooks/useIsMobile";
import { DefaultLayout } from "../layouts/default";
import { useState, useEffect } from "react";
import { ButtonUI } from "../components/UIs/button";

export const ProfilePage = () =>{
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsed = JSON.parse(userData);
      setName(parsed.name || '');
      setEmail(parsed.email || '');
      setPhone(parsed.phone || '');
    }
  }, []);

  return(
    <>
      <HeaderLayout/>
      <div className="flex flex-col items-start" style={{ marginTop: '60px', marginLeft: '80px' }}>
        <h3 className="text-heading5 font-bold">Profil Page</h3>
        <p className="text-bodyMedium font-light text-[#333333AD]">ubah data diri anda</p>
        <nav className="bg-white rounded-[10px] border border-gray-300 p-6 shadow-sm" style={{ width: '292px', borderRadius: '10px', marginTop: '40px' }}>
          <ul className="flex flex-col gap-2">
            <li><a href="" className="flex items-center gap-2 p-2 rounded transition-colors" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFBD3A'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}> <img src="public/assets/person-fill.svg" alt="profile" />Profile saya</a></li>
            <li><a href="" className="flex items-center gap-2 p-2 rounded transition-colors" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFBD3A'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}><img src="public/assets/contents/Book.svg" alt="class" />kelas saya</a></li>
            <li><a href="" className="flex items-center gap-2 p-2 rounded transition-colors" onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFBD3A'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}><img src="public/assets/ShoppingBasket.svg" alt="pesanan" />Pesanan saya</a></li>
          </ul>  
        </nav>
        <div className="bg-white rounded-[10px] border border-gray-300 p-6 shadow-sm" style={{ width: '872px', borderRadius: '10px', marginTop: '24px' }}>
          <img src="public/assets/avatar.png" alt="" />
          <div className="mt-4 flex flex-row" style={{ gap: '24px' }}>
            <div className="flex flex-col" style={{ width: '264px', height: '49px', gap: '3px' }}>
              <label className="text-sm font-medium">Nama</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 p-2 border border-gray-300"
                style={{ borderRadius: '10px' }}
                disabled={!isEditing}
              />
            </div>
            <div className="flex flex-col" style={{ width: '264px', height: '49px', gap: '3px' }}>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2 border border-gray-300"
                style={{ borderRadius: '10px' }}
                disabled={!isEditing}
              />
            </div>
            <div className="flex flex-col" style={{ width: '264px', height: '49px', gap: '3px' }}>
              <label className="text-sm font-medium">No. Telepon</label>
              <div className="flex flex-1">
                <select className="p-2 border border-gray-300 border-r-0" style={{ borderRadius: '10px 0 0 10px', width: '70px' }}>
                  <option value="+62">+62</option>
                  <option value="+65">+65</option>
                  <option value="+60">+60</option>
                  <option value="+66">+66</option>
                  <option value="+84">+84</option>
                </select>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 p-2 border border-gray-300"
                  style={{ borderRadius: '0 10px 10px 0' }}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end" style={{ marginTop: '70px' }}>
            {isEditing ? (
              <div className="flex gap-3">
                <ButtonUI 
                  variant="primary" 
                  fullWidth={false}
                  onClick={() => {
                    localStorage.setItem('userData', JSON.stringify({
                      name,
                      email,
                      phone
                    }));
                    setIsEditing(false);
                  }}
                >
                  Simpan
                </ButtonUI>
                <ButtonUI 
                  variant="tertiary" 
                  fullWidth={false}
                  onClick={() => setIsEditing(false)}
                >
                  Batal
                </ButtonUI>
              </div>
            ) : (
              <ButtonUI 
                variant="primary" 
                fullWidth={false}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </ButtonUI>
            )}
          </div>
        </div>
      </div>
    </>
  )
} 