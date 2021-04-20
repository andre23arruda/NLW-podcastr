import styles from './styles.module.scss'

const monthPt = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril',
    'Maio', 'Junho', 'Julho','Agosto',
    'Setembro', 'Outubro','Novembro','Dezembro'
]
const daysPt = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
const now = new Date()
const currentDate = `${ daysPt[now.getDay()] }, ${ ('0' + now.getDate()).slice(-2) } de ${ monthPt[now.getMonth()]}`


function Header() {
    return (
        <header className={ styles.headerContainer }>
            <img src="/logo.svg" alt="Podcastr"/>
            <p>O melhor para você ouvir, sempre</p>
            <span>{ currentDate }</span>
        </header>
    )
}

export default Header
