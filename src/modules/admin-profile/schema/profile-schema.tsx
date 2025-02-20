
export type objectProps = {
    label?: string,
    value?: string,
    _id?: string
}

export type handleSubmitFunProps = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    status: objectProps,
    zoom_link: string,
    experience: string,
    allocation: string | null,
    time_zone: objectProps,
    background: string,
    qualifications: string,
    day_of_the_week: objectProps
}
