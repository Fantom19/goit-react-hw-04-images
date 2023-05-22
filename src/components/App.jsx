import { Component } from 'react';
import { Toaster } from 'react-hot-toast'; 
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getSearch } from '../Api/Api'; 
import { Searchbar } from './Searchbar/Searchbar'; 
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader'; 
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    total: 1,
    loading: false, 
    error: null,
    showModal: false,
    empty: false, 
  };

  // Вызывается после того, как компонент был смонтирован.
  // Параметр '_' содержит предварительные пропы компонента, а PrevState - предыдущее состояние компонента.
  componentDidUpdate(_, PrevState) {

    // Проверяем, изменились ли пропы search или page.
    if (
      PrevState.search !== this.state.search ||
      PrevState.page !== this.state.page
    ) {
      this.getFunc(this.state.search, this.state.page);
    }
  }

  getFunc = (text, page) => {
    this.setState({ loading: true }); // включаем индикатор загрузки

    // Вызываем функцию getSearch, выполняющую запрос на сервер.
    getSearch(text, page)
      .then(resp => resp.json()) // превращаем в JSON
      .then(data => {

        // Проверяем, есть ли результаты поиска пустыми.
        if (data.hits.length === 0) {
          this.setState({ empty: true }); // включаем флаг, показывающий, есть ли результаты поиска пустыми
        }
        this.setState(prevSt => ({
          page: prevSt.page,
          images: [...prevSt.images, ...data.hits], // добавляем новые картинки в массив.
          total: data.total,
        }));
      })
      .catch(error => {
        this.setState({ error: error.message }); // записываем ошибку в стейт
      })
      .finally(() => {
        this.setState({ loading: false }); // выключаем индикатор загрузки
      });
  };

  // Функция, вызываемая при нажатии кнопки Load more.
  clickLoad = () => {
    this.setState(prevSt => ({
      page: prevSt.page + 1, // увеличиваем номер страницы на +1
    }));
  };

  // Функция, вызываемая при нажатии на картинку.
  openModal = (largeImageURL, alt) => {

    // Используем setState с функцией, которая принимает прежнее состояние и возвращает новое.
    this.setState(({ showModal }) => {
      return { showModal: !showModal, largeImageURL, alt };
    });
  };

  // Функция, вызываемая при нажатии на кнопку "Search".
  handleSubmit = search => {
    // Очищаем массив с картинками, а также ставим исходные значения для страницы,
    // общего количества картинок, флагов и ошибок
    this.setState({
      search,
      images: [],
      page: 1,
      total: 1,
      loading: false,
      error: null,
      empty: false,
    });
  };

  // Функция, вызываемая при нажатии кнопки "Close".
  closeModal = () => {

    // Используем setState с функцией, которая принимает прежнее состояние и возвращает новое.
    this.setState(({ showModal }) => {
      return { showModal: !showModal };
    });
  };

  render() {
    const { error, loading, images, total, page } = this.state;
    return (
      <div>

        {/* Всплывающее сообщение */}
        <Toaster
          toastOptions={{
            duration: 1500,
          }}
        />

        {/* текстовое поле для ввода запроса */}
        <Searchbar handleSubmit={this.handleSubmit} />

        {/* Проверяем, есть ли ошибка */}
        {error && (
          <h2 style={{ textAlign: 'center' }}>
            Something went wrong: ({error})!
          </h2>
        )}

        {/* отображение списка изображений */}
        <ImageGallery togleModal={this.openModal} images={images} />

        {/* Проверяем, происходит ли загрузка */}
        {loading && <Loader />}

        {/* Проверяем, есть ли результаты поиска пустыми */}
        {this.state.empty && (
          <h2 style={{ textAlign: 'center' }}>
            Sorry. There are no images ... 
          </h2>
        )}

        {/* Проверяем, нужно ли отображать кнопку "Load more" */}
        {total / 12 > page && <Button clickLoad={this.clickLoad} />}

        {/* Проверяем, нужно ли отображать модальное окно */}
        {this.state.showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={this.state.largeImageURL} alt={this.state.alt} />
          </Modal>
        )}
      </div>
    );
  }
}