from flask import Flask, jsonify, request
from flask_cors import CORS
import wikipedia
import re
from collections import OrderedDict
import json

app = Flask(__name__, template_folder='../content', static_folder='../content')
CORS(app)

@app.route('/')
def home():
    return flask.render_template('index.html')

@app.route('/static/<path:path>')
def static_files(path):
    return flask.send_from_directory('../content/static', path)


@app.route("/search")
def search():
    value = request.args.get('content')

    results = wikipedia.page(value, auto_suggest=False).content
    obj = results.splitlines()

    dict = OrderedDict()
    dict["header"] = []
    curr = "header"
    subCurr = ""
    for x in obj:
        if (re.findall("^={3}", x)):
            subCurr = x
            dict[curr].append({})
            dict[curr][len(dict[curr]) - 1][subCurr] = []
            continue
        elif (re.findall("^={2}", x)):
            curr = x
            subCurr = ""
            dict[curr] = []
            continue
        if (curr == "header"):
            dict["header"].append(x)
        else:
            if (len(subCurr) > 0):
                dict[curr][len(dict[curr]) - 1][subCurr].append(x)
            else:
                dict[curr].append(x)

    return json.dumps(dict)

@app.route("/get-imgs")
def get_imgs():
    value = request.args.get('content')
    results = wikipedia.page(value, auto_suggest=False).images
    results = [x for x in results if not x.endswith(".svg")]
    return {"images": results}

@app.route("/change")
def change():
    value = request.args.get('search')
    results = wikipedia.search(value)
    return results


if __name__ == "__main__":
    app.run(debug=True)
