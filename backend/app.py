from typing import Tuple

from flask import Flask, jsonify, request, Response
import mockdb.mockdb_interface as db

app = Flask(__name__)


def create_response(
    data: dict = None, status: int = 200, message: str = ""
) -> Tuple[Response, int]:
    """Wraps response in a consistent format throughout the API.
    
    Format inspired by https://medium.com/@shazow/how-i-design-json-api-responses-71900f00f2db
    Modifications included:
    - make success a boolean since there's only 2 values
    - make message a single string since we will only use one message per response
    IMPORTANT: data must be a dictionary where:
    - the key is the name of the type of data
    - the value is the data itself

    :param data <str> optional data
    :param status <int> optional status code, defaults to 200
    :param message <str> optional message
    :returns tuple of Flask Response and int, which is what flask expects for a response
    """
    if type(data) is not dict and data is not None:
        raise TypeError("Data should be a dictionary 😞")

    response = {
        "code": status,
        "success": 200 <= status < 300,
        "message": message,
        "result": data,
    }
    return jsonify(response), status


"""
~~~~~~~~~~~~ API ~~~~~~~~~~~~
"""


@app.route("/")
def hello_world():
    return create_response({"content": "hello world!"})


@app.route("/mirror/<name>")
def mirror(name):
    data = {"name": name}
    return create_response(data)

# MODIFIED
@app.route("/shows", methods=['GET'])
def get_all_shows():
    min_episodes = request.args.get('minEpisodes')
    if (min_episodes is None):
        return create_response({"shows": db.get('shows')})
    if (db.getShowsByMinEpisodes('shows', int(min_episodes)) == []):
        return create_response(message="No shows with more than minimum episodes entered.")
    return create_response({"shows": db.getShowsByMinEpisodes('shows', int(min_episodes))})

@app.route("/shows/<id>", methods=['DELETE'])
def delete_show(id):
    if db.getById('shows', int(id)) is None:
        return create_response(status=404, message="No show with this id exists")
    db.deleteById('shows', int(id))
    return create_response(message="Show deleted")


# TODO: Implement the rest of the API here!
@app.route("/shows/<id>", methods=['GET'])
def get_show_by_id(id):
    if db.getById('shows', int(id)) is None:
        return create_response(status=404, message="No show with this id exists")
    return create_response({"shows": db.getById('shows', int(id))}, message="Below is the show recorded with the given id.")


@app.route("/shows", methods=['POST'])
def add_new_show():
    new_show_data = request.get_json()
    if (new_show_data.get('name') is None):
        return create_response(status=422, message="Please provide the name of the show.")
    elif (new_show_data.get('episodes_seen') is None):
        return create_response(status=422, message="Please provide the number of episodes seen.")

    new_show = {
        "name": new_show_data.get('name'),
        "episodes_seen": new_show_data.get('episodes_seen'), 
    }

    return create_response({"shows": db.create('shows', new_show)}, status=201, message="Show Added")

"""
~~~~~~~~~~~~ END API ~~~~~~~~~~~~
"""
if __name__ == "__main__":
    app.run(port=8080, debug=True)
