import Validations from '../../../../core/validations/validations'

export const messages = {
	testname: {
		required: "Please enter name",
	},
	description: {
		required: "Please enter description",
	},
	price: {
		required: "Please enter price",
	},
	link: {
		link: "Please enter proper link"
	}

}
export const recommendationSchema = Validations({
	testname: 'required',
	description: 'required',
	price: 'required',
	link: 'link'
}, messages);