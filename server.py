from flask import Flask, send_from_directory

app = Flask(__name__, static_url_path='', static_folder='')

@app.route('/')
def index():
    return send_from_directory('', 'index.html')

@app.route('/style.css')
def css():
    return send_from_directory('', 'style.css')

@app.route('/script.js')
def js():
    return send_from_directory('', 'script.js')

@app.route('/game')
def game():
    return "<h1 style='color: red; background: black; text-align: center; margin-top: 20%;'>Continua em breve...</h1>"

if __name__ == '__main__':
    app.run(debug=True)