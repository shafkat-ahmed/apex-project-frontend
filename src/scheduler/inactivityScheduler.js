import Swal from "sweetalert2";
import { logout } from "../store/actions/authAction";

let inactivityTimer = null;
let inactivityWarningTimer = null;
let inactivityWarning = 14 * 60 * 1000;
let inactivityLimit = 15 * 60 * 1000;

export const startInactivityWatcher = (store) => {
  const resetTimer = () => {
    console.log("User activity detected — resetting inactivity timer");
    clearTimeout(inactivityTimer);
    clearTimeout(inactivityWarningTimer);

    inactivityWarningTimer = setTimeout(() => {
      if (localStorage.getItem("accessToken")) {
        Swal.fire({
          title: "Inactivity Warning!",
          text: "Stay Logged In?",
          icon: "info",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            resetTimer();
          }
        });
      }
    }, inactivityWarning);

    inactivityTimer = setTimeout(() => {
      console.log("15 minutes of inactivity — force logout");
      Swal.fire(
        "Logged Out",
        "You have been logged out due to inactivity.",
        "info"
      );
      store.dispatch(logout());
    }, inactivityLimit);
  };

  const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];

  events.forEach((event) => {
    window.addEventListener(event, resetTimer);
  });

  resetTimer();
};

export const stopInactivityWatcher = () => {
  console.log("Stopping inactivity watcher");
  inactivityTimer && clearTimeout(inactivityTimer);
  inactivityWarningTimer && clearTimeout(inactivityWarningTimer);
};
