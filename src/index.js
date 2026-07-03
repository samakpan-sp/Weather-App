import { weather } from "./weatherRecords.js";
import "./style.css";

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  weather();
  form.reset();
});