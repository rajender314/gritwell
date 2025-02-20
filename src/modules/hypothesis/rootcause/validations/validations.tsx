import Validations from '../../../../core/validations/validations'

export const messages = {
	name: {
		required: "Please enter name",
	},

}
export const hypothesisSchema = Validations({
	name: 'required',
}, messages);