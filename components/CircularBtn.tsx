'use client'
import { IoClose, IoAdd } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";

interface Props {
    mode: 'add' | 'remove'
    onClick?: () => void
}

const CircularBtn = ({ mode, onClick }: Props) => {
    return (
        <div
            onClick={onClick}
            className=" border border-[#d3d3d3] bg-white p-1 rounded-full hover:bg-slate-200 duration-100">
            {mode === 'add' ? <IoMdAdd size={20} /> : <IoClose size={20} />}
        </div>
    )
}
export default CircularBtn;