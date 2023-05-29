import React, { useState } from "react";
import "./modal.css"

export function useModal(): [React.ReactNode, React.Dispatch<React.SetStateAction<React.ReactNode>>, React.Dispatch<React.SetStateAction<boolean>>] {
    const [active, setActive] = useState(false)
    const [content, setContent] = useState<React.ReactNode>(null)

    const modal = (
        <div
            className={active ? "modal" : "modal modal_is-hidden"}
            onClick={() => { setActive(false) }}
        >
            <div
                className="modal__content"
                onClick={(e) => e.stopPropagation()}
            >
                {content}
            </div>
        </div>
    )

    return [modal, setContent, setActive]
}