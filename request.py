from flask import Flask, jsonify, request
import requests

from flask_cors import CORS  # <== Import this

app = Flask(__name__)
CORS(app)

API_KEY = "996f27dc7f1e5dc8bc838483209e0791"

def fetch_data(date="2025-05-30"):
    url = f'https://v1.basketball.api-sports.io/games?date={date}'
    headers = {
        "x-apisports-key": API_KEY
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    else:
        return None

@app.route('/api/upcoming-games', methods=['GET'])
def get_upcoming_games():
    date_param = request.args.get('date', default="2025-05-30")

    data = fetch_data(date_param)
    data1 = {"response": []}
    i=0
    if data and "response" in data:
        for game in data['response']:
            i+= 1
            new_game = {
                "id": game['id'],
                "date": game['date'],
                "home_team": game['teams']['home']['name'],
                "away_team": game['teams']['away']['name'],
                "home_logo": game['teams']['home']['logo'],
                "away_logo": game['teams']['away']['logo'],
            }
            data1["response"].append(new_game)
            if(i == 10):
                break
        return jsonify(data1)
    else:
        return jsonify({"error": "Failed to fetch data or no games available"}), 500

if __name__ == '__main__':
    app.run(debug=True)
