// This component has the only purpose of being displayed while information is being fetched from the server.
type SpinnerProps = {
  message: string;
};

export default function Spinner({ message }: SpinnerProps) {
  return (
    <div className="loading">
      <h2>{message}</h2>
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
