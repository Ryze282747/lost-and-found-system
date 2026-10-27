
import styles from './Card.module.css';

function Card({
  children,
  className = '',
  padding = 'md',
  hoverable = false,
  onClick,
}) {
  const classNames = [
    styles.card,
    styles[`padding-${padding}`],
    hoverable ? styles.hoverable : '',
    onClick ? styles.clickable : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classNames}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick(event);
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

export default Card;
