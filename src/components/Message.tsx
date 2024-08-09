type MessageProps = {
  message: string;
};

function Message({ message }: MessageProps) {
  return (
    <p className="w-4/5 text-center mt-16">
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
