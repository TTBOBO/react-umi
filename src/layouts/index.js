import styles from './index.css';

function BasicLayout(props) {
    //className={styles.normal}
    return (
        <div className={styles.container}>
            {props.children}
        </div>
    );
}

export default BasicLayout;
