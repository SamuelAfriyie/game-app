export const APIResponse = {
  init: (o: any): Response => {
    return new Response(JSON.stringify(o), {
      headers: {
        "content-type": "application/json",
      },
    });
  },

  success(data: any) {
    return APIResponse.init({ data, status: 200, message: "Success" });
  },

  created(data: any) {
    return APIResponse.init({ data, status: 201, message: "Resource created" });
  },

  updated(data: any) {
    return APIResponse.init({ data, status: 200, message: "Resource updated" });
  },

  notFound() {
    return APIResponse.init({ status: 404, message: "Method Not Found" });
  },

  notAllowed() {
    return APIResponse.init({ status: 405, message: "Method Not Allowed" });
  },

  unauthorized() {
    return APIResponse.init({ status: 401, message: "Unauthorized" });
  },

  badRequest() {
    return APIResponse.init({ status: 400, message: "Bad Request" });
  },
  serverError() {
    return APIResponse.init({ status: 500, message: "Server Error" });
  },

  validationError(errors: any) {
    return APIResponse.init({
      status: 422,
      message: "Validation Error",
      errors,
    });
  },
};
