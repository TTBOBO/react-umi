import styles from './index.css';
import router from 'umi/router';

export default function() {
    console.log(router)
    function goLogin(){
        router.push({
            pathname:'/login1',
            query:{
                a:1
            }
        })
    }
    return (
        <div className={styles.normal}>
        <div className={styles.welcome} />
        <ul className={styles.list}>
            <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
            <li>
            <span onClick={() => goLogin()}>12313</span>
            </li>
        </ul>
        </div>
    );
}
