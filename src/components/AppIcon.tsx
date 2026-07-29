interface AppIconProps {
  onClick: () => void;
  className?: string; // ✅ Add className as an optional prop
}

const AppIcon: React.FC<AppIconProps> = ({ onClick, className = "" }) => {
  return (
    <div onClick={onClick} className={`cursor-pointer ${className}`}>
      🔥
    </div>
  );
};

export default AppIcon;
