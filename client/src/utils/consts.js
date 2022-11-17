export const API_URL = "http://juliyastudio";
// export const API_URL = "https://studio.kutovaya.ru";
// export const API_URL = "http://tyusha.beget.tech";
// export const API_URL = process.env.REACT_APP_API;

export const LOGIN_ROUTE = "/login";
export const REGISTRATION_ROUTE = "/registration";
export const SHOP_ROUTE = "/";
export const WORKSHOP_ROUTE = "/workshop";

export const categories = [
  { value: 0, label: "Заказы" },
  { value: 1, label: "Золото" },
  { value: 2, label: "Изделия" },
  { value: 3, label: "Проекты" }
];

export const status = [
  { value: 0, label: "Rhino", rate: 0, color: "#ecc4c4" },
  { value: 1, label: "На резке", rate: 0, color: "#bfd7ff" },
  { value: 2, label: "В металле", rate: 0, color: "#8d9ab9" },
  { value: 3, label: "Отменен", rate: 2, color: "#bcbcc8" },
  { value: 4, label: "Завершен", rate: 1, color: "#bbdb9b" }
];

