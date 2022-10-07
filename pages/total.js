import { useEffect, useCallback } from "react"
import useComida from "../hooks/useComida"
import Layout from "../layout/Layout"
import { formatearDinero } from "../helpers"

export default function Total() {

    const {pedido, nombre, setNombre, colocarOrden, total} = useComida()

    const comprobarPedido = useCallback (() => {
        return pedido.length === 0 || nombre.length < 1
    },[pedido,nombre])

    useEffect(()=>{
        comprobarPedido()
    },[pedido, comprobarPedido])

    return (
        <>
            <Layout pagina='Datos y Total'>
                <h1 className="text-4xl font-black">Datos y Total</h1>
                <p className="text-2xl my-10">Confirma tú pedido</p>

                <form
                    onSubmit={colocarOrden}
                >
                    <div>
                        <label 
                            htmlFor="nombre"
                            className="block uppercase text-slate-800 font-bold text-xl"
                        >
                            Nombre
                        </label>
                        <input
                            id='nombre'
                            type='text'
                            className="bg-gray-300 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)}
                        />
                        <div className="mt-10">
                            <p className="text-2xl">
                                Total a pagar: <span className="font-bold"> {formatearDinero(total)} </span>
                            </p>
                        </div>
                        <div className="mt-5">
                            <input 
                                type="submit"
                                disabled={comprobarPedido()}
                                className={`${
                                    comprobarPedido() ? 'bg-gray-300' : 'bg-amber-500 hover:bg-amber-600'
                                } w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white cursor-pointer text-center`}
                                value="Confirmar pedido"
                            />
                        </div>
                        { pedido.length <= 0 ? <p className="mt-2 text-red-600 font-bold"> Debe añadir algún producto al pedido </p> : '' }
                        { nombre.length <= 0 ? <p className="mt-2 text-red-600 font-bold"> Debe escribir el nombre </p> : '' }
                    </div>
                </form>

            </Layout>
        </>
    )
  }