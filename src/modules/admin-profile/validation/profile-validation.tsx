import Validations from '../../../core/validations/validations'

export const messages = {
    firstName: {
        required: "Please enter first name",
        name: "First name must contain only alphabets"
    },
    lastName: {
        required: "Please enter last name",
        name: "Last name must contain only alphabets"
    },
    email: {
        required: "Please enter email address",
        email: "Please enter valid email address",
        // isDaynamic: "Daynamic msg"
    },
    phone: {
        required: "Please enter phone number",
        max: "Please enter 15 digit phone number",
        min: "Please enter atleast 10 digit phone number",
        phone: "Please enter a valid mobile number"
    },
    status: {
        dropdown: "Please select status"
    },
    zoom_link: {
        zoomlink: "Please enter a valid URL"
    },
}
export const profileSchema = Validations({
    firstName: 'required|name',
    lastName: 'required|name',
    email: 'required|email',
    phone: 'required|phone|min:10|max:15',
    status: 'dropdown',
    zoom_link: 'zoomlink'
}, messages);