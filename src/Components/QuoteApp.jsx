import { useEffect, useState } from "react";

const QuoteApp = () => {
  const [quote, setQuote] = useState({
    text: "",
    author: "",
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const fetchNewQuote = async () => {
    const res = await fetch(import.meta.env.VITE_QUOTE_URI);
    const data = await res.json();
    setQuote({
      text: data.content,
      author: data.author,
    });
  };

  const toggleFavorite = () => {
    setShowFavorites(!showFavorites);
  };

  const addToFavorites = () => {
    const isAlreadyExist = favorites.some((fav) => fav.text === quote.text && fav.author === quote.author)
    if(!isAlreadyExist){
      setFavorites([...favorites, quote]);
    }
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);
  return (
    <div className="container">
      <div className="quotes-app">
        <div className="heading">
          <h1 className="app-heading">Quote.</h1>
          <i className="bx bxs-heart fav-icon" onClick={toggleFavorite}></i>
        </div>
        <div className="quote">
          <i className="bx bxs-quote-alt-left left-quote"></i>
          <p className="quote-text">{quote.text}</p>
          <p className="quote-author">{quote.author}</p>
          <i className="bx bxs-quote-alt-right right-quote"></i>
        </div>
        <div className="circles">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="circle-3"></div>
          <div className="circle-4"></div>
        </div>
        <div className="buttons">
          <button className="btn btn-new" onClick={fetchNewQuote}>
            NEW Quote
          </button>
          <button className="btn btn-fav" onClick={addToFavorites}>ADD to Favorites</button>
        </div>
        {showFavorites && (
          <div className="favorites">
            <button className="btn-close" onClick={toggleFavorite}>
              <i className="bx bx-x btn-colse"></i>
            </button>
            {favorites.map((favQuote, index) => (
              <div className="fav-quote" key={index}>
                <div className="fav-quote-delete">
                  <i className="bx bx-x-circle fav-quote-delete" onClick={() => {
                    const updatedFav = favorites.filter((_, i) => i !== index)
                    setFavorites(updatedFav)
                  }}></i>
                </div>
                <div className="fav-quote-content">
                  <div className="fav-quote-text">
                    {favQuote.text}
                  </div>
                  <div className="fav-quote-author">{favQuote.author}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteApp;
