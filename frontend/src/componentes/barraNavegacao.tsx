export default function BarraNavegacao() {
    return (
        <>
            <nav className="bg-cyan-700">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <a href="/">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="Your Company"
                                    />
                                </a>
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    <a href="/" className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">Home</a>
                                    <a href="/clientes" className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Clientes</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}