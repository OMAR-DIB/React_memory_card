import { useState, useEffect } from 'react';
import axios from 'axios';
const App = () => {
  
  const [highScore, setHighScore] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [clickedImages, setClickedImages] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);

  const fetchImage = async () => {
    try {
      const response = await axios.get(`https://api.giphy.com/v1/gifs/translate?api_key=PgYJ37kFuhwGdqeLOZfeWWuQYWy1x6r1&s=random`);
      const giphyData = response.data;
      const imageUrl = giphyData.data.images.original.url;
      setImages((prevImages) => [...prevImages, imageUrl]);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const handleClick = (image: string) => {
    if (score > highScore) {
      setHighScore(score);
    }
    if (clickedImages.has(image)) {
      setScore(0);
      setClickedImages(new Set());
    } else {
      setScore((prevScore) => prevScore + 1);
      setClickedImages((prevClickedImages) => new Set(prevClickedImages).add(image));
      fetchImage();
    }
  };
 
  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <div>
      <h1>Score: {score}</h1>
      <h1>highest Score: {highScore}</h1>
      <div>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Pokemon"
            onClick={() => handleClick(image)}
            style={{ cursor: 'pointer', margin: '10px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

