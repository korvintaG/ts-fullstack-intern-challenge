import { FC } from "react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "../../store/store";
import {
  fetchCats,
  selectCats,
  selectError as selectCatsError,
  selectSliceState,
} from "../../store/catSlice";
import { CatImage } from "../../components/CatImage/CatImage";
import { RequestStatus } from "../../types";
import {
  deleteLike,
  fetchCatLikes,
  postLike,
  selectCatLikes,
  selectError as selectCatsLikeError,
} from "../../store/catLikeSlice";
import styles from "./CatsPage.module.css";

export const CatsPage: FC<{}> = () => {
  const dispath = useDispatch();
  const cats = useSelector(selectCats);
  const catsLike = useSelector(selectCatLikes);
  const sliceState = useSelector(selectSliceState);
  const observerTarget = useRef<HTMLDivElement>(null);
  const catsError = useSelector(selectCatsError);
  const catsLikeError = useSelector(selectCatsLikeError);

  useEffect(() => {
    if (cats.length === 0) dispath(fetchCatLikes()); // в первый раз берем все лайки
    if (cats.length < 30) dispath(fetchCats());
  }, [cats.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && sliceState !== RequestStatus.Loading) {
          dispath(fetchCats());
        }
      },
      { threshold: 0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchCats]);

  const onClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (catsLike.find((el) => el.cat_id === e.currentTarget.id))
      dispath(deleteLike(e.currentTarget.id));
    else
      dispath(postLike({ cat_id: e.currentTarget.id, created_at: new Date() }));
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
          cats.map((el, cnt) => (
            <CatImage
              key={cnt}
              id={el.id}
              URL={el.url}
              onClick={onClick}
              wasLiked={!!catsLike.find((fel) => fel.cat_id === el.id)}
            />
          ))}
      </div>
      <div ref={observerTarget} style={{ height: "20px" }} />
    </>
  );
};
