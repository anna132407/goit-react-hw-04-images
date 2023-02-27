import React, { useState, useEffect } from 'react';
import { fetchPhotosByKeyWord } from 'services/api';
import css from './App.module.css';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export function App() {
  const [keyword, setKeyword] = useState('');
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreIsVisible, setLoadMoreIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [isFetchedArrayEmpty, setIsFetchedArrayEmpty] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    if (!keyword) return;

    const getPhotos = async () => {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchPhotosByKeyWord(keyword, page);
        if (hits.length === 0) {
          setIsFetchedArrayEmpty(true);
          return;
        }
        setPhotos(prevState => [...prevState, ...hits]);
        setLoadMoreIsVisible(page < Math.ceil(totalHits / 12));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos();
  }, [page, keyword]);

  const setKeyWord = keyWord => {
    setKeyword(keyWord);
    setPhotos([]);
    setPage(1);
    setIsLoading(false);
    setLoadMoreIsVisible(false);
    setIsModalOpen(false);
    setError('');
    setIsFetchedArrayEmpty(false);
  };

  const handleButton = () => {
    setPage(prevState => prevState + 1);
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onItemClick = largeImageURL => {
    setLargeImageURL(largeImageURL);
    handleModal();
  };
  return (
    <>
      {isLoading && <Loader />}

      <section className={css.App}>
        <Searchbar onSubmit={setKeyWord} />

        {error && (
          <p className={css.Notify}>
            Sorry, an error occurred! Error: {error} Please try again later
          </p>
        )}
        {isFetchedArrayEmpty ? (
          <p className={css.Notify}>
            Sorry, there are no images for your request
          </p>
        ) : (
          <ImageGallery photos={photos} onItemClick={onItemClick} />
        )}
        {loadMoreIsVisible && <Button onLoadMore={handleButton} />}
        {isModalOpen && (
          <Modal largeImageURL={largeImageURL} handleModal={handleModal} />
        )}
      </section>
    </>
  );
}