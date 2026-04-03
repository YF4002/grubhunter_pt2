import React from 'react';
import Header from '../header';

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <main className="layout-grid">
                {children}
            </main>
        </>
    );
};

export default Layout;