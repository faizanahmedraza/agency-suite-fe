const V1 = {
  auth: {
    register: 'v1/auth/agencies/register',
    customer_register: 'v1/auth/customers/register',
    login: "v1/auth/login",
    verification: "v1/auth/verify-token",
    forgot_password: "v1/auth/forget-password",
    launch: "v1/public/domain-launch"
  },
  service: {
    create: "v1/agencies/services",
    read: "v1/agencies/services",
    update: "v1/agencies/services",
    delete: "v1/agencies/services",
    change_status: "v1/agencies/services/change-status",
    change_catalog_status: "v1/agencies/services/change-catalog-status",
  },
  dashboard: {
    dashboards: "v1/admin/dashboard",
  },
  permissions: "v1/admin/permissions",
  user: {
    users: "v1/admin/users",
  },
  agency: {
    customers: "v1/agencies/customers",
    change_customer_status: "v1/agencies/customers/change-status",
    portal_settings: {
      get: "v1/public/portal-settings",
      put: "v1/agencies/portal-settings",
    },
    profile_settings: "v1/profile",
    service_request: "v1/agencies/request-services",
    invoices: "v1/agencies/invoices"
  },
  customer: {
    services: "v1/customers/services",
    billing_information: "v1/customers/billing-information",
    service_request: "v1/customers/request-services",
    invoices: "v1/customers/invoices",
    invoice_paid: "v1/customers/invoices/invoice-paid",
    payments: {}
  },
  change_auth_password: "v1/change-password",
  // DOMAIN: window.location.hostname
  DOMAIN: 'irfanagency1.allthingswordpress.io',
};

export default V1;
