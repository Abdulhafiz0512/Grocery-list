import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";

function App() {
  return (
    <div className='App'>
      <Header title='Grocery List' />
      <AddItem />
      <SearchItem />
      <main></main>
      <Footer />
    </div>
  );
}

export default App;
