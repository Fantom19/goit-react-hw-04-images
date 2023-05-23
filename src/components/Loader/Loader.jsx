import { ColorRing } from 'react-loader-spinner'; // анимированный спинер из библиотеки

// используется в компонентах, где нужно показать, что данные загружаются.
export const Loader = () => {
    return (
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{
          display: 'block',
          marginTop: 20,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#b47e60', '#a8b26a', '#bbbd81', '#859b87']}
      />
    );
}