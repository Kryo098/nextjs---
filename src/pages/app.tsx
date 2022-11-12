import React, { useCallback } from "react";
import { useSelector, AppDispatch } from "../app/store";
import { fetchPhotos, selectPhotos } from "../features/photo";
import { useDispatch } from "react-redux";

export const Photo: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const photos = useSelector(selectPhotos);


  const handleClick = useCallback(() => {
    dispatch(fetchPhotos()).catch((error) => error.message);
  }, [dispatch]);

  return (
    <div>
      <button onClick={handleClick}>GET</button>
      {photos.status === "succeeded" && (
        <ul>
          {photos.data.hits.map((element) => (
            <li key={element.id}>
              <>{element.id}</>
            </li>
          ))}
        </ul>
      )}
      {photos.status === "pending" && <div>Loading...</div>} 
      {photos.status === "failed" && <div>{photos.error}</div>}
    </div>
  );
};