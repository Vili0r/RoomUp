import * as yup from "yup";

const virtualTourSchema = (t) => {
    const { firstNameRequired, firstNameMax, emailType, emailRequired } = t(
        "validation.register.stepOne"
    );

    const { descriptionMin, descriptionMax, descriptionRequired } =
        t("validation.stepSix");

    const {
        telephoneMin,
        telephoneMax,
        telephoneMaxMatches,
        telephoneRequired,
    } = t("validation.stepFour");

    return yup.object().shape({
        contact_name: yup
            .string()
            .max(255, firstNameMax)
            .required(firstNameRequired),
        email: yup.string().email(emailType).required(emailRequired),
        contact_number: yup
            .string()
            .min(8, telephoneMin)
            .max(15, telephoneMax)
            .matches(/^\d+$/, telephoneMaxMatches)
            .required(telephoneRequired),
        details: yup
            .string()
            .min(10, descriptionMin)
            .max(200, descriptionMax)
            .required(descriptionRequired),
    });
};

export default virtualTourSchema;
