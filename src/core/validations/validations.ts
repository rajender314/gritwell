import * as yup from 'yup';

/**
     * Return the yup validate schema.
  * @param rules List of ruels object to generate the validation schema.
  * @param rulesMessage List of ruels custom messages object to display as error message.
  */

const Validations = (rules: object, rulesMessage: any) => {
  const yupRules = {};

  for (const [key, value] of Object.entries(rules)) {
    let validator = generateRules(value, rulesMessage[key] ? rulesMessage[key] : {});
    Object.assign(yupRules, {
      [key]: validator,
    });
  }
  let schema = yup.object().shape(yupRules);
  // console.log(schema)
  return schema;
}


function generateRules(rule: string, rulesMessage: any) {
  let yupValidator = yup;

  let yupValidate: any;
  const subRules = rule.includes("|")
    ? rule.split("|")
    : rule.includes("required")
      ? ["required"]
      : [rule];
  subRules.forEach((subRule) => {
    if (subRule === "required") {
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.string().trim().required(rulesMessage[subRule])
          : yupValidate.concat(yupValidator.string().trim().required(rulesMessage[subRule]));
    } else if (subRule === "string") {
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.string()
          : yupValidate.concat(yupValidator.string());
    } else if (subRule === "object") {
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.object()
          : yupValidate.concat(yupValidator.object());
    } else if (subRule.startsWith("min") || subRule.startsWith("max")) {
      const [ruleType, length] = subRule.split(":");
      if (ruleType === "min") {
        yupValidate =
          typeof yupValidate != "object"
            ? yupValidator.string().min(Number(length), rulesMessage[ruleType])
            : yupValidate.concat(yupValidator.string().min(Number(length), rulesMessage[ruleType]));
      } else if (ruleType === "max") {
        yupValidate =
          typeof yupValidate != "object"
            ? yupValidator.string().max(Number(length), rulesMessage[ruleType])
            : yupValidate.concat(yupValidator.string().max(Number(length), rulesMessage[ruleType]));
      }
    } else if (subRule === "email") {
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.string().trim().email(rulesMessage[subRule])
          : yupValidate.concat(yupValidator.string().trim().email(rulesMessage[subRule]));
    } else if (subRule === "url") {
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.string().url(rulesMessage[subRule])
          : yupValidate.concat(yupValidator.string().url(rulesMessage[subRule]));
    } else if (subRule === "alphabets") {
      let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Only alphabet charectors allowed.';
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.string().matches(/^[a-zA-Z ]*$/, emsg)
          : yupValidate.concat(yupValidator.string().matches(/^[a-zA-Z ]*$/, emsg));
    } else if (subRule === "alphanumwithspace") {
      let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Only aplphanumeric and space charectors allowed.';
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.string().matches(/^[a-zA-Z0-9 _]*[a-zA-Z0-9][a-zA-Z0-9 _]*$/, emsg)
          : yupValidate.concat(yupValidator.string().matches(/^[a-zA-Z0-9 _]*[a-zA-Z0-9][a-zA-Z0-9 _]*$/, emsg));
    } else if (subRule === "password") {
      let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Password should satisfy below conditions';
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, emsg)
          : yupValidate.concat(yupValidator.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, emsg))
    }
    else if (subRule === "dropdown") {
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.object().required(rulesMessage[subRule])
          : yupValidate.concat(yupValidator.string().required(rulesMessage[subRule]));
    }
    else if (subRule === "multiselect") {
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.array().required(rulesMessage[subRule])
          : yupValidate.concat(yupValidator.string().required(rulesMessage[subRule]));
    }
    else if (subRule === "confirmpassword") {
      let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'The password does not match new password.Try again.';
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.string().oneOf([yupValidator.ref("password"), null], emsg)
          : yupValidate.concat(yupValidator.string().oneOf([yup.ref('password'), null], emsg));
    }
    else if (subRule === "name") {
      let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Name should contain atleast one character.';
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.string().matches(/^[a-zA-Z ]*$/, emsg)
          : yupValidate.concat(yupValidator.string().matches(/^[a-zA-Z ]*$/, emsg));
    }
    // else if (subRule === "parenthesis") {
    //   let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Name shouldnot contain these symbols.';
    //   yupValidate =
    //     typeof yupValidate != "object"
    //       ? yupValidator.string().matches(/^[^<>;]+$/, emsg)
    //       : yupValidate.concat(yupValidator.string().matches(/^[^<>;]+$/, emsg));
    // }
    else if (subRule === "phone") {
      let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Phonenumber error';
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.string().matches(/^[0-9-+()]*$/, emsg)
          : yupValidate.concat(yupValidator.string().matches(/^[0-9-+()]*$/, emsg));
    }
    else if (subRule === "zoomlink") {
      let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Enter valid zoom booking link';
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.string().matches(/[(http(s)?):\/\/(www)?a-zA-Z0-9@:%._~#=]{2,256}[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)?/gi, emsg)
          : yupValidate.concat(yupValidator.string().matches(/[(http(s)?):\/\/(www)?a-zA-Z0-9@:%._~#=]{2,256}[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)?/gi, emsg));
    }
    else if (subRule === "height") {
      let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Enter valid values';
      yupValidate =
        typeof yupValidate != "object"
          ? yupValidator.string().matches(/^([a-zA-Z0-9'"-.]+\s?)*$/gi, emsg)
          : yupValidate.concat(yupValidator.string().matches(/^([a-zA-Z0-9'"-.]+\s?)*$/gi, emsg));
    }
	else if (subRule === "link") {
		let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Enter valid link';
		yupValidate =
		  typeof yupValidate != "object"
			? yupValidator.string().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, emsg)
			: yupValidate.concat(yupValidator.string().matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, emsg));
	  }
    else if (subRule.startsWith("isDaynamic")) {
      const [ruleType, callBack] = subRule.split(":");
      if (ruleType == 'isDaynamic') {
        let emsg = (rulesMessage[subRule]) ? rulesMessage[subRule] : 'Enter valid data';
        yupValidate = typeof yupValidate != "object"
          ? yupValidator.string().test(
            "isDaynamic",
            emsg,
            async value => await dynamicMethod(value, callBack)
          )
          : yupValidate.concat(yup.string().test(
            "isDaynamic",
            emsg,
            async value => await dynamicMethod(value, callBack)
          ));
      }
    }
  });
  return yupValidate;
}

/**
  * Split a string into substrings using the specified separator and return them as an array.
  * @param value value that can be used to validate.
  * @param callBack A callback function should be defined here.
  */
function dynamicMethod(value: any, callBack: string) {
  if (callBack == 'validateUser') {
    return validateUser(value);
  }

  return true;
}


function validateUser(value: any) {
  return true;
}


export default Validations;
