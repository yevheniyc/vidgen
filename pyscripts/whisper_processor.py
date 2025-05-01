import os
import openai
from typing import Optional

# Get OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")
if not openai.api_key:
    raise ValueError("OPENAI_API_KEY environment variable is not set")

def process_video_with_whisper(video_path: str) -> Optional[str]:
    """
    Process a video file using Whisper AI to generate a transcript
    
    Args:
        video_path (str): Path to the video file
        
    Returns:
        Optional[str]: The generated transcript or None if processing failed
    """
    try:
        # Open the video file
        with open(video_path, "rb") as video_file:
            # Call the Whisper API
            response = openai.Audio.transcribe(
                model="whisper-1",
                file=video_file,
                response_format="text"
            )
            
            return response
            
    except Exception as e:
        print(f"Error processing video with Whisper: {str(e)}")
        return None

if __name__ == "__main__":
    # Test the function
    test_video_path = "path/to/your/video.mp4"
    transcript = process_video_with_whisper(test_video_path)
    if transcript:
        print("Transcript generated successfully:")
        print(transcript)
    else:
        print("Failed to generate transcript") 