import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css';


function AppHeader() {
    return (
      <header className={styles.header}>
        <div className={styles.menu}>
          <a className={styles.iconWithText} href='/'>
            <BurgerIcon type='primary'/>
            <p className={`text text_type_main-default`}>Конструктор</p>
          </a>
          <a className={styles.iconWithText} href='/'>
            <ListIcon type='secondary' />
            <p className="text text_type_main-default text_color_inactive">Лента заказов</p>
          </a>
        </div>

        <div className={styles.logo}>
          <Logo />
        </div>
        
        <div> 
          <a className={styles.iconWithText} href='/'>
            <ProfileIcon type='secondary' />
            <p className="text text_type_main-default text_color_inactive">Личный кабинет</p>
          </a>
        </div>
      </header>
    )
}

export default AppHeader;