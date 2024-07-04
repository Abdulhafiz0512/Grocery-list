import { useEffect, useState } from "react";

import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";
import Content from "./components/Content";

function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [newItem, setNewItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const api_url = "http://localhost:3000";
  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`${api_url}/items`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network error was not ok: ${errorText}`);
        }

        const newItems = await response.json();
        setItems(newItems);
      } catch (error) {
        console.error("Error fetching items", error.message);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, []);

  async function addItem() {
    const id = String(Date.now());

    const item = {
      id,
      item: newItem,
      checked: false,
    };

    try {
      const response = await fetch(`${api_url}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      // const result = await response.json();
      const newItems = [...items, item];
      console.log(newItems);
      setItems(newItems);
    } catch (error) {
      console.error("Error creating new item", error.message);
    }
  }

  async function handleDelete(id) {
    try {
      const deletedItem = items.find((item) => item.id === id);
      if (!deletedItem) throw new Error("Deleted item not found");

      const response = await fetch(`${api_url}/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Response was not ok: ${errorText}`);
      }

      const filteredItems = items.filter((item) => item.id !== id);
      setItems(filteredItems);
    } catch (error) {
      console.error("Error deleting item", error.message);
      setFetchError(error.message);
    }
  }

  async function handleCheck(id) {
    try {
      const updatedItem = items.find((item) => item.id === id);
      if (!updatedItem) throw new Error("Updated item not found");

      const response = await fetch(`${api_url}/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ checked: !updatedItem.checked }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Response was not ok: ${errorText}`);
      }

      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      setItems(updatedItems);
    } catch (error) {
      console.error("Error updaeting item", error.message);
      setFetchError(error.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addItem();
    setNewItem("");
  }

  return (
    <div className='App'>
      <Header title='Grocery List' />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} onSearch={setSearch} />
      <main>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
