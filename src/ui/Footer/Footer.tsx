import Image from 'next/image'
import { Logo } from '@/ui'
import * as Assets from './assets'
import styles from './Footer.module.scss'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.logoMini}>
          <Image src={Assets.logo.src} fill alt="" sizes='100vw' />
        </div>
        <div className={styles.contacts}>
          <div>
            <Assets.EnvelopeIcon />
            <a href="mailto:oooargo2012@mail.ru">oooargo2012@mail.ru</a>
          </div>
          <div>
            <Assets.PhoneIcon />
            <a href="tel:+79180777200">+7 (918) 0-777-200</a>
          </div>
          <div>
            <Assets.PhoneIcon />
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
              <Assets.WhatsAppIcon />
            </a>
            <a href="https://www.instagram.com/grk_afrodita/">
              <Assets.InstagramIcon />
            </a>
            <a href="#">
              <Assets.TelegramIcon />
            </a>
            <a href="https://vk.com/id288733184">
              <Assets.VkIcon />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.subfooter}>
        <Assets.CIcon />
        <small>2024 Афродита 🤍 от <a href="https://roinext.marketing/">Roinext</a></small>
      </div>
      <Logo className={styles.logo} />
    </footer>
  )
}
