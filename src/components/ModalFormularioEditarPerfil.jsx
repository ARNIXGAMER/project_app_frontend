import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/clienteAxios";

const ModalFormularioEditarPerfil = () => {
  const { auth } = useAuth();
  const [nombre, setNombre] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Actualizando...')
    if ((!nombre || nombre === "") && avatar === null) {
      setMessage("Debe completar almenos un campo");
    } else {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }
      const config = {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      };
      try {
        const formData = new FormData();
        formData.append("nombre", nombre);
        formData.append("avatar", avatar);
        const {data} = await clienteAxios.put(
          `/usuarios/${auth._id}`,
          formData,
          config
        );
        console.log(data.msg)
        setMessage(data.msg);
        setAvatar(null);
        setNombre("");
        if(data.msg === 'Actualizado'){
          navigate("/perfil");
        }
        // navigate('/proyectos')
      } catch (error) {
        setMessage("Error al tratar de actualizar");
      }
    }
  };

  return (
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-5">
      {message}
      <div className="flex gap-2">
      <Link
            className='uppercase font-bold ml-60'
            to={`/perfil`}
          >Cerrar</Link>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          </div>
      <div>
        <form onSubmit={handleSubmit} class="flex-col gap-3 p-5 ">
          <div class="flex flex-col items-center gap-2">
            <div class="mb-6 w-full">
              <label
                htmlFor="avatar"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Tu avatar
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                class="bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Selecciona algun archivo"
              />
            </div>
            <div class="mb-6 w-full">
              <label
                htmlFor="nombre"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Nuevo nombre
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                onChange={(e) => setNombre(e.target.value)}
                value={nombre}
                class="bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          <div class="flex justify-center mt-4 space-x-3 md:mt-6">
            <button
              type="submit"
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Guardar cambios
            </button>
            <Link
              to={"/perfil"}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
            >
              Atras
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalFormularioEditarPerfil;
