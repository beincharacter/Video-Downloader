import React, { useState } from 'react';
import axios from 'axios';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [outputPath, setOutputPath] = useState('');
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [downloadingVideo, setDownloadingVideo] = useState(false);
  const [downloadingPlaylist, setDownloadingPlaylist] = useState(false);

  const handleDownloadVideo = async () => {
    setDownloadingVideo(true);
    try {
      const response = await axios.post('http://localhost:5000/download_video', {
        url,
        output_path: outputPath,
        is_playlist: false,
      });
      if (response.data.success) {
        console.log('Video downloaded successfully');
      } else {
        console.error('Failed to download video');
      }
    } catch (error) {
      console.error('Error downloading video:', error);
    } finally {
      setDownloadingVideo(false);
    }
  };

  const handleDownloadPlaylist = async () => {
    setDownloadingPlaylist(true);
    try {
      const response = await axios.post('http://localhost:5000/download_video', {
        url,
        output_path: outputPath,
        is_playlist: true,
      });
      if (response.data.success) {
        console.log('Playlist downloaded successfully');
      } else {
        console.error('Failed to download playlist');
      }
    } catch (error) {
      console.error('Error downloading playlist:', error);
    } finally {
      setDownloadingPlaylist(false);
    }
  };

  return (
    <div>
      <h1>Video Downloader</h1>
      <div>
        <label htmlFor="url">Video/Playlist URL:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="outputPath">Output Path:</label>
        <input
          type="text"
          id="outputPath"
          value={outputPath}
          onChange={(e) => setOutputPath(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="isPlaylist">Is Playlist?</label>
        <input
          type="checkbox"
          id="isPlaylist"
          checked={isPlaylist}
          onChange={(e) => setIsPlaylist(e.target.checked)}
        />
      </div>
      <div>
        <button onClick={handleDownloadVideo} disabled={downloadingVideo}>
          {downloadingVideo ? 'Downloading Video...' : 'Download Video'}
        </button>
        <button onClick={handleDownloadPlaylist} disabled={downloadingPlaylist}>
          {downloadingPlaylist ? 'Downloading Playlist...' : 'Download Playlist'}
        </button>
      </div>
    </div>
  );
};

export default VideoDownloader;