import Validations from '../../../core/validations/validations'

export const messages = {
    firstName: {
        required: "Please enter first name",
        name: "First name should contain atleast one character"
    },
    lastName: {
        required: "Please enter last name",
        name: "Last name should contain atleast one character"
    },
    email: {
        required: "Please enter email address",
        email: "Please enter valid email address",
        // isDaynamic: "Daynamic msg"
    },
    phone: {
        required: "Please enter phone number",
        max: "Please enter 15 digit phone number",
        min: "Please enter atleast 10 digit phone number"
    },
    status: {
        dropdown: "Please select status"
    }
}
export const customerProfileSchema = Validations({
    firstName: 'required|name',
    lastName: 'required|name',
    email: 'required|email',
    phone: 'required|min:10|max:15',
    status: 'dropdown',
}, messages);