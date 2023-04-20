# Imports and Data
import sys
sys.path.append("..")
from app import app
from flask import request, Blueprint, jsonify
from Services import requestService


# Blueprint declaration
bluePrint = Blueprint("request", __name__)

# ROUTES
# Map endpoints to functions
# Route to GET single banweb entry
@bluePrint.route('/courses/<int:id>', methods=['GET'])
def getById(id):
    target = requestService.getById(id)
    if target is not None:
        return jsonify(target)
    

# Route to GET banweb data query
@bluePrint.route('/courses', methods=['GET'])
def getByQuery():
    # Get parameters from request
    query = request.args.get('q')
    sort_by = request.args.get('sort_by', 'column')
    order = request.args.get('order', 'asc')
    # Get results from services
    data = requestService.getByQuery(query, sort_by, order)
    
    return jsonify(data)
# END ROUTES