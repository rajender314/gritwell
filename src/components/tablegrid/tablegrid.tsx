import { Fragment } from 'react'
import React from 'react';
type Props = {

    onClick?: (e: any) => void
    children: any,

}

export default function TableGrid({ children }: Props) {
    function handleSubmit(e: any) {
    }
    return (
        <Fragment>
            <div onClick={() => handleSubmit(children)} className="h-100">{children}</div>
        </Fragment>
    )
}