import React, { useState } from "react";
import Modal from "./Modal";
import { ArrowLeftIcon, ArrowRightIcon, ScissorsIcon, ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { cadastrarCliente } from "../api/clientes";

type Props = {
    tema: string,
    seletorView: (novaTela: string, evento: any) => void
}

function CadastroClienteModal({ onClose }: { onClose: () => void }) {
    const [etapa, setEtapa] = useState(1);
    const [nome, setNome] = useState("");
    const [sobreNome, setSobreNome] = useState("");
    const [email, setEmail] = useState("");
    const [ddd, setDdd] = useState("");
    const [numero, setNumero] = useState("");
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    const [estado, setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [numeroEndereco, setNumeroEndereco] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [informacoesAdicionais, setInformacoesAdicionais] = useState("");

        const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro("");
        setSucesso("");
        
        if (!nome.trim() || !sobreNome.trim()) {
            setErro("Nome e Sobrenome são obrigatórios.");
            return;
        }
        try {
            await cadastrarCliente({
                nome,
                sobreNome,
                email,
                telefones: ddd && numero ? [{ ddd, numero }] : [],
                endereco: {
                    estado,
                    cidade,
                    bairro,
                    rua,
                    numero: numeroEndereco,
                    codigoPostal,
                    informacoesAdicionais
                }
            });
            setSucesso("Cliente cadastrado com sucesso!");
            setNome(""); setSobreNome(""); setEmail(""); setDdd(""); setNumero("");
            setEstado(""); setCidade(""); setBairro(""); setRua(""); setNumeroEndereco(""); setCodigoPostal(""); setInformacoesAdicionais("");
            setTimeout(() => {
                setSucesso("");
                onClose();
            }, 1200);
        } catch (err) {
            setErro("Erro ao cadastrar cliente");
        }
    };

    return (
        <div className="flex justify-center p-4 sm:p-0 sm:mb-0">
            <form className="w-full sm:p-8 rounded shadow mx-2" onSubmit={handleSubmit}>                {etapa === 1 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nome">
                                    Nome <span className="text-red-600">*</span>
                                </label>
                                <input value={nome} onChange={e => setNome(e.target.value)} required className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="nome" type="text" />
                            </div>
                            <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="sobrenome">
                                    Sobrenome <span className="text-red-600">*</span>
                                </label>
                                <input value={sobreNome} onChange={e => setSobreNome(e.target.value)} required className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="sobrenome" type="text" />
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1/3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="ddd">
                                        DDD
                                    </label>
                                    <input value={ddd} onChange={e => setDdd(e.target.value)} className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="ddd" type="text" maxLength={3} />
                                </div>
                                <div className="w-2/3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numero">
                                        Número
                                    </label>
                                    <input value={numero} onChange={e => setNumero(e.target.value)} className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="numero" type="text" maxLength={9} />
                                </div>
                            </div>
                            <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                                    E-mail
                                </label>
                                <input value={email} onChange={e => setEmail(e.target.value)} className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="email" type="email" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => setEtapa(2)}
                            >
                                Avançar
                                <ArrowRightIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </>
                )}
                {etapa === 2 && (
                    <>
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            <div className="flex gap-2">
                                <div className="w-1/2">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="estado">
                                        Estado
                                    </label>
                                    <input value={estado} onChange={e => setEstado(e.target.value)} className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="estado" type="text" />
                                </div>
                                <div className="w-1/2">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cidade">
                                        Cidade
                                    </label>
                                    <input value={cidade} onChange={e => setCidade(e.target.value)} className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="cidade" type="text" />
                                </div>
                            </div>
                            <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="bairro">
                                    Bairro
                                </label>
                                <input value={bairro} onChange={e => setBairro(e.target.value)} className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="bairro" type="text" />
                            </div>
                            <div className="flex gap-2">
                                <div className="w-2/3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="rua">
                                        Rua
                                    </label>
                                    <input value={rua} onChange={e => setRua(e.target.value)} className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="rua" type="text" />
                                </div>
                                <div className="w-1/3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="numeroEndereco">
                                        Número
                                    </label>
                                    <input value={numeroEndereco} onChange={e => setNumeroEndereco(e.target.value)} className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="numeroEndereco" type="text" />
                                </div>
                            </div>
                            <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="codigoPostal">
                                    Código Postal
                                </label>
                                <input value={codigoPostal} onChange={e => setCodigoPostal(e.target.value)} className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="codigoPostal" type="text" />
                            </div>
                            <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="informacoesAdicionais">
                                    Informações Adicionais
                                </label>
                                <input value={informacoesAdicionais} onChange={e => setInformacoesAdicionais(e.target.value)} className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="informacoesAdicionais" type="text" />
                            </div>
                        </div>
                        <div className="flex justify-between gap-4">
                            <button
                                type="button"
                                className="flex items-center bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={() => setEtapa(1)}
                            >
                                <ArrowLeftIcon className="h-5 w-5" />
                                Voltar
                            </button>
                            <button
                                type="submit"
                                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Finalizar Cadastro
                            </button>
                        </div>
                        {erro && <div className="text-red-500 pt-2 -mb-8">{erro}</div>}
                        {sucesso && <div className="text-green-600 pt-2 -mb-8">{sucesso}</div>}
                    </>
                )}
            </form>
        </div>
    );
}

