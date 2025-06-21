import { FC } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../store/store";
import { CatImage } from "../../components/CatImage/CatImage";
import { RequestStatus } from "../../types";
import {
  selectSliceState,
  fetchCatLikes,
  selectCatLikes,
  selectError as selectCatsLikeError,
  deleteLike,
} from "../../store/catLikeSlice";
import styles from "./FavoriteCatsPage.module.css";
import {
  fetchCat,
  selectError as selectCatsError,
  selectCorrelations,
} from "../../store/catSlice";

export const FavoriteCatsPage: FC<{}> = () => {
  const dispath = useDispatch();
  const cats = useSelector(selectCatLikes);
  const correlations = useSelector(selectCorrelations);
  const sliceState = useSelector(selectSliceState);
  const catsError = useSelector(selectCatsError);
  const catsLikeError = useSelector(selectCatsLikeError);

  useEffect(() => {
    dispath(fetchCatLikes()); // в первый раз берем все лайки
  }, []);

  useEffect(() => {
    if (sliceState === RequestStatus.SuccessLoadedList && cats.length > 0)
      cats.map((el) => {
        if (!el.URL) dispath(fetchCat(el.cat_id)); // в первый раз берем все лайки
      });
  }, [sliceState]);

  const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    console.log("onClick", e.currentTarget.id);
    dispath(deleteLike(e.currentTarget.id));
  };

  if (catsError !== "" || catsLikeError !== "")
    return (
      <div>
        Ошибка: {catsError} {catsLikeError}
      </div>
    );

  return (
    <>
      <div className={styles.main}>
        {cats &&
          cats.map((el, cnt) => {
            const found = correlations.find((fel) => fel.id === el.cat_id);
            if (found)
              return (
                <CatImage
                  id={el.cat_id}
                  key={cnt}
                  URL={found.URL}
                  onClick={onClick}
                />
              );
          })}
      </div>
    </>
  );
};
