import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';

const Logo = () => {
    return (
        <Link href="/" className={styles.root}>
            <Image 
                src="/assets/logo.svg"
                alt="Grubhunter Logo" 
                fill 
                priority 
                style={{ objectFit: 'contain' }}
            />
        </Link>
    );
};

export default Logo;