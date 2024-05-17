import { MdDarkMode, MdOutlineLightMode } from "react-icons/md"; // Importar iconos para el modo oscuro y claro
import LogoIcon from "../icons/Logo"; // Importar el icono del logo
import { useEffect, useState } from "react"; // Importar hooks de React

const NavBar = () => {
  // Estado local para manejar el tema (claro u oscuro)
  const [theme, setTheme] = useState("light");

  // useEffect para aplicar el tema seleccionado a la clase de la raíz del documento
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark'); // Agregar la clase 'dark' si el tema es oscuro
    } else {
      document.documentElement.classList.remove('dark'); // Quitar la clase 'dark' si el tema es claro
    }
  }, [theme]); // Se ejecuta cada vez que cambia el tema

  // Función para cambiar entre los temas
  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark'); // Alternar entre 'dark' y 'light'
  };

  return (
    <div className="flex min-h-[10%] justify-between items-center border-b border-borderColor dark:border-secondaryDark">
      {/* Logo y título */}
      <span className="flex justify-center items-center mt-4 mb-4 ml-[40px] sm:ml-[72px]">
        <LogoIcon /> {/* Icono del logo */}
        <h1 className="-ml-[85px] text-sm text-textLight select-none dark:text-primaryLight font-bold">
          ImageUpload
        </h1>
      </span>

      {/* Botón para cambiar el tema */}
      <span
        onClick={handleThemeSwitch}
        className="mt-4 mb-4 cursor-pointer mr-[40px] sm:mr-[72px] p-[10px] rounded-lg border bg-secondaryLight border-borderColor dark:bg-secondaryDark dark:border-secondaryDark"
      >
        {/* Mostrar el icono correspondiente al tema actual */}
        {theme === 'dark' ? (
          <MdOutlineLightMode className="text-lg text-borderColor" /> // Icono para el modo claro
        ) : (
          <MdDarkMode className="text-lg text-bgProgressDark" /> // Icono para el modo oscuro
        )}
      </span>
    </div>
  );
};

export default NavBar; // Exportar el componente para su uso en otros archivos
