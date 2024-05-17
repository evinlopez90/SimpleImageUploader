/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { useRef, useState, useEffect } from "react";
import UploadIcon from "../icons/UploadIcon";
import axios from "axios";
import Loading from "./Loading";
import Shard from "./Shard";
import { motion } from "framer-motion";

const Uploader = () => {
  const cloud_name = import.meta.env.REACT_CLOUD_NAME; // Nombre de la cuenta en Cloudinary
  const precet = import.meta.env.REACT_API_SECRET

  // Estados locales
  const [isDragging, SetIsDragging] = useState<boolean>(false); // Estado para el arrastre
  const [file, setFile] = useState<FileList | null>(null); // Estado para el archivo
  const [uploadedUrl, setUploadedUrl] = useState<string>(""); // URL del archivo subido
  const [loader, setLoader] = useState<Boolean>(false); // Estado para el cargador

  // Referencia al input de archivo
  const inputRef = useRef<HTMLInputElement>(null);

  // Maneja el evento de arrastrar sobre el área de carga
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    SetIsDragging(true);
  };

  // Maneja el evento de salir del área de carga
  const handleLeave = () => {
    SetIsDragging(false);
  };

  // Maneja el evento de soltar el archivo en el área de carga
  const handleDrog = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    SetIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  // Procesa los archivos seleccionados
  const handleFiles = async (files: FileList | null) => {
    if (!files) {
      setFile(null);
      return;
    }

    // Verifica que todos los archivos sean imágenes
    if (!Array.from(files).every(file => file.type.startsWith("image/"))) {
      return;
    }

    const file = files[0]; // Solo procesa el primer archivo
     
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', precet); // Preset de Cloudinary

    // Sube el archivo a Cloudinary
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // Guarda la URL del archivo subido
    setUploadedUrl(response.data.secure_url);
    setFile(files);

    if (response.data.secure_url) {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        console.log(loader);
      }, 3000);
    }
  };

  // Maneja el clic en el área de carga
  const handleClick = () => {
    inputRef.current?.click();
  };

  // Maneja el cambio en el input de archivo
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    handleFiles(files);
  };

  // Efecto para manejar cambios en el archivo seleccionado
  useEffect(() => {
    if (file) {
      handleFiles(file);
    }
  }, [file]);

  return (
    <div className="flex min-h-[85%] justify-center items-center">
      {/* Formulario de carga de archivos */}
      {
        loader === false && uploadedUrl.length < 1 ? (
          <motion.form
            whileHover={{ scale: 0.9, transition: { duration: 0.5 } }}
            whileTap={{ scale: 1 }}
            className="w-[300px] h-[300px] sm:w-[540px] sm:h-[312px] shadow-2xl p-2 rounded-lg bg-secondaryLight dark:bg-secondaryDark flex justify-center items-center"
          >
            <aside
              onDragOver={handleDragOver}
              onDragLeave={handleLeave}
              onDrop={handleDrog}
              onClick={handleClick}
              className={`w-full h-full flex select-none flex-col justify-center items-center ${isDragging === true ? 'bg-borderColor dark:bg-gray-950' : null} cursor-pointer border border-dashed rounded-lg dark:border-bgProgressDark`}
            >
              <input
                ref={inputRef}
                type="file"
                onChange={handleInputChange}
                style={{ display: 'none' }} // Esconder el input de archivo
              />
              <span className="mb-5">
                <UploadIcon /> {/* Icono de carga */}
              </span>
              <p className="mb-2 text-[15px] font-medium dark:font-normal text-primaryDark dark:text-borderColor">
                Drag & drop a file or <span className="text-progress">browse files</span>
              </p>
              <p className="text-secondaryDark text-[12px] dark:text-borderColor font-extralight">
                JPG, PNG or GIF - Max file size 2MB
              </p>
            </aside>
          </motion.form>
        ) : null
      }

      {/* Indicador de carga */}
      {
        loader === true ? <Loading /> : null
      }

      {/* Mostrar componente Shard cuando se ha subido un archivo */}
      {
        loader === false && uploadedUrl.length > 1 ? <Shard url={uploadedUrl} /> : null
      }
    </div>
  );
};

export default Uploader;
