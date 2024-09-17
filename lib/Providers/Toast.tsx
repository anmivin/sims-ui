import { ToastProps } from './ToastProvider';
import styled from "@emotion/styled";

const StyledDiv = styled.div`
.toast {
  background-color: rgba(231, 133, 215, 0.3);
  padding: 4px;
  border-radius: 2px;
  position: relative;
  color: black;
}

.toast-message {
  display: flex;
  gap: 4px;
  align-items: top;
}

.toast-success {
  color: green;
  border: 2px solid green;
}

.toast-error {
  color: red;
  border: 2px solid red;
}

.toast-info {
  color: mediumblue;
  border: 2px solid mediumblue;
}
`
const Toast = ({ title, text, variant }: ToastProps) => {
  const iconMap = {
    success: <CheckIcon />,
    error: <StarIcon />,
    info: <PlusIcon />,
  };

  const toastIcon = iconMap[variant] || null;

  return (
    <div className={`toast toast-${variant}`}>
      <div className="toast-message">

        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Toast;