import pytube
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def download_video(url, output_path):
    try:
        yt = pytube.YouTube(url)
        stream = yt.streams.get_highest_resolution()
        stream.download(output_path)
        return True
    except Exception as e:
        print(f"Error downloading video: {e}")
        return False

def download_playlist(url, output_path):
    try:
        playlist = pytube.Playlist(url)
        for video_url in playlist.video_urls:
            download_video(video_url, output_path)
        return True
    except Exception as e:
        print(f"Error downloading playlist: {e}")
        return False

@app.route('/download_video', methods=['POST'])
def download_video_endpoint():
    url = request.json.get('url')
    output_path = request.json.get('output_path', '.')
    is_playlist = request.json.get('is_playlist', False)

    if is_playlist:
        success = download_playlist(url, output_path)
    else:
        success = download_video(url, output_path)

    return jsonify({'success': success})

if __name__ == '__main__':
    app.run(debug=True)