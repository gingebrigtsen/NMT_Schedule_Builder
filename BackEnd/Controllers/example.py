# import sys
# sys.path.append('..')
# from app import app
# from flask import request, Blueprint
# import services.exampleService as exampleService

# bluePrint = Blueprint("example", __name__)

# @bluePrint.route('/hashPassword', methods=['POST'])
# def register():
#     toHash = request.get_json()['user']
#     return exampleService.hashPassword(toHash)

# @bluePrint.route('/checkHash', methods=['POST'])
# def register():
#     new = request.get_json()['user']
#     return exampleService.checkPassword(new['username'], new['password'])

#TEMPLATES
# @bluePrint.route("/<id>", methods=["GET"])
# def get_request(id):
#     # return a request with the given id
#     return requestService.get_request(id)

# @bluePrint.route("/", methods=["POST"])
# def send_request():
#     # create a new request with the given information
#     new_request_info = request.json
#     return requestService.new_request(new_request_info)