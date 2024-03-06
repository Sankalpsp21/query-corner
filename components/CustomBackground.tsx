
interface CustomBackgroundProps {
  children: React.ReactNode;
}

function CustomBackground({ children }: CustomBackgroundProps) {
  const backgroundStyle = {
    backgroundImage: `url(/big-background.svg)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed', 
  };



  return (
    <div className="min-h-screen" style={backgroundStyle}>
      {children}
    </div>
  );
}

export default CustomBackground;
