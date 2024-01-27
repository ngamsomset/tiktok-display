import '../index.css';

interface VideoWrapper {
  videoUrl: string;
}

const VideoWrapper = ({ videoUrl }: VideoWrapper) => {
  return (
    <iframe
      width='100%'
      height='500'
      src={videoUrl}
      allow='encrypted-media;'
      allowFullScreen
    ></iframe>
  );
};

export default VideoWrapper;
