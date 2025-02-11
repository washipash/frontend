import React, { useState } from 'react';
import { FcGlobe, FcMenu, FcDisapprove } from 'react-icons/fc';
import { SidebarItems, SidebarItemFooter } from './../setting_lib/menu/menuConfig';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle'; 

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="fixed top-0 left-0 w-full h-16 bg-gray-800 shadow-md flex items-center px-4">
            {/* Encabezado del menú */}
            <div className="flex items-center gap-2">
                <FcGlobe fontSize={30} />
                <span className="text-lg font-semibold text-white">CTRA</span>
            </div>

            
            

            {/* Botón de abrir/cerrar menú */}
            <button onClick={() => setIsOpen(!isOpen)} className="mr-4">
                {isOpen ? <FcDisapprove fontSize={30} /> : <FcMenu fontSize={30} />}
            </button>
            
            {/* Contenido del menú */}
            <div className={`overflow-y-auto flex ${isOpen ? 'block' : 'hidden'} py-4 px-3 flex-grow flex justify-between`}>
                {/* Home alineado a la izquierda */}
                <LinkSidebar key="home" item={SidebarItems.find(item => item.key === 'home')} />
                <div className="ml-auto mr-4">
                    <ThemeToggle />
                </div>
                {/* Otros items alineados a la derecha */}
                <div className="flex ml-auto gap-4">
                    {SidebarItems.filter(item => item.key !== 'home').map((item) => (
                        <LinkSidebar key={item.key} item={item} />
                    ))}
                </div>
            </div>

            {/* Footer del menú en una sola línea */}
            <div className="flex flex-row border-t-2 p-2 gap-4 border-neutral-300 justify-end">
                {SidebarItemFooter.map((item) => (
                    <LinkSidebar key={item.key} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;

function LinkSidebar({ item }) {
    const linkClass = 'flex items-center gap-2 px-3 py-2 rounded hover:shadow hover:bg-blue-400 text-white text-base';
    return (
        <Link to={item.LinkPath} className={linkClass}>
            <span>{item.icon}</span>
            <span className="hidden md:block">{item.label}</span>
        </Link>
    );
}
