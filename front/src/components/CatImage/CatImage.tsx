import { FC } from "react";
import styles from "./CatImage.module.css";
import { FavoriteIconContuor } from "../Icon/Icon";
import clsx from "clsx";

export type CatImageProps = {
  id: string;
  URL: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  wasLiked?: boolean;
};

export const CatImage: FC<CatImageProps> = (props) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={props.URL} />
      <div
        id={props.id}
        className={clsx(
          styles.icon,
          { [styles.hidden]: !props.wasLiked },
          { [styles.always_show]: props.wasLiked }
        )}
        onClick={props.onClick}
      >
        <FavoriteIconContuor alwaysVisible={props.wasLiked} />
      </div>
    </div>
  );
};
