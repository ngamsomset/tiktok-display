import '../index.css';

interface VideoWrapper {
  videoUrl: string;
}

const VideoWrapper = ({ videoUrl }: VideoWrapper) => {
  return (
    <iframe
      height='530'
      src={videoUrl}
      allow='encrypted-media;'
      allowFullScreen
    ></iframe>
  );
};

export default VideoWrapper;
