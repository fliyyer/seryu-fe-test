
interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode;
    colorClass?: string;
    className?: string;
}
const ActionButton = ({ icon, colorClass = '', className = '', ...props }: ActionButtonProps) => {
    return (
        <button
            className={`bg-white hover:bg-gray-200 p-2 rounded-full shadow transition-colors ${className}`}
            {...props}
        >
            <span className={colorClass}>
                {icon}
            </span>
        </button>
    );
};

export default ActionButton;
