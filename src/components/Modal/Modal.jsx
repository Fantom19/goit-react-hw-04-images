     import React, { useEffect } from 'react';
     import { createPortal } from 'react-dom';
     import css from './Modal.module.css';

         const modalRoot = document.querySelector('#root'); // Выбор элемента с ID 'root' в качестве корневого элемента модального окна

      export const Modal = ({ closeModal, children }) => { // Определение функционального компонента с именем Modal и пропсами closeModal и children
     useEffect(() => {
      const keyDown = (evt) => { // Обработчик события keydown
      if (evt.code === 'Escape') { // Проверка, является ли нажатая клавиша 'Escape'
      closeModal(); // Закрытие модального окна путем вызова функции closeModal
      }
      };
        window.addEventListener('keydown', keyDown);  // Добавление слушателя события keydown к окну

      return () => {
      window.removeEventListener('keydown', keyDown);  // Удаление слушателя события keydown при размонтировании компонента
            };
            }, [closeModal]);

     const handleClose = (evt) => { // Обработчик события click
     if (evt.currentTarget === evt.target) { // Проверка, является ли кликнутый элемент самим оверлеем
     closeModal(); // Закрытие модального окна путем вызова функции closeModal
     }
     };

return createPortal(
     <div onClick={handleClose} className={css.Overlay}> 
     <div className={css.Modal}>{children}</div> 
     </div>,
     modalRoot // Рендеринг содержимого модального окна внутри элемента modalRoot
     );
     };