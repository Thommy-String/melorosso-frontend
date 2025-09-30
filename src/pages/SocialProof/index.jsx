import styles from "./index.module.css";

/**
 * SocialProof
 * Props:
 * - avatars: Array<{ src: string, alt?: string }>
 * - rating: number (1-5)  // default 5
 * - text: string          // es: "50k+ Articles Created"
 * - maxAvatars: number    // quanti avatar mostrare (default 4)
 * - size: number          // diametro in px degli avatar (default 40)
 */
export default function SocialProof({
  avatars = [],
  rating = 5,
  text = "",
  maxAvatars = 4,
  size = 40,
}) {
  const shown = avatars.slice(0, maxAvatars);

  return (
    <div className={styles.wrapper} role="group" aria-label="Social proof">
      <div className={styles.avatars} style={{ "--size": `${size}px` }}>
        {shown.map((a, i) => (
          <img
            key={i}
            className={styles.avatar}
            src={a.src}
            alt={a.alt || `User ${i + 1}`}
            width={size}
            height={size}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      <div className={styles.meta}>
        <div
          className={styles.stars}
          aria-label={`${rating} su 5 stelle`}
          role="img"
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} filled={i < Math.round(rating)} />
          ))}
        </div>
        {text && <span className={styles.text}>{text}</span>}
      </div>
    </div>
  );
}

function Star({ filled = true }) {
  return (
    <svg
      className={filled ? `${styles.star} ${styles.filled}` : styles.star}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      aria-hidden="true"
    >
      <path d="M10 1.5l2.8 5.67 6.26.91-4.53 4.41 1.07 6.24L10 15.9 4.4 18.73l1.07-6.24L.94 8.08l6.26-.91L10 1.5z" />
    </svg>
  );
}

/* Esempio d’uso:
<SocialProof
  avatars={[
    { src: "/img/u1.jpg", alt: "Marco" },
    { src: "/img/u2.jpg", alt: "Sara" },
    { src: "/img/u3.jpg", alt: "Luca" },
    { src: "/img/u4.jpg", alt: "Giulia" },
  ]}
  rating={5}
  text="50k+ Articles Created"
/>
*/