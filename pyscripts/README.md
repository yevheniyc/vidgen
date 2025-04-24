# Python Scripts

This directory contains useful Python scripts for various tasks.

## YouTube Downloader

The `yt_downloader.py` script allows you to download YouTube videos easily.

### Setup

- Downlaod `uv`

- Create and activate a virtual environment:

```bash
# Navigate to the pyscripts directory
cd pyscripts

# Create a virtual environment using uv (recommended) - this will create a pyscript/.venv
uv venv .venv

# Activate the virtual environment
source .venv/bin/activate  # On macOS/Linux inside of pyscripts folder
```

- Install dependencies

```bash
# Using uv with pyproject.toml (fastest)
uv pip install -r requirements.txt
```

- If you want to deactivate the virtual environment (python)

```bash
deactivate
```

### Usage

Run the YouTube downloader script:

```bash
# Download a video with a specific URL
python yt_downloader.py "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"

# Or run without arguments to download the default test video
python yt_downloader.py
```

Downloaded videos will be saved in a `downloads` folder inside the `pyscripts` directory.

### Features

- Downloads the best quality MP4 format
- Shows download progress with speed and ETA
- Creates the download directory automatically if it doesn't exist
- Provides detailed error messages if something goes wrong

### Troubleshooting

If you encounter any issues:

1. Make sure you have an active internet connection
2. Check that the YouTube URL is valid and the video is available
3. Try updating the yt-dlp library: `uv pip install --upgrade yt-dlp`
4. If you get permission errors when creating the downloads directory, check your file system permissions
