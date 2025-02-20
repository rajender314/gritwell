export type objectProps = {
    label?: string,
    value?: string,
    _id?: string
}

export type AdduserProps = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    status: objectProps,
    roleName: objectProps,
    zoom_link: string,
    qualifications: string,
    background: string,
    allocation: string,
    experience: objectProps,
    profile_pic: string,
    day_of_the_week: objectProps,
    time_zone: objectProps
}

// {
//     "firstName": "Ganeshe",
//     "lastName": "enterpi",
//     "email": "k.sivaganesh@enterpi.com",
//     "phone": "98745698744",
//     "status": {
//         "label": "Active",
//         "value": true
//     },
//     "roleName": {
//         "value": "61eeb99d9ba53455ee5fefdf",
//         "label": "MD"
//     },
//     "zoom_link": "",
//     "qualifications": "Degree tec",
//     "background": "Dev1",
//     "allocation": 5,
//     "experience": {
//         "_id": "",
//         "label": "",
//         "name": ""
//     },
//     "profile_pic": "",
//     "day_of_the_week": {
//         "value": "6214dce5f239e82c5e3adc88",
//         "label": "Wednesday"
//     },
//     "time_zone": {
//         "code": "",
//         "gmt_offset": "",
//         "label": "",
//         "name": "",
//         "_id": "",
//         "utc_offset": "",
//         "value": ""
//     }
// }