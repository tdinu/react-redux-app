import { useEffect, useState } from 'react';

function useToggleFavorite<T>(key: string = 'favorite-ids', initialValue?: T) {
  const [favorites, setFavorites] = useState(() => {
    const ls = localStorage.getItem(key);
    if (ls) return JSON.parse(ls);
    else return [];
  });

  const toggleItemInLocalStorage =
    <T>(id: T) =>
    () => {
      console.log('favorites 2', favorites);
      const isBookmarked = favorites.includes(id);
      if (isBookmarked)
        setFavorites((prev: T[]) => prev.filter((b: T) => b !== id));
      else setFavorites((prev: T[]) => [...prev, id]);
    };

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(favorites));
  }, [favorites, key]);

  return [favorites, toggleItemInLocalStorage];
}

export default useToggleFavorite;
