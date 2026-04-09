import styles from './index.module.css';
import Logo from './logo';
import AuthElement from './auth-element';

const Header = () => {
    return (
        <header className={styles.root}>
            <div className="layout-grid">
                <Logo />
                <AuthElement />
            </div>
        </header>
    );
};

export default Header;