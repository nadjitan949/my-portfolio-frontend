interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const Img = ({ src, alt, ...props }: ImgProps) => {
  
  // Fonction pour ajouter les paramètres d'optimisation Cloudinary
  const optimizeCloudinaryUrl = (url: string) => {
    if (!url.includes("res.cloudinary.com")) return url;

    // On cherche "/upload/" dans l'URL pour insérer nos paramètres juste après
    const optimizationParams = "f_auto,q_auto,w_800"; // format auto, qualité auto, largeur max 800px
    return url.replace("/upload/", `/upload/${optimizationParams}/`);
  };

  return (
    <img 
      src={optimizeCloudinaryUrl(src)} 
      alt={alt || "Nadjitan Portfolio"} 
      loading="lazy" // Aide encore plus la performance
      {...props} 
    />
  );
};

export default Img;