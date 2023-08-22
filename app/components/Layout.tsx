import React, { ReactElement, ReactNode, createContext, useContext, useState } from 'react'
import { css } from '@emotion/css';
import { useRouter, useParams } from 'next/navigation'
import { ToastContainer } from 'react-toastify'

type LayoutProps = {
  children: ReactNode | ReactElement;
}

interface LayoutType {
  search: string;
  setSearch: (search: string) => void;
  navigate: (path: string) => void;
  id: string | undefined;
}

export const LayoutContext = createContext<LayoutType>({} as LayoutType);

export const Layout = ({ children }: LayoutProps) => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();
  const { id } = useParams();

  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <LayoutContext.Provider value={{ search, setSearch, navigate, id: id as string }}>
      <main className={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}>
        <div className={css`
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          position: relative;
          @media (min-width: 768px) {
            width: 480px;
          }
        `}>{children}</div>
      </main>
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </LayoutContext.Provider>
  );
}

export const useLayoutContext = () => useContext(LayoutContext);
