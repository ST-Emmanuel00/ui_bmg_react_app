import { toast, Bounce, Slide, Zoom, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ToastType = "info" | "success" | "warning" | "error" | "default";
type ToastTransition = "bounce" | "slide" | "zoom" | "flip";

const transitionMap: { [key in ToastTransition]: any } = {
  bounce: Bounce,
  slide: Slide,
  zoom: Zoom,
  flip: Flip,
};

export interface AlertOptions {
  message: string;
  theme?: string;
  type?: ToastType;
  transition?: ToastTransition;
}

export const Alerts = (
  alertOptions: AlertOptions
  // message: string, theme: string, type: ToastType, transition: ToastTransition
) => {
  const {
    message = "Text Alert",
    theme = "light",
    type = "success",
    transition = "bounce",
  } = alertOptions;

  toast(message, {
    position: "bottom-right",
    autoClose: 8000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: theme,
    type: type,
    transition: transitionMap[transition],
  });
};
