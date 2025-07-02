import { useState, useEffect } from "react";
import 'materialize-css/dist/css/materialize.min.css';
import { excluirCliente, listarClientes } from "../api/clientes";
import Modal from "./Modal";

export default function Clientes() {
    const [clientes, setClientes] = useState<any[]>([]);
    const [clienteSelecionado, setClienteSelecionado] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchClientes = async () => {
            const data = await listarClientes();
            setClientes(data);
        };
        fetchClientes();
    }, []);

    const handleExcluir = async (id: number) => {
        await excluirCliente(id);
        setClientes(clientes.filter(cliente => cliente.id !== id));
    };

    const handleOpenModal = (cliente: any = null) => {
        setClienteSelecionado(cliente);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setClienteSelecionado(null);
    };

    const handleSave = async () => {
        
        const data = await listarClientes();
        setClientes(data);
        handleCloseModal();
    };

    return (
        <div className="container">
            <h4>Clientes</h4>
           
            <div className="row">
                <a onClick={() => handleOpenModal()} className="waves-effect waves-light btn-large">Cadastrar Novo Cliente</a>
            </div>
            
            <div className="collection">
                {clientes.map(cliente => (
                    <div key={cliente.id} className="collection-item">
                        {cliente.nome} {cliente.sobreNome}
                        <div className="secondary-content">
                            <button onClick={() => handleOpenModal(cliente)} className="btn-floating waves-effect waves-light blue">
                                <i className="material-icons">edit</i>
                            </button>
                            <button onClick={() => handleExcluir(cliente.id)} className="btn-floating waves-effect waves-light red" style={{ marginLeft: '10px' }}>
                                <i className="material-icons">delete</i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            
            {isModalOpen && (
                <Modal cliente={clienteSelecionado} onClose={handleCloseModal} onSave={handleSave} />
            )}
        </div>
    );
}