  import React, { useState, useEffect } from 'react';
  import { Toaster } from 'react-hot-toast';
  import { ImageGallery } from './ImageGallery/ImageGallery'; 
  import { getSearch } from '../Api/Api'; 
  import { Searchbar } from './Searchbar/Searchbar'; 
  import { Button } from 'components/Button/Button'; 
  import { Loader } from 'components/Loader/Loader'; 
  import { Modal } from './Modal/Modal'; 

      const App = () => {
    const [search, setSearch] = useState(''); // Создание состояния search с начальным значением ''
    const [images, setImages] = useState([]); // Создание состояния images с начальным значением пустого массива
    const [page, setPage] = useState(1); // Создание состояния page с начальным значением 1
    const [total, setTotal] = useState(1); // Создание состояния total с начальным значением 1
    const [loading, setLoading] = useState(false); // Создание состояния loading с начальным значением false
    const [error, setError] = useState(null); // Создание состояния error с начальным значением null
    const [showModal, setShowModal] = useState(false); // Создание состояния showModal с начальным значением false
    const [empty, setEmpty] = useState(false); // Создание состояния empty с начальным значением false
    const [largeImageURL, setLargeImageURL] = useState(''); // Создание состояния largeImageURL с начальным значением ''
    const [alt, setAlt] = useState(''); // Создание состояния alt с начальным значением ''

        useEffect(() => {
          const getFunc = (text, page) => {
            setLoading(true); // Установка значения состояния loading в true
        
            getSearch(text, page) // Вызов функции getSearch с передачей аргументов text и page
              // Преобразование ответа в JSON формат
              .then(data => {
                if (data.hits.length === 0) {
                  setEmpty(true)
                  return; // Установка значения состояния empty в true, если длина массива hits равна 0
                }
                setImages(prevImages => [...prevImages, ...data.hits]); // Добавление новых изображений в состояние images
                setTotal(data.total); // Установка значения состояния total
              })
              .catch(error => {
                setError(error.message); // Установка значения состояния error в сообщение об ошибке
              })
              .finally(() => {
                setLoading(false); // Установка значения состояния loading в false
              });
          };

          getFunc(search, page); // Вызов функции getFunc при изменении состояний search и page
        }, [search, page]);


  const clickLoad = () => {
    setPage(prevPage => prevPage + 1); // Увеличение значения состояния page на 1
  };

  const openModal = (largeImageURL, alt) => {
    setShowModal(prevShowModal => !prevShowModal); // Инвертирование значения состояния showModal
    setLargeImageURL(largeImageURL); // Установка значения состояния largeImageURL
    setAlt(alt); // Установка значения состояния alt
  };

  const handleSubmit = search => {
    setSearch(search); 
    setImages([]); 
    setPage(1); 
    setTotal(1); 
    setLoading(false); 
    setError(null); 
    setEmpty(false); 
  };

  const closeModal = () => {
    setShowModal(prevShowModal => !prevShowModal); // Инвертирование значения состояния showModal
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          duration: 1500,
        }}
      />

      <Searchbar handleSubmit={handleSubmit} />

      {error && <h2 style={{ textAlign: 'center' }}>Something went wrong: ({error})!</h2>}

      <ImageGallery toggleModal={openModal} images={images} />

      {loading && <Loader />}

      {empty && <h2 style={{ textAlign: 'center' }}>Sorry. There are no images ...</h2>}

      {total / 12 > page && <Button clickLoad={clickLoad} />}

      {showModal && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}
    </div>
  );
};

export default App;






