import './App.css';
// import Album2 from './Album2';
import Album3 from './Album3';
import Album4 from './Album4';
// import AlbumSearchdrop from './AlbumSearchdrop';
import AlbumSearch from "./AlbumSearch";
import Album1Debounce from './FinalCode/Album1Debounce';
import FakeStore from './interview/FakeStore';

function App() {
  return (
    <div className="App">
      {/* albums debounce, sort, search */}
      {/* <Album3 /> */}
      {/* <Album2 /> */}
      {/* <Album4 /> */}
      {/* <AlbumSearchdrop /> */}
      {/* <AlbumSearch /> */}
      {/* <Album1Debounce /> */}
  {/* ================================ */}
    {/* https://fakestoreapi.com/products */}
      <FakeStore />


    </div>
  );
}

export default App;
