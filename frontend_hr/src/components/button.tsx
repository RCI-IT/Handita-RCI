'use client'
import { buttonType } from "@/types/buttonType"

export default function Button({ title, click, className, disable }: buttonType) {
    return (
        <button 
            className={`w-28 rounded-md text-white p-2 flex items-center justify-center text-center space-x-2 relative ${className}`}
            onClick={click}
            disabled={disable}
        >
            {/* <Icon className="font-[2000] text-xl text-white " /> */}
            {title}
        </button>
    )
}
