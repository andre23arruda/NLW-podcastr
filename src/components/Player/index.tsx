import styles from './styles.module.scss'


function Player() {
    return (
        <header className={ styles.headerContainer }>
            <img src="/logo.svg" alt="Podcastr"/>
            <p>O melhor para você ouvir, sempre</p>
            <span>{ }</span>
        </header>
    )
}

export default Player
