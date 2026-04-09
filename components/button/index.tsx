import React, { ReactNode } from 'react';
import styles from './index.module.css';

interface Props {
  disabled?: boolean;
  children: ReactNode;
  variant: 'default' | 'blue';
  clickHandler?: () => void;
}

const Button = ({ disabled, children, variant, clickHandler }: Props) => {
  const renderContent = (content: ReactNode) => {
    return <span onClick={!disabled ? clickHandler : undefined}>{content}</span>;
  };

  const buttonClass = `${styles.root} ${styles[variant]} ${disabled ? styles.disabled : ''}`;

  return (
    <div className={buttonClass}>
      {renderContent(children)}
    </div>
  );
};

export default Button;