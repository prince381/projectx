
export default function Switch({
  toggle,
}: {
  toggle: (value: boolean) => void;
}) {
  return (
    <div className='switch h-max w-max lg:justify-self-end'>
      <input
        type='checkbox'
        id='theme-toggle'
        className='hidden appearance-none'
        onChange={(e) => toggle(e.target.checked)}
      />
      <label htmlFor='theme-toggle' className='cursor-pointer select-none'>
        Night mode
      </label>
    </div>
  );
}
