import styles from './styles.module.scss';

function Header() {
    return (
        <header className={ styles.headerContainer }>
            <img src="/logo.svg" alt="Podcastr"/>
            <p>O melhor para você ouvir, sempre</p>
            <span>Ter, 20 de Abril</span>
        </header>
    )
}

export default Header