
export default function Loader({ loading, color }: { loading: boolean, color: string }) {
  if (!loading) return null;
  return (
    <div className='loader'>
      <div className='bars'>
        <div className={`${color}`}></div>
        <div className={`${color}`}></div>
        <div className={`${color}`}></div>
      </div>
    </div>
  );
}
