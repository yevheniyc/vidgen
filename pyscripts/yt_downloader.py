import os
import sys

import yt_dlp


def download_youtube_video(url, output_path=None):
    """
    Download a YouTube video using yt-dlp

    Args:
        url (str): YouTube URL
        output_path (str): Directory to save the video

    Returns:
        bool: True if download successful, False otherwise
    """
    # If no output path is provided, use a directory inside pyscripts
    if output_path is None:
        # Get the directory where the script is located
        script_dir = os.path.dirname(os.path.abspath(__file__))
        output_path = os.path.join(script_dir, "downloads")

    try:
        print(f"Attempting to fetch video from: {url}")

        # Create output directory if it doesn't exist
        if not os.path.exists(output_path):
            os.makedirs(output_path)
            print(f"Created output directory: {output_path}")

        # Configure yt-dlp options
        ydl_opts = {
            "format": "best[ext=mp4]",  # Best quality mp4
            "outtmpl": os.path.join(output_path, "%(title)s.%(ext)s"),
            "progress_hooks": [progress_hook],
            "quiet": False,
            "no_warnings": False,
            "ignoreerrors": False,
        }

        # Download the video
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)

            if info:
                print(f"\nDownloaded: {info.get('title', 'Unknown title')}")
                print(f"Resolution: {info.get('resolution', 'Unknown')}")
                print(
                    f"File: {os.path.join(output_path, info.get('title', 'video') + '.' + info.get('ext', 'mp4'))}"
                )
                return True
            else:
                print("No video information retrieved.")
                return False

    except Exception as e:
        print(f"An error occurred: {e}")
        print(f"Type of error: {type(e).__name__}")
        return False


def progress_hook(d):
    """Display download progress"""
    if d["status"] == "downloading":
        percent = d.get("_percent_str", "N/A")
        speed = d.get("_speed_str", "N/A")
        eta = d.get("_eta_str", "N/A")
        print(f"\rDownloading... {percent} at {speed}, ETA: {eta}", end="")
    elif d["status"] == "finished":
        print("\nDownload finished, now converting...")


if __name__ == "__main__":
    # You can provide URL as a command-line argument
    if len(sys.argv) > 1:
        video_url = sys.argv[1]
    else:
        # Default test URL
        video_url = "https://www.youtube.com/watch?v=riCP9x31Kuk"
        print(f"No URL provided, using default test URL: {video_url}")

    # Get the directory where the script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_directory = os.path.join(script_dir, "downloads")  # Inside pyscripts folder

    success = download_youtube_video(video_url, output_directory)

    if success:
        print("Download completed successfully!")
    else:
        print("Download failed. Please check the error message above.")
