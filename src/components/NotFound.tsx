import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-white text-gray-800 mb-80">
      {/* Illustration stylisée (les fameuses lignes) */}
      <div className="relative mb-8 w-64 h-48 flex flex-col justify-center items-center">
        {/* Lignes de code en arrière-plan (Effet Skeleton) */}
        <div className="absolute inset-0 flex flex-col gap-3 opacity-20">
          <div className="h-2 w-3/4 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="h-2 w-full bg-blue-500 rounded-full animate-pulse delay-75"></div>
          <div className="h-2 w-1/2 bg-blue-500 rounded-full animate-pulse delay-150"></div>
          <div className="h-2 w-5/6 bg-blue-500 rounded-full animate-pulse delay-300"></div>
        </div>
        
        {/* Le 404 géant */}
        <h1 className="relative text-9xl font-black text-blue-500 tracking-tighter">
          404
        </h1>
      </div>

      {/* Texte et Message */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold md:text-4xl text-gray-900">
          Oups ! Mauvaise route.
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Il semble que la page que vous cherchez n'existe pas ou a été déplacée dans le terminal.
        </p>
      </div>

      {/* Bouton de retour */}
      <div className="mt-10">
        <Link
          to="/"
          className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Retourner à l'accueil
        </Link>
      </div>
    </section>
  );
}

export default NotFound;