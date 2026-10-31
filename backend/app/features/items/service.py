from app.extensions import db
from flask import request
from app.models import Item

def get_all_items():
  mock_items = [
    {
      "id": 1,
      "name": 'Black Leather Wallet',
      "category": 'Accessories',
      "status": 'found',
      "location": 'School Library',
      "date": 'Oct 25, 2026',
      "image": '',
      "description": 'A black wallet found near the library entrance.',
    },
    {
      "id": 2,
      "name": 'Blue Water Bottle',
      "category": 'Personal Items',
      "status": 'lost',
      "location": 'School Gymnasium',
      "date": 'Oct 24, 2026',
      "image": '',
      "description": 'A blue reusable water bottle with a screw-on lid.',
    },
    {
      "id": 3,
      "name": 'Scientific Calculator',
      "category": 'School Supplies',
      "status": 'found',
      "location": 'Room 204',
      "date": 'Oct 24, 2026',
      "image": '',
      "description": 'A scientific calculator left on a classroom desk.',
    },
    {
      "id": 4,
      "name": 'Student ID Card',
      "category": 'Documents',
      "status": 'pending',
      "location": 'Main Building',
      "date": 'Oct 23, 2026',
      "image": '',
      "description": 'A student ID card awaiting verification by its owner.',
    },
    {
      "id": 5,
      "name": 'White Wireless Earbuds',
      "category": 'Electronics',
      "status": 'lost',
      "location": 'School Cafeteria',
      "date": 'Oct 22, 2026',
      "image": '',
      "description": 'A pair of white wireless earbuds in a charging case.',
    },
    {
      "id": 6,
      "name": 'Red Pencil Case',
      "category": 'School Supplies',
      "status": 'claimed',
      "location": 'Gu"id"ance Office',
      "date": 'Oct 21, 2026',
      "image": '',
      "description": 'A red pencil case that has been returned to its owner.',
    },
  ]
  
  items = Item.query.all()
  
  return [item.to_dict() for item in items], 200

def get_with_id(id):
  item = db.session.get(Item, id)

  if not item:
    return {
      "msg":"Item not found.",
    }, 404

  data = item.to_dict()

  data["incident_date"] = item.incident_date.strftime("%B %d, %Y")

  return data, 200
  
def create_item():   
  form = request.form
  image = request.files.get("image")

  obj = {
    "name":form.get("name"),
    "category":form.get("category"),
    "status":form.get("status"),
    "location":form.get("location"),
    "incident_date":form.get("date"),
    "description":form.get("description"),
    "image":image,
  }

  item = Item.from_dict(obj)
  
  db.session.add(item)
  db.session.commit()

  return {
    "msg":"Created successfully.",
  }, 201