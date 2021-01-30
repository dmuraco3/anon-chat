from flask import Flask, render_template, abort

app = Flask(__name__)

@app.route("/")
def home():
    return "hello world"

if __name__ == "__main__":
    app.run(host="0.0.0.0" , debug=True)