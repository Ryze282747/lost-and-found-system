
import { useState } from 'react';
import styles from './ClaimForm.module.css';

function ClaimForm({ itemName, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    proof: '',
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

    if (!formData.proof.trim()) {
      newErrors.proof = 'Please describe how ownership can be verified.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setSubmitted(true);
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
        aria-labelledby="claim-form-title"
      >
        <header className={styles.header}>
          <div>
            <h2 id="claim-form-title">
              {submitted ? 'Claim Request' : 'Claim This Item'}
            </h2>

            <p>
              {submitted
                ? 'Your form has been completed.'
                : `Submit ownership details for ${itemName}.`}
            </p>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close claim form"
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

            <h3>Form completed successfully</h3>

            <p>
              This is a frontend preview. Your claim has not been
              sent or saved. Ownership will need to be verified
              when the backend is implemented.
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
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="claim-full-name">Full name *</label>

              <input
                id="claim-full-name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? 'claim-full-name-error' : undefined
                }
              />

              {errors.fullName && (
                <p id="claim-full-name-error" className={styles.error}>
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="claim-contact">
                Contact information *
              </label>

              <input
                id="claim-contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Email address or phone number"
                autoComplete="email"
                aria-invalid={Boolean(errors.contact)}
                aria-describedby={
                  errors.contact ? 'claim-contact-error' : undefined
                }
              />

              {errors.contact && (
                <p id="claim-contact-error" className={styles.error}>
                  {errors.contact}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="claim-proof">
                Proof of ownership *
              </label>

              <textarea
                id="claim-proof"
                name="proof"
                value={formData.proof}
                onChange={handleChange}
                placeholder="Describe identifying details that can help verify ownership."
                rows={4}
                aria-invalid={Boolean(errors.proof)}
                aria-describedby={
                  errors.proof ? 'claim-proof-error' : undefined
                }
              />

              {errors.proof && (
                <p id="claim-proof-error" className={styles.error}>
                  {errors.proof}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="claim-additional-info">
                Additional information
                <span className={styles.optional}> (optional)</span>
              </label>

              <textarea
                id="claim-additional-info"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any other details that may help verify your claim."
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
                Submit Claim
                <i className="ri-arrow-right-line" aria-hidden="true" />
              </button>
            </div>

            <p className={styles.note}>
              Submitting this form does not guarantee ownership.
              Details should be verified by authorized school personnel.
            </p>
          </form>
        )}
      </section>
    </div>
  );
}

export default ClaimForm;
