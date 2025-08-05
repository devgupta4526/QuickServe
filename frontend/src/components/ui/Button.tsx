// src/components/ui/Button.tsx
interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({ type = 'button', children, onClick, className = '' ,disabled = false,}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-orange-500 text-white py-3 px-3 rounded-md font-medium hover:bg-orange-600 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
