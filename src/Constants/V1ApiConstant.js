const V1 = {
  auth: {
    register: 'v1/agencies/auth/register',
    login: "v1/agencies/auth/login",
    verification: "v1/agencies/auth/verify-token"
  },
  service: {
    create: "v1/agencies/services",
    read: "v1/agencies/services",
    update: "v1/agencies/services/{id}",
    delete: "v1/agencies/services/{id}"
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
