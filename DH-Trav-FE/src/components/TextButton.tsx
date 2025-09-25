type TextButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
    color?: string; // optional color
  };

function TextButton({ onClick, children, color = "blue" }: TextButtonProps) {
return (
    <button
    onClick={onClick}
    style={{
        background: "none",
        border: "none",
        color,
        cursor: "pointer",
        padding: 0,
        marginRight: "8px",
        textDecoration: "underline",
        fontSize: "inherit",
        fontFamily: "inherit",
    }}
    >
    {children}
    </button>
);
}

export default TextButton;