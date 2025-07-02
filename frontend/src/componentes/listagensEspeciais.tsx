import React from "react";
import { ArrowLeftIcon, ListBulletIcon } from "@heroicons/react/24/solid"

type Props = {
    tema: string
    seletorView: (novaTela: string, evento: any) => void
}

const ListagensEspeciais: React.FC<Props> = ({ tema, seletorView }) => (
    <>
        <div className="flex w-full p-4 bg-[#dba2eb]">
            <button
                className="flex p-4 items-center text-xl hover:bg-purple-600 transition rounded-xl"
                onClick={(e) => seletorView('Home', e)}
            >
                <ArrowLeftIcon className="h-5 w-5" />
                Voltar
            </button>
        </div>
        <div className="w-full flex justify-center bg-[#dba2eb]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-4xl p-4">
                <button className="flex flex-col justify-center items-center px-4 py-2 rounded h-52 w-full hover:bg-purple-600 transition bg-[#b358e8]">
                    <ListBulletIcon className="h-16 w-16 mb-4" />
                    Listagem de mais consumidos
                </button>
                <button className="flex flex-col justify-center items-center px-4 py-2 rounded h-52 w-full hover:bg-purple-600 transition bg-[#b358e8]">
                    <ListBulletIcon className="h-16 w-16 mb-4" />
                    Listagem de mais consumidos por genero
                </button>
            </div>
        </div>
    </>
);

export default ListagensEspeciais;