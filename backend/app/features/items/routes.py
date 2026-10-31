from app.utils.responses import success_response, error_response
from .schemas import validate_item_data, validate_image
from flask import jsonify, request
from . import items_bp
from . import service

@items_bp.route("/", methods=["GET"])
def read():
  
  data, status = service.get_all_items()
  
  return success_response(data, status)

@items_bp.route("/", methods=["POST"])
def create():
  
  form_errors = validate_item_data()
  image, image_error = validate_image()

  if form_errors:
    return error_response(
      "Form validation failed.",
      form_errors, 400
    )

  if image_error:
    return error_response(
      "Image validation failed.",
      image_error, 400
    )

  res, status = service.create_item()

  return success_response(res, status)

@items_bp.route("/<uuid:item_id>")
def read_with_id(item_id):
  data, status = service.get_with_id(item_id)

  return success_response(data, status)