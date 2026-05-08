interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const DEFAULT_FALLBACK = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1774832675/feedbacks/dcbamzhhxxuleifpxew1.webp";

const Img = ({ src, alt, ...props }: ImgProps) => {

  const optimizeCloudinaryUrl = (url: string) => {
    if (!url) return DEFAULT_FALLBACK;

    let finalUrl = url;

    // Si l'URL commence par '{', c'est du JSON, on l'extrait
    if (url.startsWith('{')) {
      try {
        finalUrl = JSON.parse(url).url;
      } catch (error) {
        console.log("Erreur: ", error)
        finalUrl = url; // En cas d'erreur, on garde la string d'origine
      }
    }

    if (!finalUrl || !finalUrl.includes("res.cloudinary.com")) return finalUrl;

    const optimizationParams = "f_auto,q_auto,w_800";
    return finalUrl.replace("/upload/", `/upload/${optimizationParams}/`);
  };

  return (
    <img
      src={optimizeCloudinaryUrl(src)}
      alt={alt || "Nadjitan Portfolio"}
      loading="lazy"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).src = DEFAULT_FALLBACK;
      }}
      {...props}
    />
  );
};

export default Img;