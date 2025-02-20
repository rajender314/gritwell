import Validations from '../../../core/validations/validations'

export const messages = {
    oldpassword: {
        required: "Please enter old password",
        // isDaynamic: "Daynamic msg"
    },
    password: {
        required: "Please enter new password",
        password: '',
        min: "Min 8 chars are required",
        isDaynamic: () => console.log("")
    },
    confirmPassword: {
        required: "Please enter confirm password"

    }
}
export const ForgotSchema = Validations({
    oldpassword: 'required',
    password: 'required|password|isDaynamic:dynamicFunction',
    confirmPassword: 'required|confirmpassword|isDaynamic:dynamicFunction'

    // password: 'required|min:8|isDaynamic'
}, messages);


