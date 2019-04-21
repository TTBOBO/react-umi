import Link from 'umi/link';

export default function(props) {
    console.log(props)
    return (
        <div  style={{background:'red'}}>
            登录页面
            <Link to="/">Go to list page</Link>
        </div>

    );
}
