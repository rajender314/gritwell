import Validations from '../../../core/validations/validations'

export const messages = {
    password: {
        required: "Please enter password",
        min: "Min 8 chars are required",
        isDaynamic: () => console.log("")
    },
    confirmPassword: {
        required: "Please enter confirm password"

    }
}
export const RecoverySchema = Validations({
    password: 'required|password|isDaynamic:dynamicFunction',
    confirmPassword: 'required|confirmpassword|isDaynamic:dynamicFunction'
    // password: 'required|min:8|isDaynamic'
}, messages);