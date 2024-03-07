import * as yup from "yup";
import moment from "moment";

const stepOneSchema = (t) => {
    const {
        firstNameRequired,
        firstNameMax,
        lastNameRequired,
        lastNameMax,
        emailType,
        emailRequired,
        passwordMin,
        passwordMatches,
        passwordMax,
        passwordRequired,
        passwordConfirmationRequired,
        passwordConfirmationOneOf,
    } = t("validation.register.stepOne");

    return yup.object().shape({
        first_name: yup
            .string()
            .max(255, firstNameMax)
            .required(firstNameRequired),
        last_name: yup
            .string()
            .max(255, lastNameMax)
            .required(lastNameRequired),
        email: yup.string().email(emailType).required(emailRequired),
        password: yup
            .string()
            .min(8, passwordMin)
            .max(20, passwordMax)
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                passwordMatches
            )
            .required(passwordRequired),
        password_confirmation: yup
            .string()
            .oneOf([yup.ref("password"), null], passwordConfirmationOneOf)
            .required(passwordConfirmationRequired),
    });
};

const stepTwoSchema = (t) => {
    const {
        DOBRequired,
        DOBAboveEighteen,
        genderRequired,
        lookingForRequired,
    } = t("validation.register.stepTwo");

    return yup.object().shape({
        birthdate: yup
            .string()
            .required(DOBRequired)
            .test(
                "birthdate",
                DOBAboveEighteen,
                (date) => moment().diff(moment(date), "years") >= 18
            ),
        gender: yup.string().required(genderRequired),
        looking_for: yup.string().required(lookingForRequired),
    });
};

export { stepOneSchema, stepTwoSchema };
