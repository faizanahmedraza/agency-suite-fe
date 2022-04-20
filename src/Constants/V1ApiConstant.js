const V1 = {
  auth: {
    register: 'v1/auth/agencies/register',
    customer_register: 'v1/auth/customers/register',
    login: "v1/auth/login",
    verification: "v1/auth/verify-token",
    forgot_password: "v1/auth/forget-password",
  },
  service: {
    create: "v1/agencies/services",
    read: "v1/agencies/services",
    update: "v1/agencies/services",
    delete: "v1/agencies/services",
    change_status: "v1/agencies/services/change-status/{id}",
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
    profile_settings: "v1/agencies/profile",
  },
  tag: {
    tags: "v1/admin/blog/tags",
  },
  blog: {
    blogs: "v1/admin/blog/posts",
  },
  changePassword: "v1/admin/change-password",
  roles: "v1/admin/roles",
  guest: {
    posts: "v1/guest/blog/posts",
    tags: "v1/guest/blog/tags",
  },
  // DOMAIN: window.location.hostname,
  DOMAIN: 'fahadagency.allthingswordpress.io',
};

export default V1;
