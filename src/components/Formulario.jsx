import { useState, useEffect} from 'react'
import Error from './Error'

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
    const [nombre, setNombre] = useState('') 
    const [propietario, setPropietario] = useState('') 
    const [email, setEmail] = useState('') 
    const [fecha, setFecha] = useState('') 
    const [sintomas, setSintomas] = useState('') 

    const [error, setError] = useState(false)

    useEffect(() => {
        if(Object.keys(paciente).length > 0){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            
        }
    }, [paciente])

    const generarID = () => {
        const random = Math.random().toString(36).substring(2)
        const fecha = Date.now().toString(36)
        return random + fecha
    }

    const HandleSubmit = (e) => {
        e.preventDefault()
        //Comprobamos que los valores no estén vacios
        if( [nombre, propietario, email, fecha, sintomas].includes('')){
            setError(true)
            return;
        }

        setError(false)

        //Construir objeto de Paciente
        const objetoPaciente = {
            nombre, 
            propietario, 
            email, 
            fecha, 
            sintomas
        }

        if(paciente.id){
            //console.log("editando paciente")
            objetoPaciente.id = paciente.id

            const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

            setPacientes(pacientesActualizados)
            setPaciente({})


        }else{
            //console.log("nuevo registro")
            //Agregamos al final el nuevo objeto de pacientes
            objetoPaciente.id = generarID()
            setPacientes([...pacientes, objetoPaciente])
        }

        

        //Reiniciamos valores del formulario
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        
    }

    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form 
                onSubmit={HandleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            >
                
                {error && <Error><p>Falta algún campo por rellenar</p></Error>}

                <div className="mb-5">
                    <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">
                        Nombre de la Mascota
                    </label>
                    <input
                        id="mascota"
                        className="border-2 w-full pt-2 mt-2 placeholder-gray-400 rounded-md"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        value={nombre}
                        onChange={ (e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">
                        Nombre del Propietario
                    </label>
                    <input
                        id="propietario"
                        className="border-2 w-full pt-2 mt-2 placeholder-gray-400 rounded-md"
                        type="text"
                        placeholder="Nombre del Propietario"
                        value={propietario}
                        onChange={ (e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        className="border-2 w-full pt-2 mt-2 placeholder-gray-400 rounded-md"
                        type="email"
                        placeholder="email@email.com"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>
                    <input
                        id="alta"
                        className="border-2 w-full pt-2 mt-2 placeholder-gray-400 rounded-md"
                        type="date"
                        value={fecha}
                        onChange={ (e) => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">
                        Síntomas
                    </label>
                    <textarea
                        id="sintomas"
                        className="border-2 w-full pt-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los síntomas"
                        value={sintomas}
                        onChange={ (e) => setSintomas(e.target.value)}
                    />
                </div>
                <input 
                    type="submit" 
                    className="bg-indigo-600 w-full text-white py-3 uppercase font-bold cursor-pointer transition-all hover:bg-indigo-800"
                    value={paciente.id ? "Editar Paciente" : "Agregar Paciente"} 
                />
            </form>

        </div>
    )
}

export default Formulario