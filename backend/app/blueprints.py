def register_blueprints(app):
  
  from app.features.items import items_bp
  
  app.register_blueprint(items_bp)