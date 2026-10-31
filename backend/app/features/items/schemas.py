from PIL import Image, UnidentifiedImageError
from datetime import date
from flask import request

CATEGORIES = {
  "Accesories", "Documents", "Electronics",
  "Personal Items", "School Supplies",
  "Other",
}

STATUSES = {
  "found", "lost"
}

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png", "webp"}

ALLOWED_FORMATS = {"JPEG", "PNG", "WEBP"}

MAX_FILE_SIZE = 5 * 1024 * 1024

def validate_item_data():
  errors = {}
  
  form_data = request.form
  
  name = form_data.get("name", "").strip()
  category = form_data.get("category", "")
  status = form_data.get("status", "")
  description = form_data.get("description", "").strip()
  location = form_data.get("location", "").strip()
  incident_date = form_data.get("date", "")
  
  if not name:
    errors["name"] = "Item name is required."
  
  if len(name) > 200:
    errors["name"] = "Item name must not exceed 200 characters."
  
  if category not in CATEGORIES:
    errors["category"] = "Invalid item category."
  
  if status not in STATUSES:
    errors["status"] = "Invalid item status."
  
  if not description:
    errors["description"] = "Item description is required."
  
  if len(description) > 1000:
    errors["description"] = "Item description must not exceed 1000 characters."
  
  if not location:
    errors["location"] = "Location is required."
  
  if len(location) > 200:
    errors["location"] = "Locatiom must not exceed 200 characters."
  
  if not incident_date:
    errors["date"] = "Incident date is required."
  
  try:
    
    parsed_date = date.fromisoformat(incident_date)
    
    if parsed_date > date.today():
      errors["date"] = "Date cannot be in the future."
    
  except ValueError:
    errors["date"] = "Invalid date format. Use YYYY-MM-DD"
  
  return errors

def validate_image():
  image = request.files.get("image")

  if not image or not image.filename:
    return None, None
  
  filename = image.filename

  if "." not in filename:
    return None, "Invalid image filename."

  extension = filename.rsplit(".", 1)[1].lower()

  if extension not in ALLOWED_EXTENSIONS:
    return None, "Only JPG, JPEG, PNG, and WEBP images are allowed."

  image.stream.seek(0, 2)
  file_size = image.stream.tell()
  image.stream.seek(0)

  if file_size > MAX_FILE_SIZE:
    return None, "Image size must be 5 MB or less."

  try:
    with Image.open(image.stream) as img:
      actual_format = img.format
      img.verify()

    if actual_format not in ALLOWED_FORMATS:
      return None, "The actual image format is not allowed."

  except (UnidentifiedImageError, OSError, ValueError, SyntaxError):
    return None, "The uploaded file is not a valid image."
  image.stream.seek(0)

  return image, None