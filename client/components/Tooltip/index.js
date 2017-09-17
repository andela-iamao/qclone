export default function Tooltip({ open, children }) {
  return (
    <div
      className={`hover_menu ${open ? 'hover_menu-active': ''} show_nub right_align fixed_menu_width no_body_attach`}
      style={{ right: 10 }}>
      <div>
        {children}
      </div>
    </div>
  );
}
