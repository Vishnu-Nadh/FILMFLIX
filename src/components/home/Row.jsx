import styles from "./Row.module.css";
import MovieCard from "../movie/MovieCard";
import { useTmdb } from "../../hooks/use-http";
import CardSkeleton from "../loaders/CardSkeleton";
import { BsChevronDoubleRight, BsChevronDoubleLeft } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const { data: movies, isLoading, error } = useTmdb(fetchUrl, []);
  const [scrollStart, setScrollStart] = useState(true);
  const [scrollEnd, setScrollEnd] = useState(false);
  const [isDragStart, setIsDragStart] = useState(false);
  const [prevPageX, setPrevPageX] = useState(0);
  const [prevScrollLeft, setPrevScrollLeft] = useState(0);
  const itemsRef = useRef();

  const scrollLeftHandler = () => {
    const items = itemsRef.current;
    const itemsVisibleWidth = items?.clientWidth;
    const itemsScrollWidth = items?.scrollWidth;

    items.scrollLeft = items.scrollLeft - itemsVisibleWidth;

    const nextScrollLeft = items.scrollLeft - itemsVisibleWidth;
    if (nextScrollLeft <= 0) {
      setScrollStart(true);
    }
    if (itemsScrollWidth - nextScrollLeft > itemsVisibleWidth) {
      setScrollEnd(false);
    }
  };
  const scrollRightHandler = () => {
    const items = itemsRef.current;
    const itemsVisibleWidth = items?.clientWidth;
    const itemsScrollWidth = items?.scrollWidth;

    items.scrollLeft = items.scrollLeft + itemsVisibleWidth;

    const nextScrollLeft = items.scrollLeft + itemsVisibleWidth;
    if (nextScrollLeft > 0) {
      setScrollStart(false);
    }
    if (itemsScrollWidth - nextScrollLeft <= itemsVisibleWidth) {
      setScrollEnd(true);
    }
  };

  const mouseMoveHandler = (e) => {
    e.preventDefault();
    if (!isDragStart) return;
    const positionDiff = e.pageX - prevPageX;
    itemsRef.current.scrollLeft = prevScrollLeft - positionDiff;
  };

  const mouseDownHandler = (e) => {
    setIsDragStart(true);
    setPrevPageX(e.pageX);
    setPrevScrollLeft(itemsRef.current.scrollLeft);
  };

  return (
    <section className={styles.row}>
      <h2 className={`${styles.row__title} heading-secondary`}>{title}</h2>
      <div className={styles.row__wrapper}>
        <button
          className={styles.row__btn_prev}
          onClick={scrollLeftHandler}
          style={{ opacity: scrollStart ? 0.1 : 1 }}
        >
          <BsChevronDoubleLeft />
        </button>
        <ul
          className={styles.row__items}
          ref={itemsRef}
          onMouseMove={mouseMoveHandler}
          onMouseDown={mouseDownHandler}
          onMouseUp={() => {
            setIsDragStart(false);
          }}
        >
          {isLoading &&
            [...Array(20).keys()].map((skeleton, id) => (
              <CardSkeleton key={id} isLarge={isLargeRow} />
            ))}
          {!isLoading &&
            movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} isLarge={isLargeRow} />
            ))}
        </ul>
        <button
          className={styles.row__btn_next}
          onClick={scrollRightHandler}
          style={{ opacity: scrollEnd ? 0.1 : 1 }}
        >
          <BsChevronDoubleRight />
        </button>
      </div>
    </section>
  );
};

export default Row;
