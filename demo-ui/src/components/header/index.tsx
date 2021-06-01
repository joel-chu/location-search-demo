import { FunctionalComponent, h } from 'preact'
import { Link } from 'preact-router/match'
import style from './style.css'

const Header: FunctionalComponent = () => {
    return (
        <header class={style.header}>
            <h1>Location search demo</h1>
            <nav>
                <Link activeClassName={style.active} href="/">
                    Home
                </Link>

            </nav>
        </header>
    )
}
/* not in use 
<Link activeClassName={style.active} href="/about">
    About
</Link>
*/
export default Header
