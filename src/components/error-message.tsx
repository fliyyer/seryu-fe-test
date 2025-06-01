type ErrorMessageProps = {
    message?: string;
};

const ErrorMessage = ({ message = "Failed to load data." }: ErrorMessageProps) => (
    <div className="text-center mt-20 text-red-500 font-semibold">
        {message}
    </div>
);

export default ErrorMessage;
