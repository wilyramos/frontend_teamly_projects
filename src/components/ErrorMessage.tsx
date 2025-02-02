
export default function ErrorMessage({ children } : { children: React.ReactNode}) {


  return (
    <div className="bg-red-200 border-l-4 border-red-500 text-red-700 px-2 py-2 rounded relative font-light" role="alert">
        {children}

    </div>
  )
}
