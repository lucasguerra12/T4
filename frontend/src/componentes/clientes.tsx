import { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import { excluirCliente, listarClientes } from "../api/clientes";
import Modal from "./Modal";

export default function Clientes() {
    const [clientes, setClientes] = useState<any[]>([]);
    const [clienteSelecionado, setClienteSelecionado] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const data = await listarClientes();
        setClientes(data);
    };

    const handleExcluir = async (id: number) => {
        const clienteParaExcluir = clientes.find(c => c.id === id);
        if (clienteParaExcluir) {
            await excluirCliente(clienteParaExcluir);
            fetchClientes(); // Atualiza a lista após a exclusão
        }
    };

    const handleOpenModal = (cliente: any = null) => {
        setClienteSelecionado(cliente);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setClienteSelecionado(null);
    };

    const handleSave = () => {
        fetchClientes();
        handleCloseModal();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Clientes</h1>
            <div className="mb-4">
                <button onClick={() => handleOpenModal()} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    Cadastrar Novo Cliente
                </button>
            </div>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sobrenome</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {clientes.map(cliente => (
                            <tr key={cliente.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{cliente.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{cliente.sobreNome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleOpenModal(cliente)} className="text-indigo-600 hover:text-indigo-900">
                                        Editar
                                    </button>
                                    <button onClick={() => handleExcluir(cliente.id)} className="ml-4 text-red-600 hover:text-red-900">
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <Modal cliente={clienteSelecionado} onClose={handleCloseModal} onSave={handleSave} />
            )}
        </div>
    );
}