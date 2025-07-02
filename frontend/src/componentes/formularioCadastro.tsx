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
            if (cliente && cliente.id) {
                const clienteData = {
                    id: cliente.id, 
                    nome,
                    sobreNome,
                    email,
                    endereco: { estado, cidade, bairro, rua, numero: numeroEndereco, codigoPostal, informacoesAdicionais },
                    telefones: ddd && numero ? [{ ddd, numero }] : []
                };
             
                await atualizarCliente(clienteData);
                setSucesso("Cliente atualizado com sucesso!");

            } else {
                
                const clienteData = {
                    nome,
                    sobreNome,
                    email,
                    endereco: { estado, cidade, bairro, rua, numero: numeroEndereco, codigoPostal, informacoesAdicionais },
                    telefones: ddd && numero ? [{ ddd, numero }] : []
                };
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

   
    return (
        <div className="flex justify-center p-4">
            <form className="w-full" onSubmit={handleSubmit}>
                <h5 className="text-center text-lg font-semibold mb-4">
                    {cliente ? "Editar Cliente" : "Cadastrar Novo Cliente"}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <input value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" required className="input-field" />
                    <input value={sobreNome} onChange={e => setSobreNome(e.target.value)} placeholder="Sobrenome" required className="input-field" />
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" className="input-field" />
                    <input value={ddd} onChange={e => setDdd(e.target.value)} placeholder="DDD" className="input-field" />
                    <input value={numero} onChange={e => setNumero(e.target.value)} placeholder="Número Telefone" className="input-field" />
                    <input value={estado} onChange={e => setEstado(e.target.value)} placeholder="Estado" className="input-field" />
                    <input value={cidade} onChange={e => setCidade(e.target.value)} placeholder="Cidade" className="input-field" />
                    <input value={bairro} onChange={e => setBairro(e.target.value)} placeholder="Bairro" className="input-field" />
                    <input value={rua} onChange={e => setRua(e.target.value)} placeholder="Rua" className="input-field" />
                    <input value={numeroEndereco} onChange={e => setNumeroEndereco(e.target.value)} placeholder="Nº Endereço" className="input-field" />
                    <input value={codigoPostal} onChange={e => setCodigoPostal(e.target.value)} placeholder="CEP" className="input-field" />
                    <input value={informacoesAdicionais} onChange={e => setInformacoesAdicionais(e.target.value)} placeholder="Info Adicionais" className="input-field" />
                </div>
                <div className="flex justify-end gap-4">
                    <button type="button" onClick={onClose} className="btn waves-effect waves-light grey">
                        Cancelar
                    </button>
                    <button type="submit" className="btn waves-effect waves-light blue">
                        Salvar
                    </button>
                </div>
                {erro && <div className="text-red-500 pt-2">{erro}</div>}
                {sucesso && <div className="text-green-600 pt-2">{sucesso}</div>}
            </form>
        </div>
    );
};

export default FormularioCadastro;