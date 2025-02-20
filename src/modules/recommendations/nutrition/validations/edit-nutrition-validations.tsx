import Validations from '../../../../core/validations/validations'

export const messages = {
	name: {
		required: "Please enter name",
	},
	description: {
		required: "Please enter description",
	},

}
export const recommendationSchema = Validations({
	name: 'required',
	description: 'required',
}, messages);