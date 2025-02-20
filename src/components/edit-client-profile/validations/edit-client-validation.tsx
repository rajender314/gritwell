import Validations from '../../../core/validations/validations'

export const messages = {
    firstName: {
        required: "Please enter first name",
        name: "First name must contain only alphabets",
    },
    lastName: {
        required: "Please enter last name",
        name: "Last name must contain only alphabets",
    },
    phone: {
        required: "Please enter phone number",
        max: "Please enter 15 digit phone number",
        min: "Please enter atleast 10 digit phone number",
        phone: "Please enter a valid mobile number"
    },
    height: {
        height: "Please enter height"
    },
    weight: {
        height: "Please enter weight"
    },
}
export const editClientProfileSchema = Validations({
    firstName: 'required|name',
    lastName: 'required|name',
    phone: 'required|phone|min:10|max:15',
    // ethnicity: 'required',
    height: 'height',
    weight: 'height'

}, messages);