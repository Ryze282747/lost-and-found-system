from flask import jsonify

def success_response(data, status, msg=None):
  if msg:
    res = {
      "msg":msg,
      "data":data,
    }

  res = data

  return jsonify(res), status

def error_response(msg, error, status):
  res = {
    "msg":msg,
    "error":error
  }

  return jsonify(res), status