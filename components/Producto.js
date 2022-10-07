import Image from "next/image"
import { formatearDinero } from "../helpers"
import useComida from "../hooks/useComida"

const Producto = ({producto}) => {

    const {nombre, imagen, precio} = producto

    const {handleSetProducto, handleChangeModal} = useComida()

  return (
    <div className="border p-3" >
        <Image
            src={`/assets/img/${imagen}.jpg`}
            alt={`Imagen Platillo ${nombre}`}
            width={400}
            height={500}
        />
        <div className="p-5">
            <h3 className="text-2xl font-bold">{nombre}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">
                {formatearDinero(precio)}
            </p>
            <button 
                className="bg-amber-600 hover:bg-amber-700 text-white w-full mt-5 p-3 uppercase font-bold"
                type="button"
                onClick={()=>{
                    handleChangeModal(),
                    handleSetProducto(producto)
                }}
            >
                Agregar
            </button>
        </div>
    </div>
  )
}

export default Producto