import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'; // элемент галереи
import PropTypes from 'prop-types'; // типизация пропсов
import css from './ImageGallery.module.css'; // импортируем стили
//Функциональный компонент, отвечающий за галерею.
export const ImageGallery = ({ images, toggleModal }) => {
  return (
      <ul className={css.gallery}>
        <ImageGalleryItem toggleModal={toggleModal} images={images} />
      </ul>
  );
};

//типизация пропсов
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired, //массив объектов
  toggleModal: PropTypes.func.isRequired // функция
};
