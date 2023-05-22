import { Component } from 'react'; //для классового компонента
import { createPortal } from 'react-dom'; // для рендеринга в другом месте
import css from './Modal.module.css'; // стилизация

// Поиск модалки, чтобы динамически добавить к DOM-дереву страницы
const modalRoot = document.querySelector('#root');

export class Modal extends Component {

  // регистрирует обработчик события keydown на окне браузера
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown); // при нажатии клавиши Escape вызывает функцию keyDown
  }

  keyDown = evt => {
    // проверка кода клавиши
    if (evt.code === 'Escape') {
      this.props.closeModal(); // закрытие модалки
    }
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown); // удаляет обработчик события keydown из окна браузера
  }

  // закрытие модалки по клику на бэкдроп
  handleClose = (evt) => {

    // проверка или клик был по бэкдропу
    if (evt.currentTarget === evt.target) {
      this.props.closeModal(); // закрытие модалки
    }
  }

  render() {
    return createPortal(<div onClick={this.handleClose} className={css.Overlay}>
      <div className={css.Modal}>{this.props.children}</div> {/*рендеринг дочерних элементов */}
    </div>, modalRoot)
  }
}