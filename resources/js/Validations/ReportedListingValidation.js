import * as yup from "yup";

const reportedListingSchema = (t) => {
    const { firstNameRequired, firstNameMax, emailType, emailRequired } = t(
        "validation.register.stepOne"
    );

    const { descriptionMin, descriptionMax, descriptionRequired } =
        t("validation.stepSix");
    const { reasonRequired } = t("validation.reportedListing");

    return yup.object().shape({
        contact_name: yup
            .string()
            .max(255, firstNameMax)
            .required(firstNameRequired),
        email: yup.string().email(emailType).required(emailRequired),
        reason: yup.string().required(reasonRequired),
        details: yup
            .string()
            .min(10, descriptionMin)
            .max(200, descriptionMax)
            .required(descriptionRequired),
    });
};

export default reportedListingSchema;
