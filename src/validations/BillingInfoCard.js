import * as yup from 'yup';

const BillingInfoCard = yup.object().shape({
    holder_name: yup.string().required("Field is required"),
    card_no: yup.string().required("Field is required").min(13).max(19),
    cvc: yup.string().required("Field is required").min(3).max(4),
    expiry_month: yup.string().required("Field is required").min(1).max(2),
    expiry_year: yup.string().required("Field is required").min(2).max(2),
    address: yup.string().required("Field is required"),
    country: yup.string().required("Field is required"),
    city: yup.string().required("Field is required"),
    state: yup.string().required("Field is required"),
    zip_code: yup.string().required("Field is required"),
    street: yup.string().required("Field is required"),
});

export default BillingInfoCard;