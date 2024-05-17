import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { PiDownloadSimple } from "react-icons/pi";

// Definición de las propiedades que acepta el componente
interface MyProps {
  url?: string; // Propiedad opcional de tipo string
}

// Definición del componente funcional con las propiedades de MyProps
const Shard: React.FC<MyProps> = ({ url }) => {
  // Estado local para manejar mensajes
  const [mesagge, setmesagge] = useState('');

  // Función para copiar la URL al portapapeles
  const handleCopyToClipboard = useCallback(async () => {
    if (!url) return; // Si no hay URL, no hacer nada
    try {
      await navigator.clipboard.writeText(url); // Intentar copiar la URL al portapapeles
      setmesagge('Copiado en el portapapeles'); // Mensaje de éxito
      setTimeout(() => {
        setmesagge(''); // Limpiar el mensaje después de 3 segundos
      }, 3000);
    } catch (error) {
      setmesagge('Hubo un error al copiar el enlace'); // Mensaje de error
      setTimeout(() => {
        setmesagge(''); // Limpiar el mensaje después de 3 segundos
      }, 3000);
    }
  }, [url]);

  return (
    <motion.div className="flex flex-col justify-center items-center">
      {/* Mostrar mensaje si hay un mensaje activo */}
      {mesagge.length > 1 && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }} // Estado inicial de la animación
          animate={{ opacity: 1, scale: 0.9 }} // Estado final de la animación
          transition={{ duration: 0.3 }} // Duración de la animación
          className="fixed text-sm top-[90%] left-5 p-4 bg-secondaryLight rounded-lg select-none dark:bg-secondaryDark dark:text-secondaryLight shadow-2xl">
          {mesagge}
        </motion.span>
      )}
      {/* Contenedor de la imagen */}
      <motion.aside
        initial={{ y: -120, opacity: 0.3 }} // Estado inicial de la animación
        animate={{ y: 0, opacity: 1 }} // Estado final de la animación
        transition={{ duration: 0.5 }} // Duración de la animación
        className="w-[320px] h-[250px] sm:w-[600px] sm:h-[350px] border-[8px] border-primaryLight shadow-2xl dark:border-bgProgressDark rounded-lg">
        <img src={url} alt="image" className="w-full h-full" /> {/* Imagen */}
      </motion.aside>
      <div className="flex gap-3 mt-8">
        {/* Botón para copiar la URL */}
        <motion.button
          whileHover={{ scale: 1.1 }} // Animación al pasar el mouse
          whileTap={{ scale: 0.9 }} // Animación al hacer clic
          onClick={handleCopyToClipboard}
          className="flex justify-center items-center gap-1 h-[30px] bg-progress text-primaryLight w-[96px] rounded-[8px] text-[12px]">
          <BsLink45Deg className="text-[16px]" /> Share {/* Icono y texto */}
        </motion.button>
        {/* Botón para descargar la imagen */}
        <motion.button
          whileHover={{ scale: 1.1 }} // Animación al pasar el mouse
          whileTap={{ scale: 0.9 }} // Animación al hacer clic
          className="flex justify-center items-center gap-1 h-[30px] bg-progress text-primaryLight w-[96px] rounded-[8px] text-[12px]">
          <a href={url} download target="_blank" className="w-full h-full flex justify-center items-center gap-1">
            <PiDownloadSimple className="text-[15px]" /> Download {/* Icono y texto */}
          </a>
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Shard; // Exportar el componente para su uso en otros archivos
