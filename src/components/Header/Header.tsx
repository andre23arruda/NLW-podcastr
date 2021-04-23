import { converNowToString } from '../../utils/convert-data'
import styles from './styles.module.scss'


const currentDate = converNowToString()


function Header() {
    return (
        <header className={ styles.headerContainer }>
            <img src="/logo-2.svg" alt="Podcastr"/>
            <p>O melhor para você ouvir, sempre</p>
            <span>{ currentDate }</span>
        </header>
    )
}

export default Header
