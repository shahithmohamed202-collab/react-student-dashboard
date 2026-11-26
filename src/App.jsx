import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadStoreData() {
      try {
        const [productsResponse, usersResponse] = await Promise.all([
          fetch('https://fakestoreapi.com/products', { signal: controller.signal }),
          fetch('https://fakestoreapi.com/users', { signal: controller.signal }),
        ]);

        if (!productsResponse.ok || !usersResponse.ok) {
          throw new Error('The store data could not be loaded. Please try again.');
        }

        const [productsData, usersData] = await Promise.all([
          productsResponse.json(),
          usersResponse.json(),
        ]);

        setProducts(productsData);
        setUsers(usersData);
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message || 'The store data could not be loaded.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadStoreData();
    return () => controller.abort();
  }, []);

  function addTestUser() {
    setUsers((currentUsers) => [
      ...currentUsers,
      {
        id: `test-${Date.now()}`,
        name: { firstname: 'Test', lastname: 'User' },
        email: 'test.user@example.com',
      },
    ]);
  }

  return (
    <main className="store-app">
      <h1 className="page-title">Fake Store Products</h1>
      <button
        className="add-user-button"
        type="button"
        onClick={addTestUser}
        disabled={loading || Boolean(error)}
      >
        Add test user
      </button>

      {error && <p className="status-message error-message" role="alert">{error}</p>}
      {loading && <p className="status-message" role="status">Loading store data...</p>}

      {!loading && !error && (
        <>
          <section aria-label="Products">
            <table className="data-table products-table">
              <thead>
                <tr>
                  <th scope="col">Product name</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="users-section" aria-labelledby="users-title">
            <h2 id="users-title" className="section-title">Users</h2>
            <table className="data-table users-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{`${user.name.firstname} ${user.name.lastname}`}</td>
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </main>
  );
}

export default App;
