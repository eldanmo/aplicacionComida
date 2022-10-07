import Image from "next/image"
import useComida from "../hooks/useComida"
import Categoria from "./Categoria"

const Sidebar = () => {
  const {categorias} = useComida()
  return (
    <div>
      <Image width={300} height={100} src="/assets/img/logo.svg" alt="Imagen logo"/>

      <nav className="mt-10">
        {categorias.map(categoria => (
          <Categoria
            key={categoria.id}
            categoria={categoria}
          />
        ))}
      </nav>
    </div>
  )
}

export default Sidebar