import { populateHome } from "./pages/home.js";

export function populate(page) {
  if (page === "home") {
    populateHome();
  }
}
