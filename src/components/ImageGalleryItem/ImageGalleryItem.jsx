import css from './ImageGalleryItem.module.css'; //импортируем стили
import PropTypes from 'prop-types'; // типизация пропсов

// Функциональный компонент, отвечающий за элемент галереи.
export const ImageGalleryItem = ({ images, toggleModal }) => {
  return (
    <>
      {/* Перебираем массив изображений и выводим их на страницу. */}
      {images.map(item => (

        // При щелчке на элементе галереи вызываем функцию toggleModal, которая открывает модальное окно.
        <li key={item.id} onClick={(evt)=>{toggleModal(item.largeImageURL, item.tags);}} className={css.galleryItem}>
          <img
            loading="lazy"
            className={css.ImageGalleryItem}
            src={item.webformatURL}
            alt={item.tags}
          />
        </li>
      ))}
    </>
  );
};


ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired
};