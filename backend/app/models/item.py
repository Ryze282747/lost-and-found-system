from datetime import datetime, timezone
from app.extensions import db 
from zoneinfo import ZoneInfo
import uuid

class Item(db.Model):
  __tablename__ = "items"
  
  id = db.Column(
    db.String(36), primary_key=True,
    default=lambda: str(uuid.uuid4()),
    nullable=False
  )
  
  name = db.Column(db.String(200), nullable=False)
  category = db.Column(db.String(50), nullable=False)
  status = db.Column(db.String(20), nullable=False)
  location = db.Column(db.String(200), nullable=False)
  incident_date = db.Column(db.DateTime, nullable=False)
  image = db.Column(db.String(500), nullable=True)
  
  description = db.Column(db.String(1000), nullable=False)
  
  created_at = db.Column(
    db.DateTime,
    nullable=False,
    default=lambda: datetime.now(ZoneInfo("Asia/Manila")),
  )
  
  @classmethod
  def from_dict(cls, obj):
    return cls(
      name=obj.get("name"),
      category=obj.get("category"),
      status=obj.get("status"),
      location=obj.get("location"),
      incident_date=obj.get("incident_date"),
      description=obj.get("description"),
    )

  def to_dict(self):
    return {
      "id":self.id,
      "name":self.name,
      "category":self.category,
      "status":self.status,
      "location":self.location,
      "incident_date":self.incident_date,
      "image":self.image,
      "description":self.description,
      "created_at":self.created_at,
    }

  def __repr__(self):
    return f"<Item {self.name}>"