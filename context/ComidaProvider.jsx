import { useState, useEffect, createContext } from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import { useRouter } from "next/router";

const ComidaContext = createContext()


const ComidaProvider = ({children})=> {

    const [categorias, setCategorias] = useState([])

    const [categoriaActual, setCategoriaActual] = useState({})

    const [producto, setProducto] = useState({})

    const [modal, setModal] = useState(false)

    const [ pedido, setPedido ] = useState([])

    const [nombre, setNombre] = useState([])

    const [total, setTotal] = useState(0)

    const router = useRouter()

    const obtenerCategorias = async () =>{
        const { data } = await axios(`/api/categorias`)
        setCategorias(data)
    }

    const handleClickCategoria = (id) => {
        const categoria = categorias.filter(categori => categori.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = (producto) => {
        setProducto(producto)
    }

    const handleChangeModal = ()=>{
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaID, ...producto})=>{
        if(pedido.some(productoState => productoState.id === producto.id )){
            const pedidoActualizado = pedido.map(productoState=> productoState.id === producto.id ? producto : productoState )
            setPedido(pedidoActualizado)
            toast.success('Se actualizo el pedido')
        } else {
            setPedido([...pedido, producto])
            toast.success('Se agrego el producto al pedido')
        }
        setModal(false)
    }

    const handleEditarCantidades  = (id)=>{
        const productoActualizar = pedido.filter( producto=> producto.id === id )
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = (id)=>{
        const productoactualizado = pedido.filter( producto=> producto.id !== id )
        setPedido(productoactualizado)
    }

    const colocarOrden = async (e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.post('/api/ordenes', {pedido,nombre, total, fecha: Date.now().toString()} )

            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado')


            setTimeout(() => {
                router.push('/')
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        obtenerCategorias()
    },[])

    useEffect(()=>{
        setCategoriaActual(categorias[0])
    },[categorias])

    useEffect(()=>{
        const nuevoTotal = pedido.reduce((total, producto)=>(producto.precio * producto.cantidad)+total,0)
        setTotal(nuevoTotal)
    },[pedido])

    return(
        <ComidaContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocarOrden,
                total,
            }}
        >
            {children}
        </ComidaContext.Provider>
    )
}

export {
    ComidaProvider
}
export default ComidaContext