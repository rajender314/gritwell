import Validations from '../../../core/validations/validations'

export const messages = {
    email: {
        required: "Please enter email address",
        email: "Please enter valid email address",
        // isDaynamic: "Daynamic msg"
    },
    password: {
        required: "Please enter password",
        // isDaynamic: "Daynamic msg"
    }
}
export const signInSchema = Validations({
    email: 'required|email',
    password: 'required|isDaynamic:dynamicFunction'
    // password: 'required|min:8|isDaynamic'
}, messages);