const FormularioCadastro: React.FC<Props> = ({ tema, seletorView }) => {
    const [modalAberto, setModalAberto] = useState(false);
    const [modalConteudo, setModalConteudo] = useState<React.ReactNode>(null);

    const abrirModal = (conteudo: React.ReactNode) => {
        setModalAberto(true);
        setModalConteudo(conteudo);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setModalConteudo(null);
    };

    return (
        <>
            <h5 className="text-center text-lg md:text-2xl lg:text-3xl font-semibold p-4 md:p-6 pt-8 md:pt-12 bg-gradient-to-r from-pink-400 to-purple-500 text-white">
                Bem-vindo ao cadastro do <span className="ml-2 font-bold italic">Grupo World Beauty</span>
            </h5>
            <div className="w-full flex justify-center bg-[#dba2eb]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full max-w-6xl p-4">
                    <button
                        className="flex flex-col justify-center items-center px-4 py-2 rounded h-52 w-full hover:bg-purple-600 transition bg-[#d07af0]"
                        onClick={() =>
                            abrirModal(<CadastroClienteModal onClose={fecharModal} />)
                        }
                    >
                        <UserCircleIcon className="h-16 w-16 mb-4" />
                        Cadastro Cliente
                    </button>
                    <button
                        className="flex flex-col justify-center items-center px-4 py-2 rounded h-52 w-full hover:bg-purple-600 transition bg-[#c35de8]"
                        onClick={() =>
                            abrirModal(
                                <div className="flex justify-center p-8">
                                    <form className="w-full max-w-lg bg-white p-8 rounded shadow">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first_name">
                                                    Nome
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="first_name" type="text" />
                                            </div>
                                            <div className="w-full md:w-1/2 px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last_name">
                                                    Valor
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none" id="last_name" type="text" />
                                            </div>
                                        </div>                                    
                                        <div className="flex items-center justify-between">
                                            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                Finalizar Cadastro
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    >
                        <ShoppingBagIcon className="h-16 w-16 mb-4" />
                        Cadastro Produto
                    </button>
                    <button
                        className="flex flex-col justify-center items-center px-4 py-2 rounded h-52 w-full hover:bg-purple-600 transition bg-[#c35de8]"
                        onClick={() =>
                            abrirModal(
                                <div className="flex justify-center p-8">
                                    <form className="w-full max-w-lg bg-white p-8 rounded shadow">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first_name">
                                                    Nome
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="first_name" type="text" />
                                            </div>
                                            <div className="w-full md:w-1/2 px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last_name">
                                                    Valor
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-400 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none" id="last_name" type="text" />
                                            </div>
                                        </div>                                    
                                        <div className="flex items-center justify-between">
                                            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                                                Finalizar Cadastro
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )
                        }
                    >
                        <ScissorsIcon className="h-16 w-16 mb-4" />
                        Cadastro Serviços
                    </button>
                </div>
            </div>
            <Modal isOpen={modalAberto} onClose={fecharModal}>
                {modalConteudo}
            </Modal>
        </>
    );
};

export default FormularioCadastro;