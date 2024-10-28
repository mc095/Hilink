import Image from "next/image";

type ButtonProps = {
  type?: 'button' | 'submit'; // Optional type for button
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  onClick?: () => void; // Optional onClick prop
  href?: string; // Optional href prop for linking
}

const Button = ({ type, title, icon, variant, full, onClick, href }: ButtonProps) => {
  const buttonContent = (
    <>
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <label className="bold-16 whitespace-nowrap cursor-pointer">{title}</label>
    </>
  );

  // If href is provided, render an anchor tag
  if (href) {
    return (
      <a
        href={href}
        target="_blank" // Open link in a new tab
        rel="noopener noreferrer" // Security measure
        className={`flexCenter gap-3 rounded-full border ${variant} ${full ? 'w-full' : ''}`}
      >
        {buttonContent}
      </a>
    );
  }

  // Otherwise, render a button
  return (
    <button
      className={`flexCenter gap-3 rounded-full border ${variant} ${full ? 'w-full' : ''}`}
      type={type}
      onClick={onClick} // Attach the onClick handler
    >
      {buttonContent}
    </button>
  );
};

export default Button;
