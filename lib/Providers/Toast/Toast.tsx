import CheckIcon from "../icons/check";
import StarIcon from "../icons/exclamation";
import PlusIcon from "../icons/plus";
import { ToastProps } from "./ToastProvider";
import "./Toast.css";

const Toast = ({ title, text, variant }: ToastProps) => {
  const iconMap = {
    success: <CheckIcon />,
    error: <StarIcon />,
    info: <PlusIcon />,
  };

  const toastIcon = iconMap[variant] || null;

  return (
    <div className={`toast toast-${variant}`}>
      <div className='toast-message'>
        {toastIcon}
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Toast;
