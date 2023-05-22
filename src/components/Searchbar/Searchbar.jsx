import { Component } from "react";
import { toast } from "react-hot-toast"; // для показа сообщений
import { BiSearch } from 'react-icons/bi'; // иконка поиска
import css from './Searchbar.module.css' // стилизация

// Компонент поиска
export class Searchbar extends Component {
  state = {
    search: '',
  };

  //функция для изменения состояния
    onChangeInput = (evt) => {
        const { name, value } = evt.currentTarget; // деструктуризация объекта
        this.setState({ [name]: value }); //изменение состояния по ключу name
  }

  // функция для очистки поля ввода
    resetForm = () => {
     this.setState({ search: '' });
    }

  render() {
    return (
      <header className={css.searchbar}>
        <form

          // функция для отправки запроса
          onSubmit={evt => {
                    evt.preventDefault(); //отмена стандартного поведения браузера

                    // проверка на пустой запрос
                    if (!this.state.search) {
                      return toast.error('Enter text for search.'); // сообщение об ошибке
                    }

            // вызов функции из App.jsx для отправки запроса
            this.props.handleSubmit(this.state.search);
            this.resetForm();
          }}
          className={css.Form}
        >

          {/* иконка поиска */}
          <button type="submit" className={css.Button}>
            <BiSearch size="20" />
          </button>

          {/* поле ввода */}
          <input
            value={this.state.search}
            onChange={this.onChangeInput} // вызов функции для изменения состояния
            className={css.Input}
            name="search"
            type="text"
            autoComplete="off"
            autoFocus // автофокус на поле ввода
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}