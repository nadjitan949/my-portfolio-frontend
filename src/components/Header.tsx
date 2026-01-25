import { FiLogIn, FiX, FiMenu, FiUser, FiLogOut } from "react-icons/fi"
import Button from "../ui/Button"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import ChatWidget from "./ChatWidget"
import AuthModal from "./AuthModal"

function Header() {
    const [menuModal, setMenuModal] = useState(false)
    const [authForm, setAuthForm] = useState<boolean>(false)
    const [isOnline, setIsOnline] = useState<boolean>(!!localStorage.getItem("token"))

    const navigate = useNavigate()

    const ToggleMenu = () => setMenuModal((prev) => !prev)

    const handleNavigate = (path: string) => {
        navigate(path)
        setMenuModal(false)
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsOnline(false)
        setMenuModal(false)
        navigate("/")
    }


    const navLinks = [
        { name: "Accueil", path: "/" },
        { name: "À propos", path: "about" },
        { name: "Expériences", path: "experiences" },
        { name: "Projets", path: "projects" },
        { name: "Services", path: "services" },
        { name: "Contact", path: "contact" },
    ];

    return (
        <>
            <header className="w-full h-20 md:h-24 px-6 md:px-15 relative z-50">
                <div className="w-full h-full flex items-center justify-between">

                    {/* LOGO */}
                    <div className="cursor-pointer" onClick={() => navigate("/")}>
                        <span className="font-bold text-2xl italic tracking-tighter text-black">
                            Nadjitan
                        </span>
                    </div>

                    {/* DESKTOP NAVIGATION */}
                    <div className="hidden lg:flex items-center gap-8">
                        <ul className="flex items-center gap-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Button
                                        onClick={() => navigate(link.path)}
                                        className="px-4 py-2 rounded-full text-sm font-medium border hover:bg-black hover:text-white transition-all duration-300"
                                    >
                                        {link.name}
                                    </Button>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-3">
                            {isOnline ? (
                                <Button className="w-10 h-10 rounded-full flex items-center justify-center bg-black text-white transition-colors">
                                    <FiUser size={18} />
                                </Button>
                            ) : (
                                <Button onClick={() => setAuthForm(true)} className="w-10 h-10 rounded-full flex items-center justify-center bg-black text-white hover:border hover:bg-white hover:text-black transition-colors">
                                    <FiLogIn size={18} />
                                </Button>
                            )}
                            {isOnline && (
                                <Button onClick={handleLogout} className="w-10 h-10 rounded-full flex items-center justify-center border hover:bg-black hover:text-white transition-colors">
                                    <FiLogOut size={18} />
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* BURGER ICON (MOBILE) */}
                    <button
                        onClick={ToggleMenu}
                        className="lg:hidden p-2 text-black transition-transform active:scale-90"
                    >
                        {menuModal ? <FiX size={28} /> : <FiMenu size={28} />}
                    </button>
                </div>

                {/* MOBILE MENU (SIDEBAR) */}
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${menuModal ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                    onClick={ToggleMenu}
                />

                <div className={`fixed top-0 right-0 w-[75%] max-w-xs h-screen bg-white shadow-2xl z-50 transition-transform duration-500 ease-in-out lg:hidden p-8 ${menuModal ? "translate-x-0" : "translate-x-full"
                    }`}>
                    <div className="flex justify-between items-center mb-10">
                        <span className="font-bold italic text-xl">Menu</span>
                        <Button onClick={ToggleMenu} className="p-2 bg-gray-100 rounded-full">
                            <FiX size={20} />
                        </Button>
                    </div>

                    <ul className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <button
                                    onClick={() => handleNavigate(link.path)}
                                    className="w-full text-left px-4 py-3 rounded-xl text-lg font-medium hover:bg-gray-100 transition-colors"
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-10 flex flex-col gap-3">
                        {isOnline ? (
                            <Button onClick={handleLogout} className="w-full py-4 rounded-2xl border border-gray-200 font-bold flex items-center justify-center gap-2 text-red-500">
                                <FiLogOut /> Deconnexion
                            </Button>
                        ) : (
                            <Button onClick={() => setAuthForm(true)} className="w-full py-4 rounded-2xl border border-gray-200 font-bold flex items-center justify-center gap-2">
                                <FiLogIn /> Connexion
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            <ChatWidget />

            {authForm && (<AuthModal onClose={() => setAuthForm(false)} />)}
        </>
    )
}

export default Header