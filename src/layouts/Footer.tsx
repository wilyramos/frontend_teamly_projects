
export default function Footer() {
    return (
        <footer className='py-5 bg-gray-100'>
            <p className='text-center text-gray-500 text-sm py-4 border-t border-gray-200'>
                © Powered by 
                <a
                    href="https://wilyramos.github.io/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-500 hover:text-gray-900 font-bold"
                >
                    {' '}wily ramos
                </a>
            </p>
        </footer>
    )
}
