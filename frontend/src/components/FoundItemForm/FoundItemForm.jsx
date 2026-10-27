import { useState } from 'react';
import styles from './FoundItemForm.module.css';

function FoundItemForm({ itemName, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    foundLocation: '',
    foundDate: '',
    additionalInfo: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Please enter your contact information.';
    }

    if (!formData.foundLocation.trim()) {
      newErrors.foundLocation = 'Please enter where you found the item.';
    }

    if (!formData.foundDate) {
      newErrors.foundDate = 'Please select the date you found the item.';
    } else if (formData.foundDate > getToday()) {
      newErrors.foundDate = 'The date cannot be in the future.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSubmitted(true);
  }

  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="found-form-title"
      >
        <header className={styles.header}>
          <div>
            <h2 id="found-form-title">
              {submitted ? 'Found Item Report' : 'I Found This Item'}
            </h2>

            <p>
              {submitted
                ? 'Your form has been completed.'
                : `Provide details about finding "${itemName}".`}
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close found item form"
          >
            <i className="ri-close-line" aria-hidden="true" />
          </button>
        </header>

        {submitted ? (
          <div className={styles.success} role="status">
            <i
              className="ri-checkbox-circle-line"
              aria-hidden="true"
            />

            <h3>Report completed successfully</h3>

            <p>
              This is a frontend preview only. Your report has not
              been sent or saved, and the original item's status
              has not changed.
            </p>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        ) : (
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
          >
            <div className={styles.field}>
              <label htmlFor="found-full-name">Full name *</label>

              <input
                id="found-full-name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? 'found-full-name-error' : undefined
                }
              />

              {errors.fullName && (
                <p id="found-full-name-error" className={styles.error}>
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="found-contact">
                Contact information *
              </label>

              <input
                id="found-contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Email address or phone number"
                autoComplete="email"
                aria-invalid={Boolean(errors.contact)}
                aria-describedby={
                  errors.contact ? 'found-contact-error' : undefined
                }
              />

              {errors.contact && (
                <p id="found-contact-error" className={styles.error}>
                  {errors.contact}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="found-location">
                Where did you find it? *
              </label>

              <input
                id="found-location"
                name="foundLocation"
                value={formData.foundLocation}
                onChange={handleChange}
                placeholder="e.g. School library"
                aria-invalid={Boolean(errors.foundLocation)}
                aria-describedby={
                  errors.foundLocation
                    ? 'found-location-error'
                    : undefined
                }
              />

              {errors.foundLocation && (
                <p id="found-location-error" className={styles.error}>
                  {errors.foundLocation}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="found-date">Date found *</label>

              <input
                id="found-date"
                name="foundDate"
                type="date"
                value={formData.foundDate}
                onChange={handleChange}
                max={getToday()}
                aria-invalid={Boolean(errors.foundDate)}
                aria-describedby={
                  errors.foundDate ? 'found-date-error' : undefined
                }
              />

              {errors.foundDate && (
                <p id="found-date-error" className={styles.error}>
                  {errors.foundDate}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="found-additional-info">
                Additional information
                <span className={styles.optional}> (optional)</span>
              </label>

              <textarea
                id="found-additional-info"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Describe the item's condition or other helpful details."
                rows={3}
              />
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={onClose}
              >
                Cancel
              </button>

              <button type="submit" className={styles.primaryButton}>
                Submit Report
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </button>
            </div>

            <p className={styles.note}>
              This report does not automatically change the item's
              status. The information should be reviewed by authorized
              school personnel.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}

export default FoundItemForm;
