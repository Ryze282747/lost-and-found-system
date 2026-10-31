
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/Card/Card.jsx';
import { createItem } from '../Items/api/itemApi.js';
import styles from './Report.module.css';

const categories = [
  'Accessories',
  'Documents',
  'Electronics',
  'Personal Items',
  'School Supplies',
  'Other',
];

function Report() {
  const [formData, setFormData] = useState({
    type: 'lost',
    name: '',
    category: '',
    description: '',
    location: '',
    date: '',
  });

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!image?.preview) return;

    return () => URL.revokeObjectURL(image.preview);
  }, [image]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }));

    setMessage('');
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors((previous) => ({
        ...previous,
        image: 'Please select a valid image file.',
      }));

      event.target.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((previous) => ({
        ...previous,
        image: 'Image size must be 5 MB or less.',
      }));

      event.target.value = '';
      return;
    }

    setImage({
      file,
      preview: URL.createObjectURL(file),
    });

    setErrors((previous) => ({
      ...previous,
      image: '',
    }));

    setMessage('');
  }

  function handleRemoveImage() {
    setImage(null);

    const fileInput = document.getElementById('item-image');

    if (fileInput) {
      fileInput.value = '';
    }

    setErrors((previous) => ({
      ...previous,
      image: '',
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter the item name.';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please describe the item.';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Please enter the location.';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date.';
    } else if (formData.date > getToday()) {
      newErrors.date = 'The date cannot be in the future.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMessage('');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      // Send the report fields and optional photo as multipart form data.
      const payload = new FormData();

      payload.append('name', formData.name.trim());
      payload.append('category', formData.category);
      payload.append('status', formData.type);
      payload.append('description', formData.description.trim());
      payload.append('location', formData.location.trim());
      payload.append('date', formData.date);

      if (image?.file) {
        payload.append('image', image.file);
      }

      await createItem(payload);

      setMessage('Report submitted successfully!');

      setFormData({
        type: 'lost',
        name: '',
        category: '',
        description: '',
        location: '',
        date: '',
      });

      setImage(null);
      setErrors({});

      const fileInput = document.getElementById('item-image');

      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      console.error('Failed to submit report:', error);

      setMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          'Unable to submit your report. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function getToday() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <span className={styles.eyebrow}>
          <i className="ri-file-edit-line" aria-hidden="true" />
          Community reporting
        </span>

        <h1 className={styles.title}>Report an Item</h1>

        <p className={styles.subtitle}>
          Help reunite lost belongings with their owners by providing
          accurate information.
        </p>
      </header>

      <Card className={styles.formCard} padding="lg">
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <fieldset className={styles.typeFieldset} disabled={isSubmitting}>
            <legend className={styles.sectionTitle}>
              What are you reporting?
            </legend>

            <div className={styles.typeOptions}>
              <label
                className={`${styles.typeOption} ${
                  formData.type === 'lost' ? styles.selected : ''
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="lost"
                  checked={formData.type === 'lost'}
                  onChange={handleChange}
                />

                <i className="ri-search-line" aria-hidden="true" />

                <span>
                  <strong>Lost Item</strong>
                  <small>Something you cannot find</small>
                </span>
              </label>

              <label
                className={`${styles.typeOption} ${
                  formData.type === 'found' ? styles.selected : ''
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value="found"
                  checked={formData.type === 'found'}
                  onChange={handleChange}
                />

                <i className="ri-hand-heart-line" aria-hidden="true" />

                <span>
                  <strong>Found Item</strong>
                  <small>Something you found</small>
                </span>
              </label>
            </div>
          </fieldset>

          <div className={styles.divider} />

          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Item Information</h2>

            <div className={styles.field}>
              <label htmlFor="item-name">Item Name *</label>

              <input
                id="item-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Black leather wallet"
                maxLength={200}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />

              {errors.name && (
                <span id="name-error" className={styles.error}>
                  {errors.name}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="item-category">Category *</label>

              <select
                id="item-category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.category)}
                aria-describedby={
                  errors.category ? 'category-error' : undefined
                }
              >
                <option value="">Select a category</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {errors.category && (
                <span id="category-error" className={styles.error}>
                  {errors.category}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="item-description">Description *</label>

              <textarea
                id="item-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the item's color, brand, appearance, or other identifying details."
                rows={5}
                maxLength={1000}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.description)}
                aria-describedby={
                  errors.description ? 'description-error' : undefined
                }
              />

              <span className={styles.characterCount}>
                {formData.description.length}/1000
              </span>

              {errors.description && (
                <span id="description-error" className={styles.error}>
                  {errors.description}
                </span>
              )}
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Where and When</h2>

            <div className={styles.field}>
              <label htmlFor="item-location">Location *</label>

              <input
                id="item-location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. School library, Room 204"
                maxLength={200}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.location)}
                aria-describedby={
                  errors.location ? 'location-error' : undefined
                }
              />

              {errors.location && (
                <span id="location-error" className={styles.error}>
                  {errors.location}
                </span>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="item-date">
                Date {formData.type === 'lost' ? 'Lost' : 'Found'} *
              </label>

              <input
                id="item-date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                max={getToday()}
                disabled={isSubmitting}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? 'date-error' : undefined}
              />

              {errors.date && (
                <span id="date-error" className={styles.error}>
                  {errors.date}
                </span>
              )}
            </div>
          </section>

          <div className={styles.divider} />

          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Item Photo</h2>

            <p className={styles.helperText}>
              Add a clear photo to help others identify the item.
              Images must be 5 MB or smaller.
            </p>

            <label htmlFor="item-image" className={styles.uploadArea}>
              {image ? (
                <img
                  src={image.preview}
                  alt="Preview of selected item"
                  className={styles.imagePreview}
                />
              ) : (
                <>
                  <i className="ri-upload-cloud-2-line" aria-hidden="true" />

                  <strong>Choose an image</strong>

                  <span>JPG, PNG, WEBP · Up to 5 MB</span>
                </>
              )}
            </label>

            <input
              id="item-image"
              className={styles.fileInput}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isSubmitting}
            />

            {image && (
              <button
                type="button"
                className={styles.removeImageButton}
                onClick={handleRemoveImage}
                disabled={isSubmitting}
              >
                <i className="ri-delete-bin-line" aria-hidden="true" />
                Remove image
              </button>
            )}

            {errors.image && (
              <span className={styles.error}>{errors.image}</span>
            )}
          </section>

          {message && (
            <div
              className={styles.successMessage}
              role="status"
              aria-live="polite"
            >
              <i
                className={
                  message === 'Report submitted successfully!'
                    ? 'ri-checkbox-circle-line'
                    : 'ri-error-warning-line'
                }
                aria-hidden="true"
              />
              <span>{message}</span>
            </div>
          )}

          <div className={styles.formActions}>
            <Link
              to="/items"
              className={styles.cancelButton}
              aria-disabled={isSubmitting}
              onClick={(event) => {
                if (isSubmitting) event.preventDefault();
              }}
            >
              Cancel
            </Link>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              <i
                className={
                  isSubmitting
                    ? 'ri-loader-4-line'
                    : 'ri-send-plane-line'
                }
                aria-hidden="true"
              />
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>

          <p className={styles.formNote}>
            * Image upload will come next update.
          </p>
        </form>
      </Card>
    </main>
  );
}

export default Report;
