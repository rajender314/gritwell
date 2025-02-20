import Validations from '../../../core/validations/validations'

export const messages = {
    email: {
        required: "Please enter email address",
        email: "Please enter valid email address",
        // isDaynamic: "Daynamic msg"
    }
}
export const ForgotSchema = Validations({
    email: 'required|email',
    // password: 'required|min:8|isDaynamic'
}, messages);