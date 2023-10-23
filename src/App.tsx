import { useContext } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './components/LoginPage';
import { TablePage } from './components/TablePage';
import { MainContext } from './components/MainContext';

export const App = () => {
  const { isLoggedIn } = useContext(MainContext);

  return (
    <main className="section is-medium">
      <Routes>
        <Route path="/">
          {isLoggedIn ? (
            <Route index element={<TablePage />} />
          ) : (
            <Route index element={<LoginPage />} />
          )}
        </Route>
      </Routes>
    </main>
  );
}
