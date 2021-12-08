
const Error = ({children}) => {
    return (
        <div className="bg-red-700 text-white p-5 mb-10 rounded-md text-center uppercase font-bold">
            <p>{children}</p>
        </div>
    )
}

export default Error
