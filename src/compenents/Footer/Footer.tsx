import Image from 'next/image'
import { Logo } from '@/compenents'
import logo from './assets/logo_footer.png'
import EnvelopeIcon from './assets/envelope.svg'
import PhoneIcon from './assets/phone.svg'
import WhatsAppIcon from './assets/whatsapp.svg'
import InstagramIcon from './assets/instagram.svg'
import TelegramIcon from './assets/telegram.svg'
import CIcon from './assets/c-icon.svg'
import VkIcon from './assets/vk.svg'
import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <Image className={styles.logoMini} src={logo.src} width={99} height={106} alt="" />
      <Logo className={styles.logo} />
      <div className={styles.contacts}>
        <div>
          <EnvelopeIcon />
          <a href="mailto:oooargo2012@mail.ru">oooargo2012@mail.ru</a>
        </div>
        <div>
          <PhoneIcon />
          <a href="tel:+79180777200">+7 (918) 0-777-200</a>
        </div>
        <div>
          <PhoneIcon />
          <a href="tel:+78615533070">+7 (861) 553-30-70</a>
        </div>
      </div>
      <div className={styles.socialMedia}>
        <p>
          Вы также можете найти нас на
          <br />
          этих платформах!
        </p>
        <div className={styles.socialIcons}>
          <a href="#">
            <WhatsAppIcon />
          </a>
          <a href="https://www.instagram.com/grk_afrodita/">
            <InstagramIcon />
          </a>
          <a href="#">
            <TelegramIcon />
          </a>
          <a href="https://vk.com/id288733184">
            <VkIcon />
          </a>
        </div>
      </div>
      <div className={styles.subfooter}>
        <CIcon />
        <small>2024 Афродита 🤍 от Roinext</small>
      </div>
    </footer>
  )
}
