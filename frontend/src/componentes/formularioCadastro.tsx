import React, { useState, useEffect } from "react";
import { cadastrarCliente, atualizarCliente } from "../api/clientes";

interface FormularioCadastroProps {
    cliente: any; 
    onClose: () => void;
    onSave: () => void;
}

const FormularioCadastro: React.FC<FormularioCadastroProps> = ({ cliente, onClose, onSave }) => {


    const [nome, setNome] = useState("");
    const [sobreNome, setSobreNome] = useState("");
    const [email, setEmail] = useState("");
    const [ddd, setDdd] = useState("");
    const [numero, setNumero] = useState("");
    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [numeroEndereco, setNumeroEndereco] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [informacoesAdicionais, setInformacoesAdicionais] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    useEffect(() => {
        if (cliente) {
            setNome(cliente.nome || "");
            setSobreNome(cliente.sobreNome || "");
            setEmail(cliente.email || "");
            if (cliente.endereco) {
                setEstado(cliente.endereco.estado || "");
                setCidade(cliente.endereco.cidade || "");
                setBairro(cliente.endereco.bairro || "");
                setRua(cliente.endereco.rua || "");
                setNumeroEndereco(cliente.endereco.numero || "");
                setCodigoPostal(cliente.endereco.codigoPostal || "");
                setInformacoesAdicionais(cliente.endereco.informacoesAdicionais || "");
            }
            if (cliente.telefones && cliente.telefones.length > 0) {
                setDdd(cliente.telefones[0].ddd || "");
                setNumero(cliente.telefones[0].numero || "");
            }
        }
    }, [cliente]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");
        setSucesso("");

        try {
            const clienteData = {
                id: cliente?.id,
                nome,
                sobreNome,
                email,
                endereco: { estado, cidade, bairro, rua, numero: numeroEndereco, codigoPostal, informacoesAdicionais },
                telefones: ddd && numero ? [{ ddd, numero }] : []
            };

            if (cliente && cliente.id) {
                await atualizarCliente(clienteData);
                setSucesso("Cliente atualizado com sucesso!");

            } else {
                await cadastrarCliente(clienteData);
                setSucesso("Cliente cadastrado com sucesso!");
            }
            
            setTimeout(() => {
                onSave();
            }, 1200);

        } catch (err) {
            setErro("Ocorreu um erro ao salvar o cliente.");
        }
    };

    const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-focus focus:border-green-focus sm:text-sm";
   
    return (
        <div className="p-6 bg-white rounded-lg">
            <h5 className="text-xl font-semibold mb-6 text-center">
                {cliente ? "Editar Cliente" : "Cadastrar Novo Cliente"}
            </h5>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                        <input id="nome" value={nome} onChange={e => setNome(e.target.value)} required className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="sobreNome" className="block text-sm font-medium text-gray-700">Sobrenome</label>
                        <input id="sobreNome" value={sobreNome} onChange={e => setSobreNome(e.target.value)} required className={inputClass} />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="ddd" className="block text-sm font-medium text-gray-700">DDD</label>
                        <input id="ddd" value={ddd} onChange={e => setDdd(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="numero" className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input id="numero" value={numero} onChange={e => setNumero(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="estado" className="block text-sm font-medium text-gray-700">Estado</label>
                        <input id="estado" value={estado} onChange={e => setEstado(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">Cidade</label>
                        <input id="cidade" value={cidade} onChange={e => setCidade(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">Bairro</label>
                        <input id="bairro" value={bairro} onChange={e => setBairro(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="rua" className="block text-sm font-medium text-gray-700">Rua</label>
                        <input id="rua" value={rua} onChange={e => setRua(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="numeroEndereco" className="block text-sm font-medium text-gray-700">Número</label>
                        <input id="numeroEndereco" value={numeroEndereco} onChange={e => setNumeroEndereco(e.target.value)} className={inputClass} />
                    </div>
                    <div>
                        <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700">CEP</label>
                        <input id="codigoPostal" value={codigoPostal} onChange={e => setCodigoPostal(e.target.value)} className={inputClass} />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="informacoesAdicionais" className="block text-sm font-medium text-gray-700">Informações Adicionais</label>
                        <input id="informacoesAdicionais" value={informacoesAdicionais} onChange={e => setInformacoesAdicionais(e.target.value)} className={inputClass} />
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <button type="button" onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow-md">
                        Cancelar
                    </button>
                    <button type="submit" className="bg-green-primary hover:bg-green-dark text-white font-bold py-2 px-4 rounded shadow-md">
                        Salvar
                    </button>
                </div>
                {erro && <div className="mt-4 text-red-600 text-center">{erro}</div>}
                {sucesso && <div className="mt-4 text-green-600 text-center">{sucesso}</div>}
            </form>
        </div>
    );
};

export default FormularioCadastro